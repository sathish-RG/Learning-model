import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import api from '../../utils/api';

const toRejectValue = (err) => ({ message: err.message, details: err.details, status: err.status });

const authenticate = (path) => async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post(path, credentials);
    return data.user;
  } catch (err) {
    return rejectWithValue(toRejectValue(err));
  }
};

export const login = createAsyncThunk('auth/login', authenticate('/auth/login'));
export const register = createAsyncThunk('auth/register', authenticate('/auth/register'));

// Asks the server whether the auth cookie is valid (runs once on page load)
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/auth/me');
      return data.user;
    } catch (err) {
      return rejectWithValue(toRejectValue(err));
    }
  },
  { condition: (_, { getState }) => getState().auth.session !== 'checking' },
);

const initialState = {
  user: null,
  // Whether we know if there's a valid session: 'unknown' | 'checking' | 'authenticated' | 'guest' | 'error'
  session: 'unknown',
  sessionError: null,
  // Login/register form submission
  status: 'idle', // 'idle' | 'loading' | 'failed'
  error: null, // { message, details? }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedOut() {
      return { ...initialState, session: 'guest' };
    },
    clearAuthError(state) {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.session = 'checking';
        state.sessionError = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.session = 'authenticated';
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        // 401 just means "not logged in"; anything else (server down) is a real error
        if (action.payload?.status === 401) {
          state.session = 'guest';
        } else {
          state.session = 'error';
          state.sessionError = action.payload?.message ?? action.error.message;
        }
      })
      .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher(isAnyOf(login.fulfilled, register.fulfilled), (state, action) => {
        state.user = action.payload;
        state.session = 'authenticated';
        state.status = 'idle';
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? { message: action.error.message };
      });
  },
});

export const { loggedOut, clearAuthError } = authSlice.actions;

// Clears the cookie on the server, then the local state (even if the request fails)
export const logout = () => async (dispatch) => {
  try {
    await api.post('/auth/logout');
  } finally {
    dispatch(loggedOut());
  }
};

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;

export default authSlice.reducer;
