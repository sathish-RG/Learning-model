import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { PHASES } from '../../utils/constants';
import { loggedOut } from './authSlice';

export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/topics');
      return data.topics;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  { condition: (_, { getState }) => getState().topics.status !== 'loading' },
);

const initialState = {
  items: [], // sorted by moduleOrder (the API guarantees it)
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(loggedOut, () => initialState);
  },
});

export const selectTopics = (state) => state.topics.items;
export const selectTopicsState = (state) => state.topics;

export const selectTopicBySlug = (state, slug) => state.topics.items.find((t) => t.slug === slug);

// Topics grouped under their phase, in phase order; phases without topics are left out
export const selectPhasesWithTopics = createSelector([selectTopics], (topics) =>
  PHASES.map((phase) => ({ ...phase, topics: topics.filter((t) => t.phase === phase.id) })).filter(
    (phase) => phase.topics.length,
  ),
);

export default topicsSlice.reducer;
