// Helpers for 'YYYY-MM-DD' day keys (as returned by the streak API)
const DAY_MS = 86_400_000;

export const addDays = (dayKey, days) => new Date(Date.parse(dayKey) + days * DAY_MS).toISOString().slice(0, 10);

export const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS);

// Short weekday label ("M", "T", ...) for a day key
export const weekdayInitial = (dayKey) =>
  new Date(Date.parse(dayKey)).toLocaleDateString(undefined, { weekday: 'narrow', timeZone: 'UTC' });

export const weekdayLong = (dayKey) =>
  new Date(Date.parse(dayKey)).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' });
