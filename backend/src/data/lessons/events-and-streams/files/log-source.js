// Locked: a 5,000-line server log that arrives the way a big file does, 1 KB at a time.
// It works just like fs.createReadStream("server.log"): a Readable stream of text chunks.
// (This sandbox's file system lives in memory, so its own file streams don't arrive in chunks.)
const { Readable } = require("stream");

const CHUNK_SIZE = 1024;

function createLogStream(totalLines = 5000) {
  let text = "";
  for (let i = 1; i <= totalLines; i++) {
    const time = new Date(Date.UTC(2026, 9, 11, 9, 0, i)).toISOString();
    text += i % 20 === 0 ? `${time} ERROR POST /api/orders 500 Payment failed\n` : `${time} INFO GET /api/menu 200\n`;
  }

  let position = 0;
  return new Readable({
    // Called whenever the next stage is ready for more data
    read() {
      if (position >= text.length) {
        this.push(null); // null means "that's everything": the stream ends
        return;
      }
      this.push(text.slice(position, position + CHUNK_SIZE)); // chunks often end mid-line!
      position += CHUNK_SIZE;
    },
  });
}

module.exports = { createLogStream };
