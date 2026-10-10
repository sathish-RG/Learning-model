// Lesson 24: functions and scope.

// 1. greet(name = "friend")

// 2. square (an arrow function)

// 3. celsiusToFahrenheit(c)

// 4. isEven(n)

// 5. The discount is calculated, but it's stuck inside the function!
function calculateDiscount(price) {
  const discount = price * 0.1;
}
// console.log(discount); // ❌ ReferenceError: discount is not defined

