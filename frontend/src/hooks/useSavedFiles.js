import { useCallback, useEffect, useState } from 'react';
import api from '../utils/api';

const LOADING = { status: 'loading', files: null, error: null };

// Fetches the user's saved files for a topic as { [filename]: content }, or null if never saved
export default function useSavedFiles(slug) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null });

  // A result only counts for the request it came from, so a new slug (or retry) reads as loading
  const key = `${slug}:${attempt}`;

  useEffect(() => {
    if (!slug) return undefined;
    let cancelled = false;

    api
      .get(`/progress/${slug}`)
      .then(({ data }) => {
        const saved = data.progress?.savedFiles ?? [];
        const files = saved.length ? Object.fromEntries(saved.map((f) => [f.filename, f.content])) : null;
        if (!cancelled) setResult({ key, status: 'ready', files, error: null });
      })
      .catch((err) => {
        if (!cancelled) setResult({ key, status: 'error', files: null, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, key]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const { status, files, error } = result.key === key ? result : LOADING;
  return { status, files, error, retry };
}
