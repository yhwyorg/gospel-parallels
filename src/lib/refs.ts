export const GOSPELS = ['matthew', 'mark', 'luke', 'john'] as const;
export type Gospel = (typeof GOSPELS)[number];

export const GOSPEL_NAMES: Record<Gospel, string> = {
  matthew: 'Matthew',
  mark: 'Mark',
  luke: 'Luke',
  john: 'John',
};

export const GOSPEL_ABBR: Record<Gospel, string> = { matthew: 'Mt', mark: 'Mk', luke: 'Lk', john: 'Jn' };

/** A verse as a single sortable number: chapter * 1000 + verse. No gospel chapter reaches 1000 verses. */
export type VerseKey = number;
export const key = (chapter: number, verse: number): VerseKey => chapter * 1000 + verse;
export const chapterOf = (k: VerseKey) => Math.floor(k / 1000);
export const verseOf = (k: VerseKey) => k % 1000;

export interface Range {
  start: VerseKey;
  end: VerseKey; // inclusive
}

export interface Passage {
  gospel: Gospel;
  ranges: Range[];
}

/** chapter lengths for each gospel, e.g. lengths.mark[0] === 45. */
export type ChapterLengths = Record<Gospel, number[]>;

const ALIASES: Record<string, Gospel> = {
  matthew: 'matthew', matt: 'matthew', mat: 'matthew', mt: 'matthew',
  mark: 'mark', mrk: 'mark', mar: 'mark', mk: 'mark', mr: 'mark',
  luke: 'luke', luk: 'luke', lk: 'luke', lu: 'luke',
  john: 'john', jhn: 'john', joh: 'john', jn: 'john',
};

export class RefError extends Error {}

/**
 * Parses the reference grammar used in the section table:
 *   "4:35-41"   "8:31-9:1"   "6:1-8; 6:16-18"   "12:1"
 * A bare chapter ("5") is accepted only when chapter lengths are supplied,
 * because without them its last verse is unknown.
 */
export function parseRanges(spec: string, lengths?: number[]): Range[] {
  return spec.split(';').map((part) => {
    const s = part.trim();
    let m = /^(\d+):(\d+)(?:\s*[-–]\s*(?:(\d+):)?(\d+))?$/.exec(s);
    if (m) {
      const c1 = Number(m[1]);
      const v1 = Number(m[2]);
      const c2 = m[3] ? Number(m[3]) : c1;
      const v2 = m[4] ? Number(m[4]) : v1;
      return { start: key(c1, v1), end: key(c2, v2) };
    }
    m = /^(\d+)(?:\s*[-–]\s*(\d+))?$/.exec(s);
    if (m && lengths) {
      const c1 = Number(m[1]);
      const c2 = m[2] ? Number(m[2]) : c1;
      const last = lengths[c2 - 1];
      if (!last) throw new RefError(`chapter ${c2} does not exist`);
      return { start: key(c1, 1), end: key(c2, last) };
    }
    throw new RefError(`cannot read "${s}"`);
  });
}

/** Throws unless every endpoint names a verse that exists and each range runs forward. */
export function checkRanges(gospel: Gospel, ranges: Range[], lengths: ChapterLengths): void {
  const name = GOSPEL_NAMES[gospel];
  for (const r of ranges) {
    for (const k of [r.start, r.end]) {
      const len = lengths[gospel][chapterOf(k) - 1];
      if (!len) throw new RefError(`${name} has no chapter ${chapterOf(k)}`);
      if (verseOf(k) < 1 || verseOf(k) > len) {
        throw new RefError(`${name} ${chapterOf(k)} has ${len} verses, not ${verseOf(k)}`);
      }
    }
    if (r.end < r.start) throw new RefError(`${formatRange(r)} runs backwards`);
  }
}

/**
 * Parses what a person types into the lookup box: "Mk 4:35-41", "John 3:16", "Luke 15".
 * Anything outside the four Gospels is an error rather than an empty result, so a
 * typo never looks like "no parallels found".
 */
export function parseLookup(input: string, lengths: ChapterLengths): Passage {
  const m = /^\s*([1-3]?\s*[a-z.]+)\s*(.*)$/i.exec(input);
  if (!m) throw new RefError('Type a passage such as "Mark 4:35-41".');
  const word = m[1].toLowerCase().replace(/[.\s]/g, '');
  const gospel = ALIASES[word];
  if (!gospel) {
    throw new RefError(`"${m[1].trim()}" is not one of the four Gospels. Try Matthew, Mark, Luke or John.`);
  }
  const rest = m[2].trim();
  if (!rest) throw new RefError(`Add a chapter, e.g. "${GOSPEL_NAMES[gospel]} 1".`);
  const ranges = parseRanges(rest, lengths[gospel]);
  checkRanges(gospel, ranges, lengths);
  return { gospel, ranges };
}

export function formatRange(r: Range): string {
  const [c1, v1, c2, v2] = [chapterOf(r.start), verseOf(r.start), chapterOf(r.end), verseOf(r.end)];
  if (r.start === r.end) return `${c1}:${v1}`;
  if (c1 === c2) return `${c1}:${v1}-${v2}`;
  return `${c1}:${v1}-${c2}:${v2}`;
}

export function formatPassage(p: Passage): string {
  return `${GOSPEL_NAMES[p.gospel]} ${p.ranges.map(formatRange).join('; ')}`;
}

export const overlaps = (a: Range, b: Range) => a.start <= b.end && b.start <= a.end;

/** Every verse key in the ranges, in order. */
export function versesIn(ranges: Range[], lengths: number[]): VerseKey[] {
  const out: VerseKey[] = [];
  for (const r of ranges) {
    for (let c = chapterOf(r.start); c <= chapterOf(r.end); c++) {
      const from = c === chapterOf(r.start) ? verseOf(r.start) : 1;
      const to = c === chapterOf(r.end) ? verseOf(r.end) : lengths[c - 1];
      for (let v = from; v <= to; v++) out.push(key(c, v));
    }
  }
  return out;
}
