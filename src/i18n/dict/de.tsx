import type { Dict } from '../dict';
import { BOOKS } from '../books';
import { LOCALE_INFO } from '../locales';
import { formatRange } from '../../lib/refs';

// The dedication and the section tables take no helpers, so the Gospel names come
// straight from the shared table: a hard-coded "Matthäus" here would drift from it.
const N = BOOKS.de.names;
const TR = LOCALE_INFO.de.translation.name;

const abschnitte = (n: number) => (n === 1 ? 'einen Abschnitt' : `${n} Abschnitte`);
// toFixed gives "2.5"; German writes the decimal with a comma.
const decimal = (s: string) => s.replace('.', ',');

// Checked against src/data/text/de.json: the Lutherbibel 1912 prints Mark 16:9-20 in full.
const LONGER_ENDING = `Die beiden ältesten vollständigen griechischen Handschriften des Evangeliums nach ${N.mark} enden mit 16:8. ${N.mark} 16:9-20 steht in der ${TR}, gilt aber weithin als spätere Ergänzung.`;

const de: Dict = {
  siteName: 'Synopse der Evangelien',
  tagline: 'Die vier Evangelien nebeneinander',
  nav: { sections: 'Abschnitte', timeline: 'Zeitleiste', order: 'Reihenfolge', book: 'Buch', about: 'Über' },
  language: 'Sprache',
  lookup: { label: 'Bibelstelle suchen', placeholder: `Bibelstelle suchen, z. B. ${N.luke} 15:11-32`, go: 'Los' },
  loading: 'Die Evangelien werden geladen …',
  loadFailed: (message) => (
    <>
      <strong>Der Text der Evangelien konnte nicht geladen werden.</strong> {message}. Bitte laden Sie die Seite neu.
    </>
  ),
  footer: (link, licence) => <>Bibeltext: {link} ({licence.toLowerCase()}).</>,
  publicDomain: 'Gemeinfrei',

  home: {
    intro:
      'Wählen Sie einen Abschnitt, um alle Berichte darüber in parallelen Spalten zu lesen, oder geben Sie oben eine beliebige Bibelstelle ein, um ihre Parallelen zu finden. Jede Spalte zeigt, wo dieses Evangelium die Geschichte einordnet, mit den Abschnitten davor und danach.',
    filterGroup: 'Abschnitte filtern',
    filterLabel: 'Abschnitte nach Titel filtern',
    filterPlaceholder: 'Nach Titel filtern, z. B. Heilung',
    order: 'Reihenfolge',
    harmony: 'Harmonie (alle Abschnitte)',
    asTold: (g) => `Wie ${g} erzählt`,
    onlyShared: 'In mehr als einem Evangelium',
    count: (n, total) => `${n} von ${total} Abschnitten`,
    noMatch: (f) => `Kein Abschnittstitel passt zu „${f}“. Versuchen Sie es stattdessen mit dem Suchfeld oben.`,
  },

  reader: {
    notFound: (id) => `Es gibt keinen Abschnitt namens „${id}“.`,
    seeAll: 'Alle Abschnitte anzeigen',
    shade: 'Gemeinsame Wörter hervorheben',
    numbers: 'Versnummern',
    copyAll: 'Alles kopieren',
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyFailed: 'Kopieren fehlgeschlagen',
    print: 'Drucken',
    shadeIntro: 'Wörter, die in mehr als einem Bericht vorkommen, sind farbig hinterlegt:',
    in2: 'in 2',
    in3: 'in 3',
    in4: 'in allen 4',
    shadeCaveat:
      'Verglichen werden deutsche Wörter in einer einzigen Übersetzung, nicht der griechische Text; das ist eine Lesehilfe für das Auge, keine Analyse.',
    jumpLabel: 'Zu einem Evangelium springen',
    notIn: (names) => `Nicht bei ${names}.`,
    omitted: (t) => `Dieser Vers ist im Text der ${t} nicht enthalten.`,
    sectionOf: (i, n, g) => `Abschnitt ${i} von ${n} bei ${g}`,
    beginning: (g) => `${g}: Anfang`,
    end: (g) => `${g}: Ende`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> steht in diesem Abschnitt. Die gesuchten Verse sind {mark('so hinterlegt')}.
      </>
    ),
    spans: (n, g) =>
      `Diese Stelle erstreckt sich über ${n} Abschnitte bei ${g}. Wählen Sie einen aus, um ihn neben seinen Parallelen zu lesen.`,
    notFound: (q) => `„${q}“ wurde nicht gefunden.`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `Geben Sie eine Bibelstelle ein, etwa „${names.mark} 4:35-41“.`;
        case 'not-gospel':
          return `„${p.word}“ ist keines der vier Evangelien. Versuchen Sie ${names.matthew}, ${names.mark}, ${names.luke} oder ${names.john}.`;
        case 'no-chapter-given':
          return `Geben Sie ein Kapitel an, z. B. „${names[p.gospel]} 1“.`;
        case 'no-chapter':
          return p.gospel ? `${names[p.gospel]} hat kein Kapitel ${p.chapter}` : `Kapitel ${p.chapter} gibt es nicht`;
        case 'verse-count':
          return `${names[p.gospel]} ${p.chapter} hat ${p.verses === 1 ? 'nur einen Vers' : `${p.verses} Verse`}, nicht ${p.verse}`;
        case 'backwards':
          return `Bei ${formatRange(p.range)} liegt das Ende vor dem Anfang`;
        case 'unreadable':
          return `„${p.text}“ kann nicht gelesen werden`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `Reihenfolge: ${a} und ${b}`,
    title: 'Wo jedes Evangelium die Geschichte einordnet',
    intro:
      'Jede Spalte führt die Abschnitte eines Evangeliums von Anfang bis Ende auf, in der Reihenfolge, in der dieses Evangelium sie erzählt. Eine Linie verbindet einen Abschnitt mit demselben Abschnitt im anderen Evangelium. Wo sich Linien kreuzen, erzählen die beiden Evangelien diese Ereignisse in unterschiedlicher Reihenfolge.',
    left: 'Links',
    right: 'Rechts',
    summary: (a, na, b, nb, both) =>
      `${a} hat ${abschnitte(na)} und ${b} ${nb}; ${both} ${both === 1 ? 'kommt' : 'kommen'} in beiden vor.`,
    same: 'Die beiden Evangelien erzählen alle gemeinsamen Abschnitte in derselben Reihenfolge.',
    one: 'Ein einziger Abschnitt erklärt den Unterschied in der Reihenfolge. Lässt man ihn beiseite, erzählen die beiden Evangelien alles andere, was sie gemeinsam haben, in derselben Abfolge:',
    many: (n) =>
      `Diese ${n} Abschnitte erklären die Unterschiede in der Reihenfolge. Lässt man sie beiseite, erzählen die beiden Evangelien alles andere, was sie gemeinsam haben, in derselben Abfolge:`,
    position: (pa, na, a, pb, nb, b) => `— Abschnitt ${pa} von ${na} bei ${a}, ${pb} von ${nb} bei ${b}`,
    tie: 'Wenn zwei Erklärungen gleich einfach sind (hat ein Evangelium eine Geschichte nach vorn gerückt, oder das andere ihre Nachbarin nach hinten?), wird nur eine aufgeführt. Lesen Sie die Liste daher als „wo die Reihenfolge abweicht“, nicht als „was der Verfasser verschoben hat“.',
    legend: {
      label: 'Legende',
      same: 'Derselbe Abschnitt in beiden Evangelien',
      notable: 'Ein oben aufgeführter Abschnitt, an anderer Stelle erzählt',
      focus: 'Der Abschnitt, auf den Sie zeigen',
      sample: 'Titel',
      both: 'Auch im anderen Evangelium (der Balken hat die Farbe seiner eigenen Spalte)',
      only: 'Nur in diesem Evangelium, daher ohne Linie',
    },
    lane: (g) => `${g} der Reihe nach`,
  },

  // Two separate paragraphs on purpose: the sentence about praising God and the
  // sentence about Darrell must never be joined into one phrase.
  timeline: {
    title: 'Die Geschichte der Reihe nach',
    intro: 'Alle Abschnitte in der Reihenfolge der Harmonie, von links nach rechts, mit einer Zeile für jedes Evangelium. Ein Block in einer Zeile bedeutet, dass dieses Evangelium das Ereignis erzählt; eine leere Strecke, dass es das nicht tut. Wählen Sie einen Block, um alle Berichte nebeneinander zu lesen.',
    periods: {
      beginnings: 'Die Anfänge',
      preparation: 'Johannes der Täufer und die Taufe',
      early: 'Das frühe Wirken',
      galilee: 'Das Wirken in Galiläa',
      journey: 'Auf dem Weg nach Jerusalem',
      week: 'Die letzte Woche',
      passion: 'Die Passion',
      resurrection: 'Die Auferstehung',
    },
    days: {
      sunday: 'Sonntag · Palmsonntag',
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag · das Abendmahl',
      thursdayNight: 'Donnerstagnacht',
      friday: 'Freitag · Karfreitag',
      saturday: 'Samstag',
      easter: 'Ostersonntag',
      later: 'Nach Ostern',
    },
    dayNote: 'Die Tage der letzten Woche folgen der überlieferten Lesart der Zeitangaben in den Evangelien selbst, vor allem bei Markus; Abschnitte ohne Angabe bleiben ohne Tag. Johannes setzt das letzte Mahl „vor dem Passafest“ an (Johannes 13:1).',
    jump: 'Gehe zu',
    elsewhereKey: 'In diesem Evangelium an anderer Stelle erzählt',
    elsewhere: (g, after) => (after ? `${g} erzählt dies an anderer Stelle, nach „${after}“.` : `${g} erzählt dies an anderer Stelle, am Anfang.`),
  },

  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>Über diese Seite</h1>
      <p>
        Diese Seite ist dargebracht, um Gott, den Allmächtigen, zu loben, dessen Wort sie dem Leser vor Augen stellt
        und dessen Sohn diese vier Evangelien verkündigen.
      </p>
      <p>
        Sie wurde für Darrell W. Johnson erstellt, der seit mehr als fünfzig Jahren Jesus Christus und sein Evangelium
        predigt: als Pastor in Kalifornien, an der Union Church of Manila und an der First Baptist Church in
        Vancouver, und als Lehrer von Predigern am Fuller Theological Seminary, am Regent College und am Carey
        Theological College. Heute dient er in The Way Church und bei The Pastorate Ministries Canada. Er ist Autor
        von <cite>The Glory of Preaching</cite>, <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>,{' '}
        <cite>The Beatitudes</cite> und weiteren Büchern.
      </p>
      <p>
        Seine Predigt beginnt dort, wo auch dieses Werkzeug beginnt: beim Text zu bleiben und ihn sagen zu lassen,
        was er sagt. Die Seite ist aus einem Vorhaben hervorgegangen, das Darrell und seine Familie gemeinsam
        begonnen haben: die Reihenfolge der Ereignisse bei {N.matthew}, {N.mark} und {N.luke} mit der Reihenfolge bei{' '}
        {N.john} zu vergleichen.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Darrells Predigten, Bücher und Lehre →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>So benutzen Sie die Seite</h2>
        <ul>
          <li>
            <strong>Einen Abschnitt lesen.</strong> Wählen Sie einen beliebigen Abschnitt aus der{' '}
            <a href={href.home()}>Liste</a>, um den Bericht jedes Evangeliums nebeneinander zu sehen. Unter jeder
            Spalte stehen die Abschnitte, die in diesem Evangelium unmittelbar davor und danach kommen, sodass Sie die
            Geschichte in ihrem eigenen Zusammenhang lesen können.
          </li>
          <li>
            <strong>Eine Bibelstelle nachschlagen.</strong> Geben Sie eine Stelle ein, etwa{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> oder{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. Das Werkzeug öffnet den Abschnitt, der
            sie enthält, und markiert die gesuchten Verse.
          </li>
          <li>
            <strong>Die Reihenfolge vergleichen.</strong> Die Seite{' '}
            <a href={href.order('mark', 'john')}>Reihenfolge</a> stellt zwei Evangelien nebeneinander und verbindet
            die Abschnitte, die beide enthalten. So sehen Sie, wo ein Evangelium ein Ereignis an anderer Stelle
            erzählt als ein anderes.
          </li>
          <li>
            <strong>Gemeinsame Wörter hervorheben</strong> hinterlegt die Wörter, die in mehr als einem Bericht
            vorkommen. Verglichen werden deutsche Wörter in einer einzigen Übersetzung, nicht der griechische Text;
            das ist eine Lesehilfe für das Auge, keine Analyse.
          </li>
          <li>
            <strong>Als Buch drucken.</strong> Die Seite <a href={href.book()}>Buch</a> enthält alle Abschnitte in
            einem Band, zum Ausdrucken oder als PDF zum Herunterladen.
          </li>
        </ul>
      </section>

      <section>
        <h2>Farben und Markierungen</h2>
        <ul className="color-key">
          <li>
            Jedes Evangelium behält auf der ganzen Seite seine eigene Farbe:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> und{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. Sie kennzeichnet den Kopf
            jeder Spalte, den Namen des Evangeliums und seine Stellenangaben in der Liste der Abschnitte.
          </li>
          <li>
            <span className="verse target">Blaugraue Hinterlegung</span> markiert die Verse, die Sie nachgeschlagen
            haben.
          </li>
          <li>
            Ist <strong>Gemeinsame Wörter hervorheben</strong> eingeschaltet, markiert goldene Hinterlegung Wörter, die
            in mehr als einem Bericht vorkommen: <mark className="hl2">in zweien</mark>,{' '}
            <mark className="hl3">in dreien</mark>, <mark className="hl4">in allen vieren</mark>.
          </li>
          <li>
            Auf der Seite Reihenfolge verbindet eine graue Linie einen Abschnitt mit demselben Abschnitt im anderen
            Evangelium; eine <strong className="purple">violette</strong> Linie markiert einen Abschnitt, der an
            anderer Stelle erzählt wird; eine dunkle Linie ist die, auf die Sie gerade zeigen. Ein grauer Titel ohne
            Linie findet sich nur in diesem Evangelium.
          </li>
        </ul>
      </section>

      <section>
        <h2>Warum die Reihenfolge abweicht</h2>
        <p>
          {names.matthew}, {names.mark} und {names.luke} (die „synoptischen“ Evangelien) folgen großenteils derselben
          Reihenfolge: ein Wirken in Galiläa, dann eine einzige Reise nach Jerusalem für die letzte Woche. Bei{' '}
          {names.john} wechselt Jesus mehrmals zwischen Galiläa und Jerusalem, und es werden drei Passafeste genannt
          ({names.john} 2:13; 6:4; 11:55). Die bekanntesten Unterschiede sind die Tempelreinigung, die {names.john}{' '}
          an den Anfang des Wirkens Jesu stellt und die anderen in die letzte Woche, sowie die zeitliche Einordnung
          des letzten Abendmahls und der Kreuzigung im Verhältnis zum Passafest.
        </p>
        <p>
          Die Evangelisten haben ihren Stoff geordnet, um zu verkündigen, wer Jesus ist, und nicht nur, um ein
          Tagebuch zu führen. Eine abweichende Reihenfolge lädt darum zu der Frage ein, was uns jeder von ihnen
          zeigen will, indem er eine Geschichte gerade dorthin stellt.
        </p>
      </section>

      <section>
        <h2>Zum Text und zu den Abschnitten</h2>
        <p>
          Der Bibeltext ist die {translation} ({licence.toLowerCase()}), unverändert übernommen von{' '}
          <a href="https://ebible.org/">eBible.org</a>. {attribution} Er enthält einige Verse, die in den ältesten
          Handschriften fehlen, etwa {names.mark} 16:9-20 und {names.john} 7:53-8:11; die betreffenden Abschnitte
          weisen darauf hin.
        </p>
        <p>
          Die Einteilung in Abschnitte und die Entscheidung, welche Stellen als parallel gelten, sind redaktionelle
          Entscheidungen, die sich weitgehend an die herkömmlichen Evangeliensynopsen halten. Jeder Vers aller vier
          Evangelien gehört zu genau einem Abschnitt, sodass jede gesuchte Stelle gefunden wird. Wo {names.matthew}{' '}
          oder {names.luke} ein Wort Jesu an zwei Stellen bringt, ist nur eine verknüpft, und die Anmerkungen zu den
          Abschnitten verweisen auf die andere.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Buch',
    heading: 'Die ganze Seite als Buch',
    intro:
      'Alle Abschnitte in der Reihenfolge der Harmonie, in einem Band zum Ausdrucken oder Aufbewahren: mit der Widmung, einem Inhaltsverzeichnis und hinten einem Stellenregister, in dem sich jeder Vers finden lässt.',
    download: (pages, mb) => `PDF herunterladen (${pages} Seiten, ${decimal(mb)} MB)`,
    paper: (size) =>
      `Das PDF ist im Format ${size}. Wenn Sie stattdessen aus dem Browser drucken, wird Ihr eigenes Papierformat verwendet.`,
    print: 'Aus dem Browser drucken',
    notBuilt: 'Das PDF wird erstellt, wenn die Seite veröffentlicht wird; diese Kopie der Seite hat daher keines.',
    scripture: (t) => `Bibeltext: ${t}`,
    howToHeading: 'Zum Gebrauch dieses Buches',
    HowTo: ({ names }) => (
      <>
        <p>
          Jeder Abschnitt stellt die Berichte der Evangelien über ein Ereignis oder eine Lehre nebeneinander, eine
          Spalte je Evangelium. Die Abschnitte sind in der Reihenfolge einer Harmonie nummeriert (§): ungefähr in der
          Abfolge der Ereignisse, wie die herkömmlichen Evangeliensynopsen sie anordnen. Wo ein Evangelium eine
          Geschichte nicht erzählt, vermerkt der Abschnitt das.
        </p>
        <p>
          Ein farbiger Balken über jeder Spalte kennzeichnet ihr Evangelium:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          Um eine Stelle zu finden, schlagen Sie Kapitel und Vers im Stellenregister hinten im Buch nach; dort steht
          die Nummer des Abschnitts. Dieselben Abschnitte finden Sie unter gospels.yhwh.rest, wo Sie auch vergleichen
          können, in welcher Reihenfolge zwei Evangelien ihre Geschichte erzählen.
        </p>
      </>
    ),
    contents: 'Inhalt',
    indexHeading: 'Stellenregister',
    indexIntro:
      'Jeder Vers der vier Evangelien gehört zu genau einem Abschnitt. Suchen Sie Kapitel und Vers unter dem jeweiligen Evangelium und schlagen Sie dann die Nummer des Abschnitts auf.',
    creditsHeading: 'Über dieses Buch',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          Der Bibeltext ist die {translation} ({licence.toLowerCase()}), unverändert übernommen von eBible.org.{' '}
          {attribution}
        </p>
        <p>
          Die Einteilung in Abschnitte und die Auswahl der Parallelen sind redaktionelle Entscheidungen, die sich
          weitgehend an die herkömmlichen Evangeliensynopsen halten.
        </p>
        <p>Erstellt aus gospels.yhwh.rest am {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  // Names follow the Lutherbibel 1912 (Kapernaum, Beelzebub, Zachäus, Gadarener) so a
  // title matches the text beneath it; spelling otherwise follows today's rules.
  titles: {
    'prologue-word': 'Das Wort ward Fleisch',
    'luke-preface': 'Das Vorwort des Lukas an Theophilus',
    'john-birth-foretold': 'Die Ankündigung der Geburt Johannes des Täufers',
    annunciation: 'Der Engel Gabriel kommt zu Maria',
    magnificat: 'Maria besucht Elisabeth; der Lobgesang der Maria',
    'john-birth': 'Die Geburt Johannes des Täufers; der Lobgesang des Zacharias',
    genealogy: 'Der Stammbaum Jesu',
    birth: 'Die Geburt Jesu',
    shepherds: 'Die Hirten auf dem Felde',
    presentation: 'Die Darstellung im Tempel; Simeon und Hanna',
    magi: 'Die Weisen aus dem Morgenland',
    'flight-egypt': 'Die Flucht nach Ägypten; der Kindermord in Bethlehem',
    'return-nazareth': 'Die Rückkehr nach Nazareth',
    'boy-in-temple': 'Der zwölfjährige Jesus im Tempel',
    'baptist-preaching': 'Die Predigt Johannes des Täufers',
    'baptist-imprisoned': 'Johannes der Täufer wird gefangen gesetzt',
    baptism: 'Die Taufe Jesu',
    temptation: 'Die Versuchung in der Wüste',
    'first-disciples-john': `Die ersten Jünger (${N.john})`,
    cana: 'Die Hochzeit zu Kana',
    'temple-cleansing': 'Die Tempelreinigung',
    nicodemus: 'Jesus und Nikodemus',
    'baptist-final-testimony': 'Das letzte Zeugnis Johannes des Täufers',
    'samaritan-woman': 'Jesus und die Samariterin',
    'galilee-begins': 'Jesus kehrt nach Galiläa zurück',
    'officials-son': 'Die Heilung des Sohnes eines königlichen Beamten',
    'nazareth-rejection': 'Jesus wird in Nazareth verworfen',
    'calling-fishermen': 'Die Berufung der ersten Jünger',
    'capernaum-synagogue': 'Lehre in der Synagoge zu Kapernaum',
    'peters-mother-in-law': 'Die Heilung der Schwiegermutter des Petrus; Heilungen am Abend',
    'preaching-tour': 'Predigtreise durch Galiläa',
    leper: 'Die Heilung eines Aussätzigen',
    paralytic: 'Die Heilung eines Gichtbrüchigen',
    levi: 'Die Berufung des Levi (Matthäus); das Mahl mit den Sündern',
    'fasting-question': 'Die Frage nach dem Fasten',
    'grain-sabbath': 'Das Ährenraufen am Sabbat',
    'withered-hand': 'Die Heilung der verdorrten Hand',
    'crowds-by-sea': 'Die Menge kommt zu Jesus; der auserwählte Knecht',
    'choosing-twelve': 'Die Wahl der Zwölf',
    bethesda: 'Die Heilung am Teich Bethesda',
    'authority-of-son': 'Die Vollmacht des Sohnes; die Zeugen für Jesus',
    beatitudes: 'Die Seligpreisungen',
    'salt-light': 'Salz und Licht',
    'law-fulfilled': 'Jesus erfüllt das Gesetz',
    'greater-righteousness': 'Vom Zorn, vom Ehebruch, von der Ehescheidung und vom Schwören',
    'love-enemies': 'Vom Vergelten und von der Feindesliebe',
    'piety-in-secret': 'Almosen, Beten und Fasten im Verborgenen',
    'lords-prayer': 'Das Vaterunser',
    'treasure-heaven': 'Schätze im Himmel',
    'lamp-of-body': 'Das Auge als Licht des Leibes',
    'two-masters': 'Niemand kann zwei Herren dienen',
    'do-not-worry': 'Vom Sorgen',
    judging: 'Vom Richten',
    'ask-seek-knock': 'Bitten, Suchen, Anklopfen; die Goldene Regel',
    'two-foundations': 'Zwei Pforten, zwei Bäume, zwei Fundamente',
    centurion: 'Der Hauptmann von Kapernaum',
    'widow-nain': 'Der Jüngling zu Nain',
    'baptist-question': 'Die Anfrage des Täufers; Jesu Zeugnis über Johannes',
    'sinful-woman': 'Die Salbung durch die Sünderin',
    'women-followers': 'Die Frauen, die Jesus nachfolgten',
    'woes-cities': 'Weherufe über die Städte Galiläas',
    thanksgiving: 'Jesu Lobpreis des Vaters; kommt her zu mir',
    beelzebul: 'Jesus und Beelzebub',
    'sign-of-jonah': 'Das Zeichen des Jona',
    'unclean-spirit-returns': 'Die Rückkehr des unreinen Geistes',
    'true-blessedness': 'Wer wahrhaft selig ist',
    'true-family': 'Jesu wahre Verwandte',
    sower: 'Das Gleichnis vom Sämann',
    'why-parables': 'Der Sinn der Gleichnisse',
    'sower-explained': 'Die Deutung des Gleichnisses vom Sämann',
    'lamp-measure': 'Das Licht unter dem Scheffel; das Maß, mit dem ihr messt',
    'seed-growing': 'Die selbstwachsende Saat',
    weeds: 'Das Unkraut unter dem Weizen',
    'mustard-leaven': 'Senfkorn und Sauerteig',
    'use-of-parables': 'Jesu Reden in Gleichnissen',
    'weeds-explained': 'Die Deutung des Gleichnisses vom Unkraut',
    'treasure-pearl-net': 'Der Schatz im Acker, die Perle, das Netz',
    'would-be-followers': 'Vom Ernst der Nachfolge',
    'calming-storm': 'Die Stillung des Sturms',
    gerasene: 'Der besessene Gadarener',
    jairus: 'Die Tochter des Jairus; die Frau, die sein Gewand berührte',
    'two-blind-mute': 'Zwei Blinde; ein Stummer',
    harvest: 'Die Ernte ist groß',
    'sending-twelve': 'Die Aussendung der Zwölf',
    persecution: 'Kommende Verfolgung',
    'do-not-fear': 'Fürchtet euch nicht',
    'not-peace': 'Nicht Frieden, sondern das Schwert',
    'herod-baptist-death': 'Herodes und der Tod Johannes des Täufers',
    'feeding-5000': 'Die Speisung der Fünftausend',
    'walking-water': 'Jesus geht auf dem Wasser',
    gennesaret: 'Heilungen in Genezareth',
    'bread-of-life': 'Das Brot des Lebens',
    'words-eternal-life': 'Viele wenden sich ab; „Du hast Worte des ewigen Lebens“',
    'tradition-elders': 'Die Satzungen der Ältesten; was den Menschen unrein macht',
    'canaanite-woman': 'Die kanaanäische (syrophönizische) Frau',
    'deaf-man': 'Die Heilung eines Taubstummen; viele Heilungen',
    'feeding-4000': 'Die Speisung der Viertausend',
    'demand-sign': 'Die Zeichenforderung',
    'leaven-pharisees': 'Der Sauerteig der Pharisäer',
    'bethsaida-blind': 'Ein Blinder in Bethsaida',
    'peters-confession': 'Das Bekenntnis des Petrus',
    'first-prediction': 'Erste Leidensankündigung; das Kreuz auf sich nehmen',
    transfiguration: 'Die Verklärung Jesu',
    'boy-unclean-spirit': 'Die Heilung eines besessenen Knaben',
    'second-prediction': 'Zweite Leidensankündigung',
    'temple-tax': 'Die Tempelsteuer',
    greatest: 'Wer ist der Größte?',
    'strange-exorcist': 'Wer nicht wider uns ist',
    stumbling: 'Vom Ärgernis',
    'lost-sheep': 'Das verlorene Schaf',
    'forgive-brother': 'Zurechtweisung und Vergebung',
    'unforgiving-servant': 'Der Schalksknecht',
    'tabernacles-1': 'Am Laubhüttenfest',
    'tabernacles-2': 'Ist er der Christus? Ströme lebendigen Wassers',
    'adulterous-woman': 'Jesus und die Ehebrecherin',
    'light-of-world': 'Das Licht der Welt',
    'before-abraham': 'Die Wahrheit wird euch frei machen; ehe denn Abraham ward',
    'man-born-blind': 'Die Heilung des Blindgeborenen',
    'good-shepherd': 'Der gute Hirte',
    dedication: 'Am Fest der Tempelweihe',
    'samaritan-village': 'Ein Dorf der Samariter nimmt Jesus nicht auf',
    'sending-seventy': 'Die Aussendung der Siebzig',
    'seventy-return': 'Die Rückkehr der Siebzig',
    'great-commandment': 'Das höchste Gebot',
    'good-samaritan': 'Der barmherzige Samariter',
    'mary-martha': 'Maria und Martha',
    'friend-midnight': 'Der bittende Freund',
    'woes-at-dinner': 'Weherufe am Tisch eines Pharisäers',
    'rich-fool': 'Der reiche Kornbauer',
    'watchful-servants': 'Wachsame Knechte',
    'faithful-servant': 'Der treue und der untreue Knecht',
    'interpreting-times': 'Die Zeichen der Zeit; Versöhnung auf dem Weg',
    'repent-fig-tree': 'Buße oder Untergang; der unfruchtbare Feigenbaum',
    'crippled-woman': 'Die Heilung einer verkrümmten Frau am Sabbat',
    'narrow-door': 'Die enge Pforte',
    'lament-jerusalem': 'Die Klage über Jerusalem',
    dropsy: 'Die Heilung eines Wassersüchtigen',
    'places-at-table': 'Die Plätze bei Tisch; wen man einladen soll',
    'great-banquet': 'Das große Abendmahl; die königliche Hochzeit',
    'cost-discipleship': 'Die Kosten der Nachfolge',
    'lost-coin': 'Der verlorene Groschen',
    'prodigal-son': 'Der verlorene Sohn und sein Bruder',
    'shrewd-manager': 'Der ungerechte Haushalter',
    'law-and-divorce': 'Gesetz und Reich Gottes; die Ehescheidung',
    'rich-man-lazarus': 'Der reiche Mann und der arme Lazarus',
    'faith-duty': 'Glaube wie ein Senfkorn; unnütze Knechte',
    'ten-lepers': 'Die zehn Aussätzigen',
    'day-son-of-man': 'Der Tag des Menschensohns',
    'persistent-widow': 'Die bittende Witwe',
    'pharisee-tax-collector': 'Der Pharisäer und der Zöllner',
    divorce: 'Ehe und Ehescheidung',
    children: 'Die Segnung der Kinder',
    'rich-young-man': 'Der reiche Jüngling',
    'vineyard-workers': 'Die Arbeiter im Weinberg',
    'third-prediction': 'Dritte Leidensankündigung',
    'james-john-request': 'Die Bitte des Jakobus und Johannes',
    bartimaeus: 'Die Heilung des blinden Bartimäus',
    zacchaeus: 'Zachäus',
    talents: 'Die anvertrauten Zentner; die anvertrauten Pfunde',
    lazarus: 'Die Auferweckung des Lazarus',
    plot: 'Der Beschluss, Jesus zu töten',
    'bethany-anointing': 'Die Salbung in Bethanien',
    'triumphal-entry': 'Der Einzug in Jerusalem',
    'weeping-jerusalem': 'Jesus weint über Jerusalem',
    'greeks-seek': 'Griechen suchen Jesus; die Stunde ist gekommen',
    unbelief: 'Der Unglaube und ein letzter Ruf',
    'fig-tree': 'Die Verfluchung des Feigenbaums',
    'authority-questioned': 'Die Frage nach Jesu Vollmacht',
    'two-sons': 'Die ungleichen Söhne',
    'wicked-tenants': 'Die bösen Weingärtner',
    caesar: 'Der Zinsgroschen',
    'resurrection-question': 'Die Sadduzäer und die Auferstehung',
    'davids-son': 'Wessen Sohn ist der Christus?',
    'woes-scribes': 'Wehe euch, Schriftgelehrte und Pharisäer',
    'widows-offering': 'Das Scherflein der Witwe',
    'signs-of-end': 'Die Zerstörung des Tempels; Zeichen des Endes',
    desolation: 'Der Gräuel der Verwüstung; die große Trübsal',
    'son-of-man-coming': 'Das Kommen des Menschensohns',
    'lesson-fig-tree': 'Das Gleichnis vom Feigenbaum',
    'stay-awake': 'Seid wachsam',
    'ten-virgins': 'Die zehn Jungfrauen',
    'sheep-goats': 'Das Weltgericht',
    'judas-agrees': 'Judas erbietet sich zum Verrat',
    'passover-preparation': 'Die Vorbereitung des Passamahls',
    footwashing: 'Die Fußwaschung',
    'betrayer-foretold': 'Die Ankündigung des Verrats',
    'lords-supper': 'Die Einsetzung des Abendmahls',
    'dispute-greatness': 'Der Rangstreit der Jünger bei Tisch',
    'new-commandment': 'Das neue Gebot',
    'denial-foretold': 'Die Ankündigung der Verleugnung des Petrus',
    'two-swords': 'Beutel, Tasche und Schwert',
    'way-truth-life': 'Der Weg, die Wahrheit und das Leben; der verheißene Tröster',
    'true-vine': 'Der wahre Weinstock',
    'worlds-hatred': 'Der Hass der Welt',
    'spirit-joy': 'Das Wirken des Geistes; Traurigkeit wird zur Freude',
    'jesus-prays': 'Das hohepriesterliche Gebet',
    gethsemane: 'Jesus in Gethsemane',
    arrest: 'Die Gefangennahme Jesu',
    'before-high-priest': 'Jesus vor dem Hohenpriester',
    'peters-denials': 'Die Verleugnung des Petrus',
    'judas-death': 'Das Ende des Judas',
    'before-pilate': 'Jesus vor Pilatus',
    'before-herod': 'Jesus vor Herodes',
    sentenced: 'Barabbas wird freigegeben; Jesus wird verurteilt',
    'soldiers-mock': 'Die Verspottung durch die Soldaten',
    crucifixion: 'Die Kreuzigung',
    death: 'Der Tod Jesu',
    burial: 'Die Grablegung Jesu',
    guard: 'Die Wache am Grab',
    'empty-tomb': 'Das leere Grab',
    'mary-magdalene': 'Jesus erscheint Maria Magdalena',
    'guards-report': 'Der Bericht der Wächter',
    emmaus: 'Die Emmausjünger',
    'appears-disciples': 'Jesus erscheint den Jüngern',
    thomas: 'Jesus und Thomas',
    'purpose-of-john': 'Damit ihr glaubt',
    'great-commission': 'Der Missionsbefehl',
    ascension: 'Die Himmelfahrt',
    'by-the-sea': 'Das Mahl am See Tiberias',
    'peter-restored': 'Petrus wird wieder eingesetzt; der Jünger, den Jesus lieb hatte',
  },

  // Every „ “ here is the Lutherbibel 1912, copied from src/data/text/de.json; the
  // tests check each one against the text. Luther calls the Passover "Ostern", which
  // the prose around the quotations explains rather than corrects.
  notes: {
    genealogy: `${N.matthew} eröffnet sein Evangelium mit dem Stammbaum und führt ihn von Abraham an vorwärts; ${N.luke} stellt ihn hinter die Taufe und führt ihn zurück bis auf Adam.`,
    'baptist-imprisoned': `${N.luke} schließt die Geschichte des Johannes vor der Taufe Jesu ab. ${N.matthew} und ${N.mark} erzählen von der Gefangennahme erst später, als Rückblick (${N.matthew} 14:3-5; ${N.mark} 6:17-20).`,
    baptism: `Das Evangelium nach ${N.john} erzählt die Taufe selbst nicht; es gibt das Zeugnis Johannes des Täufers wieder, dass er den Geist herabkommen und auf Jesus bleiben sah.`,
    'temple-cleansing': `${N.john} stellt dies an das erste Passafest im Wirken Jesu (${N.john} 2:13). ${N.matthew}, ${N.mark} und ${N.luke} stellen es in die letzte Woche, gleich nach dem Einzug in Jerusalem.`,
    'officials-son': `Oft verglichen mit der Heilung des Knechtes des Hauptmanns (${N.matthew} 8:5-13; ${N.luke} 7:1-10): eine Heilung aus der Ferne, in Kapernaum, für einen Mann in amtlicher Stellung.`,
    'nazareth-rejection': `${N.luke} rückt diese Szene an den Beginn des öffentlichen Wirkens Jesu, wo seine Lesung aus Jesaja 61 die Gestalt alles Folgenden umreißt. ${N.matthew} und ${N.mark} stellen sie weit in das Wirken in Galiläa hinein.`,
    'calling-fishermen': `Der Bericht bei ${N.luke} enthält den reichen Fischfang und folgt erst, nachdem Jesus die Schwiegermutter des Simon bereits geheilt hat (${N.luke} 4:38-39). ${N.john} 1:35-51 beschreibt eine frühere Begegnung.`,
    beatitudes: `${N.matthew} verlegt die Rede auf einen Berg, ${N.luke} auf „einen Platz im Felde“ (${N.luke} 6:17). ${N.luke} stellt vier Seligpreisungen vier Weherufe gegenüber.`,
    'lords-prayer': `${N.matthew} stellt das Gebet in die Bergpredigt; bei ${N.luke} lehrt Jesus es unterwegs, als ein Jünger bittet: „HERR, lehre uns beten“.`,
    'sinful-woman': `Eine andere Salbung als die in Bethanien in der letzten Woche (${N.matthew} 26:6-13; ${N.mark} 14:3-9; ${N.john} 12:1-8); diese spielt in Galiläa, im Haus eines Pharisäers.`,
    'feeding-5000': 'Abgesehen von der Auferstehung das einzige Wunder, das alle vier Evangelien erzählen.',
    'words-eternal-life': `Das Bekenntnis des Petrus im Evangelium nach ${N.john}. Vergleiche das Bekenntnis bei Cäsarea Philippi (${N.matthew} 16:13-20; ${N.mark} 8:27-30; ${N.luke} 9:18-21).`,
    'adulterous-woman': `${N.john} 7:53-8:11 findet sich nicht in den ältesten griechischen Handschriften des Evangeliums nach ${N.john}, und viele Übersetzungen drucken den Abschnitt in Klammern.`,
    'great-commandment': `${N.luke} verlegt dieses Gespräch auf die Reise, wo es zum Gleichnis vom barmherzigen Samariter hinführt. Bei ${N.matthew} und ${N.mark} gehört es zu den letzten Streitgesprächen im Tempel.`,
    'woes-at-dinner': `Vieles davon entspricht der Rede gegen die Schriftgelehrten und Pharisäer in ${N.matthew} 23, die ${N.matthew} in den Tempel, in die letzte Woche, verlegt.`,
    'watchful-servants': `Vergleiche ${N.matthew} 24:42-44 und ${N.mark} 13:33-37.`,
    'lament-jerusalem': `${N.luke} stellt die Klage auf die Reise, bevor Jesus die Stadt erreicht; ${N.matthew} stellt sie in den Tempel, in die letzte Woche.`,
    'day-son-of-man': `Vergleiche ${N.matthew} 24:23-28, 37-41.`,
    'james-john-request': `${N.luke} berichtet von einem ähnlichen Streit darüber, wer der Größte sei, beim letzten Abendmahl (${N.luke} 22:24-30).`,
    plot: `${N.john} verknüpft den Beschluss des Hohen Rates unmittelbar mit der Auferweckung des Lazarus.`,
    'bethany-anointing': `${N.john} setzt dies sechs Tage vor dem Passafest an, vor dem Einzug in Jerusalem; ${N.matthew} und ${N.mark} zwei Tage davor, nach dem Einzug. ${N.luke} 7:36-50 erzählt von einer anderen Salbung.`,
    'fig-tree': `${N.mark} legt die Geschichte vom Feigenbaum wie einen Rahmen um die Tempelreinigung; ${N.matthew} erzählt sie in einem Stück, am Morgen danach.`,
    footwashing: `Bei ${N.matthew}, ${N.mark} und ${N.luke} ist das letzte Mahl ein Passamahl (${N.mark} 14:12). ${N.john} setzt es „vor dem Fest aber der Ostern“ an, also vor dem Passafest (${N.john} 13:1), mit der Kreuzigung am Rüsttag (${N.john} 19:14).`,
    'betrayer-foretold': `${N.luke} stellt die Ankündigung hinter Brot und Kelch; ${N.matthew} und ${N.mark} stellen sie davor.`,
    'lords-supper': `${N.john} berichtet beim Mahl nicht von Brot und Kelch; an ihrer Stelle erzählt er die Fußwaschung (${N.john} 13:1-20).`,
    'before-high-priest': `Nur ${N.john} beschreibt ein Verhör vor Hannas, dem Schwiegervater des Hohenpriesters Kaiphas.`,
    'judas-death': 'Vergleiche Apostelgeschichte 1:18-19.',
    sentenced: `${N.john} nennt die Stunde: „der Rüsttag auf Ostern, um die sechste Stunde“ (${N.john} 19:14). ${N.mark} sagt, Jesus sei um die dritte Stunde gekreuzigt worden (${N.mark} 15:25).`,
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Forms as they occur in the Lutherbibel 1912, including its daß, ward, gen, etliche
  // and "ist's", which today's spelling would miss.
  stopWords: `der die das den dem des ein eine einen einem einer eines und oder aber denn sondern doch so wie als da
  daß dass wenn ob also auch noch nun nicht kein keine er sie es ihr ihm ihn ihnen ich du wir uns euch mich mir
  dich dir sich sein seine seinen seinem seiner seines ihre ihren ihrem ihrer mein meine meinen meinem dein deine
  deinen euer eure unser was wer wo welcher welche welchen denen dieser diese dies dieses diesen diesem solches
  alle alles allen etliche man von zu zum zur auf aus mit bei nach vor über unter durch für um an in im am vom
  ins gen hin her wider bis ist war sind waren bin bist seid sei wäre wird werden werdet werde ward wurde wurden
  hat habe haben habt hast hatte hatten will soll sollt kann sprach sprachen spricht sage sagen sagte sagt
  gesagt antwortete siehe ist's`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default de;
