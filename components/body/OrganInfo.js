"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Lightbulb } from "lucide-react";
import { organs, slugify } from "@/lib/organs";
import { getMonth } from "@/lib/months";

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, type: "spring", stiffness: 240, damping: 26 } }),
};

function Reveal({ i = 0, className, children }) {
  return (
    <motion.section
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      custom={i}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function OrganInfo({ slug }) {
  const index = organs.findIndex((o) => o.slug === slug);
  const organ = organs[index];
  const prev = organs[(index + organs.length - 1) % organs.length];
  const next = organs[(index + 1) % organs.length];

  return (
    <article style={{ "--organ": organ.color }} className="space-y-5">
      <Reveal className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--organ)]">
            Organ {String(index + 1).padStart(2, "0")} / {String(organs.length).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-display text-5xl font-semibold italic leading-none sm:text-6xl">{organ.name}</h2>
          <p className="mt-2 text-lg font-medium text-muted">{organ.tagline}</p>
        </div>
        <BodyMap organ={organ} />
      </Reveal>

      <Reveal i={1}>
        <p className="text-[17px] leading-relaxed">{organ.intro}</p>
        <dl className="mt-5 grid grid-cols-3 gap-2">
          {organ.stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse justify-end rounded-2xl border border-line bg-white px-3 py-3">
              <dt className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{label}</dt>
              <dd className="font-display text-lg font-semibold leading-tight text-[var(--organ)] sm:text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="rounded-[2rem] border border-line bg-white p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold">How it works</h3>
        <ol className="relative mt-5 space-y-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-line">
          {organ.steps.map(([title, text], i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-4"
            >
              <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-[var(--organ)] font-mono text-xs font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="rounded-[2rem] bg-ink p-5 text-white sm:p-6">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">Why it matters</h3>
        <p className="mt-3 leading-relaxed text-white/85">{organ.why}</p>
      </Reveal>

      <Reveal className="rounded-[2rem] border border-line bg-white p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold">Keep it healthy</h3>
        <ul className="mt-4 space-y-3">
          {organ.tips.map((tip) => (
            <li key={tip} className="flex gap-3 text-[15px] leading-snug">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--organ)_18%,white)] text-[var(--organ)]">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="flex gap-3 rounded-[2rem] bg-[color-mix(in_oklab,var(--organ)_14%,white)] p-5 sm:p-6">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-[var(--organ)]" />
        <p className="leading-relaxed">
          <span className="font-semibold">Did you know? </span>
          {organ.fact}
        </p>
      </Reveal>

      <Reveal>
        <h3 className="flex items-center gap-2 px-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <CalendarDays className="size-4" /> On the calendar
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {organ.calendar.map((c) => {
            const month = getMonth(c.month);
            return (
              <li key={c.title}>
                <Link
                  href={`/${c.month}#${slugify(c.title)}`}
                  style={{ "--m": month.theme.accent }}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3 transition hover:border-[var(--m)]"
                >
                  <span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--m)]">{c.date}</span>
                    <span className="block text-sm font-semibold leading-snug">{c.title}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-[var(--m)]" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <nav aria-label="More organs" className="grid grid-cols-2 gap-2 pt-2">
        {[
          [prev, "Previous", ArrowLeft],
          [next, "Next", ArrowRight],
        ].map(([o, label, Icon], i) => (
          <Link
            key={label}
            href={`/body/${o.slug}`}
            scroll={false}
            className={`group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-ink/30 ${
              i ? "flex-row-reverse text-right" : ""
            }`}
          >
            <Icon className="size-4 shrink-0 text-muted transition group-hover:text-ink" />
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">{label}</span>
              <span className="font-semibold" style={{ color: o.color }}>
                {o.name}
              </span>
            </span>
          </Link>
        ))}
      </nav>

      <p className="px-1 text-xs leading-relaxed text-muted">
        3D models are simplified illustrations. Information is for general awareness and doesn&apos;t replace advice
        from your doctor.
      </p>
    </article>
  );
}

// A small silhouette showing where the organ sits.
function BodyMap({ organ }) {
  const { x, y, r } = organ.map;
  return (
    <svg viewBox="0 0 100 220" className="h-36 w-auto shrink-0 sm:h-40" role="img" aria-label={`Location of the ${organ.name.toLowerCase()} in the body`}>
      <g fill="var(--line)" stroke="var(--line)" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="50" cy="18" rx="11" ry="13" />
        <rect x="45" y="28" width="10" height="12" rx="3" />
        <path d="M30 40 Q50 34 70 40 L73 72 Q72 96 66 120 L34 120 Q28 96 27 72 Z" />
        <path d="M29 44 L19 82 L15 120" fill="none" strokeWidth="9" />
        <path d="M71 44 L81 82 L85 120" fill="none" strokeWidth="9" />
        <path d="M42 116 L40 165 L40 210" fill="none" strokeWidth="13" />
        <path d="M58 116 L60 165 L60 210" fill="none" strokeWidth="13" />
      </g>
      {organs
        .filter((o) => o.slug !== organ.slug)
        .map((o) => (
          <circle key={o.slug} cx={o.map.x} cy={o.map.y} r="1.6" fill="var(--muted)" opacity="0.35" />
        ))}
      <motion.circle
        key={organ.slug}
        cx={x}
        cy={y}
        fill={organ.color}
        initial={{ r: 0 }}
        animate={{ r }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={organ.color}
        strokeWidth="1.5"
        animate={{ r: [r, r + 8], opacity: [0.8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}
