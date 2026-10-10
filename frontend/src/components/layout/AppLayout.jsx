import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Logo from '../ui/Logo';
import { setSidebarOpen } from '../../redux/slices/uiSlice';
import { selectTopics } from '../../redux/slices/topicsSlice';
import { selectCompletedTopicIds } from '../../redux/slices/progressSlice';

export default function AppLayout() {
  const dispatch = useDispatch();
  const topics = useSelector(selectTopics);
  const completedIds = useSelector(selectCompletedTopicIds);
  const completed = topics.filter((t) => completedIds.includes(t._id)).length;

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          leading={
            // On desktop the sidebar is always visible, so the menu and logo are mobile-only
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => dispatch(setSidebarOpen(true))}
                aria-label="Open menu"
                className="-ml-1 rounded-xl p-2 text-muted hover:bg-surface-muted hover:text-fg"
              >
                <Menu className="size-5" />
              </button>
              <span className="hidden sm:block">
                <Logo />
              </span>
            </div>
          }
          progress={{
            label: `Course progress · ${completed} / ${topics.length} modules`,
            value: topics.length ? (completed / topics.length) * 100 : 0,
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
