## Why does this matter?

`this` confuses more JavaScript developers than almost anything else, and interviewers know it. Understanding it (and prototypes, the system underneath every object) makes classes, React class components and many bugs make sense.

## this: the word "me" 🙋

The word "me" means a different person depending on **who is speaking**. `this` works the same way: it means **whatever object called the function**, which is usually the object before the dot.

```js
const player = {
  name: "Asha",
  score: 0,
  addPoint() {
    this.score++;          // "my score"
    return this.score;
  },
};

player.addPoint();   // `this` is player, because player is before the dot
```

## Losing this: handing someone your script 📜

Imagine handing a friend a script that says "I am the captain". When *they* read it, "I" now means them. Take a method away from its object, and `this` is lost the same way:

```js
const add = player.addPoint;
add();   // ❌ TypeError: there's no object before the dot, so `this` is undefined
```

This happens most often with **callbacks**:

```js
setTimeout(player.addPoint, 100);   // ❌ the timer calls it without `player.`
```

### Fix 1: an arrow function wrapper

Arrow functions don't have their own `this`. They use the `this` of the code around them, like an echo. Wrapping the call keeps `player` before the dot:

```js
setTimeout(() => player.addPoint(), 100);   // ✅
```

### Fix 2: bind, a permanent name tag 🏷️

`bind` creates a copy of the function with `this` **permanently stuck** to an object:

```js
const boundAdd = player.addPoint.bind(player);
boundAdd();   // ✅ always uses player
```

## call and apply: borrowing a function once 🤝

`call` and `apply` run a function **right now**, with whatever `this` you choose:

```js
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

introduce.call(player, "Hi", "!");               // arguments one by one
introduce.apply({ name: "Ravi" }, ["Hello", "."]); // arguments as an array
```

Memory trick: **a**pply takes an **a**rray, and **c**all takes **c**ommas.

## Prototypes: a shared family recipe book 📚

Imagine every cat in a family keeping its own copy of the same huge recipe book. That's wasteful! Instead, the family keeps **one shared book**, and everyone looks things up in it.

In JavaScript, that shared book is the **prototype**. Methods placed on a prototype are **shared** by every object made from it:

```js
function Animal(name) {
  this.name = name;                 // each animal's own data
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;   // one shared method
};

const cat = new Animal("Milo");
const dog = new Animal("Rex");
cat.speak();                   // "Milo makes a sound"
cat.speak === dog.speak;       // true: the very same function
```

When you ask an object for a property it doesn't have, JavaScript checks its prototype, then *that* object's prototype, and so on up the **prototype chain**, like asking your parents, then your grandparents.

`class` (next lesson) is a friendlier way to write exactly this.

## Remember ✅

- `this` is whoever called the function: usually the object before the dot.
- Passing a method as a callback loses `this`. Fix it with an arrow wrapper or `bind`.
- `call` (commas) and `apply` (array) run a function once with a chosen `this`.
- Methods on a prototype are shared by every object made from it.
