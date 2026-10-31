import { DAY_OF, PERIODS, type Day, type PeriodKey } from '../data/timeline';
import type { Corpus, IndexedSection } from './corpus';
import { GOSPELS, type Gospel } from './refs';

export interface TimelineColumn {
  section: IndexedSection;
  period: PeriodKey;
  day?: Day;
  /**
   * Per Gospel that has this section: the section it follows in that Gospel's own
   * order, when the Gospel tells it at a different point from the harmony (the
   * temple cleansing in Matthew, Mark and Luke). Absent where it is told in order.
   */
  elsewhere: Partial<Record<Gospel, IndexedSection | null>>;
}

/**
 * The harmony as timeline columns. A Gospel that tells a section out of the
 * harmony's order is flagged rather than silently drawn in the harmony's place,
 * which would show Mark cleansing the temple at the start of the ministry.
 *
 * "Out of order" is what remains after the longest run of that Gospel's sections
 * that does follow the harmony: the smallest set whose removal leaves the rest in
 * sequence. Where two such sets are equally small, either may be shown.
 */
export function buildTimeline(corpus: Corpus): TimelineColumn[] {
  const displaced = Object.fromEntries(GOSPELS.map((g) => [g, outOfOrder(corpus.sequence[g])])) as Record<
    Gospel,
    Set<string>
  >;
  const starts = new Map<string, PeriodKey>(PERIODS.map((p) => [p.first, p.key]));
  let period: PeriodKey = PERIODS[0].key;
  return corpus.sections.map((section) => {
    period = starts.get(section.id) ?? period;
    const elsewhere: TimelineColumn['elsewhere'] = {};
    for (const g of GOSPELS) {
      if (displaced[g].has(section.id)) elsewhere[g] = corpus.sequence[g][section.position[g]! - 1] ?? null;
    }
    return { section, period, day: DAY_OF[section.id], elsewhere };
  });
}

/** Ids of the sections outside the longest subsequence that is in harmony order. */
function outOfOrder(seq: IndexedSection[]): Set<string> {
  // Patience sorting: tails[k] is the index in seq ending the best run of length k+1.
  const tails: number[] = [];
  const prev: number[] = new Array(seq.length).fill(-1);
  seq.forEach((s, i) => {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (seq[tails[mid]].number < s.number) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0) prev[i] = tails[lo - 1];
    tails[lo] = i;
  });
  const keep = new Set<string>();
  for (let i = tails.at(-1) ?? -1; i >= 0; i = prev[i]) keep.add(seq[i].id);
  return new Set(seq.filter((s) => !keep.has(s.id)).map((s) => s.id));
}
