import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../ui/PageLoader';
import ErrorState from '../ui/ErrorState';
import { fetchCurrentUser, selectAuth } from '../../redux/slices/authSlice';

// The auth cookie is httpOnly, so the only way to know if the user is logged in
// is to ask the server. Done once, before any route decides where to send them.
export default function SessionGate() {
  const dispatch = useDispatch();
  const { session, sessionError } = useSelector(selectAuth);

  useEffect(() => {
    if (session === 'unknown') dispatch(fetchCurrentUser());
  }, [session, dispatch]);

  if (session === 'error') {
    return (
      <ErrorState
        fullScreen
        title="Couldn't reach DevPrep"
        message={sessionError}
        onRetry={() => dispatch(fetchCurrentUser())}
      />
    );
  }

  if (session === 'unknown' || session === 'checking') return <PageLoader fullScreen />;

  return <Outlet />;
}
