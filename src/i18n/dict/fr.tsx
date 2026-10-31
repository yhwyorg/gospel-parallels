import type { Dict } from '../dict';
import { BOOKS } from '../books';
import { LOCALE_INFO } from '../locales';
import { formatRange } from '../../lib/refs';

// The dedication and the section tables take no helpers, so the Gospel names come
// straight from the shared table: a hard-coded "Matthieu" here would drift from it.
const N = BOOKS.fr.names;
const TR = LOCALE_INFO.fr.translation.name;

// French counts 0 and 1 as singular.
const sections = (n: number) => `${n} section${n > 1 ? 's' : ''}`;
// toFixed gives "2.5"; French writes the decimal with a comma.
const decimal = (s: string) => s.replace('.', ',');

// Checked against src/data/text/fr.json: Louis Segond 1910 prints Mark 16:9-20 in full.
const LONGER_ENDING = `Les deux plus anciens manuscrits grecs complets de ${N.mark} s’arrêtent à 16:8. ${N.mark} 16:9-20 figure dans la ${TR}, mais il est largement considéré comme un ajout postérieur.`;

const fr: Dict = {
  siteName: 'Synopse des Évangiles',
  tagline: 'Les quatre Évangiles, côte à côte',
  nav: { sections: 'Sections', timeline: 'Chronologie', order: 'Ordre', book: 'Livre', about: 'À propos' },
  language: 'Langue',
  lookup: { label: 'Trouver un passage', placeholder: `Trouver un passage, p. ex. ${N.luke} 15:11-32`, go: 'Aller' },
  loading: 'Chargement des Évangiles…',
  loadFailed: (message) => (
    <>
      <strong>Le texte des Évangiles n’a pas pu être chargé.</strong> {message}. Essayez de recharger la page.
    </>
  ),
  footer: (link, licence) => <>Texte biblique : {link} ({licence.toLowerCase()}).</>,
  publicDomain: 'Domaine public',

  home: {
    intro:
      'Choisissez une section pour en lire tous les récits en colonnes parallèles, ou saisissez un passage dans le champ ci-dessus pour trouver ses parallèles. Chaque colonne montre où cet Évangile place le récit, avec les sections qui le précèdent et qui le suivent.',
    filterGroup: 'Filtrer les sections',
    filterLabel: 'Filtrer les sections par titre',
    filterPlaceholder: 'Filtrer par titre, p. ex. guérison',
    order: 'Ordre',
    harmony: 'Harmonie (toutes les sections)',
    asTold: (g) => `Selon ${g}`,
    onlyShared: 'Dans plus d’un Évangile',
    count: (n, total) => `${sections(n)} sur ${total}`,
    noMatch: (f) => `Aucun titre de section ne correspond à « ${f} ». Essayez plutôt le champ de recherche ci-dessus.`,
  },

  reader: {
    notFound: (id) => `Il n’existe pas de section « ${id} ».`,
    seeAll: 'Voir toutes les sections',
    shade: 'Surligner les mots communs',
    numbers: 'Numéros des versets',
    copyAll: 'Tout copier',
    copy: 'Copier',
    copied: 'Copié',
    copyFailed: 'Échec de la copie',
    print: 'Imprimer',
    shadeIntro: 'Les mots présents dans plus d’un récit sont surlignés :',
    in2: 'dans 2',
    in3: 'dans 3',
    in4: 'dans les 4',
    shadeCaveat:
      'La comparaison porte sur les mots français d’une seule traduction, et non sur le grec : c’est un repère pour l’œil, non une analyse.',
    jumpLabel: 'Aller à un Évangile',
    notIn: (names) => `Ne figure pas dans ${names}.`,
    omitted: (t) => `Ce verset ne figure pas dans le texte de la ${t}.`,
    sectionOf: (i, n, g) => `Section ${i} sur ${n} dans ${g}`,
    beginning: (g) => `Début de ${g}`,
    end: (g) => `Fin de ${g}`,
  },

  passage: {
    found: (ref, mark) => (
      <>
        <strong>{ref}</strong> se trouve dans cette section. Les versets demandés sont {mark('surlignés comme ceci')}.
      </>
    ),
    spans: (n, g) => `Ce passage s’étend sur ${n} sections de ${g}. Choisissez-en une pour la lire avec ses parallèles.`,
    notFound: (q) => `Impossible de trouver « ${q} ».`,
    problem: (p, names) => {
      switch (p.kind) {
        case 'empty':
          return `Saisissez un passage, par exemple « ${names.mark} 4:35-41 ».`;
        case 'not-gospel':
          return `« ${p.word} » n’est pas l’un des quatre Évangiles. Essayez ${names.matthew}, ${names.mark}, ${names.luke} ou ${names.john}.`;
        case 'no-chapter-given':
          return `Ajoutez un chapitre, par exemple « ${names[p.gospel]} 1 ».`;
        case 'no-chapter':
          return p.gospel ? `${names[p.gospel]} n’a pas de chapitre ${p.chapter}` : `le chapitre ${p.chapter} n’existe pas`;
        case 'verse-count':
          return `${names[p.gospel]} ${p.chapter} compte ${p.verses} verset${p.verses > 1 ? 's' : ''}, et non ${p.verse}`;
        case 'backwards':
          return `${formatRange(p.range)} : la fin vient avant le début`;
        case 'unreadable':
          return `impossible de lire « ${p.text} »`;
      }
    },
  },

  order: {
    docTitle: (a, b) => `Ordre : ${a} et ${b}`,
    title: 'Où chaque Évangile place le récit',
    intro:
      'Chaque colonne énumère les sections d’un Évangile du début à la fin, dans l’ordre où cet Évangile les raconte. Une ligne relie une section à la même section dans l’autre Évangile. Là où les lignes se croisent, les deux Évangiles racontent ces événements dans un ordre différent.',
    left: 'Gauche',
    right: 'Droite',
    summary: (a, na, b, nb, both) =>
      `${a} compte ${sections(na)} et ${b} en compte ${nb} ; ${both} ${both > 1 ? 'sont communes' : 'est commune'} aux deux.`,
    same: 'Les deux Évangiles racontent toutes leurs sections communes dans le même ordre.',
    one: 'Une seule section explique la différence d’ordre. Mettez-la de côté, et les deux Évangiles racontent tout ce qu’ils ont d’autre en commun dans la même suite :',
    many: (n) =>
      `Ces ${n} sections expliquent les différences d’ordre. Mettez-les de côté, et les deux Évangiles racontent tout ce qu’ils ont d’autre en commun dans la même suite :`,
    position: (pa, na, a, pb, nb, b) => `— section ${pa} sur ${na} dans ${a}, ${pb} sur ${nb} dans ${b}`,
    tie: 'Quand deux explications sont aussi simples l’une que l’autre (un Évangile a-t-il avancé un récit, ou l’autre a-t-il retardé son voisin ?), une seule est indiquée : lisez donc la liste comme « là où l’ordre diffère », et non comme « ce que l’auteur a déplacé ».',
    legend: {
      label: 'Légende',
      same: 'Même section dans les deux Évangiles',
      notable: 'Une section de la liste ci-dessus, racontée à un autre moment',
      focus: 'La section que vous pointez',
      sample: 'Titre',
      both: 'Aussi dans l’autre Évangile (la barre a la couleur de sa propre colonne)',
      only: 'Seulement dans cet Évangile, donc sans ligne',
    },
    lane: (g) => `${g}, dans l’ordre`,
  },

  // Two separate paragraphs on purpose: the sentence about blessing God and the
  // sentence about Darrell must never be joined into one phrase.
  timeline: {
    title: 'Le récit dans l’ordre',
    intro: 'Toutes les sections dans l’ordre de l’harmonie, de gauche à droite, avec une ligne pour chaque Évangile. Un bloc sur une ligne indique que cet Évangile rapporte l’événement ; un espace vide, qu’il ne le rapporte pas. Choisissez un bloc pour lire tous les récits côte à côte.',
    periods: {
      beginnings: 'Les commencements',
      preparation: 'Jean-Baptiste et le baptême',
      early: 'Les débuts du ministère',
      galilee: 'Le ministère en Galilée',
      journey: 'Vers Jérusalem',
      week: 'La dernière semaine',
      passion: 'La Passion',
      resurrection: 'La résurrection',
    },
    days: {
      sunday: 'Dimanche · les Rameaux',
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi · la Cène',
      thursdayNight: 'Jeudi soir',
      friday: 'Vendredi · Vendredi saint',
      saturday: 'Samedi',
      easter: 'Dimanche de Pâques',
      later: 'Après Pâques',
    },
    dayNote: 'Les jours de la dernière semaine suivent la lecture traditionnelle des indications données par les Évangiles eux-mêmes, surtout par Marc ; les sections sans indication restent sans jour. Jean place le dernier repas « avant la fête de Pâque » (Jean 13:1).',
    jump: 'Aller à',
    elsewhereKey: 'Rapporté à un autre moment dans cet Évangile',
    elsewhere: (g, after) => (after ? `${g} le rapporte à un autre moment, après « ${after} ».` : `${g} le rapporte à un autre moment, au début.`),
  },

  Dedication: () => (
    <>
      <p className="soli">Soli Deo gloria</p>
      <h1>À propos de ce site</h1>
      <p>
        Ce site est offert pour bénir le Dieu tout-puissant, dont il place la Parole devant le lecteur, et dont ces
        quatre Évangiles proclament le Fils.
      </p>
      <p>
        Il a été réalisé pour Darrell W. Johnson, qui prêche Jésus-Christ et son Évangile depuis plus de cinquante
        ans : comme pasteur en Californie, à l’Union Church of Manila et à la First Baptist Church de Vancouver, et
        comme formateur de prédicateurs au Fuller Theological Seminary, au Regent College et au Carey Theological
        College. Aujourd’hui, il sert à The Way Church et au sein de The Pastorate Ministries Canada. Il est l’auteur
        de <cite>The Glory of Preaching</cite>, <cite>Who Is Jesus?</cite>, <cite>Jesus the Healer</cite>,{' '}
        <cite>The Beatitudes</cite> et d’autres livres.
      </p>
      <p>
        Sa prédication commence là où commence cet outil : en demeurant dans le texte, et en le laissant dire ce
        qu’il dit. Le site est né d’un projet que Darrell et sa famille ont entrepris ensemble : comparer l’ordre des
        événements chez {N.matthew}, {N.mark} et {N.luke} avec l’ordre chez {N.john}.
      </p>
      <p>
        <a href="https://www.darrelljohnson.ca/">Les prédications, livres et enseignements de Darrell →</a>
      </p>
    </>
  ),

  About: ({ href, names, translation, licence, attribution }) => (
    <>
      <section>
        <h2>Mode d’emploi</h2>
        <ul>
          <li>
            <strong>Lire une section.</strong> Choisissez une section dans la <a href={href.home()}>liste</a> pour
            voir côte à côte le récit de chaque Évangile. Sous chaque colonne figurent les sections qui précèdent et
            qui suivent immédiatement dans cet Évangile, pour lire le récit dans son propre contexte.
          </li>
          <li>
            <strong>Chercher un passage.</strong> Saisissez une référence comme{' '}
            <a href={href.passage(`${names.mark} 4:35-41`)}>{names.mark} 4:35-41</a> ou{' '}
            <a href={href.passage(`${names.john} 3:16`)}>{names.john} 3:16</a>. L’outil ouvre la section qui la
            contient, où les versets demandés sont signalés.
          </li>
          <li>
            <strong>Comparer l’ordre.</strong> La page <a href={href.order('mark', 'john')}>Ordre</a> met deux
            Évangiles en regard et relie les sections qu’ils ont en commun : on voit ainsi où un Évangile place un
            événement à un autre moment qu’un autre.
          </li>
          <li>
            <strong>Surligner les mots communs</strong> surligne les mots qui apparaissent dans plus d’un récit. La
            comparaison porte sur les mots français d’une seule traduction, et non sur le grec : c’est un repère pour
            l’œil, non une analyse.
          </li>
          <li>
            <strong>L’imprimer comme un livre.</strong> La page <a href={href.book()}>Livre</a> réunit toutes les
            sections en un seul volume, à imprimer ou à télécharger en PDF.
          </li>
        </ul>
      </section>

      <section>
        <h2>Couleurs et repères</h2>
        <ul className="color-key">
          <li>
            Chaque Évangile garde sa propre couleur partout sur le site :{' '}
            <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
            <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
            <span className="col-luke"><span className="swatch" />{names.luke}</span> et{' '}
            <span className="col-john"><span className="swatch" />{names.john}</span>. Elle marque le haut de chaque
            colonne, le nom de l’Évangile et ses références dans la liste des sections.
          </li>
          <li>
            <span className="verse target">Un fond gris-bleu</span> signale les versets que vous avez cherchés.
          </li>
          <li>
            Lorsque <strong>Surligner les mots communs</strong> est activé, un fond doré signale les mots présents dans
            plus d’un récit : <mark className="hl2">dans deux</mark>, <mark className="hl3">dans trois</mark>,{' '}
            <mark className="hl4">dans les quatre</mark>.
          </li>
          <li>
            Sur la page Ordre, une ligne grise relie une section à la même section dans l’autre Évangile ; une ligne{' '}
            <strong className="purple">violette</strong> signale une section racontée à un autre moment ; une ligne
            foncée est celle que vous pointez. Un titre en gris, sans ligne, ne se trouve que dans cet Évangile.
          </li>
        </ul>
      </section>

      <section>
        <h2>Pourquoi l’ordre diffère</h2>
        <p>
          {names.matthew}, {names.mark} et {names.luke} (les Évangiles « synoptiques ») suivent en grande partie le
          même ordre : un ministère en Galilée, puis un seul voyage à Jérusalem pour la dernière semaine. Chez{' '}
          {names.john}, Jésus va plusieurs fois de la Galilée à Jérusalem, et trois Pâques sont mentionnées (
          {names.john} 2:13 ; 6:4 ; 11:55). Les différences les plus connues sont la purification du temple, que{' '}
          {names.john} place au début du ministère et les autres dans la dernière semaine, et la date de la dernière
          cène et de la crucifixion par rapport à la Pâque.
        </p>
        <p>
          Les évangélistes ont ordonné leurs récits pour proclamer qui est Jésus, et non seulement pour tenir un
          journal ; une différence d’ordre invite donc à se demander ce que chacun veut nous montrer en plaçant un
          récit là où il le place.
        </p>
      </section>

      <section>
        <h2>Le texte et les sections</h2>
        <p>
          Le texte biblique est celui de la {translation} ({licence.toLowerCase()}), repris sans modification
          d’<a href="https://ebible.org/">eBible.org</a>. {attribution} Il comprend quelques versets absents des plus
          anciens manuscrits, comme {names.mark} 16:9-20 et {names.john} 7:53-8:11 ; les sections concernées le
          signalent.
        </p>
        <p>
          La division en sections et le choix des passages tenus pour parallèles relèvent de choix éditoriaux, qui
          suivent dans les grandes lignes les synopses traditionnelles des Évangiles. Chaque verset des quatre
          Évangiles appartient à une seule section : tout passage cherché sera donc trouvé. Lorsque {names.matthew}{' '}
          ou {names.luke} emploie une même parole à deux endroits, un seul est relié, et les notes des sections
          renvoient à l’autre.
        </p>
      </section>
    </>
  ),

  book: {
    docTitle: 'Livre',
    heading: 'Tout le site en un livre',
    intro:
      'Toutes les sections, dans l’ordre de l’harmonie, réunies en un volume à imprimer ou à garder : avec la dédicace, une table des matières et, à la fin, un index des passages pour retrouver n’importe quel verset.',
    download: (pages, mb) => `Télécharger le PDF (${pages} pages, ${decimal(mb)} Mo)`,
    paper: (size) =>
      `Le PDF est au format ${size}. Si vous imprimez plutôt depuis votre navigateur, votre propre format de papier sera utilisé.`,
    print: 'Imprimer depuis le navigateur',
    notBuilt: 'Le PDF est créé lors de la publication du site ; cette copie du site n’en a donc pas.',
    scripture: (t) => `Texte biblique : ${t}`,
    howToHeading: 'Comment lire ce livre',
    HowTo: ({ names }) => (
      <>
        <p>
          Chaque section place côte à côte les récits des Évangiles sur un même événement ou un même enseignement, une
          colonne par Évangile. Les sections sont numérotées (§) selon l’ordre d’une harmonie : à peu près l’ordre des
          événements, tel que les synopses traditionnelles des Évangiles les disposent. Lorsqu’un Évangile ne
          rapporte pas un récit, la section l’indique.
        </p>
        <p>
          Une barre de couleur en haut de chaque colonne désigne son Évangile :{' '}
          <span className="col-matthew"><span className="swatch" />{names.matthew}</span>,{' '}
          <span className="col-mark"><span className="swatch" />{names.mark}</span>,{' '}
          <span className="col-luke"><span className="swatch" />{names.luke}</span>,{' '}
          <span className="col-john"><span className="swatch" />{names.john}</span>.
        </p>
        <p>
          Pour trouver un passage, cherchez son chapitre et son verset dans l’index à la fin du livre, qui donne le
          numéro de la section. Les mêmes sections se trouvent sur gospels.yhwh.rest, où l’on peut aussi comparer
          l’ordre dans lequel deux Évangiles racontent leur récit.
        </p>
      </>
    ),
    contents: 'Table des matières',
    indexHeading: 'Index des passages',
    indexIntro:
      'Chaque verset des quatre Évangiles appartient à une seule section. Cherchez le chapitre et le verset sous le nom de l’Évangile, puis reportez-vous au numéro de la section.',
    creditsHeading: 'À propos de ce livre',
    Credits: ({ translation, licence, attribution, date }) => (
      <>
        <p>
          Le texte biblique est celui de la {translation} ({licence.toLowerCase()}), repris sans modification
          d’eBible.org. {attribution}
        </p>
        <p>
          La division en sections et le choix des parallèles relèvent de choix éditoriaux, qui suivent dans les grandes
          lignes les synopses traditionnelles des Évangiles.
        </p>
        <p>Réalisé à partir de gospels.yhwh.rest le {date}.</p>
        <p className="soli">Soli Deo gloria</p>
      </>
    ),
  },

  // Names and wording follow Louis Segond 1910 (Capernaüm, Béelzébul, centenier,
  // sénevé, souverain sacrificateur) so a title matches the text beneath it.
  titles: {
    'prologue-word': 'La Parole a été faite chair',
    'luke-preface': 'Le prologue de Luc à Théophile',
    'john-birth-foretold': 'Annonce de la naissance de Jean-Baptiste',
    annunciation: 'L’ange Gabriel envoyé à Marie',
    magnificat: 'Marie chez Élisabeth ; le Magnificat',
    'john-birth': 'Naissance de Jean-Baptiste ; le cantique de Zacharie',
    genealogy: 'La généalogie de Jésus',
    birth: 'La naissance de Jésus',
    shepherds: 'Les bergers',
    presentation: 'La présentation au temple ; Siméon et Anne',
    magi: 'La visite des mages',
    'flight-egypt': 'La fuite en Égypte ; le massacre des enfants de Bethléhem',
    'return-nazareth': 'Le retour à Nazareth',
    'boy-in-temple': 'Jésus à douze ans dans le temple',
    'baptist-preaching': 'La prédication de Jean-Baptiste',
    'baptist-imprisoned': 'Jean-Baptiste mis en prison',
    baptism: 'Le baptême de Jésus',
    temptation: 'La tentation au désert',
    'first-disciples-john': `Les premiers disciples (${N.john})`,
    cana: 'Les noces de Cana',
    'temple-cleansing': 'Jésus chasse les vendeurs du temple',
    nicodemus: 'Jésus et Nicodème',
    'baptist-final-testimony': 'Le dernier témoignage de Jean-Baptiste',
    'samaritan-woman': 'La Samaritaine',
    'galilee-begins': 'Jésus retourne en Galilée',
    'officials-son': 'Guérison du fils d’un officier du roi',
    'nazareth-rejection': 'Jésus rejeté à Nazareth',
    'calling-fishermen': 'L’appel des premiers disciples',
    'capernaum-synagogue': 'Enseignement dans la synagogue de Capernaüm',
    'peters-mother-in-law': 'Guérison de la belle-mère de Pierre ; guérisons le soir',
    'preaching-tour': 'Une tournée de prédication en Galilée',
    leper: 'La guérison d’un lépreux',
    paralytic: 'La guérison d’un paralytique',
    levi: 'L’appel de Lévi (Matthieu) ; Jésus mange avec les pécheurs',
    'fasting-question': 'La question du jeûne',
    'grain-sabbath': 'Les épis arrachés le jour du sabbat',
    'withered-hand': 'La guérison d’un homme à la main sèche',
    'crowds-by-sea': 'Les foules viennent à Jésus ; le serviteur choisi',
    'choosing-twelve': 'Le choix des douze',
    bethesda: 'Guérison à la piscine de Béthesda',
    'authority-of-son': 'L’autorité du Fils ; les témoins de Jésus',
    beatitudes: 'Les béatitudes',
    'salt-light': 'Le sel et la lumière',
    'law-fulfilled': 'Jésus accomplit la loi',
    'greater-righteousness': 'La colère, l’adultère, le divorce et les serments',
    'love-enemies': 'La vengeance et l’amour des ennemis',
    'piety-in-secret': 'L’aumône, la prière et le jeûne dans le secret',
    'lords-prayer': 'Le Notre Père',
    'treasure-heaven': 'Le trésor dans le ciel',
    'lamp-of-body': 'La lampe du corps',
    'two-masters': 'Nul ne peut servir deux maîtres',
    'do-not-worry': 'Ne vous inquiétez pas',
    judging: 'Ne jugez point',
    'ask-seek-knock': 'Demandez, cherchez, frappez ; la règle d’or',
    'two-foundations': 'Deux portes, deux arbres, deux fondations',
    centurion: 'La guérison du serviteur d’un centenier',
    'widow-nain': 'Le fils de la veuve de Naïn ressuscité',
    'baptist-question': 'La question de Jean-Baptiste ; le témoignage de Jésus sur Jean',
    'sinful-woman': 'Une pécheresse parfume Jésus',
    'women-followers': 'Les femmes qui suivaient Jésus',
    'woes-cities': 'Malheur aux villes de Galilée',
    thanksgiving: 'L’action de grâces de Jésus ; venez à moi',
    beelzebul: 'Jésus et Béelzébul',
    'sign-of-jonah': 'Le signe de Jonas',
    'unclean-spirit-returns': 'Le retour de l’esprit impur',
    'true-blessedness': 'Le vrai bonheur',
    'true-family': 'La vraie famille de Jésus',
    sower: 'La parabole du semeur',
    'why-parables': 'Pourquoi Jésus parle en paraboles',
    'sower-explained': 'Explication de la parabole du semeur',
    'lamp-measure': 'La lampe sous le boisseau ; la mesure dont vous mesurez',
    'seed-growing': 'La semence qui pousse d’elle-même',
    weeds: 'L’ivraie et le bon grain',
    'mustard-leaven': 'Le grain de sénevé et le levain',
    'use-of-parables': 'Jésus enseigne en paraboles',
    'weeds-explained': 'Explication de la parabole de l’ivraie',
    'treasure-pearl-net': 'Le trésor caché, la perle, le filet',
    'would-be-followers': 'Ceux qui voulaient suivre Jésus',
    'calming-storm': 'La tempête apaisée',
    gerasene: 'Le démoniaque gadarénien',
    jairus: 'La fille de Jaïrus ; la femme qui toucha son vêtement',
    'two-blind-mute': 'Deux aveugles ; un démoniaque muet',
    harvest: 'La moisson est grande',
    'sending-twelve': 'L’envoi des douze',
    persecution: 'Les persécutions à venir',
    'do-not-fear': 'Ne craignez point',
    'not-peace': 'Non la paix, mais l’épée',
    'herod-baptist-death': 'Hérode et la mort de Jean-Baptiste',
    'feeding-5000': 'La multiplication des pains pour cinq mille hommes',
    'walking-water': 'Jésus marche sur les eaux',
    gennesaret: 'Guérisons à Génésareth',
    'bread-of-life': 'Le pain de vie',
    'words-eternal-life': 'Plusieurs se retirent ; « Tu as les paroles de la vie éternelle »',
    'tradition-elders': 'La tradition des anciens ; ce qui souille l’homme',
    'canaanite-woman': 'La femme cananéenne (syro-phénicienne)',
    'deaf-man': 'La guérison d’un sourd ; nombreuses guérisons',
    'feeding-4000': 'La multiplication des pains pour quatre mille hommes',
    'demand-sign': 'Une demande de signe',
    'leaven-pharisees': 'Le levain des pharisiens',
    'bethsaida-blind': 'Un aveugle à Bethsaïda',
    'peters-confession': 'La confession de Pierre',
    'first-prediction': 'Première annonce de la Passion ; se charger de sa croix',
    transfiguration: 'La transfiguration',
    'boy-unclean-spirit': 'La guérison d’un enfant possédé',
    'second-prediction': 'Deuxième annonce de la Passion',
    'temple-tax': 'L’impôt du temple',
    greatest: 'Qui est le plus grand ?',
    'strange-exorcist': 'Qui n’est pas contre nous est pour nous',
    stumbling: 'Les occasions de chute',
    'lost-sheep': 'La brebis perdue',
    'forgive-brother': 'Reprendre son frère et lui pardonner',
    'unforgiving-servant': 'Le serviteur impitoyable',
    'tabernacles-1': 'À la fête des Tabernacles',
    'tabernacles-2': 'Est-ce le Christ ? Des fleuves d’eau vive',
    'adulterous-woman': 'La femme adultère',
    'light-of-world': 'La lumière du monde',
    'before-abraham': 'La vérité vous affranchira ; avant qu’Abraham fût',
    'man-born-blind': 'La guérison de l’aveugle-né',
    'good-shepherd': 'Le bon berger',
    dedication: 'À la fête de la Dédicace',
    'samaritan-village': 'Un village samaritain refuse de recevoir Jésus',
    'sending-seventy': 'L’envoi des soixante-dix',
    'seventy-return': 'Le retour des soixante-dix',
    'great-commandment': 'Le plus grand commandement',
    'good-samaritan': 'Le bon Samaritain',
    'mary-martha': 'Marthe et Marie',
    'friend-midnight': 'L’ami importun',
    'woes-at-dinner': 'Malheurs prononcés à la table d’un pharisien',
    'rich-fool': 'Le riche insensé',
    'watchful-servants': 'Les serviteurs vigilants',
    'faithful-servant': 'Le serviteur fidèle et le serviteur infidèle',
    'interpreting-times': 'Discerner les temps ; s’accorder en chemin',
    'repent-fig-tree': 'Se repentir ou périr ; le figuier stérile',
    'crippled-woman': 'Guérison d’une femme infirme le jour du sabbat',
    'narrow-door': 'La porte étroite',
    'lament-jerusalem': 'Lamentation sur Jérusalem',
    dropsy: 'La guérison d’un hydropique',
    'places-at-table': 'Les places à table ; qui inviter',
    'great-banquet': 'Le grand souper ; le festin de noces',
    'cost-discipleship': 'Ce qu’il en coûte de suivre Jésus',
    'lost-coin': 'La drachme perdue',
    'prodigal-son': 'Le fils prodigue et son frère',
    'shrewd-manager': 'L’économe infidèle',
    'law-and-divorce': 'La loi et le royaume ; le divorce',
    'rich-man-lazarus': 'Le riche et Lazare',
    'faith-duty': 'Une foi comme un grain de sénevé ; des serviteurs inutiles',
    'ten-lepers': 'Les dix lépreux',
    'day-son-of-man': 'Le jour du Fils de l’homme',
    'persistent-widow': 'La veuve et le juge inique',
    'pharisee-tax-collector': 'Le pharisien et le publicain',
    divorce: 'Le mariage et le divorce',
    children: 'Jésus bénit les petits enfants',
    'rich-young-man': 'Le jeune homme riche',
    'vineyard-workers': 'Les ouvriers de la onzième heure',
    'third-prediction': 'Troisième annonce de la Passion',
    'james-john-request': 'La demande de Jacques et Jean',
    bartimaeus: 'La guérison de l’aveugle Bartimée',
    zacchaeus: 'Zachée',
    talents: 'Les talents ; les mines',
    lazarus: 'La résurrection de Lazare',
    plot: 'Le complot contre Jésus',
    'bethany-anointing': 'Le parfum versé à Béthanie',
    'triumphal-entry': 'L’entrée à Jérusalem',
    'weeping-jerusalem': 'Jésus pleure sur Jérusalem',
    'greeks-seek': 'Des Grecs cherchent Jésus ; l’heure est venue',
    unbelief: 'L’incrédulité, et un dernier appel',
    'fig-tree': 'Le figuier maudit',
    'authority-questioned': 'L’autorité de Jésus contestée',
    'two-sons': 'Les deux fils',
    'wicked-tenants': 'Les vignerons méchants',
    caesar: 'Le tribut à César',
    'resurrection-question': 'Les sadducéens et la résurrection',
    'davids-son': 'De qui le Christ est-il le fils ?',
    'woes-scribes': 'Malheur à vous, scribes et pharisiens',
    'widows-offering': 'L’offrande de la veuve',
    'signs-of-end': 'La destruction du temple ; les signes de la fin',
    desolation: 'L’abomination de la désolation ; la grande détresse',
    'son-of-man-coming': 'La venue du Fils de l’homme',
    'lesson-fig-tree': 'La leçon du figuier',
    'stay-awake': 'Veillez',
    'ten-virgins': 'Les dix vierges',
    'sheep-goats': 'Les brebis et les boucs',
    'judas-agrees': 'Judas accepte de livrer Jésus',
    'passover-preparation': 'La préparation de la Pâque',
    footwashing: 'Jésus lave les pieds de ses disciples',
    'betrayer-foretold': 'Jésus annonce qu’il sera livré',
    'lords-supper': 'L’institution de la sainte cène',
    'dispute-greatness': 'Qui est le plus grand ? La dispute à table',
    'new-commandment': 'Un commandement nouveau',
    'denial-foretold': 'Jésus annonce le reniement de Pierre',
    'two-swords': 'La bourse, le sac et l’épée',
    'way-truth-life': 'Le chemin, la vérité et la vie ; le consolateur promis',
    'true-vine': 'Le vrai cep',
    'worlds-hatred': 'La haine du monde',
    'spirit-joy': 'L’œuvre de l’Esprit ; la tristesse changée en joie',
    'jesus-prays': 'La prière de Jésus pour ses disciples',
    gethsemane: 'Jésus à Gethsémané',
    arrest: 'L’arrestation de Jésus',
    'before-high-priest': 'Jésus devant le souverain sacrificateur',
    'peters-denials': 'Le reniement de Pierre',
    'judas-death': 'La mort de Judas',
    'before-pilate': 'Jésus devant Pilate',
    'before-herod': 'Jésus devant Hérode',
    sentenced: 'Barabbas relâché ; Jésus condamné',
    'soldiers-mock': 'Les soldats se moquent de Jésus',
    crucifixion: 'La crucifixion',
    death: 'La mort de Jésus',
    burial: 'L’ensevelissement de Jésus',
    guard: 'La garde au sépulcre',
    'empty-tomb': 'Le sépulcre vide',
    'mary-magdalene': 'Jésus apparaît à Marie de Magdala',
    'guards-report': 'Le rapport des gardes',
    emmaus: 'Les disciples d’Emmaüs',
    'appears-disciples': 'Jésus apparaît aux disciples',
    thomas: 'Jésus et Thomas',
    'purpose-of-john': 'Afin que vous croyiez',
    'great-commission': 'La mission confiée aux disciples',
    ascension: 'L’ascension',
    'by-the-sea': 'Le repas au bord de la mer de Tibériade',
    'peter-restored': 'Pierre rétabli ; le disciple que Jésus aimait',
  },

  // Every « » here is Louis Segond 1910, copied from src/data/text/fr.json; the
  // tests check each one against the text.
  notes: {
    genealogy: `${N.matthew} ouvre son Évangile par la généalogie, qu’il fait descendre depuis Abraham ; ${N.luke} la place après le baptême et la fait remonter jusqu’à Adam.`,
    'baptist-imprisoned': `${N.luke} clôt l’histoire de Jean avant le baptême de Jésus. ${N.matthew} et ${N.mark} racontent l’arrestation plus tard, comme un retour en arrière (${N.matthew} 14:3-5 ; ${N.mark} 6:17-20).`,
    baptism: `L’Évangile selon ${N.john} ne raconte pas le baptême lui-même ; il rapporte le témoignage de Jean-Baptiste, qui a vu l’Esprit descendre et demeurer sur Jésus.`,
    'temple-cleansing': `${N.john} place cet épisode à la première Pâque du ministère de Jésus (${N.john} 2:13). ${N.matthew}, ${N.mark} et ${N.luke} le placent dans la dernière semaine, juste après l’entrée à Jérusalem.`,
    'officials-son': `Souvent rapprochée de la guérison du serviteur du centenier (${N.matthew} 8:5-13 ; ${N.luke} 7:1-10) : une guérison à distance, à Capernaüm, en faveur d’un homme qui exerce une autorité.`,
    'nazareth-rejection': `${N.luke} place cette scène à l’ouverture du ministère public de Jésus, où sa lecture d’Ésaïe 61 trace les contours de tout ce qui suit. ${N.matthew} et ${N.mark} la placent bien plus avant dans le ministère en Galilée.`,
    'calling-fishermen': `Le récit de ${N.luke} comprend la pêche miraculeuse et vient après que Jésus a déjà guéri la belle-mère de Simon (${N.luke} 4:38-39). ${N.john} 1:35-51 décrit une rencontre antérieure.`,
    beatitudes: `${N.matthew} situe le discours sur une montagne ; ${N.luke} « sur un plateau » (${N.luke} 6:17). ${N.luke} met en regard quatre béatitudes et quatre malheurs.`,
    'lords-prayer': `${N.matthew} place la prière dans le sermon sur la montagne ; chez ${N.luke}, Jésus la donne en chemin, quand un disciple lui demande : « Seigneur, enseigne-nous à prier ».`,
    'sinful-woman': `Une onction différente de celle de Béthanie, dans la dernière semaine (${N.matthew} 26:6-13 ; ${N.mark} 14:3-9 ; ${N.john} 12:1-8) ; celle-ci a lieu en Galilée, dans la maison d’un pharisien.`,
    'feeding-5000': 'En dehors de la résurrection, le seul miracle raconté dans les quatre Évangiles.',
    'words-eternal-life': `La confession de Pierre dans l’Évangile selon ${N.john}. Comparer la confession à Césarée de Philippe (${N.matthew} 16:13-20 ; ${N.mark} 8:27-30 ; ${N.luke} 9:18-21).`,
    'adulterous-woman': `${N.john} 7:53-8:11 ne se trouve pas dans les plus anciens manuscrits grecs de ${N.john}, et beaucoup de traductions impriment ce passage entre crochets.`,
    'great-commandment': `${N.luke} situe cet échange pendant le voyage, où il introduit la parabole du bon Samaritain. Chez ${N.matthew} et ${N.mark}, c’est l’une des dernières controverses dans le temple.`,
    'woes-at-dinner': `Une grande partie de ce passage correspond aux reproches adressés aux scribes et aux pharisiens en ${N.matthew} 23, que ${N.matthew} place dans le temple, pendant la dernière semaine.`,
    'watchful-servants': `Comparer ${N.matthew} 24:42-44 et ${N.mark} 13:33-37.`,
    'lament-jerusalem': `${N.luke} place la lamentation pendant le voyage, avant que Jésus n’arrive à la ville ; ${N.matthew} la place dans le temple, pendant la dernière semaine.`,
    'day-son-of-man': `Comparer ${N.matthew} 24:23-28, 37-41.`,
    'james-john-request': `${N.luke} rapporte une dispute semblable sur la grandeur lors de la dernière cène (${N.luke} 22:24-30).`,
    plot: `${N.john} rattache directement la décision du sanhédrin à la résurrection de Lazare.`,
    'bethany-anointing': `${N.john} situe cet épisode six jours avant la Pâque, avant l’entrée à Jérusalem ; ${N.matthew} et ${N.mark} deux jours avant, après celle-ci. ${N.luke} 7:36-50 raconte une autre onction.`,
    'fig-tree': `${N.mark} encadre la purification du temple par l’épisode du figuier ; ${N.matthew} le raconte d’un seul tenant, le lendemain matin.`,
    footwashing: `Chez ${N.matthew}, ${N.mark} et ${N.luke}, le dernier repas est un repas de la Pâque (${N.mark} 14:12). ${N.john} le situe « avant la fête de Pâque » (${N.john} 13:1), et la crucifixion le jour de la préparation (${N.john} 19:14).`,
    'betrayer-foretold': `${N.luke} place l’annonce après le pain et la coupe ; ${N.matthew} et ${N.mark} la placent avant.`,
    'lords-supper': `${N.john} ne rapporte pas le pain et la coupe pendant le repas ; à leur place, il raconte le lavement des pieds (${N.john} 13:1-20).`,
    'before-high-priest': `Seul ${N.john} décrit une comparution devant Anne, beau-père du souverain sacrificateur Caïphe.`,
    'judas-death': 'Comparer Actes 1:18-19.',
    sentenced: `${N.john} précise l’heure : « la préparation de la Pâque, et environ la sixième heure » (${N.john} 19:14). ${N.mark} dit que Jésus fut crucifié à la troisième heure (${N.mark} 15:25).`,
    'mary-magdalene': LONGER_ENDING,
    emmaus: LONGER_ENDING,
    'appears-disciples': LONGER_ENDING,
    ascension: LONGER_ENDING,
  },

  // Forms as they occur in Louis Segond 1910. Elided forms (qu'il, c'est, l'homme) are
  // single words to the segmenter, so the common ones are listed whole; without them
  // "qu'il" alone would light up in nearly every column.
  stopWords: `le la les un une des du de au aux et ou ni mais car donc or puis alors ainsi aussi comme quand lorsque
  si que qui quoi dont où ce cet cette ces il ils elle elles lui leur leurs eux nous vous moi toi je tu me te se
  celui celle ceux celles son sa ses mon ma mes ton ta tes notre nos votre vos dans pour par sur sous avec sans
  vers chez entre contre devant après avant depuis pendant parmi auprès selon afin parce encore même mêmes tout
  tous toute toutes point pas plus non rien voici est était étaient sont suis es êtes sera seront fut furent soit
  été être étant avait avaient avoir ayant ont avez avons ai as eut aura fit fait faire dit dis dites dirent
  disant disait disaient répondit répondirent cela ceci là ici autre autres quelque quelques
  qu'il qu'ils qu'elle qu'on c'est c'était n'est n'a s'il s'en l'un l'autre j'ai m'a d'un d'une d'eux jusqu'à
  lorsqu'il`
    .split(/\s+/)
    .filter(Boolean),
  minWordLength: 3,
};

export default fr;
