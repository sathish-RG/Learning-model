import PathNode from './PathNode';
import PhaseAccordion from './PhaseAccordion';
import useOpenPhases from '../../hooks/useOpenPhases';

// The whole course as collapsible phases, each holding a snaking trail of lesson nodes
export default function LearningPath({ path }) {
  const { isOpen, toggle } = useOpenPhases('path.openPhases', path.focusPhase);
  const lastSlug = path.phases.at(-1)?.topics.at(-1)?.slug;

  return (
    // Smaller sideways wave on phones
    <div className="space-y-4 [--wave-scale:0.55] sm:[--wave-scale:1]">
      {path.phases.map((phase) => (
        <PhaseAccordion key={phase.phase} phase={phase} open={isOpen(phase.phase)} onToggle={() => toggle(phase.phase)}>
          <ol className="space-y-7" aria-label={`${phase.name} lessons`}>
            {phase.topics.map((topic, index) => (
              <PathNode key={topic._id} topic={topic} index={index} isFinal={topic.slug === lastSlug} />
            ))}
          </ol>
        </PhaseAccordion>
      ))}
    </div>
  );
}
