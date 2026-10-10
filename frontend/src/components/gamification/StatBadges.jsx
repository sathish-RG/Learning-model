import { useSelector } from 'react-redux';
import { Flame, Star } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import { selectTotalXP } from '../../redux/slices/authSlice';
import { selectStreak } from '../../redux/slices/progressSlice';

const badge = 'flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-extrabold tabular-nums';

export function StreakBadge() {
  const { currentStreak, activeToday } = useSelector(selectStreak);
  const label = `${currentStreak}-day streak${activeToday ? ', practiced today' : ''}`;

  return (
    <div
      className={`${badge} ${activeToday ? 'bg-streak/15 text-streak' : 'text-muted'}`}
      title={label}
      aria-label={label}
    >
      {/* Re-keyed so the flame bumps whenever the streak changes */}
      <Flame key={currentStreak} className={`size-5 animate-bump ${activeToday ? 'fill-streak/40' : ''}`} />
      {currentStreak}
    </div>
  );
}

export function XpBadge() {
  const totalXP = useSelector(selectTotalXP);
  const display = useCountUp(totalXP);

  return (
    <div className={`${badge} bg-xp-soft text-xp`} title={`${totalXP} XP`} aria-label={`${totalXP} XP`}>
      <Star key={totalXP} className="size-5 animate-bump fill-xp" />
      {display}
    </div>
  );
}
