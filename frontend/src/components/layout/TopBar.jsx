import ProgressBar from '../ui/ProgressBar';
import { StreakBadge, XpBadge } from '../gamification/StatBadges';

// Gamified top bar: optional leading controls, a labeled progress bar, then streak + XP
export default function TopBar({ leading, progress }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface px-3 sm:gap-4 sm:px-5">
      {leading}

      {progress && (
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 truncate text-xs font-bold tracking-wide text-muted uppercase">{progress.label}</p>
          <ProgressBar value={progress.value} label={progress.label} size="lg" />
        </div>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <StreakBadge />
        <XpBadge />
      </div>
    </header>
  );
}
