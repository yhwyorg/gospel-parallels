/**
 * Finds words that occur in more than one account of a section, so the reader can
 * see at a glance where the accounts share wording.
 *
 * This compares one translation, not the Greek. It is a reading aid that points
 * the eye; it is not a source-critical analysis, and the UI says so.
 */

export interface Token {
  text: string;
  /** Normalised form, present on words that can be matched. */
  word?: string;
}

export interface Matcher {
  wordsOf(text: string): Set<string>;
  tokens(text: string): Token[];
}

/**
 * A word matcher for one language.
 *
 * stop: words too common to mean anything. Without a stop list nearly every word in
 * every column lights up and the shading tells the reader nothing.
 * minLength: shorter words are ignored (in characters; Chinese and Korean words are short).
 */
export function matcher(locale: string, stop: Iterable<string>, minLength: number): Matcher {
  const norm = (w: string) => normalise(w, locale);
  const stops = new Set([...stop].map(norm));
  // Intl.Segmenter finds word boundaries in scripts written without spaces (Chinese)
  // and separates punctuation everywhere. Where a browser lacks it, words are split on
  // spaces, which is still right for every language here except Chinese.
  const seg = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(locale, { granularity: 'word' }) : undefined;

  const tokens = (text: string): Token[] => {
    const out: Token[] = [];
    const push = (t: Token) => {
      const last = out.at(-1);
      // Adjacent punctuation and spaces are kept together, so a highlight never splits them.
      if (!t.word && last && !last.word) last.text += t.text;
      else out.push(t);
    };
    if (seg) {
      for (const s of seg.segment(text)) push(s.isWordLike ? { text: s.segment, word: norm(s.segment) } : { text: s.segment });
    } else {
      for (const chunk of text.split(/(\s+)/)) {
        const m = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/su.exec(chunk)!;
        if (m[1]) push({ text: m[1] });
        if (m[2]) push({ text: m[2], word: norm(m[2]) });
        if (m[3]) push({ text: m[3] });
      }
    }
    return out;
  };

  const wordsOf = (text: string) => {
    const out = new Set<string>();
    for (const t of tokens(text)) {
      if (t.word && [...t.word].length >= minLength && !stops.has(t.word)) out.add(t.word);
    }
    return out;
  };

  return { tokens, wordsOf };
}

/**
 * Form used for matching: lowercase, accents and Arabic vowel marks removed (the Van
 * Dyck text is fully vocalised, so the same word can carry different marks).
 * English also folds curly apostrophes and drops a trailing 's.
 */
export function normalise(word: string, locale = 'en'): string {
  let w = word.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC').toLowerCase().replace(/’/g, "'");
  if (locale === 'en') w = w.replace(/'s$/, '');
  return w.replace(/[^\p{L}\p{N}']/gu, '');
}

/** word -> number of accounts it appears in, for words in at least two accounts. */
export function sharedWords(accounts: string[], m: Matcher): Map<string, number> {
  const counts = new Map<string, number>();
  for (const a of accounts) for (const w of m.wordsOf(a)) counts.set(w, (counts.get(w) ?? 0) + 1);
  for (const [w, n] of counts) if (n < 2) counts.delete(w);
  return counts;
}
