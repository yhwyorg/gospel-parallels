import { Fragment, type ReactNode } from 'react';
import { useI18n } from '../i18n/context';
import { verseLabel, type Column, type IndexedSection, type Verse } from '../lib/corpus';
import { GOSPELS, formatRange, key, type Gospel, type Passage } from '../lib/refs';
import { Ref } from './SectionList';

/** The Gospels this section is not in, as a sentence; stated outright so "absent" never looks like "failed to load". */
export function AbsentLine({ section }: { section: IndexedSection }) {
  const { t, names, orList } = useI18n();
  const absent = GOSPELS.filter((g) => !section.ranges[g]).map((g) => names[g]);
  return absent.length > 0 ? <p className="absent-line">{t.reader.notIn(orList(absent))}</p> : null;
}

/**
 * The section's accounts in parallel columns. Shared by the reader and the book, so
 * the printed book shows exactly what the site shows.
 */
export function Columns({ section, columns, numbers, shared, target, header, footer, ids }: {
  section: IndexedSection;
  columns: Column[];
  numbers: boolean;
  shared?: Map<string, number>;
  target?: Passage;
  header?: (g: Gospel, verses: Verse[]) => ReactNode;
  footer?: (g: Gospel) => ReactNode;
  /** Give each column an id for the reader's jump links (once per page, so not in the book). */
  ids?: boolean;
}) {
  const { names } = useI18n();
  // Keys sort in reading order, so a verse (or joined span) is marked when it overlaps a looked-up range.
  const inTarget = (g: Gospel, from: number, to: number) =>
    target?.gospel === g && target.ranges.some((r) => r.start <= to && from <= r.end);

  return (
    <div className={`columns n${columns.length}`}>
      {columns.map(({ g, verses }) => (
        <section key={g} id={ids ? `col-${g}` : undefined} className={`column col-${g}`}>
          <header>
            <h2>{names[g]}</h2>
            <span className="col-ref"><Ref>{section.ranges[g]!.map(formatRange).join('; ')}</Ref></span>
            {header?.(g, verses)}
          </header>
          <div className="text">
            {verses.map((v, i) => {
              // A later verse of a joined span is printed with the first, under one number.
              if (v.joinedTo !== undefined) return null;
              const k = key(v.chapter, v.verse);
              const prev = verses.slice(0, i).findLast((x) => x.joinedTo === undefined);
              const chapterStart = !prev || prev.chapter !== v.chapter;
              const hit = inTarget(g, k, v.through ?? k);
              return (
                <Fragment key={k}>
                  {prev && prev.chapter !== v.chapter && <span className="chapter-break" />}
                  <VerseText v={v} numbers={numbers} chapterStart={chapterStart} shared={shared} isTarget={hit} />{' '}
                </Fragment>
              );
            })}
          </div>
          {footer?.(g)}
        </section>
      ))}
    </div>
  );
}

function VerseText({ v, numbers, chapterStart, shared, isTarget }: {
  v: Verse; numbers: boolean; chapterStart: boolean; shared?: Map<string, number>; isTarget: boolean;
}) {
  const { t, info, matcher } = useI18n();
  return (
    <span className={isTarget ? 'verse target' : 'verse'}>
      {numbers && <sup className={chapterStart ? 'vn ch' : 'vn'}><Ref>{verseLabel(v, chapterStart)}</Ref></sup>}
      {v.text === '' ? (
        <span className="omitted">[{t.reader.omitted(info.translation.name)}]</span>
      ) : shared ? (
        matcher.tokens(v.text).map((tk, i) => {
          const n = tk.word ? shared.get(tk.word) : undefined;
          return n ? <mark key={i} className={`hl${Math.min(n, 4)}`}>{tk.text}</mark> : <Fragment key={i}>{tk.text}</Fragment>;
        })
      ) : (
        v.text
      )}
    </span>
  );
}
