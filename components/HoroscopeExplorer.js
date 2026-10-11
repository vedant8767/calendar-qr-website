"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Briefcase, Leaf, Sparkles, Search } from "lucide-react";
import { elements, findSign, signs } from "@/lib/zodiac";
import { months, YEAR } from "@/lib/months";
import { useToday } from "@/lib/useToday";

const OUTLOOK_TABS = [
  { key: "love", label: "Love", icon: Heart },
  { key: "career", label: "Career", icon: Briefcase },
  { key: "wellness", label: "Wellness", icon: Leaf },
];

// Shortest signed angle to turn from `from` to land on `to`.
function turn(from, to) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}

export default function HoroscopeExplorer() {
  const today = useToday();
  const todaySign = today ? findSign(today.month + 1, today.day) : null;
  const [picked, setPicked] = useState(null);
  const [rotation, setRotation] = useState(null);
  const [filter, setFilter] = useState("All");

  const sign = signs.find((s) => s.slug === picked) ?? todaySign ?? signs[0];
  const signIndex = signs.indexOf(sign);
  const wheelRotation = rotation ?? -signIndex * 30;

  const select = (slug, { scroll = false } = {}) => {
    const idx = signs.findIndex((s) => s.slug === slug);
    setPicked(slug);
    setRotation(turn(wheelRotation, -idx * 30));
    if (scroll) {
      requestAnimationFrame(() =>
        document.getElementById("sign-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  const element = elements[sign.element];
  const visible = filter === "All" ? signs : signs.filter((s) => s.element === filter);

  return (
    <div
      style={{ "--el": element.color, "--el-glow": element.glow }}
      className="relative -mb-28 min-h-dvh overflow-hidden bg-[#0b0a1a] pb-36 text-white"
    >
      <StarField />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10rem] size-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl transition-colors duration-700"
        style={{ background: "radial-gradient(circle, var(--el) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <header className="text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2 }}
            className="font-mono text-[11px] uppercase text-white/50"
          >
            Your stars · {YEAR}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 24 }}
            className="mt-3 font-display text-[clamp(3rem,12vw,6.5rem)] font-semibold italic leading-[0.9] tracking-tight"
          >
            Horoscope
          </motion.h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            Spin the wheel, find your sign, and peek at what {YEAR} has in store for love, work and
            well-being.
          </p>
        </header>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <Wheel sign={sign} rotation={wheelRotation} onSelect={select} />
          <BirthdayFinder onFound={(slug) => select(slug, { scroll: true })} />
        </div>

        <section aria-label="All signs" className="mt-14">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0">
            {["All", ...Object.keys(elements)].map((el) => (
              <button
                key={el}
                type="button"
                onClick={() => setFilter(el)}
                aria-pressed={filter === el}
                className="relative shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white aria-pressed:text-[#0b0a1a]"
              >
                {filter === el && (
                  <motion.span
                    layoutId="element-filter"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {el !== "All" && (
                    <span className="size-2 rounded-full" style={{ background: elements[el].color }} />
                  )}
                  {el}
                </span>
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {visible.map((s) => {
                const active = s.slug === sign.slug;
                const c = elements[s.element].color;
                return (
                  <motion.li
                    key={s.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <button
                      type="button"
                      onClick={() => select(s.slug, { scroll: true })}
                      aria-pressed={active}
                      className="group relative flex w-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-2 py-4 transition hover:bg-white/[0.08] sm:py-5"
                      style={active ? { borderColor: c, boxShadow: `0 0 0 1px ${c}, 0 10px 40px -10px ${c}` } : undefined}
                    >
                      <span
                        className="font-display text-4xl leading-none transition group-hover:scale-110 sm:text-5xl"
                        style={{ color: c }}
                      >
                        {s.glyph}
                      </span>
                      <span className="mt-2 text-sm font-semibold">{s.name}</span>
                      <span className="mt-0.5 text-[10px] text-white/45 sm:text-[11px]">{s.dates}</span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </section>

        <SignDetail sign={sign} onSelect={(slug) => select(slug, { scroll: true })} />
      </div>
    </div>
  );
}

// Fixed decimals keep server and client markup byte-identical.
const WHEEL_POSITIONS = signs.map((_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  return {
    left: `${(50 + 43 * Math.cos(angle)).toFixed(2)}%`,
    top: `${(50 + 43 * Math.sin(angle)).toFixed(2)}%`,
  };
});

function Wheel({ sign, rotation, onSelect }) {
  const element = elements[sign.element];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem]">
      {/* pointer */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
        <div className="size-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-white" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-full border border-white/15"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 60, damping: 16 }}
      >
        <div className="absolute inset-[14%] rounded-full border border-dashed border-white/10" />
        {signs.map((s, i) => {
          const active = s.slug === sign.slug;
          return (
            <motion.button
              key={s.slug}
              type="button"
              onClick={() => onSelect(s.slug)}
              aria-label={s.name}
              className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-xl transition-colors sm:size-12 sm:text-2xl"
              style={{
                left: WHEEL_POSITIONS[i].left,
                top: WHEEL_POSITIONS[i].top,
                color: active ? "#0b0a1a" : elements[s.element].color,
                background: active ? elements[s.element].color : "rgb(255 255 255 / 0.05)",
              }}
              animate={{ rotate: -rotation, scale: active ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              {s.glyph}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="absolute inset-[24%] grid place-items-center rounded-full bg-white/[0.03] text-center ring-1 ring-white/10 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={sign.slug}
            initial={{ opacity: 0, scale: 0.7, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(6px)" }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="font-display text-6xl leading-none sm:text-7xl"
              style={{ color: element.color, textShadow: `0 0 40px ${element.glow}` }}
            >
              {sign.glyph}
            </div>
            <div className="mt-2 font-display text-2xl font-semibold italic">{sign.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              {sign.dates}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BirthdayFinder({ onFound }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const daysInMonth = month ? new Date(2024, Number(month), 0).getDate() : 31; // leap year: allow 29 Feb
  const found = month && day && Number(day) <= daysInMonth ? findSign(Number(month), Number(day)) : null;

  const field =
    "w-full appearance-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-white/40 [&>option]:text-ink";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (found) onFound(found.slug);
      }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8"
    >
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
        <Search className="size-4" /> Find your sign
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">When&apos;s your birthday?</h2>

      <div className="mt-6 grid grid-cols-[1.4fr_1fr] gap-3">
        <label className="block">
          <span className="sr-only">Birth month</span>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={field}>
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m.slug} value={m.index + 1}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Birth day</span>
          <select value={day} onChange={(e) => setDay(e.target.value)} className={field}>
            <option value="">Day</option>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>

      <AnimatePresence initial={false}>
        {found && (
          <motion.p
            key={found.slug}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-white/70"
          >
            <span className="block pt-5">
              You&apos;re a{" "}
              <strong className="font-semibold" style={{ color: elements[found.element].color }}>
                {found.glyph} {found.name}
              </strong>{" "}
              — a {found.element.toLowerCase()} sign ruled by {found.planet}.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={!found}
        whileTap={{ scale: 0.97 }}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#0b0a1a] transition disabled:opacity-30"
      >
        <Sparkles className="size-4" /> Reveal my {YEAR}
      </motion.button>
    </form>
  );
}

function SignDetail({ sign, onSelect }) {
  const [tab, setTab] = useState("love");
  const element = elements[sign.element];

  const facts = [
    ["Element", sign.element],
    ["Quality", sign.modality],
    ["Ruler", sign.planet],
    ["Lucky no.", sign.luckyNumber],
    ["Lucky colour", sign.luckyColor],
    ["Body area", sign.bodyArea],
  ];

  return (
    <section id="sign-detail" aria-live="polite" className="mt-16 scroll-mt-6">
      <AnimatePresence mode="wait">
        <motion.article
          key={sign.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-12 font-display text-[16rem] leading-none opacity-[0.08] sm:text-[22rem]"
            style={{ color: element.color }}
          >
            {sign.glyph}
          </span>

          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: element.color }}>
              {sign.symbol} · {sign.dates}
            </p>
            <h2 className="mt-2 font-display text-[clamp(3rem,12vw,6rem)] font-semibold italic leading-[0.9]">
              {sign.name}
            </h2>
            <p className="mt-3 max-w-lg text-white/60">{element.note}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {sign.traits.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{ borderColor: `${element.color}66`, color: element.glow }}
                >
                  {t}
                </motion.li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/[0.05] px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-white/45">{k}</dt>
                  <dd className="mt-1 text-sm font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/[0.05] p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-emerald-300">Strengths</h3>
                <p className="mt-2 text-white/80">{sign.strengths}</p>
              </div>
              <div className="rounded-3xl bg-white/[0.05] p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-rose-300">Watch out for</h3>
                <p className="mt-2 text-white/80">{sign.challenges}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold">{YEAR} outlook</h3>
              <div role="tablist" className="mt-4 inline-flex rounded-full bg-white/[0.06] p-1">
                {OUTLOOK_TABS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className="relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white/60 transition aria-selected:text-[#0b0a1a]"
                  >
                    {tab === key && (
                      <motion.span
                        layoutId="outlook-tab"
                        className="absolute inset-0 rounded-full"
                        style={{ background: element.color }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon className="relative size-4" />
                    <span className="relative">{label}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tab}
                  role="tabpanel"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="mt-5 max-w-2xl font-display text-xl leading-relaxed text-white/90 sm:text-2xl"
                >
                  {sign.outlook[tab]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">Best matches</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {sign.compatible.map((name) => {
                  const match = signs.find((s) => s.name === name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => onSelect(match.slug)}
                      className="flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium transition hover:bg-white/[0.12]"
                    >
                      <span style={{ color: elements[match.element].color }}>{match.glyph}</span>
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-10 text-xs text-white/35">
              For fun and reflection only — not medical, financial or life advice.
            </p>
          </div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}

// Seeded pseudo-random so the sky is identical on server and client.
const STARS = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const r = (scale, offset = 0) => (offset + rand() * scale).toFixed(2);
  return Array.from({ length: 70 }, () => ({
    left: r(100),
    top: r(100),
    size: r(2, 0.6),
    delay: r(4),
    duration: r(3, 2.5),
  }));
})();

function StarField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
