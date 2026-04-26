/**
 * generate-favicons.js
 * Generates favicon.png (48), favicon-96.png, favicon-144.png,
 * apple-touch-icon.png (180), icon-192.png, and favicon.ico
 * Uses ONLY Node.js built-ins — no npm install required.
 *
 * Design: #4f46e5 indigo background, rounded corners, white "S" letter
 * Run: node scripts/generate-favicons.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT = path.join(__dirname, '..', 'public');

// ── CRC32 table ──────────────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// ── PNG chunk helper ──────────────────────────────────────────────────────────
function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf  = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf  = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// ── Pixel helper ──────────────────────────────────────────────────────────────
// Colors as [r,g,b,a]
const TRANSPARENT = [0, 0, 0, 0];
const BG          = [79, 70, 229, 255];   // #4f46e5 indigo-600
const WHITE       = [255, 255, 255, 255];

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

// Signed-distance helper for a rounded rectangle
function sdfRoundedRect(px, py, w, h, r) {
  const qx = Math.abs(px - w / 2) - w / 2 + r;
  const qy = Math.abs(py - h / 2) - h / 2 + r;
  return Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) - r;
}

// Draw the "S" letterform on a pixel grid
// Returns true if pixel (px,py) is inside the letter (approximate bitmap font)
function insideLetter(px, py, size) {
  // Normalize to 0..1 space based on a 48x48 grid
  const scale = 48 / size;
  const x = px * scale;
  const y = py * scale;

  // "S" defined in a ~26x34 box, centered in 48x48 at (11, 7)
  const ox = 11, oy = 7;
  const lx = x - ox, ly = y - oy; // local coords 0..26, 0..34
  const sw = 26, sh = 34;         // letter bounding box

  if (lx < 0 || lx >= sw || ly < 0 || ly >= sh) return false;

  const nx = lx / sw;  // 0..1
  const ny = ly / sh;  // 0..1

  // S drawn with three horizontal bars + two arcs
  // Top bar:     ny in [0, 0.15], nx in [0.1, 0.9]
  // Mid bar:     ny in [0.42, 0.58], nx in [0.1, 0.9]
  // Bot bar:     ny in [0.85, 1.0], nx in [0.1, 0.9]
  // Top-left arc:  left side ny in [0.15, 0.42] and outer wall
  // Bot-right arc: right side ny in [0.58, 0.85] and outer wall
  // Left gap (top): nx < 0.2, ny in [0.15, 0.42]
  // Right gap (bot): nx > 0.8, ny in [0.58, 0.85]

  const thick = 0.17;

  // Top bar
  if (ny >= 0 && ny <= thick && nx >= 0.08 && nx <= 0.92) return true;
  // Mid bar
  if (ny >= 0.5 - thick / 2 && ny <= 0.5 + thick / 2 && nx >= 0.08 && nx <= 0.92) return true;
  // Bottom bar
  if (ny >= 1 - thick && ny <= 1.0 && nx >= 0.08 && nx <= 0.92) return true;

  // Left vertical stroke (top half, left side)
  if (nx >= 0.08 && nx <= 0.08 + thick && ny >= 0 && ny <= 0.5) return true;
  // Right vertical stroke (bottom half, right side)
  if (nx >= 1 - 0.08 - thick && nx <= 1 - 0.08 && ny >= 0.5 && ny <= 1.0) return true;

  // Right vertical stroke top half (inner) — NOT present for S
  // Left vertical stroke bottom half (inner) — NOT present for S

  return false;
}

// ── Build RGBA pixel buffer ───────────────────────────────────────────────────
function buildPixels(size) {
  const r = size * 0.18; // corner radius
  const buf = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const d = sdfRoundedRect(x + 0.5, y + 0.5, size, size, r);

      if (d > 0.5) {
        // Outside — transparent
        buf.set(TRANSPARENT, idx);
      } else if (d > -0.5) {
        // Anti-aliased edge
        const alpha = Math.round((0.5 - d) * 255);
        buf[idx]     = BG[0];
        buf[idx + 1] = BG[1];
        buf[idx + 2] = BG[2];
        buf[idx + 3] = alpha;
      } else if (insideLetter(x, y, size)) {
        // Letter pixel — white
        buf.set(WHITE, idx);
      } else {
        // Background
        buf.set(BG, idx);
      }
    }
  }
  return buf;
}

// ── Encode PNG (RGBA) ─────────────────────────────────────────────────────────
function encodePNG(size) {
  const pixels = buildPixels(size);

  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR: width, height, 8-bit, RGBA (colorType=6)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type: RGBA

  // Raw scanlines: filter byte (0 = None) + RGBA row
  const rowBytes = size * 4;
  const raw = Buffer.alloc(size * (1 + rowBytes));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + rowBytes)] = 0; // filter type None
    for (let x = 0; x < size; x++) {
      const srcIdx = (y * size + x) * 4;
      const dstIdx = y * (1 + rowBytes) + 1 + x * 4;
      raw[dstIdx]     = pixels[srcIdx];
      raw[dstIdx + 1] = pixels[srcIdx + 1];
      raw[dstIdx + 2] = pixels[srcIdx + 2];
      raw[dstIdx + 3] = pixels[srcIdx + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Build multi-size ICO (contains 16, 32, 48 PNG entries) ───────────────────
function buildICO(sizes) {
  const pngs = sizes.map((s) => encodePNG(s));

  // ICONDIR header
  const dirHeader = Buffer.alloc(6);
  dirHeader.writeUInt16LE(0, 0);          // reserved
  dirHeader.writeUInt16LE(1, 2);          // type: icon
  dirHeader.writeUInt16LE(sizes.length, 4); // number of images

  // Each ICONDIRENTRY is 16 bytes
  const entrySize = 16;
  const dataOffset = 6 + sizes.length * entrySize;

  let currentOffset = dataOffset;
  const entries = [];
  for (let i = 0; i < sizes.length; i++) {
    const entry = Buffer.alloc(entrySize);
    const s = sizes[i];
    entry[0] = s >= 256 ? 0 : s;    // width  (0 means 256)
    entry[1] = s >= 256 ? 0 : s;    // height (0 means 256)
    entry[2] = 0;                    // color count (0 = no palette)
    entry[3] = 0;                    // reserved
    entry.writeUInt16LE(1, 4);       // planes
    entry.writeUInt16LE(32, 6);      // bit count
    entry.writeUInt32LE(pngs[i].length, 8);  // size of image data
    entry.writeUInt32LE(currentOffset, 12);  // offset
    entries.push(entry);
    currentOffset += pngs[i].length;
  }

  return Buffer.concat([dirHeader, ...entries, ...pngs]);
}

// ── Main ─────────────────────────────────────────────────────────────────────
const files = [
  { name: 'favicon.png',          size: 48  },
  { name: 'favicon-96.png',       size: 96  },
  { name: 'favicon-144.png',      size: 144 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png',         size: 192 },
];

files.forEach(({ name, size }) => {
  const png = encodePNG(size);
  fs.writeFileSync(path.join(OUT, name), png);
  console.log(`✓ ${name} (${size}x${size}) — ${png.length} bytes`);
});

// favicon.ico with 16, 32, 48 sizes
const ico = buildICO([16, 32, 48]);
fs.writeFileSync(path.join(OUT, 'favicon.ico'), ico);
console.log(`✓ favicon.ico (16+32+48) — ${ico.length} bytes`);

console.log('\nAll favicons written to public/');
