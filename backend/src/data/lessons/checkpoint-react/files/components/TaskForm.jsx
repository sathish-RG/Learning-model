// Adds tasks. Keeps its own state for what's being typed, and calls onAdd(title, priority).
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  // 3. Controlled title and priority (start at "medium"), plus an error message

  return (
    <form className="task-form" noValidate>
      <label htmlFor="task-title">Title</label>
      <input id="task-title" type="text" autoComplete="off" placeholder="e.g. Finish Checkpoint C" />

      <label htmlFor="task-priority">Priority</label>
      <select id="task-priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="button" type="submit">
        Add
      </button>
      <p className="form-error" aria-live="polite"></p>
    </form>
  );
}
