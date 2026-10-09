import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { selectTheme, toggleTheme } from '../../redux/slices/uiSlice';

export default function ThemeToggle({ compact = false }) {
  const dispatch = useDispatch();
  const isDark = useSelector(selectTheme) === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={label}
      title={label}
      className={`flex items-center gap-3 rounded-lg text-sm text-muted transition-colors hover:bg-surface-muted hover:text-fg ${
        compact ? 'p-2' : 'w-full px-3 py-2'
      }`}
    >
      <Icon className="size-4" />
      {!compact && (isDark ? 'Light mode' : 'Dark mode')}
    </button>
  );
}
