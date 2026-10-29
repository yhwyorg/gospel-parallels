import type { Gospel } from '../lib/refs';

/**
 * The Gospels divided into sections, with each section's parallels.
 *
 * Array order is a harmony order, used only for the "all sections" list. Each
 * gospel's own sequence is NOT stored here: it is derived from where its verses
 * fall in the text. The 2025 version hand-numbered the order and numbered
 * several events twice (19-22 were each used for two different events), which
 * silently scrambled the timeline. Deriving order from the references removes
 * that whole class of mistake.
 *
 * Every verse of every gospel belongs to exactly one section; sections.test.ts
 * fails on any gap or overlap, so a passage typed into the lookup always lands
 * somewhere and shows its parallels.
 *
 * A verse can sit in only one section per gospel, so a saying that Matthew and
 * Luke both use twice is linked from one place and the other is left to a note.
 */
export interface Section {
  id: string;
  title: string;
  refs: Partial<Record<Gospel, string>>;
  note?: string;
}

const LONGER_ENDING =
  'The two earliest complete Greek manuscripts of Mark end at 16:8. Mark 16:9-20 is printed in the World English Bible but is widely regarded as a later addition.';

export const sections: Section[] = [
  // Beginnings
  { id: 'prologue-word', title: 'The Word became flesh', refs: { john: '1:1-18' } },
  { id: 'luke-preface', title: "Luke's preface to Theophilus", refs: { luke: '1:1-4' } },
  { id: 'john-birth-foretold', title: 'Birth of John the Baptist foretold', refs: { luke: '1:5-25' } },
  { id: 'annunciation', title: 'The angel Gabriel comes to Mary', refs: { luke: '1:26-38' } },
  { id: 'magnificat', title: 'Mary visits Elizabeth; the Magnificat', refs: { luke: '1:39-56' } },
  { id: 'john-birth', title: 'Birth of John the Baptist; the Benedictus', refs: { luke: '1:57-80' } },
  {
    id: 'genealogy',
    title: 'The genealogy of Jesus',
    refs: { matthew: '1:1-17', luke: '3:23-38' },
    note: 'Matthew opens his Gospel with the genealogy and traces it forward from Abraham; Luke places it after the baptism and traces it back to Adam.',
  },
  { id: 'birth', title: 'The birth of Jesus', refs: { matthew: '1:18-25', luke: '2:1-7' } },
  { id: 'shepherds', title: 'The shepherds', refs: { luke: '2:8-20' } },
  { id: 'presentation', title: 'Presentation in the temple; Simeon and Anna', refs: { luke: '2:21-40' } },
  { id: 'magi', title: 'Visit of the Magi', refs: { matthew: '2:1-12' } },
  { id: 'flight-egypt', title: 'Flight to Egypt; the children of Bethlehem', refs: { matthew: '2:13-18' } },
  { id: 'return-nazareth', title: 'Return to Nazareth', refs: { matthew: '2:19-23' } },
  { id: 'boy-in-temple', title: 'The boy Jesus in the temple', refs: { luke: '2:41-52' } },

  // Preparation
  {
    id: 'baptist-preaching',
    title: 'The preaching of John the Baptist',
    refs: { matthew: '3:1-12', mark: '1:1-8', luke: '3:1-18', john: '1:19-28' },
  },
  {
    id: 'baptist-imprisoned',
    title: 'John the Baptist imprisoned',
    refs: { luke: '3:19-20' },
    note: "Luke closes John's story before Jesus' baptism. Matthew and Mark tell of the arrest later, as a flashback (Matthew 14:3-5; Mark 6:17-20).",
  },
  {
    id: 'baptism',
    title: 'The baptism of Jesus',
    refs: { matthew: '3:13-17', mark: '1:9-11', luke: '3:21-22', john: '1:29-34' },
    note: "John's Gospel does not narrate the baptism itself; it gives John the Baptist's testimony that he saw the Spirit descend and remain on Jesus.",
  },
  { id: 'temptation', title: 'The temptation in the wilderness', refs: { matthew: '4:1-11', mark: '1:12-13', luke: '4:1-13' } },

  // Early ministry in John
  { id: 'first-disciples-john', title: 'The first disciples (John)', refs: { john: '1:35-51' } },
  { id: 'cana', title: 'Water into wine at Cana', refs: { john: '2:1-12' } },
  {
    id: 'temple-cleansing',
    title: 'The cleansing of the temple',
    refs: { matthew: '21:12-17', mark: '11:15-19', luke: '19:45-48', john: '2:13-22' },
    note: "John places this at the first Passover of Jesus' ministry (John 2:13). Matthew, Mark and Luke place it in the final week, just after the entry into Jerusalem.",
  },
  { id: 'nicodemus', title: 'Jesus and Nicodemus', refs: { john: '2:23-3:21' } },
  { id: 'baptist-final-testimony', title: "John the Baptist's final testimony", refs: { john: '3:22-36' } },
  { id: 'samaritan-woman', title: 'The woman of Samaria', refs: { john: '4:1-42' } },

  // Galilee
  {
    id: 'galilee-begins',
    title: 'Jesus returns to Galilee',
    refs: { matthew: '4:12-17', mark: '1:14-15', luke: '4:14-15', john: '4:43-45' },
  },
  {
    id: 'officials-son',
    title: "Healing of the official's son",
    refs: { john: '4:46-54' },
    note: "Often compared with the healing of the centurion's servant (Matthew 8:5-13; Luke 7:1-10): a healing at a distance, at Capernaum, for a man in authority.",
  },
  {
    id: 'nazareth-rejection',
    title: 'Rejection at Nazareth',
    refs: { matthew: '13:53-58', mark: '6:1-6', luke: '4:16-30' },
    note: "Luke moves this scene to the opening of Jesus' public ministry, where his reading of Isaiah 61 sets out the shape of all that follows. Matthew and Mark place it well into the Galilean ministry.",
  },
  {
    id: 'calling-fishermen',
    title: 'Calling of the first disciples',
    refs: { matthew: '4:18-22', mark: '1:16-20', luke: '5:1-11' },
    note: "Luke's account includes the great catch of fish and comes after Jesus has already healed Simon's mother-in-law (Luke 4:38-39). John 1:35-51 describes an earlier meeting.",
  },
  { id: 'capernaum-synagogue', title: 'Teaching in the synagogue at Capernaum', refs: { mark: '1:21-28', luke: '4:31-37' } },
  {
    id: 'peters-mother-in-law',
    title: "Healing of Peter's mother-in-law; healings at evening",
    refs: { matthew: '8:14-17', mark: '1:29-34', luke: '4:38-41' },
  },
  { id: 'preaching-tour', title: 'A preaching tour of Galilee', refs: { matthew: '4:23-25', mark: '1:35-39', luke: '4:42-44' } },
  { id: 'leper', title: 'Cleansing of a leper', refs: { matthew: '8:1-4', mark: '1:40-45', luke: '5:12-16' } },
  { id: 'paralytic', title: 'Healing of a paralyzed man', refs: { matthew: '9:1-8', mark: '2:1-12', luke: '5:17-26' } },
  { id: 'levi', title: 'Calling of Levi (Matthew); eating with sinners', refs: { matthew: '9:9-13', mark: '2:13-17', luke: '5:27-32' } },
  { id: 'fasting-question', title: 'The question about fasting', refs: { matthew: '9:14-17', mark: '2:18-22', luke: '5:33-39' } },
  { id: 'grain-sabbath', title: 'Plucking grain on the Sabbath', refs: { matthew: '12:1-8', mark: '2:23-28', luke: '6:1-5' } },
  { id: 'withered-hand', title: 'Healing of a withered hand', refs: { matthew: '12:9-14', mark: '3:1-6', luke: '6:6-11' } },
  { id: 'crowds-by-sea', title: 'Crowds come to Jesus; the chosen servant', refs: { matthew: '12:15-21', mark: '3:7-12', luke: '6:17-19' } },
  { id: 'choosing-twelve', title: 'Choosing the Twelve', refs: { matthew: '10:1-4', mark: '3:13-19', luke: '6:12-16' } },
  { id: 'bethesda', title: 'Healing at the pool of Bethesda', refs: { john: '5:1-18' } },
  { id: 'authority-of-son', title: 'The authority of the Son; witnesses to Jesus', refs: { john: '5:19-47' } },

  // The Sermon on the Mount / Plain
  {
    id: 'beatitudes',
    title: 'The Beatitudes',
    refs: { matthew: '5:1-12', luke: '6:20-26' },
    note: 'Matthew sets the sermon on a mountain; Luke on "a level place" (Luke 6:17). Luke pairs four blessings with four woes.',
  },
  { id: 'salt-light', title: 'Salt and light', refs: { matthew: '5:13-16' } },
  { id: 'law-fulfilled', title: 'Jesus fulfills the Law', refs: { matthew: '5:17-20' } },
  { id: 'greater-righteousness', title: 'Anger, adultery, divorce and oaths', refs: { matthew: '5:21-37' } },
  { id: 'love-enemies', title: 'Retaliation and love of enemies', refs: { matthew: '5:38-48', luke: '6:27-36' } },
  { id: 'piety-in-secret', title: 'Giving, praying and fasting in secret', refs: { matthew: '6:1-8; 6:16-18' } },
  {
    id: 'lords-prayer',
    title: "The Lord's Prayer",
    refs: { matthew: '6:9-15', luke: '11:1-4' },
    note: 'Matthew places the prayer within the Sermon on the Mount; Luke has Jesus give it on the journey, when a disciple asks, "Lord, teach us to pray."',
  },
  { id: 'treasure-heaven', title: 'Treasure in heaven', refs: { matthew: '6:19-21' } },
  { id: 'lamp-of-body', title: 'The lamp of the body', refs: { matthew: '6:22-23', luke: '11:33-36' } },
  { id: 'two-masters', title: 'No one can serve two masters', refs: { matthew: '6:24', luke: '16:13' } },
  { id: 'do-not-worry', title: 'Do not be anxious', refs: { matthew: '6:25-34', luke: '12:22-34' } },
  { id: 'judging', title: 'Judging others', refs: { matthew: '7:1-6', luke: '6:37-42' } },
  { id: 'ask-seek-knock', title: 'Ask, seek, knock; the Golden Rule', refs: { matthew: '7:7-12', luke: '11:9-13' } },
  { id: 'two-foundations', title: 'Two ways, two trees, two foundations', refs: { matthew: '7:13-29', luke: '6:43-49' } },

  // Galilee, continued
  { id: 'centurion', title: "Healing of the centurion's servant", refs: { matthew: '8:5-13', luke: '7:1-10' } },
  { id: 'widow-nain', title: 'Raising of the widow\'s son at Nain', refs: { luke: '7:11-17' } },
  { id: 'baptist-question', title: "John the Baptist's question; Jesus' witness to John", refs: { matthew: '11:2-19', luke: '7:18-35' } },
  {
    id: 'sinful-woman',
    title: 'A sinful woman anoints Jesus',
    refs: { luke: '7:36-50' },
    note: 'A different anointing from the one at Bethany in the last week (Matthew 26:6-13; Mark 14:3-9; John 12:1-8), set in Galilee in the house of a Pharisee.',
  },
  { id: 'women-followers', title: 'Women who followed Jesus', refs: { luke: '8:1-3' } },
  { id: 'woes-cities', title: 'Woes on the cities of Galilee', refs: { matthew: '11:20-24', luke: '10:13-15' } },
  { id: 'thanksgiving', title: "Jesus' thanksgiving; come to me", refs: { matthew: '11:25-30', luke: '10:21-24' } },
  { id: 'beelzebul', title: 'The Beelzebul controversy', refs: { matthew: '12:22-37', mark: '3:20-30', luke: '11:14-23; 12:10' } },
  { id: 'sign-of-jonah', title: 'The sign of Jonah', refs: { matthew: '12:38-42', luke: '11:29-32' } },
  { id: 'unclean-spirit-returns', title: 'The return of the unclean spirit', refs: { matthew: '12:43-45', luke: '11:24-26' } },
  { id: 'true-blessedness', title: 'True blessedness', refs: { luke: '11:27-28' } },
  { id: 'true-family', title: "Jesus' true family", refs: { matthew: '12:46-50', mark: '3:31-35', luke: '8:19-21' } },

  // Parables of the kingdom
  { id: 'sower', title: 'The parable of the sower', refs: { matthew: '13:1-9', mark: '4:1-9', luke: '8:4-8' } },
  { id: 'why-parables', title: 'The reason for parables', refs: { matthew: '13:10-17', mark: '4:10-12', luke: '8:9-10' } },
  { id: 'sower-explained', title: 'The sower explained', refs: { matthew: '13:18-23', mark: '4:13-20', luke: '8:11-15' } },
  { id: 'lamp-measure', title: 'A lamp under a basket; the measure you use', refs: { mark: '4:21-25', luke: '8:16-18' } },
  { id: 'seed-growing', title: 'The seed growing by itself', refs: { mark: '4:26-29' } },
  { id: 'weeds', title: 'The wheat and the weeds', refs: { matthew: '13:24-30' } },
  { id: 'mustard-leaven', title: 'The mustard seed and the leaven', refs: { matthew: '13:31-33', mark: '4:30-32', luke: '13:18-21' } },
  { id: 'use-of-parables', title: "Jesus' use of parables", refs: { matthew: '13:34-35', mark: '4:33-34' } },
  { id: 'weeds-explained', title: 'The weeds explained', refs: { matthew: '13:36-43' } },
  { id: 'treasure-pearl-net', title: 'Hidden treasure, the pearl, the net', refs: { matthew: '13:44-52' } },

  // Mighty works
  { id: 'would-be-followers', title: 'Would-be followers', refs: { matthew: '8:18-22', luke: '9:57-62' } },
  { id: 'calming-storm', title: 'Calming the storm', refs: { matthew: '8:23-27', mark: '4:35-41', luke: '8:22-25' } },
  { id: 'gerasene', title: 'The Gerasene demoniac', refs: { matthew: '8:28-34', mark: '5:1-20', luke: '8:26-39' } },
  { id: 'jairus', title: "Jairus' daughter and the woman who touched his cloak", refs: { matthew: '9:18-26', mark: '5:21-43', luke: '8:40-56' } },
  { id: 'two-blind-mute', title: 'Two blind men; a man unable to speak', refs: { matthew: '9:27-34' } },
  { id: 'harvest', title: 'The harvest is plentiful', refs: { matthew: '9:35-38' } },
  { id: 'sending-twelve', title: 'Sending out the Twelve', refs: { matthew: '10:5-15', mark: '6:7-13', luke: '9:1-6' } },
  { id: 'persecution', title: 'Persecution to come', refs: { matthew: '10:16-25', luke: '12:11-12' } },
  { id: 'do-not-fear', title: 'Do not fear', refs: { matthew: '10:26-33', luke: '12:2-9' } },
  { id: 'not-peace', title: 'Not peace but a sword', refs: { matthew: '10:34-11:1', luke: '12:49-53' } },
  { id: 'herod-baptist-death', title: 'Herod and the death of John the Baptist', refs: { matthew: '14:1-12', mark: '6:14-29', luke: '9:7-9' } },
  {
    id: 'feeding-5000',
    title: 'Feeding of the five thousand',
    refs: { matthew: '14:13-21', mark: '6:30-44', luke: '9:10-17', john: '6:1-15' },
    note: 'Apart from the resurrection, the only miracle told in all four Gospels.',
  },
  { id: 'walking-water', title: 'Walking on the water', refs: { matthew: '14:22-33', mark: '6:45-52', john: '6:16-21' } },
  { id: 'gennesaret', title: 'Healings at Gennesaret', refs: { matthew: '14:34-36', mark: '6:53-56' } },
  { id: 'bread-of-life', title: 'The bread of life', refs: { john: '6:22-59' } },
  {
    id: 'words-eternal-life',
    title: 'Many turn back; "You have the words of eternal life"',
    refs: { john: '6:60-71' },
    note: "Peter's confession in John's Gospel. Compare the confession at Caesarea Philippi (Matthew 16:13-20; Mark 8:27-30; Luke 9:18-21).",
  },
  { id: 'tradition-elders', title: 'The tradition of the elders; what defiles', refs: { matthew: '15:1-20', mark: '7:1-23' } },
  { id: 'canaanite-woman', title: 'The Canaanite (Syrophoenician) woman', refs: { matthew: '15:21-28', mark: '7:24-30' } },
  { id: 'deaf-man', title: 'Healing a deaf man; many healings', refs: { matthew: '15:29-31', mark: '7:31-37' } },
  { id: 'feeding-4000', title: 'Feeding of the four thousand', refs: { matthew: '15:32-39', mark: '8:1-10' } },
  { id: 'demand-sign', title: 'The demand for a sign', refs: { matthew: '16:1-4', mark: '8:11-13' } },
  { id: 'leaven-pharisees', title: 'The leaven of the Pharisees', refs: { matthew: '16:5-12', mark: '8:14-21', luke: '12:1' } },
  { id: 'bethsaida-blind', title: 'A blind man at Bethsaida', refs: { mark: '8:22-26' } },

  // Toward Jerusalem
  { id: 'peters-confession', title: "Peter's confession", refs: { matthew: '16:13-20', mark: '8:27-30', luke: '9:18-21' } },
  {
    id: 'first-prediction',
    title: 'First passion prediction; take up your cross',
    refs: { matthew: '16:21-28', mark: '8:31-9:1', luke: '9:22-27' },
  },
  { id: 'transfiguration', title: 'The transfiguration', refs: { matthew: '17:1-13', mark: '9:2-13', luke: '9:28-36' } },
  { id: 'boy-unclean-spirit', title: 'Healing a boy with an unclean spirit', refs: { matthew: '17:14-21', mark: '9:14-29', luke: '9:37-43' } },
  { id: 'second-prediction', title: 'Second passion prediction', refs: { matthew: '17:22-23', mark: '9:30-32', luke: '9:44-45' } },
  { id: 'temple-tax', title: 'The temple tax', refs: { matthew: '17:24-27' } },
  { id: 'greatest', title: 'Who is the greatest?', refs: { matthew: '18:1-5', mark: '9:33-37', luke: '9:46-48' } },
  { id: 'strange-exorcist', title: 'Whoever is not against us', refs: { mark: '9:38-41', luke: '9:49-50' } },
  { id: 'stumbling', title: 'Causes of stumbling', refs: { matthew: '18:6-9', mark: '9:42-50', luke: '17:1-2' } },
  { id: 'lost-sheep', title: 'The lost sheep', refs: { matthew: '18:10-14', luke: '15:1-7' } },
  { id: 'forgive-brother', title: 'Correcting and forgiving a brother', refs: { matthew: '18:15-22', luke: '17:3-4' } },
  { id: 'unforgiving-servant', title: 'The unforgiving servant', refs: { matthew: '18:23-35' } },

  // John: the feasts in Jerusalem
  { id: 'tabernacles-1', title: 'At the Feast of Tabernacles', refs: { john: '7:1-24' } },
  { id: 'tabernacles-2', title: 'Is this the Christ? Rivers of living water', refs: { john: '7:25-52' } },
  {
    id: 'adulterous-woman',
    title: 'The woman caught in adultery',
    refs: { john: '7:53-8:11' },
    note: 'John 7:53-8:11 is not found in the earliest Greek manuscripts of John, and many translations print it in brackets.',
  },
  { id: 'light-of-world', title: 'The light of the world', refs: { john: '8:12-30' } },
  { id: 'before-abraham', title: 'The truth will set you free; before Abraham was', refs: { john: '8:31-59' } },
  { id: 'man-born-blind', title: 'Healing of the man born blind', refs: { john: '9:1-41' } },
  { id: 'good-shepherd', title: 'The good shepherd', refs: { john: '10:1-21' } },
  { id: 'dedication', title: 'At the Feast of Dedication', refs: { john: '10:22-42' } },

  // Luke's journey to Jerusalem
  { id: 'samaritan-village', title: 'A Samaritan village refuses Jesus', refs: { luke: '9:51-56' } },
  { id: 'sending-seventy', title: 'Sending out the seventy', refs: { luke: '10:1-12' } },
  { id: 'seventy-return', title: 'The seventy return', refs: { luke: '10:16-20' } },
  {
    id: 'great-commandment',
    title: 'The great commandment',
    refs: { matthew: '22:34-40', mark: '12:28-34', luke: '10:25-28' },
    note: 'Luke sets this exchange on the journey, where it leads into the parable of the Good Samaritan. In Matthew and Mark it is one of the final debates in the temple.',
  },
  { id: 'good-samaritan', title: 'The Good Samaritan', refs: { luke: '10:29-37' } },
  { id: 'mary-martha', title: 'Mary and Martha', refs: { luke: '10:38-42' } },
  { id: 'friend-midnight', title: 'The friend at midnight', refs: { luke: '11:5-8' } },
  {
    id: 'woes-at-dinner',
    title: 'Woes spoken at a Pharisee\'s table',
    refs: { luke: '11:37-54' },
    note: 'Much of this parallels the denunciation of the scribes and Pharisees in Matthew 23, which Matthew places in the temple in the final week.',
  },
  { id: 'rich-fool', title: 'The rich fool', refs: { luke: '12:13-21' } },
  { id: 'watchful-servants', title: 'Watchful servants', refs: { luke: '12:35-40' }, note: 'Compare Matthew 24:42-44 and Mark 13:33-37.' },
  { id: 'faithful-servant', title: 'The faithful and the unfaithful servant', refs: { matthew: '24:45-51', luke: '12:41-48' } },
  { id: 'interpreting-times', title: 'Interpreting the times; settle on the way', refs: { luke: '12:54-59' } },
  { id: 'repent-fig-tree', title: 'Repent or perish; the barren fig tree', refs: { luke: '13:1-9' } },
  { id: 'crippled-woman', title: 'Healing a crippled woman on the Sabbath', refs: { luke: '13:10-17' } },
  { id: 'narrow-door', title: 'The narrow door', refs: { luke: '13:22-30' } },
  {
    id: 'lament-jerusalem',
    title: 'Lament over Jerusalem',
    refs: { matthew: '23:37-39', luke: '13:31-35' },
    note: 'Luke places the lament on the journey, before Jesus reaches the city; Matthew places it in the temple in the final week.',
  },
  { id: 'dropsy', title: 'Healing a man with dropsy', refs: { luke: '14:1-6' } },
  { id: 'places-at-table', title: 'Places at the table; whom to invite', refs: { luke: '14:7-14' } },
  { id: 'great-banquet', title: 'The great banquet; the wedding feast', refs: { matthew: '22:1-14', luke: '14:15-24' } },
  { id: 'cost-discipleship', title: 'The cost of discipleship', refs: { luke: '14:25-35' } },
  { id: 'lost-coin', title: 'The lost coin', refs: { luke: '15:8-10' } },
  { id: 'prodigal-son', title: 'The lost son and his brother', refs: { luke: '15:11-32' } },
  { id: 'shrewd-manager', title: 'The shrewd manager', refs: { luke: '16:1-12' } },
  { id: 'law-and-divorce', title: 'The Law and the kingdom; divorce', refs: { luke: '16:14-18' } },
  { id: 'rich-man-lazarus', title: 'The rich man and Lazarus', refs: { luke: '16:19-31' } },
  { id: 'faith-duty', title: 'Faith like a mustard seed; unworthy servants', refs: { luke: '17:5-10' } },
  { id: 'ten-lepers', title: 'Ten lepers cleansed', refs: { luke: '17:11-19' } },
  {
    id: 'day-son-of-man',
    title: 'The day of the Son of Man',
    refs: { luke: '17:20-37' },
    note: 'Compare Matthew 24:23-28, 37-41.',
  },
  { id: 'persistent-widow', title: 'The persistent widow', refs: { luke: '18:1-8' } },
  { id: 'pharisee-tax-collector', title: 'The Pharisee and the tax collector', refs: { luke: '18:9-14' } },

  // Judea and the road to Jerusalem
  { id: 'divorce', title: 'Marriage and divorce', refs: { matthew: '19:1-12', mark: '10:1-12' } },
  { id: 'children', title: 'Jesus blesses the children', refs: { matthew: '19:13-15', mark: '10:13-16', luke: '18:15-17' } },
  { id: 'rich-young-man', title: 'The rich young man', refs: { matthew: '19:16-30', mark: '10:17-31', luke: '18:18-30' } },
  { id: 'vineyard-workers', title: 'The workers in the vineyard', refs: { matthew: '20:1-16' } },
  { id: 'third-prediction', title: 'Third passion prediction', refs: { matthew: '20:17-19', mark: '10:32-34', luke: '18:31-34' } },
  {
    id: 'james-john-request',
    title: 'The request of James and John',
    refs: { matthew: '20:20-28', mark: '10:35-45' },
    note: 'Luke has a similar dispute about greatness at the Last Supper (Luke 22:24-30).',
  },
  { id: 'bartimaeus', title: 'Healing of blind Bartimaeus', refs: { matthew: '20:29-34', mark: '10:46-52', luke: '18:35-43' } },
  { id: 'zacchaeus', title: 'Zacchaeus', refs: { luke: '19:1-10' } },
  { id: 'talents', title: 'The talents; the minas', refs: { matthew: '25:14-30', luke: '19:11-27' } },
  { id: 'lazarus', title: 'The raising of Lazarus', refs: { john: '11:1-44' } },
  {
    id: 'plot',
    title: 'The plot to kill Jesus',
    refs: { matthew: '26:1-5', mark: '14:1-2', luke: '22:1-2', john: '11:45-57' },
    note: 'John ties the council\'s decision directly to the raising of Lazarus.',
  },
  {
    id: 'bethany-anointing',
    title: 'The anointing at Bethany',
    refs: { matthew: '26:6-13', mark: '14:3-9', john: '12:1-11' },
    note: 'John sets this six days before the Passover, before the entry into Jerusalem; Matthew and Mark set it two days before, after it. Luke 7:36-50 tells of a different anointing.',
  },

  // The last week
  {
    id: 'triumphal-entry',
    title: 'The entry into Jerusalem',
    refs: { matthew: '21:1-11', mark: '11:1-11', luke: '19:28-40', john: '12:12-19' },
  },
  { id: 'weeping-jerusalem', title: 'Jesus weeps over Jerusalem', refs: { luke: '19:41-44' } },
  { id: 'greeks-seek', title: 'Greeks seek Jesus; the hour has come', refs: { john: '12:20-36' } },
  { id: 'unbelief', title: 'Unbelief, and a final appeal', refs: { john: '12:37-50' } },
  {
    id: 'fig-tree',
    title: 'The cursing of the fig tree',
    refs: { matthew: '21:18-22', mark: '11:12-14; 11:20-26' },
    note: 'Mark wraps the fig tree around the cleansing of the temple; Matthew tells it in one piece, the morning after.',
  },
  { id: 'authority-questioned', title: "Jesus' authority questioned", refs: { matthew: '21:23-27', mark: '11:27-33', luke: '20:1-8' } },
  { id: 'two-sons', title: 'The two sons', refs: { matthew: '21:28-32' } },
  { id: 'wicked-tenants', title: 'The wicked tenants', refs: { matthew: '21:33-46', mark: '12:1-12', luke: '20:9-19' } },
  { id: 'caesar', title: 'Paying taxes to Caesar', refs: { matthew: '22:15-22', mark: '12:13-17', luke: '20:20-26' } },
  { id: 'resurrection-question', title: 'The Sadducees and the resurrection', refs: { matthew: '22:23-33', mark: '12:18-27', luke: '20:27-40' } },
  { id: 'davids-son', title: "Whose son is the Christ?", refs: { matthew: '22:41-46', mark: '12:35-37', luke: '20:41-44' } },
  { id: 'woes-scribes', title: 'Woe to the scribes and Pharisees', refs: { matthew: '23:1-36', mark: '12:38-40', luke: '20:45-47' } },
  { id: 'widows-offering', title: "The widow's offering", refs: { mark: '12:41-44', luke: '21:1-4' } },
  {
    id: 'signs-of-end',
    title: 'The destruction of the temple; signs of the end',
    refs: { matthew: '24:1-14', mark: '13:1-13', luke: '21:5-19' },
  },
  { id: 'desolation', title: 'The abomination of desolation; great distress', refs: { matthew: '24:15-28', mark: '13:14-23', luke: '21:20-24' } },
  { id: 'son-of-man-coming', title: 'The coming of the Son of Man', refs: { matthew: '24:29-31', mark: '13:24-27', luke: '21:25-28' } },
  { id: 'lesson-fig-tree', title: 'The lesson of the fig tree', refs: { matthew: '24:32-36', mark: '13:28-32', luke: '21:29-33' } },
  { id: 'stay-awake', title: 'Stay awake', refs: { matthew: '24:37-44', mark: '13:33-37', luke: '21:34-38' } },
  { id: 'ten-virgins', title: 'The ten virgins', refs: { matthew: '25:1-13' } },
  { id: 'sheep-goats', title: 'The sheep and the goats', refs: { matthew: '25:31-46' } },
  { id: 'judas-agrees', title: 'Judas agrees to betray Jesus', refs: { matthew: '26:14-16', mark: '14:10-11', luke: '22:3-6' } },
  { id: 'passover-preparation', title: 'Preparing the Passover', refs: { matthew: '26:17-19', mark: '14:12-16', luke: '22:7-13' } },
  {
    id: 'footwashing',
    title: 'Jesus washes the disciples\' feet',
    refs: { john: '13:1-20' },
    note: 'In Matthew, Mark and Luke the last supper is a Passover meal (Mark 14:12). John sets it "before the feast of the Passover" (John 13:1), with the crucifixion on the day of Preparation (John 19:14).',
  },
  {
    id: 'betrayer-foretold',
    title: 'The betrayer foretold',
    refs: { matthew: '26:20-25', mark: '14:17-21', luke: '22:21-23', john: '13:21-30' },
    note: 'Luke places the announcement after the bread and the cup; Matthew and Mark place it before.',
  },
  {
    id: 'lords-supper',
    title: "The Lord's Supper",
    refs: { matthew: '26:26-29', mark: '14:22-25', luke: '22:14-20' },
    note: 'John has no account of the bread and the cup at the supper; in their place he gives the foot washing (John 13:1-20).',
  },
  { id: 'dispute-greatness', title: 'Dispute about greatness at the table', refs: { luke: '22:24-30' } },
  { id: 'new-commandment', title: 'A new commandment', refs: { john: '13:31-35' } },
  {
    id: 'denial-foretold',
    title: "Peter's denial foretold",
    refs: { matthew: '26:30-35', mark: '14:26-31', luke: '22:31-34', john: '13:36-38' },
  },
  { id: 'two-swords', title: 'Purse, bag and sword', refs: { luke: '22:35-38' } },
  { id: 'way-truth-life', title: 'The way, the truth and the life; the promised Helper', refs: { john: '14:1-31' } },
  { id: 'true-vine', title: 'The true vine', refs: { john: '15:1-17' } },
  { id: 'worlds-hatred', title: "The world's hatred", refs: { john: '15:18-16:4' } },
  { id: 'spirit-joy', title: 'The work of the Spirit; sorrow turned to joy', refs: { john: '16:5-33' } },
  { id: 'jesus-prays', title: "Jesus' prayer for his disciples", refs: { john: '17:1-26' } },

  // The passion
  { id: 'gethsemane', title: 'Gethsemane', refs: { matthew: '26:36-46', mark: '14:32-42', luke: '22:39-46' } },
  { id: 'arrest', title: 'The arrest of Jesus', refs: { matthew: '26:47-56', mark: '14:43-52', luke: '22:47-53', john: '18:1-11' } },
  {
    id: 'before-high-priest',
    title: 'Jesus before the high priest',
    refs: { matthew: '26:57-68', mark: '14:53-65', luke: '22:54; 22:63-71', john: '18:12-14; 18:19-24' },
    note: 'John alone describes a hearing before Annas, father-in-law of the high priest Caiaphas.',
  },
  {
    id: 'peters-denials',
    title: "Peter's denials",
    refs: { matthew: '26:69-75', mark: '14:66-72', luke: '22:55-62', john: '18:15-18; 18:25-27' },
  },
  { id: 'judas-death', title: 'The death of Judas', refs: { matthew: '27:3-10' }, note: 'Compare Acts 1:18-19.' },
  {
    id: 'before-pilate',
    title: 'Jesus before Pilate',
    refs: { matthew: '27:1-2; 27:11-14', mark: '15:1-5', luke: '23:1-5', john: '18:28-38' },
  },
  { id: 'before-herod', title: 'Jesus before Herod', refs: { luke: '23:6-12' } },
  {
    id: 'sentenced',
    title: 'Barabbas released; Jesus sentenced',
    refs: { matthew: '27:15-26', mark: '15:6-15', luke: '23:13-25', john: '18:39-19:15' },
    note: 'John notes the hour: "the Preparation Day of the Passover, at about the sixth hour" (John 19:14). Mark says Jesus was crucified at the third hour (Mark 15:25).',
  },
  { id: 'soldiers-mock', title: 'The soldiers mock Jesus', refs: { matthew: '27:27-31', mark: '15:16-20' } },
  { id: 'crucifixion', title: 'The crucifixion', refs: { matthew: '27:32-44', mark: '15:21-32', luke: '23:26-43', john: '19:16-27' } },
  { id: 'death', title: 'The death of Jesus', refs: { matthew: '27:45-56', mark: '15:33-41', luke: '23:44-49', john: '19:28-37' } },
  { id: 'burial', title: 'The burial of Jesus', refs: { matthew: '27:57-61', mark: '15:42-47', luke: '23:50-56', john: '19:38-42' } },
  { id: 'guard', title: 'The guard at the tomb', refs: { matthew: '27:62-66' } },

  // Resurrection
  {
    id: 'empty-tomb',
    title: 'The empty tomb',
    refs: { matthew: '28:1-10', mark: '16:1-8', luke: '24:1-12', john: '20:1-10' },
  },
  {
    id: 'mary-magdalene',
    title: 'Jesus appears to Mary Magdalene',
    refs: { mark: '16:9-11', john: '20:11-18' },
    note: LONGER_ENDING,
  },
  { id: 'guards-report', title: "The guards' report", refs: { matthew: '28:11-15' } },
  { id: 'emmaus', title: 'The road to Emmaus', refs: { mark: '16:12-13', luke: '24:13-35' }, note: LONGER_ENDING },
  {
    id: 'appears-disciples',
    title: 'Jesus appears to the disciples',
    refs: { mark: '16:14-18', luke: '24:36-49', john: '20:19-23' },
    note: LONGER_ENDING,
  },
  { id: 'thomas', title: 'Jesus and Thomas', refs: { john: '20:24-29' } },
  { id: 'purpose-of-john', title: 'That you may believe', refs: { john: '20:30-31' } },
  { id: 'great-commission', title: 'The Great Commission', refs: { matthew: '28:16-20' } },
  { id: 'ascension', title: 'The ascension', refs: { mark: '16:19-20', luke: '24:50-53' }, note: LONGER_ENDING },
  { id: 'by-the-sea', title: 'Breakfast by the Sea of Tiberias', refs: { john: '21:1-14' } },
  { id: 'peter-restored', title: 'Peter restored; the beloved disciple', refs: { john: '21:15-25' } },
];
