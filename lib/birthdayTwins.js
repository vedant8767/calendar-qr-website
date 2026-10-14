// Looks up "birthday twins": celebrities born on the same day and month, and
// the hit movie and song from the birth year. When the year falls outside the
// data, the closest year is used and flagged with `exact: false`.

function closestYear(items, year) {
  let best = null;
  for (const { year: y } of items) {
    if (best === null || Math.abs(y - year) < Math.abs(best - year)) best = y;
  }
  return best;
}

function byYear(items, year) {
  if (!year || !items.length) return null;
  const match = closestYear(items, year);
  return { year: match, exact: match === year, items: items.filter((i) => i.year === match) };
}

// data = the module from lib/birthdayData.js (loaded lazily by the caller).
export function findBirthdayTwins(data, { day, month, year }) {
  const ddmm = `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}`;
  const actors = data.actors
    .filter((a) => a.date.startsWith(ddmm))
    .map((a) => ({ ...a, birthYear: Number(a.date.slice(6)) }))
    .sort((a, b) => a.birthYear - b.birthYear);

  return {
    actors,
    movies: byYear(data.movies, year),
    songs: byYear(data.songs, year),
  };
}
