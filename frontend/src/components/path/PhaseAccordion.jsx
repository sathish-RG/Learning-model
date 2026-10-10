import { CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

// Collapsible phase header + body. `children` is only rendered while open.
export default function PhaseAccordion({ phase, open, onToggle, children, compact = false }) {
  const total = phase.topics.length;
  const done = phase.completed === total;
  const comingSoon = phase.published === 0;
  const panelId = `phase-${phase.phase}-${compact ? 'nav' : 'path'}`;

  return (
    <section
      className={
        compact
          ? ''
          : `rounded-3xl border-2 bg-surface shadow-sm ${phase.hasCurrent ? 'border-accent/50' : 'border-line'}`
      }
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full items-center gap-3 text-left transition-colors ${
          compact ? 'rounded-xl px-3 py-2 hover:bg-surface-muted' : 'rounded-3xl p-4 hover:bg-surface-muted/50 sm:p-5'
        }`}
      >
        <span
          className={`grid shrink-0 place-items-center rounded-2xl font-extrabold ${
            compact ? 'size-7 rounded-lg text-xs' : 'size-12 text-lg'
          } ${done ? 'bg-accent text-accent-fg' : phase.hasCurrent ? 'bg-accent-soft text-accent' : 'bg-surface-muted text-muted'}`}
        >
          {done ? <CheckCircle2 className={compact ? 'size-4' : 'size-6'} /> : phase.phase}
        </span>

        <span className="min-w-0 flex-1">
          {!compact && <span className="block text-xs font-extrabold tracking-wider text-muted uppercase">{phase.label}</span>}
          <span className={`block truncate font-extrabold ${compact ? 'text-sm' : 'text-lg'}`}>{phase.name}</span>
          {!compact && (
            <span className="mt-2 flex items-center gap-3">
              <span className="w-full max-w-48">
                <ProgressBar value={(phase.completed / total) * 100} label={`${phase.name} progress`} />
              </span>
              <span className="shrink-0 text-xs font-bold text-muted tabular-nums">
                {comingSoon ? (
                  <span className="inline-flex items-center gap-1">
                    <Lock className="size-3" /> Coming soon
                  </span>
                ) : (
                  `${phase.completed} / ${total}`
                )}
              </span>
            </span>
          )}
        </span>

        {compact && <span className="text-xs font-bold text-muted tabular-nums">{`${phase.completed}/${total}`}</span>}
        <ChevronDown className={`size-5 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id={panelId} className={compact ? 'mt-1 mb-2 space-y-0.5' : 'px-4 pt-6 pb-8 sm:px-5'}>
          {children}
        </div>
      )}
    </section>
  );
}
