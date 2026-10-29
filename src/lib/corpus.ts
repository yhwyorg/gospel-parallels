import { sections, type Section } from '../data/sections';
import {
  GOSPELS, checkRanges, overlaps, parseRanges, versesIn,
  type ChapterLengths, type Gospel, type Passage, type Range, type VerseKey,
  chapterOf, verseOf,
} from './refs';

/** gospels.json: text[gospel][chapter - 1][verse - 1]. */
export type GospelText = Record<Gospel, string[][]>;

export interface IndexedSection extends Section {
  ranges: Partial<Record<Gospel, Range[]>>;
  /** Position of this section within each gospel's own sequence, 0-based. */
  position: Partial<Record<Gospel, number>>;
}

export interface Corpus {
  text: GospelText;
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
export function buildCorpus(text: GospelText, list: Section[] = sections): Corpus {
  const lengths = lengthsOf(text);
  const indexed: IndexedSection[] = list.map((s) => {
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
    return { ...s, ranges, position: {} };
  });

  const sequence = {} as Corpus['sequence'];
  for (const g of GOSPELS) {
    sequence[g] = indexed.filter((s) => s.ranges[g]).sort((a, b) => a.ranges[g]![0].start - b.ranges[g]![0].start);
    sequence[g].forEach((s, i) => (s.position[g] = i));
  }

  const byId = new Map(indexed.map((s) => [s.id, s]));
  if (byId.size !== indexed.length) throw new Error('duplicate section id');
  return { text, lengths, sections: indexed, byId, sequence };
}

export interface Verse {
  chapter: number;
  verse: number;
  text: string;
}

export function versesOf(corpus: Corpus, gospel: Gospel, ranges: Range[]): Verse[] {
  return versesIn(ranges, corpus.lengths[gospel]).map((k: VerseKey) => ({
    chapter: chapterOf(k),
    verse: verseOf(k),
    text: corpus.text[gospel][chapterOf(k) - 1][verseOf(k) - 1],
  }));
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
