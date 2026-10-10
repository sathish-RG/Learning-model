import Prose from './Prose';

// Splits the lesson at its "## " headings so each idea gets its own card
const toSections = (markdown) =>
  markdown
    .split(/^(?=## )/m)
    .map((section) => section.trim())
    .filter(Boolean);

export default function LessonContent({ markdown, compact = false }) {
  return (
    <div className={compact ? 'space-y-3' : 'space-y-5'}>
      {toSections(markdown).map((section, index) => {
        const isRecap = section.startsWith('## Remember');
        return (
          <section
            key={index}
            className={`rounded-2xl border-2 ${compact ? 'p-4' : 'p-5 sm:p-7'} ${
              isRecap ? 'border-accent/40 bg-accent-soft' : 'border-line bg-surface shadow-sm'
            }`}
          >
            <Prose size={compact ? 'sm' : 'base'}>{section}</Prose>
          </section>
        );
      })}
    </div>
  );
}
