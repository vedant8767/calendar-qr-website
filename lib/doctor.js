import { YEAR } from "./months";

// The doctor this calendar is made for. Dates are dd/mm/yyyy; the year is the
// year it started (birth year, wedding year) and is used to show "turns 75".
// imageUrl can be a file in /public or a full https:// URL; if it fails to
// load, the doctor's initials are shown instead.
export const doctor = {
  name: "Dr. Asha Patil",
  speciality: "Consultant Physician",
  imageUrl: "/doctor.jpg",
  dob: "12/03/1980",
  occasions: [
    { title: "Birthday", relationship: "Dad", date: "05/06/1952" },
    { title: "Birthday", relationship: "Mom", date: "18/09/1956" },
    { title: "Wedding Anniversary", relationship: "Spouse", date: "21/11/2008" },
    { title: "Birthday", relationship: "Spouse", date: "02/01/1978" },
    { title: "Birthday", relationship: "Son", date: "14/02/2012" },
    { title: "Birthday", relationship: "Daughter", date: "30/07/2015" },
  ],
};

function parse(ddmmyyyy) {
  const [d, m, y] = ddmmyyyy.split("/").map(Number);
  // 29 Feb falls on 28 Feb in non-leap years.
  const day = m === 2 && d === 29 && new Date(YEAR, 1, 29).getDate() !== 29 ? 28 : d;
  return { day, monthIndex: m - 1, year: y };
}

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// Every personal occasion (the doctor's own birthday first) placed in YEAR.
export const personalDays = [
  { title: "Birthday", relationship: "Self", date: doctor.dob },
  ...doctor.occasions,
]
  .map((o) => {
    const { day, monthIndex, year } = parse(o.date);
    const count = year ? YEAR - year : null;
    const isBirthday = /birthday/i.test(o.title);
    // A wedding anniversary is shared, so it reads "Your Wedding Anniversary".
    const self = o.relationship === "Self" || (o.relationship === "Spouse" && /anniversary/i.test(o.title));
    return {
      ...o,
      day,
      monthIndex,
      label: self ? `Your ${o.title}` : `${o.relationship}'s ${o.title}`,
      milestone: count > 0 ? (isBirthday ? `Turns ${count}` : `${ordinal(count)} year`) : null,
      // Which e-greet template to offer for this day (lib/egreets.js).
      greeting: o.greeting ?? (isBirthday ? "Birthday" : null),
    };
  })
  .sort((a, b) => a.monthIndex - b.monthIndex || a.day - b.day);

export function personalDaysOn(monthIndex, day) {
  return personalDays.filter((o) => o.monthIndex === monthIndex && o.day === day);
}

export function initials(name) {
  return name
    .replace(/^dr\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
