// Lesson 51: Redux Toolkit.
import { useEffect, useState } from "react";
// 4. import { Provider, useDispatch, useSelector } from "react-redux";
// and import store, plus the actions and fetchTasks from your slice

function TaskApp() {
  const [title, setTitle] = useState("");
  // 4. useSelector, useDispatch, and fetch the tasks once

  return (
    <main className="page">
      <h1>Redux Tasks</h1>
      <form className="row">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" aria-label="New task" />
        <button type="submit">Add</button>
      </form>
      <ul id="tasks">{/* 4. tasks */}</ul>
      <p id="left">0 left</p>
    </main>
  );
}

export default function App() {
  // 4. Wrap TaskApp in <Provider store={store}>
  return <TaskApp />;
}
