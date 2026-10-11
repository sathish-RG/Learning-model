## Your mission: a searchable task list

The tasks are already in `App.jsx`. Make them appear, searchable.

1. **Show the list.** Render each task as an `<li>` inside `#task-list` using `map`, with `key={task.id}` and the task's `title` as its text.
2. **Done badges.** Inside each `<li>`, show `<span className="badge">Done</span>` **only** for tasks where `done` is true (use `&&`).
3. **Search.** Store the search box's text in `query` state. Make the input controlled (`value={query}`, plus `onChange` to update it). Show only tasks whose title includes the query, ignoring upper/lower case.
4. **Empty state.** If no tasks match, show `<p className="empty">No tasks match "QUERY".</p>` **instead of** the list (use a ternary).
5. **The count.** Show `Showing 2 of 5 tasks` in `#summary`, with the real numbers.

✅ **You're done when** all 5 tasks show (two with a Done badge), typing `react` leaves 2, typing `zzz` shows the "No tasks match" message, and the summary always matches what you see.
