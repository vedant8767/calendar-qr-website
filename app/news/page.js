import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { getHealthNews } from "@/lib/news";

export const metadata = {
  title: "Health News",
  description: "Today's health headlines from leading Indian newspapers, refreshed through the day.",
};

const TZ = "Asia/Kolkata";
const dayKey = (iso) => new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ });
const dayLabel = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" });
const timeLabel = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit" });

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
      <Link href="/" className="font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-ink">
        Health Calendar · News
      </Link>
      <h1 className="mt-10 font-display text-[clamp(3.5rem,14vw,8rem)] font-semibold leading-[0.85] tracking-tight sm:mt-14">
        Health <span className="italic text-muted">news.</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Today&apos;s health headlines from Indian newspapers, refreshed through the day. Tap a story to read it on the
        publisher&apos;s site.
      </p>

      <Suspense fallback={<NewsSkeleton />}>
        <NewsList />
      </Suspense>

      <p className="mt-14 text-xs leading-relaxed text-muted">
        Headlines and summaries come from each publisher&apos;s public RSS feed and belong to them. News is for general
        awareness and doesn&apos;t replace advice from your doctor.
      </p>
    </div>
  );
}

async function NewsList() {
  const news = await getHealthNews();

  if (!news.length) {
    return (
      <div className="mt-10 rounded-[2rem] border border-line bg-white p-8 text-center text-muted">
        <Newspaper className="mx-auto size-8" />
        <p className="mt-3">Couldn&apos;t load the news right now. Please check back in a little while.</p>
      </div>
    );
  }

  const [lead, ...rest] = news;
  const groups = [];
  for (const item of rest) {
    const key = item.publishedAt ? dayKey(item.publishedAt) : "undated";
    if (groups.at(-1)?.key !== key) groups.push({ key, label: item.publishedAt ? dayLabel(item.publishedAt) : "Earlier", items: [] });
    groups.at(-1).items.push(item);
  }

  return (
    <>
      <LeadStory item={lead} />
      {groups.map((g) => (
        <section key={g.key} className="mt-10" aria-label={g.label}>
          <h2 className="mb-3 px-1 font-mono text-xs uppercase tracking-[0.25em] text-muted">{g.label}</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {g.items.map((item) => (
              <li key={item.link}>
                <StoryCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function Meta({ item, className = "" }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-wider ${className}`}>
      {item.source}
      {item.publishedAt && ` · ${timeLabel(item.publishedAt)}`}
    </p>
  );
}

function LeadStory({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-10 block overflow-hidden rounded-[2rem] bg-ink text-white"
    >
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50 transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="relative flex min-h-80 flex-col justify-end bg-gradient-to-t from-ink via-ink/60 to-transparent p-6 sm:min-h-96 sm:p-10">
        <span className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
          Latest
        </span>
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl">{item.title}</h2>
        {item.summary && <p className="mt-3 line-clamp-2 max-w-2xl text-white/75">{item.summary}</p>}
        <div className="mt-4 flex items-center gap-2 text-white/60">
          <Meta item={item} />
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}

function StoryCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full gap-4 rounded-3xl border border-line bg-white p-4 transition hover:border-ink"
    >
      <div className="min-w-0 flex-1">
        <Meta item={item} className="text-muted" />
        <h3 className="mt-1.5 font-semibold leading-snug group-hover:underline">{item.title}</h3>
        {item.summary && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{item.summary}</p>}
      </div>
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" loading="lazy" className="size-20 shrink-0 rounded-2xl object-cover sm:size-24" />
      )}
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mt-10 h-80 rounded-[2rem] bg-line sm:h-96" />
      <div className="mt-10 grid gap-3 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-28 rounded-3xl bg-line/70" />
        ))}
      </div>
    </div>
  );
}
