## Your mission: move the tasks into Redux

Files: `App.jsx`, `store.js` and `tasksSlice.js`. `api.js` (a pretend server) is locked. `@reduxjs/toolkit` and `react-redux` are installed.

1. **The slice.** In `tasksSlice.js`, use `createSlice` with:
   - name `"tasks"`
   - initial state `{ items: [], status: "idle" }`
   - three reducers: `taskAdded` (payload = the title; push `{ id: Date.now(), title, done: false }`), `taskToggled` (payload = an id) and `taskRemoved` (payload = an id)

   Export the actions and the reducer.
2. **Load tasks.** In the same file, export `fetchTasks = createAsyncThunk("tasks/fetch", fakeFetchTasks)`. Handle it in `extraReducers`:
   - `pending` sets `status` to `"loading"`
   - `fulfilled` sets `status` to `"succeeded"` and `items` to the payload
3. **The store.** In `store.js`, export a `store` made with `configureStore`, with `tasks` handled by your reducer.
4. **Connect.** In `App.jsx`, wrap `<TaskApp />` in `<Provider store={store}>`. In `TaskApp`:
   - read the items and status with `useSelector`
   - dispatch `fetchTasks()` once, in an effect
   - show `Loading…` while loading
   - show each task with a checkbox (dispatching `taskToggled`) and a `×` button (dispatching `taskRemoved`)
   - the form dispatches `taskAdded` with the typed title, then clears the box
   - show `N left` (the tasks not done) in `#left`

✅ **You're done when** the starter tasks appear after `Loading…`, and adding, ticking and removing all work through Redux.
