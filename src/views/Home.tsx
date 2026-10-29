import { useEffect, useMemo, useState } from 'react';
import type { Corpus } from '../lib/corpus';
import { GOSPELS, GOSPEL_ABBR, GOSPEL_NAMES, type Gospel } from '../lib/refs';
import { href } from '../lib/route';

type OrderBy = 'harmony' | Gospel;

export default function Home({ corpus }: { corpus: Corpus }) {
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState<OrderBy>('harmony');
  const [onlyShared, setOnlyShared] = useState(false);

  useEffect(() => {
    document.title = 'Gospel Parallels';
  }, []);

  const rows = useMemo(() => {
    const base = orderBy === 'harmony' ? corpus.sections : corpus.sequence[orderBy];
    const f = filter.trim().toLowerCase();
    return base.filter(
      (s) => (!f || s.title.toLowerCase().includes(f)) && (!onlyShared || Object.keys(s.ranges).length > 1),
    );
  }, [corpus, filter, orderBy, onlyShared]);

  return (
    <>
      <section className="intro">
        <h1>The four Gospels, side by side</h1>
        <p>
          Choose a section to read every account of it in parallel columns, or type any passage into the box above
          to find its parallels. Each column shows where that Gospel places the story, with the sections before and
          after it.
        </p>
      </section>

      <div className="toolbar" role="group" aria-label="Filter sections">
        <input
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by title, e.g. healing"
          aria-label="Filter sections by title"
        />
        <label>
          Order{' '}
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value as OrderBy)}>
            <option value="harmony">Harmony (all sections)</option>
            {GOSPELS.map((g) => (
              <option key={g} value={g}>As told in {GOSPEL_NAMES[g]}</option>
            ))}
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={onlyShared} onChange={(e) => setOnlyShared(e.target.checked)} />
          In more than one Gospel
        </label>
      </div>

      <p className="gospel-key">
        {GOSPELS.map((g) => (
          <span key={g} className={`col-${g}`}>
            <span className="swatch" aria-hidden="true" />
            <strong className={`ref-${g}`}>{GOSPEL_ABBR[g]}</strong> {GOSPEL_NAMES[g]}
          </span>
        ))}
      </p>
      <p className="count" aria-live="polite">
        {rows.length} of {corpus.sections.length} sections
      </p>

      {rows.length === 0 ? (
        <p className="status">No section titles match “{filter}”. Try the passage box above instead.</p>
      ) : (
        <ol className="section-list">
          {rows.map((s) => (
            <li key={s.id}>
              <a href={href.section(s.id)}>
                <span className="row-title">{s.title}</span>
                <span className="row-refs">
                  {GOSPELS.map((g) =>
                    s.refs[g] ? (
                      <span key={g} className={`ref ref-${g}`}>
                        <abbr title={GOSPEL_NAMES[g]}>{GOSPEL_ABBR[g]}</abbr> {s.refs[g]}
                      </span>
                    ) : null,
                  )}
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
