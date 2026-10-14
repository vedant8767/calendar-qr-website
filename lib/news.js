import { cacheLife } from "next/cache";

// Health sections of publishers' public RSS feeds. We show the headline, the
// short summary and a link back — readers open the full story on the source site.
const FEEDS = [
  { source: "The Hindu", url: "https://www.thehindu.com/sci-tech/health/feeder/default.rss" },
  { source: "Indian Express", url: "https://indianexpress.com/section/lifestyle/health/feed/" },
  { source: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/lifestyle/health/rssfeed.xml" },
];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENTITIES[n] ?? m);
}

function clean(s = "") {
  return decode(s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(xml, name) {
  return xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))?.[1];
}

function parseItems(xml, source) {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/g)].map(([item]) => {
    const image =
      item.match(/<media:(?:content|thumbnail)[^>]*\burl="([^"]+)"/)?.[1] ??
      item.match(/<enclosure[^>]*\burl="([^"]+)"[^>]*type="image/)?.[1];
    const date = new Date(clean(tag(item, "pubDate")).replace(/ Z$/, " GMT"));
    return {
      source,
      title: clean(tag(item, "title")),
      summary: clean(tag(item, "description")),
      link: clean(tag(item, "link")),
      image: image ? decode(image) : null,
      publishedAt: Number.isNaN(date.getTime()) ? null : date.toISOString(),
    };
  });
}

async function fetchFeed({ source, url }) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (HealthCalendar news reader)" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`${source}: HTTP ${res.status}`);
  return parseItems(await res.text(), source);
}

// Latest health stories from all feeds, newest first. Cached on the server and
// refreshed in the background every hour; a feed that fails is just skipped.
export async function getHealthNews(limit = 30) {
  "use cache";
  cacheLife("hours");

  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const seen = new Set();
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((n) => n.title && /^https?:\/\//.test(n.link) && !seen.has(n.link) && seen.add(n.link))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}
