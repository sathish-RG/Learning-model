import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { loggedOut } from './authSlice';

// The course as summaries (no lesson text or files), for the learning path
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

// One topic in full (lesson, instructions, files), fetched when a lesson is opened
export const fetchTopicDetail = createAsyncThunk(
  'topics/fetchTopicDetail',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/topics/${slug}`);
      return data.topic;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (slug, { getState }) => {
      const status = getState().topics.details[slug]?.status;
      return status !== 'loading' && status !== 'succeeded';
    },
  },
);

const initialState = {
  items: [], // sorted by moduleOrder (the API guarantees it)
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  details: {}, // { [slug]: { status, topic, error } }
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
      .addCase(fetchTopicDetail.pending, (state, action) => {
        state.details[action.meta.arg] = { status: 'loading', topic: null, error: null };
      })
      .addCase(fetchTopicDetail.fulfilled, (state, action) => {
        state.details[action.meta.arg] = { status: 'succeeded', topic: action.payload, error: null };
      })
      .addCase(fetchTopicDetail.rejected, (state, action) => {
        state.details[action.meta.arg] = {
          status: 'failed',
          topic: null,
          error: action.payload ?? action.error.message,
        };
      })
      .addCase(loggedOut, () => initialState);
  },
});

export const selectTopics = (state) => state.topics.items;
export const selectTopicsState = (state) => state.topics;
export const selectTopicBySlug = (state, slug) => state.topics.items.find((t) => t.slug === slug);
export const selectTopicDetail = (state, slug) => state.topics.details[slug] ?? { status: 'idle', topic: null, error: null };

export default topicsSlice.reducer;
