import { sections, type Section } from '../data/sections';
import {
  GOSPELS, checkRanges, key, overlaps, parseRanges, versesIn,
  type ChapterLengths, type Gospel, type Passage, type Range, type VerseKey,
  chapterOf, verseOf,
} from './refs';

/** books[gospel][chapter - 1][verse - 1]. */
export type GospelText = Record<Gospel, string[][]>;

/** One translation's file in src/data/text/, written by scripts/build-gospel-text.mjs. */
export interface TextFile {
  /** eBible.org translation id. */
  id: string;
  books: GospelText;
  /**
   * Verses the translation prints as one, e.g. Luke 1:1-2 in the Chinese Union
   * Version: "1:1" -> "1:2". The text sits on the first verse; the rest are empty.
   */
  joined: Partial<Record<Gospel, Record<string, string>>>;
}

export interface IndexedSection extends Section {
  /** 1-based place in the harmony order; the § number shared by the site and the book. */
  number: number;
  ranges: Partial<Record<Gospel, Range[]>>;
  /** Position of this section within each gospel's own sequence, 0-based. */
  position: Partial<Record<Gospel, number>>;
}

export interface Corpus {
  text: GospelText;
  /** Verse key of each joined span's first verse -> its last. */
  joined: Record<Gospel, Map<VerseKey, VerseKey>>;
  lengths: ChapterLengths;
  sections: IndexedSection[];
  byId: Map<string, IndexedSection>;
  /** Each gospel's sections in the order that gospel tells them. */
  sequence: Record<Gospel, IndexedSection[]>;
}

export function lengthsOf(text: GospelText): ChapterLengths {
  return Object.fromEntries(GOSPELS.map((g) => [g, text[g].map((ch) => ch.length)])) as ChapterLengths;
}

/**
 * Builds the index and throws on a bad reference. Throwing is deliberate: a
 * reference that quietly resolved to nothing would show an empty column that
 * reads exactly like "this gospel doesn't record the event".
 */
export function buildCorpus(file: TextFile, list: Section[] = sections): Corpus {
  const text = file.books;
  const lengths = lengthsOf(text);
  const joined = Object.fromEntries(
    GOSPELS.map((g) => [g, new Map(Object.entries(file.joined[g] ?? {}).map(([a, b]) => [cvKey(a), cvKey(b)]))]),
  ) as Corpus['joined'];
  const indexed: IndexedSection[] = list.map((s, i) => {
    const ranges: IndexedSection['ranges'] = {};
    for (const g of GOSPELS) {
      const spec = s.refs[g];
      if (!spec) continue;
      try {
        ranges[g] = parseRanges(spec);
        checkRanges(g, ranges[g]!, lengths);
      } catch (e) {
        throw new Error(`section "${s.id}", ${g} "${spec}": ${(e as Error).message}`);
      }
    }
    return { ...s, number: i + 1, ranges, position: {} };
  });

  const sequence = {} as Corpus['sequence'];
  for (const g of GOSPELS) {
    sequence[g] = indexed.filter((s) => s.ranges[g]).sort((a, b) => a.ranges[g]![0].start - b.ranges[g]![0].start);
    sequence[g].forEach((s, i) => (s.position[g] = i));
  }

  const byId = new Map(indexed.map((s) => [s.id, s]));
  if (byId.size !== indexed.length) throw new Error('duplicate section id');
  return { text, joined, lengths, sections: indexed, byId, sequence };
}

const cvKey = (cv: string) => {
  const [c, v] = cv.split(':').map(Number);
  return key(c, v);
};

export interface Verse {
  chapter: number;
  verse: number;
  text: string;
  /** Set on the first verse of a joined span: the span's last verse. */
  through?: VerseKey;
  /** Set on the later verses of a joined span, whose text is printed with the first. */
  joinedTo?: VerseKey;
}

export function versesOf(corpus: Corpus, gospel: Gospel, ranges: Range[]): Verse[] {
  const spans = [...corpus.joined[gospel]];
  return versesIn(ranges, corpus.lengths[gospel]).map((k: VerseKey) => {
    const through = corpus.joined[gospel].get(k);
    const into = spans.find(([a, b]) => k > a && k <= b);
    return {
      chapter: chapterOf(k),
      verse: verseOf(k),
      text: corpus.text[gospel][chapterOf(k) - 1][verseOf(k) - 1],
      ...(through !== undefined && { through }),
      ...(into && { joinedTo: into[0] }),
    };
  });
}

/** Sections whose verses in this gospel overlap the passage, in that gospel's order. */
export function sectionsFor(corpus: Corpus, passage: Passage): IndexedSection[] {
  return corpus.sequence[passage.gospel].filter((s) =>
    s.ranges[passage.gospel]!.some((r) => passage.ranges.some((p) => overlaps(r, p))),
  );
}

export function neighbours(corpus: Corpus, section: IndexedSection, gospel: Gospel) {
  const i = section.position[gospel];
  if (i === undefined) return { prev: undefined, next: undefined };
  const seq = corpus.sequence[gospel];
  return { prev: seq[i - 1], next: seq[i + 1] };
}

export interface Column {
  g: Gospel;
  verses: Verse[];
}

/** The section's verses in each Gospel that has it, in canonical Gospel order. */
export function columnsOf(section: IndexedSection, corpus: Corpus): Column[] {
  return GOSPELS.flatMap((g) => (section.ranges[g] ? [{ g, verses: versesOf(corpus, g, section.ranges[g]!) }] : []));
}

/** "4", "4:1" at a chapter start, "1-2" or "7:53-8:1" for a joined span. */
export function verseLabel(v: Verse, chapterStart: boolean): string {
  const start = chapterStart ? `${v.chapter}:${v.verse}` : String(v.verse);
  if (v.through === undefined) return start;
  const [c2, v2] = [chapterOf(v.through), verseOf(v.through)];
  return c2 === v.chapter ? `${start}-${v2}` : `${v.chapter}:${v.verse}-${c2}:${v2}`;
}
