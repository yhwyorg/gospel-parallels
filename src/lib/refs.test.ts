import { describe, expect, it } from 'vitest';
import text from '../data/text/en.json';
import { lengthsOf, type TextFile } from './corpus';
import { formatPassage, parseLookup, parseRanges, RefError } from './refs';
import en from '../i18n/dict/en';
import { matcher, sharedWords } from './shared';

const english = matcher('en', en.stopWords, en.minWordLength);

const lengths = lengthsOf((text as TextFile).books);
const look = (s: string) => formatPassage(parseLookup(s, lengths));

describe('parseLookup', () => {
  it.each([
    ['Mk 4:35-41', 'Mark 4:35-41'],
    ['john 3:16', 'John 3:16'],
    ['Matt. 5:1-7:29', 'Matthew 5:1-7:29'],
    ['Luke 15', 'Luke 15:1-32'],
    ['Jn 7:53–8:11', 'John 7:53-8:11'],
  ])('%s -> %s', (input, want) => expect(look(input)).toBe(want));

  // Each of these must fail loudly; an empty result would read as "no parallels".
  it.each([
    ['Romans 8:1', /not one of the four Gospels/],
    ['1 John 1:1', /not one of the four Gospels/],
    ['Mark 17:1', /no chapter 17/],
    ['Mark 4:99', /has 41 verses, not 99/],
    ['Mark 4:41-35', /runs backwards/],
    ['Mark', /Add a chapter/],
  ])('%s is refused', (input, msg) => expect(() => look(input)).toThrow(msg));

  it('refuses a bare chapter in the section table, where chapter lengths are not known', () => {
    expect(() => parseRanges('5')).toThrow(RefError);
  });
});

describe('shared wording', () => {
  it('ignores common words and counts each account once', () => {
    const shared = sharedWords(['The wind ceased and the wind obeyed.', 'He rebuked the wind.', 'The sea was calm.'], english);
    expect([...shared]).toEqual([['wind', 2]]);
  });

  it('keeps punctuation outside highlighted words', () => {
    expect(english.tokens('“Peace, be still!”')).toEqual([
      { text: '“' }, { text: 'Peace', word: 'peace' }, { text: ', ' },
      { text: 'be', word: 'be' }, { text: ' ' }, { text: 'still', word: 'still' }, { text: '!”' },
    ]);
  });
});
