import { Suspense, lazy, useCallback, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Flag, Hammer, Hourglass, Star, X } from 'lucide-react';
import NotFound from './NotFound';
import TopBar from '../components/layout/TopBar';
import LessonContent from '../components/lesson/LessonContent';
import SuccessModal from '../components/gamification/SuccessModal';
import Button from '../components/ui/Button';
import PageLoader from '../components/ui/PageLoader';
import ErrorState from '../components/ui/ErrorState';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useTopicDetail from '../hooks/useTopicDetail';
import { PROJECT_NAME, ROUTES } from '../utils/constants';
import { selectTopicBySlug } from '../redux/slices/topicsSlice';
import { selectIsTopicCompleted } from '../redux/slices/progressSlice';
import { selectPublishedNeighbours } from '../redux/selectors/course';

// Sandpack is heavy, so the practice step loads only when it's first opened
const PracticePanel = lazy(() => import('../components/lesson/PracticePanel'));

const STEPS = [
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Code2 },
];

const isCheckpoint = (topic) => topic.lessonType === 'checkpoint';
const topicLabel = (topic) => (isCheckpoint(topic) ? 'Checkpoint' : `Lesson ${topic.moduleOrder}`);

function CloseLink() {
  return (
    <Link
      to={ROUTES.dashboard}
      aria-label="Close lesson"
      className="-ml-1 rounded-xl p-2 text-muted transition-transform hover:bg-surface-muted hover:text-fg active:scale-90"
    >
      <X className="size-6" strokeWidth={2.5} />
    </Link>
  );
}

function StepTabs({ step, onChange, completed }) {
  return (
    <nav className="flex shrink-0 items-center gap-2 border-b border-line bg-surface px-3 py-2 sm:px-5" aria-label="Lesson steps">
      {STEPS.map(({ id, label, icon: Icon }, index) => {
        const active = step === id;
        const done = completed || (id === 'learn' && step === 'practice');
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-current={active ? 'step' : undefined}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-bold transition-all active:scale-95 ${
              active ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-muted hover:text-fg'
            }`}
          >
            <span
              className={`grid size-6 place-items-center rounded-full text-xs ${
                done ? 'bg-accent text-accent-fg' : active ? 'border-2 border-accent' : 'border-2 border-line'
              }`}
            >
              {done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <Icon className="hidden size-4 sm:block" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

function TopicHeader({ topic }) {
  return (
    <header>
      <p className={`flex items-center gap-1.5 text-sm font-extrabold tracking-wider uppercase ${isCheckpoint(topic) ? 'text-xp' : 'text-accent'}`}>
        {isCheckpoint(topic) && <Flag className="size-4" />}
        {topic.phaseTitle} · {topicLabel(topic)}
      </p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{topic.title}</h1>
      <p className="mt-2 text-lg text-muted">{topic.description}</p>
    </header>
  );
}

function LearnStep({ topic, detail, prev, next, onContinue }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <TopicHeader topic={topic} />
        {topic.subtopics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="In this lesson">
            {topic.subtopics.map((subtopic) => (
              <li key={subtopic} className="rounded-full border-2 border-line px-3 py-1 text-xs font-bold text-muted">
                {subtopic}
              </li>
            ))}
          </ul>
        )}

        {isCheckpoint(topic) && topic.milestone && (
          <section className="mt-6 flex gap-3 rounded-2xl border-2 border-xp/40 bg-xp-soft p-4 sm:p-5">
            <Hammer className="mt-0.5 size-5 shrink-0 text-xp" />
            <div>
              <h2 className="text-sm font-extrabold text-xp">What you&apos;ll build for {PROJECT_NAME}</h2>
              <p className="mt-1">{topic.milestone}</p>
            </div>
          </section>
        )}

        <div className="mt-6">
          <LessonContent markdown={detail.lessonContent} />
        </div>

        <div className="mt-10 rounded-3xl border-2 border-line bg-surface p-6 text-center shadow-sm">
          <p className="text-xl font-extrabold">Got it? Time to try it yourself!</p>
          <p className="mt-1 text-muted">
            Complete the mission to earn{' '}
            <span className="inline-flex items-center gap-1 font-bold text-xp">
              <Star className="size-4 fill-xp" />
              {topic.xpReward} XP
            </span>
          </p>
          <Button size="lg" onClick={onContinue} className="mt-5 w-full sm:w-auto">
            Start practicing
            <ArrowRight className="size-5" />
          </Button>
        </div>

        <nav className="mt-8 flex justify-between gap-4 text-sm font-bold" aria-label="Lesson navigation">
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
      </div>
    </div>
  );
}

// Lessons on the path whose content isn't written yet
function ComingSoon({ topic }) {
  useDocumentTitle(topic.title);
  return (
    <div className="flex h-dvh flex-col">
      <TopBar leading={<CloseLink />} progress={{ label: `${topic.phaseTitle} · ${topicLabel(topic)}`, value: 0 }} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <TopicHeader topic={topic} />
          <div className="mt-8 flex gap-4 rounded-3xl border-2 border-dashed border-line p-6">
            <Hourglass className="size-8 shrink-0 text-muted" />
            <div>
              <p className="text-lg font-extrabold">Coming soon</p>
              <p className="mt-1 text-muted">This lesson is being written. It will unlock on your path as soon as it&apos;s ready.</p>
              <Button to={ROUTES.dashboard} variant="secondary" className="mt-5">
                Back to your path
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicLesson({ topic }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') === 'practice' ? 'practice' : 'learn';
  const completed = useSelector((state) => selectIsTopicCompleted(state, topic._id));
  const { prev, next } = useSelector((state) => selectPublishedNeighbours(state, topic.slug));
  const detail = useTopicDetail(topic.slug);
  const [celebration, setCelebration] = useState(null);
  useDocumentTitle(step === 'practice' ? `Practice: ${topic.title}` : topic.title);

  // Once opened, the editor stays mounted (just hidden), so going back to Learn keeps unsaved code
  const [practiceOpened, setPracticeOpened] = useState(step === 'practice');
  if (step === 'practice' && !practiceOpened) setPracticeOpened(true);

  const goTo = (id) => setSearchParams(id === 'practice' ? { step: 'practice' } : {});

  const handleCompleted = useCallback((result) => {
    if (result.xpEarned > 0) setCelebration(result);
  }, []);
  const closeCelebration = useCallback(() => setCelebration(null), []);

  // Lesson progress: reading, practicing, done
  const progressValue = completed ? 100 : step === 'practice' ? 66 : 33;

  let body;
  if (detail.status === 'failed') {
    body = <ErrorState title="Couldn't load this lesson" message={detail.error} onRetry={detail.retry} />;
  } else if (!detail.topic) {
    body = <PageLoader />;
  } else {
    body = (
      <>
        {step === 'learn' && (
          <LearnStep topic={topic} detail={detail.topic} prev={prev} next={next} onContinue={() => goTo('practice')} />
        )}
        {/* Practice shows only the mission and the editor; the lesson stays on the Learn tab */}
        {practiceOpened && (
          <div className={step === 'practice' ? 'mx-auto h-full max-w-[1600px]' : 'hidden'}>
            <Suspense fallback={<PageLoader />}>
              <PracticePanel topic={detail.topic} onCompleted={handleCompleted} />
            </Suspense>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex h-dvh flex-col">
      <TopBar
        leading={<CloseLink />}
        progress={{ label: `${topicLabel(topic)} · ${topic.title}`, value: progressValue }}
      />
      <StepTabs step={step} onChange={goTo} completed={completed} />
      <div className="min-h-0 flex-1">{body}</div>

      {celebration && (
        <SuccessModal
          topic={topic}
          xpEarned={celebration.xpEarned}
          totalXP={celebration.totalXP}
          streak={celebration.streak}
          nextTopic={next}
          onClose={closeCelebration}
        />
      )}
    </div>
  );
}

export default function TopicView() {
  const { topicId } = useParams();
  const topic = useSelector((state) => selectTopicBySlug(state, topicId));

  if (!topic) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <NotFound />
      </div>
    );
  }

  if (!topic.published) return <ComingSoon key={topic.slug} topic={topic} />;

  // Keyed by slug so moving to another lesson starts fresh (step, editor, celebration)
  return <TopicLesson key={topic.slug} topic={topic} />;
}
