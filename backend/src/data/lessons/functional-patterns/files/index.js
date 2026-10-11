// Lesson 40: functional patterns.
const fruits = ["apple", "banana"];
const volume = (length, width, height) => length * width * height;

// 1. addItem(list, item): returns a NEW array

// 2. pipe(...fns)

// 3. curry(fn)

// 4. debounce(fn, ms)

// 5. throttle(fn, ms), then uncomment the test below
// const logTick = throttle((n) => console.log("tick", n), 200);
// let tick = 0;
// const timer = setInterval(() => {
//   tick++;
//   logTick(tick);
//   if (tick === 10) clearInterval(timer);
// }, 50);
