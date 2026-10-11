"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Brain, ChevronLeft, ChevronRight, PersonStanding } from "lucide-react";
import { buildMonthGrid, eventsOnDay, months, themeStyle, typeLabels, YEAR } from "@/lib/months";
import { useToday } from "@/lib/useToday";
import { CampaignIcon } from "./icons";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 260, damping: 26 },
  }),
};

export default function MonthExperience({ month, prev, next, quizTopic }) {
  const [selected, setSelected] = useState(null);
  const today = useToday();
  const isThisMonth = today?.year === YEAR && today?.month === month.index;

  return (
    <div style={themeStyle(month.theme)} className="relative">
      <Hero month={month} prev={prev} next={next} />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <CalendarCard
            month={month}
            selected={selected}
            onSelect={setSelected}
            todayDay={isThisMonth ? today.day : null}
          />
        </div>
        <div className="mt-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <DayList month={month} selected={selected} onSelect={setSelected} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <QuizCard month={month} topic={quizTopic} />
        </div>
      </main>

      <MonthStrip current={month.slug} />
    </div>
  );
}

function Hero({ month, prev, next }) {
  return (
    <header className="relative overflow-hidden px-4 pb-8 pt-5 sm:px-6">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[22rem] rounded-full bg-accent-soft sm:size-[34rem]"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 top-40 size-24 rounded-full border-[10px] border-accent/25 sm:right-40"
        animate={{ y: [0, -14, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted hover:text-ink"
          >
            Health Calendar · {YEAR}
          </Link>
          <div className="flex gap-2">
            <PagerButton href={`/${prev.slug}`} label={`Previous: ${prev.name}`}>
              <ChevronLeft className="size-5" />
            </PagerButton>
            <PagerButton href={`/${next.slug}`} label={`Next: ${next.name}`}>
              <ChevronRight className="size-5" />
            </PagerButton>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end lg:gap-10">
          <div className="mt-10 sm:mt-14">
            <motion.p
              variants={rise}
              initial="hidden"
              animate="show"
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              Month {String(month.index + 1).padStart(2, "0")} / 12
            </motion.p>
            <h1 className="font-display text-[clamp(4.25rem,19vw,11rem)] font-semibold italic leading-[0.85] tracking-tight">
              {month.name.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: "40%", rotate: 6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.05 + i * 0.035, type: "spring", stiffness: 300, damping: 24 }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
            <motion.p
              variants={rise}
              initial="hidden"
              animate="show"
              custom={3}
              className="font-display text-[clamp(2.5rem,10vw,5rem)] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_var(--accent)]"
            >
              {YEAR}
            </motion.p>
          </div>

          <motion.section
            variants={rise}
            initial="hidden"
            animate="show"
            custom={5}
            className="relative mt-8 overflow-hidden rounded-[2rem] bg-accent p-6 text-white shadow-xl shadow-[color-mix(in_oklab,var(--accent)_35%,transparent)] sm:max-w-xl sm:p-7 lg:mb-2"
          >
            <CampaignIcon
              name={month.campaign.icon}
              aria-hidden
              className="absolute -bottom-6 -right-6 size-36 text-white/15"
              strokeWidth={1.2}
            />
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/75">
              <CampaignIcon name={month.campaign.icon} className="size-4" />
              Spotlight of the month
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {month.campaign.title}
            </h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/85">
              {month.campaign.blurb}
            </p>
            {month.organ && (
              <Link
                href={`/body/${month.organ}`}
                className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <PersonStanding className="size-4" />
                See the {month.organ} in 3D
                <ArrowRight className="size-4" />
              </Link>
            )}
          </motion.section>
        </div>
      </div>
    </header>
  );
}

function PagerButton({ href, label, children }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-line bg-white/70 text-ink backdrop-blur transition hover:scale-105 hover:border-accent hover:text-accent active:scale-95"
    >
      {children}
    </Link>
  );
}

function CalendarCard({ month, selected, onSelect, todayDay }) {
  const weeks = buildMonthGrid(YEAR, month.index);
  const events = selected ? eventsOnDay(month, selected) : [];

  return (
    <motion.section
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[2rem] border border-line bg-white p-4 shadow-sm sm:p-6"
      aria-label={`${month.name} ${YEAR} calendar`}
    >
      <div className="mb-4 flex items-baseline justify-between px-1">
        <h2 className="font-display text-xl font-semibold">
          {month.name} <span className="text-muted">{YEAR}</span>
        </h2>
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <span className="size-2 rounded-full bg-accent" /> Health day
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`pb-2 font-mono text-[11px] uppercase tracking-wider ${i === 0 ? "text-accent" : "text-muted"}`}
          >
            <span className="sm:hidden">{d[0]}</span>
            <span className="hidden sm:inline">{d}</span>
          </div>
        ))}

        {weeks.flat().map((day, i) => {
          if (!day) return <div key={`pad-${i}`} />;
          const dayEvents = eventsOnDay(month, day);
          const hasSingle = dayEvents.some((e) => !e.endDay);
          const hasRange = dayEvents.some((e) => e.endDay);
          const isSunday = i % 7 === 0;
          const isSelected = selected === day;

          return (
            <button
              key={day}
              type="button"
              disabled={!dayEvents.length}
              onClick={() => onSelect(isSelected ? null : day)}
              aria-pressed={isSelected}
              aria-label={`${day} ${month.name}${dayEvents.length ? `: ${dayEvents.map((e) => e.title).join(", ")}` : ""}`}
              className={`relative grid aspect-square place-items-center rounded-2xl text-[15px] tabular-nums transition sm:text-base ${
                hasSingle
                  ? "cursor-pointer bg-accent font-semibold text-white hover:brightness-110"
                  : hasRange
                    ? "cursor-pointer bg-accent-soft font-medium text-accent-deep hover:brightness-95"
                    : isSunday
                      ? "text-accent"
                      : "text-ink/80"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="day-ring"
                  className="absolute -inset-0.5 rounded-[1.1rem] ring-[2.5px] ring-ink"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {todayDay === day && (
                <span className="absolute inset-x-0 bottom-1 mx-auto h-0.5 w-4 rounded-full bg-current" />
              )}
              <span className="relative">{day}</span>
              {dayEvents.length > 1 && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-ink text-[9px] font-bold text-white">
                  {dayEvents.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-14">
        <AnimatePresence mode="wait" initial={false}>
          {events.length ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {events.map((e) => (
                <a
                  key={e.title}
                  href={`#${slugify(e.title)}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-paper px-4 py-3 text-sm transition hover:bg-accent-soft"
                >
                  <span>
                    <span className="font-mono text-xs text-accent">
                      {WEEKDAYS[new Date(YEAR, month.index, selected).getDay()]}, {selected}{" "}
                      {month.short}
                    </span>
                    <span className="block font-semibold">{e.title}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
                </a>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-1 pt-3 text-sm text-muted"
            >
              Tap a highlighted date to see what&apos;s observed.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function DayList({ month, selected, onSelect }) {
  return (
    <section aria-labelledby="days-heading">
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <h2 id="days-heading" className="font-display text-3xl font-semibold leading-none sm:text-4xl">
          Health days
        </h2>
        <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent-deep">
          {month.days.length} this month
        </span>
      </div>

      <ol className="space-y-3">
        {month.days.map((d, i) => {
          const active =
            selected != null && (d.endDay ? selected >= d.day && selected <= d.endDay : selected === d.day);
          const weekday = WEEKDAYS[new Date(YEAR, month.index, d.day).getDay()];
          return (
            <motion.li
              key={d.title}
              id={slugify(d.title)}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i % 3}
              className="scroll-mt-6"
            >
              <button
                type="button"
                onClick={() => onSelect(active ? null : d.day)}
                className={`flex w-full gap-4 rounded-3xl border bg-white p-4 text-left transition sm:p-5 ${
                  active
                    ? "border-accent shadow-lg shadow-[color-mix(in_oklab,var(--accent)_18%,transparent)]"
                    : "border-line hover:border-accent/50"
                }`}
              >
                <div
                  className={`flex w-16 shrink-0 flex-col items-center justify-center self-start rounded-2xl py-3 transition ${
                    active ? "bg-accent text-white" : "bg-accent-soft text-accent-deep"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                    {d.endDay ? month.short : weekday}
                  </span>
                  <span className="font-display text-2xl font-semibold leading-tight tabular-nums">
                    {d.day}
                    {d.endDay && <span className="text-base">–{d.endDay}</span>}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="inline-block rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {typeLabels[d.type]}
                  </span>
                  <h3 className="mt-1.5 font-semibold leading-snug">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{d.description}</p>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}

function QuizCard({ month, topic }) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link
        href={`/${month.slug}/quiz`}
        className="group relative block overflow-hidden rounded-[2rem] bg-accent-deep p-6 text-white sm:p-7"
      >
        <motion.span
          aria-hidden
          className="absolute -right-4 -top-10 font-display text-[10rem] font-bold italic leading-none text-white/10"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ?
        </motion.span>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
          <Brain className="size-4" /> Quiz of the month
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">{topic}</h3>
        <p className="mt-1 text-sm text-white/70">5 questions · about 2 minutes</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-accent-deep transition group-hover:gap-3">
          Take the quiz <ArrowRight className="size-4" />
        </span>
      </Link>
    </motion.div>
  );
}

function MonthStrip({ current }) {
  return (
    <nav aria-label="All months" className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
      <p className="mb-3 px-1 font-mono text-xs uppercase tracking-[0.25em] text-muted">Jump to month</p>
      <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {months.map((m) => (
          <li key={m.slug} className="shrink-0">
            <Link
              href={`/${m.slug}`}
              aria-current={m.slug === current ? "page" : undefined}
              style={{ "--chip": m.theme.accent }}
              className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition hover:border-[var(--chip)] aria-[current=page]:border-transparent aria-[current=page]:bg-[var(--chip)] aria-[current=page]:text-white"
            >
              <span
                className={`size-2 rounded-full ${m.slug === current ? "bg-white" : "bg-[var(--chip)]"}`}
              />
              {m.short}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
