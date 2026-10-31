import { useEffect, useRef, useState, type FormEvent } from 'react';
import { href, useRoute } from './lib/route';
import { isolateRefs } from './lib/refs';
import { I18nProvider, loadLocale, useI18n, type I18n } from './i18n/context';
import { LOCALES, LOCALE_INFO, PUBLISHED, initialLocale, remember, type Locale } from './i18n/locales';
import Home from './views/Home';
import Reader from './views/Reader';
import Passage from './views/Passage';
import Order from './views/Order';
import About from './views/About';
import Book from './views/Book';
import Timeline from './views/Timeline';

type Load = { state: 'loading' } | { state: 'ready'; i18n: I18n } | { state: 'failed'; message: string };

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [load, setLoad] = useState<Load>({ state: 'loading' });

  useEffect(() => {
    let live = true;
    // The previous language stays on screen until the new one has fully arrived, so
    // switching never shows a page half in one language and half in another.
    loadLocale(locale)
      .then((i18n) => live && setLoad({ state: 'ready', i18n }))
      .catch((e: Error) => live && setLoad({ state: 'failed', message: `${locale}: ${e.message}` }));
    return () => {
      live = false;
    };
  }, [locale]);

  useEffect(() => {
    if (load.state !== 'ready') return;
    document.documentElement.lang = load.i18n.locale;
    document.documentElement.dir = load.i18n.info.dir;
  }, [load]);

  const choose = (l: Locale) => {
    remember(l);
    setLocale(l);
  };

  if (load.state === 'loading') return <p className="status wrap">…</p>;
  if (load.state === 'failed') {
    // Loud on purpose, and in English because no dictionary loaded: an empty page here
    // would look like a working site with no content.
    return (
      <div className="status error wrap" role="alert">
        <strong>The site could not be loaded.</strong> {load.message}. Try reloading the page.
      </div>
    );
  }
  return (
    <I18nProvider value={load.i18n}>
      <Site locale={locale} choose={choose} />
    </I18nProvider>
  );
}

function Site({ locale, choose }: { locale: Locale; choose: (l: Locale) => void }) {
  const route = useRoute();
  const { t, info, licence } = useI18n();
  const tr = info.translation;
  const header = useRef<HTMLElement>(null);

  // The header is sticky; its height (which changes as it wraps on narrow screens)
  // is published as --header-h so jumps to a spot on the page land below it.
  //
  // On a phone the header wraps to ~180px, a fifth of the screen, so there it tucks
  // away while scrolling down to read and comes back on any scroll up; --header-h is
  // 0 while it is tucked, so the sticky Gospel links move up into its place.
  useEffect(() => {
    const el = header.current!;
    const narrow = matchMedia('(max-width: 720px)');
    let lastY = scrollY;
    let tucked = false;
    const set = () => {
      const h = tucked ? 0 : Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    const onScroll = () => {
      const y = scrollY;
      const tuck = narrow.matches && y > lastY && y > el.offsetHeight;
      const show = !narrow.matches || y < lastY - 4 || y <= el.offsetHeight;
      if (tuck !== tucked && (tuck || show)) {
        tucked = tuck;
        el.classList.toggle('tucked', tucked);
        set();
      }
      lastY = y;
    };
    const ro = new ResizeObserver(set);
    ro.observe(el);
    set();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header className="site-header" ref={header}>
        <div className="wrap header-row">
          <a className="brand" href={href.home()}>
            <span className="brand-title">{t.siteName}</span>
            <span className="brand-sub">{t.tagline}</span>
          </a>
          <nav className="nav">
            <a href={href.home()} aria-current={route.view === 'home' ? 'page' : undefined}>{t.nav.sections}</a>
            <a href={href.timeline()} aria-current={route.view === 'timeline' ? 'page' : undefined}>{t.nav.timeline}</a>
            <a href={href.order('mark', 'john')} aria-current={route.view === 'order' ? 'page' : undefined}>{t.nav.order}</a>
            <a href={href.book()} aria-current={route.view === 'book' ? 'page' : undefined}>{t.nav.book}</a>
            <a href={href.about()} aria-current={route.view === 'about' ? 'page' : undefined}>{t.nav.about}</a>
          </nav>
          <Lookup initial={route.view === 'passage' ? route.query : ''} />
          {/* Published languages only. A reviewer previewing a held-back one (?lang=)
              gets every language, so they can compare; with one language, no menu. */}
          {(PUBLISHED.includes(locale) ? PUBLISHED : LOCALES).length > 1 && (
            <label className="language">
              <span className="visually-hidden">{t.language}</span>
              <select value={locale} onChange={(e) => choose(e.target.value as Locale)} aria-label={t.language}>
                {(PUBLISHED.includes(locale) ? PUBLISHED : LOCALES).map((l) => (
                  // Each name in its own language, so a reader can find theirs whatever the page is in.
                  <option key={l} value={l} lang={l}>{LOCALE_INFO[l].native}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      </header>

      <main className="wrap">
        {route.view === 'about' ? (
          <About />
        ) : route.view === 'book' ? (
          <Book />
        ) : route.view === 'timeline' ? (
          <Timeline />
        ) : route.view === 'section' ? (
          <Reader id={route.id} />
        ) : route.view === 'passage' ? (
          <Passage query={route.query} />
        ) : route.view === 'order' ? (
          <Order a={route.a} b={route.b} />
        ) : (
          <Home />
        )}
      </main>

      <footer className="site-footer wrap">
        {t.footer(<a href={tr.url}>{tr.name}</a>, licence)}
        {tr.attribution && <> {tr.attribution}</>}
      </footer>
    </>
  );
}

function Lookup({ initial }: { initial: string }) {
  const { t } = useI18n();
  const [q, setQ] = useState(initial);
  useEffect(() => setQ(initial), [initial]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) location.hash = href.passage(q);
  };
  return (
    <form className="lookup" onSubmit={submit} role="search">
      <label htmlFor="lookup" className="visually-hidden">{t.lookup.label}</label>
      <input
        id="lookup"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={isolateRefs(t.lookup.placeholder)}
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit">{t.lookup.go}</button>
    </form>
  );
}
