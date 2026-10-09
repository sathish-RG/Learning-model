import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to={ROUTES.dashboard} className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
