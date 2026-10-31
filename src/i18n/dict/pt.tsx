import type { Dict } from '../dict';
import { formatRange } from '../../lib/refs';

// Brazilian Portuguese, addressing the reader as "você" as the Bíblia Portuguesa
// Mundial itself does (Peçam, Vigiem). Proper names follow its spelling (Cafarnaum,
// Betânia, Getsêmani, Belzebu, Tiago, Tomé), so title, note and text agree.

const LONGER_ENDING =
  'Os dois manuscritos gregos completos mais antigos de Marcos terminam em 16:8. Marcos 16:9-20 está impresso na Bíblia Portuguesa Mundial, mas é amplamente considerado um acréscimo posterior.';

const secoes = (n: number) => `${n} ${n === 1 ? 'seção' : 'seções'}`;

const pt: Dict = {
  siteName: 'Paralelos dos Evangelhos',
  tagline: 'Os quatro Evangelhos, lado a lado',
  nav: { sections: 'Seções', order: 'Ordem', book: 'Livro', about: 'Sobre' },
  language: 'Idioma',
  lookup: { label: 'Encontrar uma passagem', placeholder: 'Encontre uma passagem, p. ex. Lucas 15:11-32', go: 'Ir' },
  loading: 'Carregando os Evangelhos…',
  loadFailed: (message) => (
    <>
      <strong>Não foi possível carregar o texto dos Evangelhos.</strong> {message}. Tente recarregar a página.
    </>
  ),
  footer: (link, licence) => <>Escrituras da {link} ({licence.toLowerCase()}).</>,
  publicDomain: 'Domínio público',

  home: {
    intro:
      'Escolha uma seção para ler todos os seus relatos em colunas paralelas, ou digite qualquer passagem na caixa acima para encontrar seus paralelos. Cada coluna mostra onde aquele Evangelho situa a história, com as seções que vêm antes e depois.',
    filterGroup: 'Filtrar seções',
    filterLabel: 'Filtrar seções pelo título',
    filterPlaceholder: 'Filtrar pelo título, p. ex. cura',
    order: 'Ordem',
    harmony: 'Harmonia (todas as seções)',
    asTold: (g) => `Segundo ${g}`,
    onlyShared: 'Em mais de um Evangelho',
    count: (n, total) => `${n} de ${secoes(total)}`,
    noMatch: (f) => `Nenhum título de seção corresponde a “${f}”. Tente usar a caixa de passagens acima.`,
  },

  reader: {
    notFound: (id) => `Não existe nenhuma seção chamada “${id}”.`,
    seeAll: 'Ver todas as seções',
    shade: 'Sombrear palavras compartilhadas',
    numbers: 'Números dos versículos',
    copyAll: 'Copiar tudo',
    copy: 'Copiar',
    copied: 'Copiado',
    copyFailed: 'Falha ao copiar',
    print: 'Imprimir',
    shadeIntro: 'As palavras encontradas em mais de um relato ficam sombreadas:',
    in2: 'em 2',
    in3: 'em 3',
    in4: 'nos 4',
    shadeCaveat:
      'Isto compara palavras em português de uma só tradução, não o grego; por isso é uma indicação para os olhos, e não uma análise.',
    jumpLabel: 'Ir para um Evangelho',
    notIn: (names) => `Não aparece em ${names}.`,
    omitted: (t) => `Este versículo não está incluído no texto da ${t}.`,
    sectionOf: (i, n, g) => `Seção ${i} de ${n} em ${g}`,
    beginning: (g) => `Início de ${g}`,
    end: (g) => `Fim de ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> está nesta seção. Os versículos que você procurou estão {mark('sombreados assim')}.
      </>
    ),
    spans: (n, g) => `Esta passagem se estende por ${n} seções de ${g}. Escolha uma para lê-la ao lado de seus paralelos.`,
    notFound: (q) => `Não foi possível encontrar “${q}”.`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `Digite uma passagem como “${names.mark} 4:35-41”.`;
        case 'not-gospel':
          return `“${p.word}” não é um dos quatro Evangelhos. Tente ${names.matthew}, ${names.mark}, ${names.luke} ou ${names.john}.`;
        case 'no-chapter-given':
          return `Acrescente um capítulo, p. ex. “${names[p.gospel]} 1”.`;
        case 'no-chapter':
          return p.gospel ? `${names[p.gospel]} não tem capítulo ${p.chapter}` : `o capítulo ${p.chapter} não existe`;
        case 'verse-count':
          return `${names[p.gospel]} ${p.chapter} tem ${p.verses} versículos, não ${p.verse}`;
        case 'backwards':
          return `${formatRange(p.range)} está em ordem inversa`;
        case 'unreadable':
          return `não foi possível ler “${p.text}”`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `Ordem: ${a} e ${b}`,
    title: 'Onde cada Evangelho situa a história',
    intro:
      'Cada coluna lista as seções de um Evangelho do começo ao fim, na ordem em que aquele Evangelho as conta. Uma linha liga uma seção à mesma seção no outro Evangelho. Onde as linhas se cruzam, os dois Evangelhos contam esses acontecimentos em ordem diferente.',
    left: 'Esquerda',
    right: 'Direita',
    summary: (a, na, b, nb, both) =>
      `${a} tem ${secoes(na)} e ${b} tem ${nb}; ${both === 1 ? 'uma está' : `${both} estão`} em ambos.`,
    same: 'Os dois Evangelhos contam todas as seções que têm em comum na mesma ordem.',
    one: 'Uma única seção explica a diferença de ordem. Deixando-a de lado, os dois Evangelhos contam tudo o mais que têm em comum na mesma sequência:',
    many: (n) =>
      `Estas ${n} seções explicam as diferenças de ordem. Deixando-as de lado, os dois Evangelhos contam tudo o mais que têm em comum na mesma sequência:`,
    position: (pa, na, a, pb, nb, b) => `— seção ${pa} de ${na} em ${a}, ${pb} de ${nb} em ${b}`,
    tie: 'Quando duas explicações são igualmente simples (um Evangelho antecipou uma história, ou o outro adiou a vizinha?), só uma é listada; por isso leia a lista como “onde a ordem difere”, e não como “o que o escritor mudou de lugar”.',
    legend: {
      label: 'Legenda',
      same: 'A mesma seção nos dois Evangelhos',
      notable: 'Uma seção da lista acima, contada em outro momento',
      focus: 'A seção que você está apontando',
      sample: 'Título',
      both: 'Também no outro Evangelho (a barra tem a cor da sua própria coluna)',
      only: 'Só neste Evangelho, por isso sem linha',
    },
    lane: (g) => `${g} em ordem`,
  },

  // Two separate paragraphs on purpose: the sentence about blessing God and the
  // sentence about Darrell must never share a phrase, and the second names its
  // subject ("O site") so "ele" cannot be read back to the Son. He is alive, so no
  // wording of homage or memorial ("em homenagem", "em memória").
  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>Sobre este site</h1>
      <p>
        Este site é oferecido para bendizer o Deus Todo-Poderoso, cuja Palavra ele coloca diante do leitor, e cujo
        Filho estes quatro Evangelhos proclamam.
      </p>
      <p>
        O site foi feito para Darrell W. Johnson, que prega Jesus Cristo e o seu evangelho há mais de cinquenta anos:
        como pastor na Califórnia, na Union Church of Manila e na First Baptist Church de Vancouver, e como professor
        de pregadores no Fuller Theological Seminary, no Regent College e no Carey Theological College. Hoje ele serve
        na The Way Church e com The Pastorate Ministries Canada. É autor de <cite>The Glory of Preaching</cite>,{' '}
        <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>, <cite>The Beatitudes</cite> e outros livros.
      </p>
      <p>
        A pregação dele começa onde esta ferramenta começa: permanecendo no texto e deixando que ele diga o que diz. O
        site nasceu de um projeto que Darrell e sua família começaram juntos, comparando a ordem dos acontecimentos em
        Mateus, Marcos e Lucas com a ordem em João.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Sermões, livros e ensino de Darrell →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>Como usar</h2>
        <ul>
          <li>
            <strong>Ler uma seção.</strong> Escolha qualquer seção da <a href={href.home()}>lista</a> para ver lado a
            lado o relato de cada Evangelho. Abaixo de cada coluna estão as seções que vêm logo antes e logo depois
            naquele Evangelho, para que você possa ler a história no seu próprio contexto.
          </li>
          <li>
            <strong>Procurar uma passagem.</strong> Digite uma referência como{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> ou{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. A ferramenta abre a seção que a contém,
            com os versículos que você procurou marcados.
          </li>
          <li>
            <strong>Comparar a ordem.</strong> A página <a href={href.order('mark', 'john')}>Ordem</a> coloca dois
            Evangelhos lado a lado e liga as seções que eles têm em comum, para que você veja onde um Evangelho situa um
            acontecimento num momento diferente do outro.
          </li>
          <li>
            <strong>Sombrear palavras compartilhadas</strong> sombreia as palavras que aparecem em mais de um relato.
            Compara palavras em português de uma só tradução, não o grego; por isso é uma indicação para os olhos, e não
            uma análise.
          </li>
          <li>
            <strong>Imprimir como livro.</strong> A página <a href={href.book()}>Livro</a> reúne todas as seções num só
            volume, para imprimir ou baixar em PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cores e marcas</h2>
        <ul className="color-key">
          <li>
            Cada Evangelho mantém a sua própria cor em todo o site:{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> e{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. Essa cor marca o topo de cada
            coluna, o nome do Evangelho e as suas referências na lista de seções.
          </li>
          <li>
            <span className="verse target">O sombreado cinza-azulado</span> marca os versículos que você procurou.
          </li>
          <li>
            Com <strong>Sombrear palavras compartilhadas</strong> ativado, um sombreado dourado marca as palavras
            encontradas em mais de um relato: <mark className="hl2">em dois</mark>, <mark className="hl3">em três</mark>
            , <mark className="hl4">nos quatro</mark>.
          </li>
          <li>
            Na página Ordem, uma linha cinza liga uma seção à mesma seção no outro Evangelho; uma linha{' '}
            <strong className="purple">roxa</strong> marca uma seção contada em outro momento; uma linha escura é a que
            você está apontando. Um título em cinza, sem linha, só se encontra naquele Evangelho.
          </li>
        </ul>
      </section>

      <section>
        <h2>Por que a ordem é diferente</h2>
        <p>
          {names.matthew}, {names.mark} e {names.luke} (os Evangelhos “sinóticos”) têm em comum boa parte da sua ordem:
          um ministério na Galileia e depois uma única viagem a Jerusalém para a última semana. {names.john} vai e vem
          entre a Galileia e Jerusalém várias vezes, e menciona três Páscoas ({names.john} 2:13; 6:4; 11:55). As
          diferenças mais conhecidas são a purificação do templo, que {names.john} situa no início do ministério e os
          outros na última semana, e o momento da Última Ceia e da crucificação em relação à Páscoa.
        </p>
        <p>
          Os escritores dos Evangelhos organizaram o seu material para proclamar quem Jesus é, e não só para manter um
          diário; por isso uma diferença de ordem é um convite a perguntar o que cada escritor nos mostra ao situar uma
          história onde a situa.
        </p>
      </section>

      <section>
        <h2>Sobre o texto e as seções</h2>
        <p>
          As Escrituras são da {translation} ({licence.toLowerCase()}), tomadas sem alterações de{' '}
          <a href="https://ebible.org/">eBible.org</a>. {attribution} A tradução inclui alguns versículos que não constam dos
          manuscritos mais antigos, como {names.mark} 16:9-20 e {names.john} 7:53-8:11; as seções correspondentes
          indicam isso.
        </p>
        <p>
          A divisão em seções e a escolha de quais passagens contam como paralelas são decisões editoriais, que seguem
          de modo geral as sinopses tradicionais dos Evangelhos. Cada versículo dos quatro Evangelhos pertence a uma
          única seção, de modo que qualquer passagem que você procurar será encontrada. Onde {names.matthew} ou{' '}
          {names.luke} usa um dito em dois lugares, só um deles está ligado, e as notas da seção indicam o outro.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Livro',
    heading: 'O site inteiro em forma de livro',
    intro:
      'Todas as seções, em ordem de harmonia, num só volume para imprimir ou guardar: com a dedicatória, um sumário e, no final, um índice de passagens para que qualquer versículo possa ser encontrado.',
    download: (pages, mb) => `Baixar o PDF (${pages} páginas, ${mb} MB)`,
    paper: (size) => `O PDF está no tamanho ${size}. Se você imprimir pelo navegador, será usado o seu próprio tamanho de papel.`,
    print: 'Imprimir pelo navegador',
    notBuilt: 'O PDF é gerado quando o site é publicado, por isso esta cópia do site não tem um.',
    scripture: (t) => `Escrituras: ${t}`,
    howToHeading: 'Como ler este livro',
    HowTo: ({ names }) => (
      <>
        <p>
          Cada seção coloca lado a lado os relatos dos Evangelhos sobre um mesmo acontecimento ou ensino, uma coluna
          por Evangelho. As seções são numeradas (§) em ordem de harmonia: aproximadamente a ordem dos acontecimentos,
          tal como as sinopses tradicionais dos Evangelhos a organizam. Quando um Evangelho não conta uma história, a
          seção indica isso.
        </p>
        <p>
          Uma barra colorida no topo de cada coluna indica o seu Evangelho:{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          Para encontrar uma passagem, procure o capítulo e o versículo no índice no final, que dá o número da seção.
          As mesmas seções estão em gospels.yhwh.rest, onde você também pode comparar a ordem em que dois Evangelhos
          contam a sua história.
        </p>
      </>
    ),
    contents: 'Sumário',
    indexHeading: 'Índice de passagens',
    indexIntro:
      'Cada versículo dos quatro Evangelhos pertence a uma única seção. Procure o capítulo e o versículo sob o seu Evangelho e vá até o número da seção.',
    creditsHeading: 'Sobre este livro',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          As Escrituras são da {translation} ({licence.toLowerCase()}), tomadas sem alterações de eBible.org.{' '}
          {attribution}
        </p>
        <p>
          A divisão em seções e a escolha dos paralelos são decisões editoriais, que seguem de modo geral as sinopses
          tradicionais dos Evangelhos.
        </p>
        <p>Feito a partir de gospels.yhwh.rest em {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  titles: {
    'prologue-word': 'O Verbo se fez carne',
    'luke-preface': 'O prólogo de Lucas a Teófilo',
    'john-birth-foretold': 'O anúncio do nascimento de João Batista',
    annunciation: 'O anjo Gabriel visita Maria',
    magnificat: 'Maria visita Isabel; o Magnificat',
    'john-birth': 'O nascimento de João Batista; o Benedictus',
    genealogy: 'A genealogia de Jesus',
    birth: 'O nascimento de Jesus',
    shepherds: 'Os pastores',
    presentation: 'A apresentação no templo; Simeão e Ana',
    magi: 'A visita dos magos',
    'flight-egypt': 'A fuga para o Egito; a matança dos inocentes',
    'return-nazareth': 'A volta para Nazaré',
    'boy-in-temple': 'O menino Jesus no templo',
    'baptist-preaching': 'A pregação de João Batista',
    'baptist-imprisoned': 'João Batista é preso',
    baptism: 'O batismo de Jesus',
    temptation: 'A tentação no deserto',
    'first-disciples-john': 'Os primeiros discípulos (João)',
    cana: 'As bodas de Caná',
    'temple-cleansing': 'A purificação do templo',
    nicodemus: 'Jesus e Nicodemos',
    'baptist-final-testimony': 'O último testemunho de João Batista',
    'samaritan-woman': 'A mulher samaritana',
    'galilee-begins': 'Jesus volta para a Galileia',
    'officials-son': 'A cura do filho de um oficial do rei',
    'nazareth-rejection': 'Jesus é rejeitado em Nazaré',
    'calling-fishermen': 'O chamado dos primeiros discípulos',
    'capernaum-synagogue': 'Ensino na sinagoga de Cafarnaum',
    'peters-mother-in-law': 'A cura da sogra de Pedro; curas ao entardecer',
    'preaching-tour': 'Jesus percorre a Galileia pregando',
    leper: 'A cura de um leproso',
    paralytic: 'A cura de um paralítico',
    levi: 'O chamado de Levi (Mateus); Jesus come com pecadores',
    'fasting-question': 'A pergunta sobre o jejum',
    'grain-sabbath': 'Espigas colhidas no sábado',
    'withered-hand': 'A cura do homem da mão ressequida',
    'crowds-by-sea': 'As multidões vão a Jesus; o servo escolhido',
    'choosing-twelve': 'A escolha dos Doze',
    bethesda: 'A cura no tanque de Betesda',
    'authority-of-son': 'A autoridade do Filho; testemunhas de Jesus',
    beatitudes: 'As bem-aventuranças',
    'salt-light': 'O sal e a luz',
    'law-fulfilled': 'Jesus cumpre a Lei',
    'greater-righteousness': 'A ira, o adultério, o divórcio e os juramentos',
    'love-enemies': 'A vingança e o amor aos inimigos',
    'piety-in-secret': 'Dar, orar e jejuar em secreto',
    'lords-prayer': 'O Pai-Nosso',
    'treasure-heaven': 'Tesouros no céu',
    'lamp-of-body': 'A lâmpada do corpo',
    'two-masters': 'Ninguém pode servir a dois senhores',
    'do-not-worry': 'Não andem ansiosos',
    judging: 'Não julgar os outros',
    'ask-seek-knock': 'Peçam, busquem, batam; a regra de ouro',
    'two-foundations': 'Dois caminhos, duas árvores, dois alicerces',
    centurion: 'A cura do servo do centurião',
    'widow-nain': 'A ressurreição do filho da viúva de Naim',
    'baptist-question': 'A pergunta de João Batista; o testemunho de Jesus sobre João',
    'sinful-woman': 'Uma mulher pecadora unge Jesus',
    'women-followers': 'As mulheres que seguiam Jesus',
    'woes-cities': 'Ais sobre as cidades da Galileia',
    thanksgiving: 'Jesus dá graças; venham a mim',
    beelzebul: 'A controvérsia sobre Belzebu',
    'sign-of-jonah': 'O sinal de Jonas',
    'unclean-spirit-returns': 'A volta do espírito imundo',
    'true-blessedness': 'A verdadeira bem-aventurança',
    'true-family': 'A verdadeira família de Jesus',
    sower: 'A parábola do semeador',
    'why-parables': 'O propósito das parábolas',
    'sower-explained': 'A explicação da parábola do semeador',
    'lamp-measure': 'A candeia debaixo do cesto; a medida que vocês usam',
    'seed-growing': 'A semente que cresce sozinha',
    weeds: 'O trigo e o joio',
    'mustard-leaven': 'O grão de mostarda e o fermento',
    'use-of-parables': 'Jesus fala por parábolas',
    'weeds-explained': 'A explicação da parábola do joio',
    'treasure-pearl-net': 'O tesouro escondido, a pérola, a rede',
    'would-be-followers': 'Os que queriam seguir Jesus',
    'calming-storm': 'Jesus acalma a tempestade',
    gerasene: 'O endemoninhado gadareno',
    jairus: 'A filha de Jairo e a mulher que tocou em seu manto',
    'two-blind-mute': 'Dois cegos; um mudo',
    harvest: 'A seara é grande',
    'sending-twelve': 'Jesus envia os Doze',
    persecution: 'As perseguições que virão',
    'do-not-fear': 'Não tenham medo',
    'not-peace': 'Não paz, mas espada',
    'herod-baptist-death': 'Herodes e a morte de João Batista',
    'feeding-5000': 'A alimentação dos cinco mil',
    'walking-water': 'Jesus anda sobre as águas',
    gennesaret: 'Curas em Genesaré',
    'bread-of-life': 'O pão da vida',
    'words-eternal-life': 'Muitos voltam atrás; “Tu tens as palavras de vida eterna”',
    'tradition-elders': 'A tradição dos anciãos; o que contamina',
    'canaanite-woman': 'A mulher cananeia (siro-fenícia)',
    'deaf-man': 'A cura de um surdo-mudo; muitas curas',
    'feeding-4000': 'A alimentação dos quatro mil',
    'demand-sign': 'Pedem um sinal',
    'leaven-pharisees': 'O fermento dos fariseus',
    'bethsaida-blind': 'Um cego em Betsaida',
    'peters-confession': 'A confissão de Pedro',
    'first-prediction': 'Primeiro anúncio da paixão; tomar a cruz',
    transfiguration: 'A transfiguração',
    'boy-unclean-spirit': 'A cura de um menino com um espírito imundo',
    'second-prediction': 'Segundo anúncio da paixão',
    'temple-tax': 'O imposto do templo',
    greatest: 'Quem é o maior?',
    'strange-exorcist': 'Quem não é contra nós',
    stumbling: 'Ocasiões de tropeço',
    'lost-sheep': 'A ovelha perdida',
    'forgive-brother': 'Corrigir e perdoar o irmão',
    'unforgiving-servant': 'O servo que não quis perdoar',
    'tabernacles-1': 'Na Festa dos Tabernáculos',
    'tabernacles-2': 'Será este o Cristo? Rios de água viva',
    'adulterous-woman': 'A mulher apanhada em adultério',
    'light-of-world': 'A luz do mundo',
    'before-abraham': 'A verdade os libertará; antes que Abraão existisse',
    'man-born-blind': 'A cura do cego de nascença',
    'good-shepherd': 'O bom pastor',
    dedication: 'Na Festa da Dedicação',
    'samaritan-village': 'Uma aldeia samaritana rejeita Jesus',
    'sending-seventy': 'Jesus envia os setenta',
    'seventy-return': 'A volta dos setenta',
    'great-commandment': 'O grande mandamento',
    'good-samaritan': 'O bom samaritano',
    'mary-martha': 'Marta e Maria',
    'friend-midnight': 'O amigo à meia-noite',
    'woes-at-dinner': 'Ais à mesa de um fariseu',
    'rich-fool': 'O rico insensato',
    'watchful-servants': 'Os servos vigilantes',
    'faithful-servant': 'O servo fiel e o servo infiel',
    'interpreting-times': 'Discernir os tempos; reconciliar-se no caminho',
    'repent-fig-tree': 'Arrepender-se ou perecer; a figueira estéril',
    'crippled-woman': 'A cura de uma mulher encurvada no sábado',
    'narrow-door': 'A porta estreita',
    'lament-jerusalem': 'O lamento sobre Jerusalém',
    dropsy: 'A cura de um homem com hidropisia',
    'places-at-table': 'Os lugares à mesa; quem convidar',
    'great-banquet': 'A grande ceia; a festa de casamento',
    'cost-discipleship': 'O preço do discipulado',
    'lost-coin': 'A moeda perdida',
    'prodigal-son': 'O filho pródigo e seu irmão',
    'shrewd-manager': 'O administrador astuto',
    'law-and-divorce': 'A Lei e o Reino; o divórcio',
    'rich-man-lazarus': 'O rico e Lázaro',
    'faith-duty': 'Fé como um grão de mostarda; servos indignos',
    'ten-lepers': 'Os dez leprosos',
    'day-son-of-man': 'O dia do Filho do Homem',
    'persistent-widow': 'A viúva persistente',
    'pharisee-tax-collector': 'O fariseu e o publicano',
    divorce: 'O casamento e o divórcio',
    children: 'Jesus abençoa as crianças',
    'rich-young-man': 'O jovem rico',
    'vineyard-workers': 'Os trabalhadores da vinha',
    'third-prediction': 'Terceiro anúncio da paixão',
    'james-john-request': 'O pedido de Tiago e João',
    bartimaeus: 'A cura do cego Bartimeu',
    zacchaeus: 'Zaqueu',
    talents: 'Os talentos; as minas',
    lazarus: 'A ressurreição de Lázaro',
    plot: 'A conspiração para matar Jesus',
    'bethany-anointing': 'A unção em Betânia',
    'triumphal-entry': 'A entrada em Jerusalém',
    'weeping-jerusalem': 'Jesus chora sobre Jerusalém',
    'greeks-seek': 'Alguns gregos procuram Jesus; chegou a hora',
    unbelief: 'A incredulidade, e um último apelo',
    'fig-tree': 'A figueira amaldiçoada',
    'authority-questioned': 'A autoridade de Jesus é questionada',
    'two-sons': 'Os dois filhos',
    'wicked-tenants': 'Os lavradores maus',
    caesar: 'O tributo a César',
    'resurrection-question': 'Os saduceus e a ressurreição',
    'davids-son': 'De quem o Cristo é filho?',
    'woes-scribes': 'Ais sobre os escribas e fariseus',
    'widows-offering': 'A oferta da viúva',
    'signs-of-end': 'A destruição do templo; sinais do fim',
    desolation: 'A abominação da desolação; o grande sofrimento',
    'son-of-man-coming': 'A vinda do Filho do Homem',
    'lesson-fig-tree': 'A lição da figueira',
    'stay-awake': 'Vigiem',
    'ten-virgins': 'As dez virgens',
    'sheep-goats': 'As ovelhas e os bodes',
    'judas-agrees': 'Judas combina trair Jesus',
    'passover-preparation': 'A preparação da Páscoa',
    footwashing: 'Jesus lava os pés dos discípulos',
    'betrayer-foretold': 'O anúncio da traição',
    'lords-supper': 'A Ceia do Senhor',
    'dispute-greatness': 'A discussão à mesa sobre quem é o maior',
    'new-commandment': 'Um novo mandamento',
    'denial-foretold': 'Jesus prediz a negação de Pedro',
    'two-swords': 'Bolsa, alforje e espada',
    'way-truth-life': 'O caminho, a verdade e a vida; o Consolador prometido',
    'true-vine': 'A videira verdadeira',
    'worlds-hatred': 'O ódio do mundo',
    'spirit-joy': 'A obra do Espírito; a tristeza se transformará em alegria',
    'jesus-prays': 'A oração de Jesus por seus discípulos',
    gethsemane: 'Getsêmani',
    arrest: 'A prisão de Jesus',
    'before-high-priest': 'Jesus diante do sumo sacerdote',
    'peters-denials': 'As negações de Pedro',
    'judas-death': 'A morte de Judas',
    'before-pilate': 'Jesus diante de Pilatos',
    'before-herod': 'Jesus diante de Herodes',
    sentenced: 'Barrabás é solto; Jesus é condenado',
    'soldiers-mock': 'Os soldados zombam de Jesus',
    crucifixion: 'A crucificação',
    death: 'A morte de Jesus',
    burial: 'O sepultamento de Jesus',
    guard: 'A guarda no sepulcro',
    'empty-tomb': 'O sepulcro vazio',
    'mary-magdalene': 'Jesus aparece a Maria Madalena',
    'guards-report': 'O relato dos guardas',
    emmaus: 'O caminho de Emaús',
    'appears-disciples': 'Jesus aparece aos discípulos',
    thomas: 'Jesus e Tomé',
    'purpose-of-john': 'Para que vocês creiam',
    'great-commission': 'A Grande Comissão',
    ascension: 'A ascensão',
    'by-the-sea': 'Café da manhã junto ao mar de Tiberíades',
    'peter-restored': 'Pedro é restaurado; o discípulo amado',
  },

  notes: {
    genealogy:
      'Mateus abre o seu Evangelho com a genealogia e a acompanha para a frente a partir de Abraão; Lucas a coloca depois do batismo e a remonta até Adão.',
    'baptist-imprisoned':
      'Lucas encerra a história de João antes do batismo de Jesus. Mateus e Marcos contam a prisão mais tarde, em retrospectiva (Mateus 14:3-5; Marcos 6:17-20).',
    baptism:
      'O Evangelho de João não narra o batismo em si; traz o testemunho de João Batista, que viu o Espírito descer e permanecer sobre Jesus.',
    'temple-cleansing':
      'João a situa na primeira Páscoa do ministério de Jesus (João 2:13). Mateus, Marcos e Lucas a situam na última semana, logo depois da entrada em Jerusalém.',
    'officials-son':
      'Muitas vezes comparada à cura do servo do centurião (Mateus 8:5-13; Lucas 7:1-10): uma cura a distância, em Cafarnaum, em favor de um homem de autoridade.',
    'nazareth-rejection':
      'Lucas transfere esta cena para o início do ministério público de Jesus, onde a leitura que ele faz de Isaías 61 traça o perfil de tudo o que vem depois. Mateus e Marcos a situam quando o ministério na Galileia já está bem adiantado.',
    'calling-fishermen':
      'O relato de Lucas inclui a grande pesca e vem depois que Jesus já curou a sogra de Simão (Lucas 4:38-39). João 1:35-51 descreve um encontro anterior.',
    beatitudes:
      'Mateus situa o sermão num monte; Lucas, “num lugar plano” (Lucas 6:17). Lucas une quatro bem-aventuranças a quatro ais.',
    'lords-prayer':
      'Mateus situa a oração dentro do Sermão do Monte; Lucas mostra Jesus ensinando-a durante a viagem, quando um discípulo lhe pede: “Senhor, ensina-nos a orar”.',
    'sinful-woman':
      'Uma unção diferente daquela em Betânia na última semana (Mateus 26:6-13; Marcos 14:3-9; João 12:1-8), situada na Galileia, na casa de um fariseu.',
    'feeding-5000': 'Além da ressurreição, o único milagre narrado nos quatro Evangelhos.',
    'words-eternal-life':
      'A confissão de Pedro no Evangelho de João. Compare com a confissão em Cesareia de Filipe (Mateus 16:13-20; Marcos 8:27-30; Lucas 9:18-21).',
    'adulterous-woman':
      'João 7:53-8:11 não se encontra nos manuscritos gregos mais antigos de João, e muitas traduções o imprimem entre colchetes.',
    'great-commandment':
      'Lucas situa este diálogo durante a viagem, onde ele conduz à parábola do bom samaritano. Em Mateus e Marcos é um dos últimos debates no templo.',
    'woes-at-dinner':
      'Boa parte disto corresponde à denúncia dos escribas e fariseus em Mateus 23, que Mateus situa no templo na última semana.',
    'watchful-servants': 'Compare com Mateus 24:42-44 e Marcos 13:33-37.',
    'lament-jerusalem':
      'Lucas situa o lamento durante a viagem, antes de Jesus chegar à cidade; Mateus o situa no templo na última semana.',
    'day-son-of-man': 'Compare com Mateus 24:23-28, 37-41.',
    'james-john-request':
      'Lucas traz uma discussão semelhante sobre quem é o maior na Última Ceia (Lucas 22:24-30).',
    plot: 'João liga a decisão do conselho diretamente à ressurreição de Lázaro.',
    'bethany-anointing':
      'João a situa seis dias antes da Páscoa, antes da entrada em Jerusalém; Mateus e Marcos, dois dias antes, depois dela. Lucas 7:36-50 conta uma unção diferente.',
    'fig-tree':
      'Marcos coloca a história da figueira antes e depois da purificação do templo; Mateus a conta de uma só vez, na manhã seguinte.',
    footwashing:
      'Em Mateus, Marcos e Lucas a última ceia é uma refeição da Páscoa (Marcos 14:12). João a situa “antes da festa da Páscoa” (João 13:1), com a crucificação no “Dia da Preparação da Páscoa” (João 19:14).',
    'betrayer-foretold': 'Lucas situa o anúncio depois do pão e do cálice; Mateus e Marcos, antes.',
    'lords-supper':
      'João não tem relato do pão e do cálice na ceia; em seu lugar, ele narra o lava-pés (João 13:1-20).',
    'before-high-priest': 'Só João descreve uma audiência diante de Anás, sogro do sumo sacerdote Caifás.',
    'judas-death': 'Compare com Atos 1:18-19.',
    sentenced:
      'João registra a hora: “o Dia da Preparação da Páscoa, por volta da sexta hora” (João 19:14). Marcos diz que Jesus foi crucificado na “terceira hora” (Marcos 15:25).',
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Forms as they occur in the BPM, including the contractions it uses throughout
  // (dele, nele, daquele, pelo). Accents are folded before matching, so não and nao
  // are one. Content words that look common (Jesus, Senhor, discípulos, pães) are
  // kept out on purpose: they are exactly what the shading should show.
  stopWords: `que ele ela eles elas não para mas pois por com quando seu sua seus suas dos das aos nas nos uma umas
  uns este esta isto esse essa isso esses essas estes estas aquele aquela aqueles aquelas aquilo daquele daquela
  deste desta disso como então também até sobre entre contra sem desde diante dele dela deles delas nele nela neles
  pelo pela pelos pelas lhe lhes mim comigo você vocês nós meu minha meus minhas teu tua teus tuas nosso nossa vosso
  foi foram era eram ser sido seja fosse sendo será serão estava estavam está estão estar havia haviam tem têm tinha
  tinham ter tenho disse disseram diz dizem dizendo diziam dito respondeu responderam assim ainda onde porque
  portanto enquanto qual quais quem todo toda todos todas tudo mesmo mesma mesmos próprio própria outro outra outros
  outras muito muitos muitas mais eis ora ali aqui agora embora quanto sim nem veio vieram chegou chegaram certo`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default pt;
