// Converts eBible.org VPL files into src/data/text/<locale>.json, one per translation.
//
//   node scripts/build-gospel-text.mjs <dir>
//
// <dir> holds one unzipped folder per translation, e.g. <dir>/engwebp/engwebp_vpl.txt,
// downloaded from https://eBible.org/Scriptures/<id>_vpl.zip (see README).
//
// The text is only selected and re-keyed, never edited: eBible.org asks that a
// modified text not carry the translation's name, and the Tagalog text's licence
// requires changes to be marked. The only rearranging is listed per translation
// in QUIRKS below, and moves whole verses without touching their words.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const [, , root] = process.argv;
if (!root) {
  console.error('usage: node scripts/build-gospel-text.mjs <dir containing <id>/<id>_vpl.txt>');
  process.exit(1);
}

// locale -> eBible translation id. English comes first: its verse layout is the
// one the section table is written against, and every other text must match it.
const TRANSLATIONS = {
  en: 'engwebp',
  es: 'spaRV1909',
  fr: 'fraLSG',
  pt: 'porbrbsl',
  de: 'deu1912',
  ru: 'russyn',
  ar: 'arb-vd',
  'zh-Hans': 'cmn-cu89s',
  'zh-Hant': 'cmn-cu89t',
  ko: 'kor',
  tl: 'tglulb',
};

// Where a file's verse layout differs from the English one. Each entry is asserted:
// the build fails if a declared quirk is not found, or if the file differs in a way
// not declared here, so a new download with a changed layout cannot slip through.
//   merge: a verse the file splits in two; its text is appended to the verse before.
//   span:  verses the translation prints as one; the text sits on the first verse
//          of the span and the rest are left empty and recorded as joined.
//   blank: verses whose only text is a placeholder (see ko); they become empty.
//   omit:  verses absent from the eBible file (all are later additions to the
//          manuscripts); they stay empty and the reader says so. Whether a
//          printed edition includes them has not been checked, so the site says
//          the text it uses lacks them, not that the translation does.
const CUV = {
  // In the eBible file John 7:53 is folded into 8:1 without a range marker; the
  // other three are marked as ranges ("1-2") in its XML.
  span: ['LUK 1:1-2', 'LUK 2:34-35', 'LUK 21:29-30', 'JOH 7:53-8:1'],
  omit: ['MAT 18:11', 'MAT 23:14', 'MAR 7:16', 'MAR 15:28', 'LUK 17:36', 'LUK 23:17', 'JOH 5:4'],
};
const QUIRKS = {
  // Louis Segond numbers Mark 9 to 50 and Mark 10 to 52; this file splits the last
  // verse of each in two.
  fr: { merge: ['MAR 9:51', 'MAR 10:53'] },
  'zh-Hans': CUV,
  'zh-Hant': CUV,
  // The Korean file prints "(없 음)" ("none") as the text of verses the translation
  // omits. That is a placeholder, not Scripture, so these become empty and the
  // reader shows its usual "not included" line, as for every other language.
  ko: {
    placeholder: '(없 음)',
    blank: ['MAT 17:21', 'MAT 18:11', 'MAT 23:14', 'MAR 9:44', 'MAR 9:46', 'MAR 11:26', 'MAR 15:28', 'LUK 17:36', 'LUK 23:17'],
  },
};

// eBible's VPL uses its own book codes (MAR, JOH), not the USFM ones (MRK, JHN) its
// XML uses. Grepping for the wrong set silently matches nothing, so the codes are
// pinned here and every count is asserted below.
const BOOKS = { MAT: 'matthew', MAR: 'mark', LUK: 'luke', JOH: 'john' };
const line = /^(\w{3}) (\d+):(\d+) ?(.*)$/;
const ref = (s) => {
  const m = /^(\w{3}) (\d+):(\d+)(?:-(?:(\d+):)?(\d+))?$/.exec(s);
  if (!m || !BOOKS[m[1]]) throw new Error(`bad quirk reference ${s}`);
  const c = Number(m[2]);
  return { book: BOOKS[m[1]], c, v: Number(m[3]), c2: m[4] ? Number(m[4]) : c, v2: m[5] ? Number(m[5]) : Number(m[3]) };
};

function read(id) {
  const file = `${root}/${id}/${id}_vpl.txt`;
  if (!existsSync(file)) throw new Error(`missing ${file}`);
  const books = { matthew: [], mark: [], luke: [], john: [] };
  for (const raw of readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/)) {
    const m = line.exec(raw);
    if (!m || !BOOKS[m[1]]) continue;
    (books[BOOKS[m[1]]][Number(m[2]) - 1] ??= [])[Number(m[3]) - 1] = m[4].trim();
  }
  return books;
}

const layoutOf = (books) => Object.fromEntries(Object.entries(books).map(([b, chs]) => [b, chs.map((ch) => ch.length)]));
const missingIn = (books, layout) =>
  Object.entries(layout).flatMap(([b, lens]) =>
    lens.flatMap((n, c) => Array.from({ length: n }, (_, v) => v).filter((v) => books[b][c]?.[v] === undefined).map((v) => `${b} ${c + 1}:${v + 1}`)),
  );

const outDir = new URL('../src/data/text/', import.meta.url);
mkdirSync(outDir, { recursive: true });

let english;
let failed = false;
for (const [locale, id] of Object.entries(TRANSLATIONS)) {
  const books = read(id);
  const joined = {};
  const expectMissing = new Set();
  const q = QUIRKS[locale] ?? {};
  const problems = [];

  for (const s of q.merge ?? []) {
    const r = ref(s);
    const ch = books[r.book][r.c - 1];
    if (ch?.length !== r.v) problems.push(`merge ${s}: expected it to be the last verse of its chapter`);
    else ch[r.v - 2] = `${ch[r.v - 2]} ${ch.pop()}`;
  }
  if (q.blank) {
    const found = Object.entries(books).flatMap(([b, chs]) =>
      chs.flatMap((ch, c) => ch.flatMap((t, v) => (t === q.placeholder ? [`${b} ${c + 1}:${v + 1}`] : []))),
    );
    const want = q.blank.map((s) => {
      const r = ref(s);
      return `${r.book} ${r.c}:${r.v}`;
    });
    if (JSON.stringify(found) !== JSON.stringify(want)) {
      problems.push(`placeholder "${q.placeholder}" found at ${found.join(', ')}; declared ${want.join(', ')}`);
    }
    for (const k of found) {
      const [b, cv] = k.split(' ');
      const [c, v] = cv.split(':').map(Number);
      books[b][c - 1][v - 1] = '';
    }
  }
  // Taken after merges (which fix the layout) and before spans (which fill in the
  // verses they absorb), so it lists exactly what the file itself lacks.
  const missing = english ? missingIn(books, english.layout) : [];
  for (const s of q.span ?? []) {
    const r = ref(s);
    const keys = [];
    for (let c = r.c; c <= r.c2; c++) {
      const len = english ? english.layout[r.book][c - 1] : books[r.book][c - 1].length;
      for (let v = c === r.c ? r.v : 1; v <= (c === r.c2 ? r.v2 : len); v++) keys.push([c, v]);
    }
    const present = keys.filter(([c, v]) => books[r.book][c - 1]?.[v - 1] !== undefined);
    if (present.length !== 1) {
      problems.push(`span ${s}: expected exactly one verse of the span in the file, found ${present.length}`);
      continue;
    }
    const [[pc, pv]] = present;
    const text = books[r.book][pc - 1][pv - 1];
    for (const [c, v] of keys) {
      books[r.book][c - 1][v - 1] = '';
      if (c !== pc || v !== pv) expectMissing.add(`${r.book} ${c}:${v}`);
    }
    books[r.book][r.c - 1][r.v - 1] = text;
    (joined[r.book] ??= {})[`${r.c}:${r.v}`] = `${r.c2}:${r.v2}`;
  }
  for (const s of q.omit ?? []) {
    const r = ref(s);
    expectMissing.add(`${r.book} ${r.c}:${r.v}`);
  }

  if (english) {
    const undeclared = missing.filter((k) => !expectMissing.has(k));
    const notFound = [...expectMissing].filter((k) => !missing.includes(k));
    if (undeclared.length) problems.push(`verses missing from the file: ${undeclared.join(', ')}`);
    if (notFound.length) problems.push(`declared missing but present: ${notFound.join(', ')}`);
    for (const k of missing) {
      const [b, cv] = k.split(' ');
      const [c, v] = cv.split(':').map(Number);
      books[b][c - 1][v - 1] ??= '';
    }
    const layout = JSON.stringify(layoutOf(books));
    if (layout !== JSON.stringify(english.layout)) problems.push('chapter and verse layout differs from the English text');
  } else {
    // The English text defines the layout, so it is checked against known counts.
    const counts = Object.values(books).map((chs) => [chs.length, chs.reduce((n, ch) => n + ch.length, 0)]);
    if (JSON.stringify(counts) !== JSON.stringify([[28, 1071], [16, 678], [24, 1151], [21, 879]])) {
      problems.push(`unexpected counts ${JSON.stringify(counts)}`);
    }
    const holes = missingIn(books, layoutOf(books));
    if (holes.length) problems.push(`holes: ${holes.join(', ')}`);
    english = { layout: layoutOf(books) };
  }

  if (problems.length) {
    console.error(`${locale} (${id}):\n  ${problems.join('\n  ')}`);
    failed = true;
    continue;
  }
  const empty = Object.entries(books).flatMap(([b, chs]) => chs.flatMap((ch, c) => ch.flatMap((t, v) => (t === '' ? [`${b} ${c + 1}:${v + 1}`] : []))));
  writeFileSync(new URL(`${locale}.json`, outDir), JSON.stringify({ id, books, joined }));
  console.log(`${locale} (${id}): wrote; empty verses: ${empty.length ? empty.join(', ') : 'none'}`);
}
if (failed) process.exit(1);
