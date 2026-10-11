// Lesson 55: find the errors in a big log, one chunk at a time.
const EventEmitter = require("events");
const { Transform, Writable, pipeline } = require("stream");
const { createLogStream } = require("./log-source");

// 1. A monitor that announces "progress" and "done"

// 2. A Transform that keeps only the ERROR lines (and counts chunks and lines)

// 3. A Writable that counts the error lines and remembers the first one

// 4. Connect them with pipeline(), then announce "done"
