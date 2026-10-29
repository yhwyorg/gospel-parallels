/**
 * Finds English words that occur in more than one account of a section, so the
 * reader can see at a glance where the accounts share wording.
 *
 * This compares an English translation, not the Greek. It is a reading aid that
 * points the eye; it is not a source-critical analysis, and the UI says so.
 */

// Without a stop list nearly every word in every column lights up and the
// highlighting tells the reader nothing.
const STOP = new Set(
  `the and of to a in that he him his it is was for with they them their you your but not be as on said
  this have who all were are by from had when one at so there what an or which then will i me my we us our
  she her its if no up out into also do did has been would shall may now came come went even these those
  because than unto upon how why where also very let what whoever whatever about over after before
  much other another himself herself themselves any some such saying says`
    .split(/\s+/)
    .filter(Boolean),
);

/** Normalised form used for matching: lowercase, curly apostrophes folded, trailing 's dropped. */
export function normalise(word: string): string {
  return word.toLowerCase().replace(/[’']/g, "'").replace(/'s$/, '').replace(/[^a-z']/g, '');
}

export function wordsOf(text: string): Set<string> {
  const out = new Set<string>();
  for (const raw of text.split(/\s+/)) {
    const w = normalise(raw);
    if (w.length >= 3 && !STOP.has(w)) out.add(w);
  }
  return out;
}

/** word -> number of accounts it appears in, for words in at least two accounts. */
export function sharedWords(accounts: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const a of accounts) for (const w of wordsOf(a)) counts.set(w, (counts.get(w) ?? 0) + 1);
  for (const [w, n] of counts) if (n < 2) counts.delete(w);
  return counts;
}

/** Splits text into word and non-word runs, so words can be wrapped without losing punctuation. */
export function tokens(text: string): { text: string; word?: string }[] {
  return text.split(/(\s+)/).flatMap((chunk) => {
    if (/^\s*$/.test(chunk)) return [{ text: chunk }];
    // Keep leading/trailing punctuation outside the highlight.
    const m = /^([^A-Za-z’']*)(.*?)([^A-Za-z’']*)$/.exec(chunk)!;
    return [m[1] && { text: m[1] }, m[2] && { text: m[2], word: normalise(m[2]) }, m[3] && { text: m[3] }].filter(
      Boolean,
    ) as { text: string; word?: string }[];
  });
}
