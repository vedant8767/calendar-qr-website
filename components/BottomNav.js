"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, CalendarDays, House, Newspaper, PersonStanding, Sparkles } from "lucide-react";
import { months } from "@/lib/months";
import { useFeaturedMonthIndex } from "@/lib/useToday";

export default function BottomNav() {
  const pathname = usePathname();
  const featured = useFeaturedMonthIndex() ?? 0;
  const currentSlug =
    months.find((m) => pathname.startsWith(`/${m.slug}`))?.slug ??
    months[featured].slug;

  const items = [
    { href: "/", label: "Home", icon: House, active: pathname === "/" },
    {
      href: `/${currentSlug}`,
      label: "Calendar",
      icon: CalendarDays,
      active: pathname === `/${currentSlug}`,
    },
    {
      href: `/${currentSlug}/quiz`,
      label: "Quiz",
      icon: Brain,
      active: pathname.endsWith("/quiz"),
    },
    {
      href: "/news",
      label: "News",
      icon: Newspaper,
      active: pathname.startsWith("/news"),
    },
    {
      href: "/body",
      label: "Body",
      icon: PersonStanding,
      active: pathname.startsWith("/body"),
    },
    {
      href: "/horoscope",
      label: "Stars",
      icon: Sparkles,
      active: pathname.startsWith("/horoscope"),
    },
  ];

  // Phones: six equal columns with icon over a small label, so the bar always
  // fits the screen. Wider screens: a compact pill with icon + label side by side.
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:bottom-4 sm:px-4 sm:pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid w-full max-w-md grid-cols-6 gap-0.5 rounded-[1.75rem] border border-white/10 bg-ink/90 p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex sm:w-auto sm:max-w-none sm:items-center sm:gap-1 sm:rounded-full">
        {items.map(({ href, label, icon: Icon, active }) => (
          <li key={label} className="min-w-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-col items-center justify-center gap-0.5 rounded-[1.25rem] px-0 py-2 text-[10px] font-medium tracking-tight sm:tracking-normal text-white/60 transition-colors hover:text-white aria-[current=page]:text-ink sm:flex-row sm:gap-2 sm:rounded-full sm:px-3.5 sm:py-2.5 sm:text-sm"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-[1.25rem] bg-paper sm:rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="relative size-5 sm:size-[18px]" strokeWidth={2.2} />
              <span className={`relative max-w-full truncate ${active ? "" : "sm:sr-only md:not-sr-only"}`}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
