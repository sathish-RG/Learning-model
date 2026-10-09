import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Hammer, Play } from 'lucide-react';
import NotFound from './NotFound';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PROJECT_NAME, ROUTES } from '../utils/constants';
import { selectTopics } from '../redux/slices/topicsSlice';
import { selectIsTopicCompleted } from '../redux/slices/progressSlice';

export default function TopicView() {
  const { topicId } = useParams();
  const topics = useSelector(selectTopics);
  const index = topics.findIndex((t) => t.slug === topicId);
  const topic = topics[index];
  const completed = useSelector((state) => topic && selectIsTopicCompleted(state, topic._id));
  useDocumentTitle(topic?.title ?? 'Not found');

  if (!topic) return <NotFound />;

  const prev = topics[index - 1];
  const next = topics[index + 1];

  return (
    <article className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-accent">Module {topic.moduleOrder}</p>
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
              <CheckCircle2 className="size-3.5" />
              Completed
            </span>
          )}
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{topic.title}</h1>
        <p className="mt-2 text-muted">{topic.description}</p>
      </header>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="flex items-center gap-2 text-sm font-medium text-muted">
          <Hammer className="size-4" />
          What you&apos;ll build for {PROJECT_NAME}
        </h2>
        <p className="mt-2">{topic.milestone}</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">The 20% you need</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {topic.subtopics.map((subtopic) => (
            <li key={subtopic} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm">
              <Check className="size-4 shrink-0 text-accent" />
              {subtopic}
            </li>
          ))}
        </ul>
      </section>

      <Link
        to={ROUTES.practice(topic.slug)}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        <Play className="size-4" />
        {completed ? 'Practice again' : 'Start practicing'}
      </Link>

      <nav className="flex justify-between gap-4 border-t border-line pt-6 text-sm" aria-label="Module navigation">
        {prev ? (
          <Link to={ROUTES.topic(prev.slug)} className="flex items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft className="size-4" />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={ROUTES.topic(next.slug)} className="flex items-center gap-2 text-right text-muted hover:text-fg">
            {next.title}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
