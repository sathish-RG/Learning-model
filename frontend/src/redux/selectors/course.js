import { createSelector } from '@reduxjs/toolkit';
import { selectTopics } from '../slices/topicsSlice';
import { selectCompletedTopicIds } from '../slices/progressSlice';

// "Phase 1: HTML" -> { label: "Phase 1", name: "HTML" }
export const splitPhaseTitle = (phaseTitle) => {
  const [label, ...rest] = phaseTitle.split(': ');
  return rest.length ? { label, name: rest.join(': ') } : { label: phaseTitle, name: phaseTitle };
};

// The learning path: every topic with its state, grouped into phases in course order.
//   completed  finished
//   current    the next published lesson to do (one per course)
//   available  published, not finished yet
//   locked     not written yet ("coming soon")
export const selectCoursePath = createSelector([selectTopics, selectCompletedTopicIds], (topics, completedIds) => {
  const done = new Set(completedIds);
  const current = topics.find((t) => t.published && !done.has(t._id)) ?? null;

  const withStatus = topics.map((t) => ({
    ...t,
    status: done.has(t._id) ? 'completed' : !t.published ? 'locked' : t._id === current?._id ? 'current' : 'available',
  }));

  const phases = [];
  for (const topic of withStatus) {
    let phase = phases[phases.length - 1];
    if (!phase || phase.phase !== topic.phase) {
      phase = { phase: topic.phase, phaseTitle: topic.phaseTitle, ...splitPhaseTitle(topic.phaseTitle), topics: [] };
      phases.push(phase);
    }
    phase.topics.push(topic);
  }
  for (const phase of phases) {
    phase.completed = phase.topics.filter((t) => t.status === 'completed').length;
    phase.published = phase.topics.filter((t) => t.published).length;
    phase.hasCurrent = phase.topics.some((t) => t.status === 'current');
  }

  return {
    phases,
    current,
    completedCount: withStatus.filter((t) => t.status === 'completed').length,
    total: topics.length,
    // The phase to show first: where the learner is now, else the first phase
    focusPhase: current?.phase ?? phases.find((p) => p.completed < p.topics.length)?.phase ?? phases[0]?.phase ?? 1,
  };
});

// Published neighbours of a topic, for "previous / next lesson" navigation
export const selectPublishedNeighbours = createSelector(
  [selectTopics, (state, slug) => slug],
  (topics, slug) => {
    const index = topics.findIndex((t) => t.slug === slug);
    const before = topics.slice(0, Math.max(index, 0)).filter((t) => t.published);
    const after = topics.slice(index + 1).filter((t) => t.published);
    return { prev: before[before.length - 1] ?? null, next: after[0] ?? null };
  },
);
