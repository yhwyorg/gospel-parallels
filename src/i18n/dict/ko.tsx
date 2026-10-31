import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// Notes quote 개역한글판 exactly, inside “ ”; the tests check every quotation
// against src/data/text/ko.json, so a quotation must never be retranslated from English.
const LONGER_ENDING =
  '마가복음의 가장 오래된 완전한 헬라어 사본 두 개는 16:8에서 끝납니다. 마가복음 16:9-20은 개역한글판에 괄호 안에 실려 있으나, 후대에 덧붙여진 것으로 널리 여겨집니다.';

const ko: Dict = {
  siteName: '사복음서 대조',
  tagline: '네 복음서를 나란히',
  nav: { sections: '단락', order: '순서', book: '책', about: '소개' },
  language: '언어',
  lookup: { label: '본문 찾기', placeholder: '본문 찾기, 예: 누가복음 15:11-32', go: '찾기' },
  loading: '복음서를 불러오는 중…',
  loadFailed: (message) => (
    <>
      <strong>복음서 본문을 불러오지 못했습니다.</strong> {message}. 페이지를 다시 불러와 보십시오.
    </>
  ),
  // No lowercasing as in English: Korean has no case, and the licence name is shown as given.
  footer: (link, licence) => <>성경 본문: {link} ({licence}).</>,
  publicDomain: '퍼블릭 도메인',

  home: {
    intro:
      '단락을 고르면 그 일을 기록한 모든 복음서의 본문을 나란히 놓인 칸에서 읽을 수 있습니다. 또는 위의 칸에 성경 구절을 입력하여 병행 본문을 찾으십시오. 각 칸에는 그 복음서가 이 이야기를 어디에 두는지, 앞뒤 단락과 함께 보여 줍니다.',
    filterGroup: '단락 걸러 보기',
    filterLabel: '제목으로 단락 걸러 보기',
    filterPlaceholder: '제목으로 찾기, 예: 고치심',
    order: '순서',
    harmony: '조화 순서 (모든 단락)',
    asTold: (g) => `${g}의 순서대로`,
    onlyShared: '두 복음서 이상에 있는 단락',
    count: (n, total) => `${total}개 단락 중 ${n}개`,
    noMatch: (f) => `‘${f}’에 맞는 단락 제목이 없습니다. 위의 본문 찾기 칸을 이용해 보십시오.`,
  },

  reader: {
    notFound: (id) => `‘${id}’ 단락은 없습니다.`,
    seeAll: '모든 단락 보기',
    shade: '공통 단어 표시',
    numbers: '절 번호',
    copyAll: '모두 복사',
    copy: '복사',
    copied: '복사됨',
    copyFailed: '복사 실패',
    print: '인쇄',
    shadeIntro: '두 본문 이상에 나오는 단어에 음영을 넣었습니다:',
    in2: '두 본문',
    in3: '세 본문',
    in4: '네 본문 모두',
    // The second sentence is Korean-specific: particles attach to words (예수께서, 예수를),
    // so the same name can fail to match, and a reader would otherwise read that as a difference.
    shadeCaveat:
      '이 기능은 헬라어 원문이 아니라 한 한국어 번역의 단어를 비교하므로, 분석이 아니라 눈길을 이끄는 길잡이일 뿐입니다. 한국어는 단어에 조사가 붙으므로(예수께서, 예수를) 같은 단어라도 다르게 처리될 수 있습니다.',
    jumpLabel: '복음서로 이동',
    notIn: (names) => `${names}에는 없습니다.`,
    omitted: (t) => `이 절은 ${t} 본문에 없습니다.`,
    sectionOf: (i, n, g) => `${g} ${n}개 단락 중 ${i}번째`,
    beginning: (g) => `${g}의 시작`,
    end: (g) => `${g}의 끝`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        이 단락에 <strong>{ref}</strong> 본문이 들어 있습니다. 찾으신 구절은 {mark('이와 같이')} 음영으로 표시했습니다.
      </>
    ),
    spans: (n, g) => `이 본문은 ${g}의 ${n}개 단락에 걸쳐 있습니다. 하나를 골라 병행 본문과 함께 읽으십시오.`,
    notFound: (q) => `‘${q}’에 해당하는 본문을 찾지 못했습니다.`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `‘${names.mark} 4:35-41’처럼 본문을 입력하십시오.`;
        case 'not-gospel':
          return `‘${p.word}’은(는) 네 복음서 가운데 하나가 아닙니다. ${names.matthew}, ${names.mark}, ${names.luke}, ${names.john} 가운데 하나를 입력해 보십시오.`;
        case 'no-chapter-given':
          return `장을 함께 입력하십시오. 예: ‘${names[p.gospel]} 1’.`;
        case 'no-chapter':
          return p.gospel ? `${names[p.gospel]}에는 ${p.chapter}장이 없습니다.` : `${p.chapter}장은 없습니다.`;
        case 'verse-count':
          return `${names[p.gospel]} ${p.chapter}장은 ${p.verses}절까지 있으므로 ${p.verse}절은 없습니다.`;
        case 'backwards':
          return `${formatRange(p.range)}: 범위가 거꾸로 되어 있습니다.`;
        case 'unreadable':
          return `‘${p.text}’ 부분을 읽을 수 없습니다.`;
      }
    },
  },

  order: {
    // Every Korean Gospel name ends in 음, a closed syllable, so 과 (not 와) is always right.
    docTitle: (a, b) => `순서: ${a}과 ${b}`,
    title: '각 복음서는 이야기를 어디에 두는가',
    intro:
      '각 칸은 한 복음서의 단락을 처음부터 끝까지, 그 복음서가 전하는 순서대로 보여 줍니다. 선은 한 단락을 다른 복음서의 같은 단락과 이어 줍니다. 선이 서로 엇갈리는 곳에서는 두 복음서가 그 사건들을 다른 순서로 전합니다.',
    left: '왼쪽',
    right: '오른쪽',
    summary: (a, na, b, nb, both) => `${a}에는 ${na}개, ${b}에는 ${nb}개 단락이 있으며, 그중 ${both}개는 양쪽에 다 있습니다.`,
    same: '두 복음서는 함께 전하는 모든 단락을 같은 순서로 전합니다.',
    one: '순서의 차이는 한 단락 때문입니다. 그 단락을 빼고 보면, 두 복음서는 함께 전하는 나머지 모든 것을 같은 차례로 전합니다:',
    many: (n) =>
      `순서의 차이는 다음 ${n}개 단락 때문입니다. 이 단락들을 빼고 보면, 두 복음서는 함께 전하는 나머지 모든 것을 같은 차례로 전합니다:`,
    position: (pa, na, a, pb, nb, b) => `— ${a} ${na}개 중 ${pa}번째, ${b} ${nb}개 중 ${pb}번째`,
    tie: '두 설명이 똑같이 간단할 때(한 복음서가 이야기를 앞으로 옮겼는가, 아니면 다른 복음서가 그 이웃 이야기를 뒤로 옮겼는가?)에는 하나만 적었습니다. 그러므로 이 목록은 ‘기록자가 무엇을 옮겼는가’가 아니라 ‘순서가 어디에서 다른가’로 읽으십시오.',
    legend: {
      label: '범례',
      same: '두 복음서에 모두 있는 같은 단락',
      notable: '위 목록에 있는 단락, 다른 자리에서 전해짐',
      focus: '지금 가리키고 있는 단락',
      sample: '제목',
      both: '다른 복음서에도 있음 (막대는 그 칸의 색)',
      only: '이 복음서에만 있으므로 선이 없음',
    },
    lane: (g) => `${g}의 순서`,
  },

  // Kept to two separate statements, as in English: the site is offered to bless God, and
  // it was made for Darrell. Words such as 헌정, 기념, 추모 are avoided on purpose; he is alive.
  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>이 사이트에 대하여</h1>
      <p>
        이 사이트는 전능하신 하나님을 송축하기 위하여 드리는 것입니다. 이 사이트가 독자 앞에 펼쳐 놓는 것은 그분의
        말씀이며, 이 네 복음서가 선포하는 분은 그분의 아들이십니다.
      </p>
      <p>
        이 사이트는 Darrell W. Johnson을 위해 만들어졌습니다. 그분은 50년이 넘도록 예수 그리스도와 그의 복음을 전해
        오셨습니다. 캘리포니아에서, 마닐라 유니온 교회(Union Church of Manila)와 밴쿠버 제일침례교회(First Baptist
        Church)에서 목회자로, 그리고 풀러 신학교(Fuller Theological Seminary), 리젠트 칼리지(Regent College), 캐리
        신학대학(Carey Theological College)에서 설교자들을 가르치는 교수로 섬기셨습니다. 지금은 The Way Church와 The
        Pastorate Ministries Canada에서 섬기고 계십니다. 저서로는 <cite>The Glory of Preaching</cite>,{' '}
        <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>, <cite>The Beatitudes</cite> 등이 있습니다.
      </p>
      <p>
        그분의 설교는 이 도구가 시작하는 자리에서 시작합니다. 곧 본문에 머물러, 본문이 말하는 바를 그대로 말하게 하는
        것입니다. 이 사이트는 Darrell과 그 가족이 함께 시작한 작업, 곧 마태복음, 마가복음, 누가복음의 사건 순서를
        요한복음의 순서와 비교하던 작업에서 자라났습니다.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Darrell W. Johnson의 설교, 저서, 가르침 →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>사용하는 방법</h2>
        <ul>
          <li>
            <strong>단락 읽기.</strong> <a href={href.home()}>목록</a>에서 아무 단락이나 고르면 그 일을 기록한 모든
            복음서의 본문을 나란히 볼 수 있습니다. 각 칸 아래에는 그 복음서에서 바로 앞뒤에 오는 단락이 있어, 이야기를
            그 본래 자리에서 읽을 수 있습니다.
          </li>
          <li>
            <strong>본문 찾기.</strong>{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a>이나{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>과 같이 구절을 입력하십시오. 그 구절이
            들어 있는 단락이 열리고, 찾으신 구절이 표시됩니다.
          </li>
          <li>
            <strong>순서 비교.</strong> <a href={href.order('mark', 'john')}>순서</a> 페이지는 두 복음서를 나란히 놓고
            함께 전하는 단락들을 선으로 이어, 한 복음서가 어떤 사건을 다른 복음서와 다른 자리에 두는 곳을 보여 줍니다.
          </li>
          <li>
            <strong>공통 단어 표시</strong>는 두 본문 이상에 나오는 단어에 음영을 넣습니다. 헬라어 원문이 아니라 한
            한국어 번역의 단어를 비교하므로, 분석이 아니라 눈길을 이끄는 길잡이일 뿐입니다.
          </li>
          <li>
            <strong>책으로 인쇄하기.</strong> <a href={href.book()}>책</a> 페이지에는 모든 단락이 한 권에 담겨 있어,
            인쇄하거나 PDF로 내려받을 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2>색과 표시</h2>
        <ul className="color-key">
          <li>
            각 복음서는 사이트 어디에서나 자기 색을 가집니다:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. 이 색은 각 칸의 윗부분, 복음서의
            이름, 그리고 단락 목록에 있는 그 복음서의 장절 표시에 쓰입니다.
          </li>
          <li>
            <span className="verse target">청회색 음영</span>은 찾으신 구절을 표시합니다.
          </li>
          <li>
            <strong>공통 단어 표시</strong>를 켜면, 금색 음영이 두 본문 이상에 나오는 단어를 표시합니다:{' '}
            <mark className="hl2">두 본문</mark>, <mark className="hl3">세 본문</mark>,{' '}
            <mark className="hl4">네 본문 모두</mark>.
          </li>
          <li>
            순서 페이지에서 회색 선은 한 단락을 다른 복음서의 같은 단락과 잇고, <strong className="purple">보라색</strong>{' '}
            선은 다른 자리에서 전해지는 단락을 표시하며, 진한 선은 지금 가리키고 있는 단락입니다. 선 없이 회색으로 된
            제목은 그 복음서에만 있는 단락입니다.
          </li>
        </ul>
      </section>

      <section>
        <h2>순서가 다른 까닭</h2>
        <p>
          {names.matthew}, {names.mark}, {names.luke}(‘공관복음’)은 순서의 많은 부분을 함께합니다. 곧 갈릴리 사역이
          있고, 그다음 마지막 주간을 위한 한 번의 예루살렘 여행이 있습니다. {names.john}은 갈릴리와 예루살렘 사이를 여러
          번 오가며, 세 번의 유월절을 언급합니다({names.john} 2:13; 6:4; 11:55). 가장 잘 알려진 차이는 성전을 깨끗하게
          하신 일로, {names.john}은 이를 사역의 첫머리에, 다른 복음서들은 마지막 주간에 둡니다. 또 마지막 만찬과 십자가
          처형이 유월절과 어떤 관계에 있는가 하는 때의 차이도 있습니다.
        </p>
        <p>
          복음서 기자들은 일기를 쓰려는 것만이 아니라 예수께서 누구신지를 선포하려고 자료를 배열했습니다. 그러므로
          순서의 차이는, 각 기자가 이야기를 그 자리에 둠으로써 우리에게 무엇을 보여 주려 하는지 묻도록 이끄는
          초대입니다.
        </p>
      </section>

      <section>
        <h2>본문과 단락에 대하여</h2>
        <p>
          성경 본문은 {translation}({licence})이며, <a href="https://ebible.org/">eBible.org</a>에서 바꾸지 않고 그대로
          가져왔습니다. {attribution} 이 본문에는 가장 이른 사본들에 없는 몇몇 구절도 들어 있는데, 예를 들어{' '}
          {names.mark} 16:9-20과 {names.john} 7:53-8:11은 괄호 안에 실려 있으며, 해당 단락에 그 사실을 적어 두었습니다.
          또 몇몇 절({names.matthew} 17:21 등)은 이 번역에 본문이 없으며, 해당 위치에 그렇게 표시됩니다.
        </p>
        <p>
          단락을 나누는 일과 어떤 본문을 병행 본문으로 볼지는 편집상의 판단이며, 대체로 전통적인 복음서 대조표를
          따랐습니다. 네 복음서의 모든 절은 꼭 한 단락에 속하므로, 어떤 구절을 찾든 찾을 수 있습니다. {names.matthew}
          이나 {names.luke}이 같은 말씀을 두 곳에서 쓰는 경우에는 한 곳만 연결하고, 다른 곳은 단락의 주석에 적어
          두었습니다.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: '책',
    heading: '사이트 전체를 한 권의 책으로',
    intro:
      '모든 단락을 조화 순서대로 한 권에 담아 인쇄하거나 간직할 수 있게 했습니다. 드리는 글과 차례가 있고, 어떤 구절이든 찾을 수 있도록 책 끝에 본문 색인을 넣었습니다.',
    download: (pages, mb) => `PDF 내려받기 (${pages}쪽, ${mb} MB)`,
    paper: (size) => `PDF는 ${size} 크기입니다. 브라우저에서 바로 인쇄하면 사용하시는 용지 크기로 인쇄됩니다.`,
    print: '브라우저에서 인쇄',
    notBuilt: 'PDF는 사이트를 게시할 때 만들어지므로, 지금 보시는 사이트에는 PDF가 없습니다.',
    scripture: (t) => `성경 본문: ${t}`,
    howToHeading: '이 책을 읽는 방법',
    HowTo: ({ names }) => (
      <>
        <p>
          각 단락은 한 사건이나 가르침에 대한 복음서들의 기록을 나란히, 복음서마다 한 칸씩 놓습니다. 단락에는 조화
          순서에 따라 번호(§)가 붙어 있습니다. 이 순서는 전통적인 복음서 대조표가 배열하는 대로, 대략 사건이 일어난
          차례입니다. 어떤 복음서에 그 이야기가 없으면 단락에 그렇게 적혀 있습니다.
        </p>
        <p>
          각 칸 위의 색 막대가 그 복음서를 나타냅니다:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          본문을 찾으려면 책 끝의 색인에서 장과 절을 찾으십시오. 거기에 단락 번호가 있습니다. 같은 단락들이
          gospels.yhwh.rest에도 있으며, 그곳에서는 두 복음서가 이야기를 전하는 순서도 비교할 수 있습니다.
        </p>
      </>
    ),
    contents: '차례',
    indexHeading: '본문 색인',
    indexIntro:
      '네 복음서의 모든 절은 꼭 한 단락에 속합니다. 해당 복음서 아래에서 장과 절을 찾은 다음, 그 단락 번호로 가십시오.',
    creditsHeading: '이 책에 대하여',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          성경 본문은 {translation}({licence})이며, eBible.org에서 바꾸지 않고 그대로 가져왔습니다. {attribution}
        </p>
        <p>단락을 나누는 일과 병행 본문의 선택은 편집상의 판단이며, 대체로 전통적인 복음서 대조표를 따랐습니다.</p>
        <p>{date}에 gospels.yhwh.rest에서 만들었습니다.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': '말씀이 육신이 되시다',
    'luke-preface': '데오빌로에게 드리는 누가의 머리말',
    'john-birth-foretold': '세례 요한의 탄생 예고',
    annunciation: '천사 가브리엘이 마리아에게 오다',
    magnificat: '마리아가 엘리사벳을 방문하다; 마리아의 찬가',
    'john-birth': '세례 요한의 탄생; 사가랴의 찬가',
    genealogy: '예수 그리스도의 계보',
    birth: '예수의 나심',
    shepherds: '목자들',
    presentation: '성전에 드려지신 예수; 시므온과 안나',
    magi: '동방 박사들의 방문',
    'flight-egypt': '애굽으로 피하심; 베들레헴의 아이들',
    'return-nazareth': '나사렛으로 돌아오심',
    'boy-in-temple': '성전에 계신 소년 예수',
    'baptist-preaching': '세례 요한의 전파',
    'baptist-imprisoned': '세례 요한이 옥에 갇히다',
    baptism: '예수께서 세례를 받으시다',
    temptation: '광야에서 시험을 받으시다',
    'first-disciples-john': '첫 제자들 (요한복음)',
    cana: '가나의 혼인 잔치',
    'temple-cleansing': '성전을 깨끗하게 하심',
    nicodemus: '예수와 니고데모',
    'baptist-final-testimony': '세례 요한의 마지막 증언',
    'samaritan-woman': '사마리아 여자',
    'galilee-begins': '갈릴리로 돌아오시다',
    'officials-son': '왕의 신하의 아들을 고치심',
    'nazareth-rejection': '나사렛에서 배척을 받으심',
    'calling-fishermen': '첫 제자들을 부르심',
    'capernaum-synagogue': '가버나움 회당에서 가르치심',
    'peters-mother-in-law': '베드로의 장모를 고치심; 저물 때 많은 사람을 고치심',
    'preaching-tour': '갈릴리 전도 여행',
    leper: '나병환자를 깨끗하게 하심',
    paralytic: '중풍병자를 고치심',
    levi: '레위(마태)를 부르심; 죄인들과 함께 잡수심',
    'fasting-question': '금식에 대한 질문',
    'grain-sabbath': '안식일에 이삭을 자르다',
    'withered-hand': '손 마른 사람을 고치심',
    'crowds-by-sea': '무리가 예수께 몰려오다; 택하신 종',
    'choosing-twelve': '열두 제자를 세우심',
    bethesda: '베데스다 못가에서 고치심',
    'authority-of-son': '아들의 권세; 예수에 대한 증언',
    beatitudes: '팔복',
    'salt-light': '소금과 빛',
    'law-fulfilled': '율법을 완전하게 하심',
    'greater-righteousness': '노함, 간음, 이혼, 맹세',
    'love-enemies': '보복과 원수 사랑',
    'piety-in-secret': '은밀한 구제와 기도와 금식',
    'lords-prayer': '주기도문',
    'treasure-heaven': '하늘에 쌓은 보물',
    'lamp-of-body': '몸의 등불',
    'two-masters': '두 주인을 섬길 수 없다',
    'do-not-worry': '염려하지 말라',
    judging: '비판하지 말라',
    'ask-seek-knock': '구하라, 찾으라, 두드리라; 황금률',
    'two-foundations': '두 길, 두 나무, 두 기초',
    centurion: '백부장의 하인을 고치심',
    'widow-nain': '나인성 과부의 아들을 살리심',
    'baptist-question': '세례 요한의 질문; 요한에 대한 예수의 증언',
    'sinful-woman': '죄인인 한 여자가 예수께 향유를 붓다',
    'women-followers': '예수를 따른 여자들',
    'woes-cities': '갈릴리 고을들에 대한 책망',
    thanksgiving: '예수의 감사 기도; 내게로 오라',
    beelzebul: '바알세불 논쟁',
    'sign-of-jonah': '요나의 표적',
    'unclean-spirit-returns': '더러운 귀신이 되돌아오다',
    'true-blessedness': '참된 복',
    'true-family': '예수의 참 가족',
    sower: '씨 뿌리는 자의 비유',
    'why-parables': '비유로 말씀하시는 이유',
    'sower-explained': '씨 뿌리는 비유의 해석',
    'lamp-measure': '말 아래의 등불; 너희의 헤아림',
    'seed-growing': '스스로 자라는 씨',
    weeds: '알곡과 가라지',
    'mustard-leaven': '겨자씨와 누룩',
    'use-of-parables': '예수께서 비유로 말씀하심',
    'weeds-explained': '가라지 비유의 해석',
    'treasure-pearl-net': '감추인 보화, 진주, 그물',
    'would-be-followers': '예수를 따르려는 사람들',
    'calming-storm': '풍랑을 잔잔하게 하심',
    gerasene: '거라사의 귀신 들린 사람',
    jairus: '야이로의 딸과 예수의 옷에 손을 댄 여자',
    'two-blind-mute': '두 맹인; 말 못하는 사람',
    harvest: '추수할 것은 많다',
    'sending-twelve': '열두 제자를 보내심',
    persecution: '다가올 박해',
    'do-not-fear': '두려워하지 말라',
    'not-peace': '화평이 아니요 검을',
    'herod-baptist-death': '헤롯과 세례 요한의 죽음',
    'feeding-5000': '오천 명을 먹이심',
    'walking-water': '물 위를 걸으심',
    gennesaret: '게네사렛에서 병자들을 고치심',
    'bread-of-life': '생명의 떡',
    'words-eternal-life': '많은 제자가 떠나가다; “영생의 말씀이 계시매”',
    'tradition-elders': '장로들의 유전; 사람을 더럽게 하는 것',
    'canaanite-woman': '가나안(수로보니게) 여자',
    'deaf-man': '귀먹은 사람을 고치심; 많은 병자를 고치심',
    'feeding-4000': '사천 명을 먹이심',
    'demand-sign': '표적을 구하다',
    'leaven-pharisees': '바리새인들의 누룩',
    'bethsaida-blind': '벳새다의 맹인',
    'peters-confession': '베드로의 신앙 고백',
    'first-prediction': '첫 번째 수난 예고; 자기 십자가를 지라',
    transfiguration: '변화산에서 변형되심',
    'boy-unclean-spirit': '더러운 귀신 들린 아이를 고치심',
    'second-prediction': '두 번째 수난 예고',
    'temple-tax': '성전세',
    greatest: '누가 가장 크냐?',
    'strange-exorcist': '우리를 반대하지 않는 자',
    stumbling: '실족하게 하는 것',
    'lost-sheep': '잃은 양의 비유',
    'forgive-brother': '형제를 바로잡고 용서함',
    'unforgiving-servant': '용서하지 않는 종의 비유',
    'tabernacles-1': '초막절에',
    'tabernacles-2': '이는 그리스도인가? 생수의 강',
    'adulterous-woman': '간음하다 잡힌 여자',
    'light-of-world': '세상의 빛',
    'before-abraham': '진리가 너희를 자유롭게 하리라; 아브라함이 나기 전부터',
    'man-born-blind': '날 때부터 맹인 된 사람을 고치심',
    'good-shepherd': '선한 목자',
    dedication: '수전절에',
    'samaritan-village': '사마리아 마을이 예수를 받아들이지 않다',
    'sending-seventy': '칠십 인을 보내심',
    'seventy-return': '칠십 인이 돌아오다',
    'great-commandment': '가장 큰 계명',
    'good-samaritan': '선한 사마리아인',
    'mary-martha': '마리아와 마르다',
    'friend-midnight': '한밤중에 찾아온 친구',
    'woes-at-dinner': '바리새인의 식탁에서 하신 책망',
    'rich-fool': '어리석은 부자',
    'watchful-servants': '깨어 있는 종들',
    'faithful-servant': '충성된 종과 악한 종',
    'interpreting-times': '이 시대를 분간하라; 길에서 화해하라',
    'repent-fig-tree': '회개하지 않으면 망하리라; 열매 없는 무화과나무',
    'crippled-woman': '안식일에 꼬부라진 여자를 고치심',
    'narrow-door': '좁은 문',
    'lament-jerusalem': '예루살렘을 보고 탄식하심',
    dropsy: '수종병 든 사람을 고치심',
    'places-at-table': '잔치의 윗자리; 누구를 청할 것인가',
    'great-banquet': '큰 잔치의 비유; 혼인 잔치의 비유',
    'cost-discipleship': '제자가 되는 대가',
    'lost-coin': '잃은 드라크마의 비유',
    'prodigal-son': '탕자의 비유',
    'shrewd-manager': '불의한 청지기의 비유',
    'law-and-divorce': '율법과 하나님의 나라; 이혼',
    'rich-man-lazarus': '부자와 나사로',
    'faith-duty': '겨자씨 한 알만 한 믿음; 무익한 종',
    'ten-lepers': '나병환자 열 명을 깨끗하게 하심',
    'day-son-of-man': '인자의 날',
    'persistent-widow': '끈질긴 과부의 비유',
    'pharisee-tax-collector': '바리새인과 세리',
    divorce: '결혼과 이혼',
    children: '어린아이들을 축복하심',
    'rich-young-man': '부자 청년',
    'vineyard-workers': '포도원 품꾼의 비유',
    'third-prediction': '세 번째 수난 예고',
    'james-john-request': '야고보와 요한의 요청',
    bartimaeus: '맹인 바디매오를 고치심',
    zacchaeus: '삭개오',
    talents: '달란트 비유; 므나 비유',
    lazarus: '나사로를 살리심',
    plot: '예수를 죽이려는 모의',
    'bethany-anointing': '베다니에서 향유를 부음',
    'triumphal-entry': '예루살렘에 들어가심',
    'weeping-jerusalem': '예루살렘을 보고 우심',
    'greeks-seek': '헬라인들이 예수를 찾다; 때가 왔다',
    unbelief: '믿지 않는 사람들; 마지막 호소',
    'fig-tree': '무화과나무를 저주하심',
    'authority-questioned': '예수의 권위에 대한 질문',
    'two-sons': '두 아들의 비유',
    'wicked-tenants': '악한 농부들의 비유',
    caesar: '가이사에게 세금을 바치는 일',
    'resurrection-question': '사두개인들과 부활 문제',
    'davids-son': '그리스도는 누구의 자손인가?',
    'woes-scribes': '서기관과 바리새인들에게 화가 있으리라',
    'widows-offering': '가난한 과부의 헌금',
    'signs-of-end': '성전 파괴의 예고; 마지막 때의 징조',
    desolation: '멸망의 가증한 것; 큰 환난',
    'son-of-man-coming': '인자의 오심',
    'lesson-fig-tree': '무화과나무의 교훈',
    'stay-awake': '깨어 있으라',
    'ten-virgins': '열 처녀의 비유',
    'sheep-goats': '양과 염소',
    'judas-agrees': '유다가 예수를 넘겨주기로 하다',
    'passover-preparation': '유월절 준비',
    footwashing: '제자들의 발을 씻기심',
    'betrayer-foretold': '배반할 자를 예고하심',
    'lords-supper': '주의 만찬',
    'dispute-greatness': '식탁에서 누가 크냐는 다툼',
    'new-commandment': '새 계명',
    'denial-foretold': '베드로의 부인을 예고하심',
    'two-swords': '전대와 주머니와 검',
    'way-truth-life': '길과 진리와 생명; 약속하신 보혜사',
    'true-vine': '참 포도나무',
    'worlds-hatred': '세상의 미움',
    'spirit-joy': '성령의 일; 근심이 기쁨으로',
    'jesus-prays': '제자들을 위한 예수의 기도',
    gethsemane: '겟세마네',
    arrest: '예수께서 잡히시다',
    'before-high-priest': '대제사장 앞에 서신 예수',
    'peters-denials': '베드로의 부인',
    'judas-death': '유다의 죽음',
    'before-pilate': '빌라도 앞에 서신 예수',
    'before-herod': '헤롯 앞에 서신 예수',
    sentenced: '바라바가 놓이고 예수께서 사형 선고를 받으시다',
    'soldiers-mock': '군병들이 예수를 희롱하다',
    crucifixion: '십자가에 못 박히심',
    death: '예수의 죽으심',
    burial: '예수의 장사',
    guard: '무덤을 지키는 파수꾼',
    'empty-tomb': '빈 무덤',
    'mary-magdalene': '막달라 마리아에게 나타나심',
    'guards-report': '파수꾼들의 보고',
    emmaus: '엠마오로 가는 길',
    'appears-disciples': '제자들에게 나타나심',
    thomas: '예수와 도마',
    'purpose-of-john': '너희로 믿게 하려 함이라',
    'great-commission': '지상 명령',
    ascension: '승천하심',
    'by-the-sea': '디베랴 바닷가의 아침 식사',
    'peter-restored': '베드로를 회복시키심; 사랑하시는 제자',
  },

  notes: {
    genealogy:
      '마태는 복음서를 족보로 시작하며 아브라함에게서부터 내려가며 적고, 누가는 세례 받으신 이야기 뒤에 족보를 두고 아담까지 거슬러 올라갑니다.',
    'baptist-imprisoned':
      '누가는 예수께서 세례를 받으시기 전에 요한의 이야기를 마무리합니다. 마태와 마가는 요한이 잡힌 일을 나중에 지난 일을 돌아보는 방식으로 전합니다(마태복음 14:3-5; 마가복음 6:17-20).',
    baptism:
      '요한복음은 세례 자체를 서술하지 않고, 성령이 내려와 예수 위에 머무시는 것을 보았다는 세례 요한의 증언을 전합니다.',
    'temple-cleansing':
      '요한은 이 일을 예수의 사역 가운데 첫 유월절에 둡니다(요한복음 2:13). 마태, 마가, 누가는 예루살렘에 들어가신 직후, 마지막 주간에 둡니다.',
    'officials-son':
      '흔히 백부장의 하인을 고치신 일(마태복음 8:5-13; 누가복음 7:1-10)과 비교됩니다. 가버나움에서, 권세 있는 사람을 위해, 멀리서 고치신 일입니다.',
    'nazareth-rejection':
      '누가는 이 장면을 예수의 공적 사역의 첫머리로 옮겨, 이사야 61장을 읽으신 일이 뒤따르는 모든 일의 윤곽을 보여 주게 합니다. 마태와 마가는 갈릴리 사역이 한참 진행된 뒤에 둡니다.',
    'calling-fishermen':
      '누가의 기록에는 많은 물고기를 잡은 일이 들어 있으며, 예수께서 이미 시몬의 장모를 고치신 뒤에 나옵니다(누가복음 4:38-39). 요한복음 1:35-51은 그보다 앞선 만남을 전합니다.',
    beatitudes:
      '마태는 이 설교를 산 위에 두고, 누가는 “평지”에 둡니다(누가복음 6:17). 누가는 네 가지 복과 네 가지 화를 짝지어 놓습니다.',
    'lords-prayer':
      '마태는 이 기도를 산상수훈 안에 두고, 누가는 여행 중에 한 제자가 “주여 요한이 자기 제자들에게 기도를 가르친 것과 같이 우리에게도 가르쳐 주옵소서” 하고 청할 때 예수께서 주신 것으로 전합니다.',
    'sinful-woman':
      '마지막 주간에 베다니에서 있었던 기름 부음(마태복음 26:6-13; 마가복음 14:3-9; 요한복음 12:1-8)과는 다른 일로, 갈릴리에서 한 바리새인의 집에서 일어났습니다.',
    'feeding-5000': '부활을 제외하면, 네 복음서에 모두 기록된 유일한 기적입니다.',
    'words-eternal-life':
      '요한복음에 나오는 베드로의 고백입니다. 가이사랴 빌립보에서의 고백(마태복음 16:13-20; 마가복음 8:27-30; 누가복음 9:18-21)과 비교해 보십시오.',
    'adulterous-woman':
      '요한복음 7:53-8:11은 요한복음의 가장 이른 헬라어 사본들에는 없으며, 많은 번역본이 이 부분을 괄호 안에 넣습니다.',
    'great-commandment':
      '누가는 이 대화를 여행 길에 두어 선한 사마리아인의 비유로 이어지게 합니다. 마태와 마가에서는 성전에서 벌어진 마지막 논쟁들 가운데 하나입니다.',
    'woes-at-dinner':
      '이 가운데 많은 부분이 마태복음 23장의 서기관과 바리새인들에 대한 책망과 겹치는데, 마태는 이를 마지막 주간에 성전에서 하신 말씀으로 둡니다.',
    'watchful-servants': '마태복음 24:42-44와 마가복음 13:33-37을 비교해 보십시오.',
    'lament-jerusalem':
      '누가는 이 탄식을 예수께서 그 성에 이르시기 전, 여행 길에 둡니다. 마태는 마지막 주간에 성전에서 하신 것으로 둡니다.',
    'day-son-of-man': '마태복음 24:23-28, 37-41과 비교해 보십시오.',
    'james-john-request': '누가에는 마지막 만찬 자리에서 누가 크냐를 두고 벌어진 비슷한 다툼이 있습니다(누가복음 22:24-30).',
    plot: '요한은 공회의 결정을 나사로를 살리신 일과 직접 연결합니다.',
    'bethany-anointing':
      '요한은 이 일을 유월절 엿새 전, 예루살렘에 들어가시기 전에 둡니다. 마태와 마가는 이틀 전, 들어가신 뒤에 둡니다. 누가복음 7:36-50은 다른 기름 부음을 전합니다.',
    'fig-tree':
      '마가는 무화과나무 이야기로 성전을 깨끗하게 하신 일을 앞뒤로 감쌉니다. 마태는 그 이튿날 아침의 일로 한 번에 전합니다.',
    footwashing:
      '마태, 마가, 누가에서 마지막 만찬은 유월절 식사입니다(마가복음 14:12). 요한은 이를 “유월절 전에”의 일로 두며(요한복음 13:1), 십자가에 못 박히신 날을 예비일로 둡니다(요한복음 19:14).',
    'betrayer-foretold': '누가는 떡과 잔 다음에 이 예고를 두고, 마태와 마가는 그 앞에 둡니다.',
    'lords-supper': '요한복음에는 만찬에서의 떡과 잔에 대한 기록이 없고, 그 대신 발을 씻기신 일을 전합니다(요한복음 13:1-20).',
    'before-high-priest': '대제사장 가야바의 장인 안나스 앞에서의 심문은 요한만 전합니다.',
    'judas-death': '사도행전 1:18-19와 비교해 보십시오.',
    sentenced:
      '요한은 그 시각을 적습니다. “이 날은 유월절의 예비일이요 때는 제 육시라”(요한복음 19:14). 마가는 예수께서 제 삼시에 십자가에 못 박히셨다고 합니다(마가복음 15:25).',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Whole eojeol (word plus particle) as they occur in this text, chosen from its most
  // frequent forms: Korean attaches particles, so 저희가 and 저희를 must each be listed.
  // Content words that recur across accounts (예수께서, 제자들이, 떡) are deliberately absent;
  // they are what the shading is for.
  stopWords: `그 이 저 또 곧 다 한 온 두 내 네 제 수 줄 바 중 더 못 및 자
  가로되 가라사대 이르시되 이르되 이르노니 말하되 말하노니 대답하여 대답하되 대답하시되 여짜오되 말씀하시되
  하시니 하시니라 하니 하니라 하고 하시고 하여 하라 할 하는 하신 하신대 하거늘 하되 하며 하면 하지 하려
  하더라 하시더라 하리라 하였느니라 된 있는 있어 있으니 있느냐 없느니라 아니라 아니요 아니하고 아니하리라
  내가 나를 나는 나의 내게 나도 너희 너희가 너희에게 너희는 너희를 너희도 네가 네게 너를 너는
  저희 저희가 저희에게 저희를 저희는 저가 저를 그가 그를 그의 우리 우리가 우리에게 우리를 자기 자기의 자기를
  이는 이에 이를 이가 이와 이것을 이런 이렇게 그러나 그러므로 그러면 그리하면 만일 또한 함께 모든 같이 위하여
  인하여 대하여 때에 때가 후에 전에 중에 위에 앞에 앞에서 안에 속에 곳에 거기 거기서 여기 서로 다시 이미 아직 오직
  먼저 심히 능히 어찌 어찌하여 어떻게 어떤 어느 무슨 무엇을 누구든지 아무 것을 것이 것은 것이요 것이니라 것과
  일을 일이 자는 자가 자를 자의 자들이 진실로 보라 이상은`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 2,
};

export default ko;
