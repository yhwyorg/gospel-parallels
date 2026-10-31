import { useI18n } from '../i18n/context';
import type { IndexedSection } from '../lib/corpus';
import { GOSPELS } from '../lib/refs';
import { href } from '../lib/route';

export default function SectionList({ rows }: { rows: IndexedSection[] }) {
  const { names, abbr } = useI18n();
  return (
    <ol className="section-list">
      {rows.map((s) => (
        <li key={s.id}>
          <a href={href.section(s.id)}>
            <span className="row-title">
              <span className="num"><bdi dir="ltr">§{s.number}</bdi></span> {s.title}
            </span>
            <span className="row-refs">
              {GOSPELS.map((g) =>
                s.refs[g] ? (
                  <span key={g} className={`ref ref-${g}`}>
                    <abbr title={names[g]}>{abbr[g]}</abbr> <Ref>{s.refs[g]}</Ref>
                  </span>
                ) : null,
              )}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Chapter-and-verse numbers, always laid out left to right. In right-to-left text the
 * bidi algorithm would otherwise reorder "4:35-41" around its colon and hyphen.
 */
export function Ref({ children }: { children: string }) {
  return <bdi dir="ltr">{children}</bdi>;
}
