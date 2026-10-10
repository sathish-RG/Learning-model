// Lesson 32: storage and timers.

// Turns milliseconds into "mm:ss.t", e.g. 65300 → "01:05.3"
function formatTime(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
  const seconds = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
  const tenths = Math.floor(ms / 100) % 10;
  return `${minutes}:${seconds}.${tenths}`;
}

let intervalId = null;   // the running interval, or null when stopped
let startTime = 0;       // when the current run started (Date.now())
let elapsedBefore = 0;   // time from earlier runs, before the last Stop
let laps = [];

// 1-2. Start and Stop

// 3. Lap (and save to localStorage)

// 4. Load saved laps when the page opens

// 5. Reset

// 6. Show "Lap saved!" for 1.5 seconds

