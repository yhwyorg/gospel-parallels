import { createContext, useContext } from 'react';
import { sections, type Section } from '../data/sections';
import { buildCorpus, type Corpus, type TextFile } from '../lib/corpus';
import type { Gospel } from '../lib/refs';
import { matcher, type Matcher } from '../lib/shared';
import { BOOKS } from './books';
import type { Dict } from './dict';
import { LOCALE_INFO, type Locale, type LocaleInfo } from './locales';

export interface I18n {
  locale: Locale;
  info: LocaleInfo;
  t: Dict;
  names: Record<Gospel, string>;
  abbr: Record<Gospel, string>;
  /** "Mark or John", in this language. */
  orList: (items: string[]) => string;
  /** The licence as worded in this language. */
  licence: string;
  matcher: Matcher;
  corpus: Corpus;
}

const Ctx = createContext<I18n | null>(null);
export const I18nProvider = Ctx.Provider;

export function useI18n(): I18n {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n outside I18nProvider');
  return v;
}

// Each language's text (~0.4-0.8 MB) and dictionary is its own chunk, fetched only
// when that language is chosen.
const dicts = import.meta.glob<{ default: Dict }>('./dict/*.tsx');
const texts = import.meta.glob<{ default: TextFile }>('../data/text/*.json');

export async function loadLocale(locale: Locale): Promise<I18n> {
  const d = dicts[`./dict/${locale}.tsx`];
  const x = texts[`../data/text/${locale}.json`];
  if (!d || !x) throw new Error(`no ${!d ? 'dictionary' : 'text'} for ${locale}`);
  const [{ default: t }, { default: text }] = await Promise.all([d(), x()]);
  return assemble(locale, t, text);
}

export function assemble(locale: Locale, t: Dict, text: TextFile): I18n {
  const info = LOCALE_INFO[locale];
  // en-GB rather than en: the site's English has never used the serial comma ("Mark or John").
  const list = new Intl.ListFormat(locale === 'en' ? 'en-GB' : locale, { type: 'disjunction' });
  return {
    locale,
    info,
    t,
    names: BOOKS[locale].names,
    abbr: BOOKS[locale].abbr,
    orList: (items) => list.format(items),
    licence: info.translation.licence === 'Public domain' ? t.publicDomain : info.translation.licence,
    matcher: matcher(locale, t.stopWords, t.minWordLength),
    corpus: buildCorpus(text, localise(sections, t, locale)),
  };
}

/**
 * Section table with this language's titles and notes. A missing title throws
 * rather than falling back to English: a stray English title in a translated list
 * looks like a finished translation and would never be noticed.
 */
export function localise(list: Section[], t: Dict, locale: string): Section[] {
  return list.map((s) => {
    const title = t.titles[s.id];
    if (!title) throw new Error(`${locale}: no title for section "${s.id}"`);
    if (s.note && !t.notes[s.id]) throw new Error(`${locale}: no note for section "${s.id}"`);
    return { ...s, title, note: s.note && t.notes[s.id] };
  });
}
