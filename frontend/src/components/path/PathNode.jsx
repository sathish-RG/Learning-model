import { Link } from 'react-router-dom';
import { Check, Flag, Lock, Star, Trophy } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

// Duolingo-style snake: each node shifts sideways in a repeating wave
const WAVE = [0, 44, 72, 44, 0, -44, -72, -44];

// Circle styles per state, with a darker bottom edge for the "3D" look
const LESSON_STYLES = {
  completed: 'bg-accent text-accent-fg shadow-[0_6px_0_0_var(--color-accent-edge)]',
  current: 'bg-accent text-accent-fg shadow-[0_6px_0_0_var(--color-accent-edge)] ring-8 ring-accent/25',
  available: 'border-2 border-line bg-surface text-fg shadow-[0_6px_0_0_var(--color-line)]',
  locked: 'bg-surface-muted text-muted/70 shadow-[0_6px_0_0_var(--color-line)]',
};
const CHECKPOINT_STYLES = {
  completed: 'bg-xp text-white shadow-[0_6px_0_0_#b45309]',
  current: 'bg-xp text-white shadow-[0_6px_0_0_#b45309] ring-8 ring-xp/30',
  available: 'border-4 border-xp bg-xp-soft text-xp shadow-[0_6px_0_0_#b45309]',
  locked: 'border-4 border-dashed border-line bg-surface-muted text-muted/70 shadow-[0_6px_0_0_var(--color-line)]',
};

const STATUS_LABEL = {
  completed: 'completed',
  current: 'up next',
  available: 'not started',
  locked: 'coming soon',
};

function NodeIcon({ topic, isFinal }) {
  const isCheckpoint = topic.lessonType === 'checkpoint';
  if (topic.status === 'locked') return <Lock className={isCheckpoint ? 'size-8' : 'size-6'} />;
  if (topic.status === 'completed' && !isCheckpoint) return <Check className="size-8" strokeWidth={3.5} />;
  if (isCheckpoint) {
    const Icon = isFinal ? Trophy : Flag;
    return <Icon className="size-9" strokeWidth={2.5} />;
  }
  if (topic.status === 'current') return <Star className="size-8 fill-accent-fg" />;
  return <span className="text-xl font-extrabold tabular-nums">{topic.moduleOrder}</span>;
}

export default function PathNode({ topic, index, isFinal }) {
  const isCheckpoint = topic.lessonType === 'checkpoint';
  const locked = topic.status === 'locked';
  const styles = (isCheckpoint ? CHECKPOINT_STYLES : LESSON_STYLES)[topic.status];
  const offset = isCheckpoint ? 0 : WAVE[index % WAVE.length];

  const circle = (
    <span
      className={`relative grid place-items-center rounded-full transition-all duration-100 ${
        isCheckpoint ? 'size-24' : 'size-[72px]'
      } ${styles} ${
        locked ? '' : 'group-hover:brightness-105 group-active:translate-y-1.5 group-active:scale-95 group-active:shadow-none'
      }`}
    >
      <NodeIcon topic={topic} isFinal={isFinal} />
      {topic.status === 'current' && (
        <span className="absolute -top-11 left-1/2 -translate-x-1/2 animate-bounce rounded-xl border-2 border-line bg-surface px-3 py-1 text-xs font-extrabold tracking-wider text-accent uppercase shadow-sm">
          Start
          <span className="absolute -bottom-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-line bg-surface" />
        </span>
      )}
    </span>
  );

  const label = (
    <span className="mt-3 block max-w-[11rem] text-center">
      {isCheckpoint && (
        <span className={`block text-[11px] font-extrabold tracking-wider uppercase ${locked ? 'text-muted' : 'text-xp'}`}>
          {isFinal ? 'Capstone' : 'Checkpoint'}
        </span>
      )}
      <span className={`block text-sm leading-snug font-bold ${locked ? 'text-muted' : 'text-fg'}`}>{topic.title}</span>
    </span>
  );

  const a11yLabel = `${isCheckpoint ? 'Checkpoint' : `Lesson ${topic.moduleOrder}`}: ${topic.title} (${STATUS_LABEL[topic.status]})`;

  return (
    <li
      className="flex justify-center"
      style={{ transform: `translateX(calc(${offset}px * var(--wave-scale)))` }}
    >
      {locked ? (
        <div className="flex cursor-not-allowed flex-col items-center opacity-80" aria-label={a11yLabel} title="Coming soon">
          {circle}
          {label}
        </div>
      ) : (
        <Link to={ROUTES.topic(topic.slug)} className="group flex flex-col items-center rounded-3xl p-1" aria-label={a11yLabel}>
          {circle}
          {label}
        </Link>
      )}
    </li>
  );
}
