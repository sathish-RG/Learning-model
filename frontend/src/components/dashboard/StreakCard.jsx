import { Crown, Flame } from 'lucide-react';
import { addDays, daysBetween, weekdayInitial, weekdayLong } from '../../utils/dates';

const WEEK = 7;

const hintFor = ({ currentStreak, maxStreak, activeToday }) => {
  if (activeToday) return "You've practiced today. Come back tomorrow to keep it going.";
  if (currentStreak > 0) return 'Practice today to keep your streak alive.';
  if (maxStreak > 0) return 'Your streak ended. Save code or complete a module to start a new one.';
  return 'Save code or complete a module to start your streak.';
};

export default function StreakCard({ streak }) {
  const { currentStreak, maxStreak, activeToday, lastActiveDay, today } = streak;

  // The streak covers the `currentStreak` days ending on lastActiveDay
  const isStreakDay = (day) => {
    if (!lastActiveDay || currentStreak === 0) return false;
    const offset = daysBetween(day, lastActiveDay);
    return offset >= 0 && offset < currentStreak;
  };
  const week = today ? Array.from({ length: WEEK }, (_, i) => addDays(today, i - (WEEK - 1))) : [];

  return (
    <div className="rounded-2xl border-2 border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-full ${
              activeToday ? 'bg-streak/15 text-streak' : 'bg-surface-muted text-muted'
            }`}
          >
            <Flame className={`size-6 ${activeToday ? 'fill-streak/30' : ''}`} />
          </span>
          <div>
            <p className="text-2xl leading-none font-semibold tabular-nums">
              {currentStreak} <span className="text-base font-medium">{currentStreak === 1 ? 'day' : 'days'}</span>
            </p>
            <p className="mt-1 text-sm text-muted">Daily streak</p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted" title="Longest streak">
          <Crown className="size-4" />
          Best <span className="font-medium text-fg tabular-nums">{maxStreak}</span>
        </p>
      </div>

      {week.length > 0 && (
        <ol className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Last 7 days">
          {week.map((day) => {
            const active = isStreakDay(day);
            const isToday = day === today;
            return (
              <li key={day} className="flex flex-col items-center gap-1.5">
                <span
                  title={`${weekdayLong(day)}${active ? ': practiced' : ''}`}
                  className={`grid size-7 place-items-center rounded-full ${
                    active ? 'bg-streak text-white' : 'bg-surface-muted'
                  } ${isToday && !active ? 'ring-2 ring-streak/50 ring-inset' : ''}`}
                >
                  {active && <Flame className="size-3.5" />}
                  <span className="sr-only">{active ? 'Practiced' : 'No activity'}</span>
                </span>
                <span className={`text-xs ${isToday ? 'font-medium text-fg' : 'text-muted'}`}>{weekdayInitial(day)}</span>
              </li>
            );
          })}
        </ol>
      )}

      <p className="mt-4 text-sm text-muted">{hintFor(streak)}</p>
    </div>
  );
}
