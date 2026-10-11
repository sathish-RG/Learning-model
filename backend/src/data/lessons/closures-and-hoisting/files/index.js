// Lesson 34: closures and hoisting. This lesson runs as a modern ES module.

// 1-2. makeCounter()

// 3. makeMultiplier(factor)

// 5. Call shout() here, before it's declared below

// 4. The classic bug: this prints "var: 4" three times. Why?
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
// Write the same loop with let here

// Declared at the bottom, but hoisted!
function shout(text) {
  return text.toUpperCase() + "!";
}
