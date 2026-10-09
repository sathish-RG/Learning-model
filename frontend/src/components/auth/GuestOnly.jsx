import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/constants';
import { selectCurrentUser } from '../../redux/slices/authSlice';

// Login/register are for guests only. Once logged in (e.g. right after submitting),
// send the user to the page they originally asked for, or the dashboard.
export default function GuestOnly() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (user) {
    const from = location.state?.from;
    const to = from ? `${from.pathname}${from.search ?? ''}` : ROUTES.dashboard;
    return <Navigate to={to} replace />;
  }

  return <Outlet />;
}
