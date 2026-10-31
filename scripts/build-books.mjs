// Prints the Book page of the built site to one PDF per language:
//
//   npm run build && npm run books
//   BOOK_LOCALES=en npm run books     # one language, for a quick check
//
// Writes dist/book/gospel-parallels-<locale>.pdf and dist/book/books.json, which
// the Book page reads to offer the download. Runs in CI after the build, so the
// PDFs always match the published text.
//
// Each check below exists because the failure it catches would otherwise produce a
// PDF that opens fine and looks finished: a page printed before the language
// switched, verses missing, or a script printed as empty boxes for want of a font.
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'warn' });
const base = 'http://localhost:4174';
const outDir = new URL('../dist/book/', import.meta.url);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const failures = [];
const manifest = {};
try {
  const page = await browser.newPage();
  await page.goto(`${base}/?lang=en#/book`);
  await page.waitForSelector('body[data-book-ready="en"]');
  const all = await page.$$eval('.language option', (os) => os.map((o) => o.value));
  // BOOK_LOCALES=en,fr builds just those, for a quick local check; CI builds every language.
  const only = process.env.BOOK_LOCALES?.split(',');
  const locales = only ? all.filter((l) => only.includes(l)) : all;
  if (all.length < 2) throw new Error(`language menu lists ${all.length} languages`);

  for (const locale of locales) {
    const started = Date.now();
    // A fresh page per language: ?lang= is only read on load, and a reused page
    // could print the previous language's book.
    const p = await browser.newPage();
    await p.goto(`${base}/?lang=${encodeURIComponent(locale)}#/book`);
    await p.waitForSelector(`body[data-book-ready="${locale}"]`, { timeout: 60_000 });
    await p.evaluate(() => document.fonts.ready);

    const file = JSON.parse(readFileSync(new URL(`../src/data/text/${locale}.json`, import.meta.url), 'utf8'));
    // A joined span is printed as one verse, so its later verses have no element of their own.
    const absorbed = Object.entries(file.joined).reduce(
      (n, [gospel, spans]) => n + Object.entries(spans).reduce((m, [a, b]) => m + versesAfter(file.books[gospel], a, b), 0),
      0,
    );
    const expected = Object.values(file.books).flat(2).length - absorbed;
    const got = await p.$$eval('.book-section .verse', (vs) => vs.length);
    const sections = await p.$$eval('.book-section', (s) => s.length);
    if (got !== expected || sections !== 220) {
      failures.push(`${locale}: book has ${sections} sections and ${got} verses; expected 220 and ${expected}`);
      continue;
    }

    const fonts = await fontsUsed(p);
    const stack = await p.$eval('.book-section .text', (el) =>
      getComputedStyle(el).fontFamily.split(',').map((f) => f.trim().replace(/^["']|["']$/g, '').toLowerCase()),
    );
    // Every font that drew the text must be one the stylesheet names. A missing font
    // falls back to whatever the machine has, which for Chinese, Korean or Arabic can
    // be no font at all: the PDF then prints empty boxes and still "succeeds".
    const stray = fonts.filter((f) => !stack.includes(f.toLowerCase()));
    if (stray.length) {
      failures.push(`${locale}: text drawn in ${stray.join(', ')}, which the stylesheet does not name; install the fonts it does (${stack.join(', ')})`);
      continue;
    }

    const paper = await p.evaluate(() => document.body.dataset.bookPaper);
    const name = `gospel-parallels-${locale}.pdf`;
    const path = fileURLToPath(new URL(name, outDir));
    await p.pdf({
      path,
      format: paper,
      printBackground: true,
      margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate:
        '<div style="width:100%;text-align:center;font:8px sans-serif;color:#777"><span class="pageNumber"></span></div>',
    });
    const bytes = statSync(path).size;
    // Chromium writes one "/Type /Page" dictionary per page ("/Pages" is the tree root).
    const pages = (readFileSync(path, 'latin1').match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
    // The verse count above is the completeness check; this only catches a PDF that
    // came out truncated or empty. Complete books run from ~85 pages (Chinese, Arabic)
    // to ~155 (Tagalog), so 50 is well clear of both.
    if (pages < 50) {
      failures.push(`${locale}: PDF has ${pages} pages; complete books have 80 or more`);
      continue;
    }
    manifest[locale] = { file: name, pages, bytes, paper };
    console.log(`${locale}: ${pages} pages, ${(bytes / 1e6).toFixed(1)} MB, ${paper}, fonts ${fonts.join(', ')} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
    await p.close();
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}

writeFileSync(new URL('books.json', outDir), JSON.stringify(manifest, null, 2));
if (failures.length) {
  console.error(`\n${failures.join('\n')}`);
  process.exit(1);
}

/** Verses after `a` up to and including `b` ("7:53" to "8:1" is one), from the book's chapter lengths. */
function versesAfter(chapters, a, b) {
  const [c1, v1] = a.split(':').map(Number);
  const [c2, v2] = b.split(':').map(Number);
  let n = 0;
  for (let c = c1; c <= c2; c++) n += (c === c2 ? v2 : chapters[c - 1].length) - (c === c1 ? v1 : 0);
  return n;
}

/** Families Chromium actually drew a sample of verse text with, via the DevTools protocol. */
async function fontsUsed(page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.book-section .verse' });
  const names = new Set();
  for (const nodeId of nodeIds.filter((_, i) => i % 97 === 0)) {
    const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    for (const f of fonts) if (f.glyphCount > 0) names.add(f.familyName);
  }
  await cdp.detach();
  return [...names];
}
