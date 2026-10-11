// Adds tasks. Keeps its own state for what's being typed, and calls onAdd(title, priority).
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }
    setError("");
    onAdd(trimmed, priority);
    setTitle("");
  };

  return (
    <form className="task-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title</label>
      <input
        id="task-title"
        type="text"
        autoComplete="off"
        placeholder="e.g. Deploy my first full-stack app"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="task-priority">Priority</label>
      <select id="task-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="button" type="submit">
        Add
      </button>
      <p className="form-error" aria-live="polite">
        {error}
      </p>
    </form>
  );
}
