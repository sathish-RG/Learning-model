## Your mission: a stopwatch that remembers its laps

Write your code in `app.js`. The `formatTime(ms)` helper is already written for you.

1. **Start.** When `#start` is clicked, start a `setInterval` (every 100ms) that shows the elapsed time in `#time` using `formatTime`. Measure with `Date.now()`, not by counting ticks. Clicking Start twice must not start two intervals.
2. **Stop.** `#stop` pauses the stopwatch (`clearInterval`). Clicking Start again continues from where it stopped.
3. **Lap.** `#lap` adds the current time to the `laps` array, shows every lap as an `li` in `#laps`, and saves `laps` to `localStorage` (key `"laps"`, as JSON).
4. **Remember.** When the page loads, read the saved laps from `localStorage` (default `[]`) and show them.
5. **Reset.** `#reset` stops the stopwatch, shows `00:00.0`, empties the laps on the page and removes them from `localStorage`.
6. **A short message.** After each lap, show `Lap saved!` in `#toast` and hide it again after 1.5 seconds with `setTimeout`.

✅ **You're done when** the stopwatch runs, pauses and continues, your laps appear, and they're **still there after you click the preview's refresh button**.
