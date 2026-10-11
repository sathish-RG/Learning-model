## Why does this matter?

In large apps, lots of components read and change the same data: the cart, the logged-in user, the list of tasks. **Redux** keeps that shared data in one central, predictable place, and **Redux Toolkit** is the modern, official way to write it with much less code. Many companies use it, so it comes up in interviews too.

## A central warehouse 🏬

Think of a company with one central **warehouse** (the **store**) that holds everything:

- The warehouse has **departments** (**slices**): one for tasks, one for the user, and so on.
- Nobody walks in and moves stock around. Staff fill in **request forms** (**actions**), like "add a task".
- Each department has a **clerk** (a **reducer**) who reads the form and updates the records.
- Anyone in the company can **look up** the records (`useSelector`) or **send a form** (`useDispatch`).

Because every change goes through a form, you always know what changed and why.

## createSlice: a department in one go 🏗️

```js
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [] },
  reducers: {
    taskAdded(state, action) {
      state.items.push({ id: Date.now(), title: action.payload, done: false });
    },
    taskToggled(state, action) {
      const task = state.items.find((t) => t.id === action.payload);
      task.done = !task.done;
    },
  },
});

export const { taskAdded, taskToggled } = tasksSlice.actions;   // the request forms
export default tasksSlice.reducer;                              // the clerk
```

**Wait, `push` and `task.done =`?!** Inside `createSlice` only, you're allowed to write "mutating" code. Redux Toolkit uses a library called **Immer**, which secretly turns it into a safe, immutable update. Everywhere else, the copy rules still apply.

`action.payload` is whatever you pass when creating the action: `taskAdded("Buy milk")`.

## configureStore and Provider 🔌

```js
// store.js
export const store = configureStore({
  reducer: { tasks: tasksReducer },   // state.tasks is handled by the tasks slice
});

// App.jsx
<Provider store={store}>
  <TaskApp />
</Provider>
```

`Provider` uses Context (Lesson 48) to give every component access to the store.

## Reading and sending: useSelector and useDispatch 📤

```jsx
const tasks = useSelector((state) => state.tasks.items);   // read (re-renders when it changes)
const dispatch = useDispatch();

<button onClick={() => dispatch(taskAdded("Buy milk"))}>Add</button>
```

## Loading data: createAsyncThunk ⏳

For async work, `createAsyncThunk` creates an action that runs a promise and **automatically** sends `pending`, `fulfilled` or `rejected` actions, which your slice handles in `extraReducers`:

```js
export const fetchTasks = createAsyncThunk("tasks/fetch", () => fakeFetchTasks());

// inside createSlice:
extraReducers: (builder) => {
  builder
    .addCase(fetchTasks.pending, (state) => { state.status = "loading"; })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
},
```

Dispatch it like any action, usually in an effect when the app starts: `dispatch(fetchTasks())`.

## Redux or Context?

Use Context for simple, rarely-changing values (the theme, the user). Reach for Redux Toolkit when lots of components share **frequently changing** data, or when you want its structure and debugging tools.

## Remember ✅

- Store = the warehouse, slices = departments, actions = request forms, reducers = clerks.
- `createSlice` makes actions and a reducer; "mutating" code is safe **only** inside it.
- `configureStore` + `<Provider>`, then `useSelector` to read and `useDispatch` to send.
- `createAsyncThunk` handles loading, with `pending`/`fulfilled`/`rejected` in `extraReducers`.
