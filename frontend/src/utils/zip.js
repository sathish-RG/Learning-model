// Builds a .zip file in the browser (stored, not compressed: the files are small text).
// createZip([{ path: "app/index.js", content: "..." }]) → Blob
// Format: a local header + data per file, then a central directory, then an end record.

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

// Little-endian fields, as the zip format requires
const header = (fields) => {
  const bytes = new Uint8Array(fields.reduce((size, [, length]) => size + length, 0));
  const view = new DataView(bytes.buffer);
  let offset = 0;
  for (const [value, length] of fields) {
    if (length === 2) view.setUint16(offset, value, true);
    else view.setUint32(offset, value, true);
    offset += length;
  }
  return bytes;
};

const UTF8_NAMES = 0x0800; // file names are UTF-8
const DOS_TIME = 0; // 00:00:00
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1; // 2026-01-01

export function createZip(files) {
  const encoder = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;

  for (const { path, content } of files) {
    const name = encoder.encode(path);
    const data = encoder.encode(content);
    const crc = crc32(data);
    const common = [
      [20, 2], // version needed: 2.0
      [UTF8_NAMES, 2],
      [0, 2], // stored (no compression)
      [DOS_TIME, 2],
      [DOS_DATE, 2],
      [crc, 4],
      [data.length, 4], // compressed size
      [data.length, 4], // uncompressed size
      [name.length, 2],
      [0, 2], // extra field length
    ];
    const local = header([[0x04034b50, 4], ...common]);
    parts.push(local, name, data);
    central.push(header([[0x02014b50, 4], [20, 2], ...common, [0, 2], [0, 2], [0, 2], [0, 4], [offset, 4]]), name);
    offset += local.length + name.length + data.length;
  }

  const centralSize = central.reduce((size, part) => size + part.length, 0);
  const end = header([
    [0x06054b50, 4],
    [0, 2],
    [0, 2],
    [files.length, 2],
    [files.length, 2],
    [centralSize, 4],
    [offset, 4],
    [0, 2],
  ]);
  return new Blob([...parts, ...central, end], { type: 'application/zip' });
}

// Saves a Blob as a file, through a temporary link
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
