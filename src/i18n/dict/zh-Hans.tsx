import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// One wording for all four sections of Mark's longer ending; the English uses one
// constant too, and four hand-copied versions would drift apart.
const LONGER_ENDING =
  '马可福音最早的两份完整希腊文抄本都结束于 16:8。新标点和合本收录了马可福音 16:9-20，但这段经文普遍被认为是后来加上的。';

const zhHans: Dict = {
  siteName: '福音书对照',
  tagline: '四卷福音书，并排对照',
  nav: { sections: '段落', order: '次序', book: '书本', about: '关于' },
  language: '语言',
  lookup: { label: '查找经文', placeholder: '查找经文，例如：路加福音 15:11-32', go: '查找' },
  loading: '正在载入福音书……',
  loadFailed: (message) => (
    <>
      <strong>无法载入福音书经文。</strong>{message}。请重新载入页面。
    </>
  ),
  footer: (link, licence) => <>经文采用{link}（{licence}）。</>,
  publicDomain: '公有领域',

  home: {
    intro:
      '选择一个段落，就可以在并排的栏中阅读各卷福音书对这件事的全部记载；也可以在上方的方框中输入任何经文出处，找出它的平行经文。每一栏都显示该卷福音书把这个故事放在哪里，以及它前后的段落。',
    filterGroup: '筛选段落',
    filterLabel: '按标题筛选段落',
    filterPlaceholder: '按标题筛选，例如：医治',
    order: '次序',
    harmony: '合参（全部段落）',
    asTold: (g) => `按${g}的次序`,
    onlyShared: '见于两卷或以上福音书',
    count: (n, total) => `${total} 个段落中的 ${n} 个`,
    noMatch: (f) => `没有段落标题符合“${f}”。请改用上方的经文查找框。`,
  },

  reader: {
    notFound: (id) => `没有名为“${id}”的段落。`,
    seeAll: '查看全部段落',
    shade: '标示共同词语',
    numbers: '经节编号',
    copyAll: '全部复制',
    copy: '复制',
    copied: '已复制',
    copyFailed: '复制失败',
    print: '打印',
    shadeIntro: '在不止一处记载中出现的词语加上了底色：',
    in2: '两处',
    in3: '三处',
    in4: '四处都有',
    shadeCaveat:
      '这里比较的是同一个中文译本里的词语，而不是希腊文原文，所以只是帮助眼睛留意的提示，并不是分析。',
    jumpLabel: '跳到某卷福音书',
    // The names arrive as an "or" list (马可福音或约翰福音); after a negative, 或 reads
    // naturally in Chinese, where "不在马可福音和约翰福音" would need a different list.
    notIn: (names) => `不见于${names}。`,
    // The printed 和合本 has these verses; the eBible file the site uses does not, so
    // the message names this text rather than claiming the translation lacks them.
    omitted: (t) => `本站所用的${t}经文不包含这一节。`,
    sectionOf: (i, n, g) => `${g}的第 ${i} 段（共 ${n} 段）`,
    beginning: (g) => `${g}的开头`,
    end: (g) => `${g}的结尾`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> 在这个段落中。你所查的经节{mark('以这样的底色标示')}。
      </>
    ),
    spans: (n, g) => `这段经文横跨${g}的 ${n} 个段落。请选择其中一个，与平行经文对照阅读。`,
    notFound: (q) => `找不到“${q}”。`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty': return `请输入经文出处，例如“${names.mark} 4:35-41”。`;
        case 'not-gospel': return `“${p.word}”不是四卷福音书之一。请试试${names.matthew}、${names.mark}、${names.luke}或${names.john}。`;
        case 'no-chapter-given': return `请加上章数，例如“${names[p.gospel]} 1”。`;
        case 'no-chapter': return p.gospel ? `${names[p.gospel]}没有第 ${p.chapter} 章` : `第 ${p.chapter} 章不存在`;
        case 'verse-count': return `${names[p.gospel]}第 ${p.chapter} 章只有 ${p.verses} 节，没有第 ${p.verse} 节`;
        case 'backwards': return `${formatRange(p.range)} 的起止次序颠倒了`;
        case 'unreadable': return `无法识别“${p.text}”`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `次序：${a}与${b}`,
    title: '每卷福音书把故事放在哪里',
    intro:
      '每一栏按一卷福音书讲述的次序，从头到尾列出它的段落。一条线把一个段落连到另一卷福音书中的同一段落。线条交叉的地方，表示两卷福音书讲述这些事件的次序不同。',
    left: '左栏',
    right: '右栏',
    summary: (a, na, b, nb, both) => `${a}有 ${na} 个段落，${b}有 ${nb} 个；其中 ${both} 个两卷都有。`,
    same: '两卷福音书讲述所有共有段落的次序完全相同。',
    one: '次序的差异来自一个段落。把它放在一边，两卷福音书讲述其余共有内容的次序就完全一致：',
    many: (n) =>
      `次序的差异来自以下 ${n} 个段落。把它们放在一边，两卷福音书讲述其余共有内容的次序就完全一致：`,
    position: (pa, na, a, pb, nb, b) => `——在${a}中是第 ${pa} 段（共 ${na} 段），在${b}中是第 ${pb} 段（共 ${nb} 段）`,
    tie: '当两种解释同样简单时（是一卷福音书把某个故事提前了，还是另一卷把与它相邻的故事延后了？），只列出其中一种；所以请把这份列表理解为“次序不同之处”，而不是“作者移动了什么”。',
    legend: {
      label: '图例',
      same: '两卷福音书中的同一段落',
      notable: '上面所列、放在不同位置讲述的段落',
      focus: '你正指着的段落',
      sample: '标题',
      both: '另一卷福音书也有（横条用本栏的颜色）',
      only: '只见于这卷福音书，所以没有连线',
    },
    lane: (g) => `${g}的次序`,
  },

  // God's glory and Darrell's name stay in separate paragraphs, as in English, and
  // nothing here is worded as a tribute or memorial: he is living, and the family
  // asked for both. The book titles stay in English because they are English books.
  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>关于本站</h1>
      <p>本站献上，为要称颂全能的神：本站摆在读者面前的，是他的话语；这四卷福音书所传扬的，是他的儿子。</p>
      <p>
        本站是为 Darrell W. Johnson 制作的。五十多年来，他一直传讲耶稣基督和他的福音：曾在加州、马尼拉联合教会（Union
        Church of Manila）和温哥华第一浸信会（First Baptist Church）担任牧师，又在富勒神学院（Fuller Theological
        Seminary）、维真学院（Regent College）和凯里神学院（Carey Theological College）教导传道人。如今他在 The Way
        Church 和 The Pastorate Ministries Canada 事奉。他的著作有 <cite>The Glory of Preaching</cite>、
        <cite>Who Is Jesus?</cite>、<cite>Jesus the Healer</cite>、<cite>The Beatitudes</cite> 等书。
      </p>
      <p>
        他的讲道和这个工具有同样的起点：紧贴经文，让经文说出它本来要说的话。本站源于 Darrell
        和家人一同开始的一个计划：比较马太、马可、路加三卷福音书与约翰福音所记事件的先后次序。
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Darrell 的讲道、著作与教导 →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>如何使用</h2>
        <ul>
          <li>
            <strong>阅读一个段落。</strong>从<a href={href.home()}>列表</a>中选择任何一个段落，就可以并排看到各卷福音书对这件事的记载。每一栏下面列出该卷福音书中紧接在前和在后的段落，让你在故事原本的上下文中阅读。
          </li>
          <li>
            <strong>查找经文。</strong>输入经文出处，例如
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a>或
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>。本工具会打开包含这段经文的段落，并标出你所查的经节。
          </li>
          <li>
            <strong>比较次序。</strong><a href={href.order('mark', 'john')}>次序</a>页面把两卷福音书并列，并把它们共有的段落连起来，让你看出一卷福音书在什么地方把一件事放在与另一卷不同的位置。
          </li>
          <li>
            <strong>标示共同词语</strong>会给在不止一处记载中出现的词语加上底色。它比较的是同一个中文译本里的词语，而不是希腊文原文，所以只是帮助眼睛留意的提示，并不是分析。
          </li>
          <li>
            <strong>印成书本。</strong><a href={href.book()}>书本</a>页面把所有段落收在一册里，可以打印，也可以下载 PDF。
          </li>
        </ul>
      </section>

      <section>
        <h2>颜色和标记</h2>
        <ul className="color-key">
          <li>
            每卷福音书在全站都有自己的颜色：
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>、
            <span className="col-mark"><span className="swatch" />{names.mark}</span>、
            <span className="col-luke"><span className="swatch" />{names.luke}</span>和
            <span className="col-john"><span className="swatch" />{names.john}</span>。这颜色标在每一栏的顶端、该卷福音书的名称上，以及段落列表中它的经文出处上。
          </li>
          <li>
            <span className="verse target">蓝灰色底色</span>标示你所查的经节。
          </li>
          <li>
            开启<strong>标示共同词语</strong>后，金色底色标示在不止一处记载中出现的词语：
            <mark className="hl2">两处</mark>、<mark className="hl3">三处</mark>、<mark className="hl4">四处都有</mark>。
          </li>
          <li>
            在次序页面上，灰线把一个段落连到另一卷福音书中的同一段落；<strong className="purple">紫色</strong>线标示放在不同位置讲述的段落；深色线是你正指着的那一段。灰色的标题没有连线，表示只见于那卷福音书。
          </li>
        </ul>
      </section>

      <section>
        <h2>次序为什么不同</h2>
        <p>
          马太、马可、路加三卷（“符类福音”）在次序上有许多相同之处：先在加利利传道，然后一次上耶路撒冷，度过最后的一周。约翰福音则记载耶稣几次往返于加利利和耶路撒冷之间，并提到三个逾越节（{names.john}
          2:13；6:4；11:55）。最为人熟知的差异，一是洁净圣殿：约翰把它放在传道的开端，其他三卷放在最后一周；二是最后的晚餐和钉十字架与逾越节在时间上的关系。
        </p>
        <p>
          福音书的作者编排他们的材料，是为了宣扬耶稣是谁，而不只是记日记；所以次序上的不同是一个邀请，请我们去问：每一位作者把一个故事放在那个位置，是要向我们显明什么。
        </p>
      </section>

      <section>
        <h2>关于经文和段落</h2>
        <p>
          经文采用{translation}（{licence}），一字不改地取自<a href="https://ebible.org/">eBible.org</a>。{attribution}
          其中包括一些最早期抄本所没有的经文，例如{names.mark} 16:9-20 和{names.john} 7:53-8:11，相关的段落都有说明。另一方面，本站所用的这个电子版不包含{names.matthew} 18:11、23:14，{names.mark} 7:16、15:28，{names.luke} 17:36、23:17 和{names.john} 5:4 这七节，页面在这些位置会注明。
        </p>
        <p>
          段落的划分，以及哪些经文算作平行经文，都是编者的判断，大体依照传统的福音书合参。四卷福音书的每一节经文都只属于一个段落，所以你查找的任何经文都能找到。马太或路加在两处使用同一句话时，只连结其中一处，另一处由段落的注释指出。
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: '书本',
    heading: '全站内容汇编成书',
    intro:
      '所有段落按合参次序编成一册，可以打印或保存：附有献词和目录，书末还有经文索引，任何一节经文都能找到。',
    download: (pages, mb) => `下载 PDF（${pages} 页，${mb} MB）`,
    paper: (size) => `PDF 为 ${size} 纸张大小。若从浏览器打印，则使用你自己的纸张大小。`,
    print: '从浏览器打印',
    notBuilt: 'PDF 在网站发布时才制作，所以这份网站副本没有 PDF。',
    scripture: (t) => `经文：${t}`,
    howToHeading: '如何阅读本书',
    HowTo: ({ names }) => (
      <>
        <p>
          每个段落把各卷福音书对同一件事或同一段教导的记载并排列出，每卷福音书一栏。段落按合参次序编号（§），大致是事件发生的次序，依照传统的福音书合参所编排。某卷福音书没有记载的故事，段落中会注明。
        </p>
        <p>
          每一栏顶端的彩色横条标示它属于哪一卷福音书：
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>、
          <span className="col-mark"><span className="swatch" />{names.mark}</span>、
          <span className="col-luke"><span className="swatch" />{names.luke}</span>、
          <span className="col-john"><span className="swatch" />{names.john}</span>。
        </p>
        <p>
          要查找经文，请在书末的索引中找到章节，索引会给出段落编号。gospels.yhwh.rest
          网站上有同样的段落，在那里还可以比较两卷福音书讲述其故事的次序。
        </p>
      </>
    ),
    contents: '目录',
    indexHeading: '经文索引',
    indexIntro: '四卷福音书的每一节经文都只属于一个段落。在所属的福音书下找到章节，再翻到该段落编号。',
    creditsHeading: '关于本书',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          经文采用{translation}（{licence}），一字不改地取自 eBible.org。{attribution}
        </p>
        <p>段落的划分和平行经文的选择都是编者的判断，大体依照传统的福音书合参。</p>
        <p>本书于 {date} 由 gospels.yhwh.rest 制作。</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': '道成肉身',
    'luke-preface': '路加致提阿非罗的序言',
    'john-birth-foretold': '预言施洗约翰的降生',
    annunciation: '天使加百列向马利亚报信',
    magnificat: '马利亚探望伊利莎白；马利亚尊主颂',
    'john-birth': '施洗约翰的降生；撒迦利亚颂',
    genealogy: '耶稣的家谱',
    birth: '耶稣的降生',
    shepherds: '牧羊人',
    presentation: '在圣殿里献耶稣；西面和亚拿',
    magi: '博士来朝',
    'flight-egypt': '逃往埃及；伯利恒的孩子',
    'return-nazareth': '回到拿撒勒',
    'boy-in-temple': '少年耶稣在圣殿里',
    'baptist-preaching': '施洗约翰传道',
    'baptist-imprisoned': '施洗约翰下监',
    baptism: '耶稣受洗',
    temptation: '耶稣在旷野受试探',
    'first-disciples-john': '最初的门徒（约翰福音）',
    cana: '在迦拿变水为酒',
    'temple-cleansing': '洁净圣殿',
    nicodemus: '耶稣与尼哥底母',
    'baptist-final-testimony': '施洗约翰最后的见证',
    'samaritan-woman': '撒马利亚妇人',
    'galilee-begins': '耶稣回到加利利',
    'officials-son': '医治大臣的儿子',
    'nazareth-rejection': '在拿撒勒被厌弃',
    'calling-fishermen': '呼召最初的门徒',
    'capernaum-synagogue': '在迦百农的会堂里教训人',
    'peters-mother-in-law': '医治彼得的岳母；晚上医治多人',
    'preaching-tour': '在加利利各处传道',
    leper: '洁净长大麻风的人',
    paralytic: '医治瘫子',
    levi: '呼召利未（马太）；与罪人一同吃饭',
    'fasting-question': '论禁食',
    'grain-sabbath': '安息日掐麦穗',
    'withered-hand': '医治枯干了一只手的人',
    'crowds-by-sea': '众人跟随耶稣；蒙拣选的仆人',
    'choosing-twelve': '拣选十二个使徒',
    bethesda: '在毕士大池边治病',
    'authority-of-son': '子的权柄；为耶稣作的见证',
    beatitudes: '八福',
    'salt-light': '盐和光',
    'law-fulfilled': '耶稣成全律法',
    'greater-righteousness': '论动怒、奸淫、休妻和起誓',
    'love-enemies': '论报复；要爱仇敌',
    'piety-in-secret': '在暗中施舍、祷告、禁食',
    'lords-prayer': '主祷文',
    'treasure-heaven': '积攒财宝在天上',
    'lamp-of-body': '身体的灯',
    'two-masters': '一个人不能事奉两个主',
    'do-not-worry': '不要忧虑',
    judging: '不要论断人',
    'ask-seek-knock': '祈求、寻找、叩门；黄金律',
    'two-foundations': '两条路、两种树、两样根基',
    centurion: '医治百夫长的仆人',
    'widow-nain': '拿因城寡妇的儿子复活',
    'baptist-question': '施洗约翰的疑问；耶稣为约翰作见证',
    'sinful-woman': '一个有罪的女人膏耶稣',
    'women-followers': '跟随耶稣的妇女',
    'woes-cities': '加利利诸城有祸了',
    thanksgiving: '耶稣的感谢；到我这里来',
    beelzebul: '关于别西卜的争论',
    'sign-of-jonah': '约拿的神迹',
    'unclean-spirit-returns': '污鬼回来',
    'true-blessedness': '真正有福的人',
    'true-family': '耶稣真正的亲属',
    sower: '撒种的比喻',
    'why-parables': '为什么用比喻',
    'sower-explained': '解释撒种的比喻',
    'lamp-measure': '斗底下的灯；用什么量器量给人',
    'seed-growing': '种子自己生长',
    weeds: '麦子和稗子',
    'mustard-leaven': '芥菜种和面酵的比喻',
    'use-of-parables': '耶稣用比喻讲道',
    'weeds-explained': '解释稗子的比喻',
    'treasure-pearl-net': '藏在地里的宝贝、珠子、撒网',
    'would-be-followers': '想要跟从耶稣的人',
    'calming-storm': '平静风浪',
    gerasene: '格拉森被鬼附的人',
    jairus: '睚鲁的女儿和摸耶稣衣裳的女人',
    'two-blind-mute': '两个瞎子；一个哑巴',
    harvest: '庄稼多，工人少',
    'sending-twelve': '差遣十二个使徒',
    persecution: '将要来的逼迫',
    'do-not-fear': '不要怕',
    'not-peace': '不是太平，乃是刀兵',
    'herod-baptist-death': '希律与施洗约翰的死',
    'feeding-5000': '喂饱五千人',
    'walking-water': '在海面上行走',
    gennesaret: '在革尼撒勒治病',
    'bread-of-life': '生命的粮',
    'words-eternal-life': '许多人退去；「你有永生之道」',
    'tradition-elders': '古人的遗传；什么能污秽人',
    'canaanite-woman': '迦南妇人（叙利腓尼基妇人）',
    'deaf-man': '医治耳聋舌结的人；医治许多人',
    'feeding-4000': '喂饱四千人',
    'demand-sign': '要求看神迹',
    'leaven-pharisees': '法利赛人的酵',
    'bethsaida-blind': '在伯赛大治好瞎子',
    'peters-confession': '彼得认耶稣是基督',
    'first-prediction': '第一次预言受难；背起十字架',
    transfiguration: '登山变像',
    'boy-unclean-spirit': '医治被污鬼附着的孩子',
    'second-prediction': '第二次预言受难',
    'temple-tax': '纳丁税',
    greatest: '谁是最大的？',
    'strange-exorcist': '不敌挡我们的',
    stumbling: '绊倒人的事',
    'lost-sheep': '失羊的比喻',
    'forgive-brother': '劝诫和饶恕弟兄',
    'unforgiving-servant': '不饶恕人的恶仆',
    'tabernacles-1': '耶稣在住棚节',
    'tabernacles-2': '这是基督吗？活水的江河',
    'adulterous-woman': '行淫时被拿的妇人',
    'light-of-world': '世界的光',
    'before-abraham': '真理必叫你们得以自由；还没有亚伯拉罕就有了我',
    'man-born-blind': '医治生来瞎眼的人',
    'good-shepherd': '好牧人',
    dedication: '耶稣在修殿节',
    'samaritan-village': '撒马利亚的村庄不接待耶稣',
    'sending-seventy': '差遣七十个人',
    'seventy-return': '七十个人回来',
    'great-commandment': '最大的诫命',
    'good-samaritan': '好撒马利亚人',
    'mary-martha': '马大和马利亚',
    'friend-midnight': '半夜求饼的朋友',
    'woes-at-dinner': '在法利赛人的席上宣告祸哉',
    'rich-fool': '无知的财主',
    'watchful-servants': '警醒的仆人',
    'faithful-servant': '忠心与不忠心的仆人',
    'interpreting-times': '分辨这时候；在路上与对头了结',
    'repent-fig-tree': '不悔改就要灭亡；不结果子的无花果树',
    'crippled-woman': '安息日医治驼背的女人',
    'narrow-door': '窄门',
    'lament-jerusalem': '为耶路撒冷哀叹',
    dropsy: '医治患水臌的人',
    'places-at-table': '席上的座位；该请谁来',
    'great-banquet': '大筵席；娶亲的筵席',
    'cost-discipleship': '作门徒的代价',
    'lost-coin': '失钱的比喻',
    'prodigal-son': '浪子的比喻',
    'shrewd-manager': '不义的管家',
    'law-and-divorce': '律法与神的国；论休妻',
    'rich-man-lazarus': '财主和拉撒路',
    'faith-duty': '芥菜种的信心；无用的仆人',
    'ten-lepers': '洁净十个长大麻风的',
    'day-son-of-man': '人子的日子',
    'persistent-widow': '恒切祷告的寡妇',
    'pharisee-tax-collector': '法利赛人和税吏',
    divorce: '论婚姻和休妻',
    children: '耶稣为小孩子祝福',
    'rich-young-man': '富有的少年人',
    'vineyard-workers': '葡萄园工人的比喻',
    'third-prediction': '第三次预言受难',
    'james-john-request': '雅各和约翰的请求',
    bartimaeus: '医治瞎子巴底买',
    zacchaeus: '撒该',
    talents: '按才干受托；十锭银子',
    lazarus: '拉撒路复活',
    plot: '谋害耶稣',
    'bethany-anointing': '在伯大尼受膏',
    'triumphal-entry': '进入耶路撒冷',
    'weeping-jerusalem': '耶稣为耶路撒冷哀哭',
    'greeks-seek': '希腊人求见耶稣；时候到了',
    unbelief: '众人不信；最后的呼吁',
    'fig-tree': '咒诅无花果树',
    'authority-questioned': '质问耶稣的权柄',
    'two-sons': '两个儿子的比喻',
    'wicked-tenants': '凶恶园户的比喻',
    caesar: '纳税给凯撒',
    'resurrection-question': '撒都该人问复活的事',
    'davids-son': '基督是谁的子孙？',
    'woes-scribes': '文士和法利赛人有祸了',
    'widows-offering': '穷寡妇的奉献',
    'signs-of-end': '圣殿被毁；末期的预兆',
    desolation: '那行毁坏可憎的；大灾难',
    'son-of-man-coming': '人子降临',
    'lesson-fig-tree': '无花果树的比方',
    'stay-awake': '要警醒',
    'ten-virgins': '十童女的比喻',
    'sheep-goats': '绵羊和山羊',
    'judas-agrees': '犹大答应出卖耶稣',
    'passover-preparation': '预备逾越节的筵席',
    footwashing: '耶稣为门徒洗脚',
    'betrayer-foretold': '预言有人要卖耶稣',
    'lords-supper': '主的晚餐',
    'dispute-greatness': '席间争论谁为大',
    'new-commandment': '一条新命令',
    'denial-foretold': '预言彼得不认主',
    'two-swords': '钱囊、口袋和刀',
    'way-truth-life': '道路、真理、生命；应许赐下保惠师',
    'true-vine': '真葡萄树',
    'worlds-hatred': '世人的恨恶',
    'spirit-joy': '圣灵的工作；忧愁要变为喜乐',
    'jesus-prays': '耶稣为门徒祷告',
    gethsemane: '在客西马尼祷告',
    arrest: '耶稣被捕',
    'before-high-priest': '耶稣在大祭司面前',
    'peters-denials': '彼得不认主',
    'judas-death': '犹大的死',
    'before-pilate': '耶稣在彼拉多面前',
    'before-herod': '耶稣在希律面前',
    sentenced: '释放巴拉巴；耶稣被定罪',
    'soldiers-mock': '兵丁戏弄耶稣',
    crucifixion: '钉十字架',
    death: '耶稣的死',
    burial: '安葬耶稣',
    guard: '兵丁看守坟墓',
    'empty-tomb': '空坟墓',
    'mary-magdalene': '耶稣向抹大拉的马利亚显现',
    'guards-report': '看守兵的报告',
    emmaus: '往以马忤斯的路上',
    'appears-disciples': '耶稣向门徒显现',
    thomas: '耶稣与多马',
    'purpose-of-john': '叫你们信',
    'great-commission': '大使命',
    ascension: '耶稣升天',
    'by-the-sea': '在提比哩亚海边吃早饭',
    'peter-restored': '耶稣挽回彼得；耶稣所爱的那门徒',
  },

  // Quotations in 「」 are copied from the 新标点和合本 text itself and are checked
  // against it by the tests; they are never translated from the English notes.
  notes: {
    genealogy:
      '马太在福音书的开头记载家谱，从亚伯拉罕往下排列；路加把家谱放在耶稣受洗之后，往上一直追溯到亚当。',
    'baptist-imprisoned':
      '路加在耶稣受洗之前就结束了施洗约翰的故事。马太和马可在后文才以倒叙的方式记载约翰被捕（马太福音 14:3-5；马可福音 6:17-20）。',
    baptism:
      '约翰福音没有直接记述受洗的经过，而是记载施洗约翰的见证：他看见圣灵降下，停留在耶稣身上。',
    'temple-cleansing':
      '约翰把这事放在耶稣传道期间的第一个逾越节（约翰福音 2:13）。马太、马可、路加则把它放在最后一周，紧接在进入耶路撒冷之后。',
    'officials-son':
      '这事常与医治百夫长的仆人相比（马太福音 8:5-13；路加福音 7:1-10）：都是远距离的医治，都在迦百农，求医的都是有权位的人。',
    'nazareth-rejection':
      '路加把这一幕移到耶稣公开传道的开端，耶稣在那里所念的以赛亚书第 61 章，勾勒出此后一切事工的面貌。马太和马可则把它放在加利利事工进行了一段时间以后。',
    'calling-fishermen':
      '路加的记载包括打到许多鱼的神迹，而且是在耶稣已经医治了西门的岳母之后（路加福音 4:38-39）。约翰福音 1:35-51 记载的是更早的一次相遇。',
    beatitudes:
      '马太把这篇讲论设在山上；路加则说是在「一块平地」上（路加福音 6:17）。路加把四样福与四样祸并列。',
    'lords-prayer':
      '马太把这篇祷告放在登山宝训之中；路加则记载耶稣在路上，因有个门徒说「求主教导我们祷告」，才把这篇祷告教给他们。',
    'sinful-woman':
      '这是另一次膏抹，不是最后一周在伯大尼的那一次（马太福音 26:6-13；马可福音 14:3-9；约翰福音 12:1-8）；这一次是在加利利，在一个法利赛人的家里。',
    'feeding-5000': '除了复活以外，这是四卷福音书都记载的唯一神迹。',
    'words-eternal-life':
      '这是约翰福音中彼得的认信。可对照在凯撒利亚·腓立比的认信（马太福音 16:13-20；马可福音 8:27-30；路加福音 9:18-21）。',
    'adulterous-woman':
      '约翰福音 7:53-8:11 不见于约翰福音最早的希腊文抄本，许多译本把这段经文放在括号里。',
    'great-commandment':
      '路加把这段对话放在往耶路撒冷去的路上，并由此引出好撒马利亚人的比喻。在马太和马可福音中，这是在圣殿里最后几场辩论之一。',
    'woes-at-dinner':
      '这段话大部分与马太福音第 23 章斥责文士和法利赛人的话平行，马太把那番话放在最后一周的圣殿里。',
    'watchful-servants': '可对照马太福音 24:42-44 和马可福音 13:33-37。',
    'lament-jerusalem': '路加把这哀叹放在路途上，耶稣还没有进城之前；马太则把它放在最后一周的圣殿里。',
    'day-son-of-man': '可对照马太福音 24:23-28、37-41。',
    'james-john-request': '路加在最后的晚餐时记载了一场类似的争论，争论谁为大（路加福音 22:24-30）。',
    plot: '约翰把公会的决定直接与拉撒路复活连在一起。',
    'bethany-anointing':
      '约翰把这事放在逾越节前六天，在进入耶路撒冷之前；马太和马可则放在逾越节前两天，在进城之后。路加福音 7:36-50 记载的是另一次膏抹。',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
    'fig-tree': '马可把无花果树的事分成两段，夹着洁净圣殿的事来讲；马太则一次讲完，放在第二天早晨。',
    footwashing:
      '在马太、马可、路加福音中，最后的晚餐是逾越节的筵席（马可福音 14:12）。约翰则把它放在「逾越节以前」（约翰福音 13:1），钉十字架是在「预备逾越节的日子」（约翰福音 19:14）。',
    'betrayer-foretold': '路加把这预言放在饼和杯之后；马太和马可则放在之前。',
    'lords-supper': '约翰没有记载晚餐中的饼和杯；他在这个位置记载的是洗脚（约翰福音 13:1-20）。',
    'before-high-priest': '只有约翰记载耶稣在亚那面前受审问；亚那是大祭司该亚法的岳父。',
    'judas-death': '可对照使徒行传 1:18-19。',
    sentenced:
      '约翰记下了时辰：「那日是预备逾越节的日子，约有午正」（约翰福音 19:14）。马可则说耶稣被钉十字架是在「巳初的时候」（马可福音 15:25）。',
  },

  // As Intl.Segmenter('zh') splits the 和合本 text: particles, pronouns and the
  // connectives that open most verses. Single characters are listed even though
  // minWordLength already skips them, so the list stays right if that is lowered.
  stopWords: `的 了 是 他 她 它 他们 她们 我 我们 你 你们 说 就 在 和 有 这 那 也 都 人 对 着 又 与 并 并且
  把 被 给 从 到 向 往 为 因为 所以 因此 于是 便 却 但 但是 只是 若 若是 如果 要 必 不 没有 没 呢 吗 吧 啊 哪
  么 什么 这样 那样 这些 那些 这个 那个 一个 自己 就是 乃是 也是 又是 一同 起来 出来 进来 下来 回答 回答说
  对他说 告诉 已经 还 再 才 所 所有 一切 之 中 里 上 下 时候 的时候 如同 好像 一样 一般 凡 谁 怎么 怎样
  为什么 可以 能 不能 不要 当 那里 这里 哪里 那时 看哪 就把 也没有 也把 他说 各 各人 并不 还是 或是 甚至 这是 就从`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 2,
};

export default zhHans;
