import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/context';
import { columnsOf, neighbours, verseLabel, type IndexedSection, type Verse } from '../lib/corpus';
import { formatRange, isolateRefs, type Gospel, type Passage } from '../lib/refs';
import { href } from '../lib/route';
import { sharedWords } from '../lib/shared';
import { AbsentLine, Columns } from './Columns';

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

export default function Reader({ id, target }: { id: string; target?: Passage }) {
  const { t, names, corpus, matcher, info } = useI18n();
  const section = corpus.byId.get(id);
  const [highlight, setHighlight] = usePref('highlight', false);
  const [numbers, setNumbers] = usePref('numbers', true);

  useEffect(() => {
    document.title = section ? `${section.title} · ${t.siteName}` : t.siteName;
  }, [section, t]);

  const columns = useMemo(() => (section ? columnsOf(section, corpus) : []), [corpus, section]);
  const shared = useMemo(
    () => sharedWords(columns.map((c) => c.verses.map((v) => v.text).join(' ')), matcher),
    [columns, matcher],
  );

  if (!section) {
    return (
      <div className="status error" role="alert">
        {t.reader.notFound(id)} <a href={href.home()}>{t.reader.seeAll}</a>.
      </div>
    );
  }

  const plain = (g: Gospel, verses: Verse[]) => {
    const body = verses
      .filter((v) => v.joinedTo === undefined)
      .map((v) => `${verseLabel(v, false)} ${v.text || `[${t.reader.omitted(info.translation.name)}]`}`)
      .join(' ');
    return `${names[g]} ${section.ranges[g]!.map(formatRange).join('; ')} (${info.translation.abbr})\n${body}`;
  };
  const copyAll = columns.map((c) => plain(c.g, c.verses)).join('\n\n');

  return (
    <article className="reader">
      <p className="num"><bdi dir="ltr">§{section.number}</bdi></p>
      <h1>{section.title}</h1>
      {section.note && <p className="note">{isolateRefs(section.note)}</p>}

      <div className="toolbar reader-tools">
        <label className="check">
          <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} disabled={columns.length < 2} />
          {t.reader.shade}
        </label>
        <label className="check">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
          {t.reader.numbers}
        </label>
        <CopyButton text={copyAll} label={t.reader.copyAll} />
        <button type="button" onClick={() => print()}>{t.reader.print}</button>
      </div>
      {highlight && columns.length > 1 && (
        <p className="hint key">
          {t.reader.shadeIntro}{' '}
          <span className="key-item"><mark className="hl2">{t.reader.in2}</mark></span>
          <span className="key-item"><mark className="hl3">{t.reader.in3}</mark></span>
          <span className="key-item"><mark className="hl4">{t.reader.in4}</mark></span>
          {t.reader.shadeCaveat}
        </p>
      )}

      {columns.length > 1 && (
        <nav className="jump" aria-label={t.reader.jumpLabel}>
          {columns.map((c) => (
            <a key={c.g} href={`#col-${c.g}`} className={`ref-${c.g}`} onClick={(e) => jump(e, c.g)}>
              {names[c.g]}
            </a>
          ))}
        </nav>
      )}

      <AbsentLine section={section} />

      <Columns
        section={section}
        columns={columns}
        numbers={numbers}
        shared={highlight && columns.length > 1 ? shared : undefined}
        target={target}
        header={(g, verses) => <CopyButton text={plain(g, verses)} label={t.reader.copy} small />}
        footer={(g) => <Context section={section} g={g} />}
        ids
      />
    </article>
  );
}

function Context({ section, g }: { section: IndexedSection; g: Gospel }) {
  const { t, names, corpus, info } = useI18n();
  const { prev, next } = neighbours(corpus, section, g);
  const n = corpus.sequence[g].length;
  // Arrows point the way the text runs: "back" is to the right in Arabic.
  const [back, on] = info.dir === 'rtl' ? ['→', '←'] : ['←', '→'];
  return (
    <footer className="context">
      <p className="where">{t.reader.sectionOf(section.position[g]! + 1, n, names[g])}</p>
      <div className="prevnext">
        {prev ? <a href={href.section(prev.id)}>{back} {prev.title}</a> : <span>{t.reader.beginning(names[g])}</span>}
        {next ? <a href={href.section(next.id)}>{next.title} {on}</a> : <span>{t.reader.end(names[g])}</span>}
      </div>
    </footer>
  );
}

function CopyButton({ text, label, small }: { text: string; label: string; small?: boolean }) {
  const { t } = useI18n();
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
      {state === 'done' ? t.reader.copied : state === 'failed' ? t.reader.copyFailed : label}
    </button>
  );
}

function jump(e: React.MouseEvent, g: Gospel) {
  // The hash is the router; a plain anchor link would navigate away from the section.
  e.preventDefault();
  document.getElementById(`col-${g}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
