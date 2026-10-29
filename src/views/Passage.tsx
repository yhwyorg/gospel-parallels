import { useEffect } from 'react';
import { sectionsFor, type Corpus } from '../lib/corpus';
import { GOSPELS, GOSPEL_ABBR, GOSPEL_NAMES, RefError, formatPassage, parseLookup, type Passage as P } from '../lib/refs';
import { href } from '../lib/route';
import Reader from './Reader';

export default function Passage({ corpus, query }: { corpus: Corpus; query: string }) {
  let passage: P | undefined;
  let error: string | undefined;
  try {
    passage = parseLookup(query, corpus.lengths);
  } catch (e) {
    if (!(e instanceof RefError)) throw e;
    error = e.message;
  }

  useEffect(() => {
    document.title = `${passage ? formatPassage(passage) : query} · Gospel Parallels`;
  }, [passage, query]);

  if (!passage) {
    return (
      <div className="status error" role="alert">
        <strong>Couldn’t find “{query}”.</strong> {error}
      </div>
    );
  }

  const found = sectionsFor(corpus, passage);
  // A passage inside a single section opens it directly, with the typed verses marked.
  if (found.length === 1) {
    return (
      <>
        <p className="found">
          <strong>{formatPassage(passage)}</strong> is in this section. The verses you asked for are{' '}
          <span className="verse target">shaded like this</span>.
        </p>
        <Reader corpus={corpus} id={found[0].id} target={passage} />
      </>
    );
  }

  return (
    <article>
      <h1>{formatPassage(passage)}</h1>
      <p>
        This passage runs across {found.length} sections of {GOSPEL_NAMES[passage.gospel]}. Choose one to read it
        alongside its parallels.
      </p>
      <ol className="section-list">
        {found.map((s) => (
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
    </article>
  );
}
