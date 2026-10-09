// Calendar-day helpers for streaks. Days are counted in the user's time zone,
// so a streak day ends at the user's local midnight, not UTC midnight.

// Falls back to UTC for a missing or unknown IANA zone name
export const resolveTimeZone = (timeZone) => {
  if (!timeZone) return 'UTC';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return timeZone;
  } catch {
    return 'UTC';
  }
};

// The calendar day ('YYYY-MM-DD') of an instant in the given time zone
export const toDayKey = (date, timeZone) =>
  new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

// Whole calendar days from day key `from` to day key `to`
export const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
