// One task: a checkbox, its title, a priority badge and a delete button.
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.done ? "done" : ""}>
      <input type="checkbox" aria-label={`Done: ${task.title}`} checked={task.done} onChange={() => onToggle(task.id)} />
      <span className="task-title">{task.title}</span>
      <span className={`priority ${task.priority}`}>{task.priority}</span>
      <button className="delete" type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>
        ×
      </button>
    </li>
  );
}
