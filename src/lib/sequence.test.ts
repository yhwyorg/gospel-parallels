import { describe, expect, it } from 'vitest';
import text from '../data/text/en.json';
import { buildCorpus, type TextFile } from './corpus';
import { GOSPELS, type Gospel } from './refs';
import { relocated } from './sequence';

const corpus = buildCorpus(text as TextFile);
const moved = (a: Gospel, b: Gospel) => [...relocated(corpus, a, b)];

describe('relocated', () => {
  it('does not flag sections that keep their relative order (Mark and John, final week)', () => {
    // The first version compared percentage positions and flagged these, because
    // John's long farewell discourse shifts every percentage without moving anything.
    expect(moved('mark', 'john')).not.toContain('denial-foretold');
    expect(moved('mark', 'john')).not.toContain('betrayer-foretold');
  });

  it('picks out the temple cleansing first between Mark and John', () => {
    expect(moved('mark', 'john')[0]).toBe('temple-cleansing');
  });

  it("picks out Luke's best-known relocations from Mark", () => {
    expect(moved('mark', 'luke')).toEqual(expect.arrayContaining(['nazareth-rejection', 'great-commandment', 'calling-fishermen']));
  });

  it('is symmetric in what it finds for a pair', () => {
    expect(moved('john', 'mark').length).toBe(moved('mark', 'john').length);
  });

  it('leaves no crossings once the flagged sections are set aside', () => {
    for (const a of GOSPELS) {
      for (const b of GOSPELS) {
        if (a === b) continue;
        const flagged = relocated(corpus, a, b);
        const rest = corpus.sequence[a].filter((s) => s.position[b] !== undefined && !flagged.has(s.id));
        const bOrder = rest.map((s) => s.position[b]!);
        expect(bOrder, `${a} vs ${b}`).toEqual([...bOrder].sort((x, y) => x - y));
      }
    }
  });

  it('prints the result for each pair (for review)', () => {
    for (const [i, a] of GOSPELS.entries()) for (const b of GOSPELS.slice(i + 1)) console.log(a, b, moved(a, b).join(' '));
  });
});
