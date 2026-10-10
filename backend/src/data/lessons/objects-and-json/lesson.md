## Why does this matter?

Real-world things have lots of details. A user has a name, an age, an email and a list of skills; a product has a title, a price and a stock count. **Objects** keep all the details of one thing together, and **JSON** is how those objects travel between your app and a server.

## An ID card 🪪

An object is like an ID card: a set of **labels** and **values**.

```js
const user = {
  name: "Asha",
  age: 24,
  isStudent: true,
};
```

Each `label: value` pair is a **property**. The label is called the **key**.

## Reading properties

```js
user.name;       // "Asha"   (dot notation: the usual way)
user["age"];     // 24       (bracket notation)

const field = "name";
user[field];     // "Asha"   (brackets let you use a variable as the key)
```

## Changing, adding and deleting ✏️

```js
user.age = 25;            // change
user.city = "Chennai";    // add a new property
delete user.isStudent;    // remove a property
```

Even with `const`, you can change what's *inside* the object. `const` only stops you from replacing the whole object with a different one.

## Objects inside objects, arrays inside objects

Values can be anything, including arrays and other objects:

```js
const user = {
  name: "Asha",
  skills: ["HTML", "CSS"],
  address: { city: "Chennai", pin: "600001" },
};

user.skills[0];        // "HTML"
user.address.city;     // "Chennai"
user.skills.push("JavaScript");
```

## Methods: what the object can do 🛠️

A function stored on an object is called a **method**. Inside a method, `this` means "the object this method belongs to":

```js
const user = {
  name: "Asha",
  greet() {
    return "Hi, I'm " + this.name;
  },
};

user.greet();   // "Hi, I'm Asha"
```

(You'll learn exactly how `this` works in Phase 5.)

## Looking at all the keys 🔑

- `Object.keys(user)`: an array of the keys, like `["name", "age"]`
- `Object.values(user)`: an array of the values
- `Object.entries(user)`: an array of `[key, value]` pairs

## JSON: packing objects for shipping 📦

To send an object to a server, or save it, it has to become **text**. JSON (JavaScript Object Notation) is the standard shipping format:

```js
const text = JSON.stringify(user);   // object → text
// '{"name":"Asha","age":24}'

const back = JSON.parse(text);       // text → object
back.name;                           // "Asha"
```

JSON has strict packing rules:

- keys are always in **double quotes**
- no functions (methods are left out when you `stringify`)
- no trailing commas

`JSON.parse` + `JSON.stringify` also gives you a **deep copy**: a completely separate object.

## Remember ✅

- Objects group related data as `key: value` properties.
- Read with `obj.key` or `obj["key"]`; add, change or `delete` properties freely.
- Values can be arrays, other objects, or functions (methods, which use `this`).
- `JSON.stringify` turns objects into text; `JSON.parse` turns text back into objects.
