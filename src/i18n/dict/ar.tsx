import type { Dict } from '../dict';
import { BOOKS } from '../books';
import { formatRange } from '../../lib/refs';

// References in notes use the full names ("متى 14:3-5"), as Arabic Bibles usually do.
const n = BOOKS.ar.names;

const LONGER_ENDING = `تنتهي أقدم مخطوطتين يونانيتين كاملتين لإنجيل مرقس عند 16:8. ويرد ${n.mark} 16:9-20 في ترجمة فان دايك، لكنه يُعَدّ على نطاق واسع إضافةً لاحقة.`;

const titles: Record<string, string> = {
  'prologue-word': 'الكلمة صار جسدًا',
  'luke-preface': 'مقدمة لوقا إلى ثاوفيلس',
  'john-birth-foretold': 'البشارة بميلاد يوحنا المعمدان',
  annunciation: 'الملاك جبرائيل يبشّر مريم',
  magnificat: 'مريم تزور أليصابات؛ تسبحة مريم',
  'john-birth': 'ميلاد يوحنا المعمدان؛ تسبحة زكريا',
  genealogy: 'نسب يسوع',
  birth: 'ميلاد يسوع',
  shepherds: 'الرعاة',
  presentation: 'تقديم يسوع في الهيكل؛ سمعان وحنة',
  magi: 'زيارة المجوس',
  'flight-egypt': 'الهروب إلى مصر؛ أطفال بيت لحم',
  'return-nazareth': 'العودة إلى الناصرة',
  'boy-in-temple': 'الصبي يسوع في الهيكل',
  'baptist-preaching': 'كرازة يوحنا المعمدان',
  'baptist-imprisoned': 'سجن يوحنا المعمدان',
  baptism: 'معمودية يسوع',
  temptation: 'التجربة في البرية',
  'first-disciples-john': 'التلاميذ الأولون (يوحنا)',
  cana: 'عرس قانا الجليل',
  'temple-cleansing': 'تطهير الهيكل',
  nicodemus: 'يسوع ونيقوديموس',
  'baptist-final-testimony': 'شهادة يوحنا المعمدان الأخيرة',
  'samaritan-woman': 'المرأة السامرية',
  'galilee-begins': 'يسوع يعود إلى الجليل',
  'officials-son': 'شفاء ابن خادم الملك',
  'nazareth-rejection': 'رفض يسوع في الناصرة',
  'calling-fishermen': 'دعوة التلاميذ الأولين',
  'capernaum-synagogue': 'التعليم في مجمع كفرناحوم',
  'peters-mother-in-law': 'شفاء حماة بطرس؛ أشفية عند المساء',
  'preaching-tour': 'جولة كرازة في الجليل',
  leper: 'تطهير أبرص',
  paralytic: 'شفاء المفلوج',
  levi: 'دعوة لاوي (متى)؛ الأكل مع الخطاة',
  'fasting-question': 'السؤال عن الصوم',
  'grain-sabbath': 'قطف السنابل في السبت',
  'withered-hand': 'شفاء اليد اليابسة',
  'crowds-by-sea': 'الجموع تأتي إلى يسوع؛ الفتى المختار',
  'choosing-twelve': 'اختيار الاثني عشر',
  bethesda: 'الشفاء عند بركة بيت حسدا',
  'authority-of-son': 'سلطان الابن؛ الشهود ليسوع',
  beatitudes: 'التطويبات',
  'salt-light': 'الملح والنور',
  'law-fulfilled': 'يسوع يكمّل الناموس',
  'greater-righteousness': 'الغضب والزنى والطلاق والحلف',
  'love-enemies': 'لا تقاوموا الشر؛ أحبوا أعداءكم',
  'piety-in-secret': 'الصدقة والصلاة والصوم في الخفاء',
  'lords-prayer': 'الصلاة الربانية',
  'treasure-heaven': 'الكنز في السماء',
  'lamp-of-body': 'سراج الجسد',
  'two-masters': 'لا يقدر أحد أن يخدم سيدين',
  'do-not-worry': 'لا تهتموا',
  judging: 'لا تدينوا',
  'ask-seek-knock': 'اسألوا، اطلبوا، اقرعوا؛ القاعدة الذهبية',
  'two-foundations': 'طريقان وشجرتان وأساسان',
  centurion: 'شفاء غلام قائد المئة',
  'widow-nain': 'إقامة ابن أرملة نايين',
  'baptist-question': 'سؤال يوحنا المعمدان؛ شهادة يسوع ليوحنا',
  'sinful-woman': 'امرأة خاطئة تدهن يسوع بالطيب',
  'women-followers': 'نساء تبعن يسوع',
  'woes-cities': 'الويل لمدن الجليل',
  thanksgiving: 'يسوع يحمد الآب؛ «تعالوا إليّ»',
  beelzebul: 'الجدال حول بعلزبول',
  'sign-of-jonah': 'آية يونان',
  'unclean-spirit-returns': 'عودة الروح النجس',
  'true-blessedness': 'الطوبى الحقيقية',
  'true-family': 'عائلة يسوع الحقيقية',
  sower: 'مثل الزارع',
  'why-parables': 'لماذا يكلّمهم بأمثال',
  'sower-explained': 'تفسير مثل الزارع',
  'lamp-measure': 'السراج تحت المكيال؛ بالكيل الذي به تكيلون',
  'seed-growing': 'البذار الذي ينمو من نفسه',
  weeds: 'الحنطة والزوان',
  'mustard-leaven': 'حبة الخردل والخميرة',
  'use-of-parables': 'يسوع يكلّم الجموع بأمثال',
  'weeds-explained': 'تفسير مثل الزوان',
  'treasure-pearl-net': 'الكنز المخفى، اللؤلؤة، الشبكة',
  'would-be-followers': 'الراغبون في اتباع يسوع',
  'calming-storm': 'تهدئة العاصفة',
  gerasene: 'مجنون كورة الجدريين',
  jairus: 'ابنة يايرس والمرأة التي لمست ثوبه',
  'two-blind-mute': 'أعميان وأخرس',
  harvest: 'الحصاد كثير',
  'sending-twelve': 'إرسال الاثني عشر',
  persecution: 'الاضطهاد الآتي',
  'do-not-fear': 'لا تخافوا',
  'not-peace': 'لا سلامًا بل سيفًا',
  'herod-baptist-death': 'هيرودس وموت يوحنا المعمدان',
  'feeding-5000': 'إشباع الخمسة الآلاف',
  'walking-water': 'المشي على الماء',
  gennesaret: 'أشفية في جنيسارت',
  'bread-of-life': 'خبز الحياة',
  'words-eternal-life': 'كثيرون يرجعون؛ «كلام الحياة الأبدية عندك»',
  'tradition-elders': 'تقليد الشيوخ؛ ما ينجّس الإنسان',
  'canaanite-woman': 'المرأة الكنعانية (الفينيقية السورية)',
  'deaf-man': 'شفاء أصم؛ أشفية كثيرة',
  'feeding-4000': 'إشباع الأربعة الآلاف',
  'demand-sign': 'طلب آية',
  'leaven-pharisees': 'خمير الفريسيين',
  'bethsaida-blind': 'أعمى في بيت صيدا',
  'peters-confession': 'اعتراف بطرس',
  'first-prediction': 'الإنباء الأول بالآلام؛ احمل صليبك',
  transfiguration: 'التجلي',
  'boy-unclean-spirit': 'شفاء صبي به روح نجس',
  'second-prediction': 'الإنباء الثاني بالآلام',
  'temple-tax': 'ضريبة الهيكل',
  greatest: 'من هو الأعظم؟',
  'strange-exorcist': 'من ليس علينا فهو معنا',
  stumbling: 'العثرات',
  'lost-sheep': 'الخروف الضال',
  'forgive-brother': 'معاتبة الأخ ومسامحته',
  'unforgiving-servant': 'مثل العبد الذي لم يسامح',
  'tabernacles-1': 'في عيد المظال',
  'tabernacles-2': 'ألعل هذا هو المسيح؟ أنهار ماء حي',
  'adulterous-woman': 'المرأة التي أُمسكت في زنى',
  'light-of-world': 'نور العالم',
  'before-abraham': 'الحق يحرركم؛ قبل أن يكون إبراهيم',
  'man-born-blind': 'شفاء المولود أعمى',
  'good-shepherd': 'الراعي الصالح',
  dedication: 'في عيد التجديد',
  'samaritan-village': 'قرية سامرية ترفض يسوع',
  'sending-seventy': 'إرسال السبعين',
  'seventy-return': 'رجوع السبعين',
  'great-commandment': 'الوصية العظمى',
  'good-samaritan': 'مثل السامري الصالح',
  'mary-martha': 'مرثا ومريم',
  'friend-midnight': 'الصديق في نصف الليل',
  'woes-at-dinner': 'الويلات على مائدة فريسي',
  'rich-fool': 'الغني الغبي',
  'watchful-servants': 'العبيد الساهرون',
  'faithful-servant': 'العبد الأمين والعبد الرديء',
  'interpreting-times': 'تمييز الزمان؛ صالح خصمك في الطريق',
  'repent-fig-tree': 'توبوا وإلا تهلكوا؛ التينة غير المثمرة',
  'crippled-woman': 'شفاء امرأة منحنية في السبت',
  'narrow-door': 'الباب الضيق',
  'lament-jerusalem': 'الرثاء على أورشليم',
  dropsy: 'شفاء رجل مستسقٍ',
  'places-at-table': 'المتكآت الأولى؛ مَن تدعو',
  'great-banquet': 'العشاء العظيم؛ وليمة العرس',
  'cost-discipleship': 'كلفة التلمذة',
  'lost-coin': 'الدرهم المفقود',
  'prodigal-son': 'مثل الابن الضال',
  'shrewd-manager': 'وكيل الظلم',
  'law-and-divorce': 'الناموس والملكوت؛ الطلاق',
  'rich-man-lazarus': 'الغني ولعازر',
  'faith-duty': 'إيمان مثل حبة خردل؛ عبيد بطالون',
  'ten-lepers': 'تطهير العشرة البرص',
  'day-son-of-man': 'يوم ابن الإنسان',
  'persistent-widow': 'الأرملة اللجوجة',
  'pharisee-tax-collector': 'الفريسي والعشار',
  divorce: 'الزواج والطلاق',
  children: 'يسوع يبارك الأولاد',
  'rich-young-man': 'الشاب الغني',
  'vineyard-workers': 'الفعلة في الكرم',
  'third-prediction': 'الإنباء الثالث بالآلام',
  'james-john-request': 'طلب يعقوب ويوحنا',
  bartimaeus: 'شفاء بارتيماوس الأعمى',
  zacchaeus: 'زكا',
  talents: 'الوزنات؛ الأمناء',
  lazarus: 'إقامة لعازر',
  plot: 'المؤامرة لقتل يسوع',
  'bethany-anointing': 'سكب الطيب في بيت عنيا',
  'triumphal-entry': 'الدخول إلى أورشليم',
  'weeping-jerusalem': 'يسوع يبكي على أورشليم',
  'greeks-seek': 'يونانيون يطلبون يسوع؛ قد أتت الساعة',
  unbelief: 'عدم الإيمان ونداء أخير',
  'fig-tree': 'لعن شجرة التين',
  'authority-questioned': 'السؤال عن سلطان يسوع',
  'two-sons': 'الابنان',
  'wicked-tenants': 'الكرّامون الأشرار',
  caesar: 'الجزية لقيصر',
  'resurrection-question': 'الصدوقيون والقيامة',
  'davids-son': 'ابن من هو المسيح؟',
  'woes-scribes': 'الويل للكتبة والفريسيين',
  'widows-offering': 'فلسا الأرملة',
  'signs-of-end': 'خراب الهيكل؛ علامات النهاية',
  desolation: 'رجسة الخراب؛ الضيق العظيم',
  'son-of-man-coming': 'مجيء ابن الإنسان',
  'lesson-fig-tree': 'مثل شجرة التين',
  'stay-awake': 'اسهروا',
  'ten-virgins': 'العشر العذارى',
  'sheep-goats': 'الخراف والجداء',
  'judas-agrees': 'يهوذا يتفق على تسليم يسوع',
  'passover-preparation': 'إعداد الفصح',
  footwashing: 'يسوع يغسل أرجل التلاميذ',
  'betrayer-foretold': 'الإنباء بالمسلِّم',
  'lords-supper': 'عشاء الرب',
  'dispute-greatness': 'الجدال حول الأعظم على المائدة',
  'new-commandment': 'وصية جديدة',
  'denial-foretold': 'الإنباء بإنكار بطرس',
  'two-swords': 'الكيس والمزود والسيف',
  'way-truth-life': 'الطريق والحق والحياة؛ المعزّي الموعود',
  'true-vine': 'الكرمة الحقيقية',
  'worlds-hatred': 'بغضة العالم',
  'spirit-joy': 'عمل الروح؛ الحزن يتحول إلى فرح',
  'jesus-prays': 'صلاة يسوع لأجل تلاميذه',
  gethsemane: 'جثسيماني',
  arrest: 'القبض على يسوع',
  'before-high-priest': 'يسوع أمام رئيس الكهنة',
  'peters-denials': 'إنكار بطرس',
  'judas-death': 'موت يهوذا',
  'before-pilate': 'يسوع أمام بيلاطس',
  'before-herod': 'يسوع أمام هيرودس',
  sentenced: 'إطلاق باراباس؛ الحكم على يسوع',
  'soldiers-mock': 'العسكر يستهزئون بيسوع',
  crucifixion: 'الصلب',
  death: 'موت يسوع',
  burial: 'دفن يسوع',
  guard: 'الحراس عند القبر',
  'empty-tomb': 'القبر الفارغ',
  'mary-magdalene': 'يسوع يظهر لمريم المجدلية',
  'guards-report': 'تقرير الحراس',
  emmaus: 'الطريق إلى عمواس',
  'appears-disciples': 'يسوع يظهر للتلاميذ',
  thomas: 'يسوع وتوما',
  'purpose-of-john': 'لكي تؤمنوا',
  'great-commission': 'الإرسالية العظمى',
  ascension: 'الصعود',
  'by-the-sea': 'الفطور على بحر طبرية',
  'peter-restored': 'ردّ بطرس؛ التلميذ الذي كان يسوع يحبه',
};

// Every «…» below is copied verbatim, vowel marks and alef wasla (ٱ) included, from
// the Van Dyck text in src/data/text/ar.json; the tests check each one against it.
// Retyping a quote with a plain alef (ا) instead of ٱ would fail that check.
const notes: Record<string, string> = {
  genealogy:
    'يفتتح متى إنجيله بسلسلة النسب ويتتبّعها من إبراهيم فصاعدًا؛ أما لوقا فيضعها بعد المعمودية ويرجع بها إلى آدم.',
  'baptist-imprisoned': `يختم لوقا قصة يوحنا قبل معمودية يسوع. أما متى ومرقس فيرويان خبر القبض عليه لاحقًا، رجوعًا إلى ما مضى (${n.matthew} 14:3-5؛ ${n.mark} 6:17-20).`,
  baptism:
    'لا يروي إنجيل يوحنا المعمودية نفسها، بل يقدّم شهادة يوحنا المعمدان أنه رأى الروح نازلًا ومستقرًا على يسوع.',
  'temple-cleansing': `يضع يوحنا هذا الحدث في أول فصح من خدمة يسوع (${n.john} 2:13). أما متى ومرقس ولوقا فيضعونه في الأسبوع الأخير، بعد الدخول إلى أورشليم مباشرةً.`,
  'officials-son': `كثيرًا ما يُقارَن بشفاء غلام قائد المئة (${n.matthew} 8:5-13؛ ${n.luke} 7:1-10): شفاء عن بُعد، في كفرناحوم، لرجل ذي سلطان.`,
  'nazareth-rejection':
    'ينقل لوقا هذا المشهد إلى بداية خدمة يسوع العلنية، حيث ترسم قراءته من إشعياء 61 ملامح كل ما يتبعها. أما متى ومرقس فيضعانه بعد أن قطعت خدمته في الجليل شوطًا بعيدًا.',
  'calling-fishermen': `تتضمن رواية لوقا صيد السمك الكثير، وتأتي بعد أن شفى يسوع حماة سمعان (${n.luke} 4:38-39). ويصف ${n.john} 1:35-51 لقاءً سابقًا.`,
  beatitudes: `يجعل متى العظة على جبل، ولوقا «فِي مَوْضِعٍ سَهْلٍ» (${n.luke} 6:17). ويقرن لوقا أربع تطويبات بأربع ويلات.`,
  'lords-prayer':
    'يضع متى الصلاة في الموعظة على الجبل؛ أما لوقا فيجعل يسوع يعلّمها في الطريق، حين يسأله واحد من تلاميذه: «يَارَبُّ، عَلِّمْنَا أَنْ نُصَلِّيَ».',
  'sinful-woman': `دهنٌ بالطيب غير الذي كان في بيت عنيا في الأسبوع الأخير (${n.matthew} 26:6-13؛ ${n.mark} 14:3-9؛ ${n.john} 12:1-8)، وقد جرى في الجليل في بيت فريسي.`,
  'feeding-5000': 'ما عدا القيامة، هذه هي المعجزة الوحيدة التي تُروى في الأناجيل الأربعة كلها.',
  'words-eternal-life': `اعتراف بطرس في إنجيل يوحنا. قارن الاعتراف في قيصرية فيلبس (${n.matthew} 16:13-20؛ ${n.mark} 8:27-30؛ ${n.luke} 9:18-21).`,
  'adulterous-woman': `لا يوجد ${n.john} 7:53-8:11 في أقدم المخطوطات اليونانية لإنجيل يوحنا، وكثير من الترجمات تطبعه بين قوسين.`,
  'great-commandment':
    'يضع لوقا هذا الحوار في أثناء الرحلة، حيث يقود إلى مثل السامري الصالح. أما عند متى ومرقس فهو من آخر المجادلات في الهيكل.',
  'woes-at-dinner': `كثير من هذا يقابل توبيخ الكتبة والفريسيين في ${n.matthew} 23، الذي يضعه متى في الهيكل في الأسبوع الأخير.`,
  'watchful-servants': `قارن ${n.matthew} 24:42-44 و${n.mark} 13:33-37.`,
  'lament-jerusalem':
    'يضع لوقا الرثاء في أثناء الرحلة، قبل أن يبلغ يسوع المدينة؛ ويضعه متى في الهيكل في الأسبوع الأخير.',
  'day-son-of-man': `قارن ${n.matthew} 24:23-28، 37-41.`,
  'james-john-request': `يروي لوقا جدالًا مشابهًا حول العظمة في العشاء الأخير (${n.luke} 22:24-30).`,
  plot: 'يربط يوحنا قرار المجمع مباشرةً بإقامة لعازر.',
  'bethany-anointing': `يضع يوحنا هذا الحدث قبل الفصح بستة أيام، قبل الدخول إلى أورشليم؛ ويضعه متى ومرقس قبل الفصح بيومين، بعد الدخول. ويروي ${n.luke} 7:36-50 دهنًا آخر بالطيب.`,
  'fig-tree': 'يجعل مرقس قصة التينة تحيط بتطهير الهيكل؛ أما متى فيرويها دفعةً واحدة، في الصباح التالي.',
  footwashing: `عند متى ومرقس ولوقا كان العشاء الأخير عشاء الفصح (${n.mark} 14:12). أما يوحنا فيجعله «قَبْلَ عِيدِ ٱلْفِصْحِ» (${n.john} 13:1)، والصلب في يوم الاستعداد (${n.john} 19:14).`,
  'betrayer-foretold': 'يضع لوقا الإنباء بالمسلِّم بعد الخبز والكأس؛ ويضعه متى ومرقس قبلهما.',
  'lords-supper': `ليس عند يوحنا رواية عن الخبز والكأس في العشاء؛ بل يروي مكانهما غسل الأرجل (${n.john} 13:1-20).`,
  'before-high-priest': 'ينفرد يوحنا بوصف المثول أمام حنّان، حما قيافا رئيس الكهنة.',
  'judas-death': 'قارن أعمال الرسل 1:18-19.',
  sentenced: `يذكر يوحنا الساعة: «ٱسْتِعْدَادُ ٱلْفِصْحِ، وَنَحْوَ ٱلسَّاعَةِ ٱلسَّادِسَةِ» (${n.john} 19:14). ويقول مرقس إن يسوع صُلب في الساعة الثالثة (${n.mark} 15:25).`,
  'mary-magdalene': LONGER_ENDING,
  emmaus: LONGER_ENDING,
  'appears-disciples': LONGER_ENDING,
  ascension: LONGER_ENDING,
};

const ar: Dict = {
  siteName: 'الأناجيل المتوازية',
  tagline: 'الأناجيل الأربعة جنبًا إلى جنب',
  nav: { sections: 'الأقسام', order: 'الترتيب', book: 'الكتاب', about: 'عن الموقع' },
  language: 'اللغة',
  lookup: { label: 'ابحث عن مقطع', placeholder: `ابحث عن مقطع، مثل ${n.luke} 15:11-32`, go: 'اذهب' },
  loading: 'جارٍ تحميل الأناجيل…',
  loadFailed: (message) => (
    <>
      <strong>تعذّر تحميل نص الأناجيل.</strong> {message}. حاول إعادة تحميل الصفحة.
    </>
  ),
  footer: (link, licence) => <>نص الكتاب المقدس من {link} ({licence}).</>,
  publicDomain: 'ملك عام',

  home: {
    intro:
      'اختر قسمًا لتقرأ كل روايات الحدث في أعمدة متوازية، أو اكتب أي مقطع في المربع أعلاه لتجد ما يوازيه. يبيّن كل عمود أين يضع ذلك الإنجيل القصة، مع الأقسام التي قبلها وبعدها.',
    filterGroup: 'تصفية الأقسام',
    filterLabel: 'تصفية الأقسام حسب العنوان',
    filterPlaceholder: 'صفِّ حسب العنوان، مثل شفاء',
    order: 'الترتيب',
    harmony: 'التوافق (كل الأقسام)',
    asTold: (g) => `حسب ترتيب إنجيل ${g}`,
    onlyShared: 'في أكثر من إنجيل واحد',
    // Worded as "sections: n of total" so the noun never has to agree with the number,
    // which in Arabic changes form across 1, 2, 3-10, 11-99 and 100+.
    count: (k, total) => `الأقسام: ${k} من ${total}`,
    noMatch: (f) => `لا يطابق أيُّ عنوان «${f}». جرّب مربع البحث عن المقاطع أعلاه.`,
  },

  reader: {
    notFound: (id) => `لا يوجد قسم اسمه «${id}».`,
    seeAll: 'عرض كل الأقسام',
    shade: 'تظليل الكلمات المشتركة',
    numbers: 'أرقام الآيات',
    copyAll: 'نسخ الكل',
    copy: 'نسخ',
    copied: 'تم النسخ',
    copyFailed: 'تعذّر النسخ',
    print: 'طباعة',
    shadeIntro: 'الكلمات الواردة في أكثر من رواية مظلّلة:',
    in2: 'في اثنتين',
    in3: 'في ثلاث',
    in4: 'في الأربع كلها',
    shadeCaveat:
      'تقارن هذه الأداة كلمات عربية في ترجمة واحدة، لا النص اليوناني، فهي إشارة للعين وليست تحليلًا.',
    jumpLabel: 'انتقل إلى إنجيل',
    notIn: (names) => `لا يرد في ${names}.`,
    omitted: (t) => `هذه الآية غير واردة في نص ${t}.`,
    sectionOf: (i, total, g) => `القسم ${i} من ${total} في إنجيل ${g}`,
    beginning: (g) => `بداية إنجيل ${g}`,
    end: (g) => `نهاية إنجيل ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> في هذا القسم. الآيات التي طلبتها {mark('مظلّلة هكذا')}.
      </>
    ),
    spans: (k, g) => `يمتد هذا المقطع على أقسام عددها ${k} من إنجيل ${g}. اختر واحدًا منها لتقرأه مع ما يوازيه.`,
    notFound: (q) => `تعذّر العثور على «${q}».`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `اكتب مقطعًا مثل «${names.mark} 4:35-41».`;
        case 'not-gospel':
          return `«${p.word}» ليس من الأناجيل الأربعة. جرّب ${names.matthew} أو ${names.mark} أو ${names.luke} أو ${names.john}.`;
        case 'no-chapter-given':
          return `أضف رقم الأصحاح، مثل «${names[p.gospel]} 1».`;
        case 'no-chapter':
          return p.gospel
            ? `ليس في إنجيل ${names[p.gospel]} أصحاح ${p.chapter}.`
            : `الأصحاح ${p.chapter} غير موجود.`;
        case 'verse-count':
          return `عدد آيات ${names[p.gospel]} ${p.chapter} هو ${p.verses}، لا ${p.verse}.`;
        case 'backwards':
          return `المقطع ${formatRange(p.range)} مكتوب بترتيب معكوس.`;
        case 'unreadable':
          return `تعذّرت قراءة «${p.text}».`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `الترتيب: ${a} و${b}`,
    title: 'أين يضع كل إنجيل القصة',
    intro:
      'يسرد كل عمود أقسام إنجيل واحد من بدايته إلى نهايته، بالترتيب الذي يرويها به ذلك الإنجيل. ويصل خطٌّ بين القسم ونظيره في الإنجيل الآخر. وحيث تتقاطع الخطوط، يروي الإنجيلان تلك الأحداث بترتيب مختلف.',
    // The two columns stay laid out left to right in Arabic too, so these are literal.
    left: 'يسار',
    right: 'يمين',
    summary: (a, na, b, nb, both) => `عدد أقسام ${a}: ${na}، وعدد أقسام ${b}: ${nb}؛ المشترك بينهما: ${both}.`,
    same: 'يروي الإنجيلان كل الأقسام المشتركة بينهما بالترتيب نفسه.',
    one: 'قسم واحد يفسّر الاختلاف في الترتيب. ضعه جانبًا، تجد أن الإنجيلين يرويان كل ما يشتركان فيه بالتسلسل نفسه:',
    many: (k) =>
      `هذه الأقسام (${k}) تفسّر الاختلافات في الترتيب. ضعها جانبًا، تجد أن الإنجيلين يرويان كل ما يشتركان فيه بالتسلسل نفسه:`,
    position: (pa, na, a, pb, nb, b) => `— القسم ${pa} من ${na} في ${a}، و${pb} من ${nb} في ${b}`,
    tie: 'حين يتساوى تفسيران في البساطة (هل قدّم أحد الإنجيلين قصةً، أم أخّر الآخر القصة المجاورة لها؟) لا يُذكر إلا أحدهما، فاقرأ القائمة على أنها «أين يختلف الترتيب»، لا «ماذا نقل الكاتب».',
    legend: {
      label: 'المفتاح',
      same: 'القسم نفسه في الإنجيلين',
      notable: 'قسم من القائمة أعلاه، رُوي في موضع مختلف',
      focus: 'القسم الذي تشير إليه',
      sample: 'عنوان',
      both: 'موجود أيضًا في الإنجيل الآخر (الشريط بلون عموده)',
      only: 'في هذا الإنجيل فقط، ولذلك بلا خط',
    },
    lane: (g) => `${g} بالترتيب`,
  },

  // Latin names are wrapped in <bdi> (and the book titles given dir="ltr") so that
  // their own punctuation, like the "?" of "Who Is Jesus?", stays with them inside
  // right-to-left text instead of jumping to the other end of the name.
  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>عن هذا الموقع</h1>
      <p>
        يُقدَّم هذا الموقع لمباركة الله القدير، الذي يضع الموقعُ كلمتَه أمام القارئ، والذي تكرز هذه الأناجيل الأربعة
        بابنه.
      </p>
      <p>
        وقد صُنع من أجل <bdi>Darrell W. Johnson</bdi>، الذي يكرز بيسوع المسيح وبإنجيله منذ أكثر من خمسين سنة: راعيًا
        في كاليفورنيا، وفي <bdi>Union Church of Manila</bdi>، وفي <bdi>First Baptist Church</bdi> في فانكوفر، ومعلّمًا
        للوعّاظ في <bdi>Fuller Theological Seminary</bdi> و<bdi>Regent College</bdi> و
        <bdi>Carey Theological College</bdi>. وهو يخدم اليوم في <bdi>The Way Church</bdi> ومع{' '}
        <bdi>The Pastorate Ministries Canada</bdi>. وهو مؤلف كتب <cite dir="ltr">The Glory of Preaching</cite>،{' '}
        <cite dir="ltr">Who Is Jesus?</cite>، <cite dir="ltr">Jesus the Healer</cite>،{' '}
        <cite dir="ltr">The Beatitudes</cite> وكتب أخرى.
      </p>
      <p>
        يبدأ وعظه من حيث تبدأ هذه الأداة: بالمكوث مع النص، وتركه يقول ما يقوله. وقد نشأ الموقع من مشروع بدأه{' '}
        <bdi>Darrell</bdi> وعائلته معًا، يقارن ترتيب الأحداث في متى ومرقس ولوقا بترتيبها في يوحنا.
      </p>
      <p>
        {/* ← points forward in right-to-left text, as the site's own prev/next links do. */}
        <a href="https://www.darrelljohnson.ca/">عظات <bdi>Darrell</bdi> وكتبه وتعليمه ←</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>كيف تستخدمه</h2>
        <ul>
          <li>
            <strong>اقرأ قسمًا.</strong> اختر أي قسم من <a href={href.home()}>القائمة</a> لترى رواية كل إنجيل له
            جنبًا إلى جنب. وتحت كل عمود الأقسام التي تأتي قبله وبعده مباشرةً في ذلك الإنجيل، لتقرأ القصة في سياقها.
          </li>
          <li>
            <strong>ابحث عن مقطع.</strong> اكتب شاهدًا مثل{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> أو{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. تفتح الأداة القسم الذي يحتويه، مع
            تمييز الآيات التي طلبتها.
          </li>
          <li>
            <strong>قارن الترتيب.</strong> تضع صفحة <a href={href.order('mark', 'john')}>الترتيب</a> إنجيلين
            متقابلين وتصل بين الأقسام المشتركة بينهما، فترى أين يضع أحد الإنجيلين حدثًا في موضع يختلف عن الآخر.
          </li>
          <li>
            <strong>تظليل الكلمات المشتركة</strong> يظلّل الكلمات التي ترد في أكثر من رواية. وهو يقارن كلمات عربية في
            ترجمة واحدة، لا النص اليوناني، فهو إشارة للعين وليس تحليلًا.
          </li>
          <li>
            <strong>اطبعه كتابًا.</strong> في صفحة <a href={href.book()}>الكتاب</a> كل الأقسام في مجلد واحد، للطباعة
            أو للتنزيل بصيغة PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>الألوان والعلامات</h2>
        <ul className="color-key">
          <li>
            لكل إنجيل لونه الخاص في كل أنحاء الموقع:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>،{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>،{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> و
            <span className="col-john"><span className="swatch" />{names.john}</span>. ويُميَّز به أعلى كل عمود،
            واسم الإنجيل، وشواهده في قائمة الأقسام.
          </li>
          <li>
            <span className="verse target">التظليل الرمادي المائل إلى الزرقة</span> يميّز الآيات التي بحثت عنها.
          </li>
          <li>
            عند تشغيل <strong>تظليل الكلمات المشتركة</strong>، يميّز التظليل الذهبي الكلمات الواردة في أكثر من رواية:{' '}
            <mark className="hl2">في اثنتين</mark>، <mark className="hl3">في ثلاث</mark>،{' '}
            <mark className="hl4">في الأربع كلها</mark>.
          </li>
          <li>
            في صفحة الترتيب، يصل خط رمادي بين القسم ونظيره في الإنجيل الآخر؛ ويميّز خط{' '}
            <strong className="purple">بنفسجي</strong> قسمًا رُوي في موضع مختلف؛ والخط الداكن هو الذي تشير إليه.
            والعنوان الرمادي بلا خط لا يرد إلا في ذلك الإنجيل.
          </li>
        </ul>
      </section>

      <section>
        <h2>لماذا يختلف الترتيب</h2>
        <p>
          يشترك {names.matthew} و{names.mark} و{names.luke} (الأناجيل الإزائية) في كثير من ترتيبها: خدمة في الجليل،
          ثم رحلة واحدة إلى أورشليم للأسبوع الأخير. أما {names.john} فينتقل بين الجليل وأورشليم عدة مرات، ويذكر ثلاثة
          أعياد فصح ({names.john} 2:13؛ 6:4؛ 11:55). وأشهر الاختلافات تطهير الهيكل، الذي يضعه {names.john} في بداية
          الخدمة والآخرون في الأسبوع الأخير، وتوقيت العشاء الأخير والصلب بالنسبة إلى الفصح.
        </p>
        <p>
          رتّب كتبة الأناجيل موادهم ليعلنوا من هو يسوع، لا ليدوّنوا يوميات فحسب، ولذلك فإن الاختلاف في الترتيب دعوة لنسأل
          ماذا يُرينا كل كاتب بوضعه القصة حيث وضعها.
        </p>
      </section>

      <section>
        <h2>عن النص والأقسام</h2>
        <p>
          نص الكتاب المقدس من {translation} ({licence})، منقول دون تغيير من <a href="https://ebible.org/">eBible.org</a>
          . {attribution} ويتضمن بعض الآيات الغائبة عن أقدم المخطوطات، مثل {names.mark} 16:9-20 و{names.john}{' '}
          7:53-8:11؛ والأقسام المعنية تنبّه إلى ذلك.
        </p>
        <p>
          تقسيم النص إلى أقسام واختيار المقاطع التي تُعَدّ متوازية اجتهادات تحريرية، تتبع عمومًا كتب التوافق التقليدية
          بين الأناجيل. كل آية من الأناجيل الأربعة تنتمي إلى قسم واحد فقط، فأي مقطع تبحث عنه سيوجد. وحيث يورد{' '}
          {names.matthew} أو {names.luke} قولًا في موضعين، يُربط أحدهما فقط، وتشير ملاحظات الأقسام إلى الآخر.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'الكتاب',
    heading: 'الموقع كله في كتاب',
    intro:
      'كل الأقسام، بترتيب التوافق، في مجلد واحد للطباعة أو الاقتناء: مع الإهداء، وجدول المحتويات، وفهرس للمقاطع في آخره ليمكن العثور على أي آية.',
    download: (pages, mb) => `تنزيل ملف PDF (عدد الصفحات ${pages}، ${mb} ميغابايت)`,
    paper: (size) => `ملف PDF بمقاس ${size}. أما الطباعة من المتصفح فتستخدم مقاس الورق لديك.`,
    print: 'اطبع من المتصفح',
    notBuilt: 'يُنشأ ملف PDF عند نشر الموقع، ولذلك لا يوجد في هذه النسخة من الموقع.',
    scripture: (t) => `نص الكتاب المقدس: ${t}`,
    howToHeading: 'كيف تقرأ هذا الكتاب',
    HowTo: ({ names }) => (
      <>
        <p>
          يضع كل قسم روايات الأناجيل عن حدث أو تعليم واحد جنبًا إلى جنب، عمودًا لكل إنجيل. والأقسام مرقّمة (§) بترتيب
          التوافق: أي بترتيب الأحداث تقريبًا، كما ترتّبها كتب التوافق التقليدية بين الأناجيل. وحيث لا يروي إنجيلٌ قصةً
          ما، يذكر القسم ذلك.
        </p>
        <p>
          يميّز شريط ملوّن في أعلى كل عمود إنجيلَه:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>،{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>،{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>،{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          للعثور على مقطع، ابحث عن الأصحاح والآية في الفهرس في آخر الكتاب، فهو يعطي رقم القسم. والأقسام نفسها موجودة
          في gospels.yhwh.rest، حيث يمكنك أيضًا مقارنة الترتيب الذي يروي به إنجيلان قصتهما.
        </p>
      </>
    ),
    contents: 'المحتويات',
    indexHeading: 'فهرس المقاطع',
    indexIntro:
      'كل آية من الأناجيل الأربعة تنتمي إلى قسم واحد فقط. ابحث عن الأصحاح والآية تحت اسم إنجيلها، ثم انتقل إلى رقم القسم.',
    creditsHeading: 'عن هذا الكتاب',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          نص الكتاب المقدس من {translation} ({licence})، منقول دون تغيير من eBible.org. {attribution}
        </p>
        <p>تقسيم النص إلى أقسام واختيار المتوازيات اجتهادات تحريرية، تتبع عمومًا كتب التوافق التقليدية بين الأناجيل.</p>
        <p>أُعدّ من موقع gospels.yhwh.rest بتاريخ {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles,
  notes,

  // Without vowel marks: the matcher strips them before comparing. Hamza seats fold
  // too (أ إ to ا, ئ to ي). The text spells the article with alef wasla (ٱل), which is
  // a letter, not a mark, so both spellings are listed. Prefixed forms (و، ف، ل، ب)
  // are separate words to the matcher, so the common ones are listed as well.
  stopWords: `و في من إلى على عن مع أن إن أنه إنه لأن لأنه لأني لأنهم لأنكم ثم أو أم بل لا لم لن ما ماذا لماذا
  هل كيف أين حيث حين حتى قد كل جميع هذا هذه ذلك تلك هؤلاء هو هي هم هما أنا أنت أنتم نحن له لها لهم لهما
  لكم لنا لي لك به بها بهم فيه فيها منه منهم منكم عليه عليها عليهم إليه إليها إليهم معه معهم عنه عند
  الذي ٱلذي الذين ٱلذين التي ٱلتي الآن ٱلآن أيضا أيضًا كان كانت كانوا يكون يكن قال قالوا قائلا قائلين
  يقول وقال فقال وقالوا فقالوا أجاب فأجاب وكان وكانت ولا ولم ولكن لكن وأما أما وهو وهم وأنا ومن وفي وإذا
  إذا إذ وإذ فلما ولما لما فإن وإن فلا فلم إلا كما هكذا هناك ههنا هنا بعد قبل يا أيها هوذا لكي حينئذ
  إني أني ليس أقول`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default ar;
