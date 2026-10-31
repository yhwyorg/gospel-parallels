import { Fragment, useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/context';
import { GOSPELS, isolateRefs } from '../lib/refs';
import { href } from '../lib/route';
import { buildTimeline, type TimelineColumn } from '../lib/timeline';
import { Ref } from './SectionList';

interface Run<K> {
  key: K;
  from: number; // index of the first column in the run
  span: number;
}

/** Consecutive columns sharing a value, so a period or day can be drawn as one band. */
function runs<K>(cols: TimelineColumn[], keyOf: (c: TimelineColumn) => K): Run<K>[] {
  const out: Run<K>[] = [];
  cols.forEach((c, i) => {
    const k = keyOf(c);
    const last = out.at(-1);
    if (last && last.key === k) last.span++;
    else out.push({ key: k, from: i, span: 1 });
  });
  return out;
}

export default function Timeline() {
  const { t, names, abbr, corpus } = useI18n();
  const tl = t.timeline;
  const [onlyShared, setOnlyShared] = useState(false);

  useEffect(() => {
    document.title = `${tl.title} · ${t.siteName}`;
  }, [t, tl]);

  const all = useMemo(() => buildTimeline(corpus), [corpus]);
  const cols = onlyShared ? all.filter((c) => Object.keys(c.section.ranges).length > 1) : all;
  const periods = runs(cols, (c) => c.period);
  const days = runs(cols, (c) => c.day);

  const tip = (c: TimelineColumn, g: (typeof GOSPELS)[number]) => {
    const after = c.elsewhere[g];
    const base = `§${c.section.number} ${c.section.title} — ${names[g]} ${c.section.refs[g]}`;
    return after === undefined ? base : `${base}\n${tl.elsewhere(names[g], after ? `§${after.number} ${after.title}` : null)}`;
  };

  const jump = (key: string) => {
    // On wide screens the band scrolls sideways into view; on phones the list scrolls down.
    for (const id of [`tl-p-${key}`, `tl-l-${key}`]) {
      const el = document.getElementById(id);
      if (el && el.offsetParent !== null) el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  return (
    <article className="timeline">
      <h1>{tl.title}</h1>
      <p className="lede">{tl.intro}</p>

      <div className="toolbar">
        <span className="tl-jump" role="group" aria-label={tl.jump}>
          <span className="muted">{tl.jump}:</span>
          {periods.map((p) => (
            <button key={`${p.key}-${p.from}`} type="button" className="small" onClick={() => jump(p.key)}>
              {tl.periods[p.key]}
            </button>
          ))}
        </span>
        <label className="check">
          <input type="checkbox" checked={onlyShared} onChange={(e) => setOnlyShared(e.target.checked)} />
          {t.home.onlyShared}
        </label>
      </div>
      <p className="muted tl-key">
        <span className="tl-block elsewhere tl-sample" aria-hidden="true" /> {tl.elsewhereKey}. {isolateRefs(tl.dayNote)}
      </p>

      {/* Wide screens: a band per Gospel, scrolling sideways. Grid columns are fixed
          per section so every Gospel's block for an event lines up under the others. */}
      <div className="tl-scroll" tabIndex={0}>
        <div className="tl-grid" style={{ gridTemplateColumns: `var(--tl-label) repeat(${cols.length}, var(--tl-col))` }}>
          {periods.map((p) => (
            <div
              key={`p-${p.from}`}
              id={`tl-p-${p.key}`}
              className="tl-period"
              style={{ gridRow: 1, gridColumn: `${p.from + 2} / span ${p.span}` }}
            >
              {tl.periods[p.key]}
            </div>
          ))}
          {days.map((d) =>
            d.key ? (
              <div key={`d-${d.from}`} className="tl-day" style={{ gridRow: 2, gridColumn: `${d.from + 2} / span ${d.span}` }}>
                {tl.days[d.key]}
              </div>
            ) : null,
          )}
          {GOSPELS.map((g, row) => (
            <Fragment key={g}>
              <div className={`tl-label col-${g}`} style={{ gridRow: row + 3 }}>
                {names[g]}
              </div>
              {cols.map((c, i) =>
                c.section.ranges[g] ? (
                  <a
                    key={c.section.id}
                    href={href.section(c.section.id)}
                    className={`tl-block col-${g}${g in c.elsewhere ? ' elsewhere' : ''}`}
                    style={{ gridRow: row + 3, gridColumn: i + 2 }}
                    title={tip(c, g)}
                  >
                    <span className="num"><bdi dir="ltr">§{c.section.number}</bdi></span>
                    <span className="tl-title">{c.section.title}</span>
                    <span className="tl-ref"><Ref>{c.section.refs[g]!}</Ref></span>
                  </a>
                ) : null,
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Phones: the same columns as a list, with the period and day as headings. */}
      <ol className="tl-list">
        {cols.map((c, i) => {
          const prev = cols[i - 1];
          return (
            <Fragment key={c.section.id}>
              {(!prev || prev.period !== c.period) && (
                <li className="tl-list-period" id={`tl-l-${c.period}`}>{tl.periods[c.period]}</li>
              )}
              {c.day && prev?.day !== c.day && <li className="tl-list-day">{tl.days[c.day]}</li>}
              <li>
                <a href={href.section(c.section.id)}>
                  <span className="row-title">
                    <span className="num"><bdi dir="ltr">§{c.section.number}</bdi></span> {c.section.title}
                  </span>
                  <span className="row-refs">
                    {GOSPELS.map((g) =>
                      c.section.refs[g] ? (
                        <span key={g} className={`ref ref-${g}${g in c.elsewhere ? ' elsewhere' : ''}`} title={tip(c, g)}>
                          <abbr title={names[g]}>{abbr[g]}</abbr> <Ref>{c.section.refs[g]!}</Ref>
                        </span>
                      ) : null,
                    )}
                  </span>
                </a>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </article>
  );
}
