// Converts the eBible.org World English Bible VPL file into src/data/gospels.json.
//
//   curl -L -o engwebp_vpl.zip https://eBible.org/Scriptures/engwebp_vpl.zip
//   unzip engwebp_vpl.zip -d engwebp_vpl
//   node scripts/build-gospel-text.mjs engwebp_vpl/engwebp_vpl.txt
//
// The WEB is public domain. eBible.org asks that a *modified* text not be called
// the World English Bible, so this script only selects verses; it never edits them.
import { readFileSync, writeFileSync } from 'node:fs';

const [, , input] = process.argv;
if (!input) {
  console.error('usage: node scripts/build-gospel-text.mjs <path to engwebp_vpl.txt>');
  process.exit(1);
}

// eBible's VPL uses its own book codes (MAR, JOH), not the USFM ones (MRK, JHN).
// Grepping for the USFM codes silently matches nothing, so the codes are pinned here
// and every count is asserted below.
const BOOKS = { MAT: 'matthew', MAR: 'mark', LUK: 'luke', JOH: 'john' };
const EXPECTED = {
  matthew: { chapters: 28, verses: 1071 },
  mark: { chapters: 16, verses: 678 },
  luke: { chapters: 24, verses: 1151 },
  john: { chapters: 21, verses: 879 },
};

const out = { matthew: [], mark: [], luke: [], john: [] };
const line = /^(\w{3}) (\d+):(\d+) ?(.*)$/;

for (const raw of readFileSync(input, 'utf8').split(/\r?\n/)) {
  const m = line.exec(raw);
  if (!m || !BOOKS[m[1]]) continue;
  const book = out[BOOKS[m[1]]];
  const ch = Number(m[2]);
  const vs = Number(m[3]);
  (book[ch - 1] ??= [])[vs - 1] = m[4].trim();
}

let failed = false;
for (const [name, { chapters, verses }] of Object.entries(EXPECTED)) {
  const book = out[name];
  const count = book.reduce((n, ch) => n + ch.length, 0);
  // A hole in a chapter array would serialise as null and render as a missing verse.
  const holes = book.flatMap((ch, c) => [...ch.keys()].filter((v) => ch[v] === undefined).map((v) => `${c + 1}:${v + 1}`));
  if (book.length !== chapters || count !== verses || holes.length) {
    console.error(`${name}: ${book.length} chapters / ${count} verses (expected ${chapters} / ${verses}); holes: ${holes.join(', ') || 'none'}`);
    failed = true;
  }
}
if (failed) process.exit(1);

const empty = Object.entries(out).flatMap(([b, chs]) =>
  chs.flatMap((ch, c) => ch.flatMap((t, v) => (t === '' ? [`${b} ${c + 1}:${v + 1}`] : []))),
);
writeFileSync(new URL('../src/data/gospels.json', import.meta.url), JSON.stringify(out));
console.log(`wrote src/data/gospels.json; verses present but empty in the WEB: ${empty.join(', ') || 'none'}`);
