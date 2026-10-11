## Why does this matter?

MongoDB happily stores **anything**: a book with no title, a price of `"free"`, a genre of `"asdf"`. That flexibility turns into bugs fast. **Mongoose** is the most popular way to use MongoDB from Node: you describe what a valid document looks like (a **schema**), and Mongoose checks, cleans up and converts every document **before** it reaches the database. It's the guard at the filing cabinet: badly filled-in forms are handed back with a note saying exactly what's wrong.

## Schema → model → documents 📐

```js
const mongoose = require("mongoose");

// 1. The schema: the rules
const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

// 2. The model: a class for the "books" collection, built from the schema
const Book = mongoose.model("Book", bookSchema);   // "Book" → collection "books"

// 3. Documents: instances of the model
const book = new Book({ title: "Dune", price: 599 });
```

In a real app you'd then `await book.save()`, or use the model's methods: `await Book.find({ price: { $lt: 500 } })`, `await Book.create({...})`, `await Book.findByIdAndUpdate(id, {...})`. They're the MongoDB commands from Lesson 64, with your rules applied.

## Field options: the rules ✅

Write a field as an object to add rules to it:

```js
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  genre: { type: String, lowercase: true, enum: ["fiction", "history"] },
  price: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, default: true },
  tags: [String],                      // an array of strings
});
```

| Option | For | Does |
|---|---|---|
| `type` | all | `String`, `Number`, `Boolean`, `Date`, `[String]`, `mongoose.Schema.Types.ObjectId`… |
| `required` | all | Must be present |
| `default` | all | Value used when it's missing |
| `trim`, `lowercase`, `uppercase` | String | **Cleans up** the value before saving |
| `minlength`, `maxlength` | String | Length limits |
| `match` | String | Must match a regular expression |
| `enum` | String | Must be one of a list |
| `min`, `max` | Number, Date | Value limits |
| `validate` | all | Your own check (see below) |

## Your own error messages 💬

Every rule can carry the message the user will see, with an **array** `[rule, message]`:

```js
title: { type: String, required: [true, "A book needs a title"] },
price: { type: Number, min: [0, "Price can't be negative"] },
isbn:  { type: String, match: [/^\d{13}$/, "ISBN must be exactly 13 digits"] },
```

For `enum`, use an object, where `{VALUE}` is replaced by the value that was rejected:

```js
genre: { type: String, enum: { values: ["fiction", "history"], message: "{VALUE} is not a genre we stock" } },
```

## Custom validators 🛠️

When no built-in rule fits, write a function that returns `true` (valid) or `false`:

```js
pages: {
  type: Number,
  validate: {
    validator: (value) => Number.isInteger(value),
    message: "Pages must be a whole number",
  },
},
```

## Casting and cleaning: Mongoose fixes what it can 🧽

Before checking the rules, Mongoose **converts** values to the schema's types when it can: `"299"` becomes the number `299`, but `"free"` can't, so it's an error. Then `trim`, `lowercase` and `default` tidy things up. And any field that **isn't** in the schema is simply dropped (that's **strict mode**), so a typo or an attacker can't sneak extra fields in.

## Checking a document 🔍

`save()` validates automatically. You can also validate without saving:

```js
const book = new Book({ title: "", price: -5 });
const error = book.validateSync();       // undefined when everything is valid

if (error) {
  for (const [field, problem] of Object.entries(error.errors)) {
    console.log(`${field}: ${problem.message}`);
  }
}
// title: A book needs a title
// price: Price can't be negative
```

Every failing field is reported at once, which is exactly what a form needs to show all its errors. In an Express app, your error handler turns this `ValidationError` into a `400 Bad Request` (you'll see it in the Capstone).

> 💡 A schema can't do everything: "this email is already taken" needs the database. Use `unique: true` (it creates a unique **index**) and handle the duplicate error, as the Capstone does.

## Remember ✅

- Schema (the rules) → model (`mongoose.model("Book", schema)`) → documents (`new Book({...})`).
- Field options: `type`, `required`, `default`, `trim`/`lowercase`, `min`/`max`, `minlength`/`maxlength`, `match`, `enum`.
- Custom messages: `[rule, "message"]`; for `enum`: `{ values, message }` with `{VALUE}`.
- `validate: { validator, message }` for your own rules.
- Mongoose casts types, cleans values, applies defaults and drops unknown fields; `validateSync()` / `save()` report every problem at once.
