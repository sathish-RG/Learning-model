## Your mission: print a neat receipt

The order data is messy. Turn it into a clean receipt in the console.

1. **Clean names.** For each item, make the name tidy: trim the spaces and make it uppercase.
2. **Receipt lines.** For each item, log one line with a **template literal**, in the format `NAME x3 = 148.50`. The line total is `price * qty`, shown with exactly 2 decimals.
3. **The total.** Add up all line totals (as numbers) and log it as rupees with `Intl.NumberFormat`, in the format `Total: ₹197.50`.
4. **The date.** Log `orderDate` as `Date: 20 October 2026`, using `toLocaleDateString` with `"en-IN"` and the options `day: "numeric"`, `month: "long"`, `year: "numeric"`.
5. **The decimal surprise.** Log `0.1 + 0.2`, then log it again rounded to 2 decimals with `toFixed`.

✅ **You're done when** the console shows:
`NOTEBOOK x3 = 148.50` · `PEN x4 = 49.00` · `Total: ₹197.50` · `Date: 20 October 2026` · `0.30000000000000004` · `0.30`
