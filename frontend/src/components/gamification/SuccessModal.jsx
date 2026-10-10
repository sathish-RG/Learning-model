import { useEffect, useRef } from 'react';
import { ArrowRight, Flame, Star, Trophy } from 'lucide-react';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';
import { celebrate } from '../../utils/celebrate';

function StatTile({ icon: Icon, value, label, className }) {
  return (
    <div className={`flex-1 rounded-2xl border-2 px-3 py-3 text-center ${className}`}>
      <p className="flex items-center justify-center gap-1.5 text-xl font-extrabold tabular-nums">
        <Icon className="size-5" />
        {value}
      </p>
      <p className="mt-0.5 text-xs font-bold tracking-wide uppercase opacity-80">{label}</p>
    </div>
  );
}

// "Lesson complete" screen, shown when a lesson's XP is earned for the first time
export default function SuccessModal({ topic, xpEarned, totalXP, streak, nextTopic, onClose }) {
  const primaryRef = useRef(null);

  useEffect(() => {
    celebrate();
    primaryRef.current?.focus();
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid animate-fade-in place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="w-full max-w-md animate-pop-in rounded-3xl border-2 border-line bg-surface p-6 text-center shadow-2xl sm:p-8"
      >
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-xp-soft">
          <Trophy className="size-10 animate-bounce text-xp" />
        </div>

        <p className="mt-5 text-sm font-extrabold tracking-wider text-accent uppercase">
          {topic.lessonType === 'checkpoint' ? 'Checkpoint complete!' : 'Lesson complete!'}
        </p>
        <h2 id="success-title" className="mt-1 text-3xl font-extrabold tracking-tight">
          Awesome job! <span className="text-xp">+{xpEarned} XP</span>
        </h2>
        <p className="mt-2 text-muted">
          You finished <span className="font-semibold text-fg">{topic.title}</span>.
          {topic.lessonType === 'checkpoint' ? ' Task Manager Pro just got better.' : ' One step closer to pro.'}
        </p>

        <div className="mt-6 flex gap-3">
          <StatTile icon={Star} value={`+${xpEarned}`} label="XP earned" className="border-xp/40 bg-xp-soft text-xp" />
          <StatTile icon={Flame} value={streak.currentStreak} label="Day streak" className="border-streak/40 bg-streak/10 text-streak" />
          <StatTile icon={Star} value={totalXP} label="Total XP" className="border-line text-fg" />
        </div>

        <div className="mt-7 space-y-3">
          <Button ref={primaryRef} to={ROUTES.dashboard} size="lg" className="w-full">
            Back to dashboard
          </Button>
          {nextTopic && (
            <Button to={ROUTES.topic(nextTopic.slug)} variant="secondary" size="lg" className="w-full">
              Next: {nextTopic.title}
              <ArrowRight className="size-4" />
            </Button>
          )}
          <button type="button" onClick={onClose} className="text-sm font-bold text-muted hover:text-fg">
            Keep practicing
          </button>
        </div>
      </div>
    </div>
  );
}
