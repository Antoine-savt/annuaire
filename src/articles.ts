import { Article } from './types';
import { photos } from './images';
import { contentLang } from './i18n/current';
import { articleSlugsEn } from './i18n/slugs';

/*
 * Article bodies use a small Markdown subset (see src/lib/richtext.tsx):
 * "## " section title, "### " sub-title, "- " list item, "> " highlighted tip,
 * [text](/path) link and **bold**. Paragraphs are separated by a blank line.
 */
export const articles: Article[] = [
  {
    slug: 'organiser-mariage-var-guide',
    description: "Secteur, budget, critères, réservation : toutes les étapes pour organiser son mariage dans le Var, des vignobles de la Dracénie au littoral.",
    title: 'Organiser son mariage dans le Var : le guide complet',
    category: 'Organisation',
    date: '2026-09-10',
    updated: '2026-10-10',
    excerpt:
      "Choisir son secteur, fixer le budget, comparer les lieux, réserver au bon moment : toutes les étapes pour organiser un mariage dans le Var, des vignobles de la Dracénie au littoral.",
    image: photos.gardenCeremony,
    imageAlt: 'Cérémonie de mariage en plein air dans un jardin',
    venues: ['chateau-de-berne', 'domaine-de-la-rotonde', 'chateau-maravenne', 'chateau-de-nans'],
    body: `
Le Var réunit sur un seul département presque tous les décors dont on rêve pour un mariage en Provence : des châteaux viticoles au milieu des vignes, des bastides entourées d'oliviers, des villages perchés, des forêts et plus de 400 kilomètres de côtes. Cette diversité est une chance, mais elle complique aussi le choix. Ce guide reprend les étapes dans l'ordre, avec les questions à se poser à chacune.

## Pourquoi se marier dans le Var

Trois raisons reviennent souvent. La lumière d'abord : le Var est l'un des départements les plus ensoleillés de France, ce qui permet d'organiser cérémonie, cocktail et dîner en plein air une grande partie de l'année. Le patrimoine ensuite : bastides, mas, châteaux et domaines viticoles offrent des cadres déjà mis en scène, qui demandent peu de décoration. L'accès enfin : avec les gares de Toulon et des Arcs-Draguignan, et les aéroports de Toulon-Hyères, Marseille et Nice, vos invités peuvent venir de toute la France et de l'étranger.

## Choisir son secteur avant de choisir son lieu

Le Var est vaste : il faut compter plus d'une heure et demie de route pour le traverser. Avant de comparer les domaines un par un, décidez de l'ambiance que vous recherchez et de la zone qui conviendra le mieux à vos invités.

### La Dracénie, pour les châteaux viticoles

Autour de Draguignan, Lorgues et Les Arcs-sur-Argens, la [Dracénie](/secteurs/dracenie) concentre une grande partie des domaines viticoles qui accueillent des mariages. C'est le secteur à privilégier si vous rêvez de vignes, de chais voûtés et de vins servis là où ils sont produits.

### Le Haut-Var, pour un mariage nature

Plus au nord, le [Haut-Var](/secteurs/haut-var) offre des villages perchés, des forêts de chênes et des lieux plus confidentiels. Les soirées y sont souvent plus fraîches en été, et les domaines logent volontiers les invités pour tout le week-end.

### La Provence Verte, entre vignes et rivières

Autour de Brignoles et de la vallée de l'Argens, la [Provence Verte](/secteurs/provence-verte) mêle collines boisées, vignobles et bastides. On y trouve aussi bien de grands châteaux que des maisons de famille.

### Le littoral et Toulon, pour la vue sur la mer

De la rade de Toulon à La Londe-les-Maures, les lieux du [littoral varois](/secteurs/littoral) et de [Toulon et ses environs](/secteurs/toulon) jouent la carte de la Méditerranée : terrasses face à la mer, jardins exotiques, villas Belle Époque.

### L'Ouest Var et la Sainte-Baume

Sur les terres du Bandol, l'[Ouest Var](/secteurs/ouest-var) cultive l'esprit des mas et des oliveraies. Au pied du massif de la [Sainte-Baume](/secteurs/sainte-baume), les lieux offrent fraîcheur et grands parcs arborés, à moins d'une heure d'Aix-en-Provence et de Marseille.

## Fixer le nombre d'invités et le budget

Le nombre d'invités est le premier filtre, avant même le style du lieu. Établissez une liste réaliste, puis cherchez des lieux dont la capacité couvre votre fourchette, avec une marge. Attention : une capacité annoncée « jusqu'à 250 invités » concerne souvent l'extérieur. Vérifiez toujours combien de personnes la salle de repli peut accueillir assises, en cas de pluie ou de vent.

Côté budget, distinguez trois types d'offres :

- la **location seule**, parfois d'une salle vide, à laquelle s'ajoutent traiteur, mobilier et décoration ;
- le **forfait mariage**, qui regroupe lieu, repas, boissons et parfois mobilier, facturé au nombre d'invités ;
- la **privatisation avec séjour**, qui inclut l'hébergement de vos proches sur plusieurs nuits.

Dans notre sélection, les prix de départ publiés vont d'environ 1 000 € pour une location de salle à plus de 37 000 € pour une privatisation avec séjour. Notre article sur [le prix d'un lieu de mariage dans le Var](/journal/prix-lieu-mariage-var) détaille ce que recouvrent ces chiffres.

## Les critères pour comparer les lieux

Une fois quelques lieux présélectionnés, comparez-les sur des critères concrets plutôt que sur les photos :

- **la capacité** en intérieur et en extérieur, et la configuration en cas de mauvais temps ;
- **l'hébergement** sur place : nombre de couchages, prix, nombre de nuits imposé ;
- **le traiteur** : imposé, référencé ou libre, et le droit de bouchon si vous apportez vos vins ;
- **les horaires** : heure de fin de la musique amplifiée, limiteur de son, heure de départ des invités ;
- **la durée de location** : journée seule ou week-end, et le brunch du lendemain ;
- **l'accès** : parking, distance des gares et aéroports, chemin d'accès praticable par un car ;
- **l'accessibilité** pour les invités âgés ou à mobilité réduite.

Sur notre annuaire, vous pouvez [filtrer les lieux](/#lieux) par secteur, nombre d'invités, budget et nombre de personnes à loger.

## L'hébergement des invités, un critère sous-estimé

Dans le Var, beaucoup de lieux sont isolés dans les vignes ou la forêt, loin des hôtels. Un domaine qui loge une partie des invités évite les trajets de nuit sur des routes sinueuses et permet de prolonger la fête par un brunch le lendemain. Nous avons réuni [les lieux avec hébergement sur place](/journal/lieu-mariage-hebergement-var) dans un article dédié.

Si le lieu ne loge personne, prévoyez une liste d'hébergements proches à transmettre aux invités, et des navettes en fin de soirée.

## Mairie, cérémonie laïque et cérémonie religieuse

En France, le mariage civil est célébré à la mairie, dans la commune où l'un des futurs époux, ou l'un de leurs parents, a son domicile ou sa résidence. La cérémonie organisée sur le lieu de réception n'a donc pas de valeur légale : c'est une cérémonie laïque, libre dans sa forme. Si vous souhaitez un mariage religieux, il doit être célébré après le mariage civil.

Beaucoup de domaines varois disposent d'un espace pensé pour la cérémonie laïque : théâtre de verdure, oliveraie, cloître ou scène au bord de l'eau. Notre guide de [la cérémonie laïque en Provence](/journal/ceremonie-laique-provence) détaille son organisation.

> Bon à savoir : la mairie publie les bans au moins dix jours avant le mariage. Renseignez-vous auprès d'elle plusieurs mois à l'avance sur les pièces à fournir et les créneaux disponibles, surtout le samedi en été.

## Réserver au bon moment

Pour un samedi entre mai et septembre, les lieux les plus demandés se réservent souvent un an à dix-huit mois à l'avance. Si vos dates sont flexibles, un vendredi, un dimanche ou un mariage en avril ou en octobre ouvre bien plus de possibilités, souvent à un tarif plus doux. Notre [rétroplanning](/journal/retroplanning-mariage) détaille les étapes mois par mois, et notre article sur [la saison idéale](/journal/quelle-saison-mariage-var) vous aide à choisir la période.

## Les prestataires à réserver ensuite

Le lieu détermine souvent le reste. Demandez-lui la liste de ses prestataires référencés : certains domaines imposent un traiteur, d'autres laissent le choix libre. Réservez ensuite le traiteur, le photographe et le vidéaste, la musique, puis le fleuriste. Notre page [prestataires](/prestataires) résume ce qu'il faut demander à chacun, et notre page [photographes](/prestataires/photographes) aide à choisir celui qui racontera votre journée.

## Les questions à poser lors de la visite

Visitez toujours le lieu avant de signer, idéalement à l'heure prévue pour votre cérémonie, pour voir la lumière. Pendant la visite, posez au moins ces questions :

- Que comprend exactement le tarif, et quels frais s'y ajoutent (ménage, caution, électricité, mobilier) ?
- Quel est le plan B en cas de pluie ou de mistral, et pour combien de personnes ?
- Le traiteur est-il imposé ? Peut-on apporter ses vins, et à quel droit de bouchon ?
- Jusqu'à quelle heure la musique est-elle autorisée, et à quel volume ?
- Combien de personnes peuvent dormir sur place, et pour combien de nuits ?
- Qui représentera le lieu le jour J ?
- Quelles sont les conditions d'annulation et l'échéancier des acomptes ?
`,
    faq: [
      {
        q: 'Combien de temps à l’avance réserver son lieu de mariage dans le Var ?',
        a: "Comptez un an à dix-huit mois pour un samedi de mai à septembre dans un lieu réputé. Hors saison ou un autre jour que le samedi, six à neuf mois peuvent suffire.",
      },
      {
        q: 'Peut-on se marier légalement dans un château ou un domaine ?',
        a: "Non. Le mariage civil est célébré à la mairie. Sur le lieu de réception, vous organisez une cérémonie laïque, sans valeur légale mais libre dans sa forme.",
      },
      {
        q: 'Quel secteur du Var choisir pour son mariage ?',
        a: "La [Dracénie](/secteurs/dracenie) pour les domaines viticoles, le [Haut-Var](/secteurs/haut-var) pour un mariage nature, le [littoral](/secteurs/littoral) pour la vue sur la mer, la [Provence Verte](/secteurs/provence-verte) et la [Sainte-Baume](/secteurs/sainte-baume) pour les grands parcs. Pensez aussi à l'accès pour vos invités.",
      },
      {
        q: 'Comment trouver un lieu adapté à mon nombre d’invités ?',
        a: "Utilisez les [filtres de l'annuaire](/#lieux) : indiquez votre nombre d'invités, votre budget et le nombre de personnes à loger pour ne voir que les lieux adaptés.",
      },
    ],
  },
  {
    slug: 'prix-lieu-mariage-var',
    description: "Prix des lieux de mariage dans le Var : de 1 000 € à plus de 37 000 € selon la formule. Ce qui est inclus, les frais à prévoir et nos conseils.",
    title: 'Combien coûte un lieu de mariage dans le Var ?',
    seoTitle: 'Prix d’un lieu de mariage dans le Var',
    category: 'Budget',
    date: '2026-10-06',
    excerpt:
      "Location seule, forfait par invité ou privatisation avec séjour : les prix de départ vont de 1 000 € à plus de 37 000 € dans notre sélection. Ce que recouvrent ces chiffres, les frais à anticiper et nos conseils pour payer moins.",
    image: photos.tableRed,
    imageAlt: 'Table de banquet dressée pour un dîner de mariage',
    venues: ['chateau-sainte-roseline', 'bastide-saint-julien', 'chateau-mentone', 'chateau-de-nans', 'chateau-de-robernier', 'domaine-rocabella'],
    body: `
C'est souvent la première question des couples, et la plus difficile : combien coûte un lieu de mariage dans le Var ? La réponse dépend moins du prestige du lieu que de ce qui est inclus dans le prix. Voici comment lire les tarifs, à partir des prix publiés par les lieux de notre sélection.

## Trois façons de facturer un lieu

### La location seule

Le lieu vous loue ses espaces pour une journée ou un week-end. Selon les cas, vous disposez d'une salle vide ou équipée de tables et de chaises. Le traiteur, les boissons, la décoration et parfois le mobilier s'ajoutent. C'est la formule la plus souple, mais le prix affiché ne représente qu'une partie du budget de la réception.

### Le forfait mariage

Le lieu propose un forfait qui regroupe la location, le repas, les boissons et souvent le service, facturé au nombre d'invités. C'est plus simple à comparer et à budgéter, mais moins personnalisable.

### La privatisation avec séjour

Le lieu est privatisé sur plusieurs jours, avec l'hébergement d'une partie des invités. Le prix est plus élevé, mais il inclut des nuits qui auraient de toute façon été payées à l'hôtel.

## Les prix dans notre sélection

Voici les prix de départ publiés par les lieux, du plus accessible au plus élevé. Ils sont indicatifs et à confirmer auprès de chaque lieu.

- [Château Sainte Roseline](/lieux/chateau-sainte-roseline) : location de salle de 1 000 € à 1 800 €, forfait mariage dès 7 000 €
- [Bastide Saint Julien](/lieux/bastide-saint-julien) : location estimée dès 3 000 €
- [Domaine Souviou](/lieux/domaine-souviou) : location estimée dès 3 000 €
- [Château de Font du Broc](/lieux/chateau-de-font-du-broc) : dès 3 960 € pour la location d'une salle vide
- [Château Mentone](/lieux/chateau-mentone) : location seule dès 4 000 €, forfaits de 365 € à 465 € par personne
- [Château Maravenne](/lieux/chateau-maravenne) : location des espaces dès 4 300 €
- [Château de Nans](/lieux/chateau-de-nans) : privatisation de 4 760 € à 6 800 € selon le jour
- [Château de Robernier](/lieux/chateau-de-robernier) : dès 10 500 €
- [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde) : location estimée dès 12 500 €
- [Château Pimõ](/lieux/chateau-pimo) : dès 15 000 € pour une privatisation de trois jours
- [Château de Berne](/lieux/chateau-de-berne) : formule dès 19 500 €, privatisation totale dès 95 500 €
- [Domaine Rocabella](/lieux/domaine-rocabella) : dès 37 440 €, séjour de deux nuits pour 32 personnes inclus

Trois lieux communiquent leurs tarifs uniquement sur devis : le [Château Saint Ange](/lieux/chateau-saint-ange), [La Bastide de Montferrat](/lieux/bastide-de-montferrat) et [Les Pins Penchés](/lieux/les-pins-penches), qui affichent des menus à partir de 70 € par personne.

> Attention : comparer ces prix n'a de sens qu'à prestations égales. Une salle vide louée 4 000 € peut revenir plus cher, au final, qu'un forfait tout compris.

## Les frais à anticiper

Au-delà du prix affiché, plusieurs frais reviennent souvent :

- **le traiteur**, facturé par invité, souvent le premier poste de dépense de la réception ;
- **les boissons**, et le **droit de bouchon** si vous apportez vos propres vins ou champagnes ;
- **le mobilier et la vaisselle**, quand la salle est louée vide ;
- **le ménage** et **l'électricité**, parfois facturés à part ;
- **la caution**, restituée après l'événement ;
- **les nuits supplémentaires** si le lieu impose un minimum de deux nuits ;
- **la tente** pour le plan B, si la salle de repli ne suffit pas ;
- **les heures supplémentaires** du personnel au-delà de l'horaire prévu.

## Ce qui fait varier le prix

### La saison et le jour

Un samedi de juin ou de septembre coûte presque toujours plus cher qu'un vendredi d'avril ou un dimanche d'octobre. Beaucoup de lieux ont une grille de prix par saison et par jour de la semaine : le [Château de Nans](/lieux/chateau-de-nans), par exemple, affiche des tarifs différents selon le jour.

### Le nombre d'invités

Pour un forfait par personne, le prix suit directement le nombre d'invités. Pour une location, il dépend surtout des espaces réservés : une grande salle pour 300 personnes coûte plus cher qu'un salon pour 80.

### La durée

Une location à la journée est moins chère qu'un week-end complet, mais le week-end permet d'étaler l'installation, de recevoir les invités la veille et d'organiser un brunch le lendemain.

## Nos conseils pour payer moins

- **Visez les dates moins demandées** : vendredi, dimanche, avril, octobre.
- **Comparez à prestations égales** en demandant à chaque lieu un devis détaillé pour votre nombre d'invités.
- **Regroupez lieu et hébergement** : une privatisation avec couchages peut revenir moins cher que la location plus les hôtels.
- **Négociez ce qui compte pour vous**, comme le brunch du lendemain ou le droit de bouchon, plutôt qu'une remise globale.
- **Vérifiez les conditions d'annulation** et l'échéancier des acomptes avant de signer.

Sur notre annuaire, vous pouvez indiquer un budget minimum et maximum pour [filtrer les lieux](/#lieux) selon leur prix de départ. Pour comparer les grandes capacités, consultez aussi notre sélection de [lieux pour 200 invités et plus](/journal/grand-mariage-var).
`,
    faq: [
      {
        q: 'Quel budget prévoir pour un lieu de mariage dans le Var ?',
        a: "Dans notre sélection, les prix de départ vont d'environ 1 000 € pour une salle à plus de 37 000 € pour une privatisation avec séjour. La plupart des locations de domaines se situent entre 3 000 € et 15 000 €, hors traiteur.",
      },
      {
        q: 'Le prix d’un lieu de mariage inclut-il le repas ?',
        a: "Pas toujours. En location seule, le traiteur s'ajoute. Les forfaits mariage incluent généralement le repas, les boissons et le service.",
      },
      {
        q: 'Qu’est-ce que le droit de bouchon ?',
        a: "C'est un montant facturé par le lieu ou le traiteur pour chaque bouteille que vous apportez vous-même. Demandez-le avant de signer si vous prévoyez vos propres vins ou champagnes.",
      },
      {
        q: 'Comment réduire le coût de son lieu de mariage ?',
        a: "Choisissez un vendredi, un dimanche ou une date hors saison, comparez des devis détaillés à prestations égales et privilégiez un lieu qui loge vos invités.",
      },
    ],
  },
  {
    slug: 'lieu-mariage-hebergement-var',
    description: "Les lieux de mariage du Var qui logent vos invités, de 8 chambres à 86 couchages, et comment organiser un mariage sur tout un week-end.",
    title: 'Lieux de mariage avec hébergement dans le Var',
    category: 'Lieux',
    date: '2026-10-01',
    excerpt:
      "Loger ses invités sur place évite les trajets de nuit et prolonge la fête. Les lieux de notre sélection qui disposent de chambres ou de gîtes, du plus grand au plus intime, et comment organiser un mariage sur tout un week-end.",
    image: photos.villaArches,
    imageAlt: 'Bastide à arcades et piscine à la tombée de la nuit',
    venues: ['domaine-rocabella', 'chateau-mentone', 'chateau-pimo', 'domaine-de-la-rotonde', 'bastide-de-montferrat', 'chateau-de-nans'],
    body: `
Dans le Var, beaucoup de lieux de réception sont isolés dans les vignes, la forêt ou les collines. C'est ce qui fait leur charme, mais cela pose une question pratique : où dormiront les invités ? Un lieu avec hébergement sur place règle le problème et transforme la journée en week-end. Voici les adresses de notre sélection qui logent des invités, et nos conseils pour bien s'organiser.

## Pourquoi choisir un lieu avec hébergement

- **La sécurité** : plus de trajets de nuit sur des routes sinueuses après la soirée.
- **Le temps passé ensemble** : les invités arrivent la veille, restent pour le brunch, et le mariage dure tout le week-end.
- **La simplicité** : moins de navettes à organiser, moins d'hôtels à réserver.
- **Le budget** : les nuits sur place remplacent des nuits d'hôtel que les invités auraient payées de toute façon.

## Les lieux qui logent le plus d'invités

Voici les lieux de notre sélection classés selon le nombre de personnes qu'ils peuvent loger, d'après les informations publiées.

- [Domaine Rocabella](/lieux/domaine-rocabella), au Pradet : environ 86 couchages dans 28 suites et chambres, face à la mer
- [Château Mentone](/lieux/chateau-mentone), à Saint-Antonin-du-Var : jusqu'à 54 couchages en chambres et gîtes
- [Château Pimõ](/lieux/chateau-pimo), à Draguignan : 50 couchages en suites et tentes nomades
- [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde), à Villecroze : environ 50 couchages dans 7 à 8 gîtes
- [La Bastide de Montferrat](/lieux/bastide-de-montferrat) : 40 couchages dans 20 chambres
- [Château de Nans](/lieux/chateau-de-nans), à Nans-les-Pins : jusqu'à 36 couchages
- [Château de Berne](/lieux/chateau-de-berne), à Lorgues : un hôtel cinq étoiles de 34 chambres et des villas
- [Château Maravenne](/lieux/chateau-maravenne), à La Londe-les-Maures : 29 personnes en chambres d'hôtes et gîtes
- [Château de Robernier](/lieux/chateau-de-robernier), à Montfort-sur-Argens : 15 chambres, 24 couchages
- [Bastide Saint Julien](/lieux/bastide-saint-julien), à La Celle : 10 chambres, 24 couchages
- [Château Saint Ange](/lieux/chateau-saint-ange), à Draguignan : 8 chambres
- [Château Sainte Roseline](/lieux/chateau-sainte-roseline), aux Arcs-sur-Argens : un appartement privé et 7 chambres via forfait

Dans notre annuaire, le filtre « Hébergement sur place » permet d'indiquer le nombre de personnes à loger pour [ne voir que les lieux adaptés](/#lieux).

## Trois styles d'hébergement

### Le domaine-hôtel

Au [Château de Berne](/lieux/chateau-de-berne) ou au [Domaine Rocabella](/lieux/domaine-rocabella), les invités sont logés dans des chambres de standing hôtelier, avec service. C'est le plus confortable, et le plus cher.

### La grande maison de famille

À [La Bastide de Montferrat](/lieux/bastide-de-montferrat), le lieu est privatisé et l'esprit est celui d'une grande maison partagée. Idéal pour un mariage chaleureux entre proches.

### Les gîtes et l'hébergement insolite

Au [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde), les invités dorment dans des gîtes autour de l'ancienne ferme templière. Au [Château Pimõ](/lieux/chateau-pimo), des tentes nomades complètent les suites pour un week-end façon glamping chic.

## Qui loger sur place ?

Les lieux logent rarement tous les invités. Il faut donc choisir. En général, on réserve les chambres sur place aux mariés, à la famille proche, aux témoins et aux invités venus de loin, puis on oriente les autres vers des hébergements proches. Pensez aussi aux invités âgés et aux familles avec de jeunes enfants, pour qui un retour tardif est difficile.

## Qui paie les chambres ?

Plusieurs formules existent : les mariés offrent les nuits, les invités paient leur chambre directement au lieu, ou un mélange des deux. Annoncez-le clairement sur le faire-part ou le site du mariage pour éviter les malentendus.

## Organiser un mariage sur un week-end

Avec l'hébergement sur place, le mariage peut se dérouler sur deux ou trois jours :

- **la veille** : arrivée des invités, dîner informel ou apéritif de bienvenue ;
- **le jour J** : cérémonie, cocktail, dîner et soirée dansante ;
- **le lendemain** : brunch, piscine, visite de cave ou balade dans les environs.

Vérifiez avec le lieu ce qui est inclus : nombre de nuits, horaires d'arrivée et de départ, linge, ménage et petit-déjeuner.

## Si le lieu ne loge pas vos invités

Le [Château de Font du Broc](/lieux/chateau-de-font-du-broc), [Les Pins Penchés](/lieux/les-pins-penches) et le [Domaine Souviou](/lieux/domaine-souviou) n'ont pas d'hébergement sur place. Ce n'est pas rédhibitoire : préparez une liste d'hôtels, de gîtes et de chambres d'hôtes proches, réservez des blocs de chambres à l'avance et organisez des navettes en fin de soirée. Les Pins Penchés, à Toulon, profitent de l'offre hôtelière de la ville.
`,
    faq: [
      {
        q: 'Quel lieu de mariage du Var loge le plus d’invités ?',
        a: "Dans notre sélection, le [Domaine Rocabella](/lieux/domaine-rocabella) (environ 86 couchages), le [Château Mentone](/lieux/chateau-mentone) (jusqu'à 54), puis le [Château Pimõ](/lieux/chateau-pimo) et le [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde) (environ 50 chacun).",
      },
      {
        q: 'Faut-il loger tous les invités sur place ?',
        a: "Ce n'est pas nécessaire. On loge en priorité la famille proche, les témoins et les invités venus de loin, et on oriente les autres vers des hébergements proches avec des navettes.",
      },
      {
        q: 'Un lieu avec hébergement coûte-t-il plus cher ?',
        a: "La location est souvent plus chère, mais elle inclut des nuits que les invités auraient payées à l'hôtel. Comparez le coût total, hébergement compris.",
      },
    ],
  },
  {
    slug: 'ceremonie-laique-provence',
    description: "Déroulé, officiant, durée, lieux et plan B : comment organiser une cérémonie laïque réussie en Provence et dans le Var.",
    title: 'Organiser une cérémonie laïque en Provence',
    category: 'Organisation',
    date: '2026-09-24',
    excerpt:
      "Sans valeur légale mais libre dans sa forme, la cérémonie laïque est devenue un moment central des mariages en Provence. Déroulé, officiant, durée, lieux et plan B : le guide pour l'organiser dans le Var.",
    image: photos.hillsideArch,
    imageAlt: 'Arche de cérémonie fleurie face aux collines',
    venues: ['chateau-maravenne', 'chateau-de-berne', 'chateau-sainte-roseline', 'domaine-souviou', 'chateau-saint-ange'],
    body: `
Dans les domaines et les bastides du Var, la cérémonie laïque est souvent le moment le plus émouvant de la journée. Elle se déroule sur le lieu de réception, au milieu des oliviers ou face à la mer, et prend la forme que vous lui donnez. Voici comment l'organiser.

## Qu'est-ce qu'une cérémonie laïque ?

En France, seul le mariage civil, célébré à la mairie, a une valeur légale. La cérémonie laïque est une cérémonie symbolique, sans valeur juridique, que vous organisez librement, le plus souvent sur votre lieu de réception. Elle permet de raconter votre histoire, de faire intervenir vos proches et de vous engager l'un envers l'autre avec vos propres mots.

Le mariage civil peut avoir lieu le même jour, le matin, ou quelques jours avant, avec un plus petit nombre d'invités.

## Le déroulé type

Une cérémonie laïque dure en général entre 30 et 45 minutes. Un déroulé classique :

- l'arrivée des invités, accueillis en musique ;
- l'entrée du cortège, puis celle de la mariée ou des mariés ;
- le mot d'accueil de l'officiant ;
- votre histoire, racontée par l'officiant ou par des proches ;
- les discours et lectures de proches, deux à quatre en général ;
- un rituel symbolique : cérémonie du sable, des rubans, de l'arbre ou du vin ;
- l'échange des vœux et des alliances ;
- la sortie des mariés, sous les pétales ou la lavande.

## Qui célèbre la cérémonie ?

Trois options existent :

- **un proche** : un ami ou un membre de la famille à l'aise à l'oral, qui vous connaît bien ;
- **un officiant professionnel** : il écrit et anime la cérémonie à partir d'entretiens avec vous ;
- **les mariés eux-mêmes**, avec plusieurs proches qui se succèdent.

Un officiant professionnel se réserve plusieurs mois à l'avance, comme les autres prestataires.

## Choisir l'emplacement

Beaucoup de lieux du Var disposent d'un espace pensé pour la cérémonie :

- un **théâtre de verdure** face aux îles d'Or au [Château Maravenne](/lieux/chateau-maravenne) ;
- une **scène au-dessus d'un lac** au [Château de Berne](/lieux/chateau-de-berne) ;
- un **cloître du XIIe siècle** au [Château Sainte Roseline](/lieux/chateau-sainte-roseline) ;
- une **oliveraie** de plus de 1 000 arbres au [Château Saint Ange](/lieux/chateau-saint-ange), ou de 7 000 arbres au [Domaine Souviou](/lieux/domaine-souviou) ;
- une **cour intérieure historique** au [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde).

Lors de la visite, regardez où sera le soleil à l'heure de la cérémonie : ni les invités ni vous ne devez l'avoir dans les yeux.

## L'horaire et la lumière

En été, évitez le plein soleil de l'après-midi. Une cérémonie vers 17 h ou 18 h offre une lumière plus douce et des températures plus supportables, et enchaîne naturellement sur le cocktail au coucher du soleil. Au printemps et en automne, avancez l'horaire : le soleil se couche plus tôt. Notre article sur [la saison idéale](/journal/quelle-saison-mariage-var) donne des repères mois par mois.

## Le son

En extérieur, la voix porte mal. Prévoyez une sonorisation avec au moins deux micros, un pour l'officiant et un pour les intervenants, et vérifiez qui fournit le matériel : le lieu, le DJ ou les musiciens. Testez-la avant l'arrivée des invités.

## Le plan B

Même en Provence, il peut pleuvoir, et le vent peut rendre une cérémonie en extérieur inconfortable. Prévoyez avec le lieu un emplacement abrité, et décidez la veille ou le matin même. Une tente, un chai ou une salle voûtée peuvent devenir de très beaux décors de cérémonie.

## Les détails qui comptent

- **De l'ombre et de l'eau** pour les invités en été, et des chaises pour tout le monde.
- **Un livret de cérémonie**, qui peut aussi servir d'éventail.
- **Les textes et vœux imprimés** sur des cartes, plutôt que lus sur un téléphone.
- **Une personne désignée** pour gérer la musique et le timing.

Pour la suite de l'organisation, notre [guide complet](/journal/organiser-mariage-var-guide) reprend toutes les étapes.
`,
    faq: [
      {
        q: 'Une cérémonie laïque a-t-elle une valeur légale ?',
        a: "Non. En France, seul le mariage civil célébré à la mairie a une valeur légale. La cérémonie laïque est symbolique et se déroule librement, souvent sur le lieu de réception.",
      },
      {
        q: 'Combien de temps dure une cérémonie laïque ?',
        a: "Entre 30 et 45 minutes en général, avec l'entrée du cortège, l'histoire du couple, les discours de proches, un rituel symbolique et l'échange des vœux.",
      },
      {
        q: 'À quelle heure organiser une cérémonie laïque en été ?',
        a: "En fin de journée, vers 17 h ou 18 h, pour éviter la chaleur et profiter d'une lumière plus douce avant le cocktail.",
      },
      {
        q: 'Quels lieux du Var ont un espace dédié à la cérémonie laïque ?',
        a: "Entre autres, le [Château Maravenne](/lieux/chateau-maravenne) (théâtre de verdure), le [Château de Berne](/lieux/chateau-de-berne) (scène sur l'eau), le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) (cloître) et le [Domaine Souviou](/lieux/domaine-souviou) (oliveraie).",
      },
    ],
  },
  {
    slug: 'grand-mariage-var',
    description: "Les lieux du Var pour un mariage de 200 à 650 invités, et la logistique à prévoir : capacité assise, parking, navettes, traiteur.",
    title: 'Grand mariage dans le Var : les lieux pour 200 invités et plus',
    seoTitle: 'Lieux de mariage pour 200 invités et plus dans le Var',
    category: 'Lieux',
    date: '2026-09-17',
    excerpt:
      "Organiser une réception pour 200, 300 ou 400 invités demande un lieu capable de tous les accueillir assis, même en cas de pluie. Les lieux de notre sélection qui le permettent, et la logistique à prévoir.",
    image: photos.chandelierHall,
    imageAlt: 'Grande salle de réception avec lustres et tables rondes',
    venues: ['chateau-de-font-du-broc', 'chateau-sainte-roseline', 'les-pins-penches', 'bastide-saint-julien', 'chateau-de-robernier', 'domaine-souviou'],
    body: `
Au-delà de 200 invités, le choix du lieu se resserre. Il ne suffit pas d'un grand jardin : il faut une salle de repli à la bonne taille, un parking, des sanitaires en nombre suffisant et un traiteur capable de servir tout le monde en même temps. Voici les lieux de notre sélection qui accueillent les grandes réceptions, et ce qu'il faut vérifier.

## Les lieux pour plus de 300 invités

- [Château de Font du Broc](/lieux/chateau-de-font-du-broc), aux Arcs-sur-Argens : de 100 à 650 invités assis, avec une salle équestre monumentale et une cave à barriques. C'est le plus grand de notre sélection. Pas d'hébergement sur place.
- [Château Sainte Roseline](/lieux/chateau-sainte-roseline), aux Arcs-sur-Argens : de 30 à 400 invités, dont 250 dans la Salle des Vendanges.
- [Les Pins Penchés](/lieux/les-pins-penches), à Toulon : jusqu'à 400 personnes assises, face à la rade.
- [Bastide Saint Julien](/lieux/bastide-saint-julien), à La Celle : de 160 à 350 invités, avec un grand salon de 500 m².
- [Château de Robernier](/lieux/chateau-de-robernier), à Montfort-sur-Argens : de 100 à 300 invités en intérieur, et bien davantage en extérieur dans la cour d'honneur.

## Les lieux pour 200 à 300 invités

- [Domaine Souviou](/lieux/domaine-souviou), au Beausset : de 20 à 300 invités, sur l'esplanade et dans le Pavillon du Moulin.
- [Domaine de la Rotonde](/lieux/domaine-de-la-rotonde), à Villecroze : jusqu'à 250 invités, avec environ 50 couchages.
- [Château Mentone](/lieux/chateau-mentone), à Saint-Antonin-du-Var : de 60 à 250 invités, dîner dans la Magnanerie.
- [Château de Nans](/lieux/chateau-de-nans), à Nans-les-Pins : jusqu'à 250 invités dans l'Orangerie.
- [Château Maravenne](/lieux/chateau-maravenne), à La Londe-les-Maures : jusqu'à 250 invités en extérieur, 160 assis en intérieur.
- [Château de Berne](/lieux/chateau-de-berne), à Lorgues : de 120 à 200 invités.

Pour voir tous les lieux adaptés à votre nombre exact d'invités, utilisez les [filtres de l'annuaire](/#lieux).

## Capacité assise, debout, intérieure, extérieure

Les capacités annoncées par les lieux ne mesurent pas toutes la même chose. Avant de comparer, demandez :

- la capacité **assise** pour le dîner, en tables rondes ou en tables longues ;
- la capacité **debout** pour le cocktail ;
- la capacité **intérieure**, qui compte en cas de pluie ;
- la place disponible pour la **piste de danse** une fois les tables installées.

> Un lieu annoncé « jusqu'à 400 personnes » en extérieur peut n'en accueillir que 200 assises à l'intérieur. C'est ce second chiffre qui compte le jour où il pleut.

## La logistique d'un grand mariage

### Le stationnement et les navettes

200 invités, c'est souvent plus de 80 voitures. Vérifiez la taille du parking et l'accès pour les cars : beaucoup de domaines sont au bout de chemins étroits. Des navettes depuis les hôtels ou une gare limitent le nombre de voitures et les retours de nuit.

### Les sanitaires

Les sanitaires d'un domaine sont rarement dimensionnés pour 300 personnes. Demandez combien il y en a et prévoyez au besoin des sanitaires mobiles.

### Le traiteur et le service

Servir 300 assiettes chaudes en même temps demande une brigade nombreuse et un espace cuisine adapté. Demandez au traiteur combien de serveurs il prévoit et s'il a déjà travaillé dans le lieu.

### L'électricité et le son

Éclairage, sonorisation, cuisine du traiteur : la puissance électrique disponible doit suivre. Pour une grande soirée, vérifiez aussi les limites sonores et l'heure de fin de la musique.

### L'hébergement

Aucun lieu ne loge 300 invités. Réservez des blocs de chambres dans les hôtels proches et organisez les retours. Notre article sur [les lieux avec hébergement](/journal/lieu-mariage-hebergement-var) détaille les capacités de chacun.

## Le budget d'un grand mariage

Avec beaucoup d'invités, le traiteur devient le premier poste de dépense, loin devant la location du lieu. Un lieu un peu plus cher mais qui inclut le mobilier, une grande salle de repli et un parking peut revenir moins cher au total. Notre article sur [le prix d'un lieu de mariage](/journal/prix-lieu-mariage-var) détaille les frais à anticiper.
`,
    faq: [
      {
        q: 'Quel lieu du Var peut accueillir plus de 300 invités pour un mariage ?',
        a: "Dans notre sélection : le [Château de Font du Broc](/lieux/chateau-de-font-du-broc) (jusqu'à 650 assis), le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) et [Les Pins Penchés](/lieux/les-pins-penches) (jusqu'à 400), et la [Bastide Saint Julien](/lieux/bastide-saint-julien) (jusqu'à 350).",
      },
      {
        q: 'Comment organiser le transport de 200 invités ?',
        a: "Prévoyez des navettes depuis les hôtels et les gares, et vérifiez l'accès des cars au lieu ainsi que la taille du parking.",
      },
      {
        q: 'Que faire en cas de pluie avec 300 invités ?',
        a: "Choisissez un lieu dont la salle intérieure accueille tous vos invités assis, ou prévoyez une tente de réception à la bonne taille.",
      },
    ],
  },
  {
    slug: 'retroplanning-mariage',
    description: "Le rétroplanning complet pour organiser son mariage dans le Var : que faire 18 mois, 12 mois, 6 mois, 1 mois et 1 semaine avant.",
    title: 'Rétroplanning : organiser son mariage mois par mois',
    category: 'Organisation',
    date: '2026-09-03',
    excerpt:
      "De la réservation du lieu dix-huit mois avant au plan de table la dernière semaine : le calendrier complet pour organiser son mariage dans le Var sans rien oublier.",
    image: photos.planning,
    imageAlt: "Préparation d'un mariage avec carnet et ordinateur",
    venues: ['chateau-mentone', 'bastide-de-montferrat', 'chateau-maravenne'],
    body: `
Organiser un mariage demande souvent un an à dix-huit mois. Le secret pour garder le plaisir de la préparation : faire les choses dans le bon ordre. Ce rétroplanning reprend les étapes clés, avec les spécificités d'un mariage dans le Var.

## De 18 à 12 mois avant

C'est la phase des grandes décisions.

- Fixez votre **budget global** et sa répartition entre les postes.
- Établissez une **première liste d'invités**, qui détermine la taille du lieu.
- Choisissez la **saison** et quelques dates possibles. Notre article sur [la saison idéale](/journal/quelle-saison-mariage-var) peut vous aider.
- Choisissez un **secteur** du Var, puis visitez trois à cinq lieux. Utilisez les [filtres de l'annuaire](/#lieux) pour présélectionner selon vos critères.
- **Réservez le lieu** : c'est la réservation qui conditionne toutes les autres.
- Si vous faites appel à un **wedding planner**, c'est le moment de le choisir.

## De 12 à 9 mois avant

Une fois le lieu signé, réservez les prestataires les plus demandés :

- le **traiteur**, si le lieu ne l'impose pas ;
- le **photographe** et le **vidéaste** ;
- la **musique** : DJ, groupe, musiciens pour la cérémonie ;
- l'**officiant** de la cérémonie laïque si vous en voulez un ;
- des **blocs de chambres** pour les invités si le lieu ne loge pas tout le monde.

Envoyez un **save the date** à vos invités, surtout s'ils viennent de loin ou de l'étranger.

## De 9 à 6 mois avant

- Choisissez la **tenue** : les délais de fabrication et de retouches sont longs.
- Réservez le **fleuriste** et définissez la décoration.
- Créez un **site de mariage** avec les informations pratiques : accès, hébergements, programme du week-end.
- Organisez les **transports** : navettes depuis les gares, les aéroports ou les hôtels.
- Réservez la **mise en beauté**.

## De 6 à 3 mois avant

- Envoyez les **faire-part**, environ quatre à six mois avant.
- Faites la **dégustation** avec le traiteur et validez le menu.
- Choisissez les **alliances**.
- Prenez contact avec la **mairie** pour constituer le dossier du mariage civil.
- Préparez le déroulé de la **cérémonie laïque** avec l'officiant. Notre guide de [la cérémonie laïque](/journal/ceremonie-laique-provence) détaille les étapes.

## De 3 mois à 1 mois avant

- Relancez les invités qui n'ont pas répondu et **arrêtez la liste**.
- Faites l'**essai coiffure et maquillage**.
- Préparez le **plan de table** et la papeterie : menus, marque-places, livrets.
- Validez le **planning du jour J** avec le lieu et chaque prestataire.
- Déposez le **dossier à la mairie** dans les délais demandés : les bans sont publiés au moins dix jours avant le mariage.

## Le dernier mois

- Confirmez le **nombre définitif d'invités** au traiteur et au lieu.
- Envoyez à chaque prestataire le **planning détaillé** et les contacts utiles.
- Préparez les **règlements** prévus le jour J.
- Faites les **dernières retouches** de la tenue.
- Désignez une personne de confiance comme **contact des prestataires** le jour J.

## La dernière semaine

- Consultez la **météo** et décidez du plan B avec le lieu si nécessaire.
- Préparez un **kit de secours** : épingles, pansements, crème solaire, éventails.
- Déposez la **décoration** sur le lieu si c'est possible.
- Reposez-vous, hydratez-vous, et déléguez.

## Les spécificités d'un mariage dans le Var

- **En été**, renseignez-vous sur les règles de prévention des incendies : feux d'artifice et lanternes sont souvent interdits.
- **Sur le littoral en juillet et en août**, prévoyez des marges pour la circulation.
- **Dans les domaines viticoles**, vérifiez si votre date tombe pendant les vendanges.
- **Pour les invités venus de loin**, indiquez les gares (Toulon, Les Arcs-Draguignan) et les aéroports (Toulon-Hyères, Marseille, Nice) les plus proches du lieu.

Pour une vue d'ensemble, notre [guide complet](/journal/organiser-mariage-var-guide) reprend chaque étape en détail.
`,
    faq: [
      {
        q: 'Combien de temps faut-il pour organiser un mariage ?',
        a: "Comptez un an à dix-huit mois pour un mariage dans un lieu très demandé en haute saison. Un mariage plus simple, hors saison, peut s'organiser en six à neuf mois.",
      },
      {
        q: 'Quelle est la première chose à faire pour organiser son mariage ?',
        a: "Fixer le budget, une liste d'invités approximative et la période, puis réserver le lieu : toutes les autres réservations en dépendent.",
      },
      {
        q: 'Quand envoyer les faire-part ?',
        a: "Environ quatre à six mois avant, précédés d'un save the date neuf à douze mois avant si vos invités viennent de loin.",
      },
    ],
  },
  {
    slug: 'chateaux-viticoles-mariage-var',
    description: "Les domaines viticoles du Var qui accueillent des mariages : Berne, Sainte Roseline, Font du Broc, Mentone… Capacités, prix et conseils.",
    title: 'Les plus beaux châteaux viticoles pour un mariage dans le Var',
    seoTitle: 'Châteaux viticoles pour un mariage dans le Var',
    category: 'Lieux',
    date: '2026-08-28',
    updated: '2026-10-10',
    excerpt:
      "Chais voûtés, allées de platanes et vignes à perte de vue : les domaines viticoles varois sont des cadres naturels pour un mariage. Tour d'horizon des adresses qui accueillent des réceptions, et des points à vérifier.",
    image: photos.wineGrapes,
    imageAlt: 'Verre de vin et grappes de raisin',
    venues: [
      'chateau-de-berne',
      'chateau-sainte-roseline',
      'chateau-de-font-du-broc',
      'chateau-pimo',
      'chateau-mentone',
      'chateau-de-robernier',
      'chateau-maravenne',
      'domaine-souviou',
    ],
    body: `
Le vignoble fait partie de l'identité du Var. Se marier dans un domaine viticole, c'est profiter d'un cadre déjà mis en scène : rangs de vigne pour les photos, caves et salles voûtées pour le dîner, et des vins servis à quelques mètres de là où ils sont produits. Voici les domaines de notre sélection qui accueillent des mariages, secteur par secteur, et les questions à leur poser.

## Pourquoi choisir un domaine viticole

Le Var est le cœur de l'appellation Côtes de Provence, connue avant tout pour ses rosés. On y trouve aussi l'appellation Bandol, réputée pour ses rouges de mourvèdre, et les Coteaux varois en Provence, autour de Brignoles. Pour un mariage, un domaine viticole présente plusieurs atouts :

- **un décor naturel** qui change avec les saisons : vert tendre au printemps, chargé de raisins à la fin de l'été, doré à l'automne ;
- **des bâtiments de caractère** : chais, caves à barriques, bastides et cours d'honneur, qui offrent souvent une salle de repli de belle taille ;
- **les vins du domaine**, à faire goûter aux invités, qui simplifient le choix des boissons ;
- **des espaces vastes**, rarement entourés de voisins.

## En Dracénie, le cœur du vignoble

La [Dracénie](/secteurs/dracenie) réunit une grande partie des domaines viticoles ouverts aux mariages.

### Château de Berne, à Lorgues

Le [Château de Berne](/lieux/chateau-de-berne) est un domaine viticole certifié bio, membre de Relais & Châteaux. Son offre clé en main s'appuie sur un hôtel cinq étoiles de 34 chambres et des villas. Il accueille de 120 à 200 invités, avec une « Scène sur l'eau » perchée au-dessus d'un lac pour les cérémonies. C'est l'une des adresses les plus haut de gamme de notre sélection, avec des formules à partir de 19 500 €.

### Château Sainte Roseline, aux Arcs-sur-Argens

Cru Classé des Côtes de Provence, le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) se distingue par son cloître du XIIe siècle classé monument historique, sa grande allée de platanes et sa Salle des Barriques. Il reçoit de 30 à 400 invités, et sa Salle des Vendanges en accueille jusqu'à 250. Les salles se louent à partir de 1 000 €, et un forfait mariage existe à partir de 7 000 €.

### Château de Font du Broc, aux Arcs-sur-Argens

Domaine viticole doublé d'un haras, le [Château de Font du Broc](/lieux/chateau-de-font-du-broc) impressionne par ses jardins à la française, son cloître et sa salle équestre monumentale. C'est l'un des lieux les plus vastes du département : jusqu'à 650 invités assis. Il n'y a pas d'hébergement sur place, ce qui est à anticiper pour les invités.

### Château Pimõ, à Draguignan

À l'opposé, le [Château Pimõ](/lieux/chateau-pimo) mise sur l'intimité : jusqu'à 50 invités, logés dans des suites et des tentes nomades au milieu des vignes et des oliviers, pour une privatisation de trois jours.

## En Provence Verte, entre vignes et forêts

### Château Mentone, à Saint-Antonin-du-Var

Conduit en biodynamie, le [Château Mentone](/lieux/chateau-mentone) accueille les dîners dans sa Magnanerie et loge jusqu'à 54 personnes. Il reçoit de 60 à 250 invités, en location seule à partir de 4 000 € ou en forfaits par personne.

### Château de Robernier, à Montfort-sur-Argens

Avec ses tours du XVIe siècle au milieu des vignes, le [Château de Robernier](/lieux/chateau-de-robernier) a tout du château de conte de fées. Sa cour d'honneur et ses salons sont faits pour les grandes réceptions : de 100 à 300 invités en intérieur, et bien davantage en extérieur.

## Sur le littoral, la vigne face à la mer

À La Londe-les-Maures, le [Château Maravenne](/lieux/chateau-maravenne) combine vignoble bio et vue sur les îles d'Or. Son théâtre de verdure accueille les cérémonies laïques face à Porquerolles, et ses salles voûtées en pierre reçoivent jusqu'à 160 invités assis.

## Dans l'Ouest Var, l'oliveraie et la vigne

Au Beausset, sur les terres du Bandol, le [Domaine Souviou](/lieux/domaine-souviou) associe vignes et oliveraie de 7 000 arbres, dont certains millénaires. Son esplanade et son Pavillon du Moulin accueillent de 20 à 300 invités.

## Les points à vérifier avec un domaine viticole

### Les vendanges

Selon les années et les secteurs, les vendanges ont lieu entre la fin août et la fin septembre, parfois au début d'octobre. Pendant cette période, l'activité du domaine est intense : certains limitent les événements, d'autres en font un atout, avec des vignes chargées de raisin pour les photos. Posez la question dès la première prise de contact.

### Le traiteur et les vins

Beaucoup de domaines travaillent avec une liste de traiteurs référencés. Demandez aussi s'il faut servir les vins du domaine, à quel tarif, et s'il existe un droit de bouchon pour les autres boissons, par exemple le champagne.

### Les espaces de repli

Un mariage dans les vignes se passe dehors, mais le temps peut changer. Vérifiez que le chai ou la salle de réception peut accueillir tous vos invités assis.

### Une activité pour les invités

Proposez une visite de cave ou une dégustation le samedi après-midi ou le dimanche matin : c'est une activité appréciée des invités venus de loin, et un bon moyen de prolonger le week-end.

Pour comparer les budgets, consultez notre article sur [le prix d'un lieu de mariage dans le Var](/journal/prix-lieu-mariage-var).
`,
    faq: [
      {
        q: 'Quel est le prix d’un mariage dans un château viticole du Var ?',
        a: "Dans notre sélection, les locations de salle commencent autour de 1 000 €, les forfaits mariage autour de 7 000 €, et les offres haut de gamme avec hôtel dépassent 19 000 €. Le traiteur et l'hébergement s'ajoutent selon les formules.",
      },
      {
        q: 'Peut-on se marier dans un domaine viticole pendant les vendanges ?',
        a: "Oui, mais certains domaines limitent les événements entre fin août et fin septembre. Posez la question dès le premier contact.",
      },
      {
        q: 'Est-on obligé de servir les vins du domaine ?',
        a: "Cela dépend du domaine. Beaucoup le demandent ou le recommandent ; renseignez-vous aussi sur le droit de bouchon pour les autres boissons.",
      },
      {
        q: 'Quel domaine viticole du Var peut accueillir un grand mariage ?',
        a: "Le [Château de Font du Broc](/lieux/chateau-de-font-du-broc) (jusqu'à 650 invités assis), le [Château Sainte Roseline](/lieux/chateau-sainte-roseline) (jusqu'à 400) et le [Château de Robernier](/lieux/chateau-de-robernier) (jusqu'à 300 en intérieur) sont les plus grands de notre sélection.",
      },
    ],
  },
  {
    slug: 'mariage-bord-de-mer-var',
    description: "Se marier face à la mer dans le Var : villa, château ou domaine viticole. Capacités, prix et contraintes à anticiper (vent, chaleur, plage).",
    title: 'Mariage en bord de mer dans le Var : villa, château ou domaine ?',
    seoTitle: 'Mariage en bord de mer dans le Var : les lieux',
    category: 'Inspiration',
    date: '2026-08-15',
    updated: '2026-10-10',
    excerpt:
      "Du Pradet à La Londe-les-Maures, le littoral varois offre des lieux de réception face à la Méditerranée. Villa Belle Époque, château dominant la rade ou domaine viticole : comment choisir, et les contraintes à anticiper.",
    image: photos.coastVillage,
    imageAlt: 'Vue sur la mer Méditerranée depuis une terrasse',
    venues: ['domaine-rocabella', 'les-pins-penches', 'chateau-maravenne'],
    body: `
Une cérémonie face à la mer, un cocktail au coucher du soleil, un dîner sous les pins : le mariage en bord de mer fait rêver. Sur le littoral varois, les lieux qui le permettent sont recherchés et peu nombreux. Voici les trois grandes familles de lieux, les adresses de notre sélection et les points à anticiper.

## Le littoral varois en quelques mots

Le Var compte plus de 400 kilomètres de côtes, îles comprises. De Bandol à Saint-Raphaël, on y trouve des criques, des caps, la rade de Toulon, la presqu'île de Giens et, au large, les îles d'Or : Porquerolles, Port-Cros et le Levant. Les lieux de réception de notre sélection se trouvent autour de [Toulon](/secteurs/toulon) et sur le [littoral](/secteurs/littoral) de La Londe-les-Maures.

## La villa face à la mer

Au Pradet, le [Domaine Rocabella](/lieux/domaine-rocabella) est une villa Belle Époque avec piscines, jardins et accès à des criques privées. Son offre inclut l'hébergement des proches, avec environ 86 couchages : c'est le choix d'un mariage-séjour de plusieurs jours, pour 150 invités au maximum. Le budget est en conséquence, à partir d'environ 37 000 € avec deux nuits pour 32 personnes.

**Pour qui ?** Les couples qui veulent réunir leurs proches tout un week-end, dans un cadre privatisé, sans gérer de transport entre le lieu et les hôtels.

## Le château qui domine la rade

À Toulon, [Les Pins Penchés](/lieux/les-pins-penches) sont un château du XVIIe siècle entouré d'un parc de palmiers qui descend vers la mer. Le lieu reçoit jusqu'à 400 invités assis et propose des menus à partir de 70 € par personne, les frais de location étant établis sur devis. Il n'y a pas d'hébergement sur place, mais la ville offre de nombreux hôtels.

**Pour qui ?** Les grands mariages, qui ont besoin d'espace et d'une restauration intégrée, avec une vue spectaculaire sur la rade.

## Le domaine viticole avec vue

Pour un compromis entre l'esprit provençal et l'horizon marin, le [Château Maravenne](/lieux/chateau-maravenne), à La Londe-les-Maures, propose un théâtre de verdure avec vue sur Porquerolles et des salles voûtées pour le dîner. Il reçoit jusqu'à 160 invités assis, 250 en extérieur, et loge 29 personnes en chambres d'hôtes et gîtes.

**Pour qui ?** Les couples qui veulent la mer en toile de fond sans renoncer aux vignes et à la pierre.

## Peut-on se marier sur la plage ?

Une cérémonie laïque sur une plage publique est tentante, mais le rivage relève du domaine public maritime : il faut une autorisation de la commune, rarement accordée en été, quand les plages sont très fréquentées. La solution la plus simple reste un lieu privé avec vue sur la mer, complété par une séance photo sur la plage avant ou après la cérémonie.

## Les points à anticiper en bord de mer

### Le vent

Le littoral est exposé au vent, notamment au mistral dans l'ouest du département. Prévoyez des décorations lestées, des voiles d'ombrage bien fixées et, surtout, un plan B abrité pour la cérémonie et le cocktail.

### La chaleur et le soleil

En plein été, le soleil reste fort jusqu'en fin d'après-midi. Placez la cérémonie en fin de journée, prévoyez de l'ombre et de l'eau pour les invités, et pensez aux éventails.

### La circulation

Les routes du littoral sont très chargées en juillet et en août, surtout le week-end. Anticipez les horaires d'arrivée des invités et réservez des navettes si les hôtels sont éloignés.

### Les feux d'artifice et les lanternes

En été, la prévention des incendies de forêt encadre strictement l'usage du feu dans le Var. Feux d'artifice et lanternes célestes sont souvent interdits ou soumis à autorisation : renseignez-vous auprès du lieu et de la mairie avant de les prévoir.

### Les photos au coucher du soleil

Le coucher de soleil sur la mer est un moment fort. Selon l'orientation du lieu, le soleil se couchera sur la mer ou derrière les collines : demandez-le lors de la visite et calez la séance photo de couple en conséquence. Notre page [photographes](/prestataires/photographes) donne d'autres conseils pour les photos.
`,
    faq: [
      {
        q: 'Combien coûte un mariage en bord de mer dans le Var ?',
        a: "Dans notre sélection, comptez des menus à partir de 70 € par personne aux [Pins Penchés](/lieux/les-pins-penches), une location à partir de 4 300 € au [Château Maravenne](/lieux/chateau-maravenne), et à partir d'environ 37 000 € pour une privatisation avec séjour au [Domaine Rocabella](/lieux/domaine-rocabella).",
      },
      {
        q: 'Peut-on faire une cérémonie laïque sur une plage du Var ?',
        a: "Sur une plage publique, il faut une autorisation de la commune, rarement accordée en été. Un lieu privé avec vue sur la mer est plus simple.",
      },
      {
        q: 'Quel lieu en bord de mer pour un grand mariage dans le Var ?',
        a: "[Les Pins Penchés](/lieux/les-pins-penches), à Toulon, accueillent jusqu'à 400 invités assis face à la rade.",
      },
    ],
  },
  {
    slug: 'quelle-saison-mariage-var',
    description: "Printemps, été, automne ou hiver : mois par mois, les avantages et les contraintes pour choisir la date de son mariage dans le Var.",
    title: 'Quelle saison choisir pour se marier dans le Var ?',
    category: 'Organisation',
    date: '2026-08-02',
    updated: '2026-10-10',
    excerpt:
      "Mai, juin et septembre offrent souvent la plus belle lumière et des températures agréables, l'été promet des soirées chaudes, l'automne des tarifs plus doux. Mois par mois, ce qu'il faut savoir avant de fixer la date.",
    image: photos.coupleRoad,
    imageAlt: 'Couple de mariés marchant sur une route de campagne',
    venues: ['chateau-de-nans', 'domaine-de-la-rotonde', 'bastide-de-montferrat', 'chateau-maravenne'],
    body: `
Le choix de la date conditionne presque tout le reste : la disponibilité des lieux, les tarifs, la tenue des invités, la lumière des photos et même le menu. Dans le Var, où le climat permet de se marier dehors une grande partie de l'année, chaque saison a ses atouts et ses contraintes.

## Le printemps : avril et mai

Le printemps est la saison des jardins en fleurs et de la végétation encore verte. Les journées s'allongent et les températures deviennent agréables, mais les soirées restent fraîches, surtout dans l'arrière-pays : prévoyez un dîner en intérieur ou sous une tente, et des plaids pour le cocktail.

Avril reste une période plus calme pour les lieux de réception, avec davantage de disponibilités. Mai est déjà très demandé, notamment autour des ponts.

## Le début de l'été : juin

Juin est souvent considéré comme le mois idéal : longues journées, soleil qui se couche après 21 h, températures chaudes mais rarement écrasantes, végétation encore belle. La lavande commence à fleurir dans l'arrière-pays. C'est aussi l'un des mois les plus demandés : réservez votre lieu tôt.

## Le cœur de l'été : juillet et août

Les soirées sont chaudes et les nuits douces, idéales pour danser dehors jusqu'au bout de la nuit. En revanche, la chaleur de l'après-midi peut être éprouvante pour les invités, surtout lors d'une cérémonie en plein soleil. Quelques conseils :

- placez la cérémonie en fin de journée, vers 17 h ou 18 h, à l'ombre des platanes ou des pins ;
- prévoyez de l'eau, de l'ombre et des éventails pour les invités ;
- adaptez le menu à la chaleur, avec des plats frais au cocktail ;
- choisissez des tenues légères pour le cortège.

Les lieux du [Haut-Var](/secteurs/haut-var) ou du massif de la [Sainte-Baume](/secteurs/sainte-baume), plus en altitude ou en forêt, offrent souvent davantage de fraîcheur le soir. Sur le littoral, la circulation est dense : anticipez les trajets des invités.

> Bon à savoir : en été, la prévention des incendies encadre strictement l'usage du feu dans le Var. Feux d'artifice et lanternes célestes sont souvent interdits ou soumis à autorisation. Renseignez-vous auprès du lieu et de la mairie.

## La fin de l'été : septembre

Septembre est le meilleur compromis pour beaucoup de couples : la mer est encore chaude, la lumière plus rasante et dorée, les températures plus clémentes qu'en août, et les routes plus calmes. Dans les domaines viticoles, c'est la période des vendanges : un décor superbe, mais une activité intense. Demandez au domaine s'il accueille des mariages à ce moment-là. Notre sélection de [châteaux viticoles](/journal/chateaux-viticoles-mariage-var) vous aidera à choisir.

## L'automne : octobre

En octobre, les vignes prennent leurs couleurs d'automne et la lumière est très belle pour les photos. Le soleil se couche plus tôt, vers 19 h en début de mois : prévoyez un dîner en intérieur ou sous une tente chauffée. Les tarifs sont souvent plus doux qu'en haute saison, et les disponibilités plus nombreuses.

## L'hiver : de novembre à mars

Peu de lieux restent ouverts aux mariages en hiver, mais ceux qui le font proposent souvent des tarifs avantageux. Un château avec de belles salles et des cheminées se prête parfaitement à un mariage d'hiver en petit comité. Les journées sont courtes : organisez la cérémonie en début d'après-midi pour profiter de la lumière.

## Samedi, vendredi ou dimanche ?

Le samedi reste le jour le plus demandé, et souvent le plus cher. Un vendredi ou un dimanche permet de trouver plus facilement une date dans un lieu très demandé, parfois à un tarif réduit, comme au [Château de Nans](/lieux/chateau-de-nans) dont les tarifs varient selon le jour. En contrepartie, certains invités devront poser un jour de congé.

## Comment choisir sa date

Pour fixer la date, procédez dans cet ordre :

- listez les périodes possibles pour vous et vos proches les plus importants ;
- vérifiez les jours fériés, les ponts et les vacances scolaires, qui font monter le prix des transports ;
- interrogez plusieurs lieux sur leurs disponibilités à ces dates ;
- confirmez avec la mairie pour le mariage civil ;
- réservez le lieu, puis les prestataires clés.

Notre [rétroplanning](/journal/retroplanning-mariage) détaille la suite, étape par étape.
`,
    faq: [
      {
        q: 'Quel est le meilleur mois pour se marier dans le Var ?',
        a: "Juin et septembre sont souvent considérés comme les meilleurs compromis : belle lumière, températures agréables et journées longues. Ce sont aussi les mois les plus demandés.",
      },
      {
        q: 'Fait-il trop chaud pour se marier dans le Var en juillet et en août ?',
        a: "L'après-midi peut être très chaud. Placez la cérémonie en fin de journée, à l'ombre, et privilégiez un lieu en altitude, en forêt ou proche de la mer.",
      },
      {
        q: 'Se marier hors saison dans le Var coûte-t-il moins cher ?',
        a: "Souvent, oui. En avril, en octobre ou en hiver, les lieux ont plus de disponibilités et proposent fréquemment des tarifs plus doux, tout comme le vendredi et le dimanche.",
      },
    ],
  },
  {
    slug: 'attirer-couples-lieu-reception-mariage',
    description:
      "Château, domaine ou bastide dans le Var : ce que les couples regardent avant de vous contacter, et comment remplir votre agenda de mariages.",
    title: 'Lieux de réception : comment attirer plus de couples pour vos mariages',
    seoTitle: 'Attirer plus de mariages dans son lieu de réception',
    category: 'Professionnels',
    date: '2026-10-10',
    updated: '2026-10-12',
    excerpt:
      "Les couples comparent des dizaines de lieux en ligne avant d'en visiter trois ou quatre. Pour un château, un domaine ou une bastide du Var, tout se joue avant le premier appel : voici ce qu'ils regardent, et comment y répondre.",
    image: photos.chandelierHall,
    imageAlt: 'Salle de réception dressée pour un mariage',
    venues: [],
    body: `
Les couples qui préparent leur mariage comparent souvent des dizaines de lieux en ligne avant d'en visiter trois ou quatre. Pour un château, un domaine viticole ou une bastide du Var, être trouvé puis retenu se joue en grande partie avant le premier appel. Ce guide s'adresse aux propriétaires et gérants de lieux de réception : ce que les couples regardent, et comment y répondre.

## Ce que les couples regardent en premier

Quand ils comparent des lieux, les couples cherchent d'abord à savoir si le lieu peut les accueillir. Quatre informations reviennent systématiquement :

- **la capacité**, assise, en intérieur et en extérieur ;
- **le budget**, au moins un prix de départ ;
- **l'hébergement** sur place, et pour combien de personnes ;
- **la localisation** et l'accès depuis les gares et les aéroports.

Quand ces informations manquent, beaucoup de couples passent au lieu suivant plutôt que de prendre le temps d'appeler.

## Afficher un prix de départ

Un tarif « sur devis » sans aucun repère inquiète les couples, qui craignent de perdre du temps avec un lieu hors budget. Un prix de départ, même large, rassure et attire des demandes déjà qualifiées. Précisez ce qu'il comprend : location seule, salle vide ou équipée, forfait par personne, nuits incluses.

> Sur notre annuaire, quand un couple indique son budget, seuls les lieux qui affichent un prix de départ apparaissent dans les résultats.

## Préciser la capacité de repli

« Jusqu'à 300 invités » ne suffit pas. Les couples veulent savoir combien de personnes peuvent dîner assises à l'intérieur en cas de pluie ou de mistral. Donnez les deux chiffres, extérieur et intérieur : c'est souvent la question qui décide d'une visite.

## Mettre en avant l'hébergement

Dans le Var, beaucoup de lieux sont isolés : l'hébergement sur place est un argument fort. Indiquez le nombre de couchages, les nuits incluses ou imposées et le prix. Les couples qui veulent un mariage sur tout un week-end filtrent souvent sur ce critère.

## Des photos qui montrent les espaces

Les photos doivent permettre d'imaginer la journée, pas seulement d'admirer la façade :

- l'espace de cérémonie, avec des chaises installées ;
- la salle de dîner dressée, et la salle de repli ;
- le lieu du cocktail au coucher du soleil ;
- les chambres, si vous logez des invités ;
- de vrais mariages, avec l'accord des couples et le crédit du photographe.

## Raconter ce qui vous distingue

Chaque lieu a un atout que les autres n'ont pas : un cloître, une oliveraie centenaire, une scène au bord de l'eau, une vue sur les îles d'Or. Mettez-le en avant dès la première ligne de votre présentation. C'est ce qui fait qu'un couple se souvient de votre lieu parmi tous ceux qu'il a vus.

## Répondre vite

Les couples contactent plusieurs lieux en même temps. Répondre dans la journée, avec une brochure claire (tarifs, capacités, prestataires référencés, conditions de réservation, dates disponibles), donne un avantage décisif. Proposez rapidement une date de visite.

## Être présent là où les couples cherchent

- **Votre site internet** : une page mariage claire, rapide et lisible sur téléphone, avec les informations clés et un contact visible. Notre guide du [site internet d'un lieu de réception](/journal/site-internet-lieu-reception-mariage) détaille les pages indispensables.
- **Votre fiche Google** : photos à jour, horaires de visite, réponses aux avis.
- **Les annuaires spécialisés** : chacun est une porte d'entrée de plus vers votre lieu. [Référencez votre lieu sur L'Édition](/referencer-mon-lieu), l'annuaire consacré aux mariages dans le Var.
- **Les avis des couples** : demandez-les après chaque mariage, ils pèsent lourd dans la décision des suivants.

## Mesurer d'où viennent vos demandes

Demandez à chaque couple comment il vous a trouvé, et notez-le. Au bout d'une saison, vous saurez quels canaux vous apportent des mariages et lesquels ne vous coûtent que du temps. Sur notre annuaire, nous mesurons les visiteurs de votre fiche et les demandes de coordonnées : vous retrouvez ces chiffres dans votre espace professionnel.
`,
    faq: [
      {
        q: 'Comment référencer mon lieu de mariage dans le Var ?',
        a: "Remplissez le formulaire de la page [Référencer mon lieu](/referencer-mon-lieu) : nous vous recontactons pour compléter la fiche, puis elle est publiée dans l'annuaire et sur la page de votre secteur.",
      },
      {
        q: 'Faut-il afficher ses prix sur un annuaire de lieux de mariage ?',
        a: "Un prix de départ, même indicatif, rassure les couples et vous apporte des demandes adaptées à votre offre. Sans prix, votre lieu n'apparaît pas quand un couple filtre par budget.",
      },
      {
        q: 'Quelles photos publier pour attirer des couples ?',
        a: "Des photos des espaces installés (cérémonie, dîner, salle de repli, chambres) et de vrais mariages, avec l'accord des couples et le crédit du photographe.",
      },
    ],
  },
  {
    slug: 'site-internet-lieu-reception-mariage',
    description:
      "Château, domaine ou bastide : les pages, les informations et les réglages qui font du site de votre lieu de réception une source de demandes de mariage.",
    title: 'Site internet d’un lieu de réception : ce que les couples doivent y trouver',
    seoTitle: 'Site internet de lieu de réception : le guide',
    category: 'Professionnels',
    date: '2026-10-12',
    excerpt:
      "Un annuaire fait découvrir votre lieu ; votre site doit convaincre. Les pages indispensables, les informations que les couples cherchent et les réglages qui comptent pour Google, pour un château, un domaine ou une bastide.",
    image: photos.villaArches,
    imageAlt: 'Arcades d’une villa provençale ouvertes sur un jardin',
    venues: [],
    mentions: [{ name: 'Site-Château.fr', url: 'https://site-chateau.fr/' }],
    body: `
Un annuaire comme L'Édition fait découvrir votre lieu à des couples qui ne le connaissaient pas. Mais avant de vous écrire ou de vous appeler, la plupart iront voir votre site internet : c'est là qu'ils vérifient que le lieu leur ressemble, qu'il peut les accueillir et qu'il entre dans leur budget. Ce guide s'adresse aux propriétaires et gérants de châteaux, de domaines et de bastides : ce que votre site doit contenir pour transformer ces visites en demandes de mariage.

## Une page consacrée aux mariages

Beaucoup de domaines présentent sur une même page le vin, les gîtes, les séminaires et les mariages. Les couples s'y perdent. Une page dédiée au mariage, accessible dès le menu, permet de répondre directement à leurs questions et de se positionner sur les recherches comme « lieu de mariage » suivi du nom de votre commune.

Elle doit reprendre les informations que les couples comparent d'un lieu à l'autre :

- **la capacité**, assise et debout, en intérieur et en extérieur ;
- **un prix de départ**, et ce qu'il comprend ;
- **l'hébergement** sur place, avec le nombre de couchages ;
- **les espaces** : cérémonie, cocktail, dîner, salle de repli ;
- **l'accès** depuis les gares et les aéroports les plus proches.

## Les pages indispensables

Au-delà de la page mariage, un site de lieu de réception tient en quelques pages bien construites : l'accueil, les espaces et leurs capacités, l'hébergement, une galerie de photos de vrais mariages, l'accès, et une page de contact avec un formulaire de demande. Si vous accueillez aussi des séminaires ou des touristes, donnez à chaque activité sa propre page plutôt que de tout mélanger. Notre studio partenaire Site-Château.fr détaille [les pages indispensables d'un site de château](https://site-chateau.fr/guides/7-pages-indispensables-site-chateau), et comment organiser [un site pour un domaine à plusieurs activités](https://site-chateau.fr/guides/site-internet-domaine-multi-activites-mariages-seminaires-gites).

## Un formulaire de demande qui qualifie

Un simple « Contactez-nous » vous apporte des messages incomplets, et autant d'échanges pour obtenir la date et le nombre d'invités. Demandez directement ce dont vous avez besoin pour répondre :

- la date souhaitée, ou au moins la saison et l'année ;
- le nombre d'invités ;
- le type de réception : cérémonie sur place, dîner, week-end complet ;
- un budget indicatif, si vous le souhaitez.

Vous gagnez du temps, et le couple reçoit plus vite une réponse précise. C'est le même principe que sur L'Édition, où les couples indiquent leur date et leur nombre d'invités avant d'obtenir vos coordonnées.

## Pensé pour le téléphone

Les couples découvrent souvent un lieu sur leur téléphone, sur Instagram, dans les résultats de Google ou depuis un annuaire. Le site doit s'afficher vite, avec des photos légères, un menu simple et un bouton d'appel ou de demande toujours visible. Testez-le vous-même sur un téléphone, en 4G, comme le ferait un couple dans le train.

## Être trouvé sur Google

Quelques réglages font une grande différence pour un lieu de réception :

- un titre de page qui dit ce que vous êtes et où : « Château de… : lieu de mariage à… » ;
- un texte qui nomme votre commune, votre secteur et le type de lieu ;
- une fiche Google à jour, avec le même nom, la même adresse et le même téléphone que sur le site ;
- des photos nommées et décrites, plutôt que « IMG_0412.jpg » ;
- des liens depuis les annuaires et les sites qui parlent de vous.

> Sur votre fiche L'Édition, renseignez l'adresse de votre site : les couples y accèdent directement depuis vos coordonnées. Et ajoutez sur votre site un lien vers votre fiche : les deux se renforcent.

## Des photos et des disponibilités à jour

Une galerie de vrais mariages, avec l'accord des couples et le crédit du photographe, convainc davantage que des photos du lieu vide. Ajoutez les espaces installés, la salle de repli et les chambres. Si vous le pouvez, affichez vos dates déjà réservées pour la saison : les couples savent tout de suite si leur date est libre, et vous évitez les demandes inutiles.

## Combien coûte un site de lieu de réception ?

Tout dépend de ce que vous attendez : un site vitrine de quelques pages, un calendrier de disponibilités, une billetterie pour les visites, des pages en anglais pour les couples étrangers. Pour vous faire une idée, consultez ce guide sur [le coût d'un site internet de château ou de domaine](https://site-chateau.fr/guides/combien-coute-site-internet-chateau-domaine) et les [formules de création de site pour château et domaine](https://site-chateau.fr/tarifs) de notre studio partenaire.

> Votre lieu n'a pas encore de site, ou il a vieilli ? [Site-Château.fr](https://site-chateau.fr/) conçoit des sites pour les châteaux, domaines et lieux de réception. Un exemple dans le Var : [le site du Château de la Présidente](https://site-chateau.fr/realisations/chateau-de-la-presidente).

## Et ensuite

Un site ne suffit pas s'il n'est pas vu. Multipliez les portes d'entrée : votre fiche Google, Instagram, et les annuaires spécialisés. [Référencez votre lieu sur L'Édition](/referencer-mon-lieu) : la fiche est gratuite pendant le lancement, et vous suivez dans votre espace le nombre de couples qui la consultent et demandent vos coordonnées. Pour le reste, nos [conseils pour attirer plus de couples](/journal/attirer-couples-lieu-reception-mariage) complètent ce guide.
`,
    faq: [
      {
        q: 'Un lieu de réception a-t-il besoin de son propre site internet ?',
        a: "Oui. Les annuaires font découvrir votre lieu, mais la plupart des couples consultent ensuite votre site pour vérifier les espaces, la capacité et les prix avant de vous contacter. C'est aussi votre principale chance d'apparaître sur Google pour le nom de votre commune.",
      },
      {
        q: 'Quelles informations mettre sur le site d’un lieu de mariage ?',
        a: "La capacité en intérieur et en extérieur, un prix de départ et ce qu'il comprend, l'hébergement, les espaces de cérémonie, de cocktail et de dîner, l'accès, des photos de vrais mariages et un formulaire de demande qui demande la date et le nombre d'invités.",
      },
      {
        q: 'Qui peut créer le site de mon château ou de mon domaine ?',
        a: "Une agence spécialisée connaît les attentes des couples et les réglages qui comptent pour Google. Notre studio partenaire [Site-Château.fr](https://site-chateau.fr/) conçoit des sites pour les châteaux, domaines et lieux de réception.",
      },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Articles to suggest after one: newest first, the current one excluded, only those available in the content language. */
export function relatedArticles(slug: string, count = 3): Article[] {
  const english = contentLang() === 'en';
  return articles
    .filter((a) => a.slug !== slug && (!english || articleSlugsEn[a.slug] !== undefined))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(contentLang() === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
