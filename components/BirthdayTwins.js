"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Music2, Users } from "lucide-react";
import { findBirthdayTwins } from "@/lib/birthdayTwins";
import { months } from "@/lib/months";

// The data set is ~170 KB, so it's fetched as its own chunk the first time
// someone enters a birthday rather than shipped with the page.
let dataPromise;
const loadData = () => (dataPromise ??= import("@/lib/birthdayData"));

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, type: "spring", stiffness: 260, damping: 26 } }),
};

export default function BirthdayTwins({ dob }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    loadData().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, []);

  if (!data) {
    return <div className="mt-10 h-64 animate-pulse rounded-[2rem] bg-white/[0.04]" />;
  }

  const { actors, movies, songs } = findBirthdayTwins(data, dob);
  const dateLabel = `${dob.day} ${months[dob.month - 1].name}`;

  return (
    <section id="birthday-twins" aria-labelledby="twins-heading" className="mt-10 scroll-mt-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-8">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
          <Users className="size-4" /> Birthday twins
        </p>
        <h2 id="twins-heading" className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Born on <span className="italic" style={{ color: "var(--el)" }}>{dateLabel}</span>
        </h2>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul
            key={dateLabel}
            initial="hidden"
            animate="show"
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {actors.length ? (
              actors.map((a, i) => (
                <motion.li key={a.name + a.date} variants={rise} custom={i}>
                  <PersonCard person={a} />
                </motion.li>
              ))
            ) : (
              <li className="text-white/60 sm:col-span-2 lg:col-span-3">
                No stars in our list share this birthday — you&apos;re one of a kind.
              </li>
            )}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-8 border-t border-white/10 pt-6">
          {dob.year ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <YearCard icon={Clapperboard} label="Hit movie" pick={movies} year={dob.year}>
                {(m) => <p className="font-display text-2xl font-semibold leading-tight">{m.title}</p>}
              </YearCard>
              <YearCard icon={Music2} label="Hit song" pick={songs} year={dob.year}>
                {(s) => (
                  <>
                    <p className="font-display text-2xl font-semibold leading-tight">{s.title}</p>
                    {s.movie !== s.title && <p className="mt-0.5 text-sm text-white/55">from {s.movie}</p>}
                  </>
                )}
              </YearCard>
            </div>
          ) : (
            <p className="text-white/60">
              Add your birth year above to see the hit movie and song of the year you were born.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PersonCard({ person }) {
  const initials = person.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <article className="flex h-full gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-semibold text-[#0b0a1a]"
        style={{ background: "var(--el)" }}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug">{person.name}</h3>
        <p className="font-mono text-[11px] uppercase tracking-wider text-white/45">
          {[person.profession, `Born ${person.birthYear}`].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{person.bio}</p>
      </div>
    </article>
  );
}

function YearCard({ icon: Icon, label, pick, year, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
        <Icon className="size-4" style={{ color: "var(--el)" }} /> {label} of {pick?.exact ? year : pick?.year ?? year}
      </p>
      {pick ? (
        <div className="mt-3 space-y-3">
          {pick.items.map((item) => (
            <div key={item.title}>{children(item)}</div>
          ))}
          {!pick.exact && (
            <p className="text-xs text-white/45">
              Our list doesn&apos;t have {year} — this is the closest year we have.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-3 text-white/60">Nothing on record yet.</p>
      )}
    </div>
  );
}
