"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import { CampaignIcon } from "./icons";

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({ month, quiz, next }) {
  const total = quiz.questions.length;
  const [phase, setPhase] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));

  const go = (to) => {
    setDirection(to > current ? 1 : -1);
    setCurrent(to);
  };

  const restart = () => {
    setAnswers(Array(total).fill(null));
    setCurrent(0);
    setDirection(1);
    setPhase("play");
  };

  return (
    <div className="mx-auto min-h-[calc(100dvh-7rem)] max-w-3xl overflow-x-clip px-4 pt-5 sm:px-6">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <Intro key="intro" month={month} quiz={quiz} onStart={() => setPhase("play")} />
        )}
        {phase === "play" && (
          <motion.div
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Player
              month={month}
              quiz={quiz}
              current={current}
              direction={direction}
              answers={answers}
              onAnswer={(choice) =>
                setAnswers((a) => a.map((v, i) => (i === current ? choice : v)))
              }
              onBack={() => go(current - 1)}
              onNext={() => {
                if (current < total - 1) return go(current + 1);
                setPhase("report");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        )}
        {phase === "report" && (
          <Report
            key="report"
            month={month}
            quiz={quiz}
            answers={answers}
            next={next}
            onRetry={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Intro({ month, quiz, onStart }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-accent-deep px-6 pb-8 pt-6 text-white sm:px-10 sm:pb-12 sm:pt-8"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-16 font-display text-[18rem] font-bold italic leading-none text-white/[0.07]"
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        ?
      </motion.span>

      <Link
        href={`/${month.slug}`}
        className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20"
      >
        <ArrowLeft className="size-3.5" /> {month.name} calendar
      </Link>

      <div className="relative mt-16 sm:mt-24">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
          <CampaignIcon name={month.campaign.icon} className="size-4" />
          {month.name} quiz · {month.campaign.title}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,13vw,6.5rem)] font-semibold italic leading-[0.9] tracking-tight">
          {quiz.topic}
        </h1>
        <p className="mt-5 max-w-md text-white/75">
          Five quick questions on this month&apos;s big health campaign. Answer them all, then see
          your score with the right answers explained.
        </p>

        <dl className="mt-8 grid max-w-md grid-cols-3 gap-2 text-center">
          {[
            ["5", "Questions"],
            ["~2", "Minutes"],
            ["1", "Report"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-2xl bg-white/10 px-2 py-3">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-semibold">{n}</dd>
              <dd className="font-mono text-[10px] uppercase tracking-wider text-white/60">{label}</dd>
            </div>
          ))}
        </dl>

        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-accent-deep shadow-xl shadow-black/20"
        >
          Start quiz <ArrowRight className="size-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}

function Player({ month, quiz, current, direction, answers, onAnswer, onBack, onNext }) {
  const total = quiz.questions.length;
  const question = quiz.questions[current];
  const chosen = answers[current];

  return (
    <section aria-live="polite">
      <div className="flex items-center gap-3">
        <Link
          href={`/${month.slug}`}
          aria-label="Exit quiz"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white text-muted hover:text-ink"
        >
          <X className="size-5" />
        </Link>
        <div className="flex flex-1 gap-1.5">
          {quiz.questions.map((_, i) => (
            <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{
                  width: i < current || answers[i] != null ? "100%" : i === current ? "35%" : "0%",
                  opacity: i === current && answers[i] == null ? 0.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 28 }}
              />
            </div>
          ))}
        </div>
        <span className="w-12 shrink-0 text-right font-mono text-sm tabular-nums text-muted">
          {current + 1}/{total}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d) => ({ opacity: 0, x: d * 60 }),
            center: { opacity: 1, x: 0 },
            exit: (d) => ({ opacity: 0, x: d * -60 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="pt-10 sm:pt-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Question {String(current + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,6.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            {question.q}
          </h2>

          <div role="radiogroup" aria-label="Answer options" className="mt-8 grid gap-3">
            {question.options.map((opt, i) => {
              const isChosen = chosen === i;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={isChosen}
                  onClick={() => onAnswer(i)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border-2 p-4 text-left transition-colors sm:p-5 ${
                    isChosen
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-white hover:border-accent/50"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold transition-colors ${
                      isChosen ? "bg-white text-accent" : "bg-accent-soft text-accent-deep"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="font-medium leading-snug">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={current === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium text-muted transition hover:text-ink disabled:invisible"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        <motion.button
          type="button"
          onClick={onNext}
          disabled={chosen == null}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          {current === total - 1 ? "See my report" : "Next"}
          <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </section>
  );
}

const verdicts = [
  "Keep learning!",
  "Keep learning!",
  "Good start!",
  "Nicely done!",
  "Brilliant!",
  "Perfect score!",
];

function Report({ month, quiz, answers, next, onRetry }) {
  const total = quiz.questions.length;
  const score = quiz.questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const pct = score / total;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 26 }}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-accent-deep px-6 py-10 text-center text-white sm:py-14">
        {score >= 4 && <Confetti />}
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
          Your {month.name} report
        </p>

        <div className="relative mx-auto mt-6 size-44">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: pct }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 18 }}
              className="font-display text-6xl font-semibold tabular-nums"
            >
              {score}
              <span className="text-2xl text-white/50">/{total}</span>
            </motion.p>
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2 font-display text-4xl font-semibold italic"
        >
          {score === total && <Trophy className="size-8" />}
          {verdicts[score]}
        </motion.h1>
        <p className="mt-2 text-white/70">
          {score} correct · {total - score} wrong · {quiz.topic}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-accent-deep"
          >
            <RotateCcw className="size-4" /> Try again
          </button>
          <Link
            href={`/${month.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/20"
          >
            <CalendarDays className="size-4" /> {month.name} calendar
          </Link>
        </div>
      </div>

      <h2 className="mb-4 mt-10 px-1 font-display text-3xl font-semibold">Answer review</h2>
      <ol className="space-y-4">
        {quiz.questions.map((q, i) => {
          const correct = answers[i] === q.answer;
          return (
            <motion.li
              key={q.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl border border-line bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full text-white ${
                    correct ? "bg-emerald-600" : "bg-rose-600"
                  }`}
                  aria-label={correct ? "Correct" : "Wrong"}
                >
                  {correct ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Question {i + 1}
                  </p>
                  <h3 className="mt-0.5 font-semibold leading-snug">{q.q}</h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {q.options.map((opt, j) => {
                  const isAnswer = j === q.answer;
                  const isPicked = j === answers[i];
                  if (!isAnswer && !isPicked) return null;
                  return (
                    <li
                      key={opt}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                        isAnswer ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
                      }`}
                    >
                      <span className="font-mono text-xs font-semibold">{LETTERS[j]}</span>
                      <span className={`flex-1 ${isAnswer ? "" : "line-through decoration-rose-400"}`}>{opt}</span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider opacity-70">
                        {isAnswer && isPicked ? "Your answer ✓" : isAnswer ? "Correct" : "Your answer"}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-3 rounded-2xl bg-paper px-4 py-3 text-sm leading-relaxed text-muted">
                {q.explanation}
              </p>
            </motion.li>
          );
        })}
      </ol>

      <Link
        href={`/${next.slug}/quiz`}
        style={{ "--next": next.theme.accent }}
        className="group mt-8 flex items-center justify-between rounded-3xl bg-[var(--next)] p-6 text-white"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
            Up next
          </span>
          <span className="font-display text-2xl font-semibold">{next.name} quiz</span>
        </span>
        <ArrowRight className="size-6 transition group-hover:translate-x-1" />
      </Link>
    </motion.section>
  );
}

// Deterministic burst so server and client never disagree.
function Confetti() {
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist = 140 + ((i * 37) % 90);
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.8,
      rotate: (i * 47) % 360,
      color: ["#fde047", "#f9a8d4", "#86efac", "#93c5fd", "#ffffff"][i % 5],
      round: i % 3 === 0,
    };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%]">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute block h-3 w-2 ${p.round ? "rounded-full" : "rounded-sm"}`}
          style={{ background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y + 60, opacity: 0, scale: 1, rotate: p.rotate }}
          transition={{ delay: 0.9, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
