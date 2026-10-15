import { ContactTarget, Venue, Zone } from './types';
import { paths, pathsFor } from './paths';
import { photos } from './images';
import { isSiteChateauClient } from './components/SiteChateauOffer';

export const zones: Zone[] = [
  {
    slug: 'dracenie',
    where: "en Dracénie",
    name: 'Dracénie',
    intro:
      "Autour de Draguignan, Lorgues et Les Arcs-sur-Argens, la Dracénie est le cœur viticole des Côtes de Provence. On y trouve la plus forte concentration de châteaux et domaines viticoles du département, souvent avec chais voûtés, allées de platanes et hébergement sur place.",
    body: `## Se marier en Dracénie

La Dracénie s'étend autour de Draguignan, dans le centre du Var. C'est un territoire de vignes, de villages perchés comme Lorgues et de bastides, au pied des premiers reliefs du Haut-Var. Pour un mariage, c'est avant tout le secteur des domaines viticoles : chais voûtés, caves à barriques, allées de platanes et vins des Côtes de Provence servis sur place.

## Accès pour les invités

La gare TGV des Arcs-Draguignan se trouve au cœur du secteur, ce qui facilite la venue des invités depuis Paris, Lyon ou Marseille. Les aéroports de Toulon-Hyères et de Nice sont à environ une heure de route. La plupart des domaines sont isolés dans les vignes : prévoyez l'hébergement sur place ou des navettes en fin de soirée.

## Quel lieu pour quel mariage

Les lieux de la Dracénie couvrent toutes les tailles de réception. Le [Château Pimõ](/lieux/chateau-pimo) reçoit de 30 à 120 invités dans une demeure du XVIIIe siècle privatisée, le [Château de Berne](/lieux/chateau-de-berne) propose une offre haut de gamme avec hôtel cinq étoiles, et le [Château de Font du Broc](/lieux/chateau-de-font-du-broc) accueille jusqu'à 650 invités assis. Le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) et son cloître du XIIe siècle offrent l'un des cadres historiques les plus marquants du département.`,
    articles: ["chateaux-viticoles-mariage-var","prix-lieu-mariage-var","ceremonie-laique-provence"],
  },
  {
    slug: 'haut-var',
    where: "dans le Haut-Var",
    name: 'Haut-Var',
    intro:
      "Villages perchés, forêts de chênes et vieilles pierres : le Haut-Var, entre Draguignan et les gorges du Verdon, offre des lieux plus confidentiels, idéals pour un mariage nature où les invités restent tout le week-end.",
    body: `## Se marier dans le Haut-Var

Le Haut-Var regroupe les plateaux et les collines du nord du département, entre Draguignan et les gorges du Verdon. Villages perchés, forêts de chênes, vieilles pierres : c'est la Provence de l'arrière-pays, plus calme et plus verte que le littoral.

## Un secteur pour les mariages nature

Pour un mariage, le Haut-Var séduit par ses lieux confidentiels et par ses soirées souvent plus fraîches en été. Les domaines y logent volontiers les invités pour tout le week-end, ce qui compense leur éloignement des grandes villes : le [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde) dispose de 90 couchages en suites, gîtes et tipis, et [La Bastide de Montferrat](/lieux/bastide-de-montferrat) de 40.

## Accès pour les invités

Comptez environ une demi-heure à trois quarts d'heure de route depuis la gare TGV des Arcs-Draguignan. Les routes de l'arrière-pays sont sinueuses : c'est une raison de plus pour loger les invités sur place.`,
    articles: ["lieu-mariage-hebergement-var","quelle-saison-mariage-var","organiser-mariage-var-guide"],
  },
  {
    slug: 'provence-verte',
    where: "en Provence Verte",
    name: 'Provence Verte',
    intro:
      "Autour de Brignoles et de la vallée de l'Argens, la Provence Verte mêle rivières, vignes et collines boisées. Châteaux historiques, bastides et mas y accueillent aussi bien les grandes réceptions que les mariages intimistes.",
    body: `## Se marier en Provence Verte

La Provence Verte s'étend autour de Brignoles et de Saint-Maximin-la-Sainte-Baume. Elle doit son nom à ses paysages : collines boisées, rivières comme l'Argens, vignobles des Coteaux varois en Provence et des Côtes de Provence.

## Un secteur facile d'accès

Traversé par l'autoroute A8 entre Aix-en-Provence et Nice, le secteur est l'un des plus accessibles du Var. Aix-en-Provence et Marseille sont à moins d'une heure de route : c'est un bon choix si beaucoup de vos invités viennent des Bouches-du-Rhône.

## Des lieux très différents

On y trouve un château du XVIe siècle avec le [Château de Robernier](/lieux/chateau-de-robernier), taillé pour les grandes réceptions, un domaine viticole bio avec le [Château Mentone](/lieux/chateau-mentone), qui loge jusqu'à 54 personnes, et une bastide du XVIIIe siècle avec la [Bastide Saint Julien](/lieux/bastide-saint-julien), qui reçoit jusqu'à 250 invités assis.

Pour un mariage champêtre, le [Château de la Présidente](/lieux/chateau-de-la-presidente), au sud de Brignoles, se privatise tout le week-end avec son parc de 2 hectares, et [Le Mas de Fontbelle](/lieux/mas-de-fontbelle), à Besse-sur-Issole, reçoit jusqu'à 150 invités sous son chapiteau, après une cérémonie dans son théâtre de verdure.`,
    articles: ["chateaux-viticoles-mariage-var","grand-mariage-var","prix-lieu-mariage-var"],
  },
  {
    slug: 'toulon',
    where: "à Toulon et environs",
    name: 'Toulon et environs',
    intro:
      "Entre la rade de Toulon et la presqu'île de Giens, les lieux de réception jouent la carte de la mer : vues panoramiques, jardins exotiques et villas Belle Époque, à quelques minutes de la gare et de l'aéroport de Toulon-Hyères.",
    body: `## Se marier à Toulon et dans ses environs

Toulon et ses environs offrent le cadre le plus urbain du Var, mais aussi l'un des plus spectaculaires : la rade, le mont Faron, les caps et les criques de la côte. Les lieux de réception y profitent de vues panoramiques sur la mer.

## Le secteur le plus simple pour les invités

Gare TGV de Toulon, aéroport de Toulon-Hyères à proximité, large offre d'hôtels : c'est le secteur le plus pratique pour les invités venus de loin. Pour un lieu sans hébergement comme [Les Pins Penchés](/lieux/les-pins-penches), qui reçoit jusqu'à 400 invités assis, c'est un vrai atout.

## Une villa face à la mer

Au Pradet, le [Domaine Rocabella](/lieux/domaine-rocabella) propose une privatisation avec séjour dans une villa Belle Époque, avec piscines, criques et de quoi loger de 32 à 80 invités. En été, la circulation est dense sur le littoral : prévoyez des marges pour les trajets et des navettes en fin de soirée.`,
    articles: ["mariage-bord-de-mer-var","grand-mariage-var","lieu-mariage-hebergement-var"],
  },
  {
    slug: 'littoral',
    where: "sur le littoral varois",
    name: 'Littoral varois',
    intro:
      "Face aux îles d'Or, le littoral varois associe vignobles et horizon marin. Les domaines y sont souvent nichés entre le massif des Maures et la mer, pour des cérémonies en plein air avec vue sur Porquerolles.",
    body: `## Se marier sur le littoral varois

Entre Hyères et le golfe de Saint-Tropez, le littoral varois associe plages, caps rocheux, massif des Maures et vignobles qui descendent vers la mer. Au large, les îles d'Or, Porquerolles, Port-Cros et le Levant, dessinent un horizon unique.

## La mer en toile de fond

Pour un mariage, le secteur offre ce que beaucoup de couples recherchent : une cérémonie avec vue sur la mer, dans un domaine viticole plutôt qu'en ville. Le [Château Maravenne](/lieux/chateau-maravenne), à La Londe-les-Maures, en est le meilleur exemple, avec son théâtre de verdure face à Porquerolles et ses salles voûtées pour le dîner.

## Accès et saison

L'aéroport de Toulon-Hyères est tout proche. En juillet et en août, la circulation est très chargée sur la côte : anticipez les horaires d'arrivée des invités. Septembre, avec une mer encore chaude et des routes plus calmes, est une période idéale.`,
    articles: ["mariage-bord-de-mer-var","ceremonie-laique-provence","chateaux-viticoles-mariage-var"],
  },
  {
    slug: 'ouest-var',
    where: "dans l'Ouest Var",
    name: 'Ouest Var',
    intro:
      "Sur les terres du Bandol, entre Toulon et la Sainte-Baume, l'Ouest Var cultive l'esprit des mas et des oliveraies. Les domaines y proposent de grands espaces extérieurs pour des réceptions champêtres sous les arbres.",
    body: `## Se marier dans l'Ouest Var

L'Ouest Var s'étend entre Toulon, le massif de la Sainte-Baume et les Bouches-du-Rhône. C'est le pays du Bandol, appellation réputée pour ses vins rouges de mourvèdre, des villages perchés comme Le Castellet, et des grandes oliveraies.

## Proche de Marseille et d'Aix

Le secteur est proche de Marseille et d'Aix-en-Provence, ce qui facilite la venue des invités. Il est aussi exposé au mistral, qui peut souffler fort : prévoyez toujours un plan B abrité pour la cérémonie et le cocktail.

## Un mariage sous les oliviers

Au Beausset, le [Domaine Souviou](/lieux/domaine-souviou) accueille de 20 à 300 invités au milieu d'une oliveraie de 7 000 arbres, dont certains millénaires. Le lieu ne loge pas les invités : prévoyez des hébergements à Bandol, au Castellet ou à Toulon.`,
    articles: ["ceremonie-laique-provence","chateaux-viticoles-mariage-var","grand-mariage-var"],
  },
  {
    slug: 'sainte-baume',
    where: "dans la Sainte-Baume",
    name: 'Sainte-Baume',
    intro:
      "Adossés au massif de la Sainte-Baume et à sa forêt domaniale, les lieux de ce secteur offrent fraîcheur, grands parcs arborés et architecture classique, à moins d'une heure d'Aix-en-Provence et de Marseille.",
    body: `## Se marier au pied de la Sainte-Baume

Le massif de la Sainte-Baume marque la limite entre le Var et les Bouches-du-Rhône. Sa forêt domaniale, l'une des plus remarquables de Provence, apporte ombre et fraîcheur, même en plein été.

## Un bon choix pour l'été

Le secteur combine la proximité d'Aix-en-Provence et de Marseille, à moins d'une heure de route, avec un cadre préservé. C'est un bon choix pour un mariage d'été, quand la chaleur est forte sur le littoral.

## Une orangerie face à la forêt

Le [Château de Nans](/lieux/chateau-de-nans), à Nans-les-Pins, reçoit jusqu'à 250 invités dans son orangerie vitrée, ouverte sur la forêt, et loge jusqu'à 36 personnes. Ses tarifs varient selon le jour de la semaine, ce qui rend le vendredi et le dimanche intéressants.`,
    articles: ["quelle-saison-mariage-var","lieu-mariage-hebergement-var","organiser-mariage-var-guide"],
  },
];

const zoneBySlug = Object.fromEntries(zones.map((z) => [z.slug, z])) as Record<string, Zone>;

interface RawVenue extends Omit<Venue, 'zone' | 'hasAccommodation' | 'gallery'> {
  zone: string;
  /** Photos of the venue itself (paths under public/), the cover first. Without them the gallery is illustrative. */
  gallery?: string[];
}

const rawVenues: RawVenue[] = [
  {
    slug: 'chateau-de-berne',
    summary: "Relais & Châteaux viticole et bio, formule mariage avec hôtel 5 étoiles et Scène sur l'eau.",
    tags: ["Domaine viticole", "Haut de gamme", "Cérémonie sur l'eau"],
    guestsShort: "Jusqu'à 120",
    lodgingShort: "Hôtel 34 ch. + villas",
    priceShort: "Dès 24 500 €",
    nom_du_lieu: "Château de Berne",
    commune: "Lorgues",
    zone: "dracenie",
    site_web_officiel: "https://www.chateauberne.com",
    description: "Niché entre Lorgues et Flayosc, au milieu d'un domaine viticole bio d'environ 500 hectares, le Château de Berne réunit un hôtel 5 étoiles Relais & Châteaux et un restaurant étoilé au guide Michelin. La cérémonie se tient sur la Scène sur l'eau, une scène ronde posée sur un plan d'eau, et le dîner sous la verrière du Jardin du Jasmin, au milieu des vignes. La formule mariage comprend dix chambres pour deux nuits ; la privatisation ouvre tout le domaine, ses 34 chambres, ses piscines et son spa.",
    capacite_accueil: "Jusqu'à 120 invités (Jardin du Jasmin, 288 m²)",
    hebergement_sur_place: "Oui (hôtel 5 étoiles de 34 chambres, villas privées avec piscine et château historique de 7 chambres)",
    type_de_cadre: "Domaine viticole et Relais & Châteaux",
    fourchette_de_prix: "Formule mariage dès 24 500 € TTC (10 chambres pour 2 nuits, Scène sur l'eau et Jardin du Jasmin, traiteur au choix) ; privatisation du domaine dès 95 500 € TTC (34 chambres, cuisine du château). Tarifs d'avril, mai et octobre 2026, variables selon la saison ; menus de 135 à 180 € par personne",
    element_differenciant: "La Scène sur l'eau, une scène ronde posée sur un plan d'eau, pour la cérémonie et le vin d'honneur.",
    espaces: "Jardin du Jasmin, verrière de 288 m² dans les vignes (120 invités) ; Scène sur l'eau et amphithéâtre aux gradins de pierre ; place du village, piscine et jardins à la française pour le cocktail",
    ceremonie_laique: "Sur la Scène sur l'eau ; dans les jardins à la française en cas de privatisation",
    traiteur: "Au choix des mariés avec la formule mariage ; cuisine du château en privatisation (minimum de 36 000 € TTC)",
    duree_location: "2 nuits minimum",
    fin_de_soiree: "2 h avec la formule mariage, 5 h en privatisation",
    acces: "Gare TGV Les Arcs-Draguignan à 25 min ; aéroports de Toulon à 1 h, Nice à 1 h 15, Marseille à 1 h 30 ; héliport sur le domaine",
    stationnement: "Parking sur place (environ 200 places), accès PMR",
    contact: "+33 4 94 60 43 75",
    sources: "chateauberne.com (brochure mariage 2026), abcsalles.com",
    image: "/images/lieux/chateau-de-berne/01-scene-sur-l-eau.webp",
    imageAlt: "Scène sur l'eau du Château de Berne, dressée pour une cérémonie",
    gallery: [
      "/images/lieux/chateau-de-berne/01-scene-sur-l-eau.webp",
      "/images/lieux/chateau-de-berne/02-ceremonie-dans-le-parc.webp",
      "/images/lieux/chateau-de-berne/03-diner-sous-la-verriere.webp",
      "/images/lieux/chateau-de-berne/04-chateau-vu-du-ciel.webp",
      "/images/lieux/chateau-de-berne/05-maries-dans-les-jardins.webp",
      "/images/lieux/chateau-de-berne/06-table-sous-les-oliviers.webp",
      "/images/lieux/chateau-de-berne/07-allee-de-cypres.webp",
      "/images/lieux/chateau-de-berne/08-cloitre.webp",
      "/images/lieux/chateau-de-berne/09-piscine.webp",
      "/images/lieux/chateau-de-berne/10-hotel-vu-du-ciel.webp",
      "/images/lieux/chateau-de-berne/11-suite.webp",
      "/images/lieux/chateau-de-berne/12-coucher-de-soleil-sur-les-vignes.webp",
      "/images/lieux/chateau-de-berne/13-domaine-et-vignoble.webp",
      "/images/lieux/chateau-de-berne/14-jardin.webp",
    ],
    photoCredit: "chateauberne.com",
    minGuests: null,
    maxGuests: 120,
    priceFrom: 24500,
    sleeps: 34,
    budget: "€€€",
  },
  {
    slug: 'chateau-sainte-roseline',
    summary: "Cru classé historique avec cloître du XIIe siècle, chapelle et allée de platanes bicentenaires.",
    tags: ["Château historique", "Domaine viticole", "Cloître classé"],
    guestsShort: "50 à 250",
    lodgingShort: "Appartement des mariés",
    priceShort: "Dès 5 600 €",
    nom_du_lieu: "Château Sainte Roseline",
    commune: "Les Arcs-sur-Argens",
    zone: "dracenie",
    site_web_officiel: "https://www.sainte-roseline.com",
    description: "Sur le site de l'ancienne abbaye de La Celle-Roubaud, aux Arcs-sur-Argens, ce cru classé des Côtes de Provence reçoit des mariages depuis plus de vingt ans. Le cloître du XIIe siècle accueille la cérémonie laïque ou le cocktail, l'allée de dix platanes bicentenaires les grands dîners en plein air, et la chapelle voisine abrite une mosaïque de Chagall. En intérieur, la Salle des Vendanges et sa charpente apparente reçoivent jusqu'à 220 invités avec piste de danse.",
    capacite_accueil: "50 à 250 invités assis (220 en Salle des Vendanges, 130 en Salle des Barriques), 350 en cocktail",
    hebergement_sur_place: "Oui (appartement privé des mariés pour la nuit de noces ; liste d'hébergements proches pour les invités)",
    type_de_cadre: "Château historique, Cru Classé et abbaye",
    fourchette_de_prix: "Location du lieu à 5 600 € et menus dès 95 € par invité (tarifs publiés sur Mariages.net, à confirmer auprès du domaine)",
    element_differenciant: "Son cloître du XIIe siècle, classé monument historique, et sa chapelle ornée d'une mosaïque de Chagall.",
    espaces: "Cloître du XIIe siècle (150 en cocktail) ; Allée des Platanes (250 assis, 350 en cocktail) ; Salle des Vendanges (220 assis avec piste) ; Salle des Barriques (130 assis avec piste) ; verger",
    ceremonie_laique: "Dans le cloître (100 invités), le verger (250) ou l'allée des platanes (180)",
    traiteur: "Traiteurs partenaires (Roland Paix, Bouche en Bouche, Jaudys, Helen Traiteur, Atelier Traiteur…) ou formule tout compris avec Borges ; vins du domaine conseillés, pas de droit de bouchon",
    fin_de_soiree: "Pas d'heure limite stricte, agent de sécurité pendant la soirée",
    acces: "À 5 min de la sortie A8 Le Muy et de la gare TGV Les Arcs-Draguignan",
    stationnement: "Parking de 400 places, accès PMR",
    contact: "+33 4 94 99 50 30",
    sources: "sainte-roseline.com (brochure mariage), mariages.net, abcsalles.com",
    image: "/images/lieux/chateau-sainte-roseline/01-arche-dans-le-cloitre.webp",
    imageAlt: "Arche fleurie dans le cloître du Château Sainte Roseline",
    gallery: [
      "/images/lieux/chateau-sainte-roseline/01-arche-dans-le-cloitre.webp",
      "/images/lieux/chateau-sainte-roseline/02-diner-sous-les-platanes.webp",
      "/images/lieux/chateau-sainte-roseline/03-soiree-sous-les-guirlandes.webp",
      "/images/lieux/chateau-sainte-roseline/04-ceremonie-sous-les-arcades.webp",
      "/images/lieux/chateau-sainte-roseline/05-cloitre-du-xiie-siecle.webp",
      "/images/lieux/chateau-sainte-roseline/06-cocktail-dans-l-allee.webp",
      "/images/lieux/chateau-sainte-roseline/07-tables-dressees-dans-le-parc.webp",
      "/images/lieux/chateau-sainte-roseline/08-salle-des-barriques.webp",
      "/images/lieux/chateau-sainte-roseline/09-table-devant-les-barriques.webp",
      "/images/lieux/chateau-sainte-roseline/10-salle-des-vendanges.webp",
      "/images/lieux/chateau-sainte-roseline/11-diner-dans-la-salle-des-vendanges.webp",
      "/images/lieux/chateau-sainte-roseline/12-allee-des-platanes.webp",
      "/images/lieux/chateau-sainte-roseline/13-reception-au-pied-du-chateau.webp",
      "/images/lieux/chateau-sainte-roseline/14-table-d-honneur.webp",
    ],
    photoCredit: "sainte-roseline.com",
    minGuests: 50,
    maxGuests: 250,
    priceFrom: 5600,
    sleeps: 2,
    budget: "€€",
  },
  {
    slug: 'chateau-de-font-du-broc',
    summary: "Grand château viticole bio et haras, salle équestre de 650 m² et chai inspiré du Thoronet.",
    tags: ["Grande capacité", "Domaine viticole", "Salle équestre"],
    guestsShort: "Jusqu'à 650",
    lodgingShort: "Non",
    priceShort: "Dès 3 960 €",
    nom_du_lieu: "Château de Font du Broc",
    commune: "Les Arcs-sur-Argens",
    zone: "dracenie",
    site_web_officiel: "https://www.vignoblesmassa.com/chateau-font-du-broc-vins-bio/",
    description: "Aux Arcs-sur-Argens, ce domaine des Vignobles Massa célèbre des mariages depuis 2003. Son chai d'élevage, voûté sur le modèle de l'abbaye cistercienne du Thoronet, compte parmi les plus beaux du Var. Pour la réception, la Salle Équestre de 650 m², éclairée par des vitraux sous des croisées d'ogives, peut asseoir plus de 600 invités ; le cloître et les jardins à la française se prêtent au cocktail et à la cérémonie.",
    capacite_accueil: "Jusqu'à 650 invités assis (Salle Équestre), 1 000 en cocktail",
    hebergement_sur_place: "Non",
    type_de_cadre: "Château, vignoble et haras",
    fourchette_de_prix: "Dès 3 960 € la location de salle vide (tarif publié par ABC Salles, à confirmer auprès du domaine)",
    element_differenciant: "La Salle Équestre de 650 m², ses vitraux et ses croisées d'ogives, et le chai voûté à la manière cistercienne.",
    espaces: "Salle Équestre (650 m²) ; Salle du Château (350 m², ouverte sur les jardins à la française) ; Salle de Provence (150 m²) ; cloître (168 m²) ; jardins à la française",
    ceremonie_laique: "Possible dans le cloître ou les jardins à la française",
    stationnement: "Parking de 500 places, accès PMR",
    contact: "+33 4 94 47 48 20",
    sources: "vignoblesmassa.com, abcsalles.com, bridebook.com",
    image: "/images/lieux/chateau-de-font-du-broc/01-salle-d-elevage-voutee.webp",
    imageAlt: "Chai voûté du Château de Font du Broc, inspiré de l'abbaye du Thoronet",
    gallery: [
      "/images/lieux/chateau-de-font-du-broc/01-salle-d-elevage-voutee.webp",
      "/images/lieux/chateau-de-font-du-broc/02-domaine-vu-du-ciel.webp",
      "/images/lieux/chateau-de-font-du-broc/03-portail-du-domaine.webp",
      "/images/lieux/chateau-de-font-du-broc/04-voutes-de-la-cave.webp",
      "/images/lieux/chateau-de-font-du-broc/05-escalier-de-la-cave.webp",
      "/images/lieux/chateau-de-font-du-broc/06-batiment-en-pierre.webp",
      "/images/lieux/chateau-de-font-du-broc/07-vignoble-et-rocher-de-roquebrune.webp",
      "/images/lieux/chateau-de-font-du-broc/08-rangs-de-vigne.webp",
      "/images/lieux/chateau-de-font-du-broc/09-vignes-en-automne.webp",
    ],
    photoCredit: "vignoblesmassa.com",
    minGuests: null,
    maxGuests: 650,
    priceFrom: 3960,
    sleeps: 0,
    budget: "€",
  },
  {
    slug: 'chateau-pimo',
    summary: "Demeure du XVIIIe siècle privatisée, avec roseraie, tente nomade et spa dans l'ancien lavoir.",
    tags: ["Privatisation", "Spa", "Roseraie"],
    guestsShort: "30 à 120",
    lodgingShort: "5 ch. et suites",
    priceShort: "Dès 5 980 €",
    nom_du_lieu: "Château Pimõ",
    commune: "Draguignan",
    zone: "dracenie",
    site_web_officiel: "https://www.chateaupimo.fr",
    description: "Aux portes de Draguignan, cette demeure du XVIIIe siècle se privatise en entier, au milieu d'un parc d'environ trois hectares d'oliviers, de vignes et de rosiers. La cérémonie laïque se tient dans la roseraie, le vin d'honneur autour de la piscine et des oliviers, le dîner sous une tente nomade ou dans la salle de bal climatisée. Avec cinq chambres et suites et un spa installé dans l'ancien lavoir, c'est un lieu de mariage à taille humaine.",
    capacite_accueil: "30 à 120 invités",
    hebergement_sur_place: "Oui (5 chambres et suites, 10 couchages)",
    type_de_cadre: "Demeure historique et parc",
    fourchette_de_prix: "Location de 5 980 € à 11 980 € selon la saison et le nombre de nuits (tarifs publiés sur Mariages.net) ; pas de formule imposée ni de droit de bouchon",
    element_differenciant: "Le spa installé dans l'ancien lavoir, avec piscine intérieure, sauna et hammam.",
    espaces: "Roseraie (cérémonie) ; piscine et oliviers (vin d'honneur, brunch) ; tente nomade entre oliviers et vignes (dîner) ; salle de bal climatisée ; terrasses",
    ceremonie_laique: "Dans la roseraie",
    traiteur: "Libre, liste de traiteurs partenaires sur demande",
    fin_de_soiree: "3 h (selon Mariages.net)",
    acces: "Gare TGV Les Arcs-Draguignan à 20 min ; centre de Draguignan à 5 min ; aéroports de Nice et du golfe de Saint-Tropez à environ 1 h",
    stationnement: "Parking privé de plus de 50 véhicules",
    contact: "+33 6 07 01 63 17",
    sources: "chateaupimo.fr, mariages.net, bridebook.com",
    image: "/images/lieux/chateau-pimo/01-facade-du-chateau.webp",
    imageAlt: "Façade du Château Pimõ au soleil",
    gallery: [
      "/images/lieux/chateau-pimo/01-facade-du-chateau.webp",
      "/images/lieux/chateau-pimo/02-fontaine-et-facade.webp",
      "/images/lieux/chateau-pimo/03-chateau-de-nuit.webp",
      "/images/lieux/chateau-pimo/04-table-de-mariage.webp",
      "/images/lieux/chateau-pimo/05-piscine.webp",
      "/images/lieux/chateau-pimo/06-terrasse-en-soiree.webp",
      "/images/lieux/chateau-pimo/07-entree-du-chateau.webp",
      "/images/lieux/chateau-pimo/08-salon.webp",
      "/images/lieux/chateau-pimo/09-chambre.webp",
      "/images/lieux/chateau-pimo/10-suite.webp",
      "/images/lieux/chateau-pimo/11-salle-de-bain.webp",
      "/images/lieux/chateau-pimo/12-vins-du-domaine.webp",
    ],
    photoCredit: "chateaupimo.fr",
    minGuests: 30,
    maxGuests: 120,
    priceFrom: 5980,
    sleeps: 10,
    budget: "€€",
  },
  {
    slug: 'chateau-saint-ange',
    summary: "Bastide de 1875 restaurée, oliveraie d'un millier d'arbres et piscine à plage minérale.",
    tags: ["Bastide", "Oliveraie", "Privatisation"],
    guestsShort: "Jusqu'à 150",
    lodgingShort: "8 chambres",
    priceShort: "Sur devis",
    nom_du_lieu: "Château Saint Ange",
    commune: "Draguignan",
    zone: "dracenie",
    site_web_officiel: "https://www.chateausaintange.com",
    description: "À quatre kilomètres de Draguignan, cette bastide de 1875, restaurée depuis 2022, se loue en exclusivité pour quelques jours. Le domaine de 12 hectares réunit des vignes en AOP Côtes de Provence et une oliveraie d'un millier d'arbres, où se déroule la cérémonie laïque. La réception se partage entre la Salle Sud, ouverte sur la piscine, une tente de style berbère et l'Espace Cézanne, un ancien atelier d'architecte aux grandes baies vitrées.",
    capacite_accueil: "120 à 150 invités (salle de réception) ; Salle Sud et tente berbère pour 120 à 140 chacune",
    hebergement_sur_place: "Oui (8 chambres de prestige, dont une suite nuptiale de 64 m²)",
    type_de_cadre: "Bastide, vignoble et oliveraie",
    fourchette_de_prix: "Sur devis",
    element_differenciant: "L'oliveraie d'un millier d'arbres pour la cérémonie, et l'Espace Cézanne, ancien atelier d'architecte aux baies vitrées monumentales.",
    espaces: "Salle Sud avec terrasse sur la piscine ; tente de style berbère ; Espace Cézanne ; tente lounge de 150 m² ; terrasse sur le vallon et l'oliveraie ; piscine et plage minérale de 800 m² ; cave voûtée du XVIIIe siècle",
    ceremonie_laique: "Dans l'oliveraie",
    traiteur: "Liste de prestataires recommandés (traiteurs, DJ, fleuristes)",
    duree_location: "Privatisation du domaine pour un week-end ou plusieurs jours, pas de location à la nuitée",
    acces: "Gare TGV Les Arcs-Draguignan et sortie A8 Le Muy à environ 15 min ; aéroport de Nice à 1 h",
    stationnement: "Parking gratuit sur place, bornes de recharge électrique",
    contact: "+33 4 94 68 06 18",
    sources: "chateausaintange.com",
    image: "/images/lieux/chateau-saint-ange/01-chateau-et-piscine.webp",
    imageAlt: "Bastide du Château Saint Ange et sa piscine",
    gallery: [
      "/images/lieux/chateau-saint-ange/01-chateau-et-piscine.webp",
      "/images/lieux/chateau-saint-ange/02-piscine-et-terrasse-ombragee.webp",
      "/images/lieux/chateau-saint-ange/03-terrasse-sous-voile.webp",
      "/images/lieux/chateau-saint-ange/04-piscine-au-coucher-du-soleil.webp",
      "/images/lieux/chateau-saint-ange/05-bastide-en-pierre.webp",
      "/images/lieux/chateau-saint-ange/06-olivier-et-lavande.webp",
    ],
    photoCredit: "chateausaintange.com",
    minGuests: null,
    maxGuests: 150,
    priceFrom: null,
    sleeps: 8,
    budget: null,
  },
  {
    slug: 'domaine-de-la-rotonde',
    summary: "Ancienne ferme templière, cour aux arcades de verre et 90 couchages pour tout le week-end.",
    tags: ["Week-end complet", "Grand hébergement", "Pierre ancienne"],
    guestsShort: "10 à 250",
    lodgingShort: "90 couchages",
    priceShort: "Dès 13 530 €",
    nom_du_lieu: "Domaine de la Rotonde",
    commune: "Villecroze",
    zone: "haut-var",
    site_web_officiel: "https://www.domaine-rotonde.com",
    description: "À Villecroze, dans le Haut-Var, cette ancienne ferme templière abrite une bâtisse du XIIe siècle au milieu de 53 hectares de forêts et de prairies. La cérémonie laïque se tient dans l'oliveraie, le vin d'honneur sous les platanes centenaires, et le dîner dans la cour aux arcades de verre, sous une tente nomade et des guirlandes guinguette. Huit suites et gîtes et des tipis logent jusqu'à 90 personnes, avec piscine et pool-house pour le lendemain.",
    capacite_accueil: "10 à 250 invités",
    hebergement_sur_place: "Oui (8 suites et gîtes pour 50 personnes, et des tipis pour 40)",
    type_de_cadre: "Ferme templière et gîtes",
    fourchette_de_prix: "Location de 13 530 € à 15 500 €, plus le menu du traiteur partenaire dès 94 € par personne, minimum 60 adultes (tarifs publiés sur Mariages.net)",
    element_differenciant: "Une bâtisse templière du XIIe siècle et sa cour aux arcades de verre, au milieu de 53 hectares de nature.",
    espaces: "Cour aux arcades de verre (dîner sous tente nomade) ; esplanade et parc de platanes centenaires ; oliveraie ; salle de danse ; ancienne bergerie de 120 m² ; piscine et pool-house",
    ceremonie_laique: "Dans l'oliveraie ou sous les platanes centenaires",
    traiteur: "Imposé (Star Événements), DJ partenaire exclusif",
    fin_de_soiree: "4 h",
    acces: "Gare Les Arcs-Draguignan à environ 20 min ; sortie A8 n° 36 à 30 min",
    stationnement: "Parking privé gratuit ; lieu accessible PMR avec une chambre adaptée",
    contact: "+33 6 71 82 34 49",
    sources: "domaine-rotonde.com, mariages.net",
    image: "/images/lieux/domaine-de-la-rotonde/01-allee-de-ceremonie-sous-les-oliviers.webp",
    imageAlt: "Allée de cérémonie fleurie sous les oliviers du Domaine de la Rotonde",
    gallery: [
      "/images/lieux/domaine-de-la-rotonde/01-allee-de-ceremonie-sous-les-oliviers.webp",
      "/images/lieux/domaine-de-la-rotonde/02-ceremonie-laique.webp",
      "/images/lieux/domaine-de-la-rotonde/03-allee-de-cypres.webp",
      "/images/lieux/domaine-de-la-rotonde/04-fontaine-au-coucher-du-soleil.webp",
      "/images/lieux/domaine-de-la-rotonde/05-tour-du-domaine.webp",
      "/images/lieux/domaine-de-la-rotonde/06-allee-vers-la-bastide.webp",
      "/images/lieux/domaine-de-la-rotonde/07-bastide-et-jardins.webp",
      "/images/lieux/domaine-de-la-rotonde/08-salle-en-pierre.webp",
      "/images/lieux/domaine-de-la-rotonde/09-arche-de-ceremonie.webp",
      "/images/lieux/domaine-de-la-rotonde/10-chaises-de-ceremonie.webp",
      "/images/lieux/domaine-de-la-rotonde/11-fontaine.webp",
      "/images/lieux/domaine-de-la-rotonde/12-decoration-sur-tonneau.webp",
      "/images/lieux/domaine-de-la-rotonde/13-soiree-dansante.webp",
      "/images/lieux/domaine-de-la-rotonde/14-chemin-du-domaine.webp",
    ],
    photoCredit: "domaine-rotonde.com",
    minGuests: 10,
    maxGuests: 250,
    priceFrom: 13530,
    sleeps: 90,
    budget: "€€€",
  },
  {
    slug: 'bastide-de-montferrat',
    summary: "Bastide du XVIIIe siècle et hôtel de 20 chambres privatisés, avec un parc au bord de la rivière.",
    tags: ["Hôtel privatisé", "Tout compris", "Parc et rivière"],
    guestsShort: "10 à 100",
    lodgingShort: "20 ch., 40 couchages",
    priceShort: "139 €/pers.",
    nom_du_lieu: "La Bastide de Montferrat",
    commune: "Montferrat",
    zone: "haut-var",
    site_web_officiel: "https://www.labastide83.com",
    description: "Aux portes des gorges du Verdon, cette bastide provençale du XVIIIe siècle, rénovée en 2024, se privatise avec son hôtel de vingt chambres le jour du mariage. La cérémonie laïque a lieu dans le parc d'un hectare et demi, sous un grand mûrier platane, au bord d'une rivière et de sa cascade. Le chef de la maison prépare le cocktail, le dîner et la soirée, servis dans la salle climatisée ou sur la terrasse couverte.",
    capacite_accueil: "10 à 100 invités assis avec piste de danse",
    hebergement_sur_place: "Oui (hôtel 3 étoiles de 20 chambres, 40 couchages)",
    type_de_cadre: "Bastide provençale et hôtel",
    fourchette_de_prix: "Formule tout compris dès 139 € par personne, de 18 h à 2 h : cocktail, dîner avec vins, soirée dansante, salle et service (tarif publié par ABC Salles) ; chambres de 85 à 99 € la nuit",
    element_differenciant: "Un parc d'un hectare et demi traversé par une rivière, avec sa cascade et un grand mûrier platane pour la cérémonie.",
    espaces: "Salle de réception climatisée (180 m²) ; terrasse couverte de 100 m² ; restaurant et terrasse ombragée ; parc de 1,5 hectare avec rivière",
    ceremonie_laique: "Dans le parc, sous le mûrier platane",
    traiteur: "Cuisine du chef de la maison, pas de traiteur extérieur",
    duree_location: "Privatisation du domaine et des chambres le jour du mariage",
    fin_de_soiree: "2 h (fin plus tardive possible en supplément)",
    acces: "Draguignan à 20-30 min, gorges du Verdon à 25-30 min",
    stationnement: "Grand parking privatif gratuit, accès PMR et chambre adaptée",
    contact: "+33 4 94 50 21 30",
    sources: "labastide83.com, abcsalles.com",
    image: "/images/lieux/bastide-de-montferrat/01-diner-sous-les-guirlandes.webp",
    imageAlt: "Dîner de mariage sous les guirlandes à la Bastide de Montferrat",
    gallery: [
      "/images/lieux/bastide-de-montferrat/01-diner-sous-les-guirlandes.webp",
      "/images/lieux/bastide-de-montferrat/02-premiere-danse.webp",
      "/images/lieux/bastide-de-montferrat/03-bastide-et-village-vus-du-ciel.webp",
      "/images/lieux/bastide-de-montferrat/04-bastide-et-parc.webp",
      "/images/lieux/bastide-de-montferrat/05-facade-de-la-bastide.webp",
      "/images/lieux/bastide-de-montferrat/06-ceremonie-laique.webp",
      "/images/lieux/bastide-de-montferrat/07-salle-de-reception.webp",
      "/images/lieux/bastide-de-montferrat/08-vin-d-honneur.webp",
      "/images/lieux/bastide-de-montferrat/09-buffet-du-cocktail.webp",
      "/images/lieux/bastide-de-montferrat/10-vue-sur-le-parc.webp",
      "/images/lieux/bastide-de-montferrat/11-terrasse-ombragee.webp",
      "/images/lieux/bastide-de-montferrat/12-domaine-vu-du-ciel.webp",
      "/images/lieux/bastide-de-montferrat/13-maries-dans-le-parc.webp",
      "/images/lieux/bastide-de-montferrat/14-chambre.webp",
    ],
    photoCredit: "labastide83.com",
    minGuests: 10,
    maxGuests: 100,
    priceFrom: null,
    sleeps: 40,
    budget: null,
  },
  {
    slug: 'chateau-de-robernier',
    summary: "Château du XVIe siècle à deux tours, avec chapelle, salle de bal et parc de 220 hectares.",
    tags: ["Château historique", "Grande capacité", "Chapelle"],
    guestsShort: "Jusqu'à 300",
    lodgingShort: "12 ch., 24 couchages",
    priceShort: "Dès 10 500 €",
    nom_du_lieu: "Château de Robernier",
    commune: "Montfort-sur-Argens",
    zone: "provence-verte",
    site_web_officiel: "http://www.chateauderobernier.com",
    description: "Entre Montfort-sur-Argens et Cotignac, ce château du XVIe siècle à la façade flanquée de deux tours pointues est resté quatre cents ans dans la même famille avant d'être restauré à partir de 2006. La chapelle consacrée, l'orangerie et la salle de bal aux lustres Napoléon III datent du XVIIIe siècle ; la cour d'honneur et les jardins à la française accueillent la cérémonie et le cocktail. Le domaine de 220 hectares, avec ses vignes et ses oliveraies, ne reçoit que quelques mariages par an.",
    capacite_accueil: "Jusqu'à 300 invités assis en intérieur, 1 000 en cocktail en extérieur",
    hebergement_sur_place: "Oui (12 chambres, 24 couchages, dont certaines dans les tours)",
    type_de_cadre: "Château Renaissance et vignoble",
    fourchette_de_prix: "Dès 10 500 € en haute saison (juin à septembre) pour la location exclusive avec nuitée, jusqu'à 300 invités (tarif publié par French Wedding Style)",
    element_differenciant: "Une façade à deux tours rondes et pointues, unique en Provence, et une chapelle consacrée pour la cérémonie religieuse.",
    espaces: "Salle de bal du XVIIIe siècle ; orangerie ; cour d'honneur ; salle de réception de 140 places ; jardins à la française ; parc et piscine de 30 mètres",
    ceremonie_laique: "Laïque dans les jardins ou la cour d'honneur, religieuse dans la chapelle consacrée",
    traiteur: "Libre, avec cuisine équipée",
    duree_location: "Privatisation exclusive, une nuit minimum",
    fin_de_soiree: "4 h dans la salle de bal (selon French Wedding Style)",
    acces: "Gare Les Arcs-Draguignan ; aéroports de Toulon à 1 h, Marseille à 1 h 10, Nice à 1 h 25 ; hélisurface",
    stationnement: "Parking sur place, accès PMR",
    contact: "+33 4 94 04 78 49",
    sources: "chateauderobernier.com, frenchweddingstyle.com, bridebook.com",
    image: "/images/lieux/chateau-de-robernier/01-chateau-et-jardins.webp",
    imageAlt: "Le Château de Robernier et ses tours au bout des jardins",
    gallery: [
      "/images/lieux/chateau-de-robernier/01-chateau-et-jardins.webp",
      "/images/lieux/chateau-de-robernier/02-ceremonie-devant-le-portail.webp",
      "/images/lieux/chateau-de-robernier/03-allee-illuminee.webp",
      "/images/lieux/chateau-de-robernier/04-facade-et-platanes.webp",
      "/images/lieux/chateau-de-robernier/05-chapiteau-et-lustres.webp",
      "/images/lieux/chateau-de-robernier/06-jardins-a-la-francaise.webp",
      "/images/lieux/chateau-de-robernier/07-soiree-dans-la-cour.webp",
      "/images/lieux/chateau-de-robernier/08-piscine.webp",
      "/images/lieux/chateau-de-robernier/09-salon-bibliotheque.webp",
      "/images/lieux/chateau-de-robernier/10-chambre-a-baldaquin.webp",
      "/images/lieux/chateau-de-robernier/11-galerie-interieure.webp",
    ],
    photoCredit: "bridebook.com",
    minGuests: null,
    maxGuests: 300,
    priceFrom: 10500,
    sleeps: 24,
    budget: "€€€",
  },
  {
    slug: 'chateau-mentone',
    summary: "Domaine viticole bio cité dès 1033, avec la Magnanerie, une chapelle et 54 couchages.",
    tags: ["Domaine viticole", "Écoresponsable", "Grand hébergement"],
    guestsShort: "60 à 200",
    lodgingShort: "54 couchages",
    priceShort: "Dès 4 000 €",
    nom_du_lieu: "Château Mentone",
    commune: "Saint-Antonin-du-Var",
    zone: "provence-verte",
    site_web_officiel: "https://www.chateaumentone.com",
    description: "À Saint-Antonin-du-Var, ce domaine cité dès 1033 cultive 30 hectares de vignes en bio au milieu de 120 hectares de nature. Les dîners se tiennent dans la Magnanerie, ancienne magnanerie du XIXe siècle ouverte sur les vignes, ou sous la Tonnelle, une pergola de fer forgé posée sur une calade. Le château, les gîtes du Lodge et le Mas du Moulin logent jusqu'à 54 personnes, et la chapelle Saint-Lambert veille sur le domaine.",
    capacite_accueil: "60 à 200 invités assis, 250 en cocktail",
    hebergement_sur_place: "Oui (24 chambres et gîtes, jusqu'à 54 couchages)",
    type_de_cadre: "Domaine viticole bio",
    fourchette_de_prix: "Forfaits de 365 € à 465 € par personne à partir de 60 invités : lieu, repas, vins du domaine, fleurs, musique et hébergement de 37 personnes (selon Bridebook) ; location seule dès 4 000 € (selon ABC Salles)",
    element_differenciant: "La Magnanerie du XIXe siècle et sa terrasse sur les vignes, au cœur d'un domaine certifié bio depuis 2008.",
    espaces: "La Magnanerie (235 m², 200 assis) ; la Tonnelle (230 m²) ; terrasse couverte (130 m²) ; la Ferme ; ancienne aire de battage ; chapelle Saint-Lambert (20 personnes)",
    ceremonie_laique: "Proposée par le domaine ; la chapelle reçoit 20 personnes",
    traiteur: "Traiteur partenaire (cuisine bio et provençale) dans les forfaits ; traiteur extérieur autorisé en location seule (selon ABC Salles)",
    duree_location: "Location du site pour 24 h (selon ABC Salles)",
    fin_de_soiree: "5 h (selon ABC Salles)",
    acces: "Gares Les Arcs-Draguignan (TGV) et Brignoles ; A8 à 20 min (sorties Le Luc ou Le Muy)",
    stationnement: "Parking gratuit de 70 places ; accès PMR partiel en raison du relief",
    contact: "+33 4 94 04 42 00",
    sources: "chateaumentone.com, bridebook.com, abcsalles.com",
    image: "/images/lieux/chateau-mentone/01-chateau-et-parc.webp",
    imageAlt: "Le Château Mentone dans son parc ombragé",
    gallery: [
      "/images/lieux/chateau-mentone/01-chateau-et-parc.webp",
      "/images/lieux/chateau-mentone/02-diner-dans-la-magnanerie.webp",
      "/images/lieux/chateau-mentone/03-maries-devant-le-domaine.webp",
      "/images/lieux/chateau-mentone/04-terrasse-au-coucher-du-soleil.webp",
      "/images/lieux/chateau-mentone/05-domaine-et-vignoble.webp",
      "/images/lieux/chateau-mentone/06-table-dressee.webp",
      "/images/lieux/chateau-mentone/07-batisse-en-pierre.webp",
      "/images/lieux/chateau-mentone/08-fontaine-sous-les-platanes.webp",
      "/images/lieux/chateau-mentone/09-table-fleurie.webp",
      "/images/lieux/chateau-mentone/10-buffet-de-desserts.webp",
      "/images/lieux/chateau-mentone/11-cocktail-en-musique.webp",
      "/images/lieux/chateau-mentone/12-vignes.webp",
      "/images/lieux/chateau-mentone/13-salle-a-manger-du-chateau.webp",
    ],
    photoCredit: "chateaumentone.com",
    minGuests: 60,
    maxGuests: 200,
    priceFrom: 4000,
    sleeps: 54,
    budget: "€€",
  },
  {
    slug: 'bastide-saint-julien',
    summary: "Bastide du XVIIIe siècle face à la montagne de la Loube, avec roseraie et salon de 490 m².",
    tags: ["Bastide", "Roseraie", "Grande capacité"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "5 chambres",
    priceShort: "Dès 6 000 €",
    nom_du_lieu: "Bastide Saint Julien",
    commune: "La Celle",
    zone: "provence-verte",
    site_web_officiel: "https://www.bastide-saint-julien.com",
    description: "À La Celle, près de Brignoles, cette bastide du XVIIIe siècle voisine du Château Saint Julien fait face à la montagne de la Loube. La cérémonie laïque se tient dans la roseraie, le cocktail dans les jardins plantés d'oliviers centenaires et de lavande, et le dîner dans le Salon Saint Julien, une salle de 490 m² équipée d'une scène escamotable. Les cinq chambres de charme, la piscine chauffée et le sauna se privatisent avec le domaine.",
    capacite_accueil: "Jusqu'à 250 invités assis (400 dans le salon de 490 m²), cérémonie en plein air pour 160",
    hebergement_sur_place: "Oui (5 chambres, 12 couchages)",
    type_de_cadre: "Bastide provençale et jardins",
    fourchette_de_prix: "Location de 6 000 € à 12 500 € selon la période (selon 1001 Salles) ; privatisation de 3 jours et 2 nuits avec hébergement de 9 500 € à 20 000 € (selon Bridebook)",
    element_differenciant: "La roseraie et les jardins face à la montagne de la Loube, avec un salon de 490 m² pour les grandes tablées.",
    espaces: "Salon Saint Julien (490 m², scène escamotable) ; jardins paysagés de 2 000 m² ; roseraie et tonnelle ; terrasse de la bastide ; pool-house (140 m²)",
    ceremonie_laique: "En plein air dans la roseraie, jusqu'à 160 invités",
    traiteur: "Traiteurs recommandés, dont Roland Paix, partenaire du domaine",
    duree_location: "Privatisation en formule 3 jours / 2 nuits (selon Bridebook)",
    acces: "A8 à 10 min (sorties 34 ou 35) ; Aix-en-Provence à 35 min ; aéroport Marseille Provence à 1 h",
    stationnement: "Parking fermé et sécurisé de plus de 200 places, accès PMR",
    contact: "+33 4 94 86 26 60",
    sources: "bastide-saint-julien.com, 1001salles.com, bridebook.com",
    image: "/images/lieux/bastide-saint-julien/01-bastide-et-jardins.webp",
    imageAlt: "La Bastide Saint Julien et ses jardins vus du ciel",
    gallery: [
      "/images/lieux/bastide-saint-julien/01-bastide-et-jardins.webp",
      "/images/lieux/bastide-saint-julien/02-piscine-face-a-la-montagne.webp",
      "/images/lieux/bastide-saint-julien/03-bassin-et-roseraie.webp",
      "/images/lieux/bastide-saint-julien/04-roseraie.webp",
      "/images/lieux/bastide-saint-julien/05-table-dressee.webp",
      "/images/lieux/bastide-saint-julien/06-jardin-et-montagne-de-la-loube.webp",
      "/images/lieux/bastide-saint-julien/07-tonnelle-fleurie.webp",
      "/images/lieux/bastide-saint-julien/08-entree-du-domaine.webp",
      "/images/lieux/bastide-saint-julien/09-verriere-sur-la-piscine.webp",
      "/images/lieux/bastide-saint-julien/10-salon.webp",
      "/images/lieux/bastide-saint-julien/11-salle-a-manger.webp",
      "/images/lieux/bastide-saint-julien/12-chambre.webp",
      "/images/lieux/bastide-saint-julien/13-chambre-de-charme.webp",
    ],
    photoCredit: "bastide-saint-julien.com",
    minGuests: null,
    maxGuests: 250,
    priceFrom: 6000,
    sleeps: 12,
    budget: "€€",
  },
  {
    slug: 'domaine-rocabella',
    summary: "Villa Belle Époque de 1898 face à la mer, piscine à débordement et criques privées.",
    tags: ["Vue mer", "Week-end complet", "Haut de gamme"],
    guestsShort: "Jusqu'à 150",
    lodgingShort: "80 couchages",
    priceShort: "Dès 34 000 €",
    nom_du_lieu: "Domaine Rocabella",
    commune: "Le Pradet",
    zone: "toulon",
    site_web_officiel: "https://www.rocabella.fr",
    description: "Au Pradet, face à la baie de Toulon, ce domaine créé en 1898 par l'architecte Hans-Georg Tersling a servi de décor à une quinzaine de films, dont Downton Abbey II. Le mariage se vit sur trois jours en exclusivité : cérémonie au Belvédère au-dessus de la mer, cocktail autour de la piscine à débordement, dîner sur la terrasse de la Corniche et soirée au Temple, sur deux niveaux. Quatre villas logent de 32 à 80 invités en pension complète, avec un accès privé aux criques.",
    capacite_accueil: "Jusqu'à 150 invités (cérémonie, cocktail et dîner)",
    hebergement_sur_place: "Oui (4 villas, 39 chambres, de 32 à 80 invités en pension complète)",
    type_de_cadre: "Villa Belle Époque en bord de mer",
    fourchette_de_prix: "Dès 34 000 € en haute saison pour la privatisation des villas et de la Corniche, 2 nuits minimum (selon French Wedding Style) ; forfaits de 43 758 € à 99 000 € pour 120 invités, repas en sus (selon Bridebook)",
    element_differenciant: "Une piscine à débordement suspendue au-dessus de la Méditerranée et des criques privées au pied du domaine.",
    espaces: "Le Belvédère (cérémonie au-dessus de la mer) ; terrasse sud de La Folie ; la Grande Piscine Bleue à débordement ; la Corniche et sa terrasse ; La Frégate, salle climatisée ; le Temple, bar et piste de danse sur deux niveaux",
    ceremonie_laique: "Au Belvédère face à la mer ou devant la terrasse sud de La Folie",
    traiteur: "Chef du domaine (séjour en pension complète)",
    duree_location: "Séjour de 3 jours, du jeudi au dimanche ou du vendredi au lundi",
    acces: "Gare TGV de Toulon à 12 min ; aéroport Toulon-Hyères à 20 min ; Nice et Marseille à 1 h 20",
    stationnement: "Parking sur place",
    contact: "+33 4 23 46 00 94",
    sources: "rocabella.fr, frenchweddingstyle.com, bridebook.com",
    image: "/images/lieux/domaine-rocabella/01-piscine-a-debordement-face-a-la-mer.webp",
    imageAlt: "Piscine à débordement de Rocabella face à la mer",
    gallery: [
      "/images/lieux/domaine-rocabella/01-piscine-a-debordement-face-a-la-mer.webp",
      "/images/lieux/domaine-rocabella/02-villa-vue-du-ciel.webp",
      "/images/lieux/domaine-rocabella/03-ceremonie-face-a-la-mer.webp",
      "/images/lieux/domaine-rocabella/04-maries-au-belvedere.webp",
      "/images/lieux/domaine-rocabella/05-cocktail-dans-les-jardins.webp",
      "/images/lieux/domaine-rocabella/06-maries-sous-la-verriere.webp",
      "/images/lieux/domaine-rocabella/07-villa-et-jardins.webp",
      "/images/lieux/domaine-rocabella/08-terrasse-vue-mer.webp",
      "/images/lieux/domaine-rocabella/09-temple.webp",
      "/images/lieux/domaine-rocabella/10-criques-et-acces-a-la-mer.webp",
      "/images/lieux/domaine-rocabella/11-table-de-mariage.webp",
      "/images/lieux/domaine-rocabella/12-temple-et-jardins-vus-du-ciel.webp",
      "/images/lieux/domaine-rocabella/13-reception-dans-le-parc.webp",
      "/images/lieux/domaine-rocabella/14-grand-salon.webp",
      "/images/lieux/domaine-rocabella/15-chambre.webp",
      "/images/lieux/domaine-rocabella/16-villa-dans-les-pins.webp",
    ],
    photoCredit: "rocabella.fr",
    minGuests: null,
    maxGuests: 150,
    priceFrom: 34000,
    sleeps: 80,
    budget: "€€€",
  },
  {
    slug: 'les-pins-penches',
    summary: "Château de 1640 et parc de palmiers face à la mer, avec cérémonie face à la Méditerranée.",
    tags: ["Vue mer", "Grande capacité", "Jardin exotique"],
    guestsShort: "60 à 400",
    lodgingShort: "Non",
    priceShort: "Dès 120 €/pers.",
    nom_du_lieu: "Les Pins Penchés",
    commune: "Toulon",
    zone: "toulon",
    site_web_officiel: "https://www.lespinspenches.com",
    description: "Au Cap Brun, à Toulon, le Château de la Clapière, construit en 1640 et relevé de ses ruines par la famille Lelièvre en 2000, domine la mer au milieu d'un parc botanique planté de palmiers. La cérémonie laïque se tient face à la Méditerranée, le cocktail dans les jardins en terrasses, et le dîner dans le Grand Pavillon, qui peut asseoir 400 invités. La cuisine est celle du chef Stéphane Lelièvre, qui organise des mariages depuis plus de vingt-cinq ans.",
    capacite_accueil: "60 à 400 invités assis (orangerie de 360 m²), 500 en cocktail",
    hebergement_sur_place: "Non (liste d'hébergements proches fournie sur demande)",
    type_de_cadre: "Château et parc botanique en bord de mer",
    fourchette_de_prix: "Formules de 120 € à 200 € par personne, minimum 60 invités, frais de privatisation selon la date (tarifs publiés par 1001 Salles et Bridebook)",
    element_differenciant: "Une vue mer à 180 degrés depuis un parc botanique de palmiers, à dix minutes du centre de Toulon.",
    espaces: "Espace de cérémonie face à la mer ; parc botanique et terrasses (2 500 m²) ; Grand Pavillon (orangerie de 360 m²) ; piscine",
    ceremonie_laique: "En extérieur, face à la Méditerranée",
    traiteur: "Cuisine maison du chef Stéphane Lelièvre, avec l'organisation du mariage",
    acces: "Cap Brun, à Toulon : A57 sortie 2, gare de Toulon et aéroport de Toulon-Hyères à proximité",
    stationnement: "Parking sur place, accès PMR",
    contact: "+33 4 94 27 98 98",
    sources: "lespinspenches.com, 1001salles.com, bridebook.com",
    image: "/images/lieux/les-pins-penches/01-ceremonie-face-a-la-mer.webp",
    imageAlt: "Cérémonie de mariage face à la mer aux Pins Penchés",
    gallery: [
      "/images/lieux/les-pins-penches/01-ceremonie-face-a-la-mer.webp",
      "/images/lieux/les-pins-penches/02-invites-a-la-ceremonie.webp",
      "/images/lieux/les-pins-penches/03-allee-de-ceremonie-sous-les-palmiers.webp",
      "/images/lieux/les-pins-penches/04-grand-pavillon-dresse.webp",
      "/images/lieux/les-pins-penches/05-pavillon-illumine.webp",
      "/images/lieux/les-pins-penches/06-parc-au-crepuscule.webp",
      "/images/lieux/les-pins-penches/07-ceremonie-de-nuit.webp",
      "/images/lieux/les-pins-penches/08-piscine-vue-mer.webp",
      "/images/lieux/les-pins-penches/09-allee-des-palmiers.webp",
      "/images/lieux/les-pins-penches/10-cocktail-sous-les-palmiers.webp",
      "/images/lieux/les-pins-penches/11-maries-devant-la-verriere.webp",
      "/images/lieux/les-pins-penches/12-pins-et-mer.webp",
      "/images/lieux/les-pins-penches/13-cocktail-dans-le-jardin.webp",
      "/images/lieux/les-pins-penches/14-soiree-dansante.webp",
    ],
    photoCredit: "lespinspenches.com",
    minGuests: 60,
    maxGuests: 400,
    priceFrom: null,
    sleeps: 0,
    budget: null,
  },
  {
    slug: 'chateau-maravenne',
    summary: "Domaine viticole bio face aux îles d'Or, avec terrasse vue mer et salle voûtée.",
    tags: ["Domaine viticole", "Vue mer", "Bio"],
    guestsShort: "20 à 160",
    lodgingShort: "25 couchages",
    priceShort: "Dès 3 900 €",
    nom_du_lieu: "Château Maravenne",
    commune: "La Londe-les-Maures",
    zone: "littoral",
    site_web_officiel: "https://www.maravenne.com",
    description: "À La Londe-les-Maures, ce domaine de 80 hectares en bio produit des Côtes de Provence face aux îles d'Or. Le vin d'honneur se tient sur une terrasse panoramique de 300 m² tournée vers Porquerolles, la cérémonie laïque dans un théâtre de verdure entouré de bassins, et le dîner dans une salle voûtée de 300 m², rejointe par un tunnel de pierre. Cinq chambres d'hôtes et trois appartements logent les proches, et le domaine ne reçoit qu'une réception par semaine.",
    capacite_accueil: "20 à 160 invités assis, 250 en cocktail",
    hebergement_sur_place: "Oui (5 chambres d'hôtes et 3 appartements, 25 couchages, d'avril à octobre)",
    type_de_cadre: "Domaine viticole avec vue mer",
    fourchette_de_prix: "Location de 3 900 € à 6 800 € selon la date, chambre des mariés incluse (tarifs publiés sur Mariages.net)",
    element_differenciant: "Une terrasse panoramique face à Porquerolles et aux îles d'Or, pour un vin d'honneur au coucher du soleil.",
    espaces: "Salle voûtée de 300 m² ; terrasse panoramique de 300 m² vue mer ; théâtre de verdure et jardin méditerranéen avec bassins ; musée des automates vignerons",
    ceremonie_laique: "Dans le théâtre de verdure, face aux vignes",
    traiteur: "Liste de traiteurs et de DJ imposée, vins du domaine obligatoires (selon Mariages.net)",
    duree_location: "Une seule réception par semaine",
    fin_de_soiree: "4 h (selon Mariages.net)",
    acces: "À 10 min de la gare et de l'aéroport de Toulon-Hyères",
    stationnement: "Parkings privés éclairés, accessibles aux autocars ; accès PMR",
    contact: "+33 4 94 66 80 20",
    sources: "maravenne.com, mariages.net, 1001salles.com",
    image: "/images/lieux/chateau-maravenne/01-terrasse-dressee-face-a-la-mer.webp",
    imageAlt: "Terrasse dressée pour un mariage face à la mer au Château Maravenne",
    gallery: [
      "/images/lieux/chateau-maravenne/01-terrasse-dressee-face-a-la-mer.webp",
      "/images/lieux/chateau-maravenne/02-tables-face-aux-iles-d-or.webp",
      "/images/lieux/chateau-maravenne/03-salle-voutee.webp",
      "/images/lieux/chateau-maravenne/04-jardin-et-bassins.webp",
      "/images/lieux/chateau-maravenne/05-diner-sous-les-guirlandes.webp",
      "/images/lieux/chateau-maravenne/06-salle-voutee-dressee.webp",
      "/images/lieux/chateau-maravenne/07-tunnel-vers-la-salle.webp",
      "/images/lieux/chateau-maravenne/08-chateau-vu-du-ciel.webp",
      "/images/lieux/chateau-maravenne/09-vignes-face-a-la-mer.webp",
      "/images/lieux/chateau-maravenne/10-vignoble-et-iles-d-or.webp",
      "/images/lieux/chateau-maravenne/11-lancer-du-bouquet.webp",
      "/images/lieux/chateau-maravenne/12-rangs-de-vigne.webp",
      "/images/lieux/chateau-maravenne/13-chambre.webp",
      "/images/lieux/chateau-maravenne/14-chambre-avec-terrasse.webp",
    ],
    photoCredit: "maravenne.com",
    minGuests: 20,
    maxGuests: 160,
    priceFrom: 3900,
    sleeps: 25,
    budget: "€",
  },
  {
    slug: 'domaine-souviou',
    summary: "Bastide du XVe siècle et oliviers millénaires, entre vignes de Bandol et moulin à huile.",
    tags: ["Oliveraie", "Domaine viticole", "Plein air"],
    guestsShort: "20 à 300",
    lodgingShort: "Non",
    priceShort: "Sur devis",
    nom_du_lieu: "Domaine Souviou",
    commune: "Le Beausset",
    zone: "ouest-var",
    site_web_officiel: "https://www.domainesouviou.com",
    description: "Au Beausset, entre Toulon et Bandol, ce domaine de 85 hectares de vignes et d'oliviers entoure une bastide du XVe siècle et sa chapelle ; l'actrice Danielle Darrieux en fut propriétaire à partir de 1964. La cérémonie se tient au Bancau des Millénaires, au milieu d'oliviers millénaires, le cocktail sur les terrasses ou au Mirador des Oliviers, et le dîner au Salon Delphi ou sous le Pavillon du Moulin, couvert et ouvert sur les restanques.",
    capacite_accueil: "20 à 300 invités (110 assis au Salon Delphi, 300 sous le Pavillon du Moulin)",
    hebergement_sur_place: "Non (hôtels et gîtes à proximité)",
    type_de_cadre: "Domaine viticole et oliveraie",
    fourchette_de_prix: "Sur devis",
    element_differenciant: "Des oliviers millénaires et le moulin à huile du domaine, au cœur du vignoble de Bandol.",
    espaces: "Salon Delphi (trois salles, piste de danse, terrasse couverte) ; Pavillon du Moulin (370 m² couverts) ; Bancau et Terrasse des Millénaires ; Jardin de la Chapelle ; Mirador des Oliviers ; esplanade",
    ceremonie_laique: "Au Bancau des Millénaires ou sur la Terrasse des Millénaires",
    traiteur: "Libre, avec des formules tout compris proposées par les traiteurs partenaires",
    acces: "Sur la RN8 au Beausset, à 25 min de Toulon",
    stationnement: "Parking sur place",
    contact: "+33 4 94 89 01 12",
    sources: "domainesouviou.com, bridebook.com, abcsalles.com",
    image: "/images/lieux/domaine-souviou/01-ceremonie-sous-les-oliviers.webp",
    imageAlt: "Chaises de cérémonie sous les oliviers du Domaine Souviou",
    gallery: [
      "/images/lieux/domaine-souviou/01-ceremonie-sous-les-oliviers.webp",
      "/images/lieux/domaine-souviou/02-reception-devant-la-bastide.webp",
      "/images/lieux/domaine-souviou/03-ceremonie-laique.webp",
      "/images/lieux/domaine-souviou/04-salon-exterieur-et-lavande.webp",
      "/images/lieux/domaine-souviou/05-maries-dans-l-oliveraie.webp",
      "/images/lieux/domaine-souviou/06-terrasse-couverte.webp",
      "/images/lieux/domaine-souviou/07-salle-dressee.webp",
      "/images/lieux/domaine-souviou/08-piscine-et-collines.webp",
      "/images/lieux/domaine-souviou/09-moulin-a-huile.webp",
      "/images/lieux/domaine-souviou/10-cocktail.webp",
      "/images/lieux/domaine-souviou/11-domaine-et-vignoble.webp",
      "/images/lieux/domaine-souviou/12-bastide.webp",
      "/images/lieux/domaine-souviou/13-cocktail-gourmand.webp",
      "/images/lieux/domaine-souviou/14-vins-du-domaine.webp",
    ],
    photoCredit: "domainesouviou.com",
    minGuests: 20,
    maxGuests: 300,
    priceFrom: null,
    sleeps: 0,
    budget: null,
  },
  {
    slug: 'chateau-de-nans',
    summary: "Château classique au pied de la Sainte-Baume, orangerie vitrée face à la forêt.",
    tags: ["Château", "Orangerie", "Parc arboré"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "36 couchages",
    priceShort: "Dès 4 760 € HT",
    nom_du_lieu: "Château de Nans",
    commune: "Nans-les-Pins",
    zone: "sainte-baume",
    site_web_officiel: "https://chateaudenans.com",
    description: "À Nans-les-Pins, au pied du massif de la Sainte-Baume, ce château à tourelles se dresse dans un parc arboré d'un hectare. L'Orangerie vitrée de 300 m² reçoit jusqu'à 250 invités assis avec piste de danse, et deux espaces de cérémonie laïque s'ouvrent l'un sur la verdure, l'autre sur la montagne. Treize chambres logent 36 personnes, la piscine accueille le brunch du lendemain, et la musique peut durer jusqu'à 3 h sans gêner de voisins.",
    capacite_accueil: "Jusqu'à 250 invités assis dans l'Orangerie, 400 en cocktail",
    hebergement_sur_place: "Oui (13 chambres, 36 couchages)",
    type_de_cadre: "Château classique et parc arboré",
    fourchette_de_prix: "Privatisation à 4 760 € HT en semaine, 5 780 € HT le vendredi et 6 800 € HT le samedi (tarifs publiés par Funbooker)",
    element_differenciant: "L'Orangerie vitrée, chauffée en hiver, qui plonge les invités dans le parc et la forêt.",
    espaces: "Orangerie de 300 m² ; verrière (40 m²) ; terrasse ombragée sous les platanes ; parc arboré d'un hectare ; piscine",
    ceremonie_laique: "Deux espaces : l'un intimiste dans la verdure, l'autre face au massif de la Sainte-Baume",
    traiteur: "Traiteur de la maison proposé (Côté Gourmet), non imposé selon les annuaires ; droit de bouchon offert",
    duree_location: "Accès au château dès 14 h, privatisation le soir du mariage, brunch possible le lendemain",
    fin_de_soiree: "3 h, heures supplémentaires sur demande",
    acces: "Autoroute à moins d'un kilomètre ; Aix-en-Provence et Marseille à environ 30 min ; gares TGV et aéroport de Marseille à moins d'une heure",
    stationnement: "Parking d'environ 200 véhicules, accès PMR",
    contact: "+33 4 42 18 00 00",
    sources: "chateaudenans.com, funbooker.com, mariages.net",
    image: "/images/lieux/chateau-de-nans/01-chateau-vu-du-ciel.webp",
    imageAlt: "Le Château de Nans et son parc vus du ciel",
    gallery: [
      "/images/lieux/chateau-de-nans/01-chateau-vu-du-ciel.webp",
      "/images/lieux/chateau-de-nans/02-orangerie-dressee.webp",
      "/images/lieux/chateau-de-nans/03-soiree-sous-les-guirlandes.webp",
      "/images/lieux/chateau-de-nans/04-ceremonie-laique.webp",
      "/images/lieux/chateau-de-nans/05-reception-devant-le-chateau.webp",
      "/images/lieux/chateau-de-nans/06-orangerie-illuminee.webp",
      "/images/lieux/chateau-de-nans/07-cocktail-au-pied-de-la-tour.webp",
      "/images/lieux/chateau-de-nans/08-domaine-et-orangerie-vus-du-ciel.webp",
      "/images/lieux/chateau-de-nans/09-facade-du-chateau.webp",
      "/images/lieux/chateau-de-nans/10-orangerie-vitree.webp",
      "/images/lieux/chateau-de-nans/11-piscine.webp",
      "/images/lieux/chateau-de-nans/12-chateau-et-sainte-baume.webp",
      "/images/lieux/chateau-de-nans/13-salon.webp",
      "/images/lieux/chateau-de-nans/14-escalier.webp",
      "/images/lieux/chateau-de-nans/15-chambre.webp",
    ],
    photoCredit: "chateaudenans.com",
    minGuests: null,
    maxGuests: 250,
    priceFrom: 4760,
    sleeps: 36,
    budget: "€€",
  },
  {
    slug: 'mas-de-fontbelle',
    summary: "Mas provençal privatisé entre oliviers et collines, avec chapiteau de 225 m² et théâtre de verdure.",
    tags: ["Chapiteau", "Théâtre de verdure", "Une seule réception à la fois"],
    guestsShort: "Jusqu'à 150",
    lodgingShort: "Maison des mariés",
    priceShort: "Dès 4 950 €",
    nom_du_lieu: 'Le Mas de Fontbelle',
    commune: 'Besse-sur-Issole',
    zone: 'provence-verte',
    site_web_officiel: 'https://lemasdefontbelle.fr',
    description:
      "Au pied des collines de Besse-sur-Issole, ce mas en pierre entouré d'oliviers centenaires, de vignes et de la source de Fontbelle n'accueille qu'une réception à la fois. La cérémonie laïque se tient dans le théâtre de verdure, le dîner et la soirée sous un chapiteau illuminé de 225 m². Le traiteur et les prestataires sont au libre choix des mariés.",
    capacite_accueil: "Jusqu'à 150 invités (sous le chapiteau de 225 m²)",
    hebergement_sur_place: 'Oui (maison des mariés avec suite nuptiale à lit baldaquin, 2 nuits incluses)',
    type_de_cadre: 'Mas provençal, oliveraie et théâtre de verdure',
    fourchette_de_prix:
      "4 950 € (forfait « L'Instant précieux » : installation la veille, chapiteau, extérieurs, mobilier et 2 nuits) ou 5 950 € (forfait « Le Temps suspendu », avec le brunch du lendemain jusqu'à 18 h), plus ménage 210 € et agent de sécurité 250 €",
    element_differenciant:
      "Le théâtre de verdure en gradins, à l'ombre des chênes et des cyprès, pour une cérémonie laïque au cœur du domaine.",
    espaces: "Chapiteau de 225 m² (150 convives) ; théâtre de verdure en gradins ; espace cocktail ; maison des mariés et jardins",
    ceremonie_laique: "Dans le théâtre de verdure",
    traiteur: "Libre, avec des traiteurs et fleuristes recommandés",
    duree_location: "Accès la veille de 13 h à 19 h pour l'installation, 2 nuits sur place ; brunch du lendemain jusqu'à 18 h avec la formule « Le Temps suspendu »",
    acces: "A8 sortie 35 (Brignoles) à 15 min ; gare TGV Les Arcs-Draguignan à 25 min ; aéroport Toulon-Hyères à 45 min",
    stationnement: "Parking privatif d'environ 50 véhicules, accès PMR, place pour les navettes",
    contact: '+33 7 44 92 95 49',
    sources: 'lemasdefontbelle.fr',
    image: '/images/lieux/mas-de-fontbelle/01-domaine-vu-du-ciel.webp',
    imageAlt: 'Vue aérienne du Mas de Fontbelle au milieu des bois, des champs et des oliviers',
    gallery: [
      '/images/lieux/mas-de-fontbelle/01-domaine-vu-du-ciel.webp',
      '/images/lieux/mas-de-fontbelle/02-chapiteau-vu-du-ciel.webp',
      '/images/lieux/mas-de-fontbelle/03-mas-et-jardins.webp',
      '/images/lieux/mas-de-fontbelle/04-ceremonie-theatre-de-verdure.webp',
      '/images/lieux/mas-de-fontbelle/05-cocktail-theatre-de-verdure.webp',
      '/images/lieux/mas-de-fontbelle/06-table-dressee.webp',
      '/images/lieux/mas-de-fontbelle/07-suite-nuptiale.webp',
      '/images/lieux/mas-de-fontbelle/08-coucher-de-soleil.webp',
      '/images/lieux/mas-de-fontbelle/09-mas-vu-du-ciel.webp',
      '/images/lieux/mas-de-fontbelle/10-domaine-et-maison-vus-du-ciel.webp',
      '/images/lieux/mas-de-fontbelle/11-entree-du-domaine.webp',
      '/images/lieux/mas-de-fontbelle/12-echange-des-voeux.webp',
      '/images/lieux/mas-de-fontbelle/13-estrade-de-ceremonie.webp',
      '/images/lieux/mas-de-fontbelle/14-arche-et-banquette.webp',
      '/images/lieux/mas-de-fontbelle/15-gradins-du-theatre-de-verdure.webp',
      '/images/lieux/mas-de-fontbelle/16-allee-de-ceremonie.webp',
      '/images/lieux/mas-de-fontbelle/17-arche-fleurie.webp',
      '/images/lieux/mas-de-fontbelle/18-bassin-et-fontaine.webp',
      '/images/lieux/mas-de-fontbelle/19-art-de-la-table.webp',
      '/images/lieux/mas-de-fontbelle/20-decoration-lavande.webp',
      '/images/lieux/mas-de-fontbelle/21-decoration-dames-jeannes.webp',
      '/images/lieux/mas-de-fontbelle/22-ambiance-champetre.webp',
      '/images/lieux/mas-de-fontbelle/23-chapeaux-et-ombrelles.webp',
      '/images/lieux/mas-de-fontbelle/24-allee-de-pierre.webp',
      '/images/lieux/mas-de-fontbelle/25-allee-des-lauriers.webp',
      '/images/lieux/mas-de-fontbelle/26-facade-aux-rosiers.webp',
      '/images/lieux/mas-de-fontbelle/27-allee-des-oliviers.webp',
      '/images/lieux/mas-de-fontbelle/28-vue-sur-les-collines.webp',
      '/images/lieux/mas-de-fontbelle/29-vue-du-domaine.webp',
      '/images/lieux/mas-de-fontbelle/30-cirque-de-verdure.webp',
      '/images/lieux/mas-de-fontbelle/31-ruisseau-de-la-source.webp',
      '/images/lieux/mas-de-fontbelle/32-vignes-au-pied-du-domaine.webp',
      '/images/lieux/mas-de-fontbelle/33-coucher-de-soleil-sur-le-mas.webp',
      '/images/lieux/mas-de-fontbelle/34-maison-des-maries.webp',
      '/images/lieux/mas-de-fontbelle/35-lit-de-noces.webp',
      '/images/lieux/mas-de-fontbelle/36-piece-a-vivre.webp',
      '/images/lieux/mas-de-fontbelle/37-salon.webp',
      '/images/lieux/mas-de-fontbelle/38-chambre-principale.webp',
      '/images/lieux/mas-de-fontbelle/39-chambre-secondaire.webp',
      '/images/lieux/mas-de-fontbelle/40-chambre-et-coiffeuse.webp',
      '/images/lieux/mas-de-fontbelle/41-cuisine.webp',
      '/images/lieux/mas-de-fontbelle/42-salle-de-bain.webp',
      '/images/lieux/mas-de-fontbelle/43-cadeau-de-bienvenue.webp',
      '/images/lieux/mas-de-fontbelle/44-jardin-de-la-maison.webp',
      '/images/lieux/mas-de-fontbelle/45-jardin-et-cypres.webp',
    ],
    minGuests: null,
    maxGuests: 150,
    priceFrom: 4950,
    sleeps: 2,
    budget: '€€',
  },
  {
    slug: 'chateau-de-la-presidente',
    summary: "Demeure familiale du XIXe siècle et parc de 2 hectares, privatisés tout le week-end.",
    tags: ["Château", "Week-end privatisé", "Parc arboré"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "Non",
    priceShort: "Dès 3 000 €",
    nom_du_lieu: 'Château de la Présidente',
    commune: 'Brignoles',
    zone: 'provence-verte',
    site_web_officiel: 'https://chateau-de-la-presidente.fr',
    description:
      "Au cœur du Val de Camps, cette demeure du XIXe siècle préservée par la même famille se privatise du vendredi 10 h au dimanche 18 h. Une terrasse de 1 000 m² s'étend devant la façade, entourée d'un parc de 2 hectares avec un grand bassin, une mare et sa cascadelle. Le dîner se tient dans la grande salle à manger de 190 m², ouverte sur une salle de bal d'époque de 110 m².",
    capacite_accueil: "Jusqu'à 200 invités assis, 250 en cocktail",
    hebergement_sur_place: 'Non (appartement réservé aux enfants et aux baby-sitters)',
    type_de_cadre: 'Château du XIXe siècle et parc arboré',
    fourchette_de_prix:
      '3 000 € TTC le week-end (du vendredi 10 h au dimanche 18 h), plus environ 550 € de ménage, ouvert de Pâques à la Toussaint',
    element_differenciant:
      "Le domaine entier privatisé tout le week-end, avec son grand bassin dans le parc pour une cérémonie laïque.",
    espaces: "Grande salle à manger (190 m²) ; salle de bal d'époque (110 m²) ; terrasse de 1 000 m² ; parc de 2 hectares avec bassin, mare et cascadelle ; appartement pour les enfants",
    ceremonie_laique: "Dans le parc, autour du grand bassin",
    traiteur: "Libre ; traiteurs recommandés (Borges, Atelier Traiteur) et DJ sur demande",
    duree_location: "Du vendredi 10 h au dimanche 18 h, de Pâques à la Toussaint",
    acces: "A8 sortie 35 ; Toulon à 40 min, Aix-en-Provence à 45 min",
    stationnement: "Parking privé de 200 à 300 places, rampe d'accès PMR",
    contact: '+33 4 94 69 15 77',
    sources: 'chateau-de-la-presidente.fr',
    image: '/images/lieux/chateau-de-la-presidente/01-vue-aerienne.webp',
    imageAlt: 'Vue aérienne du Château de la Présidente, de sa cour et de son parc',
    gallery: [
      '/images/lieux/chateau-de-la-presidente/01-vue-aerienne.webp',
      '/images/lieux/chateau-de-la-presidente/02-parc-et-bassin.webp',
      '/images/lieux/chateau-de-la-presidente/03-salle-a-manger.webp',
      '/images/lieux/chateau-de-la-presidente/04-chateau-de-nuit.webp',
    ],
    minGuests: null,
    maxGuests: 250,
    priceFrom: 3000,
    sleeps: 0,
    budget: '€',
  },
];

/** Reception photos used to fill each venue gallery (illustrative, not the venues themselves). */
const galleryPool = [
  photos.longTable,
  photos.gardenCeremony,
  photos.chandelierHall,
  photos.toastLights,
  photos.floralColonnade,
  photos.lightsHall,
  photos.hillsideArch,
  photos.tableRed,
  photos.ceremonyAisle,
  photos.vineyardRows,
  photos.confettiCouple,
  photos.wineCellar,
  photos.sunsetHills,
  photos.villaArches,
  photos.catering,
  photos.brideBouquet,
];

export const GALLERY_SIZE = 5;

function buildGallery(main: string, index: number): string[] {
  const gallery = [main];
  for (let k = 0; gallery.length < GALLERY_SIZE; k++) {
    const id = galleryPool[(index * 3 + k * 5) % galleryPool.length];
    if (!gallery.includes(id)) gallery.push(id);
  }
  return gallery;
}

/** Venues curated by L'Édition (photos are illustrative unless the venue supplied its own). */
export const staticVenues: Venue[] = rawVenues.map((v, i) => ({
  ...v,
  zone: zoneBySlug[v.zone],
  hasAccommodation: v.hebergement_sur_place.toLowerCase().startsWith('oui'),
  gallery: v.gallery ?? buildGallery(v.image, i),
  illustrative: !v.gallery,
}));

/**
 * How useful a venue's listing is to a couple, which sets its place in the lists. Photos of the venue
 * itself count most, then the facts that let couples compare (capacity, price, beds on site) and a
 * listing kept up to date by its owner. Only data present in every copy of a listing is used, so the
 * server and the browser compute the same order.
 */
export function venueScore(v: Venue): number {
  let score = 0;
  if (!v.illustrative && v.gallery.length > 0) score += 40 + Math.min(v.gallery.length, 20);
  if (v.maxGuests !== null) score += 10;
  if (v.priceFrom !== null) score += 10;
  if (v.minGuests !== null) score += 2;
  score += Math.min(v.sleeps, 50) / 5;
  if (v.ownerUid) score += 10;
  // Venues whose website was built by Site-Chateau.fr, L'Édition's partner studio, are featured first.
  if (isSiteChateauClient(v.site_web_officiel)) score += 40;
  return score;
}

/** Points taken from a venue whose area is the same as the one just before it in the list. */
const SAME_AREA_PENALTY = 15;

/**
 * Venues from the most to the least useful (see venueScore), avoiding a run of venues from the same
 * area when two are close. Ties keep the editorial order of the list.
 */
function rankVenues(list: Venue[]): Venue[] {
  const pool = list.map((v) => ({ v, score: venueScore(v) }));
  const ranked: Venue[] = [];
  while (pool.length) {
    const previous = ranked[ranked.length - 1];
    let best = 0;
    let bestValue = -Infinity;
    pool.forEach(({ v, score }, k) => {
      const value = score - (previous && v.zone.slug === previous.zone.slug ? SAME_AREA_PENALTY : 0);
      if (value > bestValue) {
        best = k;
        bestValue = value;
      }
    });
    ranked.push(pool.splice(best, 1)[0].v);
  }
  return ranked;
}

/**
 * Every venue shown on the site, the most useful first (see rankVenues): the curated ones, plus the
 * listings published by professionals from their account (see src/catalog.ts). A listing with the
 * same slug replaces the curated venue (when its owner has claimed it).
 */
export let venues: Venue[] = rankVenues(staticVenues);

let listingVenues: Venue[] = [];
/** Curated venues withdrawn from the site in /admin (Firestore "removed" collection). */
let removedVenues = new Set<string>();

function mergeVenues() {
  const slugs = new Set(listingVenues.map((v) => v.slug));
  venues = rankVenues([...staticVenues.filter((v) => !slugs.has(v.slug) && !removedVenues.has(v.slug)), ...listingVenues]);
}

export function setListingVenues(list: Venue[]) {
  listingVenues = list;
  mergeVenues();
}

/** Ids of the curated listings withdrawn in /admin: venue slugs (vendors use "category.slug"). */
export function setRemovedVenues(ids: string[]) {
  removedVenues = new Set(ids);
  mergeVenues();
}

export function findVenue(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}

export function findZone(slug: string): Zone | undefined {
  return zoneBySlug[slug];
}

/** Area of a venue, its sector of the Var or its department, e.g. "Var" or "Bouches-du-Rhône". */
export function regionOf(v: Venue): string {
  return v.zone.department ? v.zone.name : 'Var';
}

/** Page of the venue's sector, or none for a venue outside the Var. */
export function zoneHref(zone: Zone, lang: 'fr' | 'en' = 'fr'): string | undefined {
  return zone.department ? undefined : pathsFor(lang).zone(zone.slug);
}

export function venuesInZone(zoneSlug: string): Venue[] {
  return venues.filter((v) => v.zone.slug === zoneSlug);
}

export function venueTarget(v: Venue): ContactTarget {
  return {
    id: v.slug,
    kind: 'venue',
    name: v.nom_du_lieu,
    place: `${v.commune}, ${v.zone.name}`,
    phone: v.contact,
    website: v.site_web_officiel || undefined,
    owner: v.ownerUid,
  };
}

/** "à Lorgues", "aux Arcs-sur-Argens", "au Pradet". */
export function inCommune(commune: string): string {
  if (commune.startsWith('Les ')) return `aux ${commune.slice(4)}`;
  if (commune.startsWith('Le ')) return `au ${commune.slice(3)}`;
  return `à ${commune}`;
}

/** Lowercase, accent-free string for forgiving search. */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** "+33 4 94 60 43 75" → "+33494604375" for tel: links. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
