import type { ReactNode } from 'react';
import type { Gospel, RefProblem } from '../lib/refs';

/**
 * Everything the site says, for one language. src/i18n/dict/en.tsx is the source;
 * every other language implements the same shape, and TypeScript refuses a file
 * that leaves anything out. Section titles and notes are checked by the tests,
 * since their keys are section ids rather than types.
 *
 * Arguments named after Gospels (g, a, b) are already-translated Gospel names.
 * Lists of names arrive already joined ("Mark or John") by Intl.ListFormat.
 */
export interface Dict {
  siteName: string;
  /** Under the site name, and the home page heading. */
  tagline: string;
  nav: { sections: string; order: string; book: string; about: string };
  language: string;
  lookup: { label: string; placeholder: string; go: string };
  loading: string;
  loadFailed: (message: string) => ReactNode;
  /** Footer credit. `link` is the translation's name, linked; `licence` is already worded. */
  footer: (link: ReactNode, licence: string) => ReactNode;
  publicDomain: string;

  home: {
    intro: string;
    filterGroup: string;
    filterLabel: string;
    filterPlaceholder: string;
    order: string;
    harmony: string;
    asTold: (g: string) => string;
    onlyShared: string;
    count: (n: number, total: number) => string;
    noMatch: (filter: string) => string;
  };

  reader: {
    notFound: (id: string) => string;
    seeAll: string;
    shade: string;
    numbers: string;
    copyAll: string;
    copy: string;
    copied: string;
    copyFailed: string;
    print: string;
    shadeIntro: string;
    in2: string;
    in3: string;
    in4: string;
    /** Must say the comparison is of words in one translation, not the Greek. */
    shadeCaveat: string;
    jumpLabel: string;
    /** `names` is a joined "or" list of the Gospels that lack this section. */
    notIn: (names: string) => string;
    /** Shown in place of a verse the translation does not include. */
    omitted: (translation: string) => string;
    sectionOf: (i: number, n: number, g: string) => string;
    beginning: (g: string) => string;
    end: (g: string) => string;
  };

  passage: {
    /** `mark` wraps text in the same shading as the looked-up verses. */
    found: (ref: ReactNode, mark: (text: string) => ReactNode) => ReactNode;
    spans: (n: number, g: string) => string;
    notFound: (query: string) => string;
    problem: (p: RefProblem, names: Record<Gospel, string>) => string;
  };

  order: {
    docTitle: (a: string, b: string) => string;
    title: string;
    intro: string;
    left: string;
    right: string;
    summary: (a: string, na: number, b: string, nb: number, both: number) => string;
    same: string;
    one: string;
    many: (n: number) => string;
    position: (pa: number, na: number, a: string, pb: number, nb: number, b: string) => string;
    tie: string;
    legend: { label: string; same: string; notable: string; focus: string; sample: string; both: string; only: string };
    lane: (g: string) => string;
  };

  /** The dedication, shared by the About page and the book. */
  Dedication: () => ReactNode;
  /** The rest of the About page, after the dedication. */
  About: (h: AboutHelpers) => ReactNode;

  book: {
    docTitle: string;
    heading: string;
    intro: string;
    download: (pages: number, megabytes: string) => string;
    paper: (size: string) => string;
    print: string;
    /** Shown where the PDF has not been built, e.g. when running the site locally. */
    notBuilt: string;
    scripture: (translation: string) => string;
    howToHeading: string;
    HowTo: (h: AboutHelpers) => ReactNode;
    contents: string;
    indexHeading: string;
    indexIntro: string;
    creditsHeading: string;
    Credits: (h: AboutHelpers & { date: string }) => ReactNode;
  };

  /** Section titles by section id; every section needs one. */
  titles: Record<string, string>;
  /** Section notes by section id; exactly the sections that have an English note. */
  notes: Record<string, string>;

  /** Common words left unshaded by "Shade shared words". */
  stopWords: string[];
  /** Shorter words are never shaded (in characters). */
  minWordLength: number;
}

export interface AboutHelpers {
  href: {
    home: () => string;
    passage: (q: string) => string;
    order: (a: Gospel, b: Gospel) => string;
    book: () => string;
  };
  names: Record<Gospel, string>;
  /** The translation's name, linked to its source. */
  translation: ReactNode;
  licence: string;
  /** Extra attribution the licence requires, if any. */
  attribution?: string;
}
