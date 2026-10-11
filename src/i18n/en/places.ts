/*
 * English text of the areas and curated venues of src/data.ts, by slug (see src/i18n/content.ts).
 */

export interface EnZoneText {
  name: string;
  /** Name with its English preposition, e.g. "in the Dracénie". */
  where: string;
  intro: string;
  /** Markdown subset (see src/lib/richtext.tsx). */
  body: string;
}

export interface EnVenueText {
  summary: string;
  tags: string[];
  guestsShort: string;
  lodgingShort: string;
  priceShort: string;
  description: string;
  capacite_accueil: string;
  hebergement_sur_place: string;
  type_de_cadre: string;
  fourchette_de_prix: string;
  element_differenciant: string;
  imageAlt: string;
}

export const enZones: Record<string, EnZoneText> = {
  dracenie: {
    name: 'Dracénie',
    where: 'in the Dracénie',
    intro:
      "Around Draguignan, Lorgues and Les Arcs-sur-Argens, the Dracénie is the winemaking heart of the Côtes de Provence. It has the greatest concentration of châteaux and wine estates in the Var, many of them with vaulted cellars, plane-tree avenues and accommodation on site.",
    body: `## Getting married in the Dracénie

The Dracénie spreads out around Draguignan, in the centre of the Var. It is a land of vineyards, hilltop villages such as Lorgues and old bastides, at the foot of the first hills of the Haut-Var. For a wedding, this is above all wine-estate country: vaulted cellars, barrel rooms, plane-tree avenues and Côtes de Provence wines poured where they are made.

## Getting there for your guests

Les Arcs-Draguignan TGV station sits right in the middle of the area, which makes it easy for guests to travel down from Paris, Lyon or Marseille. Toulon-Hyères and Nice airports are about an hour's drive away. Most estates lie on their own among the vines, so plan for accommodation on site or shuttles at the end of the evening.

## Which venue for which wedding

The venues of the Dracénie cover every size of celebration. [Château Pimõ](/en/venues/chateau-pimo) keeps things to 50 guests for an intimate weekend, [Château de Berne](/en/venues/chateau-de-berne) offers a luxury package with a five-star hotel, and [Château de Font du Broc](/en/venues/chateau-de-font-du-broc) can seat up to 650 guests. [Château Sainte Roseline](/en/venues/chateau-sainte-roseline), with its 12th-century cloister, is one of the most striking historic settings in the Var.`,
  },
  'haut-var': {
    name: 'Haut-Var',
    where: 'in the Haut-Var',
    intro:
      "Hilltop villages, oak forests and weathered stone: between Draguignan and the Gorges du Verdon, the Haut-Var offers more secluded venues, ideal for a wedding close to nature where guests stay for the whole weekend.",
    body: `## Getting married in the Haut-Var

The Haut-Var takes in the plateaux and hills of the north of the department, between Draguignan and the Gorges du Verdon. Hilltop villages, oak forests, old stone: this is the Provence of the hinterland, quieter and greener than the coast.

## An area for nature-lover weddings

For a wedding, the Haut-Var appeals with its secluded venues and its evenings, which are often cooler in summer. Estates here are happy to put guests up for the whole weekend, which makes up for being further from the big cities: [Domaine de la Rotonde](/en/venues/domaine-de-la-rotonde) sleeps around 50 in its gîtes, and [La Bastide de Montferrat](/en/venues/bastide-de-montferrat) sleeps 40.

## Getting there for your guests

Allow roughly half an hour to three quarters of an hour by road from Les Arcs-Draguignan TGV station. The back-country roads are winding: all the more reason to have guests stay on site.`,
  },
  'provence-verte': {
    name: 'Provence Verte',
    where: 'in Provence Verte',
    intro:
      "Around Brignoles and the Argens valley, Provence Verte blends rivers, vineyards and wooded hills. Historic châteaux and contemporary bastides host both large celebrations and intimate weddings.",
    body: `## Getting married in Provence Verte

Provence Verte, or “Green Provence”, stretches around Brignoles and Saint-Maximin-la-Sainte-Baume. It owes its name to its landscapes: wooded hills, rivers such as the Argens, and the vineyards of the Coteaux Varois en Provence and Côtes de Provence appellations.

## An easy area to reach

With the A8 motorway running through it between Aix-en-Provence and Nice, this is one of the most accessible parts of the Var. Aix-en-Provence and Marseille are less than an hour's drive away, making it a good choice if many of your guests are coming from the Bouches-du-Rhône.

## Very different venues

Here you will find a 16th-century château built for large celebrations, [Château de Robernier](/en/venues/chateau-de-robernier); a biodynamic estate that sleeps up to 54, [Château Mentone](/en/venues/chateau-mentone); and a contemporary bastide that welcomes up to 350 guests, [Bastide Saint Julien](/en/venues/bastide-saint-julien).`,
  },
  toulon: {
    name: 'Toulon area',
    where: 'around Toulon',
    intro:
      "Between the harbour of Toulon and the Giens peninsula, the venues here make the most of the sea: panoramic views, exotic gardens and Belle Époque villas, just minutes from Toulon station and Toulon-Hyères airport.",
    body: `## Getting married in and around Toulon

Toulon and its surroundings are the most urban part of the Var, but also one of the most spectacular: the great natural harbour, Mont Faron, and the capes and coves of the coastline. Venues here enjoy panoramic views over the sea.

## The easiest area for your guests

A TGV station in Toulon, Toulon-Hyères airport close by and plenty of hotels: this is the most practical area for guests travelling from afar. For a venue without accommodation, such as [Les Pins Penchés](/en/venues/les-pins-penches), which seats up to 400 guests, that is a real advantage.

## A villa facing the sea

In Le Pradet, [Domaine Rocabella](/en/venues/domaine-rocabella) offers exclusive use with a stay in a Belle Époque villa, complete with pools, coves and around 86 beds. In summer, traffic along the coast is heavy: allow extra time for journeys and lay on shuttles at the end of the evening.`,
  },
  littoral: {
    name: 'Var coast',
    where: 'on the Var coast',
    intro:
      "Facing the Îles d'Or, the Var coast pairs vineyards with sea views. Estates here are often tucked between the Massif des Maures and the Mediterranean, perfect for open-air ceremonies looking out to Porquerolles.",
    body: `## Getting married on the Var coast

Between Hyères and the Gulf of Saint-Tropez, the Var coast brings together beaches, rocky headlands, the Massif des Maures and vineyards that run down to the sea. Offshore, the Îles d'Or (Porquerolles, Port-Cros and Le Levant) draw a horizon like no other.

## The sea as a backdrop

For a wedding, this area offers what many couples are looking for: a ceremony with a sea view, on a wine estate rather than in town. [Château Maravenne](/en/venues/chateau-maravenne), in La Londe-les-Maures, is the finest example, with its open-air garden theatre facing Porquerolles and its vaulted rooms for dinner.

## Access and season

Toulon-Hyères airport is very close by. In July and August, traffic on the coast is very heavy, so plan your guests' arrival times carefully. September, when the sea is still warm and the roads are quieter, is an ideal time.`,
  },
  'ouest-var': {
    name: 'West Var',
    where: 'in West Var',
    intro:
      "In Bandol wine country, between Toulon and the Sainte-Baume, West Var is the land of mas farmhouses and olive groves. Estates here offer generous outdoor spaces for relaxed country receptions beneath the trees.",
    body: `## Getting married in West Var

West Var lies between Toulon, the Sainte-Baume massif and the Bouches-du-Rhône. This is Bandol country, an appellation renowned for its Mourvèdre red wines, with hilltop villages such as Le Castellet and large olive groves.

## Close to Marseille and Aix

The area is close to Marseille and Aix-en-Provence, which makes it easy for guests to get here. It is also exposed to the mistral, which can blow hard: always have a sheltered plan B for the ceremony and the drinks reception.

## A wedding beneath the olive trees

In Le Beausset, [Domaine Souviou](/en/venues/domaine-souviou) welcomes 20 to 300 guests in the middle of an olive grove of 7,000 trees, some of them a thousand years old. The venue does not offer accommodation, so plan for your guests to stay in Bandol, Le Castellet or Toulon.`,
  },
  'sainte-baume': {
    name: 'Sainte-Baume',
    where: 'in the Sainte-Baume',
    intro:
      "Set against the Sainte-Baume massif and its state forest, the venues in this area offer cool shade, large wooded parks and classical architecture, less than an hour from Aix-en-Provence and Marseille.",
    body: `## Getting married at the foot of the Sainte-Baume

The Sainte-Baume massif marks the boundary between the Var and the Bouches-du-Rhône. Its state forest, one of the most remarkable in Provence, brings shade and cool air, even at the height of summer.

## A good choice for summer

The area combines closeness to Aix-en-Provence and Marseille, less than an hour's drive away, with an unspoilt setting. It is a good choice for a summer wedding, when the heat on the coast is intense.

## An orangery facing the forest

[Château de Nans](/en/venues/chateau-de-nans), in Nans-les-Pins, welcomes up to 250 guests in its glass orangery, which opens onto the forest, and sleeps up to 36. Its prices vary with the day of the week, which makes Fridays and Sundays worth considering.`,
  },
};

export const enVenues: Record<string, EnVenueText> = {
  'chateau-de-berne': {
    summary: 'Organic wine estate and Relais & Châteaux, all-inclusive package with a five-star hotel.',
    tags: ['Wine estate', 'Luxury', 'Lakeside ceremony'],
    guestsShort: '120 to 200',
    lodgingShort: '34-room hotel + villas',
    priceShort: 'From €19,500',
    description:
      "This certified-organic jewel of Var wine tourism stands out for its luxurious atmosphere and immaculate Provençal architecture. Between its majestic grounds and its vaulted rooms, this Relais & Châteaux offers a turnkey experience of rare refinement.",
    capacite_accueil: '120 to 200 guests',
    hebergement_sur_place: 'Yes (34-room five-star hotel + villas)',
    type_de_cadre: 'Wine estate and Relais & Châteaux',
    fourchette_de_prix: 'From €19,500 (package) / from €95,500 (exclusive use of the whole estate)',
    element_differenciant:
      "The “Scène sur l'eau”, an amphitheatre set above a lake for ceremonies.",
    imageAlt: 'Rows of vines at sunset in Provence',
  },
  'chateau-sainte-roseline': {
    summary: 'Historic Cru Classé with a 12th-century cloister and a barrel hall.',
    tags: ['Historic château', 'Wine estate', 'Listed cloister'],
    guestsShort: '30 to 400',
    lodgingShort: 'Apartment + 7 rooms',
    priceShort: 'Venue hire from €1,000',
    description:
      "A landmark in the wine-growing and spiritual history of the Var, this estate impresses with its grandeur. Its vast plane-tree avenue and its famous Salle des Barriques, the barrel hall, make it a must for prestigious receptions.",
    capacite_accueil: '30 to 400 guests (up to 250 in the Salle des Vendanges)',
    hebergement_sur_place: 'Yes (private apartment + 7 rooms as part of a package)',
    type_de_cadre: 'Historic château, Cru Classé and abbey',
    fourchette_de_prix: 'Wedding package from €7,000, or venue hire from €1,000 to €1,800',
    element_differenciant: 'Its authentic 12th-century cloister, a listed historic monument.',
    imageAlt: 'Colonnade decorated with flowers for a wedding reception',
  },
  'chateau-de-font-du-broc': {
    summary: 'Grand wine château and stud farm, with formal French gardens and an equestrian hall.',
    tags: ['Large capacity', 'Wine estate', 'Equestrian hall'],
    guestsShort: '100 to 650',
    lodgingShort: 'No',
    priceShort: 'From €3,960',
    description:
      "This estate wins you over at first sight with its formal French gardens and grand architecture. The cloister and the vast equestrian hall create a spectacular setting, worthy of the finest Provençal fairy tales.",
    capacite_accueil: '100 to 650 seated guests',
    hebergement_sur_place: 'No',
    type_de_cadre: 'Château, vineyard and stud farm',
    fourchette_de_prix: 'From €3,960 (empty venue hire)',
    element_differenciant:
      'The monumental equestrian hall and the barrel cellar, for one-of-a-kind photos.',
    imageAlt: 'Lit wine cellar with a cave-like atmosphere',
  },
  'chateau-pimo': {
    summary: 'Intimate estate for exclusive use over three days, with suites and nomad tents.',
    tags: ['Intimate wedding', 'Full weekend', 'Chic glamping'],
    guestsShort: 'Up to 50',
    lodgingShort: 'Sleeps 50',
    priceShort: 'From €15,000',
    description:
      "Nestled among vines and olive trees, this discreet estate cultivates an intimate approach. Its nomad tents and five-star suites lend themselves to a boho-chic celebration that carries on through the weekend.",
    capacite_accueil: 'Up to 50 guests',
    hebergement_sur_place: 'Yes (5 suites + nomad tents, sleeps 50)',
    type_de_cadre: 'Château and natural estate',
    fourchette_de_prix: 'From €15,000 (exclusive use for 3 days)',
    element_differenciant:
      'A discreet offering with chic glamping (nomad tents) and a large wellness area.',
    imageAlt: 'Reception room under strings of fairy lights',
  },
  'chateau-saint-ange': {
    summary: '19th-century bastide in the heart of an olive grove of more than 1,000 trees.',
    tags: ['Bastide', 'Olive grove', 'Valley views'],
    guestsShort: 'On request',
    lodgingShort: '8 rooms',
    priceShort: 'On request',
    description:
      "This 19th-century bastide pairs raw stone with beautifully considered interiors. The olive grove makes a quintessentially Provençal backdrop for ceremonies, while the terraces look out over the valley.",
    capacite_accueil: 'Not disclosed (2 large function rooms available)',
    hebergement_sur_place: 'Yes (8 rooms)',
    type_de_cadre: 'Provençal bastide and olive grove',
    fourchette_de_prix: 'Quote on request',
    element_differenciant:
      'A ceremony setting in the heart of a plantation of more than 1,000 olive trees.',
    imageAlt: 'Flower-decked ceremony arch facing the hills',
  },
  'domaine-de-la-rotonde': {
    summary: 'Former Templar stone farm with a glass-arcaded courtyard, deep in the forest.',
    tags: ['Old stone', 'Nature', 'Gîtes on site'],
    guestsShort: 'Up to 250',
    lodgingShort: 'Sleeps approx. 50',
    priceShort: 'From €12,500 (estimate)',
    description:
      "A former 12th-century Templar farm surrounded by dozens of hectares of forest, this estate breathes authenticity. Its contemporary additions contrast with the old stone and create truly distinctive spaces.",
    capacite_accueil: 'Up to 250 guests',
    hebergement_sur_place: 'Yes (7 to 8 gîtes, sleeps approx. 50)',
    type_de_cadre: 'Former Templar stone farm',
    fourchette_de_prix: 'Quote on request (hire estimated from €12,500)',
    element_differenciant:
      'The historic inner courtyard, enclosed by contemporary glass arcades.',
    imageAlt: 'Guests raising a toast under strings of fairy lights',
  },
  'bastide-de-montferrat': {
    summary: 'Family home for exclusive use with a shady park, sleeping 40 of your nearest and dearest.',
    tags: ['Bastide', 'Family home', 'Wooded park'],
    guestsShort: 'Up to 120',
    lodgingShort: 'Sleeps 40',
    priceShort: 'On request',
    description:
      "A charming family property that guarantees complete exclusive use in an unspoilt pastoral setting. Its shady park and its ability to put guests up on site make it a perfect cocoon for a warm, convivial weekend.",
    capacite_accueil: 'Up to 120 guests',
    hebergement_sur_place: 'Yes (20 rooms, sleeps 40)',
    type_de_cadre: 'Provençal bastide and wooded park',
    fourchette_de_prix: 'Quote on request (rooms from €85 per night)',
    element_differenciant:
      "A true “big family home” spirit, so you can make the place your own in complete privacy.",
    imageAlt: 'Long wedding table laid with bouquets',
  },
  'chateau-de-robernier': {
    summary: '16th-century turreted château among the vines, made for large celebrations.',
    tags: ['Historic château', 'Large capacity', 'Vineyard'],
    guestsShort: '100 to 300',
    lodgingShort: 'Sleeps 24',
    priceShort: 'From €10,500',
    description:
      "Flanked by its towers, this 16th-century château set among the vines is the very essence of romance. Its great courtyard and its salons are made for large-scale events.",
    capacite_accueil: '100 to 300 guests indoors (up to 1,000 outdoors)',
    hebergement_sur_place: 'Yes (15 rooms, sleeps 24)',
    type_de_cadre: '16th-century château',
    fourchette_de_prix: 'From €10,500',
    element_differenciant:
      'Fairy-tale château architecture, unique in the Var landscape.',
    imageAlt: 'Reception room with chandeliers and round tables',
  },
  'chateau-mentone': {
    summary: 'Biodynamic estate with a large hall, La Magnanerie, and sleeping for 54.',
    tags: ['Wine estate', 'Eco-friendly', 'Plenty of accommodation'],
    guestsShort: '60 to 250',
    lodgingShort: 'Sleeps 54',
    priceShort: 'From €4,000',
    description:
      "Combining the spirit of a great wine estate with an eco-conscious approach, this property offers a lush green setting. La Magnanerie provides an exceptionally spacious hall for dinners, complemented by plenty of accommodation.",
    capacite_accueil: '60 to 250 guests',
    hebergement_sur_place: 'Yes (24 rooms and gîtes, sleeps up to 54)',
    type_de_cadre: 'Biodynamic wine estate',
    fourchette_de_prix: 'Packages from €365 to €465 per person (venue hire only from €4,000)',
    element_differenciant:
      'A highly accomplished wine-tourism and eco-friendly offering, in unspoilt countryside.',
    imageAlt: 'Banquet table laid for a wedding dinner',
  },
  'bastide-saint-julien': {
    summary: 'Contemporary bastide among lavender and rose gardens, with a 500 m² grand salon.',
    tags: ['Bastide', 'Contemporary', 'Lavender'],
    guestsShort: '160 to 350',
    lodgingShort: 'Sleeps 24',
    priceShort: 'From €3,000 (estimate)',
    description:
      "Elegant and full of light, this bastide reinterprets the Provençal art of living with a contemporary touch. Surrounded by lavender fields and rose gardens, it offers upmarket reception spaces.",
    capacite_accueil: '160 to 350 guests',
    hebergement_sur_place: 'Yes (10 rooms, sleeps 24)',
    type_de_cadre: 'Contemporary bastide',
    fourchette_de_prix: 'Quote on request (hire estimated from €3,000)',
    element_differenciant:
      'The contrast between the historic Provençal façade and the sleek 500 m² grand salon.',
    imageAlt: 'Open-air symbolic ceremony in a garden',
  },
  'domaine-rocabella': {
    summary: 'Belle Époque villa facing the sea, with pools and coves, and a stay for your loved ones included.',
    tags: ['Sea view', 'Villa', 'All-inclusive stay'],
    guestsShort: 'Up to 150',
    lodgingShort: 'Sleeps approx. 86',
    priceShort: 'From €37,440',
    description:
      "Facing the Mediterranean, this Belle Époque property embodies the luxury of the Riviera. With its pools and gardens, it lends itself to wonderfully cinematic weddings.",
    capacite_accueil: 'Up to 150 guests',
    hebergement_sur_place: 'Yes (28 suites and rooms, sleeps approx. 86)',
    type_de_cadre: 'Seafront Belle Époque villa',
    fourchette_de_prix: 'From €37,440 (2-night stay for 32 people included)',
    element_differenciant:
      'Access to private coves and a spectacular sea panorama.',
    imageAlt: 'Terrace and swimming pool facing the sea',
  },
  'les-pins-penches': {
    summary: "17th-century château overlooking Toulon harbour, with a palm-tree park running down to the sea.",
    tags: ['Sea view', 'Large capacity', 'Exotic garden'],
    guestsShort: 'Up to 400',
    lodgingShort: 'No',
    priceShort: 'Menus from €70 per person',
    description:
      "An institution overlooking Toulon harbour, this 17th-century château reigns over lush exotic vegetation. The panoramic view and the fine-dining offer make it a venue built for large celebrations.",
    capacite_accueil: 'Up to 400 seated guests',
    hebergement_sur_place: 'No (partner hotels nearby)',
    type_de_cadre: '17th-century château facing the sea',
    fourchette_de_prix: 'Menus from €70 to €88 per person (venue fee on request)',
    element_differenciant:
      'A park of palm trees sloping down to the sea, for a memorable garden party.',
    imageAlt: 'Palm trees and swimming pool at sunset',
  },
  'chateau-maravenne': {
    summary: "Organic wine estate facing the Îles d'Or, with an open-air garden theatre for the ceremony.",
    tags: ['Wine estate', 'Sea view', 'Organic'],
    guestsShort: 'Up to 250',
    lodgingShort: 'Sleeps 29',
    priceShort: 'From €4,300',
    description:
      "Facing the Îles d'Or, this certified-organic wine estate combines Provençal terroir with a sea horizon. Its large vaulted stone rooms host elegant receptions, in peace and quiet among the vines.",
    capacite_accueil: 'Up to 160 seated guests (250 outdoors)',
    hebergement_sur_place: 'Yes (B&B rooms and gîtes for 29 people)',
    type_de_cadre: 'Organic wine estate',
    fourchette_de_prix: 'From €4,300 (hire of the spaces)',
    element_differenciant:
      'An open-air garden theatre for symbolic ceremonies, with a view of Porquerolles.',
    imageAlt: 'Guests watching the sunset over the hills',
  },
  'domaine-souviou': {
    summary: 'Centuries-old bastide amid 7,000 olive trees, with a large open terrace.',
    tags: ['Olive grove', 'Wine estate', 'Open air'],
    guestsShort: '20 to 300',
    lodgingShort: 'No',
    priceShort: 'From €3,000 (estimate)',
    description:
      "A true Provençal sanctuary, this estate stands out for its centuries-old bastide and its timeless atmosphere. The esplanade and the Pavillon du Moulin offer generous layouts for elegant weddings.",
    capacite_accueil: '20 to 300 guests',
    hebergement_sur_place: 'No',
    type_de_cadre: 'Wine estate and olive grove',
    fourchette_de_prix: 'Quote on request (hire estimated from €3,000)',
    element_differenciant:
      'An olive grove of 7,000 trees, some of them a thousand years old, which gives receptions a rare soul.',
    imageAlt: 'Arcaded bastide and swimming pool at nightfall',
  },
  'chateau-de-nans': {
    summary: 'Classical château at the foot of the Sainte-Baume, with a glass orangery facing the forest.',
    tags: ['Château', 'Orangery', 'Wooded park'],
    guestsShort: 'Up to 250',
    lodgingShort: 'Sleeps 36',
    priceShort: 'From €4,760',
    description:
      "Set against the Sainte-Baume massif, this classical building stands in the middle of a large wooded park. The light-filled orangery hosts sizeable receptions while keeping a distinctly upmarket feel.",
    capacite_accueil: 'Up to 250 guests (in the Orangery)',
    hebergement_sur_place: 'Yes (sleeps up to 36)',
    type_de_cadre: 'Classical château and wooded park',
    fourchette_de_prix: 'From €4,760 to €6,800 (exclusive use, depending on the day)',
    element_differenciant:
      'The glass architecture of the Orangery, which immerses guests in the state forest.',
    imageAlt: 'Forest bathed in golden light',
  },
};
