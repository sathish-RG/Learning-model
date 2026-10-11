// Checkpoint C's App, now saving to the API (and MongoDB) instead of localStorage.
import { useEffect, useState } from "react";
import { api } from "../api.js";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import FilterBar from "./FilterBar.jsx";

export default function TaskBoard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load this user's tasks once
  useEffect(() => {
    api("/tasks")
      .then((data) => setTasks(data.tasks))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Every change: ask the API first, then update the screen with what it saved
  const run = async (action) => {
    setError("");
    try {
      await action();
    } catch (err) {
      setError(err.message);
    }
  };

  const addTask = (title, priority) =>
    run(async () => {
      const { task } = await api("/tasks", { method: "POST", body: { title, priority } });
      setTasks((current) => [...current, task]);
    });

  const toggleTask = (id) =>
    run(async () => {
      const current = tasks.find((t) => t.id === id);
      const { task } = await api(`/tasks/${id}`, { method: "PATCH", body: { done: !current.done } });
      setTasks((list) => list.map((t) => (t.id === id ? task : t)));
    });

  const deleteTask = (id) =>
    run(async () => {
      await api(`/tasks/${id}`, { method: "DELETE" });
      setTasks((list) => list.filter((t) => t.id !== id));
    });

  const clearDone = () =>
    run(async () => {
      await api("/tasks?done=true", { method: "DELETE" });
      setTasks((list) => list.filter((t) => !t.done));
    });

  const visibleTasks = tasks.filter((task) => (filter === "active" ? !task.done : filter === "done" ? task.done : true));
  const left = tasks.filter((task) => !task.done).length;

  return (
    <>
      <header className="site-header">
        <h1>Task Manager Pro</h1>
        <p id="task-count">
          {left} {left === 1 ? "task" : "tasks"} left
        </p>
        <div className="user">
          <span>Hi, {user.name}</span>
          <button className="link-button" type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      {error && (
        <p className="banner" role="alert">
          {error}
        </p>
      )}

      <main className="content">
        <section className="card">
          <h2>Add a task</h2>
          <TaskForm onAdd={addTask} />
        </section>

        <section className="card">
          <div className="list-header">
            <h2>Tasks</h2>
            <FilterBar filter={filter} onChange={setFilter} />
          </div>
          {loading ? (
            <p className="muted">Loading your tasks…</p>
          ) : visibleTasks.length ? (
            <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
          ) : (
            <p className="muted empty">{tasks.length ? "No tasks match this filter." : "No tasks yet. Add your first one!"}</p>
          )}
          <button className="link-button" type="button" onClick={clearDone}>
            Clear completed
          </button>
        </section>
      </main>
    </>
  );
}
