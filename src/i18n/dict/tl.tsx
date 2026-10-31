import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// Notes quote the Tagalog Unlocked Literal Bible exactly, inside “ ”; the tests check every
// quotation against src/data/text/tl.json, so a quotation must never be retranslated from English.
const LONGER_ENDING =
  'Ang dalawang pinakamatandang kumpletong manuskritong Griyego ng Marcos ay nagtatapos sa 16:8. Ang Marcos 16:9-20 ay nakalimbag sa Tagalog Unlocked Literal Bible ngunit malawak na itinuturing na idinagdag nang kalaunan.';

const tl: Dict = {
  siteName: 'Paghahambing ng mga Ebanghelyo',
  tagline: 'Ang apat na Ebanghelyo, magkakatabi',
  nav: { sections: 'Mga Bahagi', timeline: 'Takdang Panahon', order: 'Pagkakasunod', book: 'Aklat', about: 'Tungkol Dito' },
  language: 'Wika',
  lookup: { label: 'Maghanap ng talata', placeholder: 'Maghanap ng talata, hal. Lucas 15:11-32', go: 'Hanapin' },
  loading: 'Kinukuha ang mga Ebanghelyo…',
  loadFailed: (message) => (
    <>
      <strong>Hindi makuha ang teksto ng Ebanghelyo.</strong> {message}. Subukang i-reload ang pahina.
    </>
  ),
  // Not lowercased as in English: the licence here is "CC BY-SA 4.0", whose letters are its name.
  footer: (link, licence) => <>Kasulatan mula sa {link} ({licence}).</>,
  publicDomain: 'Pampublikong domain',

  home: {
    intro:
      'Pumili ng isang bahagi upang mabasa ang bawat salaysay nito sa magkakatabing hanay, o mag-type ng anumang talata sa kahon sa itaas upang makita ang mga kahanay nito. Ipinapakita ng bawat hanay kung saan inilalagay ng Ebanghelyong iyon ang salaysay, kasama ang mga bahaging nauuna at sumusunod dito.',
    filterGroup: 'Salain ang mga bahagi',
    filterLabel: 'Salain ang mga bahagi ayon sa pamagat',
    filterPlaceholder: 'Salain ayon sa pamagat, hal. pagpapagaling',
    order: 'Pagkakasunod',
    harmony: 'Pinag-isang pagkakasunod (lahat ng bahagi)',
    // The Gospel names are the evangelists' names, so "kay" is right for all four.
    asTold: (g) => `Ayon kay ${g}`,
    onlyShared: 'Nasa higit sa isang Ebanghelyo',
    count: (n, total) => `${n} sa ${total} bahagi`,
    noMatch: (f) => `Walang pamagat ng bahagi na tumutugma sa ‘${f}’. Subukan na lang ang kahon ng talata sa itaas.`,
  },

  reader: {
    notFound: (id) => `Walang bahaging tinatawag na ‘${id}’.`,
    seeAll: 'Tingnan ang lahat ng bahagi',
    shade: 'Markahan ang magkaparehong salita',
    numbers: 'Bilang ng talata',
    copyAll: 'Kopyahin lahat',
    copy: 'Kopyahin',
    copied: 'Nakopya na',
    copyFailed: 'Hindi nakopya',
    print: 'I-print',
    shadeIntro: 'May lilim ang mga salitang makikita sa higit sa isang salaysay:',
    in2: 'sa 2',
    in3: 'sa 3',
    in4: 'sa lahat ng 4',
    shadeCaveat:
      'Inihahambing nito ang mga salitang Tagalog sa iisang salin, hindi ang Griyego, kaya ito ay gabay lamang sa mata at hindi isang pagsusuri.',
    jumpLabel: 'Pumunta sa isang Ebanghelyo',
    notIn: (names) => `Wala sa ${names}.`,
    omitted: (t) => `Ang talatang ito ay wala sa teksto ng ${t}.`,
    sectionOf: (i, n, g) => `Bahagi ${i} ng ${n} sa ${g}`,
    beginning: (g) => `Simula ng ${g}`,
    end: (g) => `Wakas ng ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        Ang <strong>{ref}</strong> ay nasa bahaging ito. Ang mga talatang hinanap mo ay {mark('may ganitong lilim')}.
      </>
    ),
    spans: (n, g) =>
      `Ang talatang ito ay sumasaklaw sa ${n} bahagi ng ${g}. Pumili ng isa upang basahin ito kasama ng mga kahanay nito.`,
    notFound: (q) => `Hindi makita ang ‘${q}’.`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `Mag-type ng talata, gaya ng ‘${names.mark} 4:35-41’.`;
        case 'not-gospel':
          return `Ang ‘${p.word}’ ay hindi isa sa apat na Ebanghelyo. Subukan ang ${names.matthew}, ${names.mark}, ${names.luke} o ${names.john}.`;
        case 'no-chapter-given':
          return `Lagyan ng kabanata, hal. ‘${names[p.gospel]} 1’.`;
        case 'no-chapter':
          return p.gospel ? `Walang kabanata ${p.chapter} ang ${names[p.gospel]}.` : `Walang kabanata ${p.chapter}.`;
        case 'verse-count':
          return `May ${p.verses} talata ang ${names[p.gospel]} ${p.chapter}, hindi ${p.verse}.`;
        case 'backwards':
          return `Pabaligtad ang ${formatRange(p.range)}.`;
        case 'unreadable':
          return `Hindi mabasa ang ‘${p.text}’.`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `Pagkakasunod: ${a} at ${b}`,
    title: 'Kung saan inilalagay ng bawat Ebanghelyo ang salaysay',
    intro:
      'Inililista ng bawat hanay ang mga bahagi ng isang Ebanghelyo mula simula hanggang wakas, ayon sa pagkakasunod ng pagsasalaysay ng Ebanghelyong iyon. Pinagdurugtong ng isang guhit ang isang bahagi at ang kaparehong bahagi sa kabilang Ebanghelyo. Kung saan nagkakrus ang mga guhit, magkaiba ang pagkakasunod ng pagsasalaysay ng dalawang Ebanghelyo sa mga pangyayaring iyon.',
    left: 'Kaliwa',
    right: 'Kanan',
    summary: (a, na, b, nb, both) => `May ${na} bahagi ang ${a} at ${nb} naman ang ${b}; ${both} ang nasa kapwa.`,
    same: 'Magkapareho ang pagkakasunod ng dalawang Ebanghelyo sa bawat bahaging kapwa nila isinalaysay.',
    one: 'Isang bahagi ang dahilan ng pagkakaiba sa pagkakasunod. Kapag isinantabi ito, isinasalaysay ng dalawang Ebanghelyo ang lahat ng iba pa nilang magkatulad na bahagi sa parehong pagkakasunod:',
    many: (n) =>
      `Ang ${n} bahaging ito ang dahilan ng mga pagkakaiba sa pagkakasunod. Kapag isinantabi ang mga ito, isinasalaysay ng dalawang Ebanghelyo ang lahat ng iba pa nilang magkatulad na bahagi sa parehong pagkakasunod:`,
    position: (pa, na, a, pb, nb, b) => `— bahagi ${pa} ng ${na} sa ${a}, ${pb} ng ${nb} sa ${b}`,
    tie: 'Kapag magkasinsimple ang dalawang paliwanag (inilipat ba ng isang Ebanghelyo ang salaysay nang mas maaga, o inilipat ng isa pa ang katabi nito nang mas huli?), isa lamang ang nakalista. Kaya basahin ang listahan bilang ‘kung saan nagkakaiba ang pagkakasunod’, hindi ‘kung ano ang inilipat ng manunulat’.',
    legend: {
      label: 'Susi',
      same: 'Parehong bahagi sa dalawang Ebanghelyo',
      notable: 'Isang bahaging nakalista sa itaas, na isinalaysay sa ibang punto',
      focus: 'Ang bahaging itinuturo mo',
      sample: 'Pamagat',
      both: 'Nasa kabilang Ebanghelyo rin (nasa kulay ng sarili nitong hanay ang bar)',
      only: 'Nasa Ebanghelyong ito lamang, kaya walang guhit',
    },
    lane: (g) => `${g} ayon sa pagkakasunod`,
  },

  // Kept to two separate statements, as in English: the site is offered to bless God, and
  // it was made for Darrell. "Parangal" and "alaala" are avoided on purpose; he is alive.
  timeline: {
    title: 'Ang Kuwento ayon sa Pagkakasunod',
    intro: 'Lahat ng bahagi ayon sa pinag-isang pagkakasunod, mula kaliwa pakanan, na may isang hanay para sa bawat Ebanghelyo. Kapag may bloke sa isang hanay, isinasalaysay ng Ebanghelyong iyon ang pangyayari; kapag walang laman, hindi ito isinasalaysay. Pumili ng bloke upang mabasa nang magkakatabi ang lahat ng salaysay.',
    periods: {
      beginnings: 'Ang Pasimula',
      preparation: 'Si Juan Bautista at ang Bautismo',
      early: 'Ang Maagang Ministeryo',
      galilee: 'Ang Ministeryo sa Galilea',
      journey: 'Patungong Jerusalem',
      week: 'Ang Huling Linggo',
      passion: 'Ang Pagpapakasakit',
      resurrection: 'Ang Muling Pagkabuhay',
    },
    days: {
      sunday: 'Linggo · Linggo ng Palaspas',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miyerkules',
      thursday: 'Huwebes · ang Huling Hapunan',
      thursdayNight: 'Huwebes ng gabi',
      friday: 'Biyernes · Biyernes Santo',
      saturday: 'Sabado',
      easter: 'Linggo ng Pagkabuhay',
      later: 'Pagkatapos ng Pagkabuhay',
    },
    dayNote: 'Ang mga araw ng huling linggo ay ayon sa nakaugaliang pagbasa sa mga palatandaan ng mga Ebanghelyo mismo, lalo na kay Marcos; walang araw ang mga bahaging walang palatandaan. Inilalagay ni Juan ang huling hapunan “bago ang Kapistahan ng Paskuwa” (Juan 13:1).',
    jump: 'Pumunta sa',
    elsewhereKey: 'Isinalaysay sa ibang bahagi ng Ebanghelyong ito',
    elsewhere: (g, after) => (after ? `Isinalaysay ito ni ${g} sa ibang bahagi, pagkatapos ng “${after}”.` : `Isinalaysay ito ni ${g} sa ibang bahagi, sa simula.`),
  },

  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>Tungkol sa site na ito</h1>
      <p>
        Ang site na ito ay inihahandog upang purihin ang Diyos na Makapangyarihan sa lahat, na ang Salita ay inilalapit
        nito sa mambabasa, at na ang Anak ay ipinahahayag ng apat na Ebanghelyong ito.
      </p>
      <p>
        Ginawa ito para kay Darrell W. Johnson, na mahigit limampung taon nang nangangaral tungkol kay Jesu-Cristo at
        sa kaniyang ebanghelyo: bilang pastor sa California, sa Union Church of Manila at sa First Baptist Church sa
        Vancouver, at bilang guro ng mga mangangaral sa Fuller Theological Seminary, Regent College at Carey
        Theological College. Sa kasalukuyan, naglilingkod siya sa The Way Church at sa The Pastorate Ministries Canada.
        Siya ang may-akda ng <cite>The Glory of Preaching</cite>, <cite>Who Is Jesus?</cite>,{' '}
        <cite>Jesus the Healer</cite>, <cite>The Beatitudes</cite> at iba pang aklat.
      </p>
      <p>
        Nagsisimula ang kaniyang pangangaral kung saan nagsisimula ang kasangkapang ito: sa pananatili sa teksto, at sa
        pagpapahintulot dito na sabihin ang sinasabi nito. Nagmula ang site na ito sa isang proyektong sinimulan nang
        magkakasama ni Darrell at ng kaniyang pamilya, na naghahambing sa pagkakasunod ng mga pangyayari sa Mateo,
        Marcos at Lucas sa pagkakasunod sa Juan.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Mga sermon, aklat at pagtuturo ni Darrell →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>Paano ito gamitin</h2>
        <ul>
          <li>
            <strong>Magbasa ng isang bahagi.</strong> Pumili ng anumang bahagi mula sa{' '}
            <a href={href.home()}>listahan</a> upang makita nang magkakatabi ang salaysay nito sa bawat Ebanghelyo. Sa
            ilalim ng bawat hanay ay ang mga bahaging nauuna at sumusunod dito sa Ebanghelyong iyon, upang mabasa mo
            ang salaysay sa sarili nitong konteksto.
          </li>
          <li>
            <strong>Maghanap ng talata.</strong> Mag-type ng sanggunian gaya ng{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> o{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. Bubuksan nito ang bahaging naglalaman
            nito, at may marka ang mga talatang hinanap mo.
          </li>
          <li>
            <strong>Ihambing ang pagkakasunod.</strong> Inihahanay ng pahinang{' '}
            <a href={href.order('mark', 'john')}>Pagkakasunod</a> ang dalawang Ebanghelyo at pinagdurugtong ang mga
            bahaging kapwa nila isinalaysay, upang makita mo kung saan inilalagay ng isang Ebanghelyo ang isang
            pangyayari sa ibang punto kaysa sa iba.
          </li>
          <li>
            <strong>Markahan ang magkaparehong salita</strong> — nilalagyan nito ng lilim ang mga salitang lumilitaw sa
            higit sa isang salaysay. Inihahambing nito ang mga salitang Tagalog sa iisang salin, hindi ang Griyego,
            kaya ito ay gabay lamang sa mata at hindi isang pagsusuri.
          </li>
          <li>
            <strong>I-print bilang aklat.</strong> Nasa pahinang <a href={href.book()}>Aklat</a> ang bawat bahagi sa
            iisang tomo, upang i-print o i-download bilang PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>Mga kulay at marka</h2>
        <ul className="color-key">
          <li>
            May sariling kulay ang bawat Ebanghelyo saanman sa site:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> at{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. Minamarkahan nito ang itaas ng
            bawat hanay, ang pangalan ng Ebanghelyo, at ang mga sanggunian nito sa listahan ng mga bahagi.
          </li>
          <li>
            Minamarkahan ng <span className="verse target">asul-abong lilim</span> ang mga talatang hinanap mo.
          </li>
          <li>
            Kapag nakabukas ang <strong>Markahan ang magkaparehong salita</strong>, minamarkahan ng gintong lilim ang
            mga salitang makikita sa higit sa isang salaysay: <mark className="hl2">sa dalawa</mark>,{' '}
            <mark className="hl3">sa tatlo</mark>, <mark className="hl4">sa lahat ng apat</mark>.
          </li>
          <li>
            Sa pahinang Pagkakasunod, pinagdurugtong ng abuhing guhit ang isang bahagi at ang kaparehong bahagi sa
            kabilang Ebanghelyo; ang <strong className="purple">lilang</strong> guhit ay nagmamarka ng bahaging
            isinalaysay sa ibang punto; ang madilim na guhit ay ang itinuturo mo. Ang pamagat na kulay abo, na walang
            guhit, ay makikita lamang sa Ebanghelyong iyon.
          </li>
        </ul>
      </section>

      <section>
        <h2>Bakit nagkakaiba ang pagkakasunod</h2>
        <p>
          Malaking bahagi ng pagkakasunod ang magkatulad sa {names.matthew}, {names.mark} at {names.luke} (ang mga
          Ebanghelyong ‘Sinoptiko’): isang ministeryo sa Galilea, at pagkatapos ay isang paglalakbay patungong
          Jerusalem para sa huling linggo. Sa {names.john}, ilang ulit na nagpabalik-balik si Jesus sa Galilea at
          Jerusalem, at tatlong Paskuwa ang nabanggit ({names.john} 2:13; 6:4; 11:55). Ang pinakakilalang mga
          pagkakaiba ay ang paglilinis sa templo, na inilagay ni {names.john} sa simula ng ministeryo at ng iba sa
          huling linggo, at ang panahon ng Huling Hapunan at ng pagpapako sa krus kaugnay ng Paskuwa.
        </p>
        <p>
          Isinaayos ng mga sumulat ng Ebanghelyo ang kanilang mga salaysay upang ipahayag kung sino si Jesus, hindi
          lamang upang mag-ingat ng talaarawan. Kaya ang pagkakaiba sa pagkakasunod ay paanyaya na itanong kung ano ang
          ipinapakita sa atin ng bawat manunulat sa paglalagay niya ng isang salaysay sa kinalalagyan nito.
        </p>
      </section>

      <section>
        <h2>Tungkol sa teksto at sa mga bahagi</h2>
        <p>
          Ang Kasulatan ay mula sa {translation} ({licence}), kinuha nang walang pagbabago mula sa{' '}
          <a href="https://ebible.org/">eBible.org</a>. {attribution} Kasama rito ang ilang talatang wala sa
          pinakamaagang mga manuskrito, gaya ng {names.mark} 16:9-20 at {names.john} 7:53-8:11; sinasabi ito ng mga
          bahaging may kinalaman dito.
        </p>
        <p>
          Ang paghahati sa mga bahagi at ang pagpili kung aling mga talata ang ituturing na magkakahanay ay mga
          pagpapasya ng patnugot, na sa pangkalahatan ay sumusunod sa mga tradisyonal na sinopsis ng mga Ebanghelyo.
          Ang bawat talata ng apat na Ebanghelyo ay kabilang sa iisang bahagi lamang, kaya makikita ang anumang talatang
          hahanapin mo. Kung ginamit ni {names.matthew} o ni {names.luke} ang isang pananalita sa dalawang lugar, isa
          lamang ang naka-link at itinuturo ng mga tala ng bahagi ang isa pa.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Aklat',
    heading: 'Ang buong site bilang isang aklat',
    intro:
      'Ang bawat bahagi, sa pinag-isang pagkakasunod, sa iisang tomo na maaaring i-print o itago: kasama ang paghahandog, ang talaan ng nilalaman, at isang indeks ng mga talata sa hulihan upang makita ang anumang talata.',
    download: (pages, mb) => `I-download ang PDF (${pages} pahina, ${mb} MB)`,
    paper: (size) => `${size} ang laki ng PDF. Kung magpi-print ka mula sa iyong browser, gagamitin ang sarili mong laki ng papel.`,
    print: 'I-print mula sa iyong browser',
    notBuilt: 'Ginagawa ang PDF kapag inilalathala ang site, kaya walang PDF ang kopyang ito ng site.',
    scripture: (t) => `Kasulatan: ${t}`,
    howToHeading: 'Paano basahin ang aklat na ito',
    HowTo: ({ names }) => (
      <>
        <p>
          Inilalagay ng bawat bahagi nang magkakatabi ang mga salaysay ng mga Ebanghelyo tungkol sa isang pangyayari o
          aral, isang hanay bawat Ebanghelyo. May bilang (§) ang mga bahagi ayon sa pinag-isang pagkakasunod: halos ang
          pagkakasunod ng mga pangyayari, ayon sa pagkakaayos ng mga tradisyonal na sinopsis ng mga Ebanghelyo. Kung
          hindi isinalaysay ng isang Ebanghelyo ang isang pangyayari, sinasabi ito ng bahagi.
        </p>
        <p>
          Minamarkahan ng may-kulay na bar sa itaas ng bawat hanay ang Ebanghelyo nito:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          Upang makahanap ng talata, hanapin ang kabanata at talata nito sa indeks sa hulihan, na nagbibigay ng bilang
          ng bahagi. Ang parehong mga bahagi ay nasa gospels.yhwh.rest, kung saan maaari mo ring ihambing ang
          pagkakasunod ng pagsasalaysay ng dalawang Ebanghelyo.
        </p>
      </>
    ),
    contents: 'Nilalaman',
    indexHeading: 'Indeks ng mga talata',
    indexIntro:
      'Ang bawat talata ng apat na Ebanghelyo ay kabilang sa iisang bahagi lamang. Hanapin ang kabanata at talata sa ilalim ng Ebanghelyo nito, saka pumunta sa bilang ng bahagi.',
    creditsHeading: 'Tungkol sa aklat na ito',
    // The CC BY-SA 4.0 licence requires its attribution wherever the text is reproduced,
    // which includes the printed book; the test fails if it is dropped from here.
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          Ang Kasulatan ay mula sa {translation} ({licence}), kinuha nang walang pagbabago mula sa eBible.org.{' '}
          {attribution}
        </p>
        <p>
          Ang paghahati sa mga bahagi at ang pagpili ng mga magkakahanay ay mga pagpapasya ng patnugot, na sa
          pangkalahatan ay sumusunod sa mga tradisyonal na sinopsis ng mga Ebanghelyo.
        </p>
        <p>Ginawa mula sa gospels.yhwh.rest noong {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': 'Ang Salita ay Naging Tao',
    'luke-preface': 'Ang Paunang Salita ni Lucas kay Teopilo',
    'john-birth-foretold': 'Ipinahayag ang Kapanganakan ni Juan na Tagapagbautismo',
    annunciation: 'Dumalaw ang Anghel Gabriel kay Maria',
    magnificat: 'Dinalaw ni Maria si Elisabet; ang Awit ni Maria',
    'john-birth': 'Ang Kapanganakan ni Juan na Tagapagbautismo; ang Awit ni Zacarias',
    genealogy: 'Ang Talaan ng Angkan ni Jesus',
    birth: 'Ang Kapanganakan ni Jesus',
    shepherds: 'Ang mga Pastol',
    presentation: 'Iniharap si Jesus sa Templo; sina Simeon at Ana',
    magi: 'Ang Pagdalaw ng mga Pantas',
    'flight-egypt': 'Ang Pagtakas patungong Egipto; ang mga Bata sa Bethlehem',
    'return-nazareth': 'Ang Pagbalik sa Nazaret',
    'boy-in-temple': 'Ang Batang si Jesus sa Templo',
    'baptist-preaching': 'Ang Pangangaral ni Juan na Tagapagbautismo',
    'baptist-imprisoned': 'Ibinilanggo si Juan na Tagapagbautismo',
    baptism: 'Ang Pagbautismo kay Jesus',
    temptation: 'Ang Pagtukso kay Jesus sa Ilang',
    'first-disciples-john': 'Ang mga Unang Alagad (Juan)',
    cana: 'Ang Tubig na Naging Alak sa Cana',
    'temple-cleansing': 'Ang Paglilinis sa Templo',
    nicodemus: 'Si Jesus at si Nicodemo',
    'baptist-final-testimony': 'Ang Huling Patotoo ni Juan na Tagapagbautismo',
    'samaritan-woman': 'Ang Babaeng Samaritana',
    'galilee-begins': 'Bumalik si Jesus sa Galilea',
    'officials-son': 'Pagpapagaling sa Anak ng Isang Opisyal',
    'nazareth-rejection': 'Itinakwil si Jesus sa Nazaret',
    'calling-fishermen': 'Ang Pagtawag sa mga Unang Alagad',
    'capernaum-synagogue': 'Nagturo si Jesus sa Sinagoga sa Capernaum',
    'peters-mother-in-law': 'Pagpapagaling sa Biyenan ni Pedro; Pagpapagaling sa Gabi',
    'preaching-tour': 'Paglalakbay at Pangangaral sa Galilea',
    leper: 'Paglilinis sa Isang Lalaking may Ketong',
    paralytic: 'Pagpapagaling sa Isang Lalaking Paralisado',
    levi: 'Ang Pagtawag kay Levi (Mateo); Kumain Kasama ng mga Makasalanan',
    'fasting-question': 'Ang Tanong tungkol sa Pag-aayuno',
    'grain-sabbath': 'Pagpitas ng Uhay sa Araw ng Pamamahinga',
    'withered-hand': 'Pagpapagaling sa Lalaking Tuyot ang Kamay',
    'crowds-by-sea': 'Dumagsa ang mga Tao kay Jesus; ang Hinirang na Lingkod',
    'choosing-twelve': 'Ang Pagpili sa Labindalawa',
    bethesda: 'Pagpapagaling sa Palanguyan ng Bethzata',
    'authority-of-son': 'Ang Kapangyarihan ng Anak; ang mga Saksi kay Jesus',
    beatitudes: 'Ang mga Pinagpala',
    'salt-light': 'Asin at Ilaw',
    'law-fulfilled': 'Tinupad ni Jesus ang Kautusan',
    'greater-righteousness': 'Galit, Pangangalunya, Diborsiyo at Panunumpa',
    'love-enemies': 'Paghihiganti at Pag-ibig sa Kaaway',
    'piety-in-secret': 'Paglilimos, Pananalangin at Pag-aayuno nang Lihim',
    'lords-prayer': 'Ang Panalangin ng Panginoon',
    'treasure-heaven': 'Kayamanan sa Langit',
    'lamp-of-body': 'Ang Ilaw ng Katawan',
    'two-masters': 'Walang Makapaglilingkod sa Dalawang Panginoon',
    'do-not-worry': 'Huwag Mabalisa',
    judging: 'Ang Paghatol sa Kapwa',
    'ask-seek-knock': 'Humingi, Humanap, Kumatok; ang Ginintuang Panuntunan',
    'two-foundations': 'Dalawang Daan, Dalawang Puno, Dalawang Pundasyon',
    centurion: 'Pagpapagaling sa Alipin ng Senturion',
    'widow-nain': 'Ang Pagbuhay sa Anak ng Balo sa Nain',
    'baptist-question': 'Ang Tanong ni Juan na Tagapagbautismo; ang Patotoo ni Jesus tungkol kay Juan',
    'sinful-woman': 'Pinahiran si Jesus ng Isang Babaeng Makasalanan',
    'women-followers': 'Ang mga Babaeng Sumunod kay Jesus',
    'woes-cities': 'Aba sa mga Lungsod ng Galilea',
    thanksgiving: 'Ang Pasasalamat ni Jesus; Lumapit Kayo sa Akin',
    beelzebul: 'Ang Usapin tungkol kay Beelzebul',
    'sign-of-jonah': 'Ang Palatandaan ni Jonas',
    'unclean-spirit-returns': 'Ang Pagbabalik ng Masamang Espiritu',
    'true-blessedness': 'Ang Tunay na Pinagpala',
    'true-family': 'Ang Tunay na Pamilya ni Jesus',
    sower: 'Ang Talinghaga ng Manghahasik',
    'why-parables': 'Ang Dahilan ng mga Talinghaga',
    'sower-explained': 'Ipinaliwanag ang Talinghaga ng Manghahasik',
    'lamp-measure': 'Ilawan sa Ilalim ng Takalan; ang Panukat na Ginagamit Ninyo',
    'seed-growing': 'Ang Binhing Kusang Lumalago',
    weeds: 'Ang Trigo at ang mga Damo',
    'mustard-leaven': 'Ang Binhi ng Mustasa at ang Lebadura',
    'use-of-parables': 'Ang Paggamit ni Jesus ng mga Talinghaga',
    'weeds-explained': 'Ipinaliwanag ang Talinghaga ng mga Damo',
    'treasure-pearl-net': 'Ang Nakatagong Kayamanan, ang Perlas, ang Lambat',
    'would-be-followers': 'Ang mga Nagnanais Sumunod',
    'calming-storm': 'Pinatahimik ni Jesus ang Bagyo',
    gerasene: 'Ang Lalaking may Demonyo sa Geraseno',
    jairus: 'Ang Anak ni Jairo at ang Babaeng Humipo sa Kaniyang Damit',
    'two-blind-mute': 'Dalawang Lalaking Bulag; Isang Lalaking Hindi Makapagsalita',
    harvest: 'Marami ang Aanihin',
    'sending-twelve': 'Ang Pagsusugo sa Labindalawa',
    persecution: 'Ang Darating na Pag-uusig',
    'do-not-fear': 'Huwag Matakot',
    'not-peace': 'Hindi Kapayapaan kundi Espada',
    'herod-baptist-death': 'Si Herodes at ang Kamatayan ni Juan na Tagapagbautismo',
    'feeding-5000': 'Ang Pagpapakain sa Limanlibo',
    'walking-water': 'Lumakad si Jesus sa Ibabaw ng Tubig',
    gennesaret: 'Pagpapagaling sa Genesaret',
    'bread-of-life': 'Ang Tinapay ng Buhay',
    'words-eternal-life': 'Maraming Tumalikod; “Ikaw ang may mga salita ng buhay na walang hanggan”',
    'tradition-elders': 'Ang Kaugalian ng mga Nakatatanda; ang Nagpaparumi sa Tao',
    'canaanite-woman': 'Ang Babaeng Cananea (Sirofenisa)',
    'deaf-man': 'Pagpapagaling sa Lalaking Bingi; Maraming Pinagaling',
    'feeding-4000': 'Ang Pagpapakain sa Apat na Libo',
    'demand-sign': 'Ang Paghingi ng Palatandaan',
    'leaven-pharisees': 'Ang Lebadura ng mga Pariseo',
    'bethsaida-blind': 'Isang Lalaking Bulag sa Betsaida',
    'peters-confession': 'Ang Pagpapahayag ni Pedro',
    'first-prediction': 'Unang Pagpapahayag ng Paghihirap; Pasanin ang Iyong Krus',
    transfiguration: 'Ang Pagbabagong-anyo ni Jesus',
    'boy-unclean-spirit': 'Pagpapagaling sa Batang may Masamang Espiritu',
    'second-prediction': 'Ikalawang Pagpapahayag ng Paghihirap',
    'temple-tax': 'Ang Buwis sa Templo',
    greatest: 'Sino ang Pinakadakila?',
    'strange-exorcist': 'Ang Hindi Laban sa Atin',
    stumbling: 'Mga Sanhi ng Pagkatisod',
    'lost-sheep': 'Ang Nawawalang Tupa',
    'forgive-brother': 'Pagtutuwid at Pagpapatawad sa Kapatid',
    'unforgiving-servant': 'Ang Lingkod na Hindi Nagpatawad',
    'tabernacles-1': 'Sa Kapistahan ng mga Kanlungan',
    'tabernacles-2': 'Siya ba ang Cristo? Mga Ilog ng Tubig na Buhay',
    'adulterous-woman': 'Ang Babaeng Nahuli sa Pangangalunya',
    'light-of-world': 'Ang Ilaw ng Mundo',
    'before-abraham': 'Palalayain Kayo ng Katotohanan; Bago pa si Abraham',
    'man-born-blind': 'Pagpapagaling sa Lalaking Ipinanganak na Bulag',
    'good-shepherd': 'Ang Mabuting Pastol',
    dedication: 'Sa Kapistahan ng Pagtatalaga',
    'samaritan-village': 'Hindi Tinanggap si Jesus sa Isang Nayon ng Samaria',
    'sending-seventy': 'Ang Pagsusugo sa Pitumpu',
    'seventy-return': 'Ang Pagbabalik ng Pitumpu',
    'great-commandment': 'Ang Pinakamahalagang Utos',
    'good-samaritan': 'Ang Mabuting Samaritano',
    'mary-martha': 'Si Maria at si Martha',
    'friend-midnight': 'Ang Kaibigang Dumating sa Hatinggabi',
    'woes-at-dinner': 'Mga Aba sa Hapag ng Isang Pariseo',
    'rich-fool': 'Ang Mayamang Hangal',
    'watchful-servants': 'Mga Lingkod na Nagbabantay',
    'faithful-servant': 'Ang Tapat at ang Hindi Tapat na Lingkod',
    'interpreting-times': 'Pag-unawa sa mga Panahon; Makipag-ayos Habang nasa Daan',
    'repent-fig-tree': 'Magsisi o Mapahamak; ang Puno ng Igos na Walang Bunga',
    'crippled-woman': 'Pagpapagaling sa Babaeng Baluktot sa Araw ng Pamamahinga',
    'narrow-door': 'Ang Makitid na Pintuan',
    'lament-jerusalem': 'Ang Pagtangis para sa Jerusalem',
    dropsy: 'Pagpapagaling sa Lalaking may Pamamanas',
    'places-at-table': 'Ang mga Upuan sa Hapag; Sino ang Dapat Anyayahan',
    'great-banquet': 'Ang Malaking Handaan; ang Piging ng Kasalan',
    'cost-discipleship': 'Ang Halaga ng Pagiging Alagad',
    'lost-coin': 'Ang Nawawalang Barya',
    'prodigal-son': 'Ang Talinghaga ng Alibughang Anak',
    'shrewd-manager': 'Ang Tusong Katiwala',
    'law-and-divorce': 'Ang Kautusan at ang Kaharian; Diborsiyo',
    'rich-man-lazarus': 'Ang Mayaman at si Lazaro',
    'faith-duty': 'Pananampalatayang Gaya ng Binhi ng Mustasa; mga Walang Silbing Lingkod',
    'ten-lepers': 'Nilinis ang Sampung may Ketong',
    'day-son-of-man': 'Ang Araw ng Anak ng Tao',
    'persistent-widow': 'Ang Mapilit na Balo',
    'pharisee-tax-collector': 'Ang Pariseo at ang Maniningil ng Buwis',
    divorce: 'Pag-aasawa at Diborsiyo',
    children: 'Binasbasan ni Jesus ang mga Bata',
    'rich-young-man': 'Ang Mayamang Binata',
    'vineyard-workers': 'Ang mga Manggagawa sa Ubasan',
    'third-prediction': 'Ikatlong Pagpapahayag ng Paghihirap',
    'james-john-request': 'Ang Kahilingan nina Santiago at Juan',
    bartimaeus: 'Pagpapagaling kay Bartimeo na Bulag',
    zacchaeus: 'Si Zaqueo',
    talents: 'Ang mga Talento; ang mga Mina',
    lazarus: 'Ang Pagbuhay kay Lazaro',
    plot: 'Ang Balak na Patayin si Jesus',
    'bethany-anointing': 'Pinahiran si Jesus sa Bethania',
    'triumphal-entry': 'Ang Pagpasok sa Jerusalem',
    'weeping-jerusalem': 'Iniyakan ni Jesus ang Jerusalem',
    'greeks-seek': 'Hinanap ng mga Griyego si Jesus; Dumating na ang Oras',
    unbelief: 'Ang Hindi Paniniwala, at ang Huling Panawagan',
    'fig-tree': 'Isinumpa ang Puno ng Igos',
    'authority-questioned': 'Tinanong ang Awtoridad ni Jesus',
    'two-sons': 'Ang Dalawang Anak na Lalaki',
    'wicked-tenants': 'Ang Masasamang Katiwala ng Ubasan',
    caesar: 'Pagbabayad ng Buwis kay Cesar',
    'resurrection-question': 'Ang mga Saduseo at ang Muling Pagkabuhay',
    'davids-son': 'Kaninong Anak ang Cristo?',
    'woes-scribes': 'Aba sa mga Eskriba at mga Pariseo',
    'widows-offering': 'Ang Handog ng Balo',
    'signs-of-end': 'Ang Pagkawasak ng Templo; mga Palatandaan ng Wakas',
    desolation: 'Ang Kasuklam-suklam na Kalagiman; Matinding Kapighatian',
    'son-of-man-coming': 'Ang Pagdating ng Anak ng Tao',
    'lesson-fig-tree': 'Ang Aral mula sa Puno ng Igos',
    'stay-awake': 'Manatiling Gising',
    'ten-virgins': 'Ang Sampung Birhen',
    'sheep-goats': 'Ang mga Tupa at ang mga Kambing',
    'judas-agrees': 'Pumayag si Judas na Ipagkanulo si Jesus',
    'passover-preparation': 'Ang Paghahanda sa Paskuwa',
    footwashing: 'Hinugasan ni Jesus ang mga Paa ng mga Alagad',
    'betrayer-foretold': 'Ipinahayag ang Magkakanulo',
    'lords-supper': 'Ang Hapunan ng Panginoon',
    'dispute-greatness': 'Pagtatalo sa Hapag kung Sino ang Pinakadakila',
    'new-commandment': 'Isang Bagong Utos',
    'denial-foretold': 'Ipinahayag ang Pagkakaila ni Pedro',
    'two-swords': 'Pitaka, Supot at Espada',
    'way-truth-life': 'Ang Daan, ang Katotohanan at ang Buhay; ang Ipinangakong Manga-aliw',
    'true-vine': 'Ang Tunay na Puno ng Ubas',
    'worlds-hatred': 'Ang Pagkapoot ng Mundo',
    'spirit-joy': 'Ang Gawain ng Espiritu; Kalungkutang Naging Kagalakan',
    'jesus-prays': 'Ang Panalangin ni Jesus para sa Kaniyang mga Alagad',
    gethsemane: 'Getsemani',
    arrest: 'Ang Pagdakip kay Jesus',
    'before-high-priest': 'Si Jesus sa Harap ng Pinakapunong Pari',
    'peters-denials': 'Ang Pagkakaila ni Pedro',
    'judas-death': 'Ang Kamatayan ni Judas',
    'before-pilate': 'Si Jesus sa Harap ni Pilato',
    'before-herod': 'Si Jesus sa Harap ni Herodes',
    sentenced: 'Pinalaya si Barabas; Hinatulan si Jesus',
    'soldiers-mock': 'Nilibak ng mga Kawal si Jesus',
    crucifixion: 'Ang Pagpapako sa Krus',
    death: 'Ang Kamatayan ni Jesus',
    burial: 'Ang Paglilibing kay Jesus',
    guard: 'Ang mga Bantay sa Libingan',
    'empty-tomb': 'Ang Walang Lamang Libingan',
    'mary-magdalene': 'Nagpakita si Jesus kay Maria Magdalena',
    'guards-report': 'Ang Ulat ng mga Bantay',
    emmaus: 'Ang Daan Patungong Emaus',
    'appears-disciples': 'Nagpakita si Jesus sa mga Alagad',
    thomas: 'Si Jesus at si Tomas',
    'purpose-of-john': 'Upang Kayo ay Maniwala',
    'great-commission': 'Ang Dakilang Atas',
    ascension: 'Ang Pag-akyat sa Langit',
    'by-the-sea': 'Almusal sa Tabi ng Dagat ng Tiberias',
    'peter-restored': 'Ibinalik si Pedro; ang Minamahal na Alagad',
  },

  notes: {
    genealogy:
      'Sinimulan ni Mateo ang kaniyang Ebanghelyo sa talaan ng angkan at sinundan ito pasulong mula kay Abraham; inilagay naman ito ni Lucas pagkatapos ng pagbautismo at sinundan ito pabalik hanggang kay Adan.',
    'baptist-imprisoned':
      'Tinapos ni Lucas ang salaysay tungkol kay Juan bago ang pagbautismo kay Jesus. Isinalaysay nina Mateo at Marcos ang pagdakip sa kaniya sa bandang huli, bilang pagbabalik-tanaw (Mateo 14:3-5; Marcos 6:17-20).',
    baptism:
      'Hindi isinalaysay ng Ebanghelyo ni Juan ang mismong pagbautismo; ibinigay nito ang patotoo ni Juan na Tagapagbautismo na nakita niya ang Espiritu na bumaba at nanatili kay Jesus.',
    'temple-cleansing':
      'Inilagay ito ni Juan sa unang Paskuwa ng ministeryo ni Jesus (Juan 2:13). Inilagay naman ito nina Mateo, Marcos at Lucas sa huling linggo, pagkatapos ng pagpasok sa Jerusalem.',
    'officials-son':
      'Madalas itong ihambing sa pagpapagaling sa alipin ng senturion (Mateo 8:5-13; Lucas 7:1-10): isang pagpapagaling mula sa malayo, sa Capernaum, para sa isang lalaking may kapangyarihan.',
    'nazareth-rejection':
      'Inilipat ni Lucas ang tagpong ito sa simula ng hayag na ministeryo ni Jesus, kung saan ipinakikita ng kaniyang pagbasa sa Isaias 61 ang hugis ng lahat ng susunod. Inilagay ito nina Mateo at Marcos nang malayo na ang ministeryo sa Galilea.',
    'calling-fishermen':
      'Kasama sa salaysay ni Lucas ang malaking huli ng isda, at dumarating ito pagkatapos mapagaling ni Jesus ang biyenan ni Simon (Lucas 4:38-39). Inilalarawan ng Juan 1:35-51 ang isang naunang pagkikita.',
    beatitudes:
      'Inilagay ni Mateo ang sermon sa isang bundok; si Lucas naman sa “patag na lugar” (Lucas 6:17). Ipinares ni Lucas ang apat na pagpapala sa apat na aba.',
    'lords-prayer':
      'Inilagay ni Mateo ang panalangin sa loob ng Sermon sa Bundok; ayon kay Lucas, ibinigay ito ni Jesus sa paglalakbay, nang hilingin ng isang alagad, “Panginoon, turuan mo kaming manalangin”.',
    'sinful-woman':
      'Iba ito sa pagpapahid sa Bethania sa huling linggo (Mateo 26:6-13; Marcos 14:3-9; Juan 12:1-8); naganap ito sa Galilea, sa bahay ng isang Pariseo.',
    'feeding-5000': 'Bukod sa muling pagkabuhay, ito lamang ang himalang isinalaysay sa lahat ng apat na Ebanghelyo.',
    'words-eternal-life':
      'Ang pagpapahayag ni Pedro sa Ebanghelyo ni Juan. Ihambing sa pagpapahayag sa Cesarea ng Filipos (Mateo 16:13-20; Marcos 8:27-30; Lucas 9:18-21).',
    'adulterous-woman':
      'Ang Juan 7:53-8:11 ay wala sa pinakamaagang mga manuskritong Griyego ng Juan, at inilalagay ito ng maraming salin sa loob ng panaklong.',
    'great-commandment':
      'Inilagay ni Lucas ang pag-uusap na ito sa paglalakbay, kung saan humahantong ito sa talinghaga ng Mabuting Samaritano. Sa Mateo at Marcos, isa ito sa mga huling pagtatalo sa templo.',
    'woes-at-dinner':
      'Malaking bahagi nito ay kahanay ng pagtuligsa sa mga eskriba at mga Pariseo sa Mateo 23, na inilagay ni Mateo sa templo sa huling linggo.',
    'watchful-servants': 'Ihambing sa Mateo 24:42-44 at Marcos 13:33-37.',
    'lament-jerusalem':
      'Inilagay ni Lucas ang pagtangis sa paglalakbay, bago makarating si Jesus sa lungsod; inilagay naman ito ni Mateo sa templo sa huling linggo.',
    'day-son-of-man': 'Ihambing sa Mateo 24:23-28, 37-41.',
    'james-john-request':
      'May katulad na pagtatalo si Lucas tungkol sa pagiging dakila sa Huling Hapunan (Lucas 22:24-30).',
    plot: 'Tuwirang iniugnay ni Juan ang pasya ng Konseho sa pagbuhay kay Lazaro.',
    'bethany-anointing':
      'Inilagay ito ni Juan anim na araw bago ang Paskuwa, bago ang pagpasok sa Jerusalem; inilagay naman ito nina Mateo at Marcos dalawang araw bago nito, pagkatapos ng pagpasok. Isinasalaysay ng Lucas 7:36-50 ang ibang pagpapahid.',
    'fig-tree':
      'Ibinalot ni Marcos ang salaysay ng puno ng igos sa paligid ng paglilinis sa templo; isinalaysay naman ito ni Mateo nang buo, kinaumagahan.',
    footwashing:
      'Sa Mateo, Marcos at Lucas, ang huling hapunan ay hapunan ng Paskuwa (Marcos 14:12). Inilagay ito ni Juan “bago ang Kapistahan ng Paskuwa” (Juan 13:1), at ang pagpapako sa krus sa araw ng paghahanda (Juan 19:14).',
    'betrayer-foretold':
      'Inilagay ni Lucas ang pagpapahayag pagkatapos ng tinapay at ng tasa; inilagay naman ito nina Mateo at Marcos bago nito.',
    'lords-supper':
      'Walang salaysay si Juan tungkol sa tinapay at sa tasa sa hapunan; sa halip, isinalaysay niya ang paghuhugas ng mga paa (Juan 13:1-20).',
    'before-high-priest':
      'Si Juan lamang ang naglalarawan ng pagdinig sa harap ni Annas, ang biyenan ng pinakapunong pari na si Caifas.',
    'judas-death': 'Ihambing sa Mga Gawa 1:18-19.',
    sentenced:
      'Itinala ni Juan ang oras: “ito ay ang araw ng paghahanda para sa Paskwa, nang mag-iika-anim na oras” (Juan 19:14). Sinabi ni Marcos na ipinako si Jesus sa ikatlong oras (Marcos 15:25).',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Function words in the spellings this text uses (it writes kaniya, not kanya). Words of
  // two letters or fewer are already ignored by minWordLength, but are listed for clarity.
  stopWords: `ang ng sa si ni na at ay mga ito iyon iyan nito niyon doon dito diyan
  siya sila kami kayo tayo ako ikaw ka ko mo niya nila namin ninyo natin atin akin iyo inyo kaniya kanila
  kaniyang kanilang aking iyong inyong ating aming niyang nilang ninyong mong kong siyang silang kayong akong
  sinabi sinasabi sinabing nagsabi nagsasabi sabi sasabihin sinabihan sumagot nangyari masdan tingnan
  hindi huwag wala walang may mayroon mayroong ngunit subalit datapuwat kung kapag nang upang para dahil
  sapagkat kaya kahit habang hanggang mula tungo patungo pagkatapos ngayon noon saka pati maging kasama kay kina
  sina nina rin din naman lamang lang pa ba nga muli agad gayon ganoon ganito tulad katulad gaya
  isang isa iba ibang lahat bawat ilan ilang anuman sinuman sinumang ano sino saan bakit paano kailan alin
  itong nasa tungkol laban`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default tl;
