import { createAsyncThunk, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { loggedOut, xpUpdated } from './authSlice';

export const fetchProgress = createAsyncThunk(
  'progress/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const [progressRes, streakRes] = await Promise.all([api.get('/progress'), api.get('/streak')]);
      return { progress: progressRes.data.progress, streak: streakRes.data.streak };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  { condition: (_, { getState }) => getState().progress.status !== 'loading' },
);

// Both return { progress, streak }: the updated topic record and the updated streak
export const saveCode = createAsyncThunk('progress/saveCode', async ({ slug, code }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/progress/${slug}/code`, { code });
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Also returns xpEarned (> 0 only on a topic's first completion) and the user's new totalXP
export const setTopicStatus = createAsyncThunk('progress/setTopicStatus', async ({ slug, status }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await api.put(`/progress/${slug}/status`, { status });
    dispatch(xpUpdated(data.totalXP));
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  byTopicId: {}, // { [topicId]: { status, completedAt, ... } } (saved code is fetched per topic)
  streak: { currentStreak: 0, maxStreak: 0, activeToday: false, lastActiveDay: null, today: null },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.byTopicId = Object.fromEntries(action.payload.progress.map((p) => [p.topic, p]));
        state.streak = action.payload.streak;
        state.status = 'succeeded';
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(loggedOut, () => initialState)
      .addMatcher(isAnyOf(saveCode.fulfilled, setTopicStatus.fulfilled), (state, action) => {
        const { progress, streak } = action.payload;
        state.byTopicId[progress.topic] = progress;
        state.streak = streak;
      });
  },
});

export const selectProgressState = (state) => state.progress;
export const selectStreak = (state) => state.progress.streak;

export const selectCompletedTopicIds = createSelector([(state) => state.progress.byTopicId], (byTopicId) =>
  Object.values(byTopicId)
    .filter((p) => p.status === 'completed')
    .map((p) => p.topic),
);

export const selectIsTopicCompleted = (state, topicId) => state.progress.byTopicId[topicId]?.status === 'completed';

// XP already earned for a topic (0 if its reward hasn't been claimed yet)
export const selectTopicXpEarned = (state, topicId) => state.progress.byTopicId[topicId]?.xpEarned ?? 0;

export default progressSlice.reducer;
