import { existsSync, readFileSync } from 'node:fs';

// The "Zero to Pro" course: source of truth for the Topic collection (synced by src/seed.js).
// 8 phases, 62 lessons and 4 Task Manager Pro checkpoints, in strict learning order.
// Each lesson teaches and practices ONE thing; concepts are only combined at checkpoints.
//
// Content lives in one folder per lesson:
//   lessons/<slug>/lesson.md         the "Learn" step (beginner-friendly Markdown)
//   lessons/<slug>/instructions.md   the "Practice" mission
//   lessons/<slug>/files/<path>      starter code for each practice file, e.g. files/index.html
//
// A lesson is published as soon as its lesson.md exists; until then it shows as "coming soon".
// Each phase sets the Sandpack template and the files a lesson gets (lessons can override them).

const LESSON_XP = 20;
const CHECKPOINT_XP = 100;

const PHASES = [
  {
    phase: 1,
    phaseTitle: 'Phase 1: HTML',
    templateType: 'static',
    files: [{ filename: '/index.html' }],
    lessons: [
      ['your-first-web-page', 'Your First Web Page', 'Write a valid page skeleton (doctype, html, head, title, body) with one heading and one paragraph.'],
      ['text-and-headings', 'Text & Headings', 'Mark up a short article with a correct h1–h3 order, paragraphs, strong/em and a blockquote.'],
      ['links-and-lists', 'Links & Lists', 'Build a site menu (a list of links) and a numbered recipe with a nested ingredients list.'],
      ['images-and-media', 'Images & Media', 'Build a captioned photo gallery with meaningful alt text, plus an embedded video.'],
      ['html-tables', 'Tables', 'Build an accessible weekly timetable with a header row, th scope and one merged cell.'],
      ['forms-inputs-and-labels', 'Forms I: Inputs & Labels', 'Build a sign-up form where every input (text, email, password, date) has a linked label.'],
      ['forms-choices-and-validation', 'Forms II: Choices & Validation', 'Build a survey with a dropdown, radio groups, checkboxes and a textarea, using built-in validation.'],
      ['semantic-html-and-accessibility', 'Semantic HTML & Accessibility', 'Turn a page of plain divs into proper header, nav, main, article, aside and footer sections.'],
    ],
  },
  {
    phase: 2,
    phaseTitle: 'Phase 2: CSS',
    templateType: 'static',
    // Isolation: the HTML is given and locked; learners only write CSS
    files: [{ filename: '/index.html', readOnly: true }, { filename: '/styles.css' }],
    lessons: [
      ['selectors-cascade-and-specificity', 'Selectors, Cascade & Specificity', 'Style a given page using element, class and id selectors, and fix a rule that loses to a more specific one.'],
      ['colors-units-and-typography', 'Colors, Units & Typography', 'Apply a given color palette and type scale using rem, hsl() and font properties.'],
      ['the-box-model', 'The Box Model', 'Make three cards match target sizes exactly, using padding, border, margin and box-sizing.'],
      ['display-and-positioning', 'Display & Positioning', "Pin a badge to a card's corner and make the header stick to the top while scrolling."],
      ['flexbox-in-depth', 'Flexbox in Depth', 'Build a navbar and a centered hero section using only Flexbox.'],
      ['css-grid-in-depth', 'CSS Grid in Depth', 'Build a full page layout with named grid areas, plus a card grid that adjusts its columns automatically.'],
      ['responsive-design', 'Responsive Design', 'Make a given layout adapt at three screen sizes, mobile first, using media queries and clamp().'],
      ['css-variables-and-pseudo-classes', 'Variables & Pseudo-classes', 'Build a light/dark theme with CSS variables, and style :focus-visible, :invalid and ::before states.'],
      ['transitions-transforms-and-animations', 'Transitions, Transforms & Animations', 'Add smooth hover effects to buttons and build a loading spinner with a keyframe animation.'],
      // Tailwind is written as classes in the HTML, so here the HTML is the editable file
      ['tailwind-css', 'Tailwind CSS', 'Rebuild an earlier card design using only Tailwind classes, with no CSS file.', { files: [{ filename: '/index.html' }] }],
    ],
    checkpoint: [
      'checkpoint-static-ui',
      'Checkpoint A: Task Manager Pro UI',
      'Combine HTML and CSS for the first time to build the static Task Manager Pro interface.',
      { files: [{ filename: '/index.html' }, { filename: '/styles.css' }], milestone: 'The static Task Manager Pro interface: layout, task cards and forms.' },
    ],
  },
  {
    phase: 3,
    phaseTitle: 'Phase 3: JavaScript Fundamentals',
    templateType: 'vanilla',
    files: [{ filename: '/index.js' }],
    lessons: [
      ['variables-types-and-operators', 'Variables, Types & Operators', 'Calculate and print values, and fix bugs caused by automatic type conversion.'],
      ['conditionals', 'Conditionals', 'Write a grade calculator using if/else, switch and the ? : shorthand.'],
      ['loops', 'Loops', 'Solve FizzBuzz and running totals using for, while and for...of.'],
      ['functions-and-scope', 'Functions & Scope', 'Write small, reusable functions using default parameters, arrow functions and return.'],
      ['arrays-and-array-methods', 'Arrays & Array Methods', 'Transform a dataset with map, filter, reduce, find and sort.'],
      ['objects-and-json', 'Objects & JSON', 'Model a user profile as an object, then convert it to JSON text and back.'],
      ['strings-numbers-and-dates', 'Strings, Numbers & Dates', 'Format a shopping receipt using template strings, Math and Intl.'],
      ['errors-and-debugging', 'Errors & Debugging', 'Make a fragile parser fail gracefully with try/catch and custom errors.'],
    ],
  },
  {
    phase: 4,
    phaseTitle: 'Phase 4: JavaScript in the Browser',
    templateType: 'vanilla',
    // The page structure is given and locked; learners only write the JavaScript
    files: [{ filename: '/index.html', readOnly: true }, { filename: '/index.js' }],
    lessons: [
      ['dom-selecting-and-changing', 'The DOM: Selecting & Changing Elements', 'Show a list on the page from an array, using createElement and classList.'],
      ['events-and-delegation', 'Events & Event Delegation', 'Make a list where items can be removed, using a single click listener on the parent.'],
      ['forms-with-javascript', 'Forms with JavaScript', 'Validate a sign-up form with your own error messages, and stop it submitting when invalid.'],
      ['storage-and-timers', 'Storage & Timers', 'Build a stopwatch whose laps are kept in localStorage.'],
    ],
    checkpoint: [
      'checkpoint-vanilla-js',
      'Checkpoint B: Task Manager Pro in JavaScript',
      'Make Task Manager Pro work in plain JavaScript: show, add, complete and save tasks.',
      {
        files: [{ filename: '/index.html' }, { filename: '/styles.css' }, { filename: '/index.js' }],
        milestone: 'A working Task Manager Pro in plain JavaScript that remembers tasks between visits.',
      },
    ],
  },
  {
    phase: 5,
    phaseTitle: 'Phase 5: Advanced JavaScript',
    templateType: 'vanilla',
    files: [{ filename: '/index.js' }],
    lessons: [
      ['closures-and-hoisting', 'Closures & Hoisting', "Build a counter whose value can't be changed from outside, and fix the classic loop-closure bug."],
      ['this-call-apply-bind-and-prototypes', 'this, call/apply/bind & Prototypes', 'Fix a this that gets lost in callbacks, and share a method through a prototype.'],
      ['classes-and-oop', 'Classes & OOP', 'Model bank accounts with class, extends, static and private #fields.'],
      ['modern-syntax-and-es-modules', 'Modern Syntax & ES Modules', 'Rewrite older code using destructuring, ?. and ??, and import/export.'],
      ['callbacks-promises-and-the-event-loop', 'Callbacks, Promises & the Event Loop', 'Predict the order of console logs, and convert a callback-based API to Promises.'],
      ['async-await-and-fetch', 'Async/Await & Fetch', 'Load data from a mock API with loading and error states, including Promise.all.'],
      ['functional-patterns', 'Functional Patterns', 'Write your own debounce, throttle, pipe and curry helpers.'],
    ],
  },
  {
    phase: 6,
    phaseTitle: 'Phase 6: React',
    templateType: 'react',
    files: [{ filename: '/App.js' }],
    lessons: [
      ['components-and-jsx', 'Components & JSX', 'Split a static page into small, reusable components.'],
      ['props-and-composition', 'Props & Composition', 'Build Card and Button components configured with props and children.'],
      ['state-and-events', 'State & Events', 'Build a counter and a toggle, and update arrays and objects in state without changing the originals.'],
      ['lists-keys-and-conditional-rendering', 'Lists, Keys & Conditional Rendering', 'Build a filterable list with correct keys and an "empty list" message.'],
      ['controlled-forms', 'Controlled Forms', 'Build a sign-up form whose fields are controlled by React state, with validation.'],
      ['useeffect-and-the-component-lifecycle', 'useEffect & the Component Lifecycle', 'Build a timer that cleans up after itself, and load data when a component first appears.'],
      ['refs-and-performance', 'Refs & Performance', 'Focus an input with useRef, and speed up a slow list with useMemo, useCallback and memo.'],
      ['usereducer-and-context', 'useReducer & Context', 'Build a shopping cart with useReducer, and a theme every component can read via Context.'],
      ['custom-hooks', 'Custom Hooks', 'Write useLocalStorage and useFetch hooks.'],
      ['react-router', 'React Router', 'Build a multi-page app with a detail page that reads a URL parameter, plus a shared layout.'],
      ['redux-toolkit', 'Redux Toolkit', 'Move a to-do list into a Redux Toolkit slice, including loading data asynchronously.'],
    ],
    checkpoint: [
      'checkpoint-react',
      'Checkpoint C: Task Manager Pro in React',
      'Rebuild Task Manager Pro as a React app with components, state, routing and Redux Toolkit.',
      { files: [{ filename: '/App.js' }, { filename: '/styles.css' }], milestone: 'Task Manager Pro as a React app.' },
    ],
  },
  {
    phase: 7,
    phaseTitle: 'Phase 7: Node.js & Express',
    templateType: 'node',
    files: [{ filename: '/index.js' }],
    lessons: [
      ['node-fundamentals-and-modules', 'Node Fundamentals & Modules', 'Write a command-line script that reads arguments and uses its own module.'],
      ['file-system-and-paths', 'File System & Paths', 'Read, update and save a JSON file with fs/promises.'],
      ['events-and-streams', 'Events & Streams', 'Process a large text file line by line with a transform stream and pipe, never loading it all at once.'],
      ['http-servers-from-scratch', 'HTTP Servers from Scratch', 'Build a two-route server with the built-in http module and correct status codes.'],
      ['express-routing', 'Express Routing', 'Build CRUD routes that use URL parameters and query strings.'],
      ['middleware-and-error-handling', 'Middleware & Error Handling', 'Add a request logger, validation, and one central error handler.'],
      ['rest-api-design', 'REST API Design', 'Build a /tasks endpoint with pagination, filtering and sorting.'],
      ['authentication-hashing-and-jwt', 'Authentication: Hashing & JWT', 'Build register and login with hashed passwords and a protected route.'],
    ],
  },
  {
    phase: 8,
    phaseTitle: 'Phase 8: Databases',
    // SQL (sql.js) and MongoDB (mingo) practice runtimes are chosen when this phase is written
    templateType: 'node',
    files: [{ filename: '/index.js' }],
    lessons: [
      ['sql-fundamentals', 'SQL Fundamentals', 'Answer questions about a books table with SELECT, WHERE, ORDER BY and LIMIT.'],
      ['sql-joins-and-aggregates', 'SQL Joins & Aggregates', 'Write an "orders per customer" report using JOIN, GROUP BY and HAVING.'],
      ['data-modeling-sql-vs-nosql', 'Data Modeling: SQL vs NoSQL', "Design a blog's data both ways: as linked tables, and as embedded vs. referenced documents."],
      ['mongodb-crud-and-query-operators', 'MongoDB CRUD & Query Operators', 'Query a products collection with $gt, $in, $and, field selection and sorting.'],
      ['mongodb-aggregation-and-indexes', 'MongoDB Aggregation & Indexes', 'Build a sales report with $match, $group, $lookup and $unwind, and choose the right indexes.'],
      ['mongoose-schemas-and-validation', 'Mongoose Schemas & Validation', 'Write a schema with validators and custom error messages, then test sample documents against it.'],
    ],
    checkpoint: [
      'capstone-full-stack',
      'Capstone: Task Manager Pro Full Stack',
      'Connect your React app to your own Express API and MongoDB database, built on your own machine.',
      { milestone: 'The complete, full-stack Task Manager Pro.' },
    ],
  },
];

const lessonPath = (slug, ...parts) => new URL(`./lessons/${[slug, ...parts].join('/')}`, import.meta.url);
const readText = (url) => readFileSync(url, 'utf8').trim();

// Adds the Markdown and starter files for lessons that have been written
const withContent = (topic) => {
  // Set every field explicitly, so a sync also clears content from a lesson that was unpublished
  if (!existsSync(lessonPath(topic.slug, 'lesson.md'))) {
    return { ...topic, published: false, lessonContent: '', instructions: '' };
  }

  return {
    ...topic,
    published: true,
    lessonContent: readText(lessonPath(topic.slug, 'lesson.md')),
    instructions: readText(lessonPath(topic.slug, 'instructions.md')),
    files: topic.files.map((file) => ({ ...file, content: readFileSync(lessonPath(topic.slug, 'files', file.filename.slice(1)), 'utf8') })),
  };
};

const toTopic = (phase, lessonType) => ([slug, title, description, overrides = {}]) => ({
  slug,
  title,
  description,
  phase: phase.phase,
  phaseTitle: phase.phaseTitle,
  lessonType,
  templateType: phase.templateType,
  xpReward: lessonType === 'checkpoint' ? CHECKPOINT_XP : LESSON_XP,
  files: phase.files,
  ...overrides,
});

const curriculum = PHASES.flatMap((phase) => [
  ...phase.lessons.map(toTopic(phase, 'lesson')),
  ...(phase.checkpoint ? [toTopic(phase, 'checkpoint')(phase.checkpoint)] : []),
]).map((topic, index) => withContent({ ...topic, moduleOrder: index + 1 }));

export default curriculum;
