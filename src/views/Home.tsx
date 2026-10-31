import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/context';
import { GOSPELS, type Gospel } from '../lib/refs';
import SectionList from './SectionList';

type OrderBy = 'harmony' | Gospel;

export default function Home() {
  const { t, names, abbr, corpus } = useI18n();
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState<OrderBy>('harmony');
  const [onlyShared, setOnlyShared] = useState(false);

  useEffect(() => {
    document.title = t.siteName;
  }, [t]);

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
        <h1>{t.tagline}</h1>
        <p>{t.home.intro}</p>
      </section>

      <div className="toolbar" role="group" aria-label={t.home.filterGroup}>
        <input
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t.home.filterPlaceholder}
          aria-label={t.home.filterLabel}
        />
        <label>
          {t.home.order}{' '}
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value as OrderBy)}>
            <option value="harmony">{t.home.harmony}</option>
            {GOSPELS.map((g) => (
              <option key={g} value={g}>{t.home.asTold(names[g])}</option>
            ))}
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={onlyShared} onChange={(e) => setOnlyShared(e.target.checked)} />
          {t.home.onlyShared}
        </label>
      </div>

      <p className="gospel-key">
        {GOSPELS.map((g) => (
          <span key={g} className={`col-${g}`}>
            <span className="swatch" aria-hidden="true" />
            <strong className={`ref-${g}`}>{abbr[g]}</strong> {names[g]}
          </span>
        ))}
      </p>
      <p className="count" aria-live="polite">
        {t.home.count(rows.length, corpus.sections.length)}
      </p>

      {rows.length === 0 ? (
        <p className="status">{t.home.noMatch(filter)}</p>
      ) : (
        <SectionList rows={rows} />
      )}
    </>
  );
}
