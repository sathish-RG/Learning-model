import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/constants';
import { selectCurrentUser } from '../../redux/slices/authSlice';

// Private routes: guests go to /login, which sends them back here after logging in
export default function RequireAuth() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) return <Navigate to={ROUTES.login} replace state={{ from: location }} />;

  return <Outlet />;
}
