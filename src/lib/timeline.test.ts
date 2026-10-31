import { describe, expect, it } from 'vitest';
import text from '../data/text/en.json';
import { DAYS, DAY_OF, PERIODS } from '../data/timeline';
import { buildCorpus, type TextFile } from './corpus';
import { GOSPELS } from './refs';
import { buildTimeline } from './timeline';

const corpus = buildCorpus(text as TextFile);
const columns = buildTimeline(corpus);

describe('timeline', () => {
  it('starts each period at a real section, in harmony order, beginning with the first', () => {
    const numbers = PERIODS.map((p) => corpus.byId.get(p.first)?.number);
    expect(numbers.every(Boolean), `unknown ids: ${PERIODS.filter((p) => !corpus.byId.has(p.first)).map((p) => p.first)}`).toBe(true);
    expect(numbers[0]).toBe(1);
    expect(numbers).toEqual([...numbers].sort((a, b) => a! - b!));
  });

  it('marks days only on real sections, only in the last week onward, and never backwards', () => {
    expect(Object.keys(DAY_OF).filter((id) => !corpus.byId.has(id))).toEqual([]);
    const week = corpus.byId.get('triumphal-entry')!.number;
    const dated = columns.filter((c) => c.day);
    expect(dated.every((c) => c.section.number >= week)).toBe(true);
    const order = dated.map((c) => DAYS.indexOf(c.day!));
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it('flags the temple cleansing as told elsewhere in the Synoptics, and in place in John', () => {
    const c = columns.find((x) => x.section.id === 'temple-cleansing')!;
    expect(Object.keys(c.elsewhere).sort()).toEqual(['luke', 'mark', 'matthew']);
    // In Mark it follows the entry into Jerusalem (and the fig tree).
    expect(c.elsewhere.mark?.number).toBeGreaterThan(corpus.byId.get('triumphal-entry')!.number);
  });

  it('leaves most of each Gospel in harmony order, so a flag stays meaningful', () => {
    // Measured: Matthew 29 of 133, Luke 27 of 148, Mark 5 of 93, John 0 of 55. Matthew
    // gathers teaching into blocks and Luke spreads sayings along the journey, so the
    // harmony cannot follow both; a quarter or more would mean a broken calculation.
    for (const g of GOSPELS) {
      const flagged = columns.filter((c) => g in c.elsewhere).length;
      expect(flagged, g).toBeLessThan(corpus.sequence[g].length * 0.25);
    }
    expect(columns.filter((c) => 'john' in c.elsewhere)).toEqual([]);
  });
});
