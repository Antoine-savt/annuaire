import { Venue } from '../types';

const rawVenues = [
  {
    "nom_du_lieu": "Château de Berne",
    "commune_et_zone": "Lorgues (Dracénie)",
    "site_web_officiel": "https://www.chateauberne.com",
    "description": "Ce joyau de l'œnotourisme varois certifié bio se distingue par son atmosphère luxueuse et son architecture provençale immaculée. Entre ses espaces extérieurs majestueux et ses salles voûtées, ce Relais & Châteaux offre une expérience clef en main d'un raffinement rare.",
    "capacite_accueil": "120 à 200 invités",
    "hebergement_sur_place": "Oui (Hôtel 5 étoiles de 34 chambres + villas)",
    "type_de_cadre": "Domaine viticole et Relais & Châteaux",
    "fourchette_de_prix": "Dès 19 500 € (formule) / Dès 95 500 € (privatisation totale)",
    "element_differenciant": "La \"Scène sur l'eau\", un amphithéâtre féérique perché au-dessus d'un lac pour les cérémonies.",
    "contact": "+33 4 94 60 43 75",
    "sources": "chateauberne.com, bridebook.com",
    "imageUrl": "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château Sainte Roseline",
    "commune_et_zone": "Les Arcs-sur-Argens (Dracénie)",
    "site_web_officiel": "https://www.sainte-roseline.com",
    "description": "Haut lieu de l'histoire viticole et spirituelle du Var, ce domaine impressionne avec son impressionnante majesté. Son immense allée de platanes et sa fameuse Salle des Barriques en font une adresse incontournable pour les réceptions de prestige.",
    "capacite_accueil": "30 à 400 invités (jusqu'à 250 en Salle des Vendanges)",
    "hebergement_sur_place": "Oui (Appartement privé + 7 chambres via forfait)",
    "type_de_cadre": "Château historique, Cru Classé et abbaye",
    "fourchette_de_prix": "Forfait mariage dès 7 000 € ou location de salle de 1000 € à 1800 €",
    "element_differenciant": "Son authentique cloître du XIIe siècle classé monument historique.",
    "contact": "+33 4 94 99 50 30",
    "sources": "sainte-roseline.com, abcsalles.com",
    "imageUrl": "https://images.unsplash.com/photo-1465495976722-2029ce950143?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château de Font du Broc",
    "commune_et_zone": "Les Arcs-sur-Argens (Dracénie)",
    "site_web_officiel": "https://www.chateau-fontdubroc.com",
    "description": "Ce splendide domaine séduit immédiatement par la splendeur de ses jardins à la française et de son architecture grandiose. Le somptueux cloître et la grande salle équestre créent un décor spectaculaire, digne des plus grands contes de fées provençaux.",
    "capacite_accueil": "100 à 650 invités assis",
    "hebergement_sur_place": "Non",
    "type_de_cadre": "Château vignoble et haras",
    "fourchette_de_prix": "Dès 3 960 € (location salle vide)",
    "element_differenciant": "L'impressionnante Salle Équestre majestueuse et la cave à barriques monumentale pour des photos uniques.",
    "contact": "+33 4 98 11 45 45",
    "sources": "chateau-fontdubroc.com, abcsalles.com",
    "imageUrl": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château Pimõ",
    "commune_et_zone": "Draguignan (Dracénie)",
    "site_web_officiel": "https://www.chateaupimo.fr",
    "description": "Niché dans un écrin de vignes et d'oliviers, ce domaine confidentiel redéfinit le luxe avec son approche intimiste. Ses tentes nomades et ses suites cinq étoiles permettent d'imaginer une réception bohème-chic prolongée sur le week-end.",
    "capacite_accueil": "Jusqu'à 50 invités",
    "hebergement_sur_place": "Oui (5 suites de luxe + tentes nomades, 50 couchages)",
    "type_de_cadre": "Château et domaine nature",
    "fourchette_de_prix": "À partir de 15 000 € (privatisation sur 3 jours)",
    "element_differenciant": "Une offre très confidentielle incluant du glamping chic (tentes nomades) et un grand espace bien-être intérieur.",
    "contact": "+33 7 77 00 48 81",
    "sources": "chateaupimo.fr, yesinprovence.com",
    "imageUrl": "https://images.unsplash.com/photo-1511285560929-80b456fea0a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château Saint Ange",
    "commune_et_zone": "Draguignan (Dracénie)",
    "site_web_officiel": "https://www.chateausaintange.com",
    "description": "Cette magnifique bastide du XIXe siècle allie la rudesse de la pierre brute à une décoration intérieure d'un chic absolu. L'oliveraie offre une toile de fond typiquement provençale pour les cérémonies, tandis que les terrasses dominent la vallée.",
    "capacite_accueil": "Non divulgué précisément (2 grandes salles disponibles)",
    "hebergement_sur_place": "Oui (8 chambres de prestige)",
    "type_de_cadre": "Bastide provençale et oliveraie",
    "fourchette_de_prix": "Sur devis",
    "element_differenciant": "Un décor de cérémonie immersif au cœur d'une plantation de plus de 1000 oliviers.",
    "contact": "+33 4 94 68 06 18",
    "sources": "chateausaintange.com",
    "imageUrl": "https://images.unsplash.com/photo-1502672260266-1c1b55914902?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Le Domaine de la Rotonde",
    "commune_et_zone": "Villecroze (Haut-Var)",
    "site_web_officiel": "https://www.domaine-rotonde.com",
    "description": "Ancienne ferme templière du XIIe siècle, ce domaine entouré de dizaines d'hectares de forêts respire l'authenticité brute. Ses aménagements contemporains contrastent magnifiquement avec la pierre ancienne, offrant des espaces très singuliers.",
    "capacite_accueil": "Jusqu'à 250 invités",
    "hebergement_sur_place": "Oui (7 à 8 gîtes pour env. 50 couchages)",
    "type_de_cadre": "Ancienne ferme templière en pierre",
    "fourchette_de_prix": "Sur devis (location estimée dès 12 500 €)",
    "element_differenciant": "La superbe cour intérieure historique subtilement fermée par des arcades en verre contemporaines.",
    "contact": "+33 6 11 54 37 90",
    "sources": "domaine-rotonde.com, visitvar.fr",
    "imageUrl": "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "La Bastide de Montferrat",
    "commune_et_zone": "Montferrat (Haut-Var)",
    "site_web_officiel": "https://www.labastide83.com",
    "description": "Propriété familiale de charme qui garantit une privatisation totale dans un cadre bucolique très préservé. Son parc ombragé et sa forte capacité à loger les convives sur place en font un cocon idéal pour un week-end chaleureux.",
    "capacite_accueil": "Jusqu'à 120 invités",
    "hebergement_sur_place": "Oui (20 chambres, soit 40 couchages)",
    "type_de_cadre": "Bastide provençale et parc boisé",
    "fourchette_de_prix": "Sur devis (Chambres dès 85 €/nuit)",
    "element_differenciant": "Un véritable esprit \"grande maison de famille\" pour s'approprier les lieux en totale intimité.",
    "contact": "+33 4 94 50 21 30",
    "sources": "labastide83.com",
    "imageUrl": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château de Robernier",
    "commune_et_zone": "Montfort-sur-Argens (Provence Verte)",
    "site_web_officiel": "http://www.chateauderobernier.com",
    "description": "Flanqué de ses majestueuses tours de conte de fées, ce château du XVIe siècle au milieu des vignes est la quintessence du romantisme. Son immense cour d'honneur et ses salles luxueuses sont taillées pour les événements grandioses.",
    "capacite_accueil": "100 à 300 invités en intérieur (jusqu'à 1000 en extérieur)",
    "hebergement_sur_place": "Oui (15 chambres, soit 24 couchages)",
    "type_de_cadre": "Château féérique du XVIe siècle",
    "fourchette_de_prix": "Dès 10 500 €",
    "element_differenciant": "Son architecture de pur château de conte de fées, unique dans le paysage varois.",
    "contact": "+33 4 94 04 78 49",
    "sources": "chateauderobernier.com, frenchweddingstyle.com",
    "imageUrl": "https://images.unsplash.com/photo-1520854221256-17456bf85ea4?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château Mentone",
    "commune_et_zone": "Saint-Antonin-du-Var (Provence Verte)",
    "site_web_officiel": "https://www.chateaumentone.com",
    "description": "Mêlant l'esprit d'un grand domaine viticole à une démarche éco-responsable, cette propriété offre un cadre verdoyant idyllique. \"La Magnanerie\" offre un volume exceptionnel pour les dîners, complété par de nombreux hébergements.",
    "capacite_accueil": "60 à 250 invités",
    "hebergement_sur_place": "Oui (24 chambres/gîtes, jusqu'à 54 couchages)",
    "type_de_cadre": "Domaine viticole (biodynamie)",
    "fourchette_de_prix": "Forfaits de 365 € à 465 € / pers. (Location seule dès 4 000 €)",
    "element_differenciant": "Une offre œnotouristique, organique et écologique très aboutie dans une nature préservée.",
    "contact": "+33 4 94 04 42 00",
    "sources": "chateaumentone.com",
    "imageUrl": "https://images.unsplash.com/photo-1505916349660-8d81a99f3e4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Bastide Saint Julien",
    "commune_et_zone": "La Celle (Provence Verte)",
    "site_web_officiel": "https://www.bastide-saint-julien.com",
    "description": "Élégante et lumineuse, cette bastide réinterprète l'art de vivre provençal avec une touche résolument contemporaine. Entourée de champs de lavande et de roseraies, elle propose des espaces de réception somptueux et haut de gamme.",
    "capacite_accueil": "160 à 350 invités",
    "hebergement_sur_place": "Oui (10 chambres, soit 24 couchages)",
    "type_de_cadre": "Bastide contemporaine de luxe",
    "fourchette_de_prix": "Sur devis (location estimée dès 3 000 €)",
    "element_differenciant": "Le contraste frappant entre sa façade provençale historique et le design intérieur épuré du grand salon de 500m².",
    "contact": "+33 4 94 86 26 60",
    "sources": "bastide-saint-julien.com, rolandpaix.com",
    "imageUrl": "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Domaine Rocabella",
    "commune_et_zone": "Le Pradet (Toulon et environs)",
    "site_web_officiel": "https://www.rocabella.fr",
    "description": "Perchée face à la mer Méditerranée, cette propriété légendaire à l'architecture Belle Époque est l'incarnation même du luxe azuréen. Avec ses piscines et ses jardins tropicaux, elle permet d'organiser des mariages très cinématographiques.",
    "capacite_accueil": "Jusqu'à 150 invités",
    "hebergement_sur_place": "Oui (28 suites/chambres pour env. 86 couchages)",
    "type_de_cadre": "Villa Belle Époque front de mer",
    "fourchette_de_prix": "Dès 37 440 € (inclut séjour de 2 nuits pour 32 personnes)",
    "element_differenciant": "Son accès exclusif à des criques privées et un panorama maritime absolument spectaculaire.",
    "contact": "+33 4 23 46 00 94",
    "sources": "rocabella.fr, wedinspire.com",
    "imageUrl": "https://images.unsplash.com/photo-1528605248313-a4c0a1f52636?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Les Pins Penchés",
    "commune_et_zone": "Toulon (Toulon et environs)",
    "site_web_officiel": "https://www.lespinspenches.com",
    "description": "Véritable institution dominant la rade de Toulon, ce château du XVIIe siècle trône au sommet d'une végétation exotique spectaculaire. La vue panoramique plongeante et l'offre gastronomique en font un lieu taillé pour le grand luxe.",
    "capacite_accueil": "Jusqu'à 400 personnes assises",
    "hebergement_sur_place": "Non (hôtels partenaires à proximité)",
    "type_de_cadre": "Château du XVIIe siècle face mer",
    "fourchette_de_prix": "Menus dès 70 € à 88 € / pers. (frais de lieu et garden-party sur devis)",
    "element_differenciant": "La plus grande collection de palmiers d'Europe se jetant dans la mer pour une garden-party mémorable.",
    "contact": "+33 4 94 27 98 98",
    "sources": "lespinspenches.com",
    "imageUrl": "https://images.unsplash.com/photo-1464366400600-71fbce2ae64c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château Maravenne",
    "commune_et_zone": "La Londe-les-Maures (Littoral)",
    "site_web_officiel": "https://www.maravenne.com",
    "description": "Situé face aux îles d'Or, ce domaine viticole certifié bio combine terroir provençal et horizon marin. Ses immenses salles voûtées en pierre garantissent une réception de très grand standing, isolée dans les vignes.",
    "capacite_accueil": "Jusqu'à 160 invités assis (250 en extérieur)",
    "hebergement_sur_place": "Oui (Chambres d'hôtes et gîtes pour 29 personnes)",
    "type_de_cadre": "Domaine viticole (Bio)",
    "fourchette_de_prix": "À partir de 4 300 € (location des espaces)",
    "element_differenciant": "Un incroyable théâtre de verdure pour les cérémonies laïques, offrant une vue plongeante sur Porquerolles.",
    "contact": "+33 4 94 66 80 20",
    "sources": "maravenne.com, bridebook.com",
    "imageUrl": "https://images.unsplash.com/photo-1533100523116-2460623a6699?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Domaine Souviou",
    "commune_et_zone": "Le Beausset (Ouest Var)",
    "site_web_officiel": "https://www.domainesouviou.com",
    "description": "Véritable sanctuaire provençal, ce domaine se distingue par sa bastide séculaire et son atmosphère hors du temps. L'esplanade et le majestueux Pavillon du Moulin offrent d'immenses configurations pour des noces très élégantes.",
    "capacite_accueil": "20 à 300 invités",
    "hebergement_sur_place": "Non",
    "type_de_cadre": "Domaine viticole et oliveraie",
    "fourchette_de_prix": "Sur devis (location estimée dès 3 000 €)",
    "element_differenciant": "Sa forêt précieuse de 7000 oliviers dont certains sont millénaires, apportant une âme folle aux réceptions.",
    "contact": "+33 4 94 89 01 12",
    "sources": "domainesouviou.com, funbooker.com",
    "imageUrl": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
  },
  {
    "nom_du_lieu": "Château de Nans",
    "commune_et_zone": "Nans-les-Pins (Sainte-Baume)",
    "site_web_officiel": "https://www.chateaudenans.com",
    "description": "Adossée au massif de la Sainte-Baume, cette magnifique bâtisse classique se dresse au milieu d'un grand parc arboré. L'immense orangerie baignée de lumière permet d'accueillir d'importants volumes tout en préservant un esprit haut de gamme.",
    "capacite_accueil": "Jusqu'à 250 invités (en Orangerie)",
    "hebergement_sur_place": "Oui (Jusqu'à 36 couchages)",
    "type_de_cadre": "Château classique et parc arboré",
    "fourchette_de_prix": "De 4 760 € à 6 800 € (privatisation du château selon le jour)",
    "element_differenciant": "L'imposante architecture vitrée de l'Orangerie qui immerge totalement les convives dans la forêt domaniale.",
    "contact": "+33 4 94 78 92 06",
    "sources": "chateaudenans.com, abcsalles.com",
    "imageUrl": "https://images.unsplash.com/photo-1519225426343-a864e2960627?auto=format&fit=crop&w=800&q=80"
  }
];

export const venues: Venue[] = rawVenues.map((v, i) => {
  // Determine structured budget
  let budget: '€' | '€€' | '€€€' = '€€';
  if (v.fourchette_de_prix.includes('15 000') || v.fourchette_de_prix.includes('19 500') || v.fourchette_de_prix.includes('37 440')) {
    budget = '€€€';
  } else if (v.fourchette_de_prix.includes('4 000') || v.fourchette_de_prix.includes('3 000') || v.fourchette_de_prix.includes('3 960')) {
    budget = '€';
  }
  
  // Parse guests and accommodation
  const maxG = parseInt(v.capacite_accueil.match(/\d+/g)?.pop() || '200', 10);
  const accom = v.hebergement_sur_place.toLowerCase().includes('oui');

  return {
    ...v,
    id: `venue-${i}`,
    maxGuests: maxG,
    hasAccommodation: accom,
    budgetCategory: budget,
    detailedDescription: `Découvrez l'histoire fascinante de ${v.nom_du_lieu}. Ce lieu chargé d'émotions et de souvenirs offre un cadre idyllique pour célébrer votre union. Profitez d'espaces modulables, d'un service d'excellence et d'une atmosphère unique qui marquera l'esprit de vos invités. Le domaine met à votre disposition plusieurs espaces de réception, allant des salons intimes aux grandes salles majestueuses, sans oublier les magnifiques jardins pour vos cocktails ou cérémonies laïques. Une équipe dédiée vous accompagne à chaque étape pour un événement entièrement sur-mesure.`,
    amenities: ['Espace traiteur', 'Parking privé', 'Piste de danse', 'Jardins paysagers', 'Suite nuptiale', 'Mobiliers inclus'],
    galleryUrls: [
      v.imageUrl || 'https://images.unsplash.com/photo-1519225426343-a864e2960627?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-71fbce2ae64c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=800&q=80'
    ]
  } as Venue;
});
