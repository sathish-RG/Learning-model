import { useEffect, useRef } from 'react';
import { useSandpackClient, useSandpackConsole } from '@codesandbox/sandpack-react';
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

// One console call per row, with its arguments side by side (like browser devtools)
function ConsoleRow({ method, data }) {
  if (method === 'clear') {
    return <li className="px-3 py-1.5 text-muted italic">Console was cleared</li>;
  }
  const isTable = method === 'table' && data[0] && typeof data[0] === 'object';
  return (
    <li className={`border-b border-line/60 px-3 py-1.5 break-words whitespace-pre-wrap ${ROW_STYLES[method] ?? ''}`}>
      {isTable ? <TableOutput value={data[0]} /> : data.map((value) => formatValue(value)).join(' ')}
    </li>
  );
}

function ConsoleView({ clientId }) {
  const { logs, reset } = useSandpackConsole({
    clientId,
    resetOnPreviewRestart: true, // every run starts with a clean console
    showSyntaxError: true,
    maxMessageCount: 300,
  });
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [logs]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-3 py-1.5">
        <span className="text-xs font-extrabold tracking-wider text-muted uppercase">Console</span>
        <button
          type="button"
          onClick={reset}
          aria-label="Clear console"
          title="Clear console"
          className="rounded-md p-1 text-muted hover:bg-surface-muted hover:text-fg"
        >
          <Ban className="size-3.5" />
        </button>
      </div>
      <ol ref={listRef} className="min-h-0 flex-1 overflow-auto font-mono text-[13px] leading-relaxed">
        {logs.length === 0 && <li className="px-3 py-2 text-muted italic">Nothing logged yet. Use console.log() to print here.</li>}
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
      <iframe ref={iframe} title="JavaScript runner" hidden />
      <ConsoleView clientId={clientId} />
    </>
  );
}

// `standalone`: run the code itself. Otherwise: show logs from the page preview.
export default function LessonConsole({ standalone = false }) {
  return standalone ? <StandaloneConsole /> : <ConsoleView />;
}
