// Lesson 38: callbacks, promises and the event loop.

// 1. Predict the order of these four logs: ____________
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// An old-style callback API: loads a user after 100ms.
const users = { 1: { name: "Asha" }, 2: { name: "Ravi" } };
function loadUserCb(id, callback) {
  setTimeout(() => {
    if (users[id]) callback(null, users[id]);
    else callback(new Error(`User ${id} not found`));
  }, 100);
}

// 2. wait(ms)

// 3. loadUser(id): wrap loadUserCb in a Promise

// 4. Use loadUser(1) and loadUser(99)

// 5. Chain: wait(100) → loadUser(2) → log → finally "Done"

