export default function ProgressBar({ value, label, size = 'sm' }) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full overflow-hidden rounded-full bg-surface-muted ${size === 'lg' ? 'h-3' : 'h-1.5'}`}
    >
      <div
        className="relative h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
        style={{ width: `${percent}%` }}
      >
        {/* Glossy highlight, like Duolingo's progress bar */}
        {size === 'lg' && percent > 4 && <span className="absolute inset-x-2 top-0.5 h-1 rounded-full bg-white/30" />}
      </div>
    </div>
  );
}
