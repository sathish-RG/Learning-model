import { useCallback, useEffect, useState } from 'react';
import api from '../utils/api';

const LOADING = { status: 'loading', code: null, error: null };

// Fetches the user's saved code for a topic. `code` is null when nothing was saved yet.
export default function useSavedCode(slug) {
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
        if (!cancelled) setResult({ key, status: 'ready', code: data.progress?.userSavedCode || null, error: null });
      })
      .catch((err) => {
        if (!cancelled) setResult({ key, status: 'error', code: null, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, key]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const { status, code, error } = result.key === key ? result : LOADING;
  return { status, code, error, retry };
}
