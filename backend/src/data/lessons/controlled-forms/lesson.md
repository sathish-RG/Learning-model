## Why does this matter?

Sign-up forms, search boxes, settings pages, checkout: forms are everywhere. In React, you make **React the single source of truth** for what's typed, so you can validate as people type, enable or disable buttons, and reset everything with one line.

## Controlled inputs: React holds the pen ✒️

A **controlled input** shows whatever is in state, and every keystroke updates that state:

```jsx
const [email, setEmail] = useState("");

<input value={email} onChange={(event) => setEmail(event.target.value)} />
```

The loop goes: you type → `onChange` → `setEmail` → re-render → the input shows the new `email`. React holds the pen; the input just displays what React wrote.

If you set `value` but forget `onChange`, the input becomes **read-only**: React keeps showing the old value. (React warns you about this in the console.)

## Checkboxes, selects and textareas ☑️

```jsx
<input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
<select value={plan} onChange={(e) => setPlan(e.target.value)}>...</select>
<textarea value={bio} onChange={(e) => setBio(e.target.value)} />
```

Checkboxes use `checked` and `e.target.checked`; everything else uses `value`.

## One state object for the whole form 🗂️

With many fields, one object and one change handler keeps things tidy. Give each input a `name` that matches its key:

```jsx
const [form, setForm] = useState({ name: "", email: "" });

const handleChange = (event) => {
  const { name, value } = event.target;
  setForm({ ...form, [name]: value });   // [name] means "the key stored in name"
};

<input name="email" value={form.email} onChange={handleChange} />
```

## Submitting 📮

Just like in Phase 4, listen on the **form**, and stop the page from reloading:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  // validate, then send or save
};

<form onSubmit={handleSubmit}>...</form>
```

## Validation, calculated from state ✅

Because React always knows the current values, you can work out errors **during render**, so you don't need extra state:

```jsx
const errors = {};
if (form.name.trim().length < 2) errors.name = "Please enter your name";
if (!form.email.includes("@")) errors.email = "Please enter a valid email";
const isValid = Object.keys(errors).length === 0;
```

Then show the messages, and disable the button until the form is valid: `<button disabled={!isValid}>`.

A nice touch: only show an error once the user has **tried to submit** (store a `submitted` boolean), so they aren't scolded before they've even started typing.

## Remember ✅

- Controlled input = `value` from state + `onChange` that updates state.
- Checkboxes use `checked`; one object plus `[name]` handles many fields.
- `onSubmit` on the form, with `event.preventDefault()`.
- Calculate errors from state during render, and reset by setting state back to the start.
