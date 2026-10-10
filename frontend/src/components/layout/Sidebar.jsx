import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, Flag, LayoutDashboard, Lock } from 'lucide-react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import UserMenu from './UserMenu';
import PhaseAccordion from '../path/PhaseAccordion';
import useOpenPhases from '../../hooks/useOpenPhases';
import { ROUTES } from '../../utils/constants';
import { selectSidebarOpen, setSidebarOpen } from '../../redux/slices/uiSlice';
import { selectCoursePath } from '../../redux/selectors/course';

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-surface-muted hover:text-fg'
  }`;

function LessonIcon({ topic }) {
  if (topic.status === 'completed') return <CheckCircle2 className="size-4 shrink-0 text-accent" aria-label="Completed" />;
  if (topic.status === 'locked') return <Lock className="size-3.5 shrink-0" aria-label="Coming soon" />;
  if (topic.lessonType === 'checkpoint') return <Flag className="size-4 shrink-0 text-xp" aria-label="Checkpoint" />;
  return <span className="grid size-4 shrink-0 place-items-center text-xs tabular-nums">{topic.moduleOrder}</span>;
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isOpen = useSelector(selectSidebarOpen);
  const path = useSelector(selectCoursePath);
  const phases = useOpenPhases('sidebar.openPhases', path.focusPhase);

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
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-line bg-surface transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-line px-5">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main">
          <NavLink to={ROUTES.dashboard} end className={navClass}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </NavLink>

          <p className="px-3 pt-5 pb-2 text-xs font-medium tracking-wider text-muted uppercase">Course</p>

          {path.phases.map((phase) => (
            <PhaseAccordion
              key={phase.phase}
              phase={phase}
              compact
              open={phases.isOpen(phase.phase)}
              onToggle={() => phases.toggle(phase.phase)}
            >
              {phase.topics.map((topic) =>
                topic.status === 'locked' ? (
                  <span
                    key={topic._id}
                    className="flex cursor-not-allowed items-center gap-3 rounded-lg py-1.5 pr-3 pl-6 text-sm text-muted/70"
                    title="Coming soon"
                  >
                    <LessonIcon topic={topic} />
                    <span className="truncate">{topic.title}</span>
                  </span>
                ) : (
                  <NavLink key={topic._id} to={ROUTES.topic(topic.slug)} className={(s) => `${navClass(s)} !py-1.5 pl-6`}>
                    <LessonIcon topic={topic} />
                    <span className="truncate">{topic.title}</span>
                  </NavLink>
                ),
              )}
            </PhaseAccordion>
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
