import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// Proper names follow the Reina-Valera 1909 the site shows (Jerusalem, Bethania,
// Capernaum, Gethsemaní, Beelzebub, Jacobo), so a reader finds the same spelling in
// the title, the note and the text beside it.

const LONGER_ENDING =
  'Los dos manuscritos griegos completos más antiguos de Marcos terminan en 16:8. Marcos 16:9-20 está impreso en la Reina-Valera 1909, pero se considera en general una adición posterior.';

const secciones = (n: number) => `${n} ${n === 1 ? 'sección' : 'secciones'}`;

const es: Dict = {
  siteName: 'Paralelos de los Evangelios',
  tagline: 'Los cuatro Evangelios, lado a lado',
  nav: { sections: 'Secciones', timeline: 'Cronología', order: 'Orden', book: 'Libro', about: 'Acerca de' },
  language: 'Idioma',
  lookup: { label: 'Buscar un pasaje', placeholder: 'Busque un pasaje, p. ej. Lucas 15:11-32', go: 'Ir' },
  loading: 'Cargando los Evangelios…',
  loadFailed: (message) => (
    <>
      <strong>No se pudo cargar el texto de los Evangelios.</strong> {message}. Intente recargar la página.
    </>
  ),
  footer: (link, licence) => <>Escrituras de la {link} ({licence.toLowerCase()}).</>,
  publicDomain: 'Dominio público',

  home: {
    intro:
      'Elija una sección para leer todos sus relatos en columnas paralelas, o escriba cualquier pasaje en el cuadro de arriba para encontrar sus paralelos. Cada columna muestra dónde sitúa ese Evangelio la historia, con las secciones que la preceden y la siguen.',
    filterGroup: 'Filtrar secciones',
    filterLabel: 'Filtrar secciones por título',
    filterPlaceholder: 'Filtrar por título, p. ej. curación',
    order: 'Orden',
    harmony: 'Armonía (todas las secciones)',
    asTold: (g) => `Según ${g}`,
    onlyShared: 'En más de un Evangelio',
    count: (n, total) => `${n} de ${secciones(total)}`,
    noMatch: (f) => `Ningún título de sección coincide con “${f}”. Pruebe mejor con el cuadro de pasajes de arriba.`,
  },

  reader: {
    notFound: (id) => `No hay ninguna sección llamada “${id}”.`,
    seeAll: 'Ver todas las secciones',
    shade: 'Sombrear palabras compartidas',
    numbers: 'Números de versículo',
    copyAll: 'Copiar todo',
    copy: 'Copiar',
    copied: 'Copiado',
    copyFailed: 'No se pudo copiar',
    print: 'Imprimir',
    shadeIntro: 'Las palabras que aparecen en más de un relato se sombrean:',
    in2: 'en 2',
    in3: 'en 3',
    in4: 'en los 4',
    shadeCaveat:
      'Esto compara palabras en español de una sola traducción, no el griego; por eso es una ayuda para la vista, no un análisis.',
    jumpLabel: 'Ir a un Evangelio',
    notIn: (names) => `No aparece en ${names}.`,
    omitted: (t) => `Este versículo no está incluido en el texto de la ${t}.`,
    sectionOf: (i, n, g) => `Sección ${i} de ${n} en ${g}`,
    beginning: (g) => `Comienzo de ${g}`,
    end: (g) => `Final de ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> está en esta sección. Los versículos que buscó aparecen {mark('sombreados así')}.
      </>
    ),
    spans: (n, g) => `Este pasaje abarca ${n} secciones de ${g}. Elija una para leerlo junto a sus paralelos.`,
    notFound: (q) => `No se encontró “${q}”.`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `Escriba un pasaje como “${names.mark} 4:35-41”.`;
        case 'not-gospel':
          return `“${p.word}” no es uno de los cuatro Evangelios. Pruebe con ${names.matthew}, ${names.mark}, ${names.luke} o ${names.john}.`;
        case 'no-chapter-given':
          return `Añada un capítulo, p. ej. “${names[p.gospel]} 1”.`;
        case 'no-chapter':
          return p.gospel ? `${names[p.gospel]} no tiene capítulo ${p.chapter}` : `el capítulo ${p.chapter} no existe`;
        case 'verse-count':
          return `${names[p.gospel]} ${p.chapter} tiene ${p.verses} versículos, no ${p.verse}`;
        case 'backwards':
          return `${formatRange(p.range)} está en orden inverso`;
        case 'unreadable':
          return `no se puede leer “${p.text}”`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `Orden: ${a} y ${b}`,
    title: 'Dónde sitúa cada Evangelio la historia',
    intro:
      'Cada columna enumera las secciones de un Evangelio de principio a fin, en el orden en que ese Evangelio las narra. Una línea une una sección con la misma sección en el otro Evangelio. Donde las líneas se cruzan, los dos Evangelios narran esos hechos en un orden distinto.',
    left: 'Izquierda',
    right: 'Derecha',
    summary: (a, na, b, nb, both) =>
      `${a} tiene ${secciones(na)} y ${b} tiene ${nb}; ${both === 1 ? 'una está' : `${both} están`} en ambos.`,
    same: 'Los dos Evangelios narran todas las secciones que comparten en el mismo orden.',
    one: 'Una sola sección explica la diferencia de orden. Si se deja aparte, los dos Evangelios narran todo lo demás que comparten en la misma secuencia:',
    many: (n) =>
      `Estas ${n} secciones explican las diferencias de orden. Si se dejan aparte, los dos Evangelios narran todo lo demás que comparten en la misma secuencia:`,
    position: (pa, na, a, pb, nb, b) => `— sección ${pa} de ${na} en ${a}, ${pb} de ${nb} en ${b}`,
    tie: 'Cuando dos explicaciones son igual de sencillas (¿adelantó un Evangelio una historia, o retrasó el otro la que estaba a su lado?), solo se indica una; por eso conviene leer la lista como “dónde difiere el orden”, no como “qué cambió de lugar el escritor”.',
    legend: {
      label: 'Leyenda',
      same: 'La misma sección en ambos Evangelios',
      notable: 'Una sección de la lista de arriba, narrada en otro momento',
      focus: 'La sección que está señalando',
      sample: 'Título',
      both: 'También en el otro Evangelio (la barra lleva el color de su propia columna)',
      only: 'Solo en este Evangelio, por eso no tiene línea',
    },
    lane: (g) => `${g} en orden`,
  },

  // Two separate paragraphs on purpose: the sentence about blessing God and the
  // sentence about Darrell must never share a phrase. He is alive, so no wording of
  // homage or memorial ("homenaje", "en honor de", "en memoria").
  timeline: {
    title: 'La historia en orden',
    intro: 'Todas las secciones en orden de armonía, de izquierda a derecha, con una fila para cada Evangelio. Un bloque en una fila indica que ese Evangelio narra el suceso; un tramo vacío, que no lo narra. Elija un bloque para leer todos los relatos lado a lado.',
    periods: {
      beginnings: 'Los comienzos',
      preparation: 'Juan el Bautista y el bautismo',
      early: 'El ministerio inicial',
      galilee: 'El ministerio en Galilea',
      journey: 'Camino a Jerusalén',
      week: 'La última semana',
      passion: 'La pasión',
      resurrection: 'La resurrección',
    },
    days: {
      sunday: 'Domingo · Domingo de Ramos',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves · la Última Cena',
      thursdayNight: 'Jueves por la noche',
      friday: 'Viernes · Viernes Santo',
      saturday: 'Sábado',
      easter: 'Domingo de Resurrección',
      later: 'Después de la Pascua',
    },
    dayNote: 'Los días de la última semana siguen la lectura tradicional de las indicaciones de los propios Evangelios, sobre todo las de Marcos; las secciones sin indicación quedan sin día. Juan sitúa la última cena «antes de la fiesta de la Pascua» (Juan 13:1).',
    jump: 'Ir a',
    elsewhereKey: 'Narrado en otro momento en este Evangelio',
    elsewhere: (g, after) => (after ? `${g} lo narra en otro momento, después de «${after}».` : `${g} lo narra en otro momento, al principio.`),
  },

  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>Acerca de este sitio</h1>
      <p>
        Este sitio se ofrece para bendecir a Dios Todopoderoso, cuya Palabra pone delante del lector, y cuyo Hijo
        proclaman estos cuatro Evangelios.
      </p>
      <p>
        Este sitio fue hecho para Darrell W. Johnson, que lleva más de cincuenta años predicando a Jesucristo y su evangelio: como
        pastor en California, en la Union Church of Manila y en la First Baptist Church de Vancouver, y como maestro de
        predicadores en el Fuller Theological Seminary, el Regent College y el Carey Theological College. Hoy sirve en
        The Way Church y con The Pastorate Ministries Canada. Es autor de <cite>The Glory of Preaching</cite>,{' '}
        <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>, <cite>The Beatitudes</cite> y otros libros.
      </p>
      <p>
        Su predicación empieza donde empieza esta herramienta: permaneciendo en el texto y dejando que diga lo que dice.
        El sitio nació de un proyecto que Darrell y su familia comenzaron juntos, comparando el orden de los
        acontecimientos en Mateo, Marcos y Lucas con el orden en Juan.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Sermones, libros y enseñanzas de Darrell →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>Cómo usarlo</h2>
        <ul>
          <li>
            <strong>Leer una sección.</strong> Elija cualquier sección de la <a href={href.home()}>lista</a> para ver
            lado a lado el relato de cada Evangelio. Debajo de cada columna están las secciones que vienen justo antes y
            después en ese Evangelio, para que pueda leer la historia en su propio contexto.
          </li>
          <li>
            <strong>Buscar un pasaje.</strong> Escriba una referencia como{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> o{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. La herramienta abre la sección que lo
            contiene, con los versículos que buscó marcados.
          </li>
          <li>
            <strong>Comparar el orden.</strong> La página <a href={href.order('mark', 'john')}>Orden</a> pone lado a
            lado dos Evangelios y une las secciones que comparten, para que pueda ver dónde un Evangelio sitúa un hecho
            en un momento distinto que otro.
          </li>
          <li>
            <strong>Sombrear palabras compartidas</strong> sombrea las palabras que aparecen en más de un relato.
            Compara palabras en español de una sola traducción, no el griego; por eso es una ayuda para la vista, no un
            análisis.
          </li>
          <li>
            <strong>Imprimirlo como libro.</strong> La página <a href={href.book()}>Libro</a> reúne todas las secciones
            en un solo volumen, para imprimirlo o descargarlo en PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>Colores y marcas</h2>
        <ul className="color-key">
          <li>
            Cada Evangelio conserva su propio color en todo el sitio:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> y{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. Ese color marca la parte superior
            de cada columna, el nombre del Evangelio y sus referencias en la lista de secciones.
          </li>
          <li>
            <span className="verse target">El sombreado gris azulado</span> marca los versículos que buscó.
          </li>
          <li>
            Con <strong>Sombrear palabras compartidas</strong> activado, un sombreado dorado marca las palabras que
            aparecen en más de un relato: <mark className="hl2">en dos</mark>, <mark className="hl3">en tres</mark>,{' '}
            <mark className="hl4">en los cuatro</mark>.
          </li>
          <li>
            En la página Orden, una línea gris une una sección con la misma sección en el otro Evangelio; una línea{' '}
            <strong className="purple">morada</strong> marca una sección narrada en otro momento; una línea oscura es la
            que está señalando. Un título en gris, sin línea, se encuentra solo en ese Evangelio.
          </li>
        </ul>
      </section>

      <section>
        <h2>Por qué difiere el orden</h2>
        <p>
          {names.matthew}, {names.mark} y {names.luke} (los Evangelios “sinópticos”) comparten gran parte de su orden:
          un ministerio en Galilea y luego un solo viaje a Jerusalem para la última semana. {names.john} va y viene
          entre Galilea y Jerusalem varias veces, y menciona tres Pascuas ({names.john} 2:13; 6:4; 11:55). Las
          diferencias más conocidas son la purificación del templo, que {names.john} sitúa al comienzo del ministerio y
          los demás en la última semana, y el momento de la Última Cena y de la crucifixión en relación con la Pascua.
        </p>
        <p>
          Los escritores de los Evangelios ordenaron su material para proclamar quién es Jesús, no solo para llevar un
          diario; por eso una diferencia de orden es una invitación a preguntarnos qué nos muestra cada escritor al
          situar una historia donde la sitúa.
        </p>
      </section>

      <section>
        <h2>Acerca del texto y de las secciones</h2>
        <p>
          Las Escrituras son de la {translation} ({licence.toLowerCase()}), tomadas sin cambios de{' '}
          <a href="https://ebible.org/">eBible.org</a>. {attribution} Incluye algunos versículos que faltan en los
          manuscritos más antiguos, como {names.mark} 16:9-20 y {names.john} 7:53-8:11; las secciones correspondientes
          lo indican.
        </p>
        <p>
          La división en secciones y la elección de qué pasajes se consideran paralelos son decisiones editoriales, que
          siguen en líneas generales las sinopsis tradicionales de los Evangelios. Cada versículo de los cuatro
          Evangelios pertenece a una sola sección, de modo que cualquier pasaje que busque se encontrará. Donde{' '}
          {names.matthew} o {names.luke} usan un dicho en dos lugares, solo uno está enlazado y las notas de la sección
          remiten al otro.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Libro',
    heading: 'Todo el sitio en forma de libro',
    intro:
      'Todas las secciones, en orden de armonía, en un solo volumen para imprimir o conservar: con la dedicatoria, un índice general y, al final, un índice de pasajes para encontrar cualquier versículo.',
    download: (pages, mb) => `Descargar el PDF (${pages} páginas, ${mb} MB)`,
    paper: (size) => `El PDF está en tamaño ${size}. Si imprime desde su navegador, se usará su propio tamaño de papel.`,
    print: 'Imprimir desde el navegador',
    notBuilt: 'El PDF se genera cuando se publica el sitio, así que esta copia del sitio no lo tiene.',
    scripture: (t) => `Escrituras: ${t}`,
    howToHeading: 'Cómo leer este libro',
    HowTo: ({ names }) => (
      <>
        <p>
          Cada sección presenta lado a lado los relatos de los Evangelios sobre un mismo hecho o enseñanza, una columna
          por Evangelio. Las secciones están numeradas (§) en orden de armonía: aproximadamente el orden de los
          acontecimientos, tal como lo disponen las sinopsis tradicionales de los Evangelios. Cuando un Evangelio no
          narra una historia, la sección lo indica.
        </p>
        <p>
          Una barra de color en la parte superior de cada columna indica su Evangelio:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          Para encontrar un pasaje, busque su capítulo y versículo en el índice del final, que da el número de sección.
          Las mismas secciones están en gospels.yhwh.rest, donde también puede comparar el orden en que dos Evangelios
          cuentan su historia.
        </p>
      </>
    ),
    contents: 'Contenido',
    indexHeading: 'Índice de pasajes',
    indexIntro:
      'Cada versículo de los cuatro Evangelios pertenece a una sola sección. Busque el capítulo y el versículo bajo su Evangelio y vaya al número de sección.',
    creditsHeading: 'Acerca de este libro',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          Las Escrituras son de la {translation} ({licence.toLowerCase()}), tomadas sin cambios de eBible.org.{' '}
          {attribution}
        </p>
        <p>
          La división en secciones y la elección de los paralelos son decisiones editoriales, que siguen en líneas
          generales las sinopsis tradicionales de los Evangelios.
        </p>
        <p>Hecho a partir de gospels.yhwh.rest el {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': 'El Verbo fue hecho carne',
    'luke-preface': 'Prólogo de Lucas a Teófilo',
    'john-birth-foretold': 'Anuncio del nacimiento de Juan el Bautista',
    annunciation: 'El ángel Gabriel visita a María',
    magnificat: 'María visita a Elisabet; el Magníficat',
    'john-birth': 'Nacimiento de Juan el Bautista; el Benedictus',
    genealogy: 'La genealogía de Jesús',
    birth: 'El nacimiento de Jesús',
    shepherds: 'Los pastores',
    presentation: 'La presentación en el templo; Simeón y Ana',
    magi: 'La visita de los magos',
    'flight-egypt': 'La huida a Egipto; la matanza de los inocentes',
    'return-nazareth': 'El regreso a Nazaret',
    'boy-in-temple': 'El niño Jesús en el templo',
    'baptist-preaching': 'La predicación de Juan el Bautista',
    'baptist-imprisoned': 'Juan el Bautista encarcelado',
    baptism: 'El bautismo de Jesús',
    temptation: 'La tentación en el desierto',
    'first-disciples-john': 'Los primeros discípulos (Juan)',
    cana: 'Las bodas de Caná',
    'temple-cleansing': 'La purificación del templo',
    nicodemus: 'Jesús y Nicodemo',
    'baptist-final-testimony': 'El último testimonio de Juan el Bautista',
    'samaritan-woman': 'La mujer samaritana',
    'galilee-begins': 'Jesús vuelve a Galilea',
    'officials-son': 'Curación del hijo de un oficial del rey',
    'nazareth-rejection': 'Jesús rechazado en Nazaret',
    'calling-fishermen': 'El llamamiento de los primeros discípulos',
    'capernaum-synagogue': 'Enseñanza en la sinagoga de Capernaum',
    'peters-mother-in-law': 'Curación de la suegra de Pedro; curaciones al anochecer',
    'preaching-tour': 'Jesús recorre Galilea predicando',
    leper: 'Curación de un leproso',
    paralytic: 'Curación de un paralítico',
    levi: 'El llamamiento de Leví (Mateo); Jesús come con pecadores',
    'fasting-question': 'La pregunta sobre el ayuno',
    'grain-sabbath': 'Espigas arrancadas en sábado',
    'withered-hand': 'Curación del hombre de la mano seca',
    'crowds-by-sea': 'Las multitudes acuden a Jesús; el siervo escogido',
    'choosing-twelve': 'La elección de los doce',
    bethesda: 'Curación en el estanque de Bethesda',
    'authority-of-son': 'La autoridad del Hijo; testigos de Jesús',
    beatitudes: 'Las bienaventuranzas',
    'salt-light': 'La sal y la luz',
    'law-fulfilled': 'Jesús cumple la ley',
    'greater-righteousness': 'La ira, el adulterio, el divorcio y los juramentos',
    'love-enemies': 'La venganza y el amor a los enemigos',
    'piety-in-secret': 'Dar, orar y ayunar en secreto',
    'lords-prayer': 'El Padrenuestro',
    'treasure-heaven': 'Tesoros en el cielo',
    'lamp-of-body': 'La lámpara del cuerpo',
    'two-masters': 'Nadie puede servir a dos señores',
    'do-not-worry': 'No os congojéis',
    judging: 'No juzgar a los demás',
    'ask-seek-knock': 'Pedid, buscad, llamad; la regla de oro',
    'two-foundations': 'Dos caminos, dos árboles, dos cimientos',
    centurion: 'Curación del siervo del centurión',
    'widow-nain': 'Resurrección del hijo de la viuda de Naín',
    'baptist-question': 'La pregunta de Juan el Bautista; el testimonio de Jesús sobre Juan',
    'sinful-woman': 'Una mujer pecadora unge a Jesús',
    'women-followers': 'Las mujeres que seguían a Jesús',
    'woes-cities': 'Ayes sobre las ciudades de Galilea',
    thanksgiving: 'Jesús da gracias; venid a mí',
    beelzebul: 'La controversia sobre Beelzebub',
    'sign-of-jonah': 'La señal de Jonás',
    'unclean-spirit-returns': 'El regreso del espíritu inmundo',
    'true-blessedness': 'La verdadera bienaventuranza',
    'true-family': 'La verdadera familia de Jesús',
    sower: 'La parábola del sembrador',
    'why-parables': 'El propósito de las parábolas',
    'sower-explained': 'Explicación de la parábola del sembrador',
    'lamp-measure': 'La antorcha debajo del almud; la medida con que medís',
    'seed-growing': 'La semilla que crece por sí sola',
    weeds: 'El trigo y la cizaña',
    'mustard-leaven': 'El grano de mostaza y la levadura',
    'use-of-parables': 'Jesús habla en parábolas',
    'weeds-explained': 'Explicación de la parábola de la cizaña',
    'treasure-pearl-net': 'El tesoro escondido, la perla, la red',
    'would-be-followers': 'Los que querían seguir a Jesús',
    'calming-storm': 'Jesús calma la tempestad',
    gerasene: 'El endemoniado gadareno',
    jairus: 'La hija de Jairo y la mujer que tocó su manto',
    'two-blind-mute': 'Dos ciegos; un mudo',
    harvest: 'La mies es mucha',
    'sending-twelve': 'Jesús envía a los doce',
    persecution: 'Las persecuciones venideras',
    'do-not-fear': 'No temáis',
    'not-peace': 'No paz, sino espada',
    'herod-baptist-death': 'Herodes y la muerte de Juan el Bautista',
    'feeding-5000': 'Alimentación de los cinco mil',
    'walking-water': 'Jesús anda sobre las aguas',
    gennesaret: 'Curaciones en Genezaret',
    'bread-of-life': 'El pan de vida',
    'words-eternal-life': 'Muchos se vuelven atrás; «tú tienes palabras de vida eterna»',
    'tradition-elders': 'La tradición de los ancianos; lo que contamina',
    'canaanite-woman': 'La mujer cananea (sirofenisa)',
    'deaf-man': 'Curación de un sordomudo; muchas curaciones',
    'feeding-4000': 'Alimentación de los cuatro mil',
    'demand-sign': 'Piden una señal',
    'leaven-pharisees': 'La levadura de los fariseos',
    'bethsaida-blind': 'Un ciego en Bethsaida',
    'peters-confession': 'La confesión de Pedro',
    'first-prediction': 'Primer anuncio de la pasión; tomar la cruz',
    transfiguration: 'La transfiguración',
    'boy-unclean-spirit': 'Curación de un muchacho con un espíritu inmundo',
    'second-prediction': 'Segundo anuncio de la pasión',
    'temple-tax': 'El tributo del templo',
    greatest: '¿Quién es el mayor?',
    'strange-exorcist': 'El que no es contra nosotros',
    stumbling: 'Ocasiones de caer',
    'lost-sheep': 'La oveja perdida',
    'forgive-brother': 'Corregir y perdonar al hermano',
    'unforgiving-servant': 'El siervo que no quiso perdonar',
    'tabernacles-1': 'En la fiesta de los tabernáculos',
    'tabernacles-2': '¿Es este el Cristo? Ríos de agua viva',
    'adulterous-woman': 'La mujer sorprendida en adulterio',
    'light-of-world': 'La luz del mundo',
    'before-abraham': 'La verdad os libertará; antes que Abraham fuese',
    'man-born-blind': 'Curación del ciego de nacimiento',
    'good-shepherd': 'El buen pastor',
    dedication: 'En la fiesta de la dedicación',
    'samaritan-village': 'Una aldea samaritana rechaza a Jesús',
    'sending-seventy': 'Jesús envía a los setenta',
    'seventy-return': 'El regreso de los setenta',
    'great-commandment': 'El gran mandamiento',
    'good-samaritan': 'El buen samaritano',
    'mary-martha': 'Marta y María',
    'friend-midnight': 'El amigo a medianoche',
    'woes-at-dinner': 'Ayes en la mesa de un fariseo',
    'rich-fool': 'El rico insensato',
    'watchful-servants': 'Los siervos vigilantes',
    'faithful-servant': 'El siervo fiel y el siervo infiel',
    'interpreting-times': 'Discernir los tiempos; reconciliarse en el camino',
    'repent-fig-tree': 'Arrepentirse o perecer; la higuera estéril',
    'crippled-woman': 'Curación de una mujer encorvada en sábado',
    'narrow-door': 'La puerta estrecha',
    'lament-jerusalem': 'Lamento sobre Jerusalem',
    dropsy: 'Curación de un hidrópico',
    'places-at-table': 'Los primeros asientos; a quién invitar',
    'great-banquet': 'La gran cena; las bodas del hijo del rey',
    'cost-discipleship': 'El costo del discipulado',
    'lost-coin': 'La dracma perdida',
    'prodigal-son': 'El hijo pródigo y su hermano',
    'shrewd-manager': 'El mayordomo infiel',
    'law-and-divorce': 'La ley y el reino; el divorcio',
    'rich-man-lazarus': 'El rico y Lázaro',
    'faith-duty': 'Fe como un grano de mostaza; siervos inútiles',
    'ten-lepers': 'Los diez leprosos',
    'day-son-of-man': 'El día del Hijo del hombre',
    'persistent-widow': 'La viuda insistente',
    'pharisee-tax-collector': 'El fariseo y el publicano',
    divorce: 'El matrimonio y el divorcio',
    children: 'Jesús bendice a los niños',
    'rich-young-man': 'El joven rico',
    'vineyard-workers': 'Los obreros de la viña',
    'third-prediction': 'Tercer anuncio de la pasión',
    'james-john-request': 'La petición de Jacobo y Juan',
    bartimaeus: 'Curación del ciego Bartimeo',
    zacchaeus: 'Zaqueo',
    talents: 'Los talentos; las minas',
    lazarus: 'La resurrección de Lázaro',
    plot: 'Conspiración para matar a Jesús',
    'bethany-anointing': 'La unción en Bethania',
    'triumphal-entry': 'La entrada en Jerusalem',
    'weeping-jerusalem': 'Jesús llora sobre Jerusalem',
    'greeks-seek': 'Unos griegos buscan a Jesús; ha llegado la hora',
    unbelief: 'La incredulidad, y un último llamamiento',
    'fig-tree': 'La maldición de la higuera',
    'authority-questioned': 'La autoridad de Jesús puesta en duda',
    'two-sons': 'Los dos hijos',
    'wicked-tenants': 'Los labradores malvados',
    caesar: 'El tributo al César',
    'resurrection-question': 'Los saduceos y la resurrección',
    'davids-son': '¿De quién es hijo el Cristo?',
    'woes-scribes': 'Ayes sobre los escribas y fariseos',
    'widows-offering': 'La ofrenda de la viuda',
    'signs-of-end': 'La destrucción del templo; señales del fin',
    desolation: 'La abominación del asolamiento; la gran aflicción',
    'son-of-man-coming': 'La venida del Hijo del hombre',
    'lesson-fig-tree': 'La lección de la higuera',
    'stay-awake': 'Velad',
    'ten-virgins': 'Las diez vírgenes',
    'sheep-goats': 'Las ovejas y los cabritos',
    'judas-agrees': 'Judas se compromete a entregar a Jesús',
    'passover-preparation': 'La preparación de la Pascua',
    footwashing: 'Jesús lava los pies de los discípulos',
    'betrayer-foretold': 'Anuncio de la traición',
    'lords-supper': 'La Cena del Señor',
    'dispute-greatness': 'Disputa en la mesa sobre quién es el mayor',
    'new-commandment': 'Un mandamiento nuevo',
    'denial-foretold': 'Jesús anuncia la negación de Pedro',
    'two-swords': 'Bolsa, alforja y espada',
    'way-truth-life': 'El camino, la verdad y la vida; el Consolador prometido',
    'true-vine': 'La vid verdadera',
    'worlds-hatred': 'El aborrecimiento del mundo',
    'spirit-joy': 'La obra del Espíritu; la tristeza se convertirá en gozo',
    'jesus-prays': 'La oración de Jesús por sus discípulos',
    gethsemane: 'Gethsemaní',
    arrest: 'El arresto de Jesús',
    'before-high-priest': 'Jesús ante el sumo sacerdote',
    'peters-denials': 'Las negaciones de Pedro',
    'judas-death': 'La muerte de Judas',
    'before-pilate': 'Jesús ante Pilato',
    'before-herod': 'Jesús ante Herodes',
    sentenced: 'Barrabás liberado; Jesús condenado',
    'soldiers-mock': 'Los soldados se burlan de Jesús',
    crucifixion: 'La crucifixión',
    death: 'La muerte de Jesús',
    burial: 'La sepultura de Jesús',
    guard: 'La guardia ante el sepulcro',
    'empty-tomb': 'El sepulcro vacío',
    'mary-magdalene': 'Jesús se aparece a María Magdalena',
    'guards-report': 'El informe de la guardia',
    emmaus: 'El camino a Emmaús',
    'appears-disciples': 'Jesús se aparece a los discípulos',
    thomas: 'Jesús y Tomás',
    'purpose-of-john': 'Para que creáis',
    'great-commission': 'La Gran Comisión',
    ascension: 'La ascensión',
    'by-the-sea': 'Desayuno junto al mar de Tiberias',
    'peter-restored': 'Pedro restaurado; el discípulo amado',
  },

  notes: {
    genealogy:
      'Mateo abre su Evangelio con la genealogía y la sigue hacia adelante desde Abraham; Lucas la sitúa después del bautismo y la remonta hasta Adam.',
    'baptist-imprisoned':
      'Lucas cierra la historia de Juan antes del bautismo de Jesús. Mateo y Marcos narran el arresto más tarde, como un recuerdo del pasado (Mateo 14:3-5; Marcos 6:17-20).',
    baptism:
      'El Evangelio de Juan no narra el bautismo en sí; da el testimonio de Juan el Bautista, que vio al Espíritu descender y permanecer sobre Jesús.',
    'temple-cleansing':
      'Juan lo sitúa en la primera Pascua del ministerio de Jesús (Juan 2:13). Mateo, Marcos y Lucas lo sitúan en la última semana, justo después de la entrada en Jerusalem.',
    'officials-son':
      'Se compara a menudo con la curación del siervo del centurión (Mateo 8:5-13; Lucas 7:1-10): una curación a distancia, en Capernaum, para un hombre con autoridad.',
    'nazareth-rejection':
      'Lucas traslada esta escena al comienzo del ministerio público de Jesús, donde su lectura de Isaías 61 traza el perfil de todo lo que sigue. Mateo y Marcos la sitúan cuando el ministerio en Galilea ya está bien avanzado.',
    'calling-fishermen':
      'El relato de Lucas incluye la gran pesca y viene después de que Jesús ya ha sanado a la suegra de Simón (Lucas 4:38-39). Juan 1:35-51 describe un encuentro anterior.',
    beatitudes:
      'Mateo sitúa el sermón en un monte; Lucas, «en un lugar llano» (Lucas 6:17). Lucas une cuatro bienaventuranzas con cuatro ayes.',
    'lords-prayer':
      'Mateo sitúa la oración dentro del Sermón del Monte; Lucas presenta a Jesús enseñándola durante el viaje, cuando un discípulo le pide: «Señor, enséñanos á orar».',
    'sinful-woman':
      'Una unción distinta de la de Bethania en la última semana (Mateo 26:6-13; Marcos 14:3-9; Juan 12:1-8), situada en Galilea, en casa de un fariseo.',
    'feeding-5000': 'Aparte de la resurrección, el único milagro narrado en los cuatro Evangelios.',
    'words-eternal-life':
      'La confesión de Pedro en el Evangelio de Juan. Compárese la confesión en Cesarea de Filipo (Mateo 16:13-20; Marcos 8:27-30; Lucas 9:18-21).',
    'adulterous-woman':
      'Juan 7:53-8:11 no se encuentra en los manuscritos griegos más antiguos de Juan, y muchas traducciones lo imprimen entre corchetes.',
    'great-commandment':
      'Lucas sitúa este diálogo durante el viaje, donde da paso a la parábola del buen samaritano. En Mateo y Marcos es uno de los últimos debates en el templo.',
    'woes-at-dinner':
      'Gran parte de esto corresponde a la denuncia de los escribas y fariseos en Mateo 23, que Mateo sitúa en el templo en la última semana.',
    'watchful-servants': 'Compárese Mateo 24:42-44 y Marcos 13:33-37.',
    'lament-jerusalem':
      'Lucas sitúa el lamento durante el viaje, antes de que Jesús llegue a la ciudad; Mateo lo sitúa en el templo en la última semana.',
    'day-son-of-man': 'Compárese Mateo 24:23-28, 37-41.',
    'james-john-request':
      'Lucas tiene una disputa parecida sobre quién es el mayor en la Última Cena (Lucas 22:24-30).',
    plot: 'Juan vincula la decisión del concilio directamente con la resurrección de Lázaro.',
    'bethany-anointing':
      'Juan la sitúa seis días antes de la Pascua, antes de la entrada en Jerusalem; Mateo y Marcos, dos días antes, después de ella. Lucas 7:36-50 narra una unción distinta.',
    'fig-tree':
      'Marcos coloca la historia de la higuera antes y después de la purificación del templo; Mateo la narra de una sola vez, a la mañana siguiente.',
    footwashing:
      'En Mateo, Marcos y Lucas la última cena es una comida de Pascua (Marcos 14:12). Juan la sitúa «antes de la fiesta de la Pascua» (Juan 13:1), con la crucifixión en «la víspera de la Pascua» (Juan 19:14).',
    'betrayer-foretold': 'Lucas sitúa el anuncio después del pan y del vaso; Mateo y Marcos, antes.',
    'lords-supper':
      'Juan no tiene relato del pan y del vaso en la cena; en su lugar narra el lavamiento de los pies (Juan 13:1-20).',
    'before-high-priest': 'Solo Juan describe una audiencia ante Anás, suegro del sumo sacerdote Caifás.',
    'judas-death': 'Compárese Hechos 1:18-19.',
    sentenced:
      'Juan señala la hora: «la víspera de la Pascua, y como la hora de sexta» (Juan 19:14). Marcos dice que fue crucificado a «la hora de las tres» (Marcos 15:25), es decir, la hora tercera.',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Forms as they occur in the RV1909, including its enclitic verbs (díjoles, dícele)
  // and archaic spellings; accents are folded before matching, so fué and fue are one.
  // Content words that look common (Jesús, Señor, discípulos, panes) are kept out on
  // purpose: they are exactly what the shading should show.
  stopWords: `que los las del por con como para mas pues porque entonces cuando donde así aun sino empero
  también ellos ellas les sus nos vosotros nosotros este esta esto estos estas ese esa eso esos esas aquel aquella
  aquello aquellos aquellas una uno unos unas otro otra otros otras todo toda todos todas cual cuales quien quienes
  cualquiera mismo misma tanto cuanto sobre entre hasta desde hacia contra sin delante dentro junto aquí allí ahora
  luego fue fueron era eran son ser sido sea sean fuese fuere fuera estaba estaban está están estando había habían
  habiendo has han hay hemos habéis tiene tienen tenía dijo dijeron dice dicen decía decían diciendo dicho díjole
  díjoles dícele díceles respondiendo respondió mis tus vuestro vuestra vuestros vuestras nuestro nuestra ella
  soy eres sois será serán muy bien vez qué cómo vino vinieron aconteció también cierto`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default es;
