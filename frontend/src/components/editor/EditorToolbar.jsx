import { useCallback, useEffect, useRef, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSandpack } from '@codesandbox/sandpack-react';
import { Check, CheckCircle2, RotateCcw, Save } from 'lucide-react';
import Button from '../ui/Button';
import { saveCode, selectIsTopicCompleted, selectStreak, setTopicStatus } from '../../redux/slices/progressSlice';

const SAVED_MESSAGE_MS = 3000;
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
const SAVE_SHORTCUT = isMac ? '⌘S' : 'Ctrl+S';

// Save / reset / complete actions for the practice editor. Must render inside <SandpackProvider>.
// onCompleted({ xpEarned, totalXP, streak }) runs after the topic is marked as completed.
export default function EditorToolbar({ topic, mainFile, initialCode, onCompleted }) {
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
      const result = await dispatch(
        setTopicStatus({ slug: topic.slug, status: completed ? 'pending' : 'completed' }),
      ).unwrap();
      if (!completed) {
        if (result.xpEarned === 0) setFeedback({ status: 'saved', message: 'Completed again · XP already earned' });
        onCompleted?.(result);
      }
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

  // Warn before closing the tab, or leaving this page in the app, with unsaved work.
  // Switching between Learn and Practice (same page) is fine: the editor stays mounted.
  useEffect(() => {
    if (!dirty) return undefined;
    const onBeforeUnload = (e) => e.preventDefault();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => dirty && currentLocation.pathname !== nextLocation.pathname,
  );
  useEffect(() => {
    if (blocker.state !== 'blocked') return;
    if (window.confirm('You have unsaved code. Leave without saving?')) blocker.proceed();
    else blocker.reset();
  }, [blocker]);

  useEffect(() => {
    if (feedback.status !== 'saved') return undefined;
    const timer = setTimeout(() => setFeedback({ status: 'idle', message: null }), SAVED_MESSAGE_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  // Errors stay visible; otherwise new edits take priority over a "Saved" message
  const statusText =
    feedback.status === 'saving'
      ? 'Saving…'
      : feedback.status === 'error'
        ? feedback.message
        : dirty
          ? 'Unsaved changes'
          : feedback.message;

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      <p
        role="status"
        className={`mr-auto min-w-0 truncate text-sm font-semibold ${
          feedback.status === 'error' ? 'text-red-500 dark:text-red-400' : 'text-muted'
        }`}
      >
        {statusText}
      </p>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => sandpack.updateFile(mainFile, topic.starterCode)}
        disabled={code === topic.starterCode}
        aria-label="Reset to starter code"
        title="Reset to starter code (your saved code stays until you save)"
      >
        <RotateCcw className="size-4" />
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={save}
        loading={saving}
        disabled={!dirty}
        title={`Save code (${SAVE_SHORTCUT})`}
        className="relative"
      >
        {!saving && (dirty ? <Save className="size-4" /> : <Check className="size-4" />)}
        {dirty || saving ? 'Save' : 'Saved'}
        {dirty && !saving && <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-streak" aria-hidden="true" />}
      </Button>

      <Button
        variant={completed ? 'secondary' : 'primary'}
        size="sm"
        onClick={toggleCompleted}
        loading={statusPending}
        disabled={saving}
        aria-pressed={completed}
        title={completed ? 'Completed. Click to mark as not completed' : 'Mark this module as completed'}
        className={completed ? '!text-accent' : ''}
      >
        {!statusPending && <CheckCircle2 className="size-4" />}
        {completed ? 'Completed' : 'Mark as completed'}
      </Button>
    </div>
  );
}
