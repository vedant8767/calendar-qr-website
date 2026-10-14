"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarDays,
  Rotate3d,
  Sparkles,
} from "lucide-react";
import { months, YEAR } from "@/lib/months";
import { organs } from "@/lib/organs";
import { useFeaturedMonthIndex } from "@/lib/useToday";
import { CampaignIcon } from "./icons";
import DoctorCard from "./DoctorCard";

const spring = { type: "spring", stiffness: 220, damping: 26 };

export default function Home({ news }) {
  const featured = months[useFeaturedMonthIndex() ?? 0];

  return (
    <div className="overflow-x-clip">
      <section className="relative px-4 pb-8 pt-6 sm:px-6">
        <ColorOrbs />
        <div className="relative mx-auto max-w-6xl">
          <div className="relative mt-1 sm:mt-16">
            {/* One line at every width: the size scales with the viewport. */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className="whitespace-nowrap font-display text-[clamp(1.75rem,8.6vw,5.5rem)] font-semibold leading-none tracking-tight"
            >
              Health Calendar {YEAR}
            </motion.h1>
            <RotatingBadge />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...spring }}
            className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex"
          >
            <Link
              href={`/${featured.slug}`}
              style={{ "--f": featured.theme.accent }}
              className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--f)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:gap-2.5 sm:gap-2 sm:px-6 sm:py-4 sm:text-base"
            >
              <CalendarDays className="size-[18px] sm:size-5" />
              Open {featured.short}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/horoscope"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-ink/15 bg-white px-4 py-3 text-sm font-semibold transition hover:border-ink sm:gap-2 sm:px-6 sm:py-4 sm:text-base"
            >
              <Sparkles className="size-[18px] sm:size-5" /> Horoscope
            </Link>
          </motion.div>
        </div>
      </section>

      <DoctorCard />

      {/* <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="months-heading">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="months-heading" className="font-display text-4xl font-semibold leading-none sm:text-5xl">
            12 months,
            <br />
            <span className="italic text-muted">12 causes.</span>
          </h2>
          <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-muted sm:block">
            Tap a month
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {months.map((m, i) => (
            <motion.li
              key={m.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...spring, delay: (i % 4) * 0.05 }}
            >
              <Link
                href={`/${m.slug}`}
                style={{ "--m": m.theme.accent, "--ms": m.theme.soft, "--md": m.theme.deep }}
                className="group relative flex h-full min-h-48 flex-col overflow-hidden rounded-[1.75rem] bg-[var(--ms)] p-4 text-[var(--md)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--m)] hover:text-white sm:min-h-56 sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tabular-nums opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="size-5 opacity-0 transition group-hover:opacity-100" />
                </div>
                <CampaignIcon
                  name={m.campaign.icon}
                  aria-hidden
                  strokeWidth={1.3}
                  className="absolute -bottom-3 -right-3 size-24 opacity-15 transition duration-500 group-hover:rotate-12 group-hover:scale-110"
                />
                <h3 className="mt-auto font-display text-3xl font-semibold italic leading-none sm:text-4xl">
                  {m.name}
                </h3>
                <p className="mt-2 text-[13px] font-medium leading-snug opacity-80">{m.campaign.title}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider opacity-60">
                  {m.days.length} health days
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section> */}

      {news}

      <BodyTeaser />

      {/* <section className="mx-auto mt-16 grid max-w-6xl gap-3 px-4 sm:grid-cols-3 sm:px-6">
        {[
          {
            icon: CalendarDays,
            title: "Monthly calendar",
            text: "Every observance with what it means — tap a date to jump to it.",
            href: `/${featured.slug}`,
          },
          {
            icon: Brain,
            title: "Quiz of the month",
            text: "Five questions on the month's big campaign, with a full answer report.",
            href: `/${featured.slug}/quiz`,
          },
          {
            icon: Sparkles,
            title: "Horoscope 2027",
            text: "Traits, lucky numbers and your yearly outlook for all 12 signs.",
            href: "/horoscope",
          },
        ].map(({ icon: Icon, title, text, href }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
          >
            <Link
              href={href}
              className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-6 transition hover:border-ink"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white transition group-hover:rotate-6">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </Link>
          </motion.div>
        ))}
      </section> */}

      {/* <footer className="mx-auto mt-16 max-w-6xl px-4 text-xs leading-relaxed text-muted sm:px-6">
        Information is for general awareness and doesn&apos;t replace advice
        from your doctor.
      </footer> */}
    </div>
  );
}

function BodyTeaser() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={spring}
      className="mx-auto mt-16 max-w-6xl px-4 sm:px-6"
    >
      <div className="relative overflow-hidden rounded-[2.25rem] bg-[#0d0c12] p-6 text-white sm:p-10">
        <motion.div
          aria-hidden
          className="absolute -right-16 -top-16 size-72 rounded-full blur-3xl"
          style={{ background: organs[0].color }}
          animate={{
            scale: [1, 1.12, 1, 1.06, 1],
            opacity: [0.35, 0.55, 0.35, 0.45, 0.35],
          }}
          transition={{
            duration: 0.83,
            repeat: Infinity,
            times: [0, 0.1, 0.25, 0.32, 0.5],
          }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              <Rotate3d className="size-4" /> New · Anatomy in 3D
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.9] sm:text-6xl">
              Inside <span className="italic text-[#ff6b7f]">you.</span>
            </h2>
            <p className="mt-4 max-w-sm text-white/65">
              Spin a beating heart, watch lungs breathe and a stomach churn —
              and learn what each organ does for you every day.
            </p>
            <Link
              href="/body"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition hover:gap-3"
            >
              Explore the body <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {organs.map((o, i) => (
              <motion.li
                key={o.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.1 + i * 0.04 }}
              >
                <Link
                  href={`/body/${o.slug}`}
                  className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm font-medium transition hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full transition group-hover:scale-150"
                    style={{
                      background: o.color,
                      boxShadow: `0 0 12px ${o.color}`,
                    }}
                  />
                  {o.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

function ColorOrbs() {
  const orbs = [
    {
      color: months[9].theme.accent,
      className: "right-[-6rem] top-[-4rem] size-72 sm:size-96",
      dur: 14,
    },
    {
      color: months[0].theme.accent,
      className: "right-[20%] top-[40%] size-40 sm:size-56",
      dur: 18,
    },
    {
      color: months[4].theme.accent,
      className: "right-[-3rem] bottom-[-2rem] size-48",
      dur: 16,
    },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-25 blur-3xl ${o.className}`}
          style={{ background: o.color }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function RotatingBadge() {
  return (
    <motion.div
      aria-hidden
      className="absolute right-0 top-0 hidden size-44 lg:block"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--ink)" />
        <text
          fill="var(--paper)"
          fontSize="17"
          fontFamily="var(--font-poppins)"
          letterSpacing="5"
        >
          <textPath href="#badge-circle">
            CALENDAR · QUIZ · STARS · HEALTH ·
          </textPath>
        </text>
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fontSize="44"
          fill="var(--paper)"
          fontFamily="var(--font-playfair)"
          fontStyle="italic"
        >
          ✦
        </text>
      </svg>
    </motion.div>
  );
}
