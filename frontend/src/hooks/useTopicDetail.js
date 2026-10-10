import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopicDetail, selectTopicDetail } from '../redux/slices/topicsSlice';

// The full topic (lesson, instructions, files), fetched once per session and cached
export default function useTopicDetail(slug, enabled = true) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => selectTopicDetail(state, slug));

  useEffect(() => {
    if (enabled && slug && detail.status === 'idle') dispatch(fetchTopicDetail(slug));
  }, [enabled, slug, detail.status, dispatch]);

  return { ...detail, retry: () => dispatch(fetchTopicDetail(slug)) };
}
