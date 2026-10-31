/**
 * Periods and days for the timeline, keyed to sections by id.
 *
 * Periods follow the headings of the harmony in sections.ts: each starts at the
 * section named and runs until the next one starts.
 *
 * Days are marked only where the Gospels themselves give a marker, read the
 * traditional way, mostly from Mark: the entry "already evening" (Mark 11:11), "the
 * next day" (11:12), "in the morning" (11:20), "two days before" the Passover
 * (14:1), "the first day of unleavened bread" (14:12), "the next day, which was the
 * day after the Preparation" (Matthew 27:62), "the first day of the week" (Mark
 * 16:2). A section with no marker has no day, rather than inheriting its
 * neighbour's: the timeline leaves it unlabelled instead of claiming a day the text
 * does not give. John sets the supper "before the feast of the Passover" (John
 * 13:1); the timeline's own note says so.
 */
export const PERIODS = [
  { key: 'beginnings', first: 'prologue-word' },
  { key: 'preparation', first: 'baptist-preaching' },
  { key: 'early', first: 'first-disciples-john' },
  { key: 'galilee', first: 'galilee-begins' },
  { key: 'journey', first: 'peters-confession' },
  { key: 'week', first: 'triumphal-entry' },
  { key: 'passion', first: 'gethsemane' },
  { key: 'resurrection', first: 'empty-tomb' },
] as const;

export type PeriodKey = (typeof PERIODS)[number]['key'];

export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'thursdayNight', 'friday', 'saturday', 'easter', 'later'] as const;
export type Day = (typeof DAYS)[number];

export const DAY_OF: Record<string, Day> = {
  'triumphal-entry': 'sunday',
  'weeping-jerusalem': 'sunday',
  'fig-tree': 'monday',
  // Mark 11:20 "in the morning": the debates in the temple follow on the same day.
  'authority-questioned': 'tuesday',
  'two-sons': 'tuesday',
  'wicked-tenants': 'tuesday',
  caesar: 'tuesday',
  'resurrection-question': 'tuesday',
  'davids-son': 'tuesday',
  'woes-scribes': 'tuesday',
  'widows-offering': 'tuesday',
  'signs-of-end': 'tuesday',
  desolation: 'tuesday',
  'son-of-man-coming': 'tuesday',
  'lesson-fig-tree': 'tuesday',
  'stay-awake': 'tuesday',
  'ten-virgins': 'tuesday',
  'sheep-goats': 'tuesday',
  'judas-agrees': 'wednesday',
  'passover-preparation': 'thursday',
  footwashing: 'thursday',
  'betrayer-foretold': 'thursday',
  'lords-supper': 'thursday',
  'dispute-greatness': 'thursday',
  'new-commandment': 'thursday',
  'denial-foretold': 'thursday',
  'two-swords': 'thursday',
  'way-truth-life': 'thursday',
  'true-vine': 'thursday',
  'worlds-hatred': 'thursday',
  'spirit-joy': 'thursday',
  'jesus-prays': 'thursday',
  gethsemane: 'thursdayNight',
  arrest: 'thursdayNight',
  'before-high-priest': 'thursdayNight',
  'peters-denials': 'thursdayNight',
  'judas-death': 'friday',
  'before-pilate': 'friday',
  'before-herod': 'friday',
  sentenced: 'friday',
  'soldiers-mock': 'friday',
  crucifixion: 'friday',
  death: 'friday',
  burial: 'friday',
  guard: 'saturday',
  'empty-tomb': 'easter',
  'mary-magdalene': 'easter',
  'guards-report': 'easter',
  emmaus: 'easter',
  'appears-disciples': 'easter',
  thomas: 'later',
  'purpose-of-john': 'later',
  'great-commission': 'later',
  ascension: 'later',
  'by-the-sea': 'later',
  'peter-restored': 'later',
};
