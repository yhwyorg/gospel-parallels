import { Fragment, useEffect, useMemo, useState } from 'react';
import { neighbours, versesOf, type Corpus, type IndexedSection, type Verse } from '../lib/corpus';
import { GOSPELS, GOSPEL_NAMES, formatRange, key, type Gospel, type Passage } from '../lib/refs';
import { href } from '../lib/route';
import { sharedWords, tokens } from '../lib/shared';

const OMITTED = 'This verse is not included in the World English Bible text.';

// Per-viewer reading preferences. Storage can be unavailable (private windows,
// blocked site data); the page must work identically without it.
function usePref(name: string, initial: boolean): [boolean, (v: boolean) => void] {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(`pref:${name}`);
      return s === null ? initial : s === '1';
    } catch {
      return initial;
    }
  });
  const set = (next: boolean) => {
    setV(next);
    try {
      localStorage.setItem(`pref:${name}`, next ? '1' : '0');
    } catch {
      /* preference just won't persist */
    }
  };
  return [v, set];
}

export default function Reader({ corpus, id, target }: { corpus: Corpus; id: string; target?: Passage }) {
  const section = corpus.byId.get(id);
  const [highlight, setHighlight] = usePref('highlight', false);
  const [numbers, setNumbers] = usePref('numbers', true);

  useEffect(() => {
    document.title = section ? `${section.title} · Gospel Parallels` : 'Gospel Parallels';
  }, [section]);

  const columns = useMemo(
    () => (section ? GOSPELS.map((g) => ({ g, verses: section.ranges[g] ? versesOf(corpus, g, section.ranges[g]!) : null })) : []),
    [corpus, section],
  );
  const present = columns.filter((c) => c.verses);
  const shared = useMemo(
    () => sharedWords(present.map((c) => c.verses!.map((v) => v.text).join(' '))),
    [present],
  );

  if (!section) {
    return (
      <div className="status error" role="alert">
        There is no section called “{id}”. <a href={href.home()}>See all sections</a>.
      </div>
    );
  }

  const absent = columns.filter((c) => !c.verses).map((c) => GOSPEL_NAMES[c.g]);
  const copyAll = present.map((c) => plain(c.g, section, c.verses!)).join('\n\n');

  return (
    <article className="reader">
      <h1>{section.title}</h1>
      {section.note && <p className="note">{section.note}</p>}

      <div className="toolbar reader-tools">
        <label className="check">
          <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} disabled={present.length < 2} />
          Mark shared wording
        </label>
        <label className="check">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
          Verse numbers
        </label>
        <CopyButton text={copyAll} label="Copy all" />
        <button type="button" onClick={() => print()}>Print</button>
      </div>
      {highlight && present.length > 1 && (
        <p className="hint">
          Shaded words appear in more than one account; darker means more accounts. This compares English words, not
          the Greek, so treat it as a pointer for the eye.
        </p>
      )}

      {present.length > 1 && (
        <nav className="jump" aria-label="Jump to a Gospel">
          {present.map((c) => (
            <a key={c.g} href={`#col-${c.g}`} className={`ref-${c.g}`} onClick={(e) => jump(e, c.g)}>
              {GOSPEL_NAMES[c.g]}
            </a>
          ))}
        </nav>
      )}

      {absent.length > 0 && (
        // Stated outright so "not in this Gospel" never looks like "failed to load".
        <p className="absent-line">Not in {absent.join(', ').replace(/, ([^,]*)$/, ' or $1')}.</p>
      )}

      <div className={`columns n${present.length}`}>
        {present.map(({ g, verses }) => (
          <section key={g} id={`col-${g}`} className={`column col-${g}`}>
            <header>
              <h2>{GOSPEL_NAMES[g]}</h2>
              <span className="col-ref">{section.ranges[g]!.map(formatRange).join('; ')}</span>
              <CopyButton text={plain(g, section, verses!)} label="Copy" small />
            </header>
            {verses && (
              <>
                <div className="text">
                  {verses.map((v, i) => (
                    <Fragment key={`${v.chapter}:${v.verse}`}>
                      {i > 0 && verses[i - 1].chapter !== v.chapter && <span className="chapter-break" />}
                      <VerseText
                        v={v}
                        numbers={numbers}
                        chapterStart={i === 0 || verses[i - 1].chapter !== v.chapter}
                        shared={highlight ? shared : undefined}
                        isTarget={target?.gospel === g && target.ranges.some((r) => key(v.chapter, v.verse) >= r.start && key(v.chapter, v.verse) <= r.end)}
                      />{' '}
                    </Fragment>
                  ))}
                </div>
                <Context corpus={corpus} section={section} g={g} />
              </>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function VerseText({ v, numbers, chapterStart, shared, isTarget }: {
  v: Verse; numbers: boolean; chapterStart: boolean; shared?: Map<string, number>; isTarget: boolean;
}) {
  const label = chapterStart ? `${v.chapter}:${v.verse}` : String(v.verse);
  return (
    <span className={isTarget ? 'verse target' : 'verse'}>
      {numbers && <sup className={chapterStart ? 'vn ch' : 'vn'}>{label}</sup>}
      {v.text === '' ? (
        <span className="omitted">[{OMITTED}]</span>
      ) : shared ? (
        tokens(v.text).map((t, i) => {
          const n = t.word ? shared.get(t.word) : undefined;
          return n ? <mark key={i} className={`hl${Math.min(n, 4)}`}>{t.text}</mark> : <Fragment key={i}>{t.text}</Fragment>;
        })
      ) : (
        v.text
      )}
    </span>
  );
}

function Context({ corpus, section, g }: { corpus: Corpus; section: IndexedSection; g: Gospel }) {
  const { prev, next } = neighbours(corpus, section, g);
  const n = corpus.sequence[g].length;
  return (
    <footer className="context">
      <p className="where">
        Section {section.position[g]! + 1} of {n} in {GOSPEL_NAMES[g]}
      </p>
      <div className="prevnext">
        {prev ? <a href={href.section(prev.id)}>← {prev.title}</a> : <span>Beginning of {GOSPEL_NAMES[g]}</span>}
        {next ? <a href={href.section(next.id)}>{next.title} →</a> : <span>End of {GOSPEL_NAMES[g]}</span>}
      </div>
    </footer>
  );
}

function CopyButton({ text, label, small }: { text: string; label: string; small?: boolean }) {
  const [state, setState] = useState<'idle' | 'done' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 2000);
  };
  return (
    <button type="button" className={small ? 'small' : undefined} onClick={copy}>
      {state === 'done' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}
    </button>
  );
}

function plain(g: Gospel, section: IndexedSection, verses: Verse[]): string {
  const body = verses.map((v) => `${v.verse} ${v.text || `[${OMITTED}]`}`).join(' ');
  return `${GOSPEL_NAMES[g]} ${section.ranges[g]!.map(formatRange).join('; ')} (WEB)\n${body}`;
}

function jump(e: React.MouseEvent, g: Gospel) {
  // The hash is the router; a plain anchor link would navigate away from the section.
  e.preventDefault();
  document.getElementById(`col-${g}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
