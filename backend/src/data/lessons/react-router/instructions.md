## Your mission: a multi-page task app

Files: `App.jsx`, `Layout.jsx`, `pages/Home.jsx`, `pages/Tasks.jsx` and `pages/TaskDetail.jsx`. `data.js` (the tasks) is locked. `react-router-dom` is already installed.

1. **The routes.** In `App.jsx`, wrap everything in `BrowserRouter` and add `Routes`: a layout route with `<Layout />`, holding:
   - an index route showing `<Home />`
   - `tasks` showing `<Tasks />`
   - `tasks/:id` showing `<TaskDetail />`
   - `*` showing `<p className="not-found">Page not found</p>`
2. **The layout.** In `Layout.jsx`, render a `<nav>` with two `NavLink`s, `Home` (to `/`, with the `end` prop) and `Tasks` (to `/tasks`), and an `<Outlet />` under it inside `<main>`.
3. **The list.** In `pages/Tasks.jsx`, show an `<h1>` `Tasks` and a list of `Link`s, one per task, to `/tasks/ID`, with the task's title as the text.
4. **The detail page.** In `pages/TaskDetail.jsx`, read `id` with `useParams`, and find the task (remember: `id` is text!). Show its title in an `<h1>` and its status (`Done` or `To do`) in a `<p>`. If there's no such task, show `Task not found`. Add a `Back to tasks` button that uses `useNavigate`.

✅ **You're done when** you can click from Home to Tasks to a task and back without the page reloading, the current menu link is highlighted, and an unknown task shows `Task not found`.
