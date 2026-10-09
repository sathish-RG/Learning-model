import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer, { loggedOut } from './slices/authSlice';
import topicsReducer from './slices/topicsSlice';
import progressReducer from './slices/progressSlice';
import { configureApiAuth } from '../utils/api';
import { storage } from '../utils/storage';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    topics: topicsReducer,
    progress: progressReducer,
  },
});

configureApiAuth({
  isAuthenticated: () => Boolean(store.getState().auth.user),
  // The cookie is already invalid, so only the local session needs clearing
  onUnauthorized: () => store.dispatch(loggedOut()),
});

// Remove the JWT that older versions stored in localStorage
storage.remove('token');
