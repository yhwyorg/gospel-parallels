import { href } from '../lib/route';
import type { I18n } from './context';
import type { AboutHelpers } from './dict';

export function aboutHelpers({ names, info, licence }: I18n): AboutHelpers {
  const tr = info.translation;
  return {
    href: { home: href.home, passage: href.passage, order: href.order, book: href.book },
    names,
    translation: <a href={tr.url}>{tr.name}</a>,
    licence,
    attribution: tr.attribution,
  };
}
