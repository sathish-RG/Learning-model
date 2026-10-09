import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, LayoutDashboard } from 'lucide-react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import UserMenu from './UserMenu';
import { ROUTES } from '../../utils/constants';
import { selectSidebarOpen, setSidebarOpen } from '../../redux/slices/uiSlice';
import { selectPhasesWithTopics } from '../../redux/slices/topicsSlice';
import { selectCompletedTopicIds } from '../../redux/slices/progressSlice';

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-surface-muted hover:text-fg'
  }`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isOpen = useSelector(selectSidebarOpen);
  const phases = useSelector(selectPhasesWithTopics);
  const completedIds = useSelector(selectCompletedTopicIds);

  // Close the mobile drawer after navigating
  useEffect(() => {
    dispatch(setSidebarOpen(false));
  }, [pathname, dispatch]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-line bg-surface transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center border-b border-line px-5">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main">
          <NavLink to={ROUTES.dashboard} end className={navClass}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </NavLink>

          {phases.map((phase) => (
            <div key={phase.id} className="space-y-1">
              <p className="px-3 pt-6 pb-2 text-xs font-medium tracking-wider text-muted uppercase">{phase.title}</p>

              {phase.topics.map((topic) => (
                <NavLink key={topic._id} to={ROUTES.topic(topic.slug)} className={navClass}>
                  {completedIds.includes(topic._id) ? (
                    <CheckCircle2 className="size-4 shrink-0 text-accent" aria-label="Completed" />
                  ) : (
                    <span className="grid size-4 shrink-0 place-items-center text-xs tabular-nums">{topic.moduleOrder}</span>
                  )}
                  <span className="truncate">{topic.title}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line p-3">
          <ThemeToggle />
          <UserMenu />
        </div>
      </aside>
    </>
  );
}
