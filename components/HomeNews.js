import Link from "next/link";
import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { getHealthNews } from "@/lib/news";

// Server component: the newest health headline from each source, on the home page.
export default async function HomeNews() {
  const all = await getHealthNews();
  const news = [...new Set(all.map((n) => n.source))].map((s) => all.find((n) => n.source === s)).slice(0, 3);
  if (!news.length) return null;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="news-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id="news-heading" className="font-display text-4xl font-semibold leading-none sm:text-5xl">
          Today in <span className="italic text-muted">health.</span>
        </h2>
        <Link
          href="/news"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5"
        >
          All news <ArrowRight className="size-4" />
        </Link>
      </div>
      <ul className="grid gap-3 md:grid-cols-3">
        {news.map((item) => (
          <li key={item.link}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-5 transition hover:border-ink"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <Newspaper className="size-3.5" /> {item.source}
              </p>
              <h3 className="mt-3 font-semibold leading-snug">{item.title}</h3>
              <ArrowUpRight className="mt-auto size-4 self-end pt-0 text-muted transition group-hover:text-ink" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
