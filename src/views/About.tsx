import { useEffect } from 'react';
import { useI18n } from '../i18n/context';
import { aboutHelpers } from '../i18n/helpers';
import { isolateTree } from '../i18n/isolate';

export default function About() {
  const i18n = useI18n();
  const { t, info } = i18n;
  // Called as functions, not rendered as components, so the right-to-left pass can reach their text.
  const rtl = (n: React.ReactNode) => (info.dir === 'rtl' ? isolateTree(n) : n);
  useEffect(() => {
    document.title = `${t.nav.about} · ${t.siteName}`;
  }, [t]);

  return (
    <article className="about">
      <section className="dedication">
        {rtl(t.Dedication())}
      </section>
      {rtl(t.About(aboutHelpers(i18n)))}
    </article>
  );
}
