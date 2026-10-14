"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cake, Heart } from "lucide-react";
import { doctor, initials, personalDays } from "@/lib/doctor";
import { months, YEAR } from "@/lib/months";
import { useToday } from "@/lib/useToday";

const spring = { type: "spring", stiffness: 220, damping: 26 };

// Personalised header: the doctor's photo and their family occasions for the year.
export default function DoctorCard() {
  const today = useToday();
  // Before the calendar year starts (or on the server) every day is "upcoming".
  const isUpcoming = (o) =>
    !today || today.year < YEAR || (today.year === YEAR && (o.monthIndex > today.month || (o.monthIndex === today.month && o.day >= today.day)));
  const next = personalDays.find(isUpcoming);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={spring}
      className="mx-auto max-w-6xl px-4 sm:px-6"
      aria-labelledby="doctor-heading"
    >
      <div className="grid gap-6 rounded-[2.25rem] border border-line bg-white p-5 sm:p-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start">
          <Avatar />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Specially made for</p>
            <h2 id="doctor-heading" className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {doctor.name}
            </h2>
            {doctor.speciality && <p className="mt-0.5 text-sm text-muted">{doctor.speciality}</p>}
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-semibold">
            <Heart className="size-4 fill-rose-500 text-rose-500" /> Your special days in {YEAR}
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {personalDays.map((o) => {
              const m = months[o.monthIndex];
              const isNext = o === next;
              return (
                <li key={o.label + o.date}>
                  <Link
                    href={`/${m.slug}`}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${
                      isNext ? "bg-rose-500 text-white" : "bg-rose-50 hover:bg-rose-100"
                    }`}
                  >
                    <span
                      className={`flex w-12 shrink-0 flex-col items-center rounded-xl py-1 ${
                        isNext ? "bg-white/20" : "bg-white text-rose-700"
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase">{m.short}</span>
                      <span className="font-display text-lg font-semibold leading-none">{o.day}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{o.label}</span>
                      <span className={`text-xs ${isNext ? "text-white/80" : "text-muted"}`}>
                        {isNext ? "Coming up next" : o.milestone ?? " "}
                        {isNext && o.milestone && ` · ${o.milestone}`}
                      </span>
                    </span>
                    {/birthday/i.test(o.title) && (
                      <Cake className={`ml-auto size-4 shrink-0 ${isNext ? "text-white" : "text-rose-400"}`} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(!doctor.imageUrl);
  const img = useRef(null);
  // The image can fail before hydration, when onError isn't attached yet.
  useEffect(() => {
    if (img.current?.complete && !img.current.naturalWidth) setFailed(true);
  }, []);
  return failed ? (
    <span className="grid size-20 shrink-0 place-items-center rounded-3xl bg-ink font-display text-2xl font-semibold text-paper sm:size-24 lg:size-28">
      {initials(doctor.name)}
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={img}
      src={doctor.imageUrl}
      alt={doctor.name}
      onError={() => setFailed(true)}
      className="size-20 shrink-0 rounded-3xl object-cover sm:size-24 lg:size-28"
    />
  );
}
