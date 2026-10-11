"use client";

import { useSyncExternalStore } from "react";
import { YEAR } from "./months";

const subscribe = () => () => {};

function snapshot() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Today's date on the client, null during prerender (so markup stays static).
export function useToday() {
  const key = useSyncExternalStore(subscribe, snapshot, () => null);
  if (!key) return null;
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

// The calendar month to feature: the real month during 2027, otherwise the
// nearest end of the calendar year.
export function useFeaturedMonthIndex() {
  const today = useToday();
  if (!today) return null;
  if (today.year === YEAR) return today.month;
  return today.year < YEAR ? 0 : 11;
}
