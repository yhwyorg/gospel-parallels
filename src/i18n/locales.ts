export const LOCALES = ['en', 'es', 'fr', 'pt', 'de', 'ru', 'ar', 'zh-Hans', 'zh-Hant', 'ko', 'tl'] as const;
export type Locale = (typeof LOCALES)[number];

export interface Translation {
  /** The translation's own name, as its publisher gives it. */
  name: string;
  /** Short tag after copied text, like "(WEB)". */
  abbr: string;
  url: string;
  /** Licence line shown in the footer, the About page and the book's credits page. */
  licence: string;
  /** Present only where the licence requires attribution beyond naming the translation. */
  attribution?: string;
}

export interface LocaleInfo {
  /** The language's name in itself, for the language menu. */
  native: string;
  dir: 'ltr' | 'rtl';
  /** Quotation marks the notes use around Scripture; the tests check every quote against the text. */
  quotes: [string, string];
  /** Paper size of the downloadable PDF: Letter where it is the usual size, A4 elsewhere. */
  paper: 'Letter' | 'A4';
  translation: Translation;
}

const PD = 'Public domain';

// Licences were checked against each translation's page on eBible.org, where the
// texts come from. Tagalog is the only one with conditions (CC BY-SA 4.0): it must
// carry this credit and be shared under the same licence, including in the book.
export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: {
    native: 'English', dir: 'ltr', quotes: ['“', '”'], paper: 'Letter',
    translation: { name: 'World English Bible', abbr: 'WEB', url: 'https://worldenglish.bible/', licence: PD },
  },
  es: {
    native: 'Español', dir: 'ltr', quotes: ['«', '»'], paper: 'Letter',
    translation: { name: 'Reina-Valera 1909', abbr: 'RV1909', url: 'https://ebible.org/find/details.php?id=spaRV1909', licence: PD },
  },
  fr: {
    native: 'Français', dir: 'ltr', quotes: ['«', '»'], paper: 'A4',
    translation: { name: 'Louis Segond 1910', abbr: 'LSG', url: 'https://ebible.org/find/details.php?id=fraLSG', licence: PD },
  },
  pt: {
    native: 'Português', dir: 'ltr', quotes: ['“', '”'], paper: 'A4',
    translation: { name: 'Bíblia Portuguesa Mundial', abbr: 'BPM', url: 'https://ebible.org/find/details.php?id=porbrbsl', licence: PD },
  },
  de: {
    native: 'Deutsch', dir: 'ltr', quotes: ['„', '“'], paper: 'A4',
    translation: { name: 'Lutherbibel 1912', abbr: 'Luther 1912', url: 'https://ebible.org/find/details.php?id=deu1912', licence: PD },
  },
  ru: {
    native: 'Русский', dir: 'ltr', quotes: ['«', '»'], paper: 'A4',
    translation: { name: 'Синодальный перевод', abbr: 'СП', url: 'https://ebible.org/find/details.php?id=russyn', licence: PD },
  },
  ar: {
    native: 'العربية', dir: 'rtl', quotes: ['«', '»'], paper: 'A4',
    translation: { name: 'ترجمة فان دايك', abbr: 'SVD', url: 'https://ebible.org/find/details.php?id=arb-vd', licence: PD },
  },
  'zh-Hans': {
    native: '简体中文', dir: 'ltr', quotes: ['「', '」'], paper: 'A4',
    translation: { name: '新标点和合本', abbr: '和合本', url: 'https://ebible.org/find/details.php?id=cmn-cu89s', licence: PD },
  },
  'zh-Hant': {
    native: '繁體中文', dir: 'ltr', quotes: ['「', '」'], paper: 'A4',
    translation: { name: '新標點和合本', abbr: '和合本', url: 'https://ebible.org/find/details.php?id=cmn-cu89t', licence: PD },
  },
  ko: {
    native: '한국어', dir: 'ltr', quotes: ['“', '”'], paper: 'A4',
    // eBible.org lists this file as the 1910 translation, but its spelling is that of
    // the 1961 revision (개역한글): 사랑하사, 주셨으니, 믿는, where 1910-era text has
    // 사랑하샤, 주셧스니, 밋는. It is named for what it is. The 1961 revision is
    // generally held to have left copyright at the end of 2011 (Korea's 50-year term
    // for works by organisations); eBible.org also lists the file as public domain.
    translation: { name: '개역한글판', abbr: '개역한글', url: 'https://ebible.org/find/details.php?id=kor', licence: PD },
  },
  tl: {
    native: 'Tagalog', dir: 'ltr', quotes: ['“', '”'], paper: 'Letter',
    translation: {
      name: 'Tagalog Unlocked Literal Bible',
      abbr: 'ULB',
      url: 'https://ebible.org/find/details.php?id=tglulb',
      licence: 'CC BY-SA 4.0',
      attribution:
        'Tagalog Bible © 2018 Door43 World Missions Community, licensed under Creative Commons Attribution-ShareAlike 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). The Gospels are reproduced unchanged.',
    },
  },
};

export const isLocale = (s: unknown): s is Locale => LOCALES.includes(s as Locale);

/**
 * Picks a language from the browser's preferences. The browser's language says what
 * the reader reads; their location does not (a Spanish speaker in Canada, a traveller
 * abroad), and location would need a server this static site does not have.
 */
export function fromBrowser(preferred: readonly string[]): Locale {
  for (const tag of preferred) {
    const [lang, ...rest] = tag.toLowerCase().split('-');
    if (lang === 'zh') {
      // Script decides which Chinese; regions that use traditional characters imply it.
      return rest.some((p) => ['hant', 'tw', 'hk', 'mo'].includes(p)) ? 'zh-Hant' : 'zh-Hans';
    }
    if (lang === 'fil') return 'tl';
    const hit = LOCALES.find((l) => l === lang);
    if (hit) return hit;
  }
  return 'en';
}

const KEY = 'pref:locale';

/** An explicit ?lang= wins, then the reader's earlier choice, then the browser. */
export function initialLocale(): Locale {
  const asked = new URLSearchParams(location.search).get('lang');
  if (isLocale(asked)) {
    remember(asked);
    return asked;
  }
  try {
    const saved = localStorage.getItem(KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* storage blocked: fall through to the browser's languages */
  }
  return fromBrowser(navigator.languages?.length ? navigator.languages : [navigator.language]);
}

export function remember(locale: Locale) {
  try {
    localStorage.setItem(KEY, locale);
  } catch {
    /* the choice just won't persist */
  }
}
