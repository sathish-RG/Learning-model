import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  SANDBOX_TEMPLATES,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { ArrowLeft } from 'lucide-react';
import NotFound from './NotFound';
import EditorToolbar from '../components/editor/EditorToolbar';
import ThemeToggle from '../components/ui/ThemeToggle';
import PageLoader from '../components/ui/PageLoader';
import ErrorState from '../components/ui/ErrorState';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useSavedCode from '../hooks/useSavedCode';
import useTheme from '../hooks/useTheme';
import { ROUTES } from '../utils/constants';
import { selectTopicBySlug } from '../redux/slices/topicsSlice';

// Extra npm packages per template (the node starters use Express)
const TEMPLATE_DEPENDENCIES = {
  node: { express: '^4.21.2' },
};

// The provider wraps the whole page so the header toolbar can read the editor's code
const pageStyle = { height: '100dvh', display: 'flex', flexDirection: 'column', fontFamily: 'inherit' };
const fill = { height: '100%' };

export default function EditorPage() {
  const { topicId } = useParams();
  const topic = useSelector((state) => selectTopicBySlug(state, topicId));
  const theme = useTheme();
  const saved = useSavedCode(topic?.slug);
  useDocumentTitle(topic ? `Practice: ${topic.title}` : 'Not found');

  if (!topic) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <NotFound />
      </div>
    );
  }

  if (saved.status === 'error') {
    return <ErrorState fullScreen title="Couldn't load your saved code" message={saved.error} onRetry={saved.retry} />;
  }
  if (saved.status !== 'ready') return <PageLoader fullScreen />;

  // starterCode / saved code replaces the template's main file (/index.html, /index.js or /App.js)
  const { main } = SANDBOX_TEMPLATES[topic.templateType];
  const initialCode = saved.code ?? topic.starterCode;

  return (
    <SandpackProvider
      // Remount when switching topics so the new template and files load cleanly
      key={topic.slug}
      template={topic.templateType}
      files={{ [main]: initialCode }}
      customSetup={{ dependencies: TEMPLATE_DEPENDENCIES[topic.templateType] }}
      options={{ activeFile: main, visibleFiles: [main] }}
      theme={theme}
      style={pageStyle}
    >
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4">
        <Link
          to={ROUTES.topic(topic.slug)}
          aria-label={`Back to ${topic.title}`}
          className="-ml-2 rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-fg"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{topic.title}</p>
          <p className="truncate text-xs text-muted">
            Practice · Module {topic.moduleOrder}
            {saved.code !== null && ' · Your saved code'}
          </p>
        </div>
        <EditorToolbar topic={topic} mainFile={main} initialCode={initialCode} />
        <ThemeToggle compact />
      </header>

      <div className="min-h-0 flex-1 p-2 sm:p-3">
        <SandpackLayout className="!flex-col md:!flex-row" style={fill}>
          <SandpackCodeEditor showTabs showLineNumbers wrapContent className="!h-1/2 md:!h-full" />
          <SandpackPreview showOpenInCodeSandbox={false} className="!h-1/2 md:!h-full" />
        </SandpackLayout>
      </div>
    </SandpackProvider>
  );
}
