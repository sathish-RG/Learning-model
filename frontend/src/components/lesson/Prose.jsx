import Markdown from 'react-markdown';

// Typography for lesson Markdown. react-markdown doesn't render raw HTML, so content can't inject markup.
const PROSE = [
  'prose prose-zinc max-w-none dark:prose-invert',
  'prose-headings:font-extrabold prose-headings:tracking-tight prose-h2:mt-0 prose-h2:mb-3',
  'prose-strong:text-fg prose-li:my-1 prose-li:marker:text-accent',
  'prose-code:rounded-md prose-code:bg-surface-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-semibold',
  'prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:rounded-xl prose-pre:border prose-pre:border-line prose-pre:bg-zinc-900 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-normal',
].join(' ');

const components = {
  a: ({ node: _node, ...props }) => <a target="_blank" rel="noreferrer" {...props} />,
};

export default function Prose({ children, size = 'base', className = '' }) {
  return (
    <div className={`${PROSE} ${size === 'sm' ? 'prose-sm' : 'sm:prose-lg'} ${className}`}>
      <Markdown components={components}>{children}</Markdown>
    </div>
  );
}
