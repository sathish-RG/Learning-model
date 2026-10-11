import { useMemo, useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { ChevronRight, FileText, Folder, FolderOpen } from 'lucide-react';

// Turns ["/app/src/a.js", "/app/b.js"] into a nested tree: folders first, then files, A to Z
function buildTree(paths) {
  const root = { folders: {}, files: [] };
  for (const path of paths) {
    const parts = path.slice(1).split('/');
    let node = root;
    parts.slice(0, -1).forEach((part, i) => {
      const folderPath = `/${parts.slice(0, i + 1).join('/')}`;
      node.folders[part] ??= { path: folderPath, folders: {}, files: [] };
      node = node.folders[part];
    });
    node.files.push({ name: parts.at(-1), path });
  }
  return root;
}

const rowClasses = (active = false) =>
  `flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left text-[13px] hover:bg-surface-muted ${
    active ? 'bg-accent-soft font-bold text-accent' : 'text-fg'
  }`;
const indent = (depth) => ({ paddingLeft: `${0.5 + depth * 0.85}rem` });

function FolderNode({ name, node, depth, openFolders, toggle, activeFile, onOpen }) {
  const open = openFolders.has(node.path);
  return (
    <li>
      <button
        type="button"
        className={rowClasses()}
        style={indent(depth)}
        onClick={() => toggle(node.path)}
        aria-expanded={open}
      >
        <ChevronRight className={`size-3.5 shrink-0 text-muted transition-transform ${open ? 'rotate-90' : ''}`} />
        {open ? (
          <FolderOpen className="size-4 shrink-0 text-accent" />
        ) : (
          <Folder className="size-4 shrink-0 text-accent" />
        )}
        <span className="truncate">{name}</span>
      </button>
      {open && <TreeList node={node} depth={depth + 1} {...{ openFolders, toggle, activeFile, onOpen }} />}
    </li>
  );
}

function TreeList({ node, depth, openFolders, toggle, activeFile, onOpen }) {
  return (
    <ul>
      {Object.entries(node.folders)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, child]) => (
          <FolderNode
            key={child.path}
            {...{
              name,
              node: child,
              depth,
              openFolders,
              toggle,
              activeFile,
              onOpen,
            }}
          />
        ))}
      {[...node.files]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((file) => (
          <li key={file.path}>
            <button
              type="button"
              className={rowClasses(file.path === activeFile)}
              style={indent(depth)}
              onClick={() => onOpen(file.path)}
              aria-current={file.path === activeFile ? 'true' : undefined}
            >
              <FileText className="ml-5 size-4 shrink-0 text-muted" />
              <span className="truncate">{file.name}</span>
            </button>
          </li>
        ))}
    </ul>
  );
}

// A folder tree of a whole project (e.g. the Capstone): clicking a file opens it in the editor
export default function ProjectExplorer({ paths }) {
  const { sandpack } = useSandpack();
  const tree = useMemo(() => buildTree(paths), [paths]);
  // Every folder starts open, so the whole project is visible at a glance
  const [openFolders, setOpenFolders] = useState(() => {
    const all = new Set();
    const walk = (node) =>
      Object.values(node.folders).forEach((child) => {
        all.add(child.path);
        walk(child);
      });
    walk(tree);
    return all;
  });
  const toggle = (path) =>
    setOpenFolders((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  return (
    <nav aria-label="Project files" className="h-full overflow-auto bg-surface p-2">
      <TreeList
        node={tree}
        depth={0}
        openFolders={openFolders}
        toggle={toggle}
        activeFile={sandpack.activeFile}
        onOpen={sandpack.openFile}
      />
    </nav>
  );
}
