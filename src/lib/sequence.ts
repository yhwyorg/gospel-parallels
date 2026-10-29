import type { Corpus, IndexedSection } from './corpus';
import type { Gospel } from './refs';

export interface Link {
  s: IndexedSection;
  /** How many other shared sections this one is told in the opposite order to. */
  crossings: number;
}

/**
 * Sections shared by two Gospels, each with its count of order reversals.
 *
 * This deliberately compares *relative* order, not position as a share of the
 * book. The first version flagged sections whose percentage position differed,
 * and so reported Peter's denial and the betrayal prediction as "placed
 * differently" in Mark and John, though both tell them in the same order. John
 * simply spends a third of his Gospel on the final week, which shifts every
 * percentage without moving anything.
 */
export function compare(corpus: Corpus, a: Gospel, b: Gospel): Link[] {
  const shared = corpus.sequence[a].filter((s) => s.position[b] !== undefined);
  return shared.map((s) => ({ s, crossings: crossingsWithin(shared, s, a, b) }));
}

const crossingsWithin = (pool: IndexedSection[], s: IndexedSection, a: Gospel, b: Gospel) =>
  pool.filter((t) => t !== s && Math.sign(t.position[a]! - s.position[a]!) !== Math.sign(t.position[b]! - s.position[b]!))
    .length;

/**
 * A small set of sections which, set aside, leaves the two orders agreeing.
 *
 * Raw crossing counts mislead: when Luke moves the Nazareth scene forward it
 * crosses twenty sections, and each of those gains a crossing too, though none
 * of them moved. Removing the worst offender and recounting each time picks out
 * the relocation itself. Where two choices are equally small (did John move
 * the anointing earlier, or the entry later?) the result is one valid answer,
 * which is why the page says "moving these would bring the orders into line"
 * and not "these are the ones that moved".
 */
export function relocated(corpus: Corpus, a: Gospel, b: Gospel): Set<string> {
  let pool = corpus.sequence[a].filter((s) => s.position[b] !== undefined);
  const out = new Set<string>();
  for (;;) {
    let worst: IndexedSection | undefined;
    let most = 0;
    for (const s of pool) {
      const n = crossingsWithin(pool, s, a, b);
      if (n > most) [worst, most] = [s, n];
    }
    if (!worst) return out;
    out.add(worst.id);
    pool = pool.filter((s) => s !== worst);
  }
}
