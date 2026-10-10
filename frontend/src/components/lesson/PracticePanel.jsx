import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import MissionCard from './MissionCard';
import EditorToolbar from '../editor/EditorToolbar';
import PageLoader from '../ui/PageLoader';
import ErrorState from '../ui/ErrorState';
import useSavedFiles from '../../hooks/useSavedFiles';
import { selectTheme } from '../../redux/slices/uiSlice';
import { selectTopicXpEarned } from '../../redux/slices/progressSlice';

// Extra npm packages per template (the node starters use Express)
const TEMPLATE_DEPENDENCIES = {
  node: { express: '^4.21.2' },
};

const providerStyle = { height: '100%', fontFamily: 'inherit' };

// Step 2: the mission instructions plus the Sandpack editor and live preview.
// `topic` is the full topic (with files). Lazy-loaded by TopicView, since Sandpack is large.
export default function PracticePanel({ topic, onCompleted }) {
  const theme = useSelector(selectTheme);
  const xpEarned = useSelector((state) => selectTopicXpEarned(state, topic._id));
  const saved = useSavedFiles(topic.slug);

  const editable = useMemo(() => topic.files.filter((f) => !f.readOnly && !f.hidden).map((f) => f.filename), [topic.files]);

  // Starting point for each editable file: the learner's saved version, else the starter code
  const initialContents = useMemo(
    () =>
      Object.fromEntries(
        topic.files
          .filter((f) => editable.includes(f.filename))
          .map((f) => [f.filename, saved.files?.[f.filename] ?? f.content]),
      ),
    [topic.files, editable, saved.files],
  );

  // Sandpack resets every file (discarding unsaved edits) whenever these props change by
  // reference, so they must stay the same objects across re-renders (theme, XP, step changes)
  const files = useMemo(
    () =>
      Object.fromEntries(
        topic.files.map((f) => [
          f.filename,
          { code: initialContents[f.filename] ?? f.content, readOnly: f.readOnly, hidden: f.hidden },
        ]),
      ),
    [topic.files, initialContents],
  );
  const options = useMemo(
    () => ({
      visibleFiles: topic.files.filter((f) => !f.hidden).map((f) => f.filename),
      // Open on the first file the learner can edit
      activeFile: editable[0],
      // Start the editor and preview right away, even while the learner is still reading
      // the mission above them (the default waits until they scroll into view)
      initMode: 'immediate',
    }),
    [topic.files, editable],
  );
  const customSetup = useMemo(() => ({ dependencies: TEMPLATE_DEPENDENCIES[topic.templateType] }), [topic.templateType]);

  if (saved.status === 'error') {
    return <ErrorState title="Couldn't load your saved code" message={saved.error} onRetry={saved.retry} />;
  }
  if (saved.status !== 'ready') return <PageLoader />;

  return (
    <SandpackProvider
      template={topic.templateType}
      files={files}
      customSetup={customSetup}
      options={options}
      theme={theme}
      style={providerStyle}
    >
      <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto p-3 sm:p-4">
        <MissionCard markdown={topic.instructions} xpReward={topic.xpReward} xpEarned={xpEarned} />

        {/* Pinned while scrolling, so Save and Mark as completed are always reachable */}
        <div className="sticky -top-3 z-10 -mx-3 border-b border-line/60 bg-canvas/95 px-3 py-2 backdrop-blur sm:-top-4 sm:-mx-4 sm:px-4">
          <EditorToolbar topic={topic} editable={editable} initialContents={initialContents} onCompleted={onCompleted} />
        </div>

        {/* Desktop: code on the left, live result on the right (both full height). Phones: stacked. */}
        <div className="h-[85dvh] min-h-[480px] shrink-0 overflow-hidden rounded-2xl border-2 border-line">
          <SandpackLayout className="!h-full !flex-col !flex-nowrap !rounded-none !border-0 lg:!flex-row">
            <SandpackCodeEditor showTabs showLineNumbers wrapContent className="!min-h-0 !flex-[3_1_0%] lg:!h-full lg:!flex-1" />
            <SandpackPreview showOpenInCodeSandbox={false} className="!min-h-0 !flex-[2_1_0%] lg:!h-full lg:!flex-1" />
          </SandpackLayout>
        </div>
      </div>
    </SandpackProvider>
  );
}
