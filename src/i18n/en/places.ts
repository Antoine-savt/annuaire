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
  espaces?: string;
  ceremonie_laique?: string;
  traiteur?: string;
  duree_location?: string;
  fin_de_soiree?: string;
  acces?: string;
  stationnement?: string;
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

The venues of the Dracénie cover every size of celebration. [Château Pimõ](/en/venues/chateau-pimo) welcomes 30 to 120 guests in an 18th-century house hired exclusively, [Château de Berne](/en/venues/chateau-de-berne) offers a luxury package with a five-star hotel, and [Château de Font du Broc](/en/venues/chateau-de-font-du-broc) can seat up to 650 guests. [Château Sainte Roseline](/en/venues/chateau-sainte-roseline), with its 12th-century cloister, is one of the most striking historic settings in the Var.`,
  },
  'haut-var': {
    name: 'Haut-Var',
    where: 'in the Haut-Var',
    intro:
      "Hilltop villages, oak forests and weathered stone: between Draguignan and the Gorges du Verdon, the Haut-Var offers more secluded venues, ideal for a wedding close to nature where guests stay for the whole weekend.",
    body: `## Getting married in the Haut-Var

The Haut-Var takes in the plateaux and hills of the north of the department, between Draguignan and the Gorges du Verdon. Hilltop villages, oak forests, old stone: this is the Provence of the hinterland, quieter and greener than the coast.

## An area for nature-lover weddings

For a wedding, the Haut-Var appeals with its secluded venues and its evenings, which are often cooler in summer. Estates here are happy to put guests up for the whole weekend, which makes up for being further from the big cities: [Domaine de la Rotonde](/en/venues/domaine-de-la-rotonde) sleeps 90 in its suites, gîtes and tipis, and [La Bastide de Montferrat](/en/venues/bastide-de-montferrat) sleeps 40.

## Getting there for your guests

Allow roughly half an hour to three quarters of an hour by road from Les Arcs-Draguignan TGV station. The back-country roads are winding: all the more reason to have guests stay on site.`,
  },
  'provence-verte': {
    name: 'Provence Verte',
    where: 'in Provence Verte',
    intro:
      "Around Brignoles and the Argens valley, Provence Verte blends rivers, vineyards and wooded hills. Historic châteaux, bastides and mas farmhouses host both large celebrations and intimate weddings.",
    body: `## Getting married in Provence Verte

Provence Verte, or “Green Provence”, stretches around Brignoles and Saint-Maximin-la-Sainte-Baume. It owes its name to its landscapes: wooded hills, rivers such as the Argens, and the vineyards of the Coteaux Varois en Provence and Côtes de Provence appellations.

## An easy area to reach

With the A8 motorway running through it between Aix-en-Provence and Nice, this is one of the most accessible parts of the Var. Aix-en-Provence and Marseille are less than an hour's drive away, making it a good choice if many of your guests are coming from the Bouches-du-Rhône.

## Very different venues

Here you will find a 16th-century château built for large celebrations, [Château de Robernier](/en/venues/chateau-de-robernier); an organic wine estate that sleeps up to 54, [Château Mentone](/en/venues/chateau-mentone); and an 18th-century bastide that seats up to 250 guests, [Bastide Saint Julien](/en/venues/bastide-saint-julien).

For a country-style wedding, [Château de la Présidente](/en/venues/chateau-de-la-presidente), south of Brignoles, can be booked for the whole weekend with its 2-hectare park, and [Le Mas de Fontbelle](/en/venues/mas-de-fontbelle), in Besse-sur-Issole, welcomes up to 150 guests under its marquee after a ceremony in its open-air amphitheatre.`,
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

In Le Pradet, [Domaine Rocabella](/en/venues/domaine-rocabella) offers exclusive use with a stay in a Belle Époque villa, complete with pools, coves and room for 32 to 80 guests to stay. In summer, traffic along the coast is heavy: allow extra time for journeys and lay on shuttles at the end of the evening.`,
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
    summary: "Organic wine estate and Relais & Châteaux, with a wedding package including a five-star hotel and a stage on the water.",
    tags: ["Wine estate", "Luxury", "Ceremony on the water"],
    guestsShort: "Up to 120",
    lodgingShort: "34-room hotel + villas",
    priceShort: "From €24,500",
    description: "Set between Lorgues and Flayosc, in the middle of an organic wine estate of around 500 hectares, Château de Berne combines a five-star Relais & Châteaux hotel with a Michelin-starred restaurant. The ceremony takes place on the Scène sur l'eau, a round stage set on a lake, and dinner under the glass roof of the Jardin du Jasmin, surrounded by vines. The wedding package includes ten rooms for two nights; exclusive use opens up the whole estate, with its 34 rooms, pools and spa.",
    capacite_accueil: "Up to 120 guests (Jardin du Jasmin, 288 m²)",
    hebergement_sur_place: "Yes (34-room five-star hotel, private villas with pools and a 7-bedroom historic château)",
    type_de_cadre: "Wine estate and Relais & Châteaux",
    fourchette_de_prix: "Wedding package from €24,500 incl. VAT (10 rooms for 2 nights, Scène sur l'eau and Jardin du Jasmin, caterer of your choice); exclusive use of the estate from €95,500 incl. VAT (34 rooms, catering by the château). April, May and October 2026 rates, varying with the season; menus from €135 to €180 per person",
    element_differenciant: "The Scène sur l'eau, a round stage set on a lake, for the ceremony and the drinks reception.",
    espaces: "Jardin du Jasmin, a 288 m² glasshouse among the vines (120 guests); Scène sur l'eau and an amphitheatre with stone tiers; village square, pool and formal gardens for the drinks reception",
    ceremonie_laique: "On the Scène sur l'eau; in the formal gardens with exclusive use",
    traiteur: "Your choice with the wedding package; the château's own kitchen with exclusive use (minimum spend €36,000 incl. VAT)",
    duree_location: "2 nights minimum",
    fin_de_soiree: "2 am with the wedding package, 5 am with exclusive use",
    acces: "Les Arcs-Draguignan TGV station 25 min away; Toulon airport 1 hr, Nice 1 hr 15, Marseille 1 hr 30; helipad on the estate",
    stationnement: "On-site parking (around 200 spaces), wheelchair access",
    imageAlt: "Château de Berne's stage on the water, set for a ceremony",
  },
  'chateau-sainte-roseline': {
    summary: "Historic Cru Classé estate with a 12th-century cloister, a chapel and an avenue of 200-year-old plane trees.",
    tags: ["Historic château", "Wine estate", "Listed cloister"],
    guestsShort: "50 to 250",
    lodgingShort: "Couple's apartment",
    priceShort: "From €5,600",
    description: "On the site of the former abbey of La Celle-Roubaud, in Les Arcs-sur-Argens, this Côtes de Provence Cru Classé has been hosting weddings for more than twenty years. The 12th-century cloister hosts the symbolic ceremony or the drinks reception, the avenue of ten 200-year-old plane trees large open-air dinners, and the neighbouring chapel holds a mosaic by Chagall. Indoors, the Salle des Vendanges, with its exposed timber roof, seats up to 220 guests with a dance floor.",
    capacite_accueil: "50 to 250 seated guests (220 in the Salle des Vendanges, 130 in the Salle des Barriques), 350 for a drinks reception",
    hebergement_sur_place: "Yes (a private apartment for the couple on the wedding night; list of nearby accommodation for guests)",
    type_de_cadre: "Historic château, Cru Classé and abbey",
    fourchette_de_prix: "Venue hire at €5,600 and menus from €95 per guest (prices published on Mariages.net, to be confirmed with the estate)",
    element_differenciant: "Its 12th-century cloister, a listed historic monument, and its chapel decorated with a mosaic by Chagall.",
    espaces: "12th-century cloister (150 for drinks); Allée des Platanes (250 seated, 350 for drinks); Salle des Vendanges (220 seated with a dance floor); Salle des Barriques (130 seated with a dance floor); orchard",
    ceremonie_laique: "In the cloister (100 guests), the orchard (250) or the plane-tree avenue (180)",
    traiteur: "Partner caterers (Roland Paix, Bouche en Bouche, Jaudys, Helen Traiteur, Atelier Traiteur…) or an all-inclusive package with Borges; the estate's wines recommended, no corkage fee",
    fin_de_soiree: "No strict end time; security staff during the evening",
    acces: "5 min from the A8 Le Muy exit and from Les Arcs-Draguignan TGV station",
    stationnement: "400-space car park, wheelchair access",
    imageAlt: "Floral arch in the cloister of Château Sainte Roseline",
  },
  'chateau-de-font-du-broc': {
    summary: "Large organic wine château and stud farm, with a 650 m² equestrian hall and a cellar modelled on Le Thoronet abbey.",
    tags: ["Large capacity", "Wine estate", "Equestrian hall"],
    guestsShort: "Up to 650",
    lodgingShort: "No",
    priceShort: "From €3,960",
    description: "In Les Arcs-sur-Argens, this Vignobles Massa estate has been hosting weddings since 2003. Its barrel cellar, vaulted on the model of the Cistercian abbey of Le Thoronet, is one of the finest in the Var. For the reception, the 650 m² Equestrian Hall, lit by stained-glass windows under rib vaults, can seat more than 600 guests; the cloister and the formal gardens suit the drinks reception and the ceremony.",
    capacite_accueil: "Up to 650 seated guests (Equestrian Hall), 1,000 for a drinks reception",
    hebergement_sur_place: "No",
    type_de_cadre: "Château, vineyard and stud farm",
    fourchette_de_prix: "From €3,960 for an empty hall (rate published by ABC Salles, to be confirmed with the estate)",
    element_differenciant: "The 650 m² Equestrian Hall with its stained glass and rib vaults, and the Cistercian-style vaulted cellar.",
    espaces: "Equestrian Hall (650 m²); Château room (350 m², opening onto the formal gardens); Provence room (150 m²); cloister (168 m²); formal gardens",
    ceremonie_laique: "Possible in the cloister or the formal gardens",
    stationnement: "500-space car park, wheelchair access",
    imageAlt: "Vaulted barrel cellar at Château de Font du Broc, modelled on Le Thoronet abbey",
  },
  'chateau-pimo': {
    summary: "18th-century house for exclusive hire, with a rose garden, a nomad tent and a spa in the old wash house.",
    tags: ["Exclusive use", "Spa", "Rose garden"],
    guestsShort: "30 to 120",
    lodgingShort: "5 rooms and suites",
    priceShort: "From €5,980",
    description: "On the edge of Draguignan, this 18th-century house is hired in its entirety, in a park of around three hectares of olive trees, vines and roses. The symbolic ceremony takes place in the rose garden, drinks around the pool and the olive trees, and dinner under a nomad tent or in the air-conditioned ballroom. With five rooms and suites and a spa set in the old wash house, it is a wedding venue on a human scale.",
    capacite_accueil: "30 to 120 guests",
    hebergement_sur_place: "Yes (5 rooms and suites, sleeps 10)",
    type_de_cadre: "Historic house and park",
    fourchette_de_prix: "Hire from €5,980 to €11,980 depending on the season and the number of nights (prices published on Mariages.net); no set package and no corkage fee",
    element_differenciant: "The spa set in the old wash house, with an indoor pool, sauna and hammam.",
    espaces: "Rose garden (ceremony); pool and olive trees (drinks, brunch); nomad tent among olive trees and vines (dinner); air-conditioned ballroom; terraces",
    ceremonie_laique: "In the rose garden",
    traiteur: "Your choice, with a list of partner caterers on request",
    fin_de_soiree: "3 am (according to Mariages.net)",
    acces: "Les Arcs-Draguignan TGV station 20 min away; Draguignan town centre 5 min; Nice and Gulf of Saint-Tropez airports around 1 hr",
    stationnement: "Private car park for over 50 vehicles",
    imageAlt: "Château Pimõ's façade in the sunshine",
  },
  'chateau-saint-ange': {
    summary: "Restored 1875 bastide with an olive grove of a thousand trees and a pool with a mineral beach.",
    tags: ["Bastide", "Olive grove", "Exclusive use"],
    guestsShort: "Up to 150",
    lodgingShort: "8 rooms",
    priceShort: "On request",
    description: "Four kilometres from Draguignan, this 1875 bastide, restored since 2022, is hired exclusively for a few days. The 12-hectare estate brings together AOP Côtes de Provence vines and an olive grove of a thousand trees, where the symbolic ceremony takes place. The reception is shared between the Salle Sud, which opens onto the pool, a Berber-style tent and the Espace Cézanne, a former architect's studio with huge picture windows.",
    capacite_accueil: "120 to 150 guests (reception hall); Salle Sud and Berber tent for 120 to 140 each",
    hebergement_sur_place: "Yes (8 prestige rooms, including a 64 m² bridal suite)",
    type_de_cadre: "Bastide, vineyard and olive grove",
    fourchette_de_prix: "On request",
    element_differenciant: "The olive grove of a thousand trees for the ceremony, and the Espace Cézanne, a former architect's studio with monumental picture windows.",
    espaces: "Salle Sud with a terrace over the pool; Berber-style tent; Espace Cézanne; 150 m² lounge tent; terrace overlooking the valley and the olive grove; pool and 800 m² mineral beach; 18th-century vaulted cellar",
    ceremonie_laique: "In the olive grove",
    traiteur: "List of recommended suppliers (caterers, DJs, florists)",
    duree_location: "Exclusive use for a weekend or several days; no single-night hire",
    acces: "Les Arcs-Draguignan TGV station and the A8 Le Muy exit around 15 min away; Nice airport 1 hr",
    stationnement: "Free on-site parking, electric charging points",
    imageAlt: "Château Saint Ange's bastide and pool",
  },
  'domaine-de-la-rotonde': {
    summary: "Former Templar farm with a glass-arcaded courtyard and 90 beds for the whole weekend.",
    tags: ["Full weekend", "Large accommodation", "Old stone"],
    guestsShort: "10 to 250",
    lodgingShort: "Sleeps 90",
    priceShort: "From €13,530",
    description: "In Villecroze, in the Haut-Var, this former Templar farm houses a 12th-century building amid 53 hectares of woods and meadows. The symbolic ceremony takes place in the olive grove, drinks under century-old plane trees, and dinner in the glass-arcaded courtyard, under a nomad tent and festoon lights. Eight suites and cottages plus tipis sleep up to 90, with a pool and pool house for the day after.",
    capacite_accueil: "10 to 250 guests",
    hebergement_sur_place: "Yes (8 suites and cottages for 50 people, plus tipis for 40)",
    type_de_cadre: "Templar farm and holiday cottages",
    fourchette_de_prix: "Hire from €13,530 to €15,500, plus the partner caterer's menu from €94 per person, minimum 60 adults (prices published on Mariages.net)",
    element_differenciant: "A 12th-century Templar building and its glass-arcaded courtyard, in 53 hectares of countryside.",
    espaces: "Glass-arcaded courtyard (dinner under a nomad tent); esplanade and park of century-old plane trees; olive grove; dance hall; 120 m² former sheepfold; pool and pool house",
    ceremonie_laique: "In the olive grove or under the century-old plane trees",
    traiteur: "Set caterer (Star Événements) and an exclusive partner DJ",
    fin_de_soiree: "4 am",
    acces: "Les Arcs-Draguignan station around 20 min away; A8 exit 36 in 30 min",
    stationnement: "Free private car park; wheelchair-accessible venue with an adapted room",
    imageAlt: "Flower-lined ceremony aisle under the olive trees at Domaine de la Rotonde",
  },
  'bastide-de-montferrat': {
    summary: "18th-century bastide and 20-room hotel for exclusive use, with a riverside park.",
    tags: ["Exclusive hotel", "All-inclusive", "Park and river"],
    guestsShort: "10 to 100",
    lodgingShort: "20 rooms, sleeps 40",
    priceShort: "€139 per person",
    description: "At the gateway to the Gorges du Verdon, this 18th-century Provençal bastide, renovated in 2024, is hired exclusively with its twenty-room hotel on the wedding day. The symbolic ceremony takes place in the one-and-a-half-hectare park, under a large mulberry tree, beside a river and its waterfall. The house chef prepares the drinks reception, dinner and evening, served in the air-conditioned hall or on the covered terrace.",
    capacite_accueil: "10 to 100 seated guests with a dance floor",
    hebergement_sur_place: "Yes (20-room three-star hotel, sleeps 40)",
    type_de_cadre: "Provençal bastide and hotel",
    fourchette_de_prix: "All-inclusive package from €139 per person, 6 pm to 2 am: drinks reception, dinner with wine, evening party, venue and service (rate published by ABC Salles); rooms from €85 to €99 a night",
    element_differenciant: "A one-and-a-half-hectare park crossed by a river, with its waterfall and a large mulberry tree for the ceremony.",
    espaces: "Air-conditioned reception hall (180 m²); 100 m² covered terrace; restaurant and shaded terrace; 1.5-hectare park with a river",
    ceremonie_laique: "In the park, under the mulberry tree",
    traiteur: "The house chef's cooking; no outside caterers",
    duree_location: "Exclusive use of the estate and its rooms on the wedding day",
    fin_de_soiree: "2 am (a later finish is possible at extra cost)",
    acces: "Draguignan 20–30 min away, Gorges du Verdon 25–30 min",
    stationnement: "Large free private car park; wheelchair access and an adapted room",
    imageAlt: "Wedding dinner under festoon lights at La Bastide de Montferrat",
  },
  'chateau-de-robernier': {
    summary: "16th-century two-towered château with a chapel, a ballroom and a 220-hectare park.",
    tags: ["Historic château", "Large capacity", "Chapel"],
    guestsShort: "Up to 300",
    lodgingShort: "12 rooms, sleeps 24",
    priceShort: "From €10,500",
    description: "Between Montfort-sur-Argens and Cotignac, this 16th-century château, its façade flanked by two pointed towers, stayed in the same family for four hundred years before being restored from 2006. The consecrated chapel, the orangery and the ballroom with its Napoleon III chandeliers date from the 18th century; the main courtyard and formal gardens host the ceremony and drinks. The 220-hectare estate, with its vineyards and olive groves, hosts only a few weddings a year.",
    capacite_accueil: "Up to 300 seated guests indoors, 1,000 for an outdoor drinks reception",
    hebergement_sur_place: "Yes (12 rooms, sleeps 24, some of them in the towers)",
    type_de_cadre: "Renaissance château and vineyard",
    fourchette_de_prix: "From €10,500 in high season (June to September) for exclusive hire with an overnight stay, up to 300 guests (rate published by French Wedding Style)",
    element_differenciant: "A façade with two round, pointed towers, unique in Provence, and a consecrated chapel for a religious ceremony.",
    espaces: "18th-century ballroom; orangery; main courtyard; 140-seat reception room; formal gardens; park and 30-metre pool",
    ceremonie_laique: "Symbolic in the gardens or the main courtyard, religious in the consecrated chapel",
    traiteur: "Your choice, with an equipped kitchen",
    duree_location: "Exclusive use, one night minimum",
    fin_de_soiree: "4 am in the ballroom (according to French Wedding Style)",
    acces: "Les Arcs-Draguignan station; Toulon airport 1 hr, Marseille 1 hr 10, Nice 1 hr 25; helipad",
    stationnement: "On-site parking, wheelchair access",
    imageAlt: "Château de Robernier and its towers at the end of the gardens",
  },
  'chateau-mentone': {
    summary: "Organic wine estate first recorded in 1033, with the Magnanerie, a chapel and 54 beds.",
    tags: ["Wine estate", "Eco-friendly", "Large accommodation"],
    guestsShort: "60 to 200",
    lodgingShort: "Sleeps 54",
    priceShort: "From €4,000",
    description: "In Saint-Antonin-du-Var, this estate, first recorded in 1033, farms 30 hectares of organic vines within 120 hectares of countryside. Dinners are held in the Magnanerie, a 19th-century silkworm house opening onto the vines, or under the Tonnelle, a wrought-iron pergola over a cobbled terrace. The château, the Lodge cottages and the Mas du Moulin sleep up to 54, and the Saint-Lambert chapel watches over the estate.",
    capacite_accueil: "60 to 200 seated guests, 250 for a drinks reception",
    hebergement_sur_place: "Yes (24 rooms and cottages, sleeping up to 54)",
    type_de_cadre: "Organic wine estate",
    fourchette_de_prix: "Packages from €365 to €465 per person for 60 guests or more: venue, meal, estate wines, flowers, music and accommodation for 37 (according to Bridebook); venue hire only from €4,000 (according to ABC Salles)",
    element_differenciant: "The 19th-century Magnanerie and its terrace over the vines, at the heart of an estate certified organic since 2008.",
    espaces: "La Magnanerie (235 m², 200 seated); la Tonnelle (230 m²); covered terrace (130 m²); la Ferme; old threshing floor; Saint-Lambert chapel (20 people)",
    ceremonie_laique: "Offered by the estate; the chapel holds 20 people",
    traiteur: "Partner caterer (organic Provençal cooking) in the packages; outside caterers allowed for venue hire only (according to ABC Salles)",
    duree_location: "Venue hire for 24 hours (according to ABC Salles)",
    fin_de_soiree: "5 am (according to ABC Salles)",
    acces: "Les Arcs-Draguignan (TGV) and Brignoles stations; A8 20 min away (Le Luc or Le Muy exits)",
    stationnement: "Free 70-space car park; partial wheelchair access because of the terrain",
    imageAlt: "Château Mentone in its shaded park",
  },
  'bastide-saint-julien': {
    summary: "18th-century bastide facing the Montagne de la Loube, with a rose garden and a 490 m² reception room.",
    tags: ["Bastide", "Rose garden", "Large capacity"],
    guestsShort: "Up to 250",
    lodgingShort: "5 rooms",
    priceShort: "From €6,000",
    description: "In La Celle, near Brignoles, this 18th-century bastide next to Château Saint Julien faces the Montagne de la Loube. The symbolic ceremony takes place in the rose garden, drinks in gardens planted with century-old olive trees and lavender, and dinner in the Salon Saint Julien, a 490 m² room with a retractable stage. The five charming bedrooms, heated pool and sauna come with exclusive use of the estate.",
    capacite_accueil: "Up to 250 seated guests (400 in the 490 m² salon), open-air ceremony for 160",
    hebergement_sur_place: "Yes (5 rooms, sleeps 12)",
    type_de_cadre: "Provençal bastide and gardens",
    fourchette_de_prix: "Hire from €6,000 to €12,500 depending on the period (according to 1001 Salles); 3-day, 2-night exclusive use with accommodation from €9,500 to €20,000 (according to Bridebook)",
    element_differenciant: "The rose garden and gardens facing the Montagne de la Loube, with a 490 m² salon for large dinners.",
    espaces: "Salon Saint Julien (490 m², retractable stage); 2,000 m² landscaped gardens; rose garden and arbour; bastide terrace; pool house (140 m²)",
    ceremonie_laique: "Outdoors in the rose garden, up to 160 guests",
    traiteur: "Recommended caterers, including the estate's partner Roland Paix",
    duree_location: "Exclusive use as a 3-day, 2-night package (according to Bridebook)",
    acces: "A8 10 min away (exits 34 or 35); Aix-en-Provence 35 min; Marseille Provence airport 1 hr",
    stationnement: "Closed, secure car park for over 200 vehicles; wheelchair access",
    imageAlt: "Aerial view of Bastide Saint Julien and its gardens",
  },
  'domaine-rocabella': {
    summary: "1898 Belle Époque villa facing the sea, with an infinity pool and private coves.",
    tags: ["Sea view", "Full weekend", "Luxury"],
    guestsShort: "Up to 150",
    lodgingShort: "Sleeps 80",
    priceShort: "From €34,000",
    description: "In Le Pradet, facing the bay of Toulon, this estate created in 1898 by the architect Hans-Georg Tersling has been the backdrop for some fifteen films, including Downton Abbey II. The wedding is a three-day exclusive stay: ceremony at the Belvédère above the sea, drinks around the infinity pool, dinner on the Corniche terrace and the party at the Temple, over two levels. Four villas sleep 32 to 80 guests on a full-board basis, with private access to the coves.",
    capacite_accueil: "Up to 150 guests (ceremony, drinks and dinner)",
    hebergement_sur_place: "Yes (4 villas, 39 bedrooms, 32 to 80 guests on a full-board basis)",
    type_de_cadre: "Belle Époque seaside villa",
    fourchette_de_prix: "From €34,000 in high season for exclusive use of the villas and the Corniche, 2 nights minimum (according to French Wedding Style); packages from €43,758 to €99,000 for 120 guests, meals extra (according to Bridebook)",
    element_differenciant: "An infinity pool suspended above the Mediterranean and private coves below the estate.",
    espaces: "The Belvédère (ceremony above the sea); La Folie's south terrace; the Grande Piscine Bleue infinity pool; the Corniche and its terrace; La Frégate, an air-conditioned room; the Temple, a two-level bar and dance floor",
    ceremonie_laique: "At the Belvédère facing the sea or in front of La Folie's south terrace",
    traiteur: "The estate's chef (full-board stay)",
    duree_location: "3-day stay, Thursday to Sunday or Friday to Monday",
    acces: "Toulon TGV station 12 min away; Toulon-Hyères airport 20 min; Nice and Marseille 1 hr 20",
    stationnement: "On-site parking",
    imageAlt: "Rocabella's infinity pool facing the sea",
  },
  'les-pins-penches': {
    summary: "1640 château and palm-tree park facing the sea, with a ceremony overlooking the Mediterranean.",
    tags: ["Sea view", "Large capacity", "Exotic garden"],
    guestsShort: "60 to 400",
    lodgingShort: "No",
    priceShort: "From €120 pp",
    description: "At Cap Brun in Toulon, the Château de la Clapière, built in 1640 and raised from its ruins by the Lelièvre family in 2000, overlooks the sea from a botanical park planted with palm trees. The symbolic ceremony faces the Mediterranean, drinks are served in the terraced gardens, and dinner in the Grand Pavillon, which seats 400. The food is by chef Stéphane Lelièvre, who has been organising weddings for more than twenty-five years.",
    capacite_accueil: "60 to 400 seated guests (360 m² orangery), 500 for a drinks reception",
    hebergement_sur_place: "No (list of nearby accommodation provided on request)",
    type_de_cadre: "Château and seaside botanical park",
    fourchette_de_prix: "Packages from €120 to €200 per person, minimum 60 guests, exclusive-use fee depending on the date (prices published by 1001 Salles and Bridebook)",
    element_differenciant: "A 180-degree sea view from a botanical park of palm trees, ten minutes from the centre of Toulon.",
    espaces: "Ceremony area facing the sea; botanical park and terraces (2,500 m²); Grand Pavillon (360 m² orangery); pool",
    ceremonie_laique: "Outdoors, facing the Mediterranean",
    traiteur: "Home cooking by chef Stéphane Lelièvre, with wedding planning included",
    acces: "Cap Brun, Toulon: A57 exit 2, close to Toulon station and Toulon-Hyères airport",
    stationnement: "On-site parking, wheelchair access",
    imageAlt: "Wedding ceremony facing the sea at Les Pins Penchés",
  },
  'chateau-maravenne': {
    summary: "Organic wine estate facing the Îles d'Or, with a sea-view terrace and a vaulted hall.",
    tags: ["Wine estate", "Sea view", "Organic"],
    guestsShort: "20 to 160",
    lodgingShort: "Sleeps 25",
    priceShort: "From €3,900",
    description: "In La Londe-les-Maures, this 80-hectare organic estate produces Côtes de Provence wines facing the Îles d'Or. Drinks are served on a 300 m² panoramic terrace looking out to Porquerolles, the symbolic ceremony in an open-air amphitheatre surrounded by pools, and dinner in a 300 m² vaulted hall reached through a stone tunnel. Five guest rooms and three apartments house close family, and the estate hosts only one reception a week.",
    capacite_accueil: "20 to 160 seated guests, 250 for a drinks reception",
    hebergement_sur_place: "Yes (5 guest rooms and 3 apartments, sleeping 25, April to October)",
    type_de_cadre: "Wine estate with a sea view",
    fourchette_de_prix: "Hire from €3,900 to €6,800 depending on the date, bridal room included (prices published on Mariages.net)",
    element_differenciant: "A panoramic terrace facing Porquerolles and the Îles d'Or, for drinks at sunset.",
    espaces: "300 m² vaulted hall; 300 m² panoramic sea-view terrace; open-air amphitheatre and Mediterranean garden with pools; museum of winegrower automatons",
    ceremonie_laique: "In the open-air amphitheatre, facing the vines",
    traiteur: "Set list of caterers and DJs; the estate's wines are compulsory (according to Mariages.net)",
    duree_location: "Only one reception a week",
    fin_de_soiree: "4 am (according to Mariages.net)",
    acces: "10 min from Toulon-Hyères station and airport",
    stationnement: "Lit private car parks accessible to coaches; wheelchair access",
    imageAlt: "Terrace set for a wedding facing the sea at Château Maravenne",
  },
  'domaine-souviou': {
    summary: "15th-century bastide and thousand-year-old olive trees, among Bandol vines and an oil mill.",
    tags: ["Olive grove", "Wine estate", "Open air"],
    guestsShort: "20 to 300",
    lodgingShort: "No",
    priceShort: "On request",
    description: "In Le Beausset, between Toulon and Bandol, this 85-hectare estate of vines and olive trees surrounds a 15th-century bastide and its chapel; the actress Danielle Darrieux owned it from 1964. The ceremony takes place at the Bancau des Millénaires, among thousand-year-old olive trees, drinks on the terraces or at the Mirador des Oliviers, and dinner in the Salon Delphi or under the covered Pavillon du Moulin, open to the terraced hillside.",
    capacite_accueil: "20 to 300 guests (110 seated in the Salon Delphi, 300 under the Pavillon du Moulin)",
    hebergement_sur_place: "No (hotels and holiday cottages nearby)",
    type_de_cadre: "Wine estate and olive grove",
    fourchette_de_prix: "On request",
    element_differenciant: "Thousand-year-old olive trees and the estate's oil mill, in the heart of the Bandol vineyards.",
    espaces: "Salon Delphi (three rooms, dance floor, covered terrace); Pavillon du Moulin (370 m² covered); Bancau and Terrasse des Millénaires; Chapel garden; Mirador des Oliviers; esplanade",
    ceremonie_laique: "At the Bancau des Millénaires or on the Terrasse des Millénaires",
    traiteur: "Your choice, with all-inclusive packages from partner caterers",
    acces: "On the RN8 in Le Beausset, 25 min from Toulon",
    stationnement: "On-site parking",
    imageAlt: "Ceremony chairs under the olive trees at Domaine Souviou",
  },
  'chateau-de-nans': {
    summary: "Classical château at the foot of the Sainte-Baume, with a glass orangery facing the forest.",
    tags: ["Château", "Orangery", "Wooded park"],
    guestsShort: "Up to 250",
    lodgingShort: "Sleeps 36",
    priceShort: "From €4,760 excl. VAT",
    description: "In Nans-les-Pins, at the foot of the Sainte-Baume massif, this turreted château stands in a one-hectare wooded park. The 300 m² glass Orangery seats up to 250 guests with a dance floor, and two symbolic-ceremony spaces open onto greenery and onto the mountain. Thirteen bedrooms sleep 36, the pool hosts the next-day brunch, and the music can go on until 3 am without disturbing any neighbours.",
    capacite_accueil: "Up to 250 seated guests in the Orangery, 400 for a drinks reception",
    hebergement_sur_place: "Yes (13 rooms, sleeps 36)",
    type_de_cadre: "Classical château and wooded park",
    fourchette_de_prix: "Exclusive use at €4,760 excl. VAT on weekdays, €5,780 on Fridays and €6,800 on Saturdays (rates published by Funbooker)",
    element_differenciant: "The glass Orangery, heated in winter, which immerses guests in the park and the forest.",
    espaces: "300 m² Orangery; glass room (40 m²); shaded terrace under plane trees; one-hectare wooded park; pool",
    ceremonie_laique: "Two spaces: one intimate among the greenery, the other facing the Sainte-Baume massif",
    traiteur: "In-house caterer offered (Côté Gourmet), not compulsory according to directories; no corkage fee",
    duree_location: "Access to the château from 2 pm, exclusive use on the wedding evening, brunch possible the next day",
    fin_de_soiree: "3 am, extra hours on request",
    acces: "Motorway less than a kilometre away; Aix-en-Provence and Marseille around 30 min; TGV stations and Marseille airport under an hour",
    stationnement: "Car park for around 200 vehicles, wheelchair access",
    imageAlt: "Aerial view of Château de Nans and its park",
  },
  'mas-de-fontbelle': {
    summary: 'Provençal mas for exclusive hire among olive trees and hills, with a 225 m² marquee and an open-air amphitheatre.',
    tags: ['Marquee', 'Open-air amphitheatre', 'One wedding at a time'],
    guestsShort: 'Up to 150',
    lodgingShort: "Couple's house",
    priceShort: 'From €4,950',
    description:
      "At the foot of the hills of Besse-sur-Issole, this stone mas surrounded by centuries-old olive trees, vineyards and the Fontbelle spring hosts only one celebration at a time. The symbolic ceremony takes place in the open-air amphitheatre, and dinner and dancing under a 225 m² illuminated marquee. Couples are free to choose their caterer and suppliers.",
    capacite_accueil: 'Up to 150 guests (under the 225 m² marquee)',
    hebergement_sur_place: "Yes (couple's house with a bridal suite and four-poster bed, 2 nights included)",
    type_de_cadre: 'Provençal mas, olive grove and open-air amphitheatre',
    fourchette_de_prix:
      "€4,950 (“L'Instant précieux” package: set-up the day before, marquee, grounds, furniture and 2 nights) or €5,950 (“Le Temps suspendu” package, with the next-day brunch until 6 pm), plus €210 cleaning and €250 security guard",
    element_differenciant:
      'The tiered open-air amphitheatre, in the shade of oaks and cypresses, for a symbolic ceremony in the heart of the estate.',
    espaces: "225 m² marquee (150 guests); tiered open-air amphitheatre; drinks area; couple's house and gardens",
    ceremonie_laique: "In the open-air amphitheatre",
    traiteur: "Your choice, with recommended caterers and florists",
    duree_location: "Access the day before, 1 pm to 7 pm, to set up, 2 nights on site; next-day brunch until 6 pm with the “Le Temps suspendu” package",
    acces: "A8 exit 35 (Brignoles) 15 min away; Les Arcs-Draguignan TGV station 25 min; Toulon-Hyères airport 45 min",
    stationnement: "Private car park for around 50 vehicles, wheelchair access, room for shuttle buses",
    imageAlt: 'Aerial view of Le Mas de Fontbelle among woods, fields and olive trees',
  },
  'chateau-de-la-presidente': {
    summary: '19th-century family house and 2-hectare park, yours for the whole weekend.',
    tags: ['Château', 'Exclusive weekend', 'Wooded park'],
    guestsShort: 'Up to 250',
    lodgingShort: 'No',
    priceShort: 'From €3,000',
    description:
      "In the heart of the Val de Camps, this 19th-century house, kept by the same family, is hired exclusively from Friday 10 am to Sunday 6 pm. A 1,000 m² terrace stretches out in front of the façade, surrounded by a 2-hectare park with a large pool, a pond and its small waterfall. Dinner is served in the 190 m² dining room, which opens onto a 110 m² period ballroom.",
    capacite_accueil: 'Up to 200 seated guests, 250 for a cocktail reception',
    hebergement_sur_place: 'No (an apartment reserved for children and babysitters)',
    type_de_cadre: '19th-century château and wooded park',
    fourchette_de_prix:
      '€3,000 incl. VAT for the weekend (Friday 10 am to Sunday 6 pm), plus about €550 cleaning; open from Easter to All Saints’ Day',
    element_differenciant:
      'The whole estate to yourselves for the weekend, with a large pool in the park for a symbolic ceremony.',
    espaces: "Large dining room (190 m²); period ballroom (110 m²); 1,000 m² terrace; 2-hectare park with a pool, a pond and a small waterfall; apartment for children",
    ceremonie_laique: "In the park, around the large pool",
    traiteur: "Your choice; recommended caterers (Borges, Atelier Traiteur) and a DJ on request",
    duree_location: "Friday 10 am to Sunday 6 pm, from Easter to All Saints' Day",
    acces: "A8 exit 35; Toulon 40 min, Aix-en-Provence 45 min",
    stationnement: "Private car park for 200 to 300 vehicles, wheelchair ramp",
    imageAlt: 'Aerial view of Château de la Présidente, its courtyard and park',
  },
};
