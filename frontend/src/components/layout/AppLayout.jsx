import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Logo from '../ui/Logo';
import { setSidebarOpen } from '../../redux/slices/uiSlice';

export default function AppLayout() {
  const dispatch = useDispatch();

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile-only header; on desktop the sidebar is always visible */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4 lg:hidden">
          <button
            type="button"
            onClick={() => dispatch(setSidebarOpen(true))}
            aria-label="Open menu"
            className="-ml-2 rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-fg"
          >
            <Menu className="size-5" />
          </button>
          <Logo />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
