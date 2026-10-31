import type { Gospel } from '../lib/refs';
import type { Locale } from './locales';

export interface BookNames {
  /** Column headings and running text. */
  names: Record<Gospel, string>;
  /** Short forms in the section list and references. */
  abbr: Record<Gospel, string>;
  /** Extra spellings the lookup box accepts, beyond the name and abbreviation. */
  aliases: Record<Gospel, string[]>;
}

// Kept in one file rather than in each language's dictionary because the lookup box
// accepts every language's names at once: a reader on the Spanish site who types
// "Mark 4:35" should still land on Mark, and that needs every table loaded.
export const BOOKS: Record<Locale, BookNames> = {
  en: {
    names: { matthew: 'Matthew', mark: 'Mark', luke: 'Luke', john: 'John' },
    abbr: { matthew: 'Mt', mark: 'Mk', luke: 'Lk', john: 'Jn' },
    aliases: { matthew: ['matt', 'mat'], mark: ['mrk', 'mar', 'mr'], luke: ['luk', 'lu'], john: ['jhn', 'joh'] },
  },
  es: {
    names: { matthew: 'Mateo', mark: 'Marcos', luke: 'Lucas', john: 'Juan' },
    abbr: { matthew: 'Mt', mark: 'Mc', luke: 'Lc', john: 'Jn' },
    aliases: { matthew: ['san mateo'], mark: ['mr', 'san marcos'], luke: ['san lucas'], john: ['san juan'] },
  },
  fr: {
    names: { matthew: 'Matthieu', mark: 'Marc', luke: 'Luc', john: 'Jean' },
    abbr: { matthew: 'Mt', mark: 'Mc', luke: 'Lc', john: 'Jn' },
    aliases: { matthew: ['matth'], mark: [], luke: [], john: [] },
  },
  pt: {
    names: { matthew: 'Mateus', mark: 'Marcos', luke: 'Lucas', john: 'João' },
    abbr: { matthew: 'Mt', mark: 'Mc', luke: 'Lc', john: 'Jo' },
    aliases: { matthew: [], mark: [], luke: [], john: [] },
  },
  de: {
    names: { matthew: 'Matthäus', mark: 'Markus', luke: 'Lukas', john: 'Johannes' },
    abbr: { matthew: 'Mt', mark: 'Mk', luke: 'Lk', john: 'Joh' },
    aliases: { matthew: ['matth'], mark: ['mark'], luke: [], john: [] },
  },
  ru: {
    names: { matthew: 'Матфей', mark: 'Марк', luke: 'Лука', john: 'Иоанн' },
    abbr: { matthew: 'Мф', mark: 'Мк', luke: 'Лк', john: 'Ин' },
    aliases: {
      matthew: ['от матфея', 'матфея', 'матф', 'мт'],
      mark: ['от марка', 'марка'],
      luke: ['от луки', 'луки'],
      john: ['от иоанна', 'иоанна', 'иоан'],
    },
  },
  ar: {
    names: { matthew: 'متى', mark: 'مرقس', luke: 'لوقا', john: 'يوحنا' },
    abbr: { matthew: 'مت', mark: 'مر', luke: 'لو', john: 'يو' },
    aliases: { matthew: ['متي'], mark: [], luke: [], john: [] },
  },
  'zh-Hans': {
    names: { matthew: '马太福音', mark: '马可福音', luke: '路加福音', john: '约翰福音' },
    abbr: { matthew: '太', mark: '可', luke: '路', john: '约' },
    aliases: { matthew: ['马太'], mark: ['马可'], luke: ['路加'], john: ['约翰'] },
  },
  'zh-Hant': {
    names: { matthew: '馬太福音', mark: '馬可福音', luke: '路加福音', john: '約翰福音' },
    abbr: { matthew: '太', mark: '可', luke: '路', john: '約' },
    aliases: { matthew: ['馬太'], mark: ['馬可'], luke: ['路加'], john: ['約翰'] },
  },
  ko: {
    names: { matthew: '마태복음', mark: '마가복음', luke: '누가복음', john: '요한복음' },
    abbr: { matthew: '마', mark: '막', luke: '눅', john: '요' },
    aliases: { matthew: ['마태'], mark: ['마가'], luke: ['누가'], john: ['요한'] },
  },
  tl: {
    names: { matthew: 'Mateo', mark: 'Marcos', luke: 'Lucas', john: 'Juan' },
    abbr: { matthew: 'Mt', mark: 'Mc', luke: 'Lc', john: 'Jn' },
    aliases: { matthew: [], mark: [], luke: [], john: [] },
  },
};

/** Lowercase, accents and Arabic vowel marks removed, spaces and dots dropped. */
export function foldName(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC').toLowerCase().replace(/[.\s]/g, '');
}

let table: Map<string, Gospel> | undefined;

/** Every accepted spelling in every language, folded. */
export function bookAliases(): Map<string, Gospel> {
  if (table) return table;
  table = new Map();
  for (const b of Object.values(BOOKS)) {
    for (const g of Object.keys(b.names) as Gospel[]) {
      for (const s of [b.names[g], b.abbr[g], ...b.aliases[g]]) table.set(foldName(s), g);
    }
  }
  return table;
}
