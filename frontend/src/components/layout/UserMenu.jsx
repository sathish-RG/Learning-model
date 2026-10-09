import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logout, selectCurrentUser } from '../../redux/slices/authSlice';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-medium text-accent uppercase">
        {user.name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted">{user.email}</p>
      </div>
      <button
        type="button"
        onClick={() => dispatch(logout())}
        aria-label="Log out"
        title="Log out"
        className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-fg"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
}
