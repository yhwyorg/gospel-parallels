import { renderToStaticMarkup } from 'react-dom/server';
import { createElement, type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { sections } from '../data/sections';
import { lengthsOf, type TextFile } from '../lib/corpus';
import { GOSPELS, chapterOf, key, parseLookup, verseOf, versesIn, type Gospel } from '../lib/refs';
import { matcher, sharedWords } from '../lib/shared';
import { BOOKS, foldName } from './books';
import { assemble } from './context';
import type { Dict } from './dict';
import { LOCALES, LOCALE_INFO, fromBrowser } from './locales';
import { aboutHelpers } from './helpers';

const dicts = import.meta.glob<Dict>('./dict/*.tsx', { eager: true, import: 'default' });
const texts = import.meta.glob<TextFile>('../data/text/*.json', { eager: true, import: 'default' });
const en = dicts['./dict/en.tsx'];
const enText = texts['../data/text/en.json'];

/** Letters and digits only, lowercased, marks removed: quotes are compared on wording, not punctuation. */
const fold = (s: string) =>
  s.normalize('NFKC').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

const html = (node: ReactNode) => renderToStaticMarkup(createElement('div', null, node));

/** Every string in the dictionary outside the section tables, for spotting untranslated English. */
function strings(d: Dict): string[] {
  const out: string[] = [];
  const walk = (v: unknown, path: string) => {
    if (['titles', 'notes', 'stopWords'].includes(path)) return;
    if (typeof v === 'string') out.push(v);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k);
  };
  walk(d, '');
  return out;
}

describe('language detection', () => {
  it.each([
    [['en-US'], 'en'],
    [['es-MX', 'en'], 'es'],
    [['zh-TW'], 'zh-Hant'],
    [['zh-Hant-HK'], 'zh-Hant'],
    [['zh-CN'], 'zh-Hans'],
    [['zh'], 'zh-Hans'],
    [['fil-PH'], 'tl'],
    [['it-IT', 'fr-FR'], 'fr'],
    [['ja-JP'], 'en'],
  ])('%j -> %s', (prefs, want) => expect(fromBrowser(prefs)).toBe(want));
});

describe('book names', () => {
  it('never give one spelling to two Gospels', () => {
    const seen = new Map<string, Gospel>();
    const clashes: string[] = [];
    for (const [locale, b] of Object.entries(BOOKS)) {
      for (const g of GOSPELS) {
        for (const s of [b.names[g], b.abbr[g], ...b.aliases[g]]) {
          const f = foldName(s);
          if (seen.has(f) && seen.get(f) !== g) clashes.push(`${locale} "${s}" is ${g} but also ${seen.get(f)}`);
          seen.set(f, g);
        }
      }
    }
    expect(clashes).toEqual([]);
  });
});

describe.each(LOCALES)('%s', (locale) => {
  const t = dicts[`./dict/${locale}.tsx`];
  const text = texts[`../data/text/${locale}.json`];
  const info = LOCALE_INFO[locale];

  it('has a text and a dictionary', () => {
    expect(text, 'src/data/text file').toBeDefined();
    expect(t, 'src/i18n/dict file').toBeDefined();
  });
  if (!t || !text) return;
  const i18n = assemble(locale, t, text);

  it('has the same chapters and verses as the English text', () => {
    expect(lengthsOf(text.books)).toEqual(lengthsOf(enText.books));
  });

  it('never splits a joined verse span across two sections', () => {
    const lengths = lengthsOf(text.books);
    for (const g of GOSPELS) {
      for (const [a, b] of Object.entries(text.joined[g] ?? {})) {
        const [s, e] = [a, b].map((cv) => key(...(cv.split(':').map(Number) as [number, number])));
        const owners = new Set(
          versesIn([{ start: s, end: e }], lengths[g]).map(
            (k) => i18n.corpus.sections.find((x) => x.ranges[g]?.some((r) => k >= r.start && k <= r.end))?.id,
          ),
        );
        expect(owners.size, `${g} ${a}-${b}`).toBe(1);
      }
    }
  });

  it('titles every section, and only real sections', () => {
    expect(Object.keys(t.titles).sort()).toEqual(sections.map((s) => s.id).sort());
    expect(Object.entries(t.titles).filter(([, v]) => !v.trim())).toEqual([]);
  });

  it('has a note for exactly the sections with an English note', () => {
    expect(Object.keys(t.notes).sort()).toEqual(sections.filter((s) => s.note).map((s) => s.id).sort());
  });

  if (locale !== 'en') {
    // A copied-over English string looks finished and would never be noticed.
    it('is translated, not English left in place', () => {
      const same = Object.entries(t.titles).filter(([id, v]) => v === en.titles[id]);
      expect(same.length, `titles still in English: ${same.map(([, v]) => v).join(' | ')}`).toBeLessThanOrEqual(4);
      const ui = strings(t);
      const english = new Set(strings(en));
      const left = ui.filter((s) => english.has(s) && /[a-z]{4}/.test(s) && s !== 'Soli Deo gloria');
      // A few words are genuinely the same in both languages ("Sections" in French), so a
      // handful is allowed; more than that means English was left in place.
      expect(left.length, `interface strings still in English: ${left.join(' | ')}`).toBeLessThanOrEqual(3);
    });
  }

  it('quotes its own translation exactly in the notes', () => {
    const [open, close] = info.quotes;
    const all = fold(Object.values(text.books).flat(2).join(' '));
    const pattern = new RegExp(`${open}([^${close}]+)${close}`, 'g');
    const quotes = Object.entries(t.notes).flatMap(([id, n]) => [...n.matchAll(pattern)].map((m) => [id, m[1]]));
    // As many quotations as the English notes have: a note that dropped its quotation
    // would otherwise pass by having nothing to check.
    expect(quotes.length).toBeGreaterThanOrEqual(4);
    expect(quotes.filter(([, q]) => !all.includes(fold(q)))).toEqual([]);
  });

  it('shades shared words in a meaningful amount, with the stop list doing work', () => {
    const s = i18n.corpus.byId.get('feeding-5000')!;
    const accounts = GOSPELS.map((g) =>
      versesIn(s.ranges[g]!, i18n.corpus.lengths[g]).map((k) => text.books[g][chapterOf(k) - 1][verseOf(k) - 1]).join(' '),
    );
    const shared = sharedWords(accounts, i18n.matcher);
    const unfiltered = sharedWords(accounts, matcher(locale, [], t.minWordLength));
    expect(shared.size, 'words shared between the four accounts').toBeGreaterThanOrEqual(8);
    expect(shared.size, 'the stop list removes common words').toBeLessThan(unfiltered.size * 0.9);
    const words = i18n.matcher.tokens(accounts.join(' ')).filter((x) => x.word);
    const lit = words.filter((x) => shared.has(x.word!)).length / words.length;
    expect(lit, 'share of all words that get shaded').toBeGreaterThan(0.05);
    expect(lit, 'share of all words that get shaded').toBeLessThan(0.6);
  });

  it('finds passages typed with its own book names', () => {
    const lengths = lengthsOf(text.books);
    const b = BOOKS[locale];
    expect(parseLookup(`${b.names.mark} 4:35-41`, lengths).gospel).toBe('mark');
    expect(parseLookup(`${b.abbr.john} 3:16`, lengths).gospel).toBe('john');
    expect(parseLookup(`${b.names.luke}15:20`, lengths).gospel).toBe('luke');
  });

  it('keeps the dedication, and credits its translation wherever Scripture is described', () => {
    const helpers = aboutHelpers(i18n);
    const dedication = html(createElement(t.Dedication));
    expect(dedication).toContain('Soli Deo gloria');
    expect(dedication).toContain('Darrell W. Johnson');
    expect(dedication).toContain('https://www.darrelljohnson.ca/');
    for (const [name, node] of [
      ['About', createElement(t.About, helpers)],
      ['Credits', createElement(t.book.Credits, { ...helpers, date: '2026' })],
      ['footer', t.footer(info.translation.name, i18n.licence)],
    ] as const) {
      const out = html(node);
      expect(out, name).toContain(info.translation.name);
      // The Tagalog licence (CC BY-SA) requires its notice wherever the text is reproduced.
      if (info.translation.attribution && name !== 'footer') expect(out, name).toContain(info.translation.attribution);
    }
    expect(html(createElement(t.book.HowTo, helpers))).toContain(i18n.names.matthew);
  });
});
