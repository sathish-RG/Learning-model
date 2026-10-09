import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NotFound from './NotFound';

// Route-level error boundary: unknown URLs and errors thrown while rendering
export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="mx-auto max-w-4xl px-4">
        <NotFound />
      </div>
    );
  }

  if (import.meta.env.DEV) console.error(error);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-2 text-muted">An unexpected error occurred. Try reloading the page.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg hover:opacity-90"
      >
        Reload
      </button>
    </div>
  );
}
