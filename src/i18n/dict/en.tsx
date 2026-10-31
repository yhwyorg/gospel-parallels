import { sections } from '../../data/sections';
import type { Dict } from '../dict';
import { describeProblem } from '../../lib/refs';

// English titles and notes live with the section table itself; every other
// language translates them from there.
const titles = Object.fromEntries(sections.map((s) => [s.id, s.title]));
const notes = Object.fromEntries(sections.flatMap((s) => (s.note ? [[s.id, s.note]] : [])));

const en: Dict = {
  siteName: 'Gospel Parallels',
  tagline: 'The four Gospels, side by side',
  nav: { sections: 'Sections', order: 'Order', book: 'Book', about: 'About' },
  language: 'Language',
  lookup: { label: 'Find a passage', placeholder: 'Find a passage, e.g. Luke 15:11-32', go: 'Go' },
  loading: 'Loading the Gospels…',
  loadFailed: (message) => (
    <>
      <strong>The Gospel text could not be loaded.</strong> {message}. Try reloading the page.
    </>
  ),
  footer: (link, licence) => <>Scripture from the {link} ({licence.toLowerCase()}).</>,
  publicDomain: 'Public domain',

  home: {
    intro:
      'Choose a section to read every account of it in parallel columns, or type any passage into the box above to find its parallels. Each column shows where that Gospel places the story, with the sections before and after it.',
    filterGroup: 'Filter sections',
    filterLabel: 'Filter sections by title',
    filterPlaceholder: 'Filter by title, e.g. healing',
    order: 'Order',
    harmony: 'Harmony (all sections)',
    asTold: (g) => `As told in ${g}`,
    onlyShared: 'In more than one Gospel',
    count: (n, total) => `${n} of ${total} sections`,
    noMatch: (f) => `No section titles match “${f}”. Try the passage box above instead.`,
  },

  reader: {
    notFound: (id) => `There is no section called “${id}”.`,
    seeAll: 'See all sections',
    shade: 'Shade shared words',
    numbers: 'Verse numbers',
    copyAll: 'Copy all',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    print: 'Print',
    shadeIntro: 'Words found in more than one account are shaded:',
    in2: 'in 2',
    in3: 'in 3',
    in4: 'in all 4',
    shadeCaveat:
      'This compares English words in one translation, not the Greek, so it is a pointer for the eye rather than an analysis.',
    jumpLabel: 'Jump to a Gospel',
    notIn: (names) => `Not in ${names}.`,
    omitted: (t) => `This verse is not included in the ${t} text.`,
    sectionOf: (i, n, g) => `Section ${i} of ${n} in ${g}`,
    beginning: (g) => `Beginning of ${g}`,
    end: (g) => `End of ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> is in this section. The verses you asked for are {mark('shaded like this')}.
      </>
    ),
    spans: (n, g) => `This passage runs across ${n} sections of ${g}. Choose one to read it alongside its parallels.`,
    notFound: (q) => `Couldn’t find “${q}”.`,
    problem: (p, names) => describeProblem(p, names),
  },

  order: {
    docTitle: (a, b) => `Order: ${a} and ${b}`,
    title: 'Where each Gospel places the story',
    intro:
      'Each column lists one Gospel’s sections from beginning to end, in the order that Gospel tells them. A line joins a section to the same section in the other Gospel. Where lines cross, the two Gospels tell those events in a different order.',
    left: 'Left',
    right: 'Right',
    summary: (a, na, b, nb, both) => `${a} has ${na} sections and ${b} has ${nb}; ${both} are in both.`,
    same: 'The two Gospels tell every shared section in the same order.',
    one: 'One section accounts for the difference in order. Set it aside, and the two Gospels tell everything else they share in the same sequence:',
    many: (n) =>
      `These ${n} sections account for the differences in order. Set them aside, and the two Gospels tell everything else they share in the same sequence:`,
    position: (pa, na, a, pb, nb, b) => `— section ${pa} of ${na} in ${a}, ${pb} of ${nb} in ${b}`,
    tie: 'When two explanations are equally simple (did one Gospel move a story earlier, or the other move its neighbor later?) only one is listed, so read the list as “where the order differs”, not “what the writer moved”.',
    legend: {
      label: 'Key',
      same: 'Same section in both Gospels',
      notable: 'A section listed above, told at a different point',
      focus: 'The section you are pointing at',
      sample: 'Title',
      both: 'Also in the other Gospel (the bar is in its own column’s color)',
      only: 'Only in this Gospel, so no line',
    },
    lane: (g) => `${g} in order`,
  },

  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>About this site</h1>
      <p>
        This site is offered to bless God Almighty, whose Word it sets before the reader, and whose Son these four
        Gospels proclaim.
      </p>
      <p>
        It was made for Darrell W. Johnson, who has been preaching Jesus Christ and his gospel for more than fifty
        years: as a pastor in California, at Union Church of Manila and at First Baptist Church in Vancouver, and as a
        teacher of preachers at Fuller Theological Seminary, Regent College and Carey Theological College. Today he
        serves at The Way Church and with The Pastorate Ministries Canada. He is the author of{' '}
        <cite>The Glory of Preaching</cite>, <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>,{' '}
        <cite>The Beatitudes</cite> and other books.
      </p>
      <p>
        His preaching begins where this tool does: by staying with the text, and letting it say what it says. The site
        grew out of a project Darrell and his family began together, comparing the order of events in Matthew, Mark and
        Luke with the order in John.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Darrell’s sermons, books and teaching →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>How to use it</h2>
        <ul>
          <li>
            <strong>Read a section.</strong> Pick any section from the <a href={href.home()}>list</a> to see every
            Gospel’s account of it side by side. Under each column are the sections that come just before and after in
            that Gospel, so you can read the story in its own setting.
          </li>
          <li>
            <strong>Look up a passage.</strong> Type a reference such as{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> or{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. The tool opens the section that
            contains it, with the verses you asked for marked.
          </li>
          <li>
            <strong>Compare the order.</strong> The <a href={href.order('mark', 'john')}>Order</a> page lines up two
            Gospels and joins the sections they share, so you can see where one Gospel places an event at a different
            point from another.
          </li>
          <li>
            <strong>Shade shared words</strong> shades the words that appear in more than one account. It compares
            English words in one translation, not the Greek, so it is a pointer for the eye rather than an analysis.
          </li>
          <li>
            <strong>Print it as a book.</strong> The <a href={href.book()}>Book</a> page has every section in one
            volume, to print or download as a PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>Colors and marks</h2>
        <ul className="color-key">
          <li>
            Each Gospel keeps its own color everywhere on the site:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> and{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. It marks the top of each
            column, the Gospel’s name, and its references in the list of sections.
          </li>
          <li>
            <span className="verse target">Blue-gray shading</span> marks the verses you looked up.
          </li>
          <li>
            With <strong>Shade shared words</strong> turned on, gold shading marks words found in more than one
            account: <mark className="hl2">in two</mark>, <mark className="hl3">in three</mark>,{' '}
            <mark className="hl4">in all four</mark>.
          </li>
          <li>
            On the Order page, a gray line joins a section to the same section in the other Gospel; a{' '}
            <strong className="purple">purple</strong> line marks a section told at a different point; a dark line is
            the one you are pointing at. A title in gray, with no line, is found only in that Gospel.
          </li>
        </ul>
      </section>

      <section>
        <h2>Why the order differs</h2>
        <p>
          Matthew, Mark and Luke (the “Synoptic” Gospels) share much of their order: a ministry in Galilee, then one
          journey to Jerusalem for the final week. John moves between Galilee and Jerusalem several times, and mentions
          three Passovers (John 2:13; 6:4; 11:55). The best-known differences are the cleansing of the temple, which
          John places at the start of the ministry and the others in the final week, and the timing of the Last Supper
          and the crucifixion relative to the Passover.
        </p>
        <p>
          The Gospel writers arranged their material to proclaim who Jesus is, not only to keep a diary, so a
          difference in order is an invitation to ask what each writer is showing us by placing a story where he does.
        </p>
      </section>

      <section>
        <h2>About the text and the sections</h2>
        <p>
          Scripture is from the {translation} ({licence.toLowerCase()}), taken unchanged from{' '}
          <a href="https://ebible.org/">eBible.org</a>. {attribution} It includes some verses that are missing from the
          earliest manuscripts, such as Mark 16:9-20 and John 7:53-8:11; the sections concerned say so.
        </p>
        <p>
          The division into sections and the choice of which passages count as parallel are editorial judgements,
          broadly following the traditional Gospel synopses. Every verse of all four Gospels belongs to exactly one
          section, so any passage you look up will be found. Where Matthew or Luke uses a saying in two places, only
          one is linked and the section notes point to the other.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Book',
    heading: 'The whole site as a book',
    intro:
      'Every section, in harmony order, in one volume to print or keep: with the dedication, a list of contents, and an index of passages at the back so any verse can be found.',
    download: (pages, mb) => `Download the PDF (${pages} pages, ${mb} MB)`,
    paper: (size) => `The PDF is ${size} size. Printing from your browser instead uses your own paper size.`,
    print: 'Print from your browser',
    notBuilt: 'The PDF is made when the site is published, so this copy of the site does not have one.',
    scripture: (t) => `Scripture: ${t}`,
    howToHeading: 'How to read this book',
    HowTo: ({ names }) => (
      <>
        <p>
          Each section sets the Gospels’ accounts of one event or teaching side by side, one column per Gospel.
          Sections are numbered (§) in a harmony order: roughly the order of events, as the traditional Gospel
          synopses arrange them. Where a Gospel does not tell a story, the section says so.
        </p>
        <p>
          A colored bar at the top of each column marks its Gospel:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          To find a passage, look up its chapter and verse in the index at the back, which gives the section number.
          The same sections are at gospels.yhwh.rest, where you can also compare the order in which two Gospels tell
          their story.
        </p>
      </>
    ),
    contents: 'Contents',
    indexHeading: 'Index of passages',
    indexIntro:
      'Every verse of the four Gospels belongs to exactly one section. Find the chapter and verse under its Gospel, then turn to the section number.',
    creditsHeading: 'About this book',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          Scripture is from the {translation} ({licence.toLowerCase()}), taken unchanged from eBible.org. {attribution}
        </p>
        <p>
          The division into sections and the choice of parallels are editorial judgements, broadly following the
          traditional Gospel synopses.
        </p>
        <p>Made from gospels.yhwh.rest on {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles,
  notes,

  stopWords: `the and of to a in that he him his it is was for with they them their you your but not be as on said
  this have who all were are by from had when one at so there what an or which then will i me my we us our
  she her its if no up out into also do did has been would shall may now came come went even these those
  because than unto upon how why where also very let what whoever whatever about over after before
  much other another himself herself themselves any some such saying says`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default en;
