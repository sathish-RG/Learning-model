// One task: a checkbox, its title, a priority badge and a delete button.
export default function TaskItem({ task, onToggle, onDelete }) {
  // 4. Wire up the class, the checkbox and the delete button
  return (
    <li>
      <input type="checkbox" aria-label={`Done: ${task.title}`} />
      <span className="task-title">{task.title}</span>
      <span className="priority">{task.priority}</span>
      <button className="delete" type="button" aria-label={`Delete ${task.title}`}>
        ×
      </button>
    </li>
  );
}
