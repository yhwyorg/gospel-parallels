export interface Event {
  id: string;
  title: string;
  description: string;
  synopticReferences: {
    matthew?: string;
    mark?: string;
    luke?: string;
  };
  johnReference?: string;
  synopticOrder?: number; // Make this optional
  johnOrder?: number;
}

export const gospelEvents: Event[] = [
  {
    id: "birth",
    title: "Birth of Jesus",
    description: "Jesus is born in Bethlehem",
    synopticReferences: {
      matthew: "Matthew 1:18-25, 2:1-12",
      luke: "Luke 2:1-20"
    },
    synopticOrder: 1,
    johnOrder: undefined
  },
  {
    id: "magi-visit",
    title: "Visit of the Magi",
    description: "Wise men from the East follow a star to worship Jesus",
    synopticReferences: {
      matthew: "Matthew 2:1-12"
    },
    synopticOrder: 2,
    johnOrder: undefined
  },
  {
    id: "egypt-flight",
    title: "Flight to Egypt",
    description: "Joseph takes Mary and Jesus to Egypt to escape Herod",
    synopticReferences: {
      matthew: "Matthew 2:13-23"
    },
    synopticOrder: 3,
    johnOrder: undefined
  },
  {
    id: "jesus-at-twelve",
    title: "Jesus in the Temple at Age 12",
    description: "Jesus stays behind in Jerusalem and is found teaching in the temple",
    synopticReferences: {
      luke: "Luke 2:41-52"
    },
    synopticOrder: 4,
    johnOrder: undefined
  },
  {
    id: "baptism",
    title: "Baptism of Jesus",
    description: "Jesus is baptized by John the Baptist",
    synopticReferences: {
      matthew: "Matthew 3:13-17",
      mark: "Mark 1:9-11",
      luke: "Luke 3:21-22"
    },
    johnReference: "John 1:29-34",
    synopticOrder: 5,
    johnOrder: 1
  },
  {
    id: "temptation",
    title: "Temptation in the Wilderness",
    description: "Jesus is tempted by Satan in the wilderness",
    synopticReferences: {
      matthew: "Matthew 4:1-11",
      mark: "Mark 1:12-13",
      luke: "Luke 4:1-13"
    },
    synopticOrder: 6,
    johnOrder: undefined
  },
  {
    id: "calling-disciples",
    title: "Calling of the Disciples",
    description: "Jesus calls his first disciples",
    synopticReferences: {
      matthew: "Matthew 4:18-22",
      mark: "Mark 1:16-20",
      luke: "Luke 5:1-11"
    },
    johnReference: "John 1:35-51",
    synopticOrder: 7,
    johnOrder: 2
  },
  {
    id: "capernaum-teaching",
    title: "Teaching in Capernaum",
    description: "Jesus teaches in the synagogue at Capernaum and casts out an unclean spirit",
    synopticReferences: {
      mark: "Mark 1:21-28",
      luke: "Luke 4:31-37"
    },
    synopticOrder: 8,
    johnOrder: undefined
  },
  {
    id: "peters-mother-in-law",
    title: "Healing Peter's Mother-in-law",
    description: "Jesus heals Simon Peter's mother-in-law who was sick with fever",
    synopticReferences: {
      matthew: "Matthew 8:14-15",
      mark: "Mark 1:29-31",
      luke: "Luke 4:38-39"
    },
    synopticOrder: 9,
    johnOrder: undefined
  },
  {
    id: "water-wine",
    title: "Water into Wine",
    description: "Jesus turns water into wine at Cana",
    johnReference: "John 2:1-11",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 3
  },
  {
    id: "temple-cleansing-john",
    title: "Cleansing of the Temple (Early Ministry)",
    description: "Jesus cleanses the temple of money changers (early in John's gospel)",
    johnReference: "John 2:13-22",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 4
  },
  {
    id: "nicodemus",
    title: "Meeting with Nicodemus",
    description: "Jesus meets with Nicodemus at night",
    johnReference: "John 3:1-21",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 5
  },
  {
    id: "samaritan-woman",
    title: "Samaritan Woman at the Well",
    description: "Jesus meets a Samaritan woman at Jacob's well",
    johnReference: "John 4:1-42",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 6
  },
  {
    id: "officials-son",
    title: "Healing Official's Son",
    description: "Jesus heals a royal official's son",
    johnReference: "John 4:43-54",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 7
  },
  {
    id: "bethesda-healing",
    title: "Healing at Bethesda",
    description: "Jesus heals a man at the Pool of Bethesda",
    johnReference: "John 5:1-15",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 8
  },
  {
    id: "sermon-mount",
    title: "Sermon on the Mount",
    description: "Jesus delivers the Sermon on the Mount",
    synopticReferences: {
      matthew: "Matthew 5-7",
      luke: "Luke 6:17-49" // Sermon on the Plain
    },
    synopticOrder: 10,
    johnOrder: undefined
  },
  {
    id: "leper-cleansed",
    title: "Cleansing a Leper",
    description: "Jesus cleanses a man with leprosy",
    synopticReferences: {
      matthew: "Matthew 8:1-4",
      mark: "Mark 1:40-45",
      luke: "Luke 5:12-16"
    },
    synopticOrder: 11,
    johnOrder: undefined
  },
  {
    id: "centurion-servant",
    title: "Healing Centurion's Servant",
    description: "Jesus heals a Roman centurion's servant",
    synopticReferences: {
      matthew: "Matthew 8:5-13",
      luke: "Luke 7:1-10"
    },
    synopticOrder: 12,
    johnOrder: undefined
  },
  {
    id: "widow-son",
    title: "Widow's Son at Nain",
    description: "Jesus raises a widow's son from the dead in Nain",
    synopticReferences: {
      luke: "Luke 7:11-17"
    },
    synopticOrder: 13,
    johnOrder: undefined
  },
  {
    id: "john-question",
    title: "John's Question to Jesus",
    description: "John the Baptist sends disciples to question Jesus",
    synopticReferences: {
      matthew: "Matthew 11:2-19",
      luke: "Luke 7:18-35"
    },
    synopticOrder: 14,
    johnOrder: undefined
  },
  {
    id: "sinful-woman",
    title: "Sinful Woman Anoints Jesus",
    description: "A sinful woman anoints Jesus' feet with perfume",
    synopticReferences: {
      luke: "Luke 7:36-50"
    },
    synopticOrder: 15,
    johnOrder: undefined
  },
  {
    id: "calming-storm",
    title: "Calming the Storm",
    description: "Jesus calms a storm on the Sea of Galilee",
    synopticReferences: {
      matthew: "Matthew 8:23-27",
      mark: "Mark 4:35-41",
      luke: "Luke 8:22-25"
    },
    synopticOrder: 16,
    johnOrder: undefined
  },
  {
    id: "gadarene-demoniac",
    title: "Gadarene Demoniac",
    description: "Jesus casts out demons into a herd of swine",
    synopticReferences: {
      matthew: "Matthew 8:28-34",
      mark: "Mark 5:1-20",
      luke: "Luke 8:26-39"
    },
    synopticOrder: 17,
    johnOrder: undefined
  },
  {
    id: "jairus-daughter",
    title: "Jairus' Daughter and Bleeding Woman",
    description: "Jesus heals a woman with bleeding and raises Jairus' daughter",
    synopticReferences: {
      matthew: "Matthew 9:18-26",
      mark: "Mark 5:21-43",
      luke: "Luke 8:40-56"
    },
    synopticOrder: 18,
    johnOrder: undefined
  },
  {
    id: "kingdom-parables",
    title: "Kingdom Parables",
    description: "Jesus teaches using parables about the kingdom",
    synopticReferences: {
      matthew: "Matthew 13:1-52",
      mark: "Mark 4:1-34",
      luke: "Luke 8:4-18"
    },
    synopticOrder: 19,
    johnOrder: undefined
  },
  {
    id: "nazareth-rejection",
    title: "Rejection at Nazareth",
    description: "Jesus is rejected in his hometown of Nazareth",
    synopticReferences: {
      matthew: "Matthew 13:53-58",
      mark: "Mark 6:1-6",
      luke: "Luke 4:16-30"
    },
    synopticOrder: 20,
    johnOrder: undefined
  },
  {
    id: "sending-twelve",
    title: "Sending the Twelve",
    description: "Jesus sends out the twelve disciples",
    synopticReferences: {
      matthew: "Matthew 10:1-42",
      mark: "Mark 6:7-13",
      luke: "Luke 9:1-6"
    },
    synopticOrder: 21,
    johnOrder: undefined
  },
  {
    id: "john-beheaded",
    title: "John the Baptist Beheaded",
    description: "Herod beheads John the Baptist",
    synopticReferences: {
      matthew: "Matthew 14:1-12",
      mark: "Mark 6:14-29",
      luke: "Luke 9:7-9"
    },
    synopticOrder: 22,
    johnOrder: undefined
  },
  {
    id: "feeding-5000",
    title: "Feeding of the 5000",
    description: "Jesus feeds five thousand people with five loaves and two fish",
    synopticReferences: {
      matthew: "Matthew 14:13-21",
      mark: "Mark 6:30-44",
      luke: "Luke 9:10-17"
    },
    johnReference: "John 6:1-15",
    synopticOrder: 19,
    johnOrder: 9
  },
  {
    id: "walking-water",
    title: "Walking on Water",
    description: "Jesus walks on water",
    synopticReferences: {
      matthew: "Matthew 14:22-33",
      mark: "Mark 6:45-52"
    },
    johnReference: "John 6:16-21",
    synopticOrder: 20,
    johnOrder: 10
  },
  {
    id: "bread-of-life",
    title: "Bread of Life Discourse",
    description: "Jesus declares he is the bread of life",
    johnReference: "John 6:22-71",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 11
  },
  {
    id: "tradition-discussion",
    title: "Discussion on Tradition",
    description: "Jesus debates with Pharisees about tradition",
    synopticReferences: {
      matthew: "Matthew 15:1-20",
      mark: "Mark 7:1-23"
    },
    synopticOrder: 21,
    johnOrder: undefined
  },
  {
    id: "canaanite-woman",
    title: "Canaanite Woman's Faith",
    description: "Jesus heals a Canaanite/Syrophoenician woman's daughter",
    synopticReferences: {
      matthew: "Matthew 15:21-28",
      mark: "Mark 7:24-30"
    },
    synopticOrder: 22,
    johnOrder: undefined
  },
  {
    id: "feeding-4000",
    title: "Feeding of the 4000",
    description: "Jesus feeds four thousand people with seven loaves and a few small fish",
    synopticReferences: {
      matthew: "Matthew 15:32-39",
      mark: "Mark 8:1-10"
    },
    synopticOrder: 23,
    johnOrder: undefined
  },
  {
    id: "peter-confession",
    title: "Peter's Confession",
    description: "Peter confesses Jesus as the Christ/Messiah",
    synopticReferences: {
      matthew: "Matthew 16:13-20",
      mark: "Mark 8:27-30",
      luke: "Luke 9:18-21"
    },
    synopticOrder: 24,
    johnOrder: undefined
  },
  {
    id: "transfiguration",
    title: "Transfiguration",
    description: "Jesus is transfigured before Peter, James, and John",
    synopticReferences: {
      matthew: "Matthew 17:1-13",
      mark: "Mark 9:2-13",
      luke: "Luke 9:28-36"
    },
    synopticOrder: 25,
    johnOrder: undefined
  },
  {
    id: "epileptic-boy",
    title: "Healing Epileptic Boy",
    description: "Jesus heals a boy with seizures after disciples couldn't",
    synopticReferences: {
      matthew: "Matthew 17:14-21",
      mark: "Mark 9:14-29",
      luke: "Luke 9:37-43"
    },
    synopticOrder: 26,
    johnOrder: undefined
  },
  {
    id: "greatest-discussion",
    title: "Who Is the Greatest",
    description: "Disciples argue about who is greatest in the kingdom",
    synopticReferences: {
      matthew: "Matthew 18:1-5",
      mark: "Mark 9:33-37",
      luke: "Luke 9:46-48"
    },
    synopticOrder: 27,
    johnOrder: undefined
  },
  {
    id: "seventy-two",
    title: "Jesus Sends Out the Seventy-Two",
    description: "Jesus sends 72 disciples to announce the kingdom",
    synopticReferences: {
      luke: "Luke 10:1-24"
    },
    synopticOrder: 28,
    johnOrder: undefined
  },
  {
    id: "good-samaritan",
    title: "Good Samaritan Parable",
    description: "Jesus tells the parable of the Good Samaritan",
    synopticReferences: {
      luke: "Luke 10:25-37"
    },
    synopticOrder: 29,
    johnOrder: undefined
  },
  {
    id: "feast-tabernacles",
    title: "Feast of Tabernacles",
    description: "Jesus teaches at the Feast of Tabernacles",
    johnReference: "John 7:1-52",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 12
  },
  {
    id: "adulteress-woman",
    title: "Woman Caught in Adultery",
    description: "Jesus forgives a woman caught in adultery",
    johnReference: "John 7:53-8:11",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 13
  },
  {
    id: "light-of-world",
    title: "Light of the World",
    description: "Jesus declares he is the light of the world",
    johnReference: "John 8:12-59",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 14
  },
  {
    id: "blind-man",
    title: "Healing of Man Born Blind",
    description: "Jesus heals a man born blind",
    johnReference: "John 9:1-41",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 15
  },
  {
    id: "good-shepherd",
    title: "Good Shepherd Discourse",
    description: "Jesus declares he is the good shepherd",
    johnReference: "John 10:1-21",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 16
  },
  {
    id: "feast-dedication",
    title: "Feast of Dedication",
    description: "Jesus at the Feast of Dedication (Hanukkah)",
    johnReference: "John 10:22-42",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 17
  },
  {
    id: "lazarus",
    title: "Raising of Lazarus",
    description: "Jesus raises Lazarus from the dead",
    johnReference: "John 11:1-44",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 18
  },
  {
    id: "plot-against-jesus",
    title: "Plot Against Jesus",
    description: "Leaders plot to kill Jesus after raising Lazarus",
    johnReference: "John 11:45-57",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 19
  },
  {
    id: "bethany-anointing",
    title: "Anointing at Bethany",
    description: "Mary anoints Jesus' feet with expensive perfume",
    johnReference: "John 12:1-11",
    synopticReferences: {
      matthew: "Matthew 26:6-13",
      mark: "Mark 14:3-9"
    },
    synopticOrder: 30,
    johnOrder: 20
  },
  {
    id: "triumphal-entry",
    title: "Triumphal Entry",
    description: "Jesus enters Jerusalem on a donkey",
    johnReference: "John 12:12-19",
    synopticReferences: {
      matthew: "Matthew 21:1-11",
      mark: "Mark 11:1-11",
      luke: "Luke 19:28-44"
    },
    synopticOrder: 31,
    johnOrder: 21
  },
  {
    id: "greeks-seek-jesus",
    title: "Greeks Seek Jesus",
    description: "Greeks ask to see Jesus",
    johnReference: "John 12:20-36",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 22
  },
  {
    id: "unbelief-discussion",
    title: "Discourse on Belief and Unbelief",
    description: "Jesus addresses belief and unbelief",
    johnReference: "John 12:37-50",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 23
  },
  {
    id: "fig-tree-withered",
    title: "Fig Tree Withered",
    description: "Jesus curses a fig tree and it withers",
    synopticReferences: {
      matthew: "Matthew 21:18-22",
      mark: "Mark 11:12-14, 20-25"
    },
    synopticOrder: 32,
    johnOrder: undefined
  },
  {
    id: "temple-cleansing-synoptic",
    title: "Cleansing of the Temple (Final Week)",
    description: "Jesus cleanses the temple of money changers (in final week of ministry)",
    synopticReferences: {
      matthew: "Matthew 21:12-17",
      mark: "Mark 11:15-19",
      luke: "Luke 19:45-48"
    },
    synopticOrder: 33,
    johnOrder: undefined
  },
  {
    id: "authority-questioned",
    title: "Jesus' Authority Questioned",
    description: "Religious leaders question Jesus' authority",
    synopticReferences: {
      matthew: "Matthew 21:23-27",
      mark: "Mark 11:27-33",
      luke: "Luke 20:1-8"
    },
    synopticOrder: 34,
    johnOrder: undefined
  },
  {
    id: "woes-and-parables",
    title: "Woes and Parables in Jerusalem",
    description: "Jesus pronounces woes on religious leaders and teaches with parables",
    synopticReferences: {
      matthew: "Matthew 22-25",
      mark: "Mark 12:1-44",
      luke: "Luke 20:9-21:38"
    },
    synopticOrder: 35,
    johnOrder: undefined
  },
  {
    id: "last-supper",
    title: "Last Supper",
    description: "Jesus has his final meal with the disciples",
    synopticReferences: {
      matthew: "Matthew 26:17-30",
      mark: "Mark 14:12-26",
      luke: "Luke 22:7-39"
    },
    johnReference: "John 13:1-17:26",
    synopticOrder: 36,
    johnOrder: 24
  },
  {
    id: "gethsemane",
    title: "Garden of Gethsemane",
    description: "Jesus prays in the Garden of Gethsemane",
    synopticReferences: {
      matthew: "Matthew 26:36-56",
      mark: "Mark 14:32-52",
      luke: "Luke 22:39-53"
    },
    johnReference: "John 18:1-11",
    synopticOrder: 37,
    johnOrder: 25
  },
  {
    id: "trial",
    title: "Trial Before Jewish Leaders and Pilate",
    description: "Jesus is tried before Jewish leaders and Pilate",
    synopticReferences: {
      matthew: "Matthew 26:57-27:31",
      mark: "Mark 14:53-15:20",
      luke: "Luke 22:54-23:25"
    },
    johnReference: "John 18:12-19:16",
    synopticOrder: 38,
    johnOrder: 26
  },
  {
    id: "crucifixion",
    title: "Crucifixion",
    description: "Jesus is crucified",
    synopticReferences: {
      matthew: "Matthew 27:32-56",
      mark: "Mark 15:21-41",
      luke: "Luke 23:26-49"
    },
    johnReference: "John 19:16-37",
    synopticOrder: 39,
    johnOrder: 27
  },
  {
    id: "burial",
    title: "Burial of Jesus",
    description: "Jesus is buried in a tomb",
    synopticReferences: {
      matthew: "Matthew 27:57-66",
      mark: "Mark 15:42-47",
      luke: "Luke 23:50-56"
    },
    johnReference: "John 19:38-42",
    synopticOrder: 40,
    johnOrder: 28
  },
  {
    id: "resurrection",
    title: "Resurrection",
    description: "Jesus rises from the dead",
    synopticReferences: {
      matthew: "Matthew 28:1-10",
      mark: "Mark 16:1-8",
      luke: "Luke 24:1-12"
    },
    johnReference: "John 20:1-18",
    synopticOrder: 41,
    johnOrder: 29
  },
  {
    id: "thomas",
    title: "Thomas' Doubt",
    description: "Jesus appears to Thomas who doubted",
    johnReference: "John 20:19-29",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 30
  },
  {
    id: "purpose-statement",
    title: "John's Purpose Statement",
    description: "John explains why he wrote his gospel",
    johnReference: "John 20:30-31",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 31
  },
  {
    id: "galilee-appearance",
    title: "Appearance in Galilee",
    description: "Jesus appears to disciples at the Sea of Galilee",
    johnReference: "John 21:1-25",
    synopticReferences: {},
    synopticOrder: undefined,
    johnOrder: 32
  }
];