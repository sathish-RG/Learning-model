// Lesson 35: this, call/apply/bind and prototypes.
const player = {
  name: "Asha",
  score: 0,
  addPoint() {
    this.score++;
    return this.score;
  },
};

// 1. Call player.addPoint() twice

// 2. Taking the method off the object loses `this`:
//    const add = player.addPoint;
//    add();   // ❌ TypeError: Cannot read properties of undefined (reading 'score')
//    Fix it with bind:

// 3. setTimeout with an arrow function

// 4. call and apply
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

// 5. Prototypes
function Animal(name) {
  this.name = name;
}

