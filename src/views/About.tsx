import { useEffect } from 'react';
import { href } from '../lib/route';

export default function About() {
  useEffect(() => {
    document.title = 'About · Gospel Parallels';
  }, []);

  return (
    <article className="about">
      <section className="dedication">
        <p className="soli">Soli Deo gloria</p>
        <h1>To the glory of God, and for Darrell W. Johnson</h1>
        <p>
          This site is offered first to bless God Almighty, whose Word it sets before the reader, and whose Son these
          four Gospels proclaim.
        </p>
        <p>
          It is also a gift, with gratitude, for Darrell W. Johnson, who has been preaching Jesus Christ and his gospel
          for more than fifty years: as a pastor in California, at Union Church of Manila and at First Baptist Church
          in Vancouver, and as a teacher of preachers at Fuller Theological Seminary, Regent College and Carey
          Theological College. Today he serves at The Way Church and with The Pastorate Ministries Canada. He is the
          author of <cite>The Glory of Preaching</cite>, <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>,{' '}
          <cite>The Beatitudes</cite> and other books.
        </p>
        <p>
          His preaching begins where this tool does: by staying with the text, and letting it say what it says. The
          site grew out of a project Darrell and his family began together, comparing the order of events in Matthew,
          Mark and Luke with the order in John.
        </p>
        <p>
          <a href="https://www.darrelljohnson.ca/">Darrell’s sermons, books and teaching →</a>
        </p>
      </section>

      <section>
        <h2>How to use it</h2>
        <ul>
          <li>
            <strong>Read a section.</strong> Pick any section from the <a href={href.home()}>list</a> to see every
            Gospel’s account of it side by side. Under each column are the sections that come just before and after in
            that Gospel, so you can read the story in its own setting.
          </li>
          <li>
            <strong>Look up a passage.</strong> Type a reference such as <a href={href.passage('Mark 4:35-41')}>Mark 4:35-41</a>{' '}
            or <a href={href.passage('John 3:16')}>John 3:16</a>. The tool opens the section that contains it, with
            the verses you asked for marked.
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
        </ul>
      </section>

      <section>
        <h2>Colors and marks</h2>
        <ul className="color-key">
          <li>
            Each Gospel keeps its own color everywhere on the site:{' '}
            <span className="col-matthew"><span className="swatch" />Matthew</span>,{' '}
            <span className="col-mark"><span className="swatch" />Mark</span>,{' '}
            <span className="col-luke"><span className="swatch" />Luke</span> and{' '}
            <span className="col-john"><span className="swatch" />John</span>. It marks the top of each column, the
            Gospel’s name, and its references in the list of sections.
          </li>
          <li>
            <span className="verse target">Blue-gray shading</span> marks the verses you looked up.
          </li>
          <li>
            With <strong>Shade shared words</strong> turned on, gold shading marks words found in more than one account:{' '}
            <mark className="hl2">in two</mark>, <mark className="hl3">in three</mark>, <mark className="hl4">in all four</mark>.
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
          three Passovers (John 2:13; 6:4; 11:55). The best-known differences are the cleansing of the temple, which John
          places at the start of the ministry and the others in the final week, and the timing of the Last Supper and
          the crucifixion relative to the Passover.
        </p>
        <p>
          The Gospel writers arranged their material to proclaim who Jesus is, not only to keep a diary, so a
          difference in order is an invitation to ask what each writer is showing us by placing a story where he does.
        </p>
      </section>

      <section>
        <h2>About the text and the sections</h2>
        <p>
          Scripture is from the <a href="https://worldenglish.bible/">World English Bible</a>, a public-domain
          translation, taken unchanged from <a href="https://ebible.org/find/details.php?id=engwebp">eBible.org</a>.
          It includes some verses that are missing from the earliest manuscripts, such as Mark 16:9-20 and John
          7:53-8:11; the sections concerned say so.
        </p>
        <p>
          The division into sections and the choice of which passages count as parallel are editorial judgements,
          broadly following the traditional Gospel synopses. Every verse of all four Gospels belongs to exactly one
          section, so any passage you look up will be found. Where Matthew or Luke uses a saying in two places, only one
          is linked and the section notes point to the other.
        </p>
      </section>
    </article>
  );
}
