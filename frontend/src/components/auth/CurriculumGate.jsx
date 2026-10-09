import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../ui/PageLoader';
import ErrorState from '../ui/ErrorState';
import { fetchTopics, selectTopicsState } from '../../redux/slices/topicsSlice';
import { fetchProgress, selectProgressState } from '../../redux/slices/progressSlice';

// Loads the curriculum and the user's progress once per session (in parallel),
// so every page below can read them synchronously
export default function CurriculumGate() {
  const dispatch = useDispatch();
  const topics = useSelector(selectTopicsState);
  const progress = useSelector(selectProgressState);

  useEffect(() => {
    if (topics.status === 'idle') dispatch(fetchTopics());
    if (progress.status === 'idle') dispatch(fetchProgress());
  }, [topics.status, progress.status, dispatch]);

  if (topics.status === 'failed' || progress.status === 'failed') {
    const retry = () => {
      if (topics.status === 'failed') dispatch(fetchTopics());
      if (progress.status === 'failed') dispatch(fetchProgress());
    };
    return (
      <ErrorState fullScreen title="Couldn't load your curriculum" message={topics.error ?? progress.error} onRetry={retry} />
    );
  }

  if (topics.status !== 'succeeded' || progress.status !== 'succeeded') return <PageLoader fullScreen />;

  return <Outlet />;
}
