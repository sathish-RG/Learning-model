import { useEffect, useRef, useState } from 'react';
import { useSandpack, useSandpackClient, useSandpackConsole } from '@codesandbox/sandpack-react';
import { Ban } from 'lucide-react';
import { formatValue, toTable } from '../../utils/consoleFormat';

const ROW_STYLES = {
  error: 'bg-red-500/10 text-red-600 dark:text-red-400',
  warn: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
};

function TableOutput({ value }) {
  const { columns, cells } = toTable(value);
  return (
    <table className="my-1 border-collapse text-left">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} className="border border-line bg-surface-muted px-2 py-1 font-bold">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="border border-line px-2 py-1">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Node sandboxes print to a terminal (stdout/stderr) instead of the browser console: plain
// text, sometimes with colour codes and several lines per chunk
// eslint-disable-next-line no-control-regex -- terminal colour codes start with the ESC character
const ANSI = /\x1b\[[0-9;?]*[A-Za-z]/g;
const ERROR_LINE = /(^|\s)(\w*Error\b|Uncaught|ERR_)/;
// Stack trace lines from inside the Node runtime or npm packages (e.g. Express's router):
// only the lines pointing at the learner's own files help them find a bug
const RUNTIME_FRAME = /^\s*at .*(nodebox-runtime|wasm:\/\/|<anonymous>|node_modules)/;
const MAX_CHUNKS = 300;
const toLines = (chunks) =>
  chunks.flatMap(({ id, data, isError }) =>
    data
      .replace(ANSI, '')
      .replaceAll('nodebox:///nodebox/', '/')
      .split(/\r?\n/)
      .filter((line) => line.trim() && !RUNTIME_FRAME.test(line))
      .map((line, i) => ({ id: `${id}-${i}`, line, isError: isError || ERROR_LINE.test(line) })),
  );

// Like Sandpack's useSandpackShellStdout, but remembers which chunks came from stderr
// (console.error), so they can be shown in red. Cleared whenever the program restarts.
function useShellOutput(clientId) {
  const { listen } = useSandpack();
  const listenRef = useRef(listen);
  const nextId = useRef(0);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    listenRef.current = listen;
  });

  useEffect(
    () =>
      listenRef.current((message) => {
        if (message.type === 'start') {
          setChunks([]);
        } else if (message.type === 'stdout' && message.payload.data?.trim()) {
          const chunk = { id: nextId.current++, data: message.payload.data, isError: message.payload.type === 'err' };
          setChunks((prev) => [...prev, chunk].slice(-MAX_CHUNKS));
        }
      }, clientId),
    [clientId],
  );

  return { chunks, reset: () => setChunks([]) };
}

// One console call per row, with its arguments side by side (like browser devtools)
function ConsoleRow({ method, data }) {
  if (method === 'clear') {
    return <li className="px-3 py-1.5 text-muted italic">Console was cleared</li>;
  }
  const isTable = method === 'table' && data[0] && typeof data[0] === 'object';
  return (
    <li className={`border-b border-line/60 px-3 py-1.5 whitespace-pre-wrap [overflow-wrap:anywhere] ${ROW_STYLES[method] ?? ''}`}>
      {isTable ? <TableOutput value={data[0]} /> : data.map((value) => formatValue(value)).join(' ')}
    </li>
  );
}

function ConsoleView({ clientId }) {
  const { sandpack } = useSandpack();
  const { logs, reset } = useSandpackConsole({
    clientId,
    resetOnPreviewRestart: true, // every run starts with a clean console
    showSyntaxError: true,
    maxMessageCount: 300,
  });
  const shell = useShellOutput(clientId);
  const serverLines = sandpack.environment === 'node' ? toLines(shell.chunks) : [];
  const listRef = useRef(null);
  const clear = () => {
    reset();
    shell.reset();
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [logs, shell.chunks]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-3 py-1.5">
        <span className="text-xs font-extrabold tracking-wider text-muted uppercase">Console</span>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear console"
          title="Clear console"
          className="rounded-md p-1 text-muted hover:bg-surface-muted hover:text-fg"
        >
          <Ban className="size-3.5" />
        </button>
      </div>
      <ol ref={listRef} className="min-h-0 flex-1 overflow-auto font-mono text-[13px] leading-relaxed">
        {logs.length === 0 && serverLines.length === 0 && (
          <li className="px-3 py-2 text-muted italic">Nothing logged yet. Use console.log() to print here.</li>
        )}
        {serverLines.map(({ id, line, isError }) => (
          <li
            key={id}
            className={`border-b border-line/60 px-3 py-1.5 whitespace-pre-wrap [overflow-wrap:anywhere] ${isError ? ROW_STYLES.error : ''}`}
          >
            {line}
          </li>
        ))}
        {logs.map((log) => (
          <ConsoleRow key={log.id} method={log.method} data={log.data ?? []} />
        ))}
      </ol>
    </div>
  );
}

// Runs the code in its own hidden sandbox: for lessons with no page to show
function StandaloneConsole() {
  const { iframe, clientId } = useSandpackClient();
  return (
    <>
      {/* Hidden wrapper: the Node sandbox also adds its own runtime iframe next to this one */}
      <div hidden>
        <iframe ref={iframe} title="JavaScript runner" />
      </div>
      <ConsoleView clientId={clientId} />
    </>
  );
}

// `standalone`: run the code itself. Otherwise: show logs from the page preview.
export default function LessonConsole({ standalone = false }) {
  return standalone ? <StandaloneConsole /> : <ConsoleView />;
}
