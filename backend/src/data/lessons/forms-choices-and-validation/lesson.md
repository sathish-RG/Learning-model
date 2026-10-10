## Why does this matter?

Many questions have a fixed set of answers: a size, a country, "yes or no". Letting people *pick* instead of type is faster and avoids typos. And checking answers **before** the form is sent saves everyone frustration: no more "your form had errors" after waiting for the server.

## A multiple-choice exam ✏️

HTML has a control for every kind of question:

- **Radio buttons**: pick **exactly one**. They're named after old car radios: pressing one station button pops the others back out!
- **Checkboxes**: tick **all that apply**.
- **Select (dropdown)**: pick one from a long list, like a restaurant menu.
- **Textarea**: a big box for longer answers, like "Any comments?"

## Radio buttons: same name, one answer 📻

Radio buttons that share the **same `name`** form one group, and only one can be chosen. `value` is what gets sent:

```html
<p>How was the course?</p>
<input type="radio" id="great" name="rating" value="great" />
<label for="great">Great</label>
<input type="radio" id="okay" name="rating" value="okay" />
<label for="okay">Okay</label>
```

Add `checked` to an option to choose it by default.

## Checkboxes: tick all that apply ☑️

```html
<input type="checkbox" id="html" name="topics" value="html" />
<label for="html">HTML</label>
<input type="checkbox" id="css" name="topics" value="css" />
<label for="css">CSS</label>
```

## Select: the dropdown menu 🍽️

```html
<label for="lesson">Favourite lesson</label>
<select id="lesson" name="lesson">
  <option value="">Choose one…</option>
  <option value="tables">Tables</option>
  <option value="forms">Forms</option>
</select>
```

The first option, with an empty `value`, works as a "please choose" prompt.

## Textarea: room to write

```html
<label for="comments">Anything else?</label>
<textarea id="comments" name="comments" rows="4"></textarea>
```

Unlike `<input>`, a `<textarea>` **has a closing tag**. `rows` sets how many lines tall it is.

## Grouping questions: fieldset and legend 📦

`<fieldset>` draws a box around related questions, and `<legend>` gives that box a title. It's ideal for radio groups, because screen readers read the legend as the question:

```html
<fieldset>
  <legend>How was the course?</legend>
  <!-- radio buttons here -->
</fieldset>
```

## Built-in checks: the browser as a helpful receptionist ✅

Add rules as attributes, and the browser checks them when someone clicks submit. If a rule fails, it **stops the form** and shows a message, with no extra code needed:

| Attribute | Rule |
|---|---|
| `required` | Can't be left empty |
| `minlength="2"` / `maxlength="300"` | At least / at most this many characters |
| `min="13"` / `max="120"` | Smallest / largest number or date |
| `type="email"` | Must look like an email address |
| `pattern="[0-9]{6}"` | Must match a pattern (here: exactly 6 digits) |

```html
<label for="pin">PIN code</label>
<input id="pin" name="pin" required pattern="[0-9]{6}" title="6 digits, e.g. 600001" />
```

**About patterns:** `[0-9]` means "any digit" and `{6}` means "exactly 6 of them". The `title` text is shown in the error message, so explain the rule there.

For radio buttons, putting `required` on any one radio makes the whole group required.

**Important:** these browser checks are for the user's *convenience*. Anyone can get around them, so a real server must always check the data again (you'll do this in Phase 7).

## Remember ✅

- Radios: pick one (same `name`). Checkboxes: pick any. `<select>`: a dropdown. `<textarea>`: long text.
- `value` is what gets sent; `checked` chooses an option by default.
- `<fieldset>` + `<legend>` group related questions under a title.
- `required`, `minlength`, `min`/`max` and `pattern` let the browser check answers before sending.
