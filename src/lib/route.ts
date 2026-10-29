import { useEffect, useState } from 'react';

// Hash routes keep every page a plain static file: GitHub Pages has no rewrite
// rules, so a path route like /s/sower would 404 on reload or when shared.
export type Route =
  | { view: 'home' }
  | { view: 'section'; id: string }
  | { view: 'passage'; query: string }
  | { view: 'order'; a?: string; b?: string }
  | { view: 'about' };

export function parse(hash: string): Route {
  const [path, qs] = hash.replace(/^#\/?/, '').split('?');
  const [head, ...rest] = path.split('/');
  const arg = decodeURIComponent(rest.join('/').replace(/\+/g, ' '));
  const params = new URLSearchParams(qs);
  switch (head) {
    case 's': return { view: 'section', id: arg };
    case 'p': return { view: 'passage', query: arg };
    case 'order': return { view: 'order', a: params.get('a') ?? undefined, b: params.get('b') ?? undefined };
    case 'about': return { view: 'about' };
    default: return { view: 'home' };
  }
}

export const href = {
  home: () => '#/',
  section: (id: string) => `#/s/${id}`,
  passage: (q: string) => `#/p/${encodeURIComponent(q.trim()).replace(/%20/g, '+').replace(/%3A/gi, ':')}`,
  order: (a: string, b: string) => `#/order?a=${a}&b=${b}`,
  about: () => '#/about',
};

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => {
      setRoute(parse(location.hash));
      window.scrollTo(0, 0);
    };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  return route;
}
