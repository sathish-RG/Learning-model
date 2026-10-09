import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSandpack } from '@codesandbox/sandpack-react';
import { Check, CheckCircle2, Circle, Loader2, RotateCcw, Save } from 'lucide-react';
import { saveCode, selectIsTopicCompleted, selectStreak, setTopicStatus } from '../../redux/slices/progressSlice';

const SAVED_MESSAGE_MS = 3000;
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
const SAVE_SHORTCUT = isMac ? '⌘S' : 'Ctrl+S';

// Save / reset / complete actions for the practice editor. Must render inside <SandpackProvider>.
export default function EditorToolbar({ topic, mainFile, initialCode }) {
  const dispatch = useDispatch();
  const { sandpack } = useSandpack();
  const completed = useSelector((state) => selectIsTopicCompleted(state, topic._id));
  const streak = useSelector(selectStreak);

  const code = sandpack.files[mainFile]?.code ?? '';
  const [savedCode, setSavedCode] = useState(initialCode);
  const [feedback, setFeedback] = useState({ status: 'idle', message: null }); // idle | saving | saved | error
  const [statusPending, setStatusPending] = useState(false);

  const dirty = code !== savedCode;
  const saving = feedback.status === 'saving';

  const save = useCallback(async () => {
    const snapshot = code; // the user may keep typing while the request is in flight
    const streakBefore = streak.currentStreak;
    setFeedback({ status: 'saving', message: null });
    try {
      const { streak: next } = await dispatch(saveCode({ slug: topic.slug, code: snapshot })).unwrap();
      setSavedCode(snapshot);
      const extended = next.currentStreak > streakBefore;
      setFeedback({ status: 'saved', message: extended ? `Saved · ${next.currentStreak}-day streak 🔥` : 'Saved' });
      return true;
    } catch (message) {
      setFeedback({ status: 'error', message: `Couldn't save: ${message}` });
      return false;
    }
  }, [code, streak.currentStreak, dispatch, topic.slug]);

  const toggleCompleted = async () => {
    setStatusPending(true);
    try {
      // Completing with unsaved edits saves them first, so the finished code isn't lost
      if (!completed && dirty && !(await save())) return;
      await dispatch(setTopicStatus({ slug: topic.slug, status: completed ? 'pending' : 'completed' })).unwrap();
    } catch (message) {
      setFeedback({ status: 'error', message: `Couldn't update status: ${message}` });
    } finally {
      setStatusPending(false);
    }
  };

  // Ctrl/Cmd+S saves, even while the editor has focus
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  // Warn before closing the tab with unsaved work
  useEffect(() => {
    if (!dirty) return undefined;
    const onBeforeUnload = (e) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    if (feedback.status !== 'saved') return undefined;
    const timer = setTimeout(() => setFeedback({ status: 'idle', message: null }), SAVED_MESSAGE_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  const statusText =
    feedback.status === 'saving' ? 'Saving…' : feedback.message ?? (dirty ? 'Unsaved changes' : null);

  return (
    <div className="flex items-center gap-2">
      <p
        role="status"
        className={`hidden truncate text-xs md:block ${feedback.status === 'error' ? 'text-red-500 dark:text-red-400' : 'text-muted'}`}
      >
        {statusText}
      </p>

      <button
        type="button"
        onClick={() => sandpack.updateFile(mainFile, topic.starterCode)}
        disabled={code === topic.starterCode}
        aria-label="Reset to starter code"
        title="Reset to starter code (your saved code stays until you save)"
        className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-fg disabled:pointer-events-none disabled:opacity-40"
      >
        <RotateCcw className="size-4" />
      </button>

      <button
        type="button"
        onClick={save}
        disabled={!dirty || saving}
        title={`Save code (${SAVE_SHORTCUT})`}
        className="relative flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium hover:bg-surface-muted disabled:opacity-50 disabled:hover:bg-transparent"
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : dirty ? <Save className="size-4" /> : <Check className="size-4" />}
        <span className="hidden sm:inline">{dirty || saving ? 'Save' : 'Saved'}</span>
        {dirty && !saving && <span className="absolute -top-1 -right-1 size-2 rounded-full bg-streak" aria-hidden="true" />}
      </button>

      <button
        type="button"
        onClick={toggleCompleted}
        disabled={statusPending || saving}
        aria-pressed={completed}
        title={completed ? 'Completed. Click to mark as not completed' : 'Mark this module as completed'}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
          completed ? 'bg-accent-soft text-accent hover:opacity-80' : 'bg-accent text-accent-fg hover:opacity-90'
        }`}
      >
        {statusPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : completed ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <Circle className="size-4" />
        )}
        <span className="hidden sm:inline">{completed ? 'Completed' : 'Mark as completed'}</span>
      </button>
    </div>
  );
}
