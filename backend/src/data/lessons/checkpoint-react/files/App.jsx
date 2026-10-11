// Checkpoint C: Task Manager Pro in React.
// App owns the state; data goes down as props, actions come up through callbacks.
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterBar from "./components/FilterBar.jsx";

export default function App() {
  // 1. tasks and filter state (7. start tasks from localStorage)

  // 2. addTask, toggleTask, deleteTask, clearDone

  // 5. visibleTasks and the number of tasks left (calculate, don't store)

  // 7. Save tasks to localStorage whenever they change

  return (
    <>
      <header className="site-header">
        <h1>Task Manager Pro</h1>
        <p id="task-count">0 tasks left</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>Add a task</h2>
          <TaskForm />
        </section>

        <section className="card">
          <div className="list-header">
            <h2>Tasks</h2>
            <FilterBar />
          </div>
          <TaskList tasks={[]} />
          <button className="link-button" type="button">
            Clear completed
          </button>
        </section>
      </main>
    </>
  );
}
