import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong', message, onRetry, fullScreen = false }) {
  return (
    <div className={`grid place-items-center px-4 text-center ${fullScreen ? 'h-dvh' : 'py-24'}`}>
      <div className="max-w-sm">
        <AlertTriangle className="mx-auto size-6 text-muted" />
        <h1 className="mt-3 font-semibold">{title}</h1>
        {message && <p className="mt-1 text-sm text-muted">{message}</p>}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 rounded-lg border border-line px-4 py-2 text-sm font-medium hover:bg-surface-muted"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
