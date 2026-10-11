// Lesson 41: split this page into Header, TaskList and Footer components.
export default function App() {
  return (
    <>
      <header className="site-header">
        <h1>Task Manager Pro</h1>
        <p class="tagline">Small steps, every day.</p>
      </header>

      <section className="task-list">
        <h2>Today</h2>
        <article className="task-card">
          <input type="checkbox" id="task-1" />
          <label for="task-1">Learn what a component is</label>
        </article>
        <article className="task-card">
          <input type="checkbox" id="task-2" />
          <label for="task-2">Write my first JSX</label>
        </article>
      </section>

      <footer className="site-footer">© 2026 Task Manager Pro</footer>
    </>
  );
}
