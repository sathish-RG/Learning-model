## Your mission: write a set of small functions

Write each function, then log what it returns.

1. **Greet.** Write `function greet(name = "friend")` that returns `"Hello, "` + name + `"!"`. Log `greet("Asha")` and `greet()`.
2. **Square.** Write an arrow function `square` that returns a number multiplied by itself. Log `square(7)`.
3. **Temperature.** Write `celsiusToFahrenheit(c)` that returns `c * 9 / 5 + 32`. Log the result for `100` and for `0`.
4. **Even or odd.** Write `isEven(n)` that returns `true` if `n` divides by 2, otherwise `false`. Log `isEven(10)` and `isEven(7)`.
5. **Fix the scope bug.** `calculateDiscount` works out a discount, but the result is stuck inside it. Make it **return** the price after a 10% discount, then log `calculateDiscount(500)`.

✅ **You're done when** the console shows:
`Hello, Asha!` · `Hello, friend!` · `49` · `212` · `32` · `true` · `false` · `450`
