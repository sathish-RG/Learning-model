import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
  useSandpackShell,
} from '@codesandbox/sandpack-react';
import MissionCard from './MissionCard';
import LessonConsole from './LessonConsole';
import ProjectExplorer from './ProjectExplorer';
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

// How long the learner must pause typing before a Node server restarts with their edits
const RESTART_DELAY_MS = 1200;

const providerStyle = { height: '100%', fontFamily: 'inherit' };

// Sizing shared by whatever sits beside the editor
const OUTPUT_CLASSES = '!min-h-0 !min-w-0 !flex-[2_1_0%] lg:!h-full lg:!flex-1';

// The panel next to the editor, chosen per lesson (topic.output)
// `navigator`: an address bar, so Node lessons can visit their GET routes (e.g. /api/tasks)
function OutputPanel({ type, navigator }) {
  // Pure JavaScript lessons: no page to show, so the console runs the code on its own
  if (type === 'console') {
    return (
      <div className={`flex flex-col ${OUTPUT_CLASSES}`} aria-label="Console output">
        <LessonConsole standalone />
      </div>
    );
  }

  // Page lessons that also log: the page on top, its console below
  if (type === 'both') {
    return (
      <div className={`flex flex-col ${OUTPUT_CLASSES}`}>
        <SandpackPreview showOpenInCodeSandbox={false} showNavigator={navigator} className="!min-h-0 !flex-[3_1_0%]" />
        <div className="flex min-h-0 flex-[2_1_0%] flex-col border-t-2 border-line" aria-label="Console output">
          <LessonConsole />
        </div>
      </div>
    );
  }

  // A project to read and download (the Capstone): the file tree takes the output's place
  if (type === 'none') return null;

  return <SandpackPreview showOpenInCodeSandbox={false} showNavigator={navigator} className={OUTPUT_CLASSES} />;
}

// Node lessons: the server keeps running the old code after an edit, so restart it
// (like nodemon) once the learner pauses typing. Bundled templates re-run on their own.
function NodeAutoRestart() {
  const { sandpack } = useSandpack();
  const { restart } = useSandpackShell();
  const { files, clients } = sandpack;
  const code = Object.values(files)
    .map((file) => file.code)
    .join('\0');
  const previous = useRef(code);

  useEffect(() => {
    if (code === previous.current) return undefined;
    const timer = setTimeout(async () => {
      previous.current = code;
      // Sandpack only syncs edits to a Node sandbox once a server has opened a port, so a
      // script (or a server that crashed on start) would restart with its old files.
      // Write them into the sandbox's file system first. (`emulator` is Nodebox, from
      // sandpack-client's Node client; without it we fall back to Sandpack's own sync.)
      await Promise.all(
        Object.values(clients).flatMap((client) =>
          client.emulator?.fs
            ? Object.entries(files).map(([path, file]) => client.emulator.fs.writeFile(path, file.code).catch(() => {}))
            : [],
        ),
      );
      restart();
    }, RESTART_DELAY_MS);
    return () => clearTimeout(timer);
  }, [code, files, clients, restart]);

  return null;
}

// Step 2: the mission instructions plus the Sandpack editor and live preview.
// `topic` is the full topic (with files). Lazy-loaded by TopicView, since Sandpack is large.
export default function PracticePanel({ topic, onCompleted }) {
  const theme = useSelector(selectTheme);
  const xpEarned = useSelector((state) => selectTopicXpEarned(state, topic._id));
  const saved = useSavedFiles(topic.slug);

  const editable = useMemo(() => topic.files.filter((f) => !f.readOnly && !f.hidden).map((f) => f.filename), [topic.files]);
  const visible = useMemo(() => topic.files.filter((f) => !f.hidden).map((f) => f.filename), [topic.files]);
  // A whole project (output 'none'): browse it in a file tree, opening one file at a time
  const isProject = topic.output === 'none';

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
      visibleFiles: isProject ? visible.slice(0, 1) : visible,
      // Open on the first file the learner can edit (a read-only project: its first file)
      activeFile: editable[0] ?? visible[0],
      // Keep Sandpack's default initMode ('lazy'). 'immediate' races the preview's own
      // registration and leaves a stale client, so JavaScript lessons stop re-running on edits.
    }),
    [visible, editable, isProject],
  );
  // Template defaults plus anything this lesson needs (e.g. react-router-dom)
  const customSetup = useMemo(
    () => ({ dependencies: { ...TEMPLATE_DEPENDENCIES[topic.templateType], ...topic.dependencies } }),
    [topic.templateType, topic.dependencies],
  );

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
      {topic.templateType === 'node' && <NodeAutoRestart />}
      <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto p-3 sm:p-4">
        <MissionCard markdown={topic.instructions} xpReward={topic.xpReward} xpEarned={xpEarned} />

        {/* Pinned while scrolling, so Save and Mark as completed are always reachable */}
        <div className="sticky -top-3 z-10 -mx-3 border-b border-line/60 bg-canvas/95 px-3 py-2 backdrop-blur sm:-top-4 sm:-mx-4 sm:px-4">
          <EditorToolbar topic={topic} editable={editable} initialContents={initialContents} onCompleted={onCompleted} />
        </div>

        {/* Desktop: code on the left, output on the right (both full height). Phones: stacked. */}
        <div className="h-[85dvh] min-h-[480px] shrink-0 overflow-hidden rounded-2xl border-2 border-line">
          <SandpackLayout className="!h-full !flex-col !flex-nowrap !rounded-none !border-0 lg:!flex-row">
            {isProject && (
              <div className="max-h-48 shrink-0 border-b border-line lg:h-full lg:max-h-none lg:w-64 lg:border-r lg:border-b-0">
                <ProjectExplorer paths={visible} />
              </div>
            )}
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              wrapContent
              closableTabs={isProject}
              className="!min-h-0 !min-w-0 !flex-[3_1_0%] lg:!h-full lg:!flex-1"
            />
            <OutputPanel type={topic.output} navigator={topic.templateType === 'node'} />
          </SandpackLayout>
        </div>
      </div>
    </SandpackProvider>
  );
}
