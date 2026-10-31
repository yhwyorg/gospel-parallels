import { useEffect } from 'react';
import { useI18n } from '../i18n/context';
import { sectionsFor } from '../lib/corpus';
import { RefError, formatPassage, parseLookup, type Passage as P } from '../lib/refs';
import Reader from './Reader';
import SectionList from './SectionList';

export default function Passage({ query }: { query: string }) {
  const { t, names, corpus } = useI18n();
  let passage: P | undefined;
  let error: string | undefined;
  try {
    passage = parseLookup(query, corpus.lengths);
  } catch (e) {
    if (!(e instanceof RefError)) throw e;
    error = t.passage.problem(e.problem, names);
  }

  useEffect(() => {
    document.title = `${passage ? formatPassage(passage, names) : query} · ${t.siteName}`;
  }, [passage, query, names, t]);

  if (!passage) {
    return (
      <div className="status error" role="alert">
        <strong>{t.passage.notFound(query)}</strong> {error}
      </div>
    );
  }

  const found = sectionsFor(corpus, passage);
  // A passage inside a single section opens it directly, with the typed verses marked.
  if (found.length === 1) {
    return (
      <>
        <p className="found">
          {t.passage.found(<bdi>{formatPassage(passage, names)}</bdi>, (text) => <span className="verse target">{text}</span>)}
        </p>
        <Reader id={found[0].id} target={passage} />
      </>
    );
  }

  return (
    <article>
      <h1><bdi>{formatPassage(passage, names)}</bdi></h1>
      <p>{t.passage.spans(found.length, names[passage.gospel])}</p>
      <SectionList rows={found} />
    </article>
  );
}
