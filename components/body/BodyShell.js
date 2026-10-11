"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Rotate3d, Tags } from "lucide-react";
import { getOrgan, organs } from "@/lib/organs";

const OrganStage = dynamic(() => import("./OrganStage"), {
  ssr: false,
  loading: () => <StageLoading />,
});

export default function BodyShell({ children }) {
  const pathname = usePathname();
  const organ = getOrgan(pathname.split("/")[2]) ?? organs[0];
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div style={{ "--organ": organ.color }} className="overflow-x-clip">
      <header className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Anatomy in 3D</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,12vw,6rem)] font-semibold leading-[0.9] tracking-tight">
          Inside <span className="italic text-[var(--organ)] transition-colors duration-500">you.</span>
        </h1>
        <p className="mt-3 max-w-md text-muted">
          Pick an organ, spin it around and watch it work — then learn how to keep it healthy.
        </p>
      </header>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div className="min-w-0 lg:sticky lg:top-4 lg:self-start">
          <div className="relative h-[58vh] min-h-[22rem] overflow-hidden rounded-[2rem] bg-[#0d0c12] lg:h-[calc(100dvh-9rem)]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-50 transition-[background] duration-700"
              style={{ background: `radial-gradient(60% 50% at 50% 45%, ${organ.color}55, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <OrganStage organ={organ} showLabels={showLabels} />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={organ.slug}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="text-white"
                >
                  <p className="font-display text-2xl font-semibold italic leading-none">{organ.name}</p>
                  <p className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/70">
                    <Vital slug={organ.slug} color={organ.color} />
                    {organ.vital}
                  </p>
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setShowLabels((v) => !v)}
                aria-pressed={showLabels}
                className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/20 aria-pressed:bg-white aria-pressed:text-ink"
              >
                <Tags className="size-3.5" /> Labels
              </button>
            </div>

            <p className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-white/50">
              <Rotate3d className="size-3.5" />
              {organ.slug === "eye" ? "Move your finger — it's watching" : "Drag sideways to rotate"}
            </p>
          </div>

          <OrganPicker current={organ.slug} />
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

function OrganPicker({ current }) {
  return (
    <nav aria-label="Organs" className="mt-4">
      <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {organs.map((o) => {
          const active = o.slug === current;
          return (
            <li key={o.slug} className="shrink-0">
              <Link
                href={`/body/${o.slug}`}
                scroll={false}
                prefetch
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active ? "border-transparent text-white" : "border-line bg-white hover:border-ink/30"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="organ-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: o.color }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className="relative size-2 rounded-full"
                  style={{ background: active ? "white" : o.color }}
                />
                <span className="relative">{o.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Vital({ slug, color }) {
  if (slug === "heart") {
    return (
      <svg viewBox="0 0 60 16" className="h-3.5 w-12" aria-hidden>
        <motion.path
          d="M0 8h14l3-5 4 11 4-13 3 7h32"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.83, repeat: Infinity, ease: "linear", times: [0, 0.7, 1] }}
        />
      </svg>
    );
  }
  return (
    <span className="relative flex size-2">
      <span className="absolute inset-0 animate-ping rounded-full" style={{ background: color }} />
      <span className="relative size-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

function StageLoading() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="size-16 rounded-full border-2 border-white/10 border-t-[var(--organ)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
