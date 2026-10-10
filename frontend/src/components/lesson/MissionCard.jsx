import { useState } from 'react';
import { ChevronDown, Star, Target } from 'lucide-react';
import Prose from './Prose';

// The instructions start with "## Your mission: ..."; that heading becomes the card title
const splitTitle = (markdown) => {
  const [first, ...rest] = markdown.split('\n');
  return first.startsWith('## ')
    ? { title: first.slice(3), body: rest.join('\n').trim() }
    : { title: 'Your mission', body: markdown };
};

export default function MissionCard({ markdown, xpReward, xpEarned }) {
  const [open, setOpen] = useState(true);
  const { title, body } = splitTitle(markdown);

  return (
    <section className="shrink-0 overflow-hidden rounded-2xl border-2 border-accent/40 bg-surface shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 bg-accent-soft px-4 py-3 text-left"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent text-accent-fg">
          <Target className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate font-extrabold">{title}</span>
        <span className="flex shrink-0 items-center gap-1 rounded-lg bg-xp-soft px-2 py-1 text-xs font-extrabold text-xp">
          <Star className="size-3.5 fill-xp" />
          {xpEarned > 0 ? `${xpEarned} XP earned` : `+${xpReward} XP`}
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 py-4">
          <Prose size="sm">{body}</Prose>
        </div>
      )}
    </section>
  );
}
