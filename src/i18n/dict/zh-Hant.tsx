import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// One wording for all four sections of Mark's longer ending; the English uses one
// constant too, and four hand-copied versions would drift apart.
const LONGER_ENDING =
  '馬可福音最早的兩份完整希臘文抄本都結束於 16:8。新標點和合本收錄了馬可福音 16:9-20，但這段經文普遍被認為是後來加上的。';

// This is the 上帝 edition of the 和合本 (the simplified text is the 神 edition), so
// the site's own prose says 上帝 too: a page that called God by a different name
// from the Scripture beside it would read as two voices.
const zhHant: Dict = {
  siteName: '福音書對照',
  tagline: '四卷福音書，並排對照',
  nav: { sections: '段落', order: '次序', book: '書本', about: '關於' },
  language: '語言',
  lookup: { label: '查找經文', placeholder: '查找經文，例如：路加福音 15:11-32', go: '查找' },
  loading: '正在載入福音書……',
  loadFailed: (message) => (
    <>
      <strong>無法載入福音書經文。</strong>{message}。請重新載入頁面。
    </>
  ),
  footer: (link, licence) => <>經文採用{link}（{licence}）。</>,
  publicDomain: '公有領域',

  home: {
    intro:
      '選擇一個段落，就可以在並排的欄中閱讀各卷福音書對這件事的全部記載；也可以在上方的方框中輸入任何經文出處，找出它的平行經文。每一欄都顯示該卷福音書把這個故事放在哪裏，以及它前後的段落。',
    filterGroup: '篩選段落',
    filterLabel: '按標題篩選段落',
    filterPlaceholder: '按標題篩選，例如：醫治',
    order: '次序',
    harmony: '合參（全部段落）',
    asTold: (g) => `按${g}的次序`,
    onlyShared: '見於兩卷或以上福音書',
    count: (n, total) => `${total} 個段落中的 ${n} 個`,
    noMatch: (f) => `沒有段落標題符合“${f}”。請改用上方的經文查找框。`,
  },

  reader: {
    notFound: (id) => `沒有名為“${id}”的段落。`,
    seeAll: '查看全部段落',
    shade: '標示共同詞語',
    numbers: '經節編號',
    copyAll: '全部複製',
    copy: '複製',
    copied: '已複製',
    copyFailed: '複製失敗',
    print: '列印',
    shadeIntro: '在不止一處記載中出現的詞語加上了底色：',
    in2: '兩處',
    in3: '三處',
    in4: '四處都有',
    shadeCaveat:
      '這裏比較的是同一個中文譯本裏的詞語，而不是希臘文原文，所以只是幫助眼睛留意的提示，並不是分析。',
    jumpLabel: '跳到某卷福音書',
    // The names arrive as an "or" list (馬可福音或約翰福音); after a negative, 或 reads
    // naturally in Chinese, where "不在馬可福音和約翰福音" would need a different list.
    notIn: (names) => `不見於${names}。`,
    // The printed 和合本 has these verses; the eBible file the site uses does not, so
    // the message names this text rather than claiming the translation lacks them.
    omitted: (t) => `本站所用的${t}經文不包含這一節。`,
    sectionOf: (i, n, g) => `${g}的第 ${i} 段（共 ${n} 段）`,
    beginning: (g) => `${g}的開頭`,
    end: (g) => `${g}的結尾`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> 在這個段落中。你所查的經節{mark('以這樣的底色標示')}。
      </>
    ),
    spans: (n, g) => `這段經文橫跨${g}的 ${n} 個段落。請選擇其中一個，與平行經文對照閱讀。`,
    notFound: (q) => `找不到“${q}”。`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty': return `請輸入經文出處，例如“${names.mark} 4:35-41”。`;
        case 'not-gospel': return `“${p.word}”不是四卷福音書之一。請試試${names.matthew}、${names.mark}、${names.luke}或${names.john}。`;
        case 'no-chapter-given': return `請加上章數，例如“${names[p.gospel]} 1”。`;
        case 'no-chapter': return p.gospel ? `${names[p.gospel]}沒有第 ${p.chapter} 章` : `第 ${p.chapter} 章不存在`;
        case 'verse-count': return `${names[p.gospel]}第 ${p.chapter} 章只有 ${p.verses} 節，沒有第 ${p.verse} 節`;
        case 'backwards': return `${formatRange(p.range)} 的起止次序顛倒了`;
        case 'unreadable': return `無法識別“${p.text}”`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `次序：${a}與${b}`,
    title: '每卷福音書把故事放在哪裏',
    intro:
      '每一欄按一卷福音書講述的次序，從頭到尾列出它的段落。一條線把一個段落連到另一卷福音書中的同一段落。線條交叉的地方，表示兩卷福音書講述這些事件的次序不同。',
    left: '左欄',
    right: '右欄',
    summary: (a, na, b, nb, both) => `${a}有 ${na} 個段落，${b}有 ${nb} 個；其中 ${both} 個兩卷都有。`,
    same: '兩卷福音書講述所有共有段落的次序完全相同。',
    one: '次序的差異來自一個段落。把它放在一邊，兩卷福音書講述其餘共有內容的次序就完全一致：',
    many: (n) =>
      `次序的差異來自以下 ${n} 個段落。把它們放在一邊，兩卷福音書講述其餘共有內容的次序就完全一致：`,
    position: (pa, na, a, pb, nb, b) => `——在${a}中是第 ${pa} 段（共 ${na} 段），在${b}中是第 ${pb} 段（共 ${nb} 段）`,
    tie: '當兩種解釋同樣簡單時（是一卷福音書把某個故事提前了，還是另一卷把與它相鄰的故事延後了？），只列出其中一種；所以請把這份列表理解為“次序不同之處”，而不是“作者移動了甚麼”。',
    legend: {
      label: '圖例',
      same: '兩卷福音書中的同一段落',
      notable: '上面所列、放在不同位置講述的段落',
      focus: '你正指着的段落',
      sample: '標題',
      both: '另一卷福音書也有（橫條用本欄的顏色）',
      only: '只見於這卷福音書，所以沒有連線',
    },
    lane: (g) => `${g}的次序`,
  },

  // God's glory and Darrell's name stay in separate paragraphs, as in English, and
  // nothing here is worded as a tribute or memorial: he is living, and the family
  // asked for both. The book titles stay in English because they are English books.
  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>關於本站</h1>
      <p>本站獻上，為要稱頌全能的上帝：本站擺在讀者面前的，是他的話語；這四卷福音書所傳揚的，是他的兒子。</p>
      <p>
        本站是為 Darrell W. Johnson 製作的。五十多年來，他一直傳講耶穌基督和他的福音：曾在加州、馬尼拉聯合教會（Union
        Church of Manila）和溫哥華第一浸信會（First Baptist Church）擔任牧師，又在富勒神學院（Fuller Theological
        Seminary）、維真學院（Regent College）和凱里神學院（Carey Theological College）教導傳道人。如今他在 The Way
        Church 和 The Pastorate Ministries Canada 事奉。他的著作有 <cite>The Glory of Preaching</cite>、
        <cite>Who Is Jesus?</cite>、<cite>Jesus the Healer</cite>、<cite>The Beatitudes</cite> 等書。
      </p>
      <p>
        他的講道和這個工具有同樣的起點：緊貼經文，讓經文說出它本來要說的話。本站源於 Darrell
        和家人一同開始的一個計畫：比較馬太、馬可、路加三卷福音書與約翰福音所記事件的先後次序。
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Darrell 的講道、著作與教導 →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>如何使用</h2>
        <ul>
          <li>
            <strong>閱讀一個段落。</strong>從<a href={href.home()}>列表</a>中選擇任何一個段落，就可以並排看到各卷福音書對這件事的記載。每一欄下面列出該卷福音書中緊接在前和在後的段落，讓你在故事原本的上下文中閱讀。
          </li>
          <li>
            <strong>查找經文。</strong>輸入經文出處，例如
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a>或
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>。本工具會打開包含這段經文的段落，並標出你所查的經節。
          </li>
          <li>
            <strong>比較次序。</strong><a href={href.order('mark', 'john')}>次序</a>頁面把兩卷福音書並列，並把它們共有的段落連起來，讓你看出一卷福音書在甚麼地方把一件事放在與另一卷不同的位置。
          </li>
          <li>
            <strong>標示共同詞語</strong>會給在不止一處記載中出現的詞語加上底色。它比較的是同一個中文譯本裏的詞語，而不是希臘文原文，所以只是幫助眼睛留意的提示，並不是分析。
          </li>
          <li>
            <strong>印成書本。</strong><a href={href.book()}>書本</a>頁面把所有段落收在一冊裏，可以列印，也可以下載 PDF。
          </li>
        </ul>
      </section>

      <section>
        <h2>顏色和標記</h2>
        <ul className="color-key">
          <li>
            每卷福音書在全站都有自己的顏色：
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>、
            <span className="col-mark"><span className="swatch" />{names.mark}</span>、
            <span className="col-luke"><span className="swatch" />{names.luke}</span>和
            <span className="col-john"><span className="swatch" />{names.john}</span>。這顏色標在每一欄的頂端、該卷福音書的名稱上，以及段落列表中它的經文出處上。
          </li>
          <li>
            <span className="verse target">藍灰色底色</span>標示你所查的經節。
          </li>
          <li>
            開啟<strong>標示共同詞語</strong>後，金色底色標示在不止一處記載中出現的詞語：
            <mark className="hl2">兩處</mark>、<mark className="hl3">三處</mark>、<mark className="hl4">四處都有</mark>。
          </li>
          <li>
            在次序頁面上，灰線把一個段落連到另一卷福音書中的同一段落；<strong className="purple">紫色</strong>線標示放在不同位置講述的段落；深色線是你正指着的那一段。灰色的標題沒有連線，表示只見於那卷福音書。
          </li>
        </ul>
      </section>

      <section>
        <h2>次序為甚麼不同</h2>
        <p>
          馬太、馬可、路加三卷（“符類福音”）在次序上有許多相同之處：先在加利利傳道，然後一次上耶路撒冷，度過最後的一週。約翰福音則記載耶穌幾次往返於加利利和耶路撒冷之間，並提到三個逾越節（{names.john}
          2:13；6:4；11:55）。最為人熟知的差異，一是潔淨聖殿：約翰把它放在傳道的開端，其他三卷放在最後一週；二是最後的晚餐和釘十字架與逾越節在時間上的關係。
        </p>
        <p>
          福音書的作者編排他們的材料，是為了宣揚耶穌是誰，而不只是記日記；所以次序上的不同是一個邀請，請我們去問：每一位作者把一個故事放在那個位置，是要向我們顯明甚麼。
        </p>
      </section>

      <section>
        <h2>關於經文和段落</h2>
        <p>
          經文採用{translation}（{licence}），一字不改地取自<a href="https://ebible.org/">eBible.org</a>。{attribution}
          其中包括一些最早期抄本所沒有的經文，例如{names.mark} 16:9-20 和{names.john} 7:53-8:11，相關的段落都有說明。另一方面，本站所用的這個電子版不包含{names.matthew} 18:11、23:14，{names.mark} 7:16、15:28，{names.luke} 17:36、23:17 和{names.john} 5:4 這七節，頁面在這些位置會註明。
        </p>
        <p>
          段落的劃分，以及哪些經文算作平行經文，都是編者的判斷，大體依照傳統的福音書合參。四卷福音書的每一節經文都只屬於一個段落，所以你查找的任何經文都能找到。馬太或路加在兩處使用同一句話時，只連結其中一處，另一處由段落的註釋指出。
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: '書本',
    heading: '全站內容彙編成書',
    intro:
      '所有段落按合參次序編成一冊，可以列印或保存：附有獻詞和目錄，書末還有經文索引，任何一節經文都能找到。',
    download: (pages, mb) => `下載 PDF（${pages} 頁，${mb} MB）`,
    paper: (size) => `PDF 為 ${size} 紙張大小。若從瀏覽器列印，則使用你自己的紙張大小。`,
    print: '從瀏覽器列印',
    notBuilt: 'PDF 在網站發佈時才製作，所以這份網站副本沒有 PDF。',
    scripture: (t) => `經文：${t}`,
    howToHeading: '如何閱讀本書',
    HowTo: ({ names }) => (
      <>
        <p>
          每個段落把各卷福音書對同一件事或同一段教導的記載並排列出，每卷福音書一欄。段落按合參次序編號（§），大致是事件發生的次序，依照傳統的福音書合參所編排。某卷福音書沒有記載的故事，段落中會註明。
        </p>
        <p>
          每一欄頂端的彩色橫條標示它屬於哪一卷福音書：
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>、
          <span className="col-mark"><span className="swatch" />{names.mark}</span>、
          <span className="col-luke"><span className="swatch" />{names.luke}</span>、
          <span className="col-john"><span className="swatch" />{names.john}</span>。
        </p>
        <p>
          要查找經文，請在書末的索引中找到章節，索引會給出段落編號。gospels.yhwh.rest
          網站上有同樣的段落，在那裏還可以比較兩卷福音書講述其故事的次序。
        </p>
      </>
    ),
    contents: '目錄',
    indexHeading: '經文索引',
    indexIntro: '四卷福音書的每一節經文都只屬於一個段落。在所屬的福音書下找到章節，再翻到該段落編號。',
    creditsHeading: '關於本書',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          經文採用{translation}（{licence}），一字不改地取自 eBible.org。{attribution}
        </p>
        <p>段落的劃分和平行經文的選擇都是編者的判斷，大體依照傳統的福音書合參。</p>
        <p>本書於 {date} 由 gospels.yhwh.rest 製作。</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': '道成肉身',
    'luke-preface': '路加致提阿非羅的序言',
    'john-birth-foretold': '預言施洗約翰的降生',
    annunciation: '天使加百列向馬利亞報信',
    magnificat: '馬利亞探望伊利莎白；馬利亞尊主頌',
    'john-birth': '施洗約翰的降生；撒迦利亞頌',
    genealogy: '耶穌的家譜',
    birth: '耶穌的降生',
    shepherds: '牧羊人',
    presentation: '在聖殿裏獻耶穌；西面和亞拿',
    magi: '博士來朝',
    'flight-egypt': '逃往埃及；伯利恆的孩子',
    'return-nazareth': '回到拿撒勒',
    'boy-in-temple': '少年耶穌在聖殿裏',
    'baptist-preaching': '施洗約翰傳道',
    'baptist-imprisoned': '施洗約翰下監',
    baptism: '耶穌受洗',
    temptation: '耶穌在曠野受試探',
    'first-disciples-john': '最初的門徒（約翰福音）',
    cana: '在迦拿變水為酒',
    'temple-cleansing': '潔淨聖殿',
    nicodemus: '耶穌與尼哥底母',
    'baptist-final-testimony': '施洗約翰最後的見證',
    'samaritan-woman': '撒馬利亞婦人',
    'galilee-begins': '耶穌回到加利利',
    'officials-son': '醫治大臣的兒子',
    'nazareth-rejection': '在拿撒勒被厭棄',
    'calling-fishermen': '呼召最初的門徒',
    'capernaum-synagogue': '在迦百農的會堂裏教訓人',
    'peters-mother-in-law': '醫治彼得的岳母；晚上醫治多人',
    'preaching-tour': '在加利利各處傳道',
    leper: '潔淨長大痲瘋的人',
    paralytic: '醫治癱子',
    levi: '呼召利未（馬太）；與罪人一同吃飯',
    'fasting-question': '論禁食',
    'grain-sabbath': '安息日掐麥穗',
    'withered-hand': '醫治枯乾了一隻手的人',
    'crowds-by-sea': '眾人跟隨耶穌；蒙揀選的僕人',
    'choosing-twelve': '揀選十二個使徒',
    bethesda: '在畢士大池邊治病',
    'authority-of-son': '子的權柄；為耶穌作的見證',
    beatitudes: '八福',
    'salt-light': '鹽和光',
    'law-fulfilled': '耶穌成全律法',
    'greater-righteousness': '論動怒、姦淫、休妻和起誓',
    'love-enemies': '論報復；要愛仇敵',
    'piety-in-secret': '在暗中施捨、禱告、禁食',
    'lords-prayer': '主禱文',
    'treasure-heaven': '積攢財寶在天上',
    'lamp-of-body': '身體的燈',
    'two-masters': '一個人不能事奉兩個主',
    'do-not-worry': '不要憂慮',
    judging: '不要論斷人',
    'ask-seek-knock': '祈求、尋找、叩門；黃金律',
    'two-foundations': '兩條路、兩種樹、兩樣根基',
    centurion: '醫治百夫長的僕人',
    'widow-nain': '拿因城寡婦的兒子復活',
    'baptist-question': '施洗約翰的疑問；耶穌為約翰作見證',
    'sinful-woman': '一個有罪的女人膏耶穌',
    'women-followers': '跟隨耶穌的婦女',
    'woes-cities': '加利利諸城有禍了',
    thanksgiving: '耶穌的感謝；到我這裏來',
    beelzebul: '關於別西卜的爭論',
    'sign-of-jonah': '約拿的神蹟',
    'unclean-spirit-returns': '污鬼回來',
    'true-blessedness': '真正有福的人',
    'true-family': '耶穌真正的親屬',
    sower: '撒種的比喻',
    'why-parables': '為甚麼用比喻',
    'sower-explained': '解釋撒種的比喻',
    'lamp-measure': '斗底下的燈；用甚麼量器量給人',
    'seed-growing': '種子自己生長',
    weeds: '麥子和稗子',
    'mustard-leaven': '芥菜種和麵酵的比喻',
    'use-of-parables': '耶穌用比喻講道',
    'weeds-explained': '解釋稗子的比喻',
    'treasure-pearl-net': '藏在地裏的寶貝、珠子、撒網',
    'would-be-followers': '想要跟從耶穌的人',
    'calming-storm': '平靜風浪',
    gerasene: '格拉森被鬼附的人',
    jairus: '睚魯的女兒和摸耶穌衣裳的女人',
    'two-blind-mute': '兩個瞎子；一個啞巴',
    harvest: '莊稼多，工人少',
    'sending-twelve': '差遣十二個使徒',
    persecution: '將要來的逼迫',
    'do-not-fear': '不要怕',
    'not-peace': '不是太平，乃是刀兵',
    'herod-baptist-death': '希律與施洗約翰的死',
    'feeding-5000': '餵飽五千人',
    'walking-water': '在海面上行走',
    gennesaret: '在革尼撒勒治病',
    'bread-of-life': '生命的糧',
    'words-eternal-life': '許多人退去；「你有永生之道」',
    'tradition-elders': '古人的遺傳；甚麼能污穢人',
    'canaanite-woman': '迦南婦人（敘利腓尼基婦人）',
    'deaf-man': '醫治耳聾舌結的人；醫治許多人',
    'feeding-4000': '餵飽四千人',
    'demand-sign': '要求看神蹟',
    'leaven-pharisees': '法利賽人的酵',
    'bethsaida-blind': '在伯賽大治好瞎子',
    'peters-confession': '彼得認耶穌是基督',
    'first-prediction': '第一次預言受難；背起十字架',
    transfiguration: '登山變像',
    'boy-unclean-spirit': '醫治被污鬼附着的孩子',
    'second-prediction': '第二次預言受難',
    'temple-tax': '納丁稅',
    greatest: '誰是最大的？',
    'strange-exorcist': '不敵擋我們的',
    stumbling: '絆倒人的事',
    'lost-sheep': '失羊的比喻',
    'forgive-brother': '勸誡和饒恕弟兄',
    'unforgiving-servant': '不饒恕人的惡僕',
    'tabernacles-1': '耶穌在住棚節',
    'tabernacles-2': '這是基督嗎？活水的江河',
    'adulterous-woman': '行淫時被拿的婦人',
    'light-of-world': '世界的光',
    'before-abraham': '真理必叫你們得以自由；還沒有亞伯拉罕就有了我',
    'man-born-blind': '醫治生來瞎眼的人',
    'good-shepherd': '好牧人',
    dedication: '耶穌在修殿節',
    'samaritan-village': '撒馬利亞的村莊不接待耶穌',
    'sending-seventy': '差遣七十個人',
    'seventy-return': '七十個人回來',
    'great-commandment': '最大的誡命',
    'good-samaritan': '好撒馬利亞人',
    'mary-martha': '馬大和馬利亞',
    'friend-midnight': '半夜求餅的朋友',
    'woes-at-dinner': '在法利賽人的席上宣告禍哉',
    'rich-fool': '無知的財主',
    'watchful-servants': '警醒的僕人',
    'faithful-servant': '忠心與不忠心的僕人',
    'interpreting-times': '分辨這時候；在路上與對頭了結',
    'repent-fig-tree': '不悔改就要滅亡；不結果子的無花果樹',
    'crippled-woman': '安息日醫治駝背的女人',
    'narrow-door': '窄門',
    'lament-jerusalem': '為耶路撒冷哀歎',
    dropsy: '醫治患水臌的人',
    'places-at-table': '席上的座位；該請誰來',
    'great-banquet': '大筵席；娶親的筵席',
    'cost-discipleship': '作門徒的代價',
    'lost-coin': '失錢的比喻',
    'prodigal-son': '浪子的比喻',
    'shrewd-manager': '不義的管家',
    'law-and-divorce': '律法與上帝的國；論休妻',
    'rich-man-lazarus': '財主和拉撒路',
    'faith-duty': '芥菜種的信心；無用的僕人',
    'ten-lepers': '潔淨十個長大痲瘋的',
    'day-son-of-man': '人子的日子',
    'persistent-widow': '恆切禱告的寡婦',
    'pharisee-tax-collector': '法利賽人和稅吏',
    divorce: '論婚姻和休妻',
    children: '耶穌為小孩子祝福',
    'rich-young-man': '富有的少年人',
    'vineyard-workers': '葡萄園工人的比喻',
    'third-prediction': '第三次預言受難',
    'james-john-request': '雅各和約翰的請求',
    bartimaeus: '醫治瞎子巴底買',
    zacchaeus: '撒該',
    talents: '按才幹受託；十錠銀子',
    lazarus: '拉撒路復活',
    plot: '謀害耶穌',
    'bethany-anointing': '在伯大尼受膏',
    'triumphal-entry': '進入耶路撒冷',
    'weeping-jerusalem': '耶穌為耶路撒冷哀哭',
    'greeks-seek': '希臘人求見耶穌；時候到了',
    unbelief: '眾人不信；最後的呼籲',
    'fig-tree': '咒詛無花果樹',
    'authority-questioned': '質問耶穌的權柄',
    'two-sons': '兩個兒子的比喻',
    'wicked-tenants': '兇惡園戶的比喻',
    caesar: '納稅給凱撒',
    'resurrection-question': '撒都該人問復活的事',
    'davids-son': '基督是誰的子孫？',
    'woes-scribes': '文士和法利賽人有禍了',
    'widows-offering': '窮寡婦的奉獻',
    'signs-of-end': '聖殿被毀；末期的預兆',
    desolation: '那行毀壞可憎的；大災難',
    'son-of-man-coming': '人子降臨',
    'lesson-fig-tree': '無花果樹的比方',
    'stay-awake': '要警醒',
    'ten-virgins': '十童女的比喻',
    'sheep-goats': '綿羊和山羊',
    'judas-agrees': '猶大答應出賣耶穌',
    'passover-preparation': '預備逾越節的筵席',
    footwashing: '耶穌為門徒洗腳',
    'betrayer-foretold': '預言有人要賣耶穌',
    'lords-supper': '主的晚餐',
    'dispute-greatness': '席間爭論誰為大',
    'new-commandment': '一條新命令',
    'denial-foretold': '預言彼得不認主',
    'two-swords': '錢囊、口袋和刀',
    'way-truth-life': '道路、真理、生命；應許賜下保惠師',
    'true-vine': '真葡萄樹',
    'worlds-hatred': '世人的恨惡',
    'spirit-joy': '聖靈的工作；憂愁要變為喜樂',
    'jesus-prays': '耶穌為門徒禱告',
    gethsemane: '在客西馬尼禱告',
    arrest: '耶穌被捕',
    'before-high-priest': '耶穌在大祭司面前',
    'peters-denials': '彼得不認主',
    'judas-death': '猶大的死',
    'before-pilate': '耶穌在彼拉多面前',
    'before-herod': '耶穌在希律面前',
    sentenced: '釋放巴拉巴；耶穌被定罪',
    'soldiers-mock': '兵丁戲弄耶穌',
    crucifixion: '釘十字架',
    death: '耶穌的死',
    burial: '安葬耶穌',
    guard: '兵丁看守墳墓',
    'empty-tomb': '空墳墓',
    'mary-magdalene': '耶穌向抹大拉的馬利亞顯現',
    'guards-report': '看守兵的報告',
    emmaus: '往以馬忤斯的路上',
    'appears-disciples': '耶穌向門徒顯現',
    thomas: '耶穌與多馬',
    'purpose-of-john': '叫你們信',
    'great-commission': '大使命',
    ascension: '耶穌升天',
    'by-the-sea': '在提比哩亞海邊吃早飯',
    'peter-restored': '耶穌挽回彼得；耶穌所愛的那門徒',
  },

  // Quotations in 「」 are copied from the 新標點和合本 text itself and are checked
  // against it by the tests; they are never translated from the English notes.
  notes: {
    genealogy:
      '馬太在福音書的開頭記載家譜，從亞伯拉罕往下排列；路加把家譜放在耶穌受洗之後，往上一直追溯到亞當。',
    'baptist-imprisoned':
      '路加在耶穌受洗之前就結束了施洗約翰的故事。馬太和馬可在後文才以倒敘的方式記載約翰被捕（馬太福音 14:3-5；馬可福音 6:17-20）。',
    baptism:
      '約翰福音沒有直接記述受洗的經過，而是記載施洗約翰的見證：他看見聖靈降下，停留在耶穌身上。',
    'temple-cleansing':
      '約翰把這事放在耶穌傳道期間的第一個逾越節（約翰福音 2:13）。馬太、馬可、路加則把它放在最後一週，緊接在進入耶路撒冷之後。',
    'officials-son':
      '這事常與醫治百夫長的僕人相比（馬太福音 8:5-13；路加福音 7:1-10）：都是遠距離的醫治，都在迦百農，求醫的都是有權位的人。',
    'nazareth-rejection':
      '路加把這一幕移到耶穌公開傳道的開端，耶穌在那裏所念的以賽亞書第 61 章，勾勒出此後一切事工的面貌。馬太和馬可則把它放在加利利事工進行了一段時間以後。',
    'calling-fishermen':
      '路加的記載包括打到許多魚的神蹟，而且是在耶穌已經醫治了西門的岳母之後（路加福音 4:38-39）。約翰福音 1:35-51 記載的是更早的一次相遇。',
    beatitudes:
      '馬太把這篇講論設在山上；路加則說是在「一塊平地」上（路加福音 6:17）。路加把四樣福與四樣禍並列。',
    'lords-prayer':
      '馬太把這篇禱告放在登山寶訓之中；路加則記載耶穌在路上，因有個門徒說「求主教導我們禱告」，才把這篇禱告教給他們。',
    'sinful-woman':
      '這是另一次膏抹，不是最後一週在伯大尼的那一次（馬太福音 26:6-13；馬可福音 14:3-9；約翰福音 12:1-8）；這一次是在加利利，在一個法利賽人的家裏。',
    'feeding-5000': '除了復活以外，這是四卷福音書都記載的唯一神蹟。',
    'words-eternal-life':
      '這是約翰福音中彼得的認信。可對照在凱撒利亞‧腓立比的認信（馬太福音 16:13-20；馬可福音 8:27-30；路加福音 9:18-21）。',
    'adulterous-woman':
      '約翰福音 7:53-8:11 不見於約翰福音最早的希臘文抄本，許多譯本把這段經文放在括號裏。',
    'great-commandment':
      '路加把這段對話放在往耶路撒冷去的路上，並由此引出好撒馬利亞人的比喻。在馬太和馬可福音中，這是在聖殿裏最後幾場辯論之一。',
    'woes-at-dinner':
      '這段話大部分與馬太福音第 23 章斥責文士和法利賽人的話平行，馬太把那番話放在最後一週的聖殿裏。',
    'watchful-servants': '可對照馬太福音 24:42-44 和馬可福音 13:33-37。',
    'lament-jerusalem': '路加把這哀歎放在路途上，耶穌還沒有進城之前；馬太則把它放在最後一週的聖殿裏。',
    'day-son-of-man': '可對照馬太福音 24:23-28、37-41。',
    'james-john-request': '路加在最後的晚餐時記載了一場類似的爭論，爭論誰為大（路加福音 22:24-30）。',
    plot: '約翰把公會的決定直接與拉撒路復活連在一起。',
    'bethany-anointing':
      '約翰把這事放在逾越節前六天，在進入耶路撒冷之前；馬太和馬可則放在逾越節前兩天，在進城之後。路加福音 7:36-50 記載的是另一次膏抹。',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
    'fig-tree': '馬可把無花果樹的事分成兩段，夾着潔淨聖殿的事來講；馬太則一次講完，放在第二天早晨。',
    footwashing:
      '在馬太、馬可、路加福音中，最後的晚餐是逾越節的筵席（馬可福音 14:12）。約翰則把它放在「逾越節以前」（約翰福音 13:1），釘十字架是在「預備逾越節的日子」（約翰福音 19:14）。',
    'betrayer-foretold': '路加把這預言放在餅和杯之後；馬太和馬可則放在之前。',
    'lords-supper': '約翰沒有記載晚餐中的餅和杯；他在這個位置記載的是洗腳（約翰福音 13:1-20）。',
    'before-high-priest': '只有約翰記載耶穌在亞那面前受審問；亞那是大祭司該亞法的岳父。',
    'judas-death': '可對照使徒行傳 1:18-19。',
    sentenced:
      '約翰記下了時辰：「那日是預備逾越節的日子，約有午正」（約翰福音 19:14）。馬可則說耶穌被釘十字架是在「巳初的時候」（馬可福音 15:25）。',
  },

  // As Intl.Segmenter('zh') splits the 和合本 text: particles, pronouns and the
  // connectives that open most verses. Single characters are listed even though
  // minWordLength already skips them, so the list stays right if that is lowered.
  // Both 着 and 著 are listed because this text writes 着 where Taiwan usage has 著.
  stopWords: `的 了 是 他 她 它 他們 她們 我 我們 你 你們 說 就 在 和 有 這 那 也 都 人 對 着 著 又 與 並 並且
  把 被 給 從 到 向 往 為 因為 所以 因此 於是 便 卻 但 但是 只是 若 若是 如果 要 必 不 沒有 沒 呢 嗎 吧 啊 哪
  麼 甚麼 這樣 那樣 這些 那些 這個 那個 一個 自己 就是 乃是 也是 又是 一同 起來 出來 進來 下來 回答 回答說
  對他說 告訴 已經 還 再 才 所 所有 一切 之 中 裏 上 下 時候 的時候 如同 好像 一樣 一般 凡 誰 怎麼 怎樣
  為甚麼 可以 能 不能 不要 當 那裏 這裏 哪裏 那時 看哪 就把 也沒有 也把 他說 各 各人 並不 還是 或是 甚至 這是 就從`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 2,
};

export default zhHant;
