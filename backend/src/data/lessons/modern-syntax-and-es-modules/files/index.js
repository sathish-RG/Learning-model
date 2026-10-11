// Lesson 37: modern syntax and ES modules.
// Rewrite each part below in modern JavaScript, keeping the same results.

var user = { name: "Asha", age: 24, address: null, settings: { theme: "dark" } };
var muted = { volume: 0 };

// 1. Destructuring
var name = user.name;
var settings = user.settings;

// 2. Optional chaining and nullish coalescing
var city = user.address && user.address.city ? user.address.city : "Unknown";
var volume = settings.volume !== undefined && settings.volume !== null ? settings.volume : 50;

// 3. Compare || and ?? with muted.volume

// 4. Spread
var numbers = [3, 7, 1];
var max = Math.max.apply(null, numbers);
var more = numbers.concat([10, 20]);

// 5. Object spread
var copy = Object.assign({}, user, { name: "Ravi" });

// 6. Move this into utils.js as a named export (with a rest parameter)
function sum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) total += arguments[i];
  return total;
}
