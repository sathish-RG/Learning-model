// Lesson 54: load, change and back up a task list.
const fs = require("fs/promises");
const path = require("path");

// 1. Build the three paths with path.join(__dirname, ...)

// 2. loadTasks(file): parse the file, or return [] if it doesn't exist (ENOENT)

async function main() {
  // 3. Load tasks.json

  // 4. Add "Learn the fs module" and mark task 2 as done

  // 5. Create the backup folder and save the tasks there

  // 6. Load the backup again and print each task

  // 7. Load missing.json
}

main().catch((error) => console.error(error));
