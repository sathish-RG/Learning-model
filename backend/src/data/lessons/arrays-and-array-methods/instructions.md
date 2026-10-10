## Your mission: work with a list of prices

All output goes to the console.

1. **Lockers.** Add `"cherry"` to the end of `fruits` with `push`. Then log `fruits`, `fruits.length` and the **first** fruit.
2. **map.** Create `halfPrices`: every price divided by 2. Log it.
3. **filter.** Create `affordable`: only the prices **under** 300. Log it.
4. **find.** Find the first price **over** 500. Log it.
5. **reduce.** Add up all the prices into `total`. Log it.
6. **Sort safely.** Create `sorted`: the prices from smallest to largest, **without changing** `prices`. Log `sorted`, then log `prices` to prove it didn't change.

✅ **You're done when** the console shows:
- `["apple", "banana", "cherry"]`, `3` and `apple`
- `[125, 60, 449.5, 22.5, 150]`
- `[250, 120, 45]`
- `899`
- `1614`
- `[45, 120, 250, 300, 899]`, then the original order `[250, 120, 899, 45, 300]`
