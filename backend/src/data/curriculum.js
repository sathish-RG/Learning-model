// The 80/20 curriculum: source of truth for the Topic collection (loaded by src/seed.js).
// Every module adds one piece to the Task Manager Pro project.
//
// starterCode is the module's main editor file; the frontend maps templateType to it:
//   static -> /index.html, vanilla -> /index.js, react -> /App.js, node -> /index.js

const curriculum = [
  {
    slug: 'html-css-tailwind',
    moduleOrder: 1,
    phase: 'foundations',
    title: 'HTML, CSS & Tailwind',
    description: 'The layout skills behind 80% of real-world UIs.',
    milestone: 'Build the Task Manager Pro shell: a responsive sidebar, header and task board grid.',
    subtopics: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive design', 'Tailwind utility classes'],
    templateType: 'static',
    starterCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body class="bg-zinc-100 font-sans">
    <!-- TODO: turn this into a sidebar + main layout with Flexbox,
         and lay out the task cards in a responsive Grid -->
    <header class="bg-white p-4 font-semibold">Task Manager Pro</header>
    <main class="p-4">
      <article class="rounded-lg bg-white p-4 shadow-sm">Design the layout</article>
      <article class="rounded-lg bg-white p-4 shadow-sm">Make it responsive</article>
    </main>
  </body>
</html>
`,
  },
  {
    slug: 'core-javascript',
    moduleOrder: 2,
    phase: 'foundations',
    title: 'Core JavaScript',
    description: 'The language fundamentals every interview starts with.',
    milestone:
      'Write the task logic in plain JS: validate new task input and filter tasks by status, ready to move into React later.',
    subtopics: ['Variables & data types', 'Functions', 'Arrays & array methods', 'Objects', 'Basic DOM manipulation'],
    templateType: 'vanilla',
    starterCode: `const tasks = [
  { id: 1, title: 'Learn variables and types', done: true },
  { id: 2, title: 'Practice array methods', done: false },
  { id: 3, title: 'Build the task filter', done: false },
];

// TODO: return an error message if the title is empty or shorter than 3 characters,
// otherwise return null
function validateTaskTitle(title) {
  return null;
}

// TODO: return only the tasks matching the status: 'all' | 'done' | 'pending'
function filterTasks(list, status) {
  return list;
}

// Render the result into the page (basic DOM manipulation)
const app = document.getElementById('app');
const items = filterTasks(tasks, 'pending')
  .map((task) => \`<li>\${task.title}</li>\`)
  .join('');
app.innerHTML = \`<h1>Task Manager Pro</h1><ul>\${items}</ul>\`;

console.log(validateTaskTitle(''));
`,
  },
  {
    slug: 'advanced-javascript',
    moduleOrder: 3,
    phase: 'foundations',
    title: 'Advanced JavaScript',
    description: 'The tricky concepts interviewers love: async, scope and the this keyword.',
    milestone: 'Simulate an API with a Promise and a delay, then load the initial tasks with async/await.',
    subtopics: [
      'ES6+: destructuring, spread & rest',
      'Closures',
      'Hoisting',
      'Promises',
      'Async/await',
      'The event loop',
      'call, apply & bind',
    ],
    templateType: 'vanilla',
    starterCode: `const DUMMY_TASKS = [
  { id: 1, title: 'Understand closures', done: false },
  { id: 2, title: 'Explain the event loop', done: false },
];

// TODO: return a Promise that resolves with DUMMY_TASKS after \`delay\` ms
// (simulates a real API call)
function fetchTasks(delay = 1000) {}

// TODO: show "Loading...", await fetchTasks(), then render the task titles.
// Wrap it in try/catch and show an error message if the request fails.
async function loadTasks() {
  const app = document.getElementById('app');
  app.textContent = 'Loading...';
}

loadTasks();
`,
  },
  {
    slug: 'react-core',
    moduleOrder: 4,
    phase: 'react',
    title: 'React Core',
    description: 'Components, props, state and effects: the core of every React interview.',
    milestone: 'Move your plain-JS task logic into React components with useState, and load tasks with useEffect.',
    subtopics: ['Components & JSX', 'Props', 'useState', 'useEffect', 'React Router'],
    templateType: 'react',
    starterCode: `import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState(['Learn the 80/20 of React']);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Task Manager Pro</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      {/* TODO: add an input and a button that appends a new task */}
    </main>
  );
}
`,
  },
  {
    slug: 'advanced-react',
    moduleOrder: 5,
    phase: 'react',
    title: 'Advanced React',
    description: 'Scalable state and reusable logic for apps that grow.',
    milestone: 'Move task state to Redux Toolkit and extract logic into custom hooks.',
    subtopics: ['Redux Toolkit', 'Custom hooks', 'Context API', 'Performance optimization'],
    templateType: 'react',
    starterCode: `import { useState } from 'react';

// TODO: move the task state plus addTask and toggleTask into this custom hook
function useTasks(initialTasks) {
  const [tasks] = useState(initialTasks);
  return { tasks };
}

export default function App() {
  const { tasks } = useTasks([{ id: 1, title: 'Extract logic into a custom hook', done: false }]);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Task Manager Pro</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}
`,
  },
  {
    slug: 'backend-fundamentals',
    moduleOrder: 6,
    phase: 'backend',
    title: 'Backend Fundamentals',
    description: 'Node.js and Express: build and structure a REST API.',
    milestone: 'Build the Task Manager Pro REST API with Express routes and controllers.',
    subtopics: ['Node.js basics', 'Express server setup', 'Middleware', 'RESTful API design'],
    templateType: 'node',
    starterCode: `const express = require('express');

const app = express();
app.use(express.json());

let tasks = [{ id: 1, title: 'Build a REST API', done: false }];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// TODO: POST /api/tasks - validate the title, add the task, respond with 201
// TODO: PATCH /api/tasks/:id and DELETE /api/tasks/:id (respond 404 if not found)

app.listen(3000, () => console.log('Task API running on port 3000'));
`,
  },
  {
    slug: 'database-auth',
    moduleOrder: 7,
    phase: 'backend',
    title: 'Database & Auth',
    description: 'Persist data and secure it, plus when to choose SQL over NoSQL.',
    milestone: 'Store tasks in MongoDB and protect the API with JWT authentication.',
    subtopics: ['MongoDB & Mongoose schemas', 'CRUD operations', 'JWT authentication', 'SQL vs NoSQL basics', 'Basic SQL queries'],
    templateType: 'node',
    starterCode: `const express = require('express');

const app = express();
app.use(express.json());

// In-memory stand-in for a MongoDB "tasks" collection
const tasks = [];
const DEMO_TOKEN = 'demo-token';

// TODO: respond 401 unless the request has "Authorization: Bearer demo-token"
function requireAuth(req, res, next) {
  next();
}

app.get('/api/tasks', requireAuth, (req, res) => {
  res.json(tasks);
});

// TODO: add POST, PATCH and DELETE /api/tasks to complete the CRUD operations

/*
  SQL vs NoSQL: the same read in SQL
    SELECT * FROM tasks WHERE user_id = 1 ORDER BY created_at DESC;
  TODO: write the SQL for creating, updating and deleting a task
*/

app.listen(3000, () => console.log('Task API running on port 3000'));
`,
  },
];

export default curriculum;
