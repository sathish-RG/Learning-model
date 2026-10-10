import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Hourglass, Trophy } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';
import StreakCard from '../components/dashboard/StreakCard';
import LearningPath from '../components/path/LearningPath';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../utils/constants';
import { selectCurrentUser } from '../redux/slices/authSlice';
import { selectStreak } from '../redux/slices/progressSlice';
import { selectCoursePath } from '../redux/selectors/course';

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const user = useSelector(selectCurrentUser);
  const streak = useSelector(selectStreak);
  const path = useSelector(selectCoursePath);

  const firstName = user.name.split(' ')[0];
  const { current, completedCount, total } = path;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-2 text-muted">From your very first HTML tag to full-stack pro, one small step at a time.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Your progress">
        <StreakCard streak={streak} />
        <div className="rounded-2xl border-2 border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Trophy className="size-4 text-accent" />
            Lessons completed
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums">
            {completedCount} / {total}
          </p>
          <div className="mt-3">
            <ProgressBar value={total ? (completedCount / total) * 100 : 0} label="Course progress" />
          </div>
        </div>
      </section>

      {current ? (
        <Link
          to={ROUTES.topic(current.slug)}
          className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 shadow-[0_4px_0_0_var(--color-accent-edge)] transition-all hover:border-accent active:translate-y-1 active:scale-[0.99] active:shadow-none"
        >
          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-wide text-accent uppercase">
              {completedCount ? 'Continue learning' : 'Start here'} · {current.phaseTitle}
            </p>
            <p className="mt-1 truncate text-lg font-extrabold">
              {current.lessonType === 'checkpoint' ? '🏁 ' : `Lesson ${current.moduleOrder}: `}
              {current.title}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-line p-5">
          <Hourglass className="size-6 shrink-0 text-muted" />
          <div>
            <p className="font-extrabold">
              {completedCount ? "You've finished every available lesson!" : 'Your first lessons are on the way'}
            </p>
            <p className="text-sm text-muted">New lessons unlock on the path below as soon as they're published.</p>
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-4 text-lg font-extrabold">Your learning path</h2>
        <LearningPath path={path} />
      </section>
    </div>
  );
}
