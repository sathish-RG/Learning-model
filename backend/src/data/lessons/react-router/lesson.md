## Why does this matter?

Real apps have many "pages": home, a list, a detail view, settings, each with its own URL you can bookmark and share. In a React app, switching between them should be **instant**, with no full page reload. That's what **React Router** does, and it's used in a huge number of React projects.

## Flipping tabs in a binder 📒

A traditional website is like asking the librarian for a **new book** every time you click a link: the whole page reloads. A **single-page app** (SPA) is like a binder with tabs: flipping to another section is instant, because everything's already in your hands. React Router changes the URL and swaps which components are shown, without reloading.

## Setting up routes 🗺️

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

- `BrowserRouter` wraps the app and watches the URL.
- Each `Route` maps a **path** to the **element** to show.
- `path="*"` catches everything else: your 404 page.

## Links, not a tags 🔗

```jsx
<Link to="/tasks">All tasks</Link>
```

A normal `<a href>` reloads the whole page, throwing away your app's state. `Link` changes the URL **without** a reload. `NavLink` is a `Link` that automatically gets an `active` class when its page is open: perfect for menus.

## URL parameters: one route, many pages 🔢

A path segment starting with `:` is a **parameter**: a blank that's filled in from the URL.

```jsx
<Route path="/tasks/:id" element={<TaskDetail />} />

function TaskDetail() {
  const { id } = useParams();   // "/tasks/3" → id is "3" (always text!)
  const task = tasks.find((t) => t.id === Number(id));
  ...
}
```

One `TaskDetail` component shows any task, depending on the URL.

## Layouts and Outlet: a picture frame 🖼️

Most pages share the same header and menu. A **layout route** draws that frame once, and `<Outlet />` marks the hole where the current page goes:

```jsx
<Route element={<Layout />}>
  <Route index element={<Home />} />        {/* index = the "/" page inside the layout */}
  <Route path="tasks" element={<Tasks />} />
</Route>

function Layout() {
  return (
    <>
      <nav>...</nav>
      <Outlet />   {/* the current page appears here */}
    </>
  );
}
```

## Navigating from code 🧭

`useNavigate` changes pages from your code, for example after saving a form:

```jsx
const navigate = useNavigate();
<button onClick={() => navigate("/tasks")}>Back to tasks</button>
```

## Remember ✅

- `BrowserRouter` + `Routes` + `Route path element` map URLs to components; `path="*"` is the 404.
- Use `Link` / `NavLink`, not `<a>`, so the page doesn't reload.
- `:id` in a path is a URL parameter: read it with `useParams()` (it's always text).
- Layout routes + `<Outlet />` share a frame; `useNavigate()` moves between pages from code.
