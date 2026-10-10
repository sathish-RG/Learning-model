## Your mission: add tasks in React

Your task list now lives in React state. Let's let users add their own tasks.

1. **Remember what's typed.** Create state for the input: `const [title, setTitle] = useState('');`
2. **Add a text box.** Put an `<input>` above the list with `value={title}` and `onChange={(e) => setTitle(e.target.value)}`.
3. **Add the task.** Add a button that, when clicked, calls `setTasks([...tasks, title])` and then clears the box with `setTitle('')`.

**Bonus:** don't add empty titles. You wrote this check in Core JavaScript!

✅ **You're done when** you can type a task, click the button, and see it appear in the list.
