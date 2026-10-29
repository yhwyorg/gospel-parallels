import { useEffect, useMemo, useState } from 'react';
import type { Corpus, IndexedSection } from '../lib/corpus';
import { GOSPELS, GOSPEL_NAMES, type Gospel } from '../lib/refs';
import { href } from '../lib/route';
import { relocated } from '../lib/sequence';

const ROW = 30; // px per row; lines are drawn to row centres, so CSS must use the same height.

const isGospel = (s?: string): s is Gospel => GOSPELS.includes(s as Gospel);

export default function Order({ corpus, a: qa, b: qb }: { corpus: Corpus; a?: string; b?: string }) {
  const a: Gospel = isGospel(qa) ? qa : 'mark';
  const b: Gospel = isGospel(qb) && qb !== a ? qb : a === 'john' ? 'mark' : 'john';
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Order: ${GOSPEL_NAMES[a]} and ${GOSPEL_NAMES[b]} · Gospel Parallels`;
  }, [a, b]);

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
      <h1>Where each Gospel places the story</h1>
      <p>
        Each column lists one Gospel's sections in the order that Gospel tells them. A line joins the same section in
        both. Where lines cross, the two Gospels tell those events in a different order.
      </p>

      <div className="toolbar">
        <label>
          Left{' '}
          <select value={a} onChange={(e) => choose('a', e.target.value as Gospel)}>
            {GOSPELS.map((g) => <option key={g} value={g}>{GOSPEL_NAMES[g]}</option>)}
          </select>
        </label>
        <label>
          Right{' '}
          <select value={b} onChange={(e) => choose('b', e.target.value as Gospel)}>
            {GOSPELS.map((g) => <option key={g} value={g}>{GOSPEL_NAMES[g]}</option>)}
          </select>
        </label>
      </div>

      <section className="order-summary">
        <p>
          {GOSPEL_NAMES[a]} has {left.length} sections and {GOSPEL_NAMES[b]} has {right.length}; {links.length} are in
          both.{' '}
          {notable.length === 0
            ? 'The two Gospels tell every shared section in the same order.'
            : `Setting aside the ${notable.length === 1 ? 'section' : `${notable.length} sections`} below (drawn in color) would bring the two orders into line:`}
        </p>
        {notable.length > 0 && (
          <ul className="notable">
            {notable.map(({ s }) => (
              <li key={s.id}>
                <a href={href.section(s.id)}>{s.title}</a>{' '}
                <span className="muted">
                  — section {s.position[a]! + 1} of {left.length} in {GOSPEL_NAMES[a]}, {s.position[b]! + 1} of {right.length} in {GOSPEL_NAMES[b]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="lanes" style={{ height }} onMouseLeave={() => setFocus(null)}>
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
  return (
    <ol className={`lane lane-${side} col-${g}`} aria-label={`${GOSPEL_NAMES[g]} in order`}>
      {list.map((s) => (
        <li
          key={s.id}
          className={`${s.position[other] === undefined ? 'only' : 'both'}${focus === s.id ? ' focus' : ''}`}
          onMouseEnter={() => setFocus(s.id)}
        >
          <a href={href.section(s.id)} title={`${s.title} — ${GOSPEL_NAMES[g]} ${s.refs[g]}`} onFocus={() => setFocus(s.id)}>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
