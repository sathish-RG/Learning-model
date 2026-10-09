import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, CheckCircle2, Trophy } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';
import StreakCard from '../components/dashboard/StreakCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PROJECT_NAME, ROUTES } from '../utils/constants';
import { selectCurrentUser } from '../redux/slices/authSlice';
import { selectPhasesWithTopics, selectTopics } from '../redux/slices/topicsSlice';
import { selectCompletedTopicIds, selectStreak } from '../redux/slices/progressSlice';

function StatCard({ icon: Icon, iconClass, label, value, children }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
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
          className="group flex items-center justify-between gap-4 rounded-xl border border-accent/40 bg-accent-soft p-5 transition-colors hover:border-accent"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-accent">{completedCount ? 'Continue learning' : 'Start here'}</p>
            <p className="mt-1 truncate font-medium">
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
                return (
                  <li key={topic._id}>
                    <Link
                      to={ROUTES.topic(topic.slug)}
                      className="flex gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-muted/50"
                    >
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-lg text-sm font-medium ${
                          done ? 'bg-accent-soft text-accent' : 'bg-surface-muted text-muted'
                        }`}
                      >
                        {done ? <CheckCircle2 className="size-4" /> : topic.moduleOrder}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-medium">{topic.title}</h4>
                        <p className="mt-1 text-sm text-muted">{topic.description}</p>
                      </div>
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
