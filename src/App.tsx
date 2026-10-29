import { useEffect, useState, type FormEvent } from 'react';
import { buildCorpus, type Corpus, type GospelText } from './lib/corpus';
import { href, useRoute } from './lib/route';
import Home from './views/Home';
import Reader from './views/Reader';
import Passage from './views/Passage';
import Order from './views/Order';
import About from './views/About';

type Load = { state: 'loading' } | { state: 'ready'; corpus: Corpus } | { state: 'failed'; message: string };

export default function App() {
  const route = useRoute();
  const [load, setLoad] = useState<Load>({ state: 'loading' });

  useEffect(() => {
    // Loaded separately so the page frame appears before ~440 KB of text arrives.
    import('./data/gospels.json')
      .then((m) => setLoad({ state: 'ready', corpus: buildCorpus(m.default as GospelText) }))
      .catch((e: Error) => setLoad({ state: 'failed', message: e.message }));
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href={href.home()}>
            <span className="brand-title">Gospel Parallels</span>
            <span className="brand-sub">To the glory of God · for Darrell W. Johnson</span>
          </a>
          <nav className="nav">
            <a href={href.home()} aria-current={route.view === 'home' ? 'page' : undefined}>Sections</a>
            <a href={href.order('mark', 'john')} aria-current={route.view === 'order' ? 'page' : undefined}>Order</a>
            <a href={href.about()} aria-current={route.view === 'about' ? 'page' : undefined}>About</a>
          </nav>
          <Lookup initial={route.view === 'passage' ? route.query : ''} />
        </div>
      </header>

      <main className="wrap">
        {route.view === 'about' ? (
          <About />
        ) : load.state === 'loading' ? (
          <p className="status">Loading the Gospels…</p>
        ) : load.state === 'failed' ? (
          // Loud on purpose: an empty page here would look like a working site with no content.
          <div className="status error" role="alert">
            <strong>The Gospel text could not be loaded.</strong> {load.message}. Try reloading the page.
          </div>
        ) : route.view === 'section' ? (
          <Reader corpus={load.corpus} id={route.id} />
        ) : route.view === 'passage' ? (
          <Passage corpus={load.corpus} query={route.query} />
        ) : route.view === 'order' ? (
          <Order corpus={load.corpus} a={route.a} b={route.b} />
        ) : (
          <Home corpus={load.corpus} />
        )}
      </main>

      <footer className="site-footer wrap">
        Scripture from the <a href="https://worldenglish.bible/">World English Bible</a> (public domain).
      </footer>
    </>
  );
}

function Lookup({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);
  useEffect(() => setQ(initial), [initial]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) location.hash = href.passage(q);
  };
  return (
    <form className="lookup" onSubmit={submit} role="search">
      <label htmlFor="lookup" className="visually-hidden">Find a passage</label>
      <input
        id="lookup"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Find a passage, e.g. Luke 15:11-32"
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit">Go</button>
    </form>
  );
}
