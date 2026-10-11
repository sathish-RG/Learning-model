## Why does this matter?

You'll often write the same hook logic over and over: "keep this in `localStorage`", "load this URL and track loading and errors". **Custom hooks** let you package that logic once and reuse it in any component, keeping components short and focused on what they show.

## Your own tools 🧰

A custom hook is simply a **function whose name starts with `use`**, which calls other hooks inside it. It's like a recipe card you write once and hand to any cook:

```jsx
function useToggle(start = false) {
  const [on, setOn] = useState(start);
  const toggle = () => setOn((value) => !value);
  return [on, toggle];
}

// in any component:
const [isOpen, toggleOpen] = useToggle();
```

## Hooks share logic, not state 🔀

Every component that calls `useToggle()` gets its **own, separate** `on` value. A custom hook shares the **recipe**, not the meal. If you need components to share the *same* data, that's a job for Context (the last lesson).

## The rules of hooks 📏

1. **Only call hooks at the top level** of a component or custom hook: never inside `if`, loops or nested functions. React relies on hooks being called in the same order every render.
2. **Only call hooks from components or other hooks**, not from ordinary functions.
3. **Name custom hooks starting with `use`**, so React (and your teammates) can tell they follow these rules.

## useLocalStorage: state that survives a refresh 💾

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {          // a "lazy" start: runs only once
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));   // save whenever it changes
  }, [key, value]);

  return [value, setValue];
}
```

Passing a **function** to `useState` makes the starting value lazy: it's read from storage only on the first render, not every time.

## useFetch: loading, data and error in one place 📦

Loading data always needs the same three pieces of state, plus the `ignore` flag from the effects lesson:

```jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let ignore = false;
    setState({ data: null, loading: true, error: null });
    fakeApi(url)
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((error) => !ignore && setState({ data: null, loading: false, error: error.message }));
    return () => {
      ignore = true;
    };
  }, [url]);   // load again whenever the URL changes

  return state;
}
```

Now any component can load data in one line: `const { data, loading, error } = useFetch("/users");`.

## Remember ✅

- A custom hook is a `use…` function that calls other hooks and returns whatever is useful.
- Each component calling it gets its own state: hooks share logic, not data.
- Only call hooks at the top level, from components or other hooks.
- Great candidates: anything you'd otherwise copy and paste, like storage or fetching.
