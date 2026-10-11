## Your mission: write two reusable hooks

Files: `App.jsx`, `hooks/useLocalStorage.js` and `hooks/useFetch.js`. `api.js` is locked: it's a pretend server where `/users` works and anything else fails.

1. **useLocalStorage.** In `hooks/useLocalStorage.js`, export `useLocalStorage(key, initialValue)`:
   - start from the saved value (`JSON.parse`) if there is one, otherwise `initialValue`, using a lazy start
   - save to `localStorage` whenever the value changes
   - return `[value, setValue]`
2. **Use it.** In `App.jsx`, store `name` with `useLocalStorage("name", "")`. Make the name input controlled, and show `Hello, NAME!` (or `Hello, stranger!`) in `#greeting`.
3. **useFetch.** In `hooks/useFetch.js`, export `useFetch(url)`: it returns `{ data, loading, error }`, calls `fakeApi(url)`, uses an `ignore` flag, and reloads when `url` changes.
4. **Use it.** In `App.jsx`:
   - keep `url` state (starting at `"/users"`), and call `useFetch(url)`
   - show `Loading…`, the error message, or the users' names (joined with commas) in `#result`
   - the two buttons switch `url` between `"/users"` and `"/missing"`

✅ **You're done when** your name is still there after refreshing the preview; the users load after `Loading…`; and the "broken URL" button shows `Not found: /missing`.
