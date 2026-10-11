"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, CalendarDays, House, PersonStanding, Sparkles } from "lucide-react";
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

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/85 p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl">
        {items.map(({ href, label, icon: Icon, active }) => (
          <li key={label}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white aria-[current=page]:text-ink"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-paper"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="relative size-[18px]" strokeWidth={2.2} />
              <span className={`relative ${active ? "" : "sr-only sm:not-sr-only"}`}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
