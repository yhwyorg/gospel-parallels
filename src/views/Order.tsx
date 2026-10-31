import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/context';
import type { IndexedSection } from '../lib/corpus';
import { GOSPELS, type Gospel } from '../lib/refs';
import { href } from '../lib/route';
import { relocated } from '../lib/sequence';

const ROW = 30; // px per row; lines are drawn to row centres, so CSS must use the same height.

const isGospel = (s?: string): s is Gospel => GOSPELS.includes(s as Gospel);

export default function Order({ a: qa, b: qb }: { a?: string; b?: string }) {
  const { t, names, corpus } = useI18n();
  const o = t.order;
  const a: Gospel = isGospel(qa) ? qa : 'mark';
  const b: Gospel = isGospel(qb) && qb !== a ? qb : a === 'john' ? 'mark' : 'john';
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${o.docTitle(names[a], names[b])} · ${t.siteName}`;
  }, [a, b, o, names, t]);

  const left = corpus.sequence[a];
  const right = corpus.sequence[b];
  const links = useMemo(() => {
    const moved = relocated(corpus, a, b);
    return left
      .filter((s) => s.position[b] !== undefined)
      .map((s) => ({ s, y1: s.position[a]! * ROW + ROW / 2, y2: s.position[b]! * ROW + ROW / 2, notable: moved.has(s.id) }));
  }, [corpus, left, a, b]);
  const notable = links.filter((l) => l.notable);
  const height = Math.max(left.length, right.length) * ROW;

  const choose = (side: 'a' | 'b', g: Gospel) => {
    const na = side === 'a' ? g : a;
    let nb = side === 'b' ? g : b;
    if (na === nb) nb = GOSPELS.find((x) => x !== na)!;
    location.hash = href.order(na, nb);
  };

  return (
    <article className="order">
      <h1>{o.title}</h1>
      <p>{o.intro}</p>

      <div className="toolbar">
        <label>
          {o.left}{' '}
          <select value={a} onChange={(e) => choose('a', e.target.value as Gospel)}>
            {GOSPELS.map((g) => <option key={g} value={g}>{names[g]}</option>)}
          </select>
        </label>
        <label>
          {o.right}{' '}
          <select value={b} onChange={(e) => choose('b', e.target.value as Gospel)}>
            {GOSPELS.map((g) => <option key={g} value={g}>{names[g]}</option>)}
          </select>
        </label>
      </div>

      <section className="order-summary">
        <p>
          {o.summary(names[a], left.length, names[b], right.length, links.length)}{' '}
          {notable.length === 0 ? o.same : notable.length === 1 ? o.one : o.many(notable.length)}
        </p>
        {notable.length > 0 && (
          <ul className="notable">
            {notable.map(({ s }) => (
              <li key={s.id}>
                <a href={href.section(s.id)}>{s.title}</a>{' '}
                <span className="muted">
                  {o.position(s.position[a]! + 1, left.length, names[a], s.position[b]! + 1, right.length, names[b])}
                </span>
              </li>
            ))}
          </ul>
        )}
        {notable.length > 0 && (
          <p className="muted">{o.tie}</p>
        )}
      </section>

      <dl className="legend" aria-label={o.legend.label}>
        <div><dt><svg width="36" height="12" aria-hidden="true"><line x1="0" y1="6" x2="36" y2="6" className="link" /></svg></dt><dd>{o.legend.same}</dd></div>
        <div><dt><svg width="36" height="12" aria-hidden="true"><line x1="0" y1="6" x2="36" y2="6" className="link notable" /></svg></dt><dd>{o.legend.notable}</dd></div>
        <div><dt><svg width="36" height="12" aria-hidden="true"><line x1="0" y1="6" x2="36" y2="6" className="link focus" /></svg></dt><dd>{o.legend.focus}</dd></div>
        <div><dt><span className="legend-title both">{o.legend.sample}</span></dt><dd>{o.legend.both}</dd></div>
        <div><dt><span className="legend-title only">{o.legend.sample}</span></dt><dd>{o.legend.only}</dd></div>
      </dl>

      {/* Headings sit outside the lanes: a heading row inside them would shift every row off its line.
          Both are fixed left-to-right even in Arabic: the lines are drawn from the left lane to the
          right one, and a mirrored grid would put each line's ends on the wrong side. */}
      <div className="lane-heads" dir="ltr" aria-hidden="true">
        <span className={`col-${a}`}>{names[a]}</span>
        <span />
        <span className={`col-${b}`}>{names[b]}</span>
      </div>
      <div className="lanes" dir="ltr" style={{ height }} onMouseLeave={() => setFocus(null)}>
        <Lane list={left} g={a} other={b} side="left" focus={focus} setFocus={setFocus} />
        <svg className="links" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" height={height} aria-hidden="true">
          {links.map(({ s, y1, y2, notable }) => (
            <path
              key={s.id}
              d={`M0 ${y1} C50 ${y1} 50 ${y2} 100 ${y2}`}
              className={`link${notable ? ' notable' : ''}${focus === s.id ? ' focus' : ''}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <Lane list={right} g={b} other={a} side="right" focus={focus} setFocus={setFocus} />
      </div>
    </article>
  );
}

function Lane({ list, g, other, side, focus, setFocus }: {
  list: IndexedSection[]; g: Gospel; other: Gospel; side: 'left' | 'right';
  focus: string | null; setFocus: (id: string | null) => void;
}) {
  const { t, names } = useI18n();
  return (
    <ol className={`lane lane-${side} col-${g}`} aria-label={t.order.lane(names[g])}>
      {list.map((s) => (
        <li
          key={s.id}
          className={`${s.position[other] === undefined ? 'only' : 'both'}${focus === s.id ? ' focus' : ''}`}
          onMouseEnter={() => setFocus(s.id)}
        >
          <a href={href.section(s.id)} title={`${s.title} — ${names[g]} ${s.refs[g]}`} dir="auto" onFocus={() => setFocus(s.id)}>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
