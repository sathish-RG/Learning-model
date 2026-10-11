## Your mission: model bank accounts

All output goes to the console.

1. **The blueprint.** Write `class BankAccount` with:
   - a private `#balance` starting at `0`, and a `static count = 0`
   - a `constructor(owner)` that stores `owner` and adds 1 to `BankAccount.count`
   - `deposit(amount)`: throws `Deposit must be positive` if `amount <= 0`, otherwise adds it
   - `withdraw(amount)`: throws `Insufficient funds` if `amount` is more than the balance, otherwise subtracts it
   - a getter `balance` that returns `#balance`
2. **Use it.** Create an account for `"Asha"`, deposit `1000`, withdraw `300`, and log `account.balance`.
3. **Break the rules safely.** Inside `try` / `catch`, withdraw `5000` and log the error's message.
4. **Privacy.** Log `Object.keys(account)`: the balance doesn't appear!
5. **A child class.** Write `class SavingsAccount extends BankAccount` with a `constructor(owner, rate)` (call `super`!) and an `addInterest()` method that deposits `balance * rate`. Create one for `"Ravi"` with rate `0.05`, deposit `1000`, add interest, and log its balance. Then log `savings instanceof BankAccount`.
6. **Static.** Log `BankAccount.count`.

✅ **You're done when** the console shows `700`, `Insufficient funds`, `["owner"]`, `1050`, `true` and `2`.
