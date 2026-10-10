import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, CheckCircle2, Star, Trophy } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';
import StreakCard from '../components/dashboard/StreakCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PROJECT_NAME, ROUTES } from '../utils/constants';
import { selectCurrentUser } from '../redux/slices/authSlice';
import { selectPhasesWithTopics, selectTopics } from '../redux/slices/topicsSlice';
import { selectCompletedTopicIds, selectProgressState, selectStreak } from '../redux/slices/progressSlice';

function StatCard({ icon: Icon, iconClass, label, value, children }) {
  return (
    <div className="rounded-2xl border-2 border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Icon className={`size-4 ${iconClass}`} />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
      {children}
    </div>
  );
}

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const user = useSelector(selectCurrentUser);
  const topics = useSelector(selectTopics);
  const phases = useSelector(selectPhasesWithTopics);
  const streak = useSelector(selectStreak);
  const completedIds = useSelector(selectCompletedTopicIds);
  const { byTopicId } = useSelector(selectProgressState);

  const firstName = user.name.split(' ')[0];
  const isCompleted = (topic) => completedIds.includes(topic._id);
  const completedCount = topics.filter(isCompleted).length;
  const nextTopic = topics.find((t) => !isCompleted(t));

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-2 text-muted">
          Learn the 20% that matters, and build <span className="text-fg">{PROJECT_NAME}</span> as you go.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Your progress">
        <StreakCard streak={streak} />
        <StatCard icon={Trophy} iconClass="text-accent" label="Modules completed" value={`${completedCount} / ${topics.length}`}>
          <div className="mt-3">
            <ProgressBar value={topics.length ? (completedCount / topics.length) * 100 : 0} label="Curriculum progress" />
          </div>
        </StatCard>
      </section>

      {nextTopic && (
        <Link
          to={ROUTES.topic(nextTopic.slug)}
          className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 shadow-[0_4px_0_0_var(--color-accent-edge)] transition-all hover:border-accent active:translate-y-1 active:scale-[0.99] active:shadow-none"
        >
          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-wide text-accent uppercase">
              {completedCount ? 'Continue learning' : 'Start here'}
            </p>
            <p className="mt-1 truncate text-lg font-extrabold">
              Module {nextTopic.moduleOrder}: {nextTopic.title}
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      <section className="space-y-8">
        <h2 className="text-lg font-semibold">Curriculum</h2>
        {phases.map((phase) => (
          <div key={phase.id}>
            <h3 className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">{phase.title}</h3>
            <ol className="space-y-3">
              {phase.topics.map((topic) => {
                const done = isCompleted(topic);
                const xpEarned = byTopicId[topic._id]?.xpEarned ?? 0;
                return (
                  <li key={topic._id}>
                    <Link
                      to={ROUTES.topic(topic.slug)}
                      className="flex items-center gap-4 rounded-2xl border-2 border-line bg-surface p-5 shadow-sm transition-all hover:border-accent/50 active:scale-[0.99]"
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${
                          done ? 'bg-accent-soft text-accent' : 'bg-surface-muted text-muted'
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-4" /> : topic.moduleOrder}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold">{topic.title}</h4>
                        <p className="mt-1 text-sm text-muted">{topic.description}</p>
                      </div>
                      <span
                        className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-extrabold ${
                          xpEarned > 0 ? 'bg-xp-soft text-xp' : 'text-muted'
                        }`}
                        title={xpEarned > 0 ? `${xpEarned} XP earned` : `Complete to earn ${topic.xpReward} XP`}
                      >
                        <Star className={`size-3.5 ${xpEarned > 0 ? 'fill-xp' : ''}`} />
                        {xpEarned > 0 ? xpEarned : `+${topic.xpReward}`}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
