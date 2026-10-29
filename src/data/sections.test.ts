import { describe, expect, it } from 'vitest';
import text from './gospels.json';
import { sections } from './sections';
import { buildCorpus, lengthsOf, sectionsFor, versesOf, type GospelText } from '../lib/corpus';
import { GOSPELS, formatRange, key, parseRanges, versesIn } from '../lib/refs';

const corpus = buildCorpus(text as GospelText);
const lengths = lengthsOf(text as GospelText);

describe('gospel text', () => {
  it('has every verse of the four Gospels', () => {
    const counts = GOSPELS.map((g) => lengths[g].reduce((a, b) => a + b, 0));
    expect(counts).toEqual([1071, 678, 1151, 879]);
  });
});

describe('sections', () => {
  it('all references resolve to real verses', () => {
    // buildCorpus throws on any bad reference; reaching here means none.
    expect(corpus.sections.length).toBe(sections.length);
  });

  const coverage = (list: typeof corpus.sections, g: (typeof GOSPELS)[number]) => {
    const owner = new Map<number, string[]>();
    for (const s of list) {
      for (const k of versesIn(s.ranges[g] ?? [], lengths[g])) owner.set(k, [...(owner.get(k) ?? []), s.id]);
    }
    const all = versesIn(parseRanges(`1:1-${lengths[g].length}:${lengths[g].at(-1)}`), lengths[g]);
    const gaps = all.filter((k) => !owner.has(k)).map((k) => formatRange({ start: k, end: k }));
    const doubled = [...owner].filter(([, ids]) => ids.length > 1).map(([k, ids]) => `${formatRange({ start: k, end: k })} ${ids}`);
    return { checked: all.length, gaps, doubled };
  };

  it.each(GOSPELS)('%s: every verse is in exactly one section', (g) => {
    const { checked, gaps, doubled } = coverage(corpus.sections, g);
    // An empty verse list would also report no gaps; make sure every verse was looked at.
    expect(checked).toBe(lengths[g].reduce((a, b) => a + b, 0));
    expect({ gaps, doubled }).toEqual({ gaps: [], doubled: [] });
  });

  it('the coverage check does catch a missing section', () => {
    const without = corpus.sections.filter((s) => s.id !== 'calming-storm');
    expect(coverage(without, 'mark').gaps).toEqual(['4:35', '4:36', '4:37', '4:38', '4:39', '4:40', '4:41']);
  });

  it('derives order from the text, so no two sections share a position', () => {
    // The 2025 data hand-numbered the order and used 19-22 twice each.
    for (const g of GOSPELS) {
      const positions = corpus.sequence[g].map((s) => s.position[g]);
      expect(positions).toEqual([...positions.keys()]);
    }
  });

  it('places the temple cleansing early in John and late in Mark', () => {
    const s = corpus.byId.get('temple-cleansing')!;
    expect(s.position.john! / corpus.sequence.john.length).toBeLessThan(0.15);
    expect(s.position.mark! / corpus.sequence.mark.length).toBeGreaterThan(0.6);
  });

  it('spot-checks that references point at the right story', () => {
    const has = (id: string, g: (typeof GOSPELS)[number], word: RegExp) => {
      const s = corpus.byId.get(id)!;
      const t = versesOf(corpus, g, s.ranges[g]!).map((v) => v.text).join(' ');
      expect(t, `${id} in ${g}`).toMatch(word);
    };
    for (const g of GOSPELS) has('feeding-5000', g, /five thousand/i);
    has('calming-storm', 'mark', /wind/i);
    has('prodigal-son', 'luke', /younger/i);
    has('lazarus', 'john', /Lazarus, come out/i);
    has('temple-cleansing', 'john', /changers of money/i);
    has('lords-prayer', 'matthew', /Our Father/);
    has('bethany-anointing', 'john', /Mary/);
    has('sentenced', 'john', /sixth hour/);
  });
});

describe('sectionsFor', () => {
  it('finds the parallels for a single verse', () => {
    const found = sectionsFor(corpus, { gospel: 'mark', ranges: [{ start: key(4, 39), end: key(4, 39) }] });
    expect(found.map((s) => s.id)).toEqual(['calming-storm']);
    expect(Object.keys(found[0].ranges)).toEqual(['matthew', 'mark', 'luke']);
  });
});
