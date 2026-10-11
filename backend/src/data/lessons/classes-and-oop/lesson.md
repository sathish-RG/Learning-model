## Why does this matter?

As programs grow, you need a way to model "things": users, bank accounts, products, game characters. Each has its own data and its own abilities. **Classes** give you a blueprint for making as many of these things as you need, and they're the backbone of object-oriented programming (OOP), a favourite interview topic.

## A blueprint and its houses 📐

A **class** is a blueprint. Each object built from it is an **instance**: a house built from that blueprint. Every house has the same layout, but its own furniture.

```js
class Dog {
  constructor(name) {       // runs once, when a new dog is made
    this.name = name;
  }

  bark() {                  // a method: something every dog can do
    return `${this.name} says woof!`;
  }
}

const rex = new Dog("Rex");   // `new` builds a house from the blueprint
rex.bark();                   // "Rex says woof!"
```

Under the hood, a class is the prototype system from the last lesson, written in a friendlier way. `bark` lives on the shared prototype.

## Private fields: a safe in every house 🔐

A field starting with `#` is **private**: only code inside the class can see it. It's like a safe built into each house:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
  }

  get balance() {           // a getter: read it like a property, account.balance
    return this.#balance;
  }
}
```

Outside code can't do `account.#balance = 1000000` (that's a syntax error). Every change has to go through methods that check the rules. Hiding the inner workings like this is called **encapsulation**.

## Inheritance: a child blueprint 👨‍👧

`extends` creates a new blueprint that starts from an existing one and adds more. A savings account **is a** bank account, plus interest:

```js
class SavingsAccount extends BankAccount {
  constructor(owner, rate) {
    super(owner);            // run the parent's setup first
    this.rate = rate;
  }

  addInterest() {
    this.deposit(this.balance * this.rate);
  }
}
```

- `super(...)` calls the parent's constructor. You **must** call it before using `this`.
- A child can **override** a parent method by defining one with the same name. Different classes responding to the same method in their own way is called **polymorphism**.
- `instance instanceof BankAccount` checks whether an object was built from that blueprint (or a child of it).

## static: belongs to the blueprint, not the houses 🏭

A `static` property or method belongs to the **class itself**, like the architect's office counting how many houses have been built:

```js
class BankAccount {
  static count = 0;
  constructor() {
    BankAccount.count++;
  }
}
```

## Remember ✅

- A class is a blueprint; `new` makes an instance, and `constructor` sets it up.
- `#private` fields hide data; getters (`get balance()`) expose it safely.
- `extends` + `super()` build child classes; methods can be overridden.
- `static` members belong to the class itself, not to each instance.
