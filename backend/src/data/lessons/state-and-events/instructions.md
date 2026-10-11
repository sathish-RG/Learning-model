## Your mission: four kinds of state

Everything happens in `App.jsx`. (No lists or effects yet: those come in the next lessons.)

1. **A counter.** Create `count` state starting at `0`. The `+1` button adds one, `−1` subtracts one, and `Reset` sets it back to 0. Show it in `#count`.
2. **+3 in one click.** The `+3` button must call the setter **three times**, adding 1 each time, and still end up 3 higher. (*Hint:* use the updater form.)
3. **A toggle.** Create `isOn` state (`false`). The switch button flips it, and its text shows `ON` or `OFF`.
4. **Array state.** Create `items` state starting as `["Learn props"]`. The `Add item` button adds `Item 2`, then `Item 3`, and so on, **without** `push`. Show `items.length` in `#item-count` and `items.join(", ")` in `#items`.
5. **Object state.** Create `profile` state: `{ name: "Asha", level: 1 }`. The `Level up` button adds 1 to `level` using object spread. Show `Asha · level 1` in `#profile`.

✅ **You're done when** every button works:
- `+3` jumps by exactly 3
- the switch flips between ON and OFF
- `Add item` grows the list (`Learn props, Item 2, Item 3`)
- `Level up` raises the level without losing the name
