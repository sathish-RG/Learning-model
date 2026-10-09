import axios from 'axios';

// Shared HTTP client. Dev requests go through the Vite proxy to the Express API.
// Auth is an httpOnly cookie, sent automatically; JavaScript never sees the token.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true,
  timeout: 10_000,
  // Lets the backend count streak days in the user's local time
  headers: { 'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone },
});

// Set by the store (see redux/store.js) so this module doesn't import the store directly
let authHandlers = { isAuthenticated: () => false, onUnauthorized: () => {} };

export const configureApiAuth = (handlers) => {
  authHandlers = handlers;
};

// Unwrap the backend's { success, message, data } envelope and normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    // The session ended while the app was open (cookie expired or user deleted).
    // Guests get 401s too (e.g. a wrong password), which must not trigger this.
    if (response?.status === 401 && authHandlers.isAuthenticated()) {
      authHandlers.onUnauthorized();
    }

    const message = response
      ? response.data?.message || `Request failed (${response.status})`
      : "Can't reach the server. Check your connection and try again.";

    return Promise.reject(Object.assign(new Error(message), { status: response?.status, details: response?.data?.details }));
  },
);

export default api;
