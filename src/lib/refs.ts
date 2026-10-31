import { bookAliases, foldName } from '../i18n/books';

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

/** Why a reference was refused. Structured so each language can word the message. */
export type RefProblem =
  | { kind: 'empty' }
  | { kind: 'not-gospel'; word: string }
  | { kind: 'no-chapter-given'; gospel: Gospel }
  | { kind: 'no-chapter'; gospel?: Gospel; chapter: number }
  | { kind: 'verse-count'; gospel: Gospel; chapter: number; verses: number; verse: number }
  | { kind: 'backwards'; range: Range }
  | { kind: 'unreadable'; text: string };

/** English wording, used for error messages in tests and the console. */
export function describeProblem(p: RefProblem, names: Record<Gospel, string> = GOSPEL_NAMES): string {
  switch (p.kind) {
    case 'empty': return 'Type a passage such as "Mark 4:35-41".';
    case 'not-gospel': return `"${p.word}" is not one of the four Gospels. Try Matthew, Mark, Luke or John.`;
    case 'no-chapter-given': return `Add a chapter, e.g. "${names[p.gospel]} 1".`;
    case 'no-chapter': return p.gospel ? `${names[p.gospel]} has no chapter ${p.chapter}` : `chapter ${p.chapter} does not exist`;
    case 'verse-count': return `${names[p.gospel]} ${p.chapter} has ${p.verses} verses, not ${p.verse}`;
    case 'backwards': return `${formatRange(p.range)} runs backwards`;
    case 'unreadable': return `cannot read "${p.text}"`;
  }
}

export class RefError extends Error {
  constructor(readonly problem: RefProblem) {
    super(describeProblem(problem));
  }
}

/**
 * Parses the reference grammar used in the section table:
 *   "4:35-41"   "8:31-9:1"   "6:1-8; 6:16-18"   "12:1"
 * A bare chapter ("5") is accepted only when chapter lengths are supplied,
 * because without them its last verse is unknown.
 */
export function parseRanges(spec: string, lengths?: number[], gospel?: Gospel): Range[] {
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
      if (!last) throw new RefError({ kind: 'no-chapter', gospel, chapter: c2 });
      return { start: key(c1, 1), end: key(c2, last) };
    }
    throw new RefError({ kind: 'unreadable', text: s });
  });
}

/** Throws unless every endpoint names a verse that exists and each range runs forward. */
export function checkRanges(gospel: Gospel, ranges: Range[], lengths: ChapterLengths): void {
  for (const r of ranges) {
    for (const k of [r.start, r.end]) {
      const len = lengths[gospel][chapterOf(k) - 1];
      if (!len) throw new RefError({ kind: 'no-chapter', gospel, chapter: chapterOf(k) });
      if (verseOf(k) < 1 || verseOf(k) > len) {
        throw new RefError({ kind: 'verse-count', gospel, chapter: chapterOf(k), verses: len, verse: verseOf(k) });
      }
    }
    if (r.end < r.start) throw new RefError({ kind: 'backwards', range: r });
  }
}

/**
 * Parses what a person types into the lookup box: "Mk 4:35-41", "John 3:16", "Luke 15",
 * or the same in any of the site's languages ("Juan 3:16", "马可福音4:35", "مرقس ٤:٣٥").
 * Anything outside the four Gospels is an error rather than an empty result, so a
 * typo never looks like "no parallels found".
 */
export function parseLookup(input: string, lengths: ChapterLengths): Passage {
  // NFKC turns full-width digits and colons (５：３) into ASCII; Arabic-Indic digits
  // are not covered by it and are mapped by hand.
  const s = input
    .normalize('NFKC')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .trim();
  // A leading 1-3 is kept with the name, so "1 John 1:1" is refused rather than read as John 1.
  const m = /^([1-3]?\s*\D+?)\s*(\d.*)?$/u.exec(s);
  if (!m) throw new RefError({ kind: 'empty' });
  const gospel = bookAliases().get(foldName(m[1]));
  if (!gospel) throw new RefError({ kind: 'not-gospel', word: m[1].trim() });
  const rest = (m[2] ?? '').trim();
  if (!rest) throw new RefError({ kind: 'no-chapter-given', gospel });
  const ranges = parseRanges(rest, lengths[gospel], gospel);
  checkRanges(gospel, ranges, lengths);
  return { gospel, ranges };
}

export function formatRange(r: Range): string {
  const [c1, v1, c2, v2] = [chapterOf(r.start), verseOf(r.start), chapterOf(r.end), verseOf(r.end)];
  if (r.start === r.end) return `${c1}:${v1}`;
  if (c1 === c2) return `${c1}:${v1}-${v2}`;
  return `${c1}:${v1}-${c2}:${v2}`;
}

export function formatPassage(p: Passage, names: Record<Gospel, string> = GOSPEL_NAMES): string {
  return `${names[p.gospel]} ${p.ranges.map(formatRange).join('; ')}`;
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

/**
 * Wraps chapter-and-verse runs ("14:3-5", "2:13; 6:4; 11:55", "§89") in Unicode
 * left-to-right isolates. Inside right-to-left text the bidi algorithm otherwise
 * reorders them around their colons and hyphens: "15:11-32" displays as "32-15:11".
 * For plain strings that cannot carry markup, such as notes and placeholders.
 */
export function isolateRefs(text: string): string {
  return text.replace(/§?\d+(?::\d+)?(?:\s*[-–]\s*\d+(?::\d+)?)?(?:\s*[;,]\s*\d+(?::\d+)?(?:\s*[-–]\s*\d+(?::\d+)?)?)*/g, (m) => `\u2066${m}\u2069`);
}
