import { NextResponse } from "next/server";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

// Accepts "jan", "January", "sept", "3", "03".
function monthSlug(value) {
  const v = value.trim().toLowerCase();
  if (/^\d{1,2}$/.test(v)) return MONTHS[Number(v) - 1];
  if (v.length < 3) return undefined;
  return MONTHS.find((m) => m.startsWith(v));
}

// /?month=jan → /january (other query params are kept), so a QR code can
// link straight to a month.
export function proxy(request) {
  const url = request.nextUrl;
  const param = url.searchParams.get("month");
  const slug = param && monthSlug(param);
  if (!slug) return NextResponse.next();

  const target = url.clone();
  target.pathname = `/${slug}`;
  target.searchParams.delete("month");
  return NextResponse.redirect(target);
}

export const config = {
  matcher: "/",
};
