import { existsSync, readFileSync } from 'node:fs';

// The "Zero to Pro" course: source of truth for the Topic collection (synced by src/seed.js).
// 8 phases, 62 lessons and 4 Task Manager Pro checkpoints, in strict learning order.
// Each lesson teaches and practices ONE thing; concepts are only combined at checkpoints.
//
// Content lives in one folder per lesson:
//   lessons/<slug>/lesson.md         the "Learn" step (beginner-friendly Markdown)
//   lessons/<slug>/instructions.md   the "Practice" mission
//   lessons/<slug>/files/<path>      starter code for each practice file, e.g. files/index.html
//                                    (unless the file spec gives its content inline)
//
// A lesson is published as soon as its lesson.md exists; until then it shows as "coming soon".
// Each phase sets the Sandpack template, the files a lesson gets and its output panel
// ('preview', 'console' or 'both'); lessons can override any of them.

const LESSON_XP = 20;

// React lessons: a hidden entry that renders App.jsx and loads the lesson's locked styles.css.
// No <StrictMode>: it mounts components twice in development, which would make the effect
// lessons log "mounted, cleaned up, mounted" and confuse beginners (the lesson explains it).
const REACT_ENTRY = {
  filename: '/index.js',
  hidden: true,
  content:
    'import { createRoot } from "react-dom/client";\nimport "./styles.css";\nimport App from "./App.jsx";\n\ncreateRoot(document.getElementById("root")).render(<App />);\n',
};
const REACT_STYLES = { filename: '/styles.css', readOnly: true };
// Extra files: a path string for an editable file, or a full spec, e.g. { filename, readOnly: true }
const reactFiles = (...files) => [
  REACT_ENTRY,
  { filename: '/App.jsx' },
  ...files.map((file) => (typeof file === 'string' ? { filename: file } : file)),
  REACT_STYLES,
];
const locked = (filename) => ({ filename, readOnly: true });

// A hidden page that runs index.js as a native ES module: the browser itself executes the
// code, so modern syntax (?. ?? #private, top-level await) and import/export all just work
const MODULE_PAGE = {
  filename: '/index.html',
  hidden: true,
  content:
    '<!DOCTYPE html>\n<html lang="en">\n  <head><meta charset="UTF-8" /></head>\n  <body>\n    <script type="module" src="./index.js"></script>\n  </body>\n</html>\n',
};
const CHECKPOINT_XP = 100;

// Node lessons. Sandpack's Node sandbox always starts /index.js, so a hidden runner
// (shared/runner.js) starts the lesson's own file, checks it for typos first and keeps the
// sandbox alive so edits can restart it. Server lessons also get a locked test drive
// (requests.js) that calls the learner's API through a hidden HTTP client (shared/api-client.js),
// because the preview can only send requests without a body.
const readShared = (name) => readFileSync(new URL(`./shared/${name}`, import.meta.url), 'utf8');
const NODE_RUNNER = readShared('runner.js');
const API_CLIENT = { filename: '/api-client.js', readOnly: true, hidden: true, content: readShared('api-client.js') };
// `entry` is run as `node <entry> <args>`; `files` are extra file paths or full specs
const nodeFiles = ({ entry = '/server.js', args = [], files = [], server = true } = {}) => {
  const specs = [{ filename: entry }, ...files.map((file) => (typeof file === 'string' ? { filename: file } : file))];
  const check = specs.filter((f) => !f.readOnly && f.filename.endsWith('.js')).map((f) => f.filename.slice(1));
  const config = JSON.stringify({ entry: entry.slice(1), check, args, server });
  return [
    { filename: '/index.js', hidden: true, content: `const CONFIG = ${config};\n\n${NODE_RUNNER}` },
    ...specs,
    ...(server ? [locked('/requests.js'), API_CLIENT] : []),
  ];
};

const PHASES = [
  {
    phase: 1,
    phaseTitle: 'Phase 1: HTML',
    templateType: 'static',
    files: [{ filename: '/index.html' }],
    lessons: [
      ['your-first-web-page', 'Your First Web Page', 'Write a valid page skeleton (doctype, html, head, title, body) with one heading and one paragraph.',
        { subtopics: ['Tags & elements', 'Page skeleton', 'head vs body', 'Nesting', 'Comments'] }],
      ['text-and-headings', 'Text & Headings', 'Mark up a short article with a correct h1–h3 order, paragraphs, strong/em and a blockquote.',
        { subtopics: ['h1–h6', 'Paragraphs & whitespace', 'strong & em', 'Quotes', 'Entities'] }],
      ['links-and-lists', 'Links & Lists', 'Build a site menu (a list of links) and a numbered recipe with a nested ingredients list.',
        { subtopics: ['Links & href', 'Absolute vs relative URLs', 'Jump links', 'ul, ol & li', 'Nested & description lists'] }],
      ['images-and-media', 'Images & Media', 'Build a captioned photo gallery with meaningful alt text, plus an embedded video.',
        { subtopics: ['img & src', 'alt text', 'width & height', 'figure & figcaption', 'video & audio'] }],
      ['html-tables', 'Tables', 'Build an accessible weekly timetable with a header row, th scope and one merged cell.',
        { subtopics: ['tr, td & th', 'caption', 'thead, tbody & tfoot', 'scope', 'colspan & rowspan'] }],
      ['forms-inputs-and-labels', 'Forms I: Inputs & Labels', 'Build a sign-up form where every input (text, email, password, date) has a linked label.',
        { subtopics: ['form & button', 'Labels', 'Input types', 'name', 'autocomplete'] }],
      ['forms-choices-and-validation', 'Forms II: Choices & Validation', 'Build a survey with a dropdown, radio groups, checkboxes and a textarea, using built-in validation.',
        { subtopics: ['Radio buttons', 'Checkboxes', 'select & textarea', 'fieldset & legend', 'Built-in validation'] }],
      ['semantic-html-and-accessibility', 'Semantic HTML & Accessibility', 'Turn a page of plain divs into proper header, nav, main, article, aside and footer sections.',
        { subtopics: ['Landmarks', 'article vs section', 'time & address', 'Real buttons', 'Accessibility checklist'] }],
    ],
    // HTML only: the first time every Phase 1 skill is combined
    checkpoint: [
      'checkpoint-task-manager-html',
      'Checkpoint A: Task Manager Pro in HTML',
      'Combine everything from Lessons 1–8 to build the complete structure of Task Manager Pro.',
      {
        milestone: 'The complete HTML structure of Task Manager Pro: header and menu, task list, add-task form, stats table and footer.',
        subtopics: ['Planning a page', 'Landmarks', 'Lists & links', 'Forms & validation', 'Tables', 'Accessibility check'],
      },
    ],
  },
  {
    phase: 2,
    phaseTitle: 'Phase 2: CSS',
    templateType: 'static',
    // Isolation: the HTML is given and locked; learners only write CSS
    files: [{ filename: '/index.html', readOnly: true }, { filename: '/styles.css' }],
    lessons: [
      ['selectors-cascade-and-specificity', 'Selectors, Cascade & Specificity', 'Style a given page using element, class and id selectors, and fix a rule that loses to a more specific one.',
        { subtopics: ['Rules: selector, property, value', 'Element, class & id selectors', 'Grouping & descendants', 'The cascade', 'Specificity & inheritance'] }],
      ['colors-units-and-typography', 'Colors, Units & Typography', 'Apply a given color palette and type scale using rem, hsl() and font properties.',
        { subtopics: ['Hex, rgb() & hsl()', 'Contrast', 'px, rem & em', 'Font families & weights', 'line-height & letter-spacing'] }],
      ['the-box-model', 'The Box Model', 'Make three cards match target sizes exactly, using padding, border, margin and box-sizing.',
        { subtopics: ['Content, padding, border, margin', 'box-sizing: border-box', 'Shorthands', 'border-radius', 'Centering with margin: auto'] }],
      ['display-and-positioning', 'Display & Positioning', "Pin a badge to a card's corner and make the header stick to the top while scrolling.",
        { subtopics: ['block, inline & inline-block', 'display: none', 'relative & absolute', 'fixed & sticky', 'z-index'] }],
      ['flexbox-in-depth', 'Flexbox in Depth', 'Build a navbar and a centered hero section using only Flexbox.',
        { subtopics: ['Flex container & items', 'Main & cross axis', 'justify-content & align-items', 'gap & flex-wrap', 'flex: 1'] }],
      ['css-grid-in-depth', 'CSS Grid in Depth', 'Build a full page layout with named grid areas, plus a card grid that adjusts its columns automatically.',
        { subtopics: ['grid-template-columns', 'The fr unit', 'grid-template-areas', 'auto-fit & minmax()', 'Spanning cells'] }],
      ['responsive-design', 'Responsive Design', 'Make a given layout adapt at three screen sizes, mobile first, using media queries and clamp().',
        { subtopics: ['The viewport tag', 'Mobile first', 'Media queries', 'Fluid images', 'clamp()'] }],
      ['css-variables-and-pseudo-classes', 'Variables & Pseudo-classes', 'Build a light/dark theme with CSS variables, and style :focus-visible, :invalid and ::before states.',
        { subtopics: ['Custom properties', 'Themes & :has()', ':hover & :focus-visible', ':invalid & :nth-child()', '::before & ::after'] }],
      ['transitions-transforms-and-animations', 'Transitions, Transforms & Animations', 'Add smooth hover effects to buttons and build a loading spinner with a keyframe animation.',
        { subtopics: ['transform', 'transition', '@keyframes', 'animation', 'prefers-reduced-motion'] }],
      // Tailwind is written as classes in the HTML, so here the HTML is the editable file
      ['tailwind-css', 'Tailwind CSS', 'Style a profile card using only Tailwind classes, with no CSS file.',
        { files: [{ filename: '/index.html' }], subtopics: ['Utility classes', 'Spacing & color scales', 'Flexbox utilities', 'hover: & md: prefixes'] }],
    ],
    // CSS only: the Checkpoint A page arrives locked; the whole design is written in styles.css
    checkpoint: [
      'checkpoint-style-task-manager',
      'Checkpoint A2: Style Task Manager Pro',
      'Turn the locked Task Manager Pro HTML into a modern, responsive app using only CSS.',
      {
        milestone: 'A modern, responsive Task Manager Pro design: sticky header, card layout, styled form and table, and a sidebar on wide screens.',
        subtopics: ['Variables & foundations', 'Grid page layout', 'Flexbox components', 'Responsive breakpoints', 'Focus & hover states'],
      },
    ],
  },
  {
    phase: 3,
    phaseTitle: 'Phase 3: JavaScript Fundamentals',
    templateType: 'vanilla',
    // Pure JavaScript, no web page yet: results appear in the console
    output: 'console',
    files: [{ filename: '/index.js' }],
    lessons: [
      ['variables-types-and-operators', 'Variables, Types & Operators', 'Calculate and print values, and fix bugs caused by automatic type conversion.',
        { subtopics: ['console.log', 'const & let', 'Data types & typeof', 'Arithmetic operators', '=== vs =='] }],
      ['conditionals', 'Conditionals', 'Write a grade calculator using if/else, switch and the ? : shorthand.',
        { subtopics: ['if / else if / else', 'Truthy & falsy', 'The ternary operator', 'switch', 'Combining conditions'] }],
      ['loops', 'Loops', 'Solve FizzBuzz and running totals using for, while and for...of.',
        { subtopics: ['for loops', 'Running totals', 'while loops', 'for...of', 'break & continue'] }],
      ['functions-and-scope', 'Functions & Scope', 'Write small, reusable functions using default parameters, arrow functions and return.',
        { subtopics: ['Parameters & arguments', 'return', 'Default parameters', 'Arrow functions', 'Scope'] }],
      ['arrays-and-array-methods', 'Arrays & Array Methods', 'Transform a dataset with map, filter, reduce, find and sort.',
        { subtopics: ['Indexes & length', 'push, pop, shift, unshift', 'map & filter', 'find & reduce', 'Sorting numbers'] }],
      ['objects-and-json', 'Objects & JSON', 'Model a user profile as an object, then convert it to JSON text and back.',
        { subtopics: ['Properties', 'Dot & bracket notation', 'Nested data', 'Methods & this', 'JSON.stringify & parse'] }],
      ['strings-numbers-and-dates', 'Strings, Numbers & Dates', 'Format a shopping receipt using template strings, Math and Intl.',
        { subtopics: ['String methods', 'Template literals', 'Decimal surprises', 'Math', 'Intl & dates'] }],
      ['errors-and-debugging', 'Errors & Debugging', 'Make a fragile parser fail gracefully with try/catch and custom errors.',
        { subtopics: ['Error types', 'try / catch / finally', 'throw', 'Custom error names', 'Debugging tools'] }],
    ],
  },
  {
    phase: 4,
    phaseTitle: 'Phase 4: JavaScript in the Browser',
    templateType: 'vanilla',
    // DOM lessons change the page and log to the console, so show both
    output: 'both',
    // The page (HTML + CSS) is given and locked; learners only write the JavaScript, in app.js.
    // This runtime ignores <style> in index.html's <head>, so a hidden entry file loads the CSS
    // and then the learner's code.
    files: [
      { filename: '/index.html', readOnly: true },
      { filename: '/styles.css', readOnly: true },
      { filename: '/app.js' },
      { filename: '/index.js', hidden: true, content: 'import "./styles.css";\nimport "./app.js";\n' },
    ],
    lessons: [
      ['dom-selecting-and-changing', 'The DOM: Selecting & Changing Elements', 'Show a list on the page from an array, using createElement and classList.',
        { subtopics: ['The DOM tree', 'querySelector & querySelectorAll', 'textContent', 'classList', 'createElement & append'] }],
      ['events-and-delegation', 'Events & Event Delegation', 'Make a list where items can be removed, using a single click listener on the parent.',
        { subtopics: ['addEventListener', 'Common events', 'The event object', 'Bubbling', 'Event delegation'] }],
      ['forms-with-javascript', 'Forms with JavaScript', 'Validate a sign-up form with your own error messages, and stop it submitting when invalid.',
        { subtopics: ['The submit event', 'preventDefault', 'Reading values', 'Custom validation', 'Accessible errors'] }],
      ['storage-and-timers', 'Storage & Timers', 'Build a stopwatch whose laps are kept in localStorage.',
        { subtopics: ['setTimeout', 'setInterval & clearInterval', 'Measuring time', 'localStorage', 'Saving JSON'] }],
    ],
    checkpoint: [
      'checkpoint-vanilla-js',
      'Checkpoint B: Task Manager Pro in JavaScript',
      'Make Task Manager Pro work in plain JavaScript: show, add, complete and save tasks.',
      {
        milestone: 'A working Task Manager Pro in plain JavaScript that remembers tasks between visits.',
        subtopics: ['One source of truth', 'The render pattern', 'Form handling', 'Event delegation', 'localStorage'],
      },
    ],
  },
  {
    phase: 5,
    phaseTitle: 'Phase 5: Advanced JavaScript',
    // The static runtime + a module script, not the plain-JS runtime: its older compiler
    // can't parse ?. or ??, which this phase teaches
    templateType: 'static',
    output: 'console',
    files: [MODULE_PAGE, { filename: '/index.js' }],
    lessons: [
      ['closures-and-hoisting', 'Closures & Hoisting', "Build a counter whose value can't be changed from outside, and fix the classic loop-closure bug.",
        { subtopics: ['Closures', 'Private data', 'Function factories', 'var vs let in loops', 'Hoisting & the TDZ'] }],
      ['this-call-apply-bind-and-prototypes', 'this, call/apply/bind & Prototypes', 'Fix a this that gets lost in callbacks, and share a method through a prototype.',
        { subtopics: ['What this means', 'Losing this', 'bind', 'call & apply', 'Prototypes & the chain'] }],
      ['classes-and-oop', 'Classes & OOP', 'Model bank accounts with class, extends, static and private #fields.',
        { subtopics: ['class & constructor', 'Private #fields & getters', 'extends & super', 'Overriding', 'static'] }],
      ['modern-syntax-and-es-modules', 'Modern Syntax & ES Modules', 'Rewrite older code using destructuring, ?. and ??, and import/export.',
        { files: [MODULE_PAGE, { filename: '/index.js' }, { filename: '/utils.js' }], subtopics: ['Destructuring', 'Spread & rest', 'Optional chaining ?.', 'Nullish coalescing ??', 'import & export'] }],
      ['callbacks-promises-and-the-event-loop', 'Callbacks, Promises & the Event Loop', 'Predict the order of console logs, and convert a callback-based API to Promises.',
        { subtopics: ['The event loop', 'Microtasks vs tasks', 'Callbacks', 'Promises', 'Promisifying & chaining'] }],
      ['async-await-and-fetch', 'Async/Await & Fetch', 'Load data from a mock API with loading and error states, including Promise.all.',
        {
          // Real fetch requests to JSON files served next to the page, shown with the page + console
          output: 'both',
          files: [
            { filename: '/index.html', readOnly: true },
            { filename: '/styles.css', readOnly: true },
            { filename: '/data/tasks.json', readOnly: true },
            { filename: '/data/users.json', readOnly: true },
            { filename: '/app.js' },
          ],
          subtopics: ['async & await', 'fetch & response.ok', 'Loading & error states', 'try / catch / finally', 'Promise.all'],
        }],
      ['functional-patterns', 'Functional Patterns', 'Write your own debounce, throttle, pipe and curry helpers.',
        { subtopics: ['Higher-order functions', 'Immutability', 'pipe', 'curry', 'debounce & throttle'] }],
    ],
  },
  {
    phase: 6,
    phaseTitle: 'Phase 6: React',
    templateType: 'react',
    // The rendered app plus a console, for the logs in the effect and performance lessons
    output: 'both',
    files: reactFiles(),
    lessons: [
      ['components-and-jsx', 'Components & JSX', 'Split a static page into small, reusable components.',
        { files: reactFiles('/Header.jsx', '/TaskList.jsx', '/Footer.jsx'), subtopics: ['Components', 'JSX rules', 'Expressions in { }', 'Fragments', 'Import & export'] }],
      ['props-and-composition', 'Props & Composition', 'Build Card and Button components configured with props and children.',
        { files: reactFiles('/Button.jsx', '/Card.jsx'), subtopics: ['Props', 'Destructuring & defaults', 'children', 'Function props', 'One-way data flow'] }],
      ['state-and-events', 'State & Events', 'Build a counter and a toggle, and update arrays and objects in state without changing the originals.',
        { subtopics: ['useState', 'Event handlers', 'Updater functions', 'Immutable arrays', 'Immutable objects'] }],
      ['lists-keys-and-conditional-rendering', 'Lists, Keys & Conditional Rendering', 'Build a filterable list with correct keys and an "empty list" message.',
        { subtopics: ['Rendering lists with map', 'Keys', 'Derived data', '&& and ternaries', 'Empty states'] }],
      ['controlled-forms', 'Controlled Forms', 'Build a sign-up form whose fields are controlled by React state, with validation.',
        { subtopics: ['Controlled inputs', 'Checkboxes & selects', 'One state object', 'onSubmit', 'Validation from state'] }],
      ['useeffect-and-the-component-lifecycle', 'useEffect & the Component Lifecycle', 'Build a timer that cleans up after itself, and load data when a component first appears.',
        { files: reactFiles('/Timer.jsx', locked('/api.js')), subtopics: ['Side effects', 'Dependency arrays', 'Cleanup', 'Loading data', 'StrictMode'] }],
      ['refs-and-performance', 'Refs & Performance', 'Focus an input with useRef, and speed up a slow list with useMemo, useCallback and memo.',
        { files: reactFiles(locked('/SlowList.jsx')), subtopics: ['useRef & the DOM', 'Values without re-rendering', 'Why re-renders happen', 'useMemo', 'memo & useCallback'] }],
      ['usereducer-and-context', 'useReducer & Context', 'Build a shopping cart with useReducer, and a theme every component can read via Context.',
        { files: reactFiles('/ThemeContext.jsx', '/Toolbar.jsx', '/cartReducer.js', locked('/Header.jsx')), subtopics: ['Prop drilling', 'createContext & Provider', 'useContext', 'useReducer', 'Actions & pure reducers'] }],
      ['custom-hooks', 'Custom Hooks', 'Write useLocalStorage and useFetch hooks.',
        { files: reactFiles('/hooks/useLocalStorage.js', '/hooks/useFetch.js', locked('/api.js')), subtopics: ['Custom hooks', 'Rules of hooks', 'Lazy initial state', 'useLocalStorage', 'useFetch'] }],
      ['react-router', 'React Router', 'Build a multi-page app with a detail page that reads a URL parameter, plus a shared layout.',
        {
          files: reactFiles('/Layout.jsx', '/pages/Tasks.jsx', '/pages/TaskDetail.jsx', locked('/pages/Home.jsx'), locked('/data.js')),
          dependencies: { 'react-router-dom': '^6.26.2' },
          subtopics: ['Routes & Route', 'Link & NavLink', 'URL parameters', 'Layouts & Outlet', 'useNavigate'],
        }],
      ['redux-toolkit', 'Redux Toolkit', 'Move a to-do list into a Redux Toolkit slice, including loading data asynchronously.',
        {
          files: reactFiles('/store.js', '/tasksSlice.js', locked('/api.js')),
          dependencies: { '@reduxjs/toolkit': '^2.2.7', 'react-redux': '^9.1.2' },
          subtopics: ['Store, slices & actions', 'createSlice & Immer', 'Provider', 'useSelector & useDispatch', 'createAsyncThunk'],
        }],
    ],
    checkpoint: [
      'checkpoint-react',
      'Checkpoint C: Task Manager Pro in React',
      'Rebuild Task Manager Pro as a React app: wire up state, props and persistence across its components.',
      {
        files: reactFiles('/components/TaskForm.jsx', '/components/TaskList.jsx', '/components/TaskItem.jsx', '/components/FilterBar.jsx'),
        milestone: 'Task Manager Pro as a React app: components, state, props and persistence.',
        subtopics: ['Lifting state up', 'Data down, actions up', 'Derived state', 'Controlled forms', 'Effects for storage'],
      },
    ],
  },
  {
    phase: 7,
    phaseTitle: 'Phase 7: Node.js & Express',
    templateType: 'node',
    // The server's own page (a mini-browser with an address bar) plus its logs
    output: 'both',
    files: nodeFiles(),
    lessons: [
      // Scripts with no server: there is no page to show, only the console
      ['node-fundamentals-and-modules', 'Node Fundamentals & Modules', 'Write a command-line tip calculator that reads its arguments and uses your own module.',
        {
          output: 'console',
          files: nodeFiles({ entry: '/app.js', args: ['1200', '15'], files: ['/tip.js'], server: false }),
          subtopics: ['What Node is', 'Browser vs Node globals', 'require & module.exports', 'Built-in, local & npm modules', 'process.argv & exit codes'],
        }],
      ['file-system-and-paths', 'File System & Paths', 'Load a JSON file of tasks, change it, and save a copy with fs/promises.',
        {
          output: 'console',
          files: nodeFiles({ entry: '/app.js', files: [locked('/tasks.json')], server: false }),
          subtopics: ['fs/promises', 'path.join & __dirname', 'Reading & parsing JSON', 'Writing files & folders', 'Handling ENOENT'],
        }],
      ['events-and-streams', 'Events & Streams', 'Find the errors in a 5,000-line log as it streams in, chunk by chunk, with a transform stream and pipeline.',
        {
          output: 'console',
          files: nodeFiles({ entry: '/app.js', files: [locked('/log-source.js')], server: false }),
          subtopics: ['EventEmitter', 'Why streams', 'Readable, Writable & Transform', 'Lines across chunks', 'pipeline'],
        }],
      ['http-servers-from-scratch', 'HTTP Servers from Scratch', "Build a restaurant's menu and orders API with only the built-in http module, with correct status codes and headers.",
        { subtopics: ['Requests & responses', 'Methods & URLs', 'Status codes', 'Headers & Content-Type', 'Reading a request body'] }],
      ['express-routing', 'Express Routing', 'Rebuild the menu API in Express, with URL parameters, query strings and routes in the right order.',
        {
          files: nodeFiles({ files: [locked('/menu.js'), locked('/public/index.html')] }),
          subtopics: ['Why Express', 'app.get & res.json', 'URL parameters', 'Query strings', 'Route order'],
        }],
      ['middleware-and-error-handling', 'Middleware & Error Handling', 'Add a request logger, a validation check and one central error handler to an orders API.',
        { subtopics: ['(req, res, next)', 'Global vs route middleware', 'Validation', '404 handler', 'Central error handler'] }],
      ['rest-api-design', 'REST API Design', 'Build a complete /api/tasks API: all five CRUD routes, the right status codes, plus filtering, sorting and pagination.',
        {
          files: nodeFiles({ files: [locked('/public/index.html')] }),
          subtopics: ['Resources & URLs', 'CRUD verbs', 'PUT vs PATCH', 'Status codes & Location', 'Filter, sort & paginate'],
        }],
      ['authentication-hashing-and-jwt', 'Authentication: Hashing & JWT', 'Build register and login with bcrypt-hashed passwords, and protect a route with a signed token.',
        {
          files: nodeFiles({ files: [locked('/jwt.js')] }),
          dependencies: { bcryptjs: '^2.4.3' },
          subtopics: ['Authentication vs authorization', 'Hashing with bcrypt', 'JWT: header, payload, signature', 'Bearer tokens', 'Protecting routes'],
        }],
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
    files: topic.files.map((file) => ({
      ...file,
      content: file.content ?? readFileSync(lessonPath(topic.slug, 'files', file.filename.slice(1)), 'utf8'),
    })),
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
  output: phase.output ?? 'preview',
  dependencies: {}, // set explicitly, so a sync also clears packages a lesson no longer needs
  xpReward: lessonType === 'checkpoint' ? CHECKPOINT_XP : LESSON_XP,
  files: phase.files,
  ...overrides,
});

const curriculum = PHASES.flatMap((phase) => [
  ...phase.lessons.map(toTopic(phase, 'lesson')),
  ...(phase.checkpoint ? [toTopic(phase, 'checkpoint')(phase.checkpoint)] : []),
]).map((topic, index) => withContent({ ...topic, moduleOrder: index + 1 }));

export default curriculum;
