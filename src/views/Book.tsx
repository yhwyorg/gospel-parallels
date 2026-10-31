import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import { aboutHelpers } from '../i18n/helpers';
import { isolateTree } from '../i18n/isolate';
import type { Locale } from '../i18n/locales';
import { GOSPELS, formatRange, isolateRefs } from '../lib/refs';
import { columnsOf } from '../lib/corpus';
import { AbsentLine, Columns } from './Columns';
import { Ref } from './SectionList';

/** Written by scripts/build-books.mjs next to the PDFs. */
export type BookManifest = Partial<Record<Locale, { file: string; pages: number; bytes: number; paper: string }>>;

type Pdf = { state: 'loading' } | { state: 'missing' } | { state: 'ready'; entry: NonNullable<BookManifest[Locale]> };

export default function Book() {
  const i18n = useI18n();
  const { t, corpus, names, abbr, info, locale } = i18n;
  const [pdf, setPdf] = useState<Pdf>({ state: 'loading' });

  useEffect(() => {
    document.title = `${t.book.docTitle} · ${t.siteName}`;
  }, [t]);

  useEffect(() => {
    let live = true;
    // "Not built" is shown as such, never as a dead link: the PDFs exist only on the
    // published site, made by CI after the build.
    fetch('book/books.json')
      .then((r) => (r.ok ? (r.json() as Promise<BookManifest>) : undefined))
      .catch(() => undefined)
      .then((m) => {
        if (!live) return;
        const entry = m?.[locale];
        setPdf(entry ? { state: 'ready', entry } : { state: 'missing' });
      });
    return () => {
      live = false;
    };
  }, [locale]);

  useEffect(() => {
    // The PDF builder waits for this before printing, so it never prints a page still
    // showing the previous language.
    document.body.dataset.bookReady = locale;
    document.body.dataset.bookPaper = info.paper;
    return () => {
      delete document.body.dataset.bookReady;
      delete document.body.dataset.bookPaper;
    };
  }, [locale, corpus, info]);

  const helpers = aboutHelpers(i18n);
  // Called as functions, not rendered as components, so the right-to-left pass can reach their text.
  const rtl = (n: React.ReactNode) => (info.dir === 'rtl' ? isolateTree(n) : n);

  return (
    <article className="book">
      <section className="book-screen">
        <h1>{t.book.heading}</h1>
        <p>{t.book.intro}</p>
        <div className="toolbar">
          {pdf.state === 'ready' && (
            <a className="button primary" href={`book/${pdf.entry.file}`} download>
              {t.book.download(pdf.entry.pages, (pdf.entry.bytes / 1e6).toFixed(1))}
            </a>
          )}
          <button type="button" onClick={() => print()}>{t.book.print}</button>
        </div>
        <p className="muted">
          {pdf.state === 'ready' ? t.book.paper(pdf.entry.paper) : pdf.state === 'missing' ? t.book.notBuilt : ' '}
        </p>
      </section>

      <div className="book-pages">
        <section className="title-page">
          <p className="book-title">{t.siteName}</p>
          <p className="book-sub">{t.tagline}</p>
          <p className="book-scripture">{t.book.scripture(info.translation.name)}</p>
          <p className="book-url">gospels.yhwh.rest</p>
        </section>

        {/* The dedication's own heading ("About this site") is hidden in print by CSS:
            in a printed volume the page needs no title above "Soli Deo gloria". */}
        <section className="dedication book-dedication">
          {rtl(t.Dedication())}
        </section>

        <section className="book-howto">
          <h2>{t.book.howToHeading}</h2>
          {rtl(t.book.HowTo(helpers))}
        </section>

        <section className="book-contents">
          <h2>{t.book.contents}</h2>
          <ol>
            {corpus.sections.map((s) => (
              <li key={s.id}>
                <span className="num"><bdi dir="ltr">§{s.number}</bdi></span> {s.title}
              </li>
            ))}
          </ol>
        </section>

        {corpus.sections.map((s) => (
          <section key={s.id} className="book-section" data-section={s.id}>
            <h2>
              <span className="num"><bdi dir="ltr">§{s.number}</bdi></span> {s.title}
            </h2>
            {s.note && <p className="note">{isolateRefs(s.note)}</p>}
            <AbsentLine section={s} />
            <Columns section={s} columns={columnsOf(s, corpus)} numbers />
          </section>
        ))}

        <section className="book-index">
          <h2>{t.book.indexHeading}</h2>
          <p>{t.book.indexIntro}</p>
          <div className="index-cols">
            {GOSPELS.map((g) => (
              <div key={g} className={`col-${g}`}>
                <h3>{names[g]}</h3>
                <ul>
                  {/* One line per range, in verse order: a section listed once under its first
                      range would hide its second (e.g. 6:1-8; 6:16-18) out of sequence. */}
                  {corpus.sequence[g]
                    .flatMap((s) => s.ranges[g]!.map((r) => ({ s, r })))
                    .sort((x, y) => x.r.start - y.r.start)
                    .map(({ s, r }) => (
                      <li key={`${s.id}-${r.start}`}>
                        <span className={`ref-${g}`}>{abbr[g]}</span> <Ref>{formatRange(r)}</Ref>{' '}
                        <span className="num"><bdi dir="ltr">§{s.number}</bdi></span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="book-credits">
          <h2>{t.book.creditsHeading}</h2>
          {rtl(t.book.Credits({ ...helpers, date: new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date()) }))}
        </section>
      </div>
    </article>
  );
}
