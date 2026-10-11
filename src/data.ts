import { ContactTarget, Venue, Zone } from './types';
import { paths, pathsFor } from './paths';
import { photos } from './images';

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

Les lieux de la Dracénie couvrent toutes les tailles de réception. Le [Château Pimõ](/lieux/chateau-pimo) se limite à 50 invités pour un week-end intime, le [Château de Berne](/lieux/chateau-de-berne) propose une offre haut de gamme avec hôtel cinq étoiles, et le [Château de Font du Broc](/lieux/chateau-de-font-du-broc) accueille jusqu'à 650 invités assis. Le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) et son cloître du XIIe siècle offrent l'un des cadres historiques les plus marquants du département.`,
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

Pour un mariage, le Haut-Var séduit par ses lieux confidentiels et par ses soirées souvent plus fraîches en été. Les domaines y logent volontiers les invités pour tout le week-end, ce qui compense leur éloignement des grandes villes : le [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde) dispose d'environ 50 couchages en gîtes, et [La Bastide de Montferrat](/lieux/bastide-de-montferrat) de 40.

## Accès pour les invités

Comptez environ une demi-heure à trois quarts d'heure de route depuis la gare TGV des Arcs-Draguignan. Les routes de l'arrière-pays sont sinueuses : c'est une raison de plus pour loger les invités sur place.`,
    articles: ["lieu-mariage-hebergement-var","quelle-saison-mariage-var","organiser-mariage-var-guide"],
  },
  {
    slug: 'provence-verte',
    where: "en Provence Verte",
    name: 'Provence Verte',
    intro:
      "Autour de Brignoles et de la vallée de l'Argens, la Provence Verte mêle rivières, vignes et collines boisées. Châteaux historiques et bastides contemporaines y accueillent aussi bien les grandes réceptions que les mariages intimistes.",
    body: `## Se marier en Provence Verte

La Provence Verte s'étend autour de Brignoles et de Saint-Maximin-la-Sainte-Baume. Elle doit son nom à ses paysages : collines boisées, rivières comme l'Argens, vignobles des Coteaux varois en Provence et des Côtes de Provence.

## Un secteur facile d'accès

Traversé par l'autoroute A8 entre Aix-en-Provence et Nice, le secteur est l'un des plus accessibles du Var. Aix-en-Provence et Marseille sont à moins d'une heure de route : c'est un bon choix si beaucoup de vos invités viennent des Bouches-du-Rhône.

## Des lieux très différents

On y trouve un château du XVIe siècle avec le [Château de Robernier](/lieux/chateau-de-robernier), taillé pour les grandes réceptions, un domaine en biodynamie avec le [Château Mentone](/lieux/chateau-mentone), qui loge jusqu'à 54 personnes, et une bastide contemporaine avec la [Bastide Saint Julien](/lieux/bastide-saint-julien), qui reçoit jusqu'à 350 invités.`,
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

Au Pradet, le [Domaine Rocabella](/lieux/domaine-rocabella) propose une privatisation avec séjour dans une villa Belle Époque, avec piscines, criques et environ 86 couchages. En été, la circulation est dense sur le littoral : prévoyez des marges pour les trajets et des navettes en fin de soirée.`,
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
}

const rawVenues: RawVenue[] = [
  {
    slug: 'chateau-de-berne',
    summary: "Relais & Châteaux viticole et bio, formule clé en main avec hôtel 5 étoiles.",
    tags: ["Domaine viticole", "Haut de gamme", "Cérémonie au bord d'un lac"],
    guestsShort: "120 à 200",
    lodgingShort: "Hôtel 34 ch. + villas",
    priceShort: "Dès 19 500 €",
    nom_du_lieu: 'Château de Berne',
    commune: 'Lorgues',
    zone: 'dracenie',
    site_web_officiel: 'https://www.chateauberne.com',
    description:
      "Ce joyau de l'œnotourisme varois certifié bio se distingue par son atmosphère luxueuse et son architecture provençale immaculée. Entre ses espaces extérieurs majestueux et ses salles voûtées, ce Relais & Châteaux offre une expérience clé en main d'un raffinement rare.",
    capacite_accueil: '120 à 200 invités',
    hebergement_sur_place: 'Oui (hôtel 5 étoiles de 34 chambres + villas)',
    type_de_cadre: 'Domaine viticole et Relais & Châteaux',
    fourchette_de_prix: 'Dès 19 500 € (formule) / dès 95 500 € (privatisation totale)',
    element_differenciant:
      "La « Scène sur l'eau », un amphithéâtre perché au-dessus d'un lac pour les cérémonies.",
    contact: '+33 4 94 60 43 75',
    sources: 'chateauberne.com, bridebook.com',
    image: photos.vineyardRows,
    imageAlt: 'Rangs de vigne au coucher du soleil en Provence',
    minGuests: 120,
    maxGuests: 200,
    priceFrom: 19500,
    sleeps: 34,
    budget: '€€€',
  },
  {
    slug: 'chateau-sainte-roseline',
    summary: "Cru Classé historique avec cloître du XIIe siècle et salle des barriques.",
    tags: ["Château historique", "Domaine viticole", "Cloître classé"],
    guestsShort: "30 à 400",
    lodgingShort: "Appartement + 7 ch.",
    priceShort: "Salle dès 1 000 €",
    nom_du_lieu: 'Château Sainte Roseline',
    commune: 'Les Arcs-sur-Argens',
    zone: 'dracenie',
    site_web_officiel: 'https://www.sainte-roseline.com',
    description:
      "Haut lieu de l'histoire viticole et spirituelle du Var, ce domaine impressionne par sa majesté. Son immense allée de platanes et sa fameuse Salle des Barriques en font une adresse incontournable pour les réceptions de prestige.",
    capacite_accueil: "30 à 400 invités (jusqu'à 250 en Salle des Vendanges)",
    hebergement_sur_place: 'Oui (appartement privé + 7 chambres via forfait)',
    type_de_cadre: 'Château historique, Cru Classé et abbaye',
    fourchette_de_prix: 'Forfait mariage dès 7 000 € ou location de salle de 1 000 € à 1 800 €',
    element_differenciant: 'Son authentique cloître du XIIe siècle, classé monument historique.',
    contact: '+33 4 94 99 50 30',
    sources: 'sainte-roseline.com, abcsalles.com',
    image: photos.floralColonnade,
    imageAlt: 'Colonnade décorée de fleurs pour une réception de mariage',
    minGuests: 30,
    maxGuests: 400,
    priceFrom: 1000,
    sleeps: 8,
    budget: '€',
  },
  {
    slug: 'chateau-de-font-du-broc',
    summary: "Grand château viticole et haras, jardins à la française et salle équestre.",
    tags: ["Grande capacité", "Domaine viticole", "Salle équestre"],
    guestsShort: "100 à 650",
    lodgingShort: "Non",
    priceShort: "Dès 3 960 €",
    nom_du_lieu: 'Château de Font du Broc',
    commune: 'Les Arcs-sur-Argens',
    zone: 'dracenie',
    site_web_officiel: 'https://www.chateau-fontdubroc.com',
    description:
      "Ce domaine séduit immédiatement par ses jardins à la française et son architecture grandiose. Le cloître et la grande salle équestre créent un décor spectaculaire, digne des plus grands contes provençaux.",
    capacite_accueil: '100 à 650 invités assis',
    hebergement_sur_place: 'Non',
    type_de_cadre: 'Château, vignoble et haras',
    fourchette_de_prix: 'Dès 3 960 € (location salle vide)',
    element_differenciant:
      'La salle équestre monumentale et la cave à barriques, pour des photos uniques.',
    contact: '+33 4 98 11 45 45',
    sources: 'chateau-fontdubroc.com, abcsalles.com',
    image: photos.wineCellar,
    imageAlt: 'Chai viticole éclairé, ambiance de cave',
    minGuests: 100,
    maxGuests: 650,
    priceFrom: 3960,
    sleeps: 0,
    budget: '€',
  },
  {
    slug: 'chateau-pimo',
    summary: "Domaine intimiste à privatiser trois jours, avec suites et tentes nomades.",
    tags: ["Petit comité", "Week-end complet", "Glamping chic"],
    guestsShort: "Jusqu'à 50",
    lodgingShort: "50 couchages",
    priceShort: "Dès 15 000 €",
    nom_du_lieu: 'Château Pimõ',
    commune: 'Draguignan',
    zone: 'dracenie',
    site_web_officiel: 'https://www.chateaupimo.fr',
    description:
      "Niché dans un écrin de vignes et d'oliviers, ce domaine confidentiel cultive une approche intimiste. Ses tentes nomades et ses suites cinq étoiles permettent d'imaginer une réception bohème-chic prolongée sur le week-end.",
    capacite_accueil: "Jusqu'à 50 invités",
    hebergement_sur_place: 'Oui (5 suites + tentes nomades, 50 couchages)',
    type_de_cadre: 'Château et domaine nature',
    fourchette_de_prix: 'À partir de 15 000 € (privatisation sur 3 jours)',
    element_differenciant:
      'Une offre confidentielle avec glamping chic (tentes nomades) et un grand espace bien-être.',
    contact: '+33 7 77 00 48 81',
    sources: 'chateaupimo.fr, yesinprovence.com',
    image: photos.lightsHall,
    imageAlt: 'Salle de réception sous guirlandes lumineuses',
    minGuests: null,
    maxGuests: 50,
    priceFrom: 15000,
    sleeps: 50,
    budget: '€€€',
  },
  {
    slug: 'chateau-saint-ange',
    summary: "Bastide du XIXe siècle au cœur d'une oliveraie de plus de 1 000 arbres.",
    tags: ["Bastide", "Oliveraie", "Vue sur la vallée"],
    guestsShort: "Sur demande",
    lodgingShort: "8 chambres",
    priceShort: "Sur devis",
    nom_du_lieu: 'Château Saint Ange',
    commune: 'Draguignan',
    zone: 'dracenie',
    site_web_officiel: 'https://www.chateausaintange.com',
    description:
      "Cette bastide du XIXe siècle allie la pierre brute à une décoration intérieure très soignée. L'oliveraie offre une toile de fond typiquement provençale pour les cérémonies, tandis que les terrasses dominent la vallée.",
    capacite_accueil: 'Non communiquée (2 grandes salles disponibles)',
    hebergement_sur_place: 'Oui (8 chambres)',
    type_de_cadre: 'Bastide provençale et oliveraie',
    fourchette_de_prix: 'Sur devis',
    element_differenciant:
      "Un décor de cérémonie au cœur d'une plantation de plus de 1 000 oliviers.",
    contact: '+33 4 94 68 06 18',
    sources: 'chateausaintange.com',
    image: photos.hillsideArch,
    imageAlt: 'Arche de cérémonie fleurie face aux collines',
    minGuests: null,
    maxGuests: null,
    priceFrom: null,
    sleeps: 8,
    budget: null,
  },
  {
    slug: 'domaine-de-la-rotonde',
    summary: "Ancienne ferme templière en pierre, cour à arcades vitrées, en pleine forêt.",
    tags: ["Pierre ancienne", "Nature", "Gîtes sur place"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "Env. 50 couchages",
    priceShort: "Dès 12 500 € (estimé)",
    nom_du_lieu: 'Domaine de la Rotonde',
    commune: 'Villecroze',
    zone: 'haut-var',
    site_web_officiel: 'https://www.domaine-rotonde.com',
    description:
      "Ancienne ferme templière du XIIe siècle entourée de dizaines d'hectares de forêt, ce domaine respire l'authenticité. Ses aménagements contemporains contrastent avec la pierre ancienne et offrent des espaces très singuliers.",
    capacite_accueil: "Jusqu'à 250 invités",
    hebergement_sur_place: 'Oui (7 à 8 gîtes, env. 50 couchages)',
    type_de_cadre: 'Ancienne ferme templière en pierre',
    fourchette_de_prix: 'Sur devis (location estimée dès 12 500 €)',
    element_differenciant:
      'La cour intérieure historique, fermée par des arcades en verre contemporaines.',
    contact: '+33 6 11 54 37 90',
    sources: 'domaine-rotonde.com, visitvar.fr',
    image: photos.toastLights,
    imageAlt: 'Invités trinquant sous des guirlandes lumineuses',
    minGuests: null,
    maxGuests: 250,
    priceFrom: 12500,
    sleeps: 50,
    budget: '€€€',
  },
  {
    slug: 'bastide-de-montferrat',
    summary: "Maison de famille privatisée avec parc ombragé, qui loge 40 proches.",
    tags: ["Bastide", "Maison de famille", "Parc boisé"],
    guestsShort: "Jusqu'à 120",
    lodgingShort: "40 couchages",
    priceShort: "Sur devis",
    nom_du_lieu: 'La Bastide de Montferrat',
    commune: 'Montferrat',
    zone: 'haut-var',
    site_web_officiel: 'https://www.labastide83.com',
    description:
      "Propriété familiale de charme qui garantit une privatisation totale dans un cadre bucolique préservé. Son parc ombragé et sa capacité à loger les convives sur place en font un cocon idéal pour un week-end chaleureux.",
    capacite_accueil: "Jusqu'à 120 invités",
    hebergement_sur_place: 'Oui (20 chambres, 40 couchages)',
    type_de_cadre: 'Bastide provençale et parc boisé',
    fourchette_de_prix: 'Sur devis (chambres dès 85 €/nuit)',
    element_differenciant:
      "Un véritable esprit « grande maison de famille » pour s'approprier les lieux en toute intimité.",
    contact: '+33 4 94 50 21 30',
    sources: 'labastide83.com',
    image: photos.longTable,
    imageAlt: 'Longue table de mariage dressée avec bouquets',
    minGuests: null,
    maxGuests: 120,
    priceFrom: null,
    sleeps: 40,
    budget: null,
  },
  {
    slug: 'chateau-de-robernier',
    summary: "Château du XVIe siècle à tours, au milieu des vignes, pour les grandes réceptions.",
    tags: ["Château historique", "Grande capacité", "Vignoble"],
    guestsShort: "100 à 300",
    lodgingShort: "24 couchages",
    priceShort: "Dès 10 500 €",
    nom_du_lieu: 'Château de Robernier',
    commune: 'Montfort-sur-Argens',
    zone: 'provence-verte',
    site_web_officiel: 'http://www.chateauderobernier.com',
    description:
      "Flanqué de ses tours, ce château du XVIe siècle au milieu des vignes est la quintessence du romantisme. Sa grande cour d'honneur et ses salons sont taillés pour les événements d'envergure.",
    capacite_accueil: "100 à 300 invités en intérieur (jusqu'à 1 000 en extérieur)",
    hebergement_sur_place: 'Oui (15 chambres, 24 couchages)',
    type_de_cadre: 'Château du XVIe siècle',
    fourchette_de_prix: 'Dès 10 500 €',
    element_differenciant:
      'Une architecture de château de conte de fées, unique dans le paysage varois.',
    contact: '+33 4 94 04 78 49',
    sources: 'chateauderobernier.com, frenchweddingstyle.com',
    image: photos.chandelierHall,
    imageAlt: 'Salle de réception avec lustres et tables rondes',
    minGuests: 100,
    maxGuests: 1000,
    priceFrom: 10500,
    sleeps: 24,
    budget: '€€€',
  },
  {
    slug: 'chateau-mentone',
    summary: "Domaine en biodynamie avec grande salle, la Magnanerie, et 54 couchages.",
    tags: ["Domaine viticole", "Écoresponsable", "Grand hébergement"],
    guestsShort: "60 à 250",
    lodgingShort: "54 couchages",
    priceShort: "Dès 4 000 €",
    nom_du_lieu: 'Château Mentone',
    commune: 'Saint-Antonin-du-Var',
    zone: 'provence-verte',
    site_web_officiel: 'https://www.chateaumentone.com',
    description:
      "Mêlant l'esprit d'un grand domaine viticole à une démarche écoresponsable, cette propriété offre un cadre verdoyant. La Magnanerie offre un volume exceptionnel pour les dîners, complété par de nombreux hébergements.",
    capacite_accueil: '60 à 250 invités',
    hebergement_sur_place: "Oui (24 chambres et gîtes, jusqu'à 54 couchages)",
    type_de_cadre: 'Domaine viticole en biodynamie',
    fourchette_de_prix: 'Forfaits de 365 € à 465 € par personne (location seule dès 4 000 €)',
    element_differenciant:
      'Une offre œnotouristique et écologique très aboutie, dans une nature préservée.',
    contact: '+33 4 94 04 42 00',
    sources: 'chateaumentone.com',
    image: photos.tableRed,
    imageAlt: 'Table de banquet dressée pour un dîner de mariage',
    minGuests: 60,
    maxGuests: 250,
    priceFrom: 4000,
    sleeps: 54,
    budget: '€€',
  },
  {
    slug: 'bastide-saint-julien',
    summary: "Bastide contemporaine entre lavande et roseraies, grand salon de 500 m².",
    tags: ["Bastide", "Contemporain", "Lavande"],
    guestsShort: "160 à 350",
    lodgingShort: "24 couchages",
    priceShort: "Dès 3 000 € (estimé)",
    nom_du_lieu: 'Bastide Saint Julien',
    commune: 'La Celle',
    zone: 'provence-verte',
    site_web_officiel: 'https://www.bastide-saint-julien.com',
    description:
      "Élégante et lumineuse, cette bastide réinterprète l'art de vivre provençal avec une touche contemporaine. Entourée de champs de lavande et de roseraies, elle propose des espaces de réception haut de gamme.",
    capacite_accueil: '160 à 350 invités',
    hebergement_sur_place: 'Oui (10 chambres, 24 couchages)',
    type_de_cadre: 'Bastide contemporaine',
    fourchette_de_prix: 'Sur devis (location estimée dès 3 000 €)',
    element_differenciant:
      'Le contraste entre la façade provençale historique et le grand salon épuré de 500 m².',
    contact: '+33 4 94 86 26 60',
    sources: 'bastide-saint-julien.com, rolandpaix.com',
    image: photos.gardenCeremony,
    imageAlt: 'Cérémonie laïque en plein air dans un jardin',
    minGuests: 160,
    maxGuests: 350,
    priceFrom: 3000,
    sleeps: 24,
    budget: '€',
  },
  {
    slug: 'domaine-rocabella',
    summary: "Villa Belle Époque face à la mer, piscines et criques, séjour des proches inclus.",
    tags: ["Vue mer", "Villa", "Séjour tout compris"],
    guestsShort: "Jusqu'à 150",
    lodgingShort: "Env. 86 couchages",
    priceShort: "Dès 37 440 €",
    nom_du_lieu: 'Domaine Rocabella',
    commune: 'Le Pradet',
    zone: 'toulon',
    site_web_officiel: 'https://www.rocabella.fr',
    description:
      "Face à la Méditerranée, cette propriété à l'architecture Belle Époque incarne le luxe azuréen. Avec ses piscines et ses jardins, elle se prête à des mariages très cinématographiques.",
    capacite_accueil: "Jusqu'à 150 invités",
    hebergement_sur_place: 'Oui (28 suites et chambres, env. 86 couchages)',
    type_de_cadre: 'Villa Belle Époque en front de mer',
    fourchette_de_prix: 'Dès 37 440 € (séjour de 2 nuits pour 32 personnes inclus)',
    element_differenciant:
      'Un accès à des criques privées et un panorama maritime spectaculaire.',
    contact: '+33 4 23 46 00 94',
    sources: 'rocabella.fr, wedinspire.com',
    image: photos.seaDeck,
    imageAlt: 'Terrasse et piscine face à la mer',
    minGuests: null,
    maxGuests: 150,
    priceFrom: 37440,
    sleeps: 86,
    budget: '€€€',
  },
  {
    slug: 'les-pins-penches',
    summary: "Château du XVIIe siècle dominant la rade de Toulon, parc de palmiers jusqu'à la mer.",
    tags: ["Vue mer", "Grande capacité", "Jardin exotique"],
    guestsShort: "Jusqu'à 400",
    lodgingShort: "Non",
    priceShort: "Menus dès 70 €/pers.",
    nom_du_lieu: 'Les Pins Penchés',
    commune: 'Toulon',
    zone: 'toulon',
    site_web_officiel: 'https://www.lespinspenches.com',
    description:
      "Institution dominant la rade de Toulon, ce château du XVIIe siècle trône au milieu d'une végétation exotique. La vue panoramique et l'offre gastronomique en font un lieu taillé pour les grandes réceptions.",
    capacite_accueil: "Jusqu'à 400 personnes assises",
    hebergement_sur_place: 'Non (hôtels partenaires à proximité)',
    type_de_cadre: 'Château du XVIIe siècle face à la mer',
    fourchette_de_prix: 'Menus de 70 € à 88 € par personne (frais de lieu sur devis)',
    element_differenciant:
      'Un parc de palmiers descendant vers la mer, pour une garden-party mémorable.',
    contact: '+33 4 94 27 98 98',
    sources: 'lespinspenches.com',
    image: photos.palmPool,
    imageAlt: 'Palmiers et piscine au coucher du soleil',
    minGuests: null,
    maxGuests: 400,
    priceFrom: null,
    sleeps: 0,
    budget: null,
  },
  {
    slug: 'chateau-maravenne',
    summary: "Domaine viticole bio face aux îles d'Or, théâtre de verdure pour la cérémonie.",
    tags: ["Domaine viticole", "Vue mer", "Bio"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "29 couchages",
    priceShort: "Dès 4 300 €",
    nom_du_lieu: 'Château Maravenne',
    commune: 'La Londe-les-Maures',
    zone: 'littoral',
    site_web_officiel: 'https://www.maravenne.com',
    description:
      "Face aux îles d'Or, ce domaine viticole certifié bio combine terroir provençal et horizon marin. Ses grandes salles voûtées en pierre accueillent des réceptions de standing, au calme dans les vignes.",
    capacite_accueil: "Jusqu'à 160 invités assis (250 en extérieur)",
    hebergement_sur_place: "Oui (chambres d'hôtes et gîtes pour 29 personnes)",
    type_de_cadre: 'Domaine viticole bio',
    fourchette_de_prix: 'À partir de 4 300 € (location des espaces)',
    element_differenciant:
      'Un théâtre de verdure pour les cérémonies laïques, avec vue sur Porquerolles.',
    contact: '+33 4 94 66 80 20',
    sources: 'maravenne.com, bridebook.com',
    image: photos.sunsetHills,
    imageAlt: 'Invités contemplant le coucher du soleil sur les collines',
    minGuests: null,
    maxGuests: 250,
    priceFrom: 4300,
    sleeps: 29,
    budget: '€€',
  },
  {
    slug: 'domaine-souviou',
    summary: "Bastide séculaire au milieu de 7 000 oliviers, avec une grande esplanade.",
    tags: ["Oliveraie", "Domaine viticole", "Plein air"],
    guestsShort: "20 à 300",
    lodgingShort: "Non",
    priceShort: "Dès 3 000 € (estimé)",
    nom_du_lieu: 'Domaine Souviou',
    commune: 'Le Beausset',
    zone: 'ouest-var',
    site_web_officiel: 'https://www.domainesouviou.com',
    description:
      "Véritable sanctuaire provençal, ce domaine se distingue par sa bastide séculaire et son atmosphère hors du temps. L'esplanade et le Pavillon du Moulin offrent de grandes configurations pour des noces élégantes.",
    capacite_accueil: '20 à 300 invités',
    hebergement_sur_place: 'Non',
    type_de_cadre: 'Domaine viticole et oliveraie',
    fourchette_de_prix: 'Sur devis (location estimée dès 3 000 €)',
    element_differenciant:
      'Une oliveraie de 7 000 arbres, dont certains millénaires, qui donne une âme rare aux réceptions.',
    contact: '+33 4 94 89 01 12',
    sources: 'domainesouviou.com, funbooker.com',
    image: photos.villaArches,
    imageAlt: 'Bastide à arcades et piscine à la tombée de la nuit',
    minGuests: 20,
    maxGuests: 300,
    priceFrom: 3000,
    sleeps: 0,
    budget: '€',
  },
  {
    slug: 'chateau-de-nans',
    summary: "Château classique au pied de la Sainte-Baume, orangerie vitrée face à la forêt.",
    tags: ["Château", "Orangerie", "Parc arboré"],
    guestsShort: "Jusqu'à 250",
    lodgingShort: "36 couchages",
    priceShort: "Dès 4 760 €",
    nom_du_lieu: 'Château de Nans',
    commune: 'Nans-les-Pins',
    zone: 'sainte-baume',
    site_web_officiel: 'https://www.chateaudenans.com',
    description:
      "Adossée au massif de la Sainte-Baume, cette bâtisse classique se dresse au milieu d'un grand parc arboré. L'orangerie baignée de lumière accueille d'importantes réceptions tout en préservant un esprit haut de gamme.",
    capacite_accueil: "Jusqu'à 250 invités (dans l'Orangerie)",
    hebergement_sur_place: "Oui (jusqu'à 36 couchages)",
    type_de_cadre: 'Château classique et parc arboré',
    fourchette_de_prix: 'De 4 760 € à 6 800 € (privatisation selon le jour)',
    element_differenciant:
      "L'architecture vitrée de l'Orangerie, qui plonge les convives dans la forêt domaniale.",
    contact: '+33 4 94 78 92 06',
    sources: 'chateaudenans.com, abcsalles.com',
    image: photos.forestLight,
    imageAlt: 'Forêt baignée de lumière dorée',
    minGuests: null,
    maxGuests: 250,
    priceFrom: 4760,
    sleeps: 36,
    budget: '€€',
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

/** Venues curated by L'Édition (photos are illustrative). */
export const staticVenues: Venue[] = rawVenues.map((v, i) => ({
  ...v,
  zone: zoneBySlug[v.zone],
  hasAccommodation: v.hebergement_sur_place.toLowerCase().startsWith('oui'),
  gallery: buildGallery(v.image, i),
  illustrative: true,
}));

/**
 * Every venue shown on the site: the curated ones, plus the listings published by professionals
 * from their account (see src/catalog.ts). A listing with the same slug replaces the curated venue
 * (when its owner has claimed it).
 */
export let venues: Venue[] = staticVenues;

let listingVenues: Venue[] = [];
/** Curated venues withdrawn from the site in /admin (Firestore "removed" collection). */
let removedVenues = new Set<string>();

function mergeVenues() {
  const slugs = new Set(listingVenues.map((v) => v.slug));
  venues = [...staticVenues.filter((v) => !slugs.has(v.slug) && !removedVenues.has(v.slug)), ...listingVenues];
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
