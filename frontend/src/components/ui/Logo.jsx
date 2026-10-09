import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { APP_NAME, ROUTES } from '../../utils/constants';

export default function Logo() {
  return (
    <Link to={ROUTES.dashboard} className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-lg bg-accent text-accent-fg">
        <Code2 className="size-4" strokeWidth={2.5} />
      </span>
      {APP_NAME}
    </Link>
  );
}
