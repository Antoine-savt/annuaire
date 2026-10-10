import { VendorCategory } from './types';
import { photos } from './images';

/** Wedding vendor categories, in menu order. */
export const vendorCategories: VendorCategory[] = [
  {
    slug: 'photographes',
    name: 'Photographes',
    title: 'Photographe de mariage dans le Var',
    pro: 'photographe de mariage',
    menuDesc: 'Le reportage photo du jour J',
    description:
      'Bien choisir son photographe de mariage dans le Var : styles, lumière du Sud, questions à poser et contrat. Nos conseils et notre studio partenaire.',
    intro:
      "Les photos sont ce qui reste du mariage. Dans le Var, la lumière est un atout, à condition de savoir l'apprivoiser. Voici comment choisir le photographe qui racontera votre journée.",
    bookAhead: '12 à 18 mois avant',
    image: photos.brideVeil,
    imageAlt: 'Mariée sous un voile en plein air',
    body: `
## Choisir un style

Reportage documentaire, approche Fine Art, portraits posés : chaque photographe a sa manière de raconter un mariage. Demandez à voir des galeries de mariages complets, et pas seulement une sélection des meilleures images. C'est la seule façon de juger sa régularité sur toute une journée, des préparatifs à la soirée dansante.

## Apprivoiser la lumière du Sud

En plein été, la lumière de midi est dure et crée des ombres marquées sur les visages. Les plus belles images se font souvent en fin de journée : calez la séance photo de couple pendant l'heure qui précède le coucher du soleil. Un photographe habitué à la région saura aussi où placer la cérémonie pour éviter le contre-jour. Notre article sur [la saison idéale](/journal/quelle-saison-mariage-var) donne des repères mois par mois.

## Connaître le lieu

Un photographe qui connaît déjà votre lieu saura où réaliser les portraits et comment exploiter la salle de repli en cas de mauvais temps. Sinon, prévoyez un repérage ensemble, ou envoyez-lui des photos du lieu prises à l'heure de la cérémonie. Pour trouver votre lieu, consultez [notre annuaire](/#lieux).

## Les questions à poser

- Combien d'heures de présence sont prévues, et à quel tarif pour une heure supplémentaire ?
- Combien de photos seront livrées, sous quel format et dans quel délai ?
- Un second photographe est-il inclus ou proposé en option ?
- Les frais de déplacement sont-ils compris ?
- Qu'est-il prévu en cas d'empêchement le jour J ?
- Quels droits d'utilisation des photos prévoit le contrat ?

## Préparer le jour J

Transmettez au photographe le planning de la journée, la liste des photos de groupe souhaitées et le nom d'une personne qui l'aidera à rassembler les invités. Prévoyez-lui un repas et une place pendant le dîner. Et si vous avez aussi un vidéaste, organisez un échange entre eux avant le mariage : voir notre page [vidéastes](/prestataires/videastes).
`,
    faq: [
      {
        q: 'Quand réserver son photographe de mariage ?',
        a: "Douze à dix-huit mois avant pour un samedi de haute saison : les photographes les plus demandés sont réservés tôt, souvent juste après le lieu.",
      },
      {
        q: 'Combien d’heures de reportage prévoir ?',
        a: "Pour couvrir les préparatifs, la cérémonie, le cocktail et le début de soirée, comptez une journée complète. Une formule plus courte peut se concentrer sur la cérémonie et le cocktail.",
      },
      {
        q: 'À quelle heure faire la séance photo de couple dans le Var ?',
        a: "Pendant l'heure qui précède le coucher du soleil, quand la lumière est douce et dorée.",
      },
    ],
  },
  {
    slug: 'videastes',
    name: 'Vidéastes',
    title: 'Vidéaste de mariage dans le Var',
    pro: 'vidéaste de mariage',
    menuDesc: 'Le film et le teaser du mariage',
    description:
      'Choisir son vidéaste de mariage dans le Var : film, teaser, prise de son, drone et livraison. Les questions à poser avant de réserver.',
    intro:
      "Un film de mariage capte ce que les photos ne montrent pas : les voix, les discours, les rires, la musique de la soirée. Voici comment choisir le vidéaste qui le réalisera.",
    bookAhead: '9 à 12 mois avant',
    image: photos.coupleNight,
    imageAlt: 'Couple de mariés dans une lumière tamisée',
    body: `
## Teaser, film court ou film complet

La plupart des vidéastes proposent un teaser de quelques minutes et un film plus long, parfois accompagnés de la cérémonie et des discours en intégralité. Demandez à voir au moins un film complet, pas seulement des bandes-annonces : c'est le meilleur moyen de juger le montage et le rythme.

## Le son, souvent oublié

Les vœux, les discours et les lectures font la valeur d'un film de mariage. Demandez comment le vidéaste enregistre le son pendant une cérémonie en extérieur : micros-cravates, enregistreur relié à la sonorisation, micro d'ambiance. Coordonnez-le avec le DJ ou les musiciens.

## Les images aériennes

Les vues de drone mettent en valeur les domaines et les paysages du Var. Vérifiez que le pilote est formé et assuré, qu'il respecte la réglementation, qui interdit ou limite les vols dans certaines zones, notamment près des aéroports et des sites militaires, et que le lieu donne son accord.

## Photographe et vidéaste : bien les associer

Photographe et vidéaste se partagent les mêmes moments clés. S'ils ont l'habitude de travailler ensemble, ils se gêneront moins. Sinon, organisez un échange avant le mariage pour répartir les placements pendant la cérémonie. Voir aussi notre page [photographes](/prestataires/photographes).

## Les questions à poser

- Quelle est la durée de présence, et que contient la livraison : teaser, film, cérémonie complète ?
- Quel est le délai de livraison ?
- La musique utilisée dans le film est-elle sous licence ?
- Les images brutes sont-elles conservées, et combien de temps ?
`,
    faq: [
      {
        q: 'Quand réserver son vidéaste de mariage ?',
        a: "Neuf à douze mois avant, idéalement après le lieu et le photographe, pour vérifier qu'ils peuvent travailler ensemble.",
      },
      {
        q: 'Faut-il un photographe et un vidéaste ?',
        a: "Ce sont deux métiers différents. Si votre budget le permet, ils se complètent : les photos pour l'album, le film pour les voix et l'ambiance.",
      },
      {
        q: 'Peut-on filmer un mariage au drone dans le Var ?',
        a: "Oui, si le pilote respecte la réglementation et si le lieu l'autorise. Les vols sont interdits ou restreints dans certaines zones, notamment près des aéroports et des sites militaires.",
      },
    ],
  },
  {
    slug: 'wedding-planners',
    name: 'Wedding planners',
    title: 'Wedding planner dans le Var',
    pro: 'wedding planner',
    menuDesc: "L'organisation et la coordination",
    description:
      "Wedding planner dans le Var : organisation complète, partielle ou coordination du jour J. Comment choisir la bonne formule et quelles questions poser.",
    intro:
      "Un wedding planner fait gagner un temps précieux, surtout si vous organisez votre mariage dans le Var en habitant loin. Encore faut-il choisir la bonne formule.",
    bookAhead: '12 à 18 mois avant',
    image: photos.planning,
    imageAlt: "Préparation d'un mariage avec carnet et ordinateur",
    body: `
## Trois niveaux d'accompagnement

- **L'organisation complète** : le wedding planner vous accompagne de la recherche du lieu au jour J, sélectionne les prestataires et suit le budget.
- **L'organisation partielle** : vous avez déjà le lieu et quelques prestataires, il complète et coordonne le reste.
- **La coordination du jour J** : il reprend votre organisation quelques semaines avant et dirige la journée pour que vous en profitiez.

## Pourquoi c'est utile dans le Var

Beaucoup de couples qui se marient dans le Var n'y habitent pas. Un wedding planner local connaît les lieux, les prestataires, les distances réelles entre domaines et hôtels, et les contraintes de la région : chaleur, vent, circulation estivale, règles de prévention des incendies. Il peut visiter les lieux à votre place et vous présenter une sélection adaptée.

## Comment il est rémunéré

Selon les professionnels, la rémunération prend la forme d'un forfait ou d'un pourcentage du budget du mariage. Demandez un devis détaillé, et vérifiez s'il perçoit des commissions de la part des prestataires qu'il recommande.

## Les questions à poser

- Combien de mariages organisez-vous par an, et combien le même week-end ?
- Serez-vous présent en personne le jour J, et jusqu'à quelle heure ?
- Avec quels lieux et quels prestataires du Var avez-vous l'habitude de travailler ?
- Comment suivez-vous le budget, et à quelle fréquence faites-vous le point ?

Pour présélectionner les lieux avec lui, utilisez [notre annuaire](/#lieux) et notre [guide complet](/journal/organiser-mariage-var-guide).
`,
    faq: [
      {
        q: 'Quelle différence entre wedding planner et coordinateur du jour J ?',
        a: "Le wedding planner organise tout ou partie du mariage pendant des mois. Le coordinateur reprend votre organisation à quelques semaines de la date et dirige le déroulé du jour J.",
      },
      {
        q: 'Quand réserver un wedding planner ?',
        a: "Le plus tôt possible pour une organisation complète, idéalement avant de choisir le lieu, soit douze à dix-huit mois avant.",
      },
      {
        q: 'Un wedding planner est-il utile si l’on habite loin du Var ?',
        a: "C'est souvent là qu'il est le plus utile : il visite les lieux, rencontre les prestataires et règle les détails sur place à votre place.",
      },
    ],
  },
  {
    slug: 'traiteurs',
    name: 'Traiteurs',
    title: 'Traiteur de mariage dans le Var',
    pro: 'traiteur',
    menuDesc: 'Le cocktail, le dîner et le service',
    description:
      'Choisir son traiteur de mariage dans le Var : traiteur imposé ou libre, contenu du devis, dégustation, chaleur et droit de bouchon. Nos conseils.',
    intro:
      "Le repas est l'un des moments que vos invités retiendront, et souvent le premier poste de dépense de la réception. Voici comment choisir son traiteur de mariage dans le Var.",
    bookAhead: '12 mois avant',
    image: photos.catering,
    imageAlt: 'Buffet de traiteur dressé pour une réception',
    body: `
## Traiteur imposé, référencé ou libre

Avant toute chose, demandez à votre lieu sa politique : certains domaines imposent leur traiteur, d'autres proposent une liste de traiteurs référencés, d'autres laissent le choix libre. Cette information change tout, et se vérifie avant de signer avec le lieu.

## Ce que comprend un devis

Un devis de traiteur couvre généralement le cocktail, le dîner, le dessert et le service. Vérifiez ce qui est inclus ou non :

- le personnel de service et le nombre de serveurs ;
- la vaisselle, la verrerie et le nappage ;
- les boissons, ou le droit de bouchon si vous apportez vos vins ;
- le repas des prestataires ;
- le brunch du lendemain ;
- les heures supplémentaires au-delà de l'horaire prévu.

Notre article sur [le prix d'un lieu de mariage](/journal/prix-lieu-mariage-var) détaille les autres frais à anticiper.

## La chaleur, une contrainte du Sud

En été, la chaleur impose une vigilance particulière sur la chaîne du froid, surtout pour un cocktail en extérieur. Demandez au traiteur comment il s'organise : cuisine sur place, véhicule réfrigéré, pièces froides servies au dernier moment. Privilégiez aussi des menus de saison, avec des produits locaux.

## La dégustation

La plupart des traiteurs proposent une dégustation avant ou après la signature. C'est le moment de valider les plats, les quantités, les régimes particuliers et l'accord avec les vins.

## Les grands mariages

Servir plusieurs centaines d'assiettes chaudes en même temps demande une brigade nombreuse et une cuisine adaptée. Pour plus de 200 invités, lisez notre article sur [les grands mariages dans le Var](/journal/grand-mariage-var).
`,
    faq: [
      {
        q: 'Mon lieu peut-il m’imposer un traiteur ?',
        a: "Oui, certains lieux imposent leur traiteur ou une liste fermée de traiteurs. Vérifiez-le avant de réserver le lieu.",
      },
      {
        q: 'Combien de serveurs faut-il pour un mariage ?',
        a: "Cela dépend du nombre d'invités et du type de service. Pour un dîner servi à l'assiette, demandez au traiteur combien de serveurs il prévoit : c'est la clé d'un service fluide.",
      },
      {
        q: 'Qu’est-ce que le droit de bouchon ?',
        a: "Un montant facturé pour chaque bouteille apportée par les mariés. Demandez-le avant de signer si vous prévoyez vos propres vins ou champagnes.",
      },
    ],
  },
  {
    slug: 'musique-dj',
    name: 'Musique et DJ',
    title: 'DJ et musiciens de mariage dans le Var',
    pro: 'DJ ou musicien',
    menuDesc: 'La cérémonie, le cocktail et la soirée',
    description:
      'DJ, groupe live ou musiciens pour la cérémonie : comment choisir la musique de son mariage dans le Var, et les contraintes de son à vérifier.',
    intro:
      "La musique accompagne chaque moment du mariage : l'entrée en cérémonie, le cocktail, le dîner et la soirée dansante. Voici comment choisir les bons artistes.",
    bookAhead: '9 à 12 mois avant',
    image: photos.concert,
    imageAlt: 'Soirée dansante sous les lumières',
    body: `
## DJ, groupe ou les deux

Un DJ couvre tous les styles et s'adapte au public ; un groupe live crée une ambiance plus festive mais coûte souvent plus cher. Beaucoup de couples combinent des musiciens pour la cérémonie et le cocktail, comme un quatuor, une guitare ou un saxophone, et un DJ pour la soirée.

## Les contraintes du lieu

Les lieux encadrent souvent la musique amplifiée, qu'ils soient isolés dans les vignes ou proches d'habitations :

- une heure de fin pour la musique, ou pour la musique en extérieur ;
- un limiteur de son, qui coupe l'alimentation au-delà d'un certain volume ;
- une puissance électrique limitée.

Transmettez ces règles à votre DJ dès la réservation.

## La sonorisation de la cérémonie

En extérieur, la voix porte mal : prévoyez des micros pour l'officiant et les intervenants. Vérifiez si le DJ ou les musiciens fournissent la sonorisation de la cérémonie. Notre guide de [la cérémonie laïque](/journal/ceremonie-laique-provence) détaille le déroulé.

## Les questions à poser

- Combien d'heures de prestation, et quel tarif pour une heure supplémentaire ?
- Le matériel est-il compris : sonorisation, lumières, micros ?
- Comment construisez-vous la playlist avec nous ?
- Avez-vous déjà joué dans ce lieu ?
- Quel est le temps d'installation, et à quelle heure arrivez-vous ?
`,
    faq: [
      {
        q: 'Jusqu’à quelle heure peut-on faire de la musique à un mariage ?',
        a: "Cela dépend du lieu et de la commune. Beaucoup de domaines fixent une heure de fin et imposent un limiteur de son : demandez-le avant de réserver.",
      },
      {
        q: 'Faut-il des musiciens pour la cérémonie laïque ?',
        a: "Ce n'est pas obligatoire, mais des musiciens en direct rendent l'entrée et la sortie de la cérémonie plus émouvantes. Un DJ peut aussi diffuser une playlist.",
      },
      {
        q: 'Quand réserver son DJ de mariage ?',
        a: 'Neuf à douze mois avant pour un samedi de haute saison.',
      },
    ],
  },
  {
    slug: 'fleuristes',
    name: 'Fleuristes',
    title: 'Fleuriste de mariage dans le Var',
    pro: 'fleuriste',
    menuDesc: 'Le bouquet, l’arche et les centres de table',
    description:
      'Fleuriste de mariage dans le Var : bouquet, arche de cérémonie, centres de table, fleurs de saison et chaleur estivale. Nos conseils pour bien choisir.',
    intro:
      "Bouquet, boutonnières, arche de cérémonie, centres de table : les fleurs donnent le ton de la décoration. En Provence, olivier, lavande et fleurs de saison se marient naturellement aux vieilles pierres.",
    bookAhead: '6 à 9 mois avant',
    image: photos.bouquetRoses,
    imageAlt: 'Bouquet de roses de mariage',
    body: `
## Les fleurs de saison

Les fleurs de saison sont plus belles, plus fraîches et souvent moins chères. Demandez à votre fleuriste ce qui sera de saison à la date de votre mariage, et partez de là plutôt que d'une photo trouvée en ligne.

## La chaleur, l'ennemie des fleurs

En plein été dans le Var, les fleurs fanent vite en extérieur. Un fleuriste habitué à la région privilégiera des végétaux qui résistent mieux à la chaleur, comme l'olivier, l'eucalyptus ou les graminées, et installera les compositions au dernier moment.

## Faire voyager les fleurs

Pour optimiser le budget, faites réutiliser les compositions : l'arche de cérémonie peut décorer la table d'honneur, les bouquets des témoins orner le buffet. Demandez-le au fleuriste, qui organisera le transfert pendant le cocktail.

## Les questions à poser

- L'installation et le démontage sont-ils compris ?
- Qui récupère le matériel, vases et structures, après le mariage ?
- Quelles fleurs seront de saison à notre date ?
- Pouvez-vous visiter le lieu avant le mariage ?

Pour l'ensemble de la décoration, voir aussi notre page [décoration et location](/prestataires/decoration).
`,
    faq: [
      {
        q: 'Quand réserver son fleuriste de mariage ?',
        a: 'Six à neuf mois avant, une fois le lieu et le style de décoration définis.',
      },
      {
        q: 'Quelles fleurs résistent à la chaleur pour un mariage en été ?',
        a: "Les feuillages comme l'olivier et l'eucalyptus, les graminées et les fleurs séchées tiennent mieux que les fleurs fragiles. Demandez conseil à votre fleuriste.",
      },
      {
        q: 'Peut-on réutiliser les fleurs de la cérémonie pendant la réception ?',
        a: "Oui, c'est une bonne façon de réduire le budget : l'arche et les compositions de la cérémonie peuvent être déplacées vers la salle de réception.",
      },
    ],
  },
  {
    slug: 'decoration',
    name: 'Décoration et location',
    title: 'Décoration et location pour un mariage dans le Var',
    pro: 'décorateur ou loueur de matériel',
    menuDesc: 'Le mobilier, la vaisselle, les tentes',
    description:
      'Décorateur, location de mobilier, de vaisselle, de tentes et d’éclairage pour un mariage dans le Var : ce qu’il faut prévoir selon votre lieu.',
    intro:
      "Selon votre lieu, vous aurez besoin de très peu ou de beaucoup de matériel. Décorateurs et loueurs vous aident à transformer un domaine en lieu de fête, du mobilier à l'éclairage.",
    bookAhead: '6 à 9 mois avant',
    image: photos.lightsHall,
    imageAlt: 'Salle de réception décorée de guirlandes lumineuses',
    body: `
## Partir de ce que fournit le lieu

Certains lieux sont livrés avec tables, chaises et vaisselle ; d'autres sont loués vides. Faites la liste de ce qui est inclus avant de contacter un loueur : c'est l'un des postes qui fait le plus varier le budget, comme l'explique notre article sur [le prix d'un lieu de mariage](/journal/prix-lieu-mariage-var).

## Ce que l'on loue le plus souvent

- les tables, les chaises et le mobilier de salon pour le cocktail ;
- la vaisselle, la verrerie, les couverts et le nappage ;
- les tentes et les voiles d'ombrage, pour le soleil comme pour le plan B ;
- l'éclairage : guirlandes, lanternes, projecteurs ;
- la piste de danse et l'estrade.

## Décorateur ou location seule

Un décorateur conçoit l'ambiance, fournit le matériel, l'installe et le démonte. La location seule est moins chère, mais l'installation repose alors sur vous ou vos proches, souvent la veille du mariage.

## Le vent et le risque d'incendie

Dans le Var, le vent peut se lever en fin de journée : lestez les éléments légers et fixez solidement voiles et tentes. Pour l'éclairage d'ambiance, préférez des bougies à LED : les flammes nues sont très encadrées en été à cause du risque d'incendie.

Pour les fleurs, voir notre page [fleuristes](/prestataires/fleuristes).
`,
    faq: [
      {
        q: 'Faut-il louer une tente pour un mariage en extérieur ?',
        a: "Si la salle de repli du lieu ne peut pas accueillir tous vos invités assis, une tente est la meilleure assurance contre la pluie et le vent.",
      },
      {
        q: 'Peut-on utiliser des bougies lors d’un mariage en été dans le Var ?',
        a: "Les flammes nues sont très encadrées en période de risque d'incendie. Les bougies à LED sont une alternative sûre ; demandez aussi les règles du lieu.",
      },
      {
        q: 'Quand réserver la location de matériel ?',
        a: 'Six à neuf mois avant pour la haute saison, surtout pour les tentes et le mobilier en grande quantité.',
      },
    ],
  },
  {
    slug: 'coiffure-maquillage',
    name: 'Coiffure et maquillage',
    title: 'Coiffure et maquillage de mariage dans le Var',
    pro: 'coiffeur ou maquilleur',
    menuDesc: 'La mise en beauté du jour J',
    description:
      'Coiffure et maquillage de mariage dans le Var : essai, tenue à la chaleur, déplacement sur le lieu des préparatifs. Comment choisir sa mise en beauté.',
    intro:
      "Coiffure et maquillage doivent tenir toute la journée, de la cérémonie à la soirée dansante, malgré la chaleur du Sud. Voici comment choisir les bons professionnels.",
    bookAhead: '6 à 9 mois avant',
    image: photos.makeup,
    imageAlt: 'Mise en beauté de la mariée',
    body: `
## L'essai, indispensable

Prévoyez un essai complet, coiffure et maquillage, quelques semaines avant le mariage. Apportez des photos de votre tenue, de vos accessoires et des coiffures qui vous plaisent. C'est aussi le moment de vérifier que le courant passe.

## Tenir malgré la chaleur

En été, la chaleur et le soleil mettent le maquillage à l'épreuve. Un professionnel habitué aux mariages du Sud utilisera des produits longue tenue et résistants à l'eau, et vous laissera de quoi faire les retouches de la soirée.

## Le déplacement sur le lieu

La plupart des professionnels se déplacent sur le lieu des préparatifs. Vérifiez les frais de déplacement, l'heure d'arrivée et le temps nécessaire si vous souhaitez aussi mettre en beauté vos témoins ou vos proches. Prévoyez une pièce lumineuse pour travailler.

## Les questions à poser

- L'essai est-il compris dans le tarif ?
- Combien de personnes pouvez-vous préparer le matin du mariage ?
- Restez-vous pour une retouche avant la cérémonie ou la soirée ?
- Travaillez-vous seul ou avec une équipe ?
`,
    faq: [
      {
        q: 'Quand faire l’essai coiffure et maquillage ?',
        a: 'Généralement un à trois mois avant le mariage, une fois la tenue et les accessoires choisis.',
      },
      {
        q: 'Comment faire tenir son maquillage en été ?',
        a: "Avec des produits longue tenue, une bonne préparation de la peau et de quoi faire des retouches. Votre maquilleur vous conseillera selon votre peau.",
      },
      {
        q: 'Faut-il réserver tôt sa coiffure et son maquillage ?',
        a: 'Oui pour les samedis de haute saison : six à neuf mois avant.',
      },
    ],
  },
  {
    slug: 'robes-costumes',
    name: 'Robes et costumes',
    title: 'Robe de mariée et costume dans le Var',
    pro: 'créateur de robes ou de costumes',
    menuDesc: 'Les tenues des mariés et les retouches',
    description:
      'Robe de mariée et costume de marié : délais de commande, retouches, tissus adaptés à la chaleur du Var. Le calendrier et nos conseils.',
    intro:
      "La tenue est souvent le choix le plus personnel du mariage, et l'un de ceux qui demandent le plus d'anticipation. Voici le calendrier et les points à ne pas oublier pour un mariage dans le Var.",
    bookAhead: '8 à 12 mois avant',
    image: photos.dressSuit,
    imageAlt: 'Mariée en robe tenant son bouquet aux côtés du marié en costume',
    body: `
## Anticiper les délais

Entre la commande, la fabrication et les retouches, une robe de mariée demande souvent plusieurs mois. Commencez les essayages huit à douze mois avant, davantage pour une création sur mesure. Les costumes sur mesure demandent eux aussi plusieurs semaines de fabrication.

## Des tissus adaptés à la chaleur

Pour un mariage en plein été, privilégiez des matières légères et respirantes : lin, mousseline, crêpe, soie. Un costume en lin ou en laine légère sera bien plus agréable qu'un tissu épais lors d'une cérémonie en extérieur.

## Penser au lieu

Une longue traîne dans les vignes ou sur des graviers, des talons fins sur la pelouse : pensez au terrain de votre lieu. Prévoyez une seconde paire de chaussures, plus confortable, pour la soirée.

## Les retouches

Prévoyez deux à trois séances de retouches, la dernière quelques semaines avant le mariage. Apportez les chaussures et les sous-vêtements que vous porterez le jour J.

Pour la mise en beauté, voir notre page [coiffure et maquillage](/prestataires/coiffure-maquillage).
`,
    faq: [
      {
        q: 'Quand acheter sa robe de mariée ?',
        a: 'Huit à douze mois avant le mariage, davantage pour une création sur mesure, afin de laisser le temps de la fabrication et des retouches.',
      },
      {
        q: 'Quelle matière choisir pour un mariage en été dans le Var ?',
        a: 'Des tissus légers et respirants comme le lin, la mousseline, le crêpe ou la soie, pour la robe comme pour le costume.',
      },
      {
        q: 'Combien de retouches prévoir ?',
        a: 'En général deux à trois séances, la dernière quelques semaines avant la date.',
      },
    ],
  },
  {
    slug: 'patissiers',
    name: 'Gâteaux et pâtissiers',
    title: 'Gâteau de mariage et pâtissier dans le Var',
    pro: 'pâtissier',
    menuDesc: 'La pièce montée et le wedding cake',
    description:
      'Pièce montée, wedding cake ou buffet de desserts : choisir son pâtissier de mariage dans le Var et faire face à la chaleur estivale.',
    intro:
      "Pièce montée traditionnelle, wedding cake à étages ou buffet de desserts : le gâteau est un moment fort de la soirée. Dans le Var, il doit aussi résister à la chaleur.",
    bookAhead: '3 à 6 mois avant',
    image: photos.weddingCake,
    imageAlt: 'Gâteau de mariage décoré de fleurs',
    body: `
## Pièce montée, wedding cake ou buffet

- **La pièce montée** : la tradition française, en choux caramélisés, facile à partager.
- **Le wedding cake** : un gâteau à étages décoré, souvent spectaculaire.
- **Le buffet de desserts** : plusieurs pâtisseries à partager, qui plaît aux invités.

Demandez aussi à votre traiteur ce qu'il propose : certains incluent le dessert dans leur formule.

## La chaleur et le transport

Crème au beurre, chantilly et chocolat supportent mal la chaleur. En été, demandez au pâtissier des recettes adaptées, une livraison au dernier moment et un endroit frais pour stocker le gâteau sur le lieu. Le transport sur les routes sinueuses de l'arrière-pays demande aussi de l'expérience.

## La dégustation

Comme pour le traiteur, une dégustation permet de choisir les saveurs. Prévoyez-la après avoir fixé le menu du dîner, pour équilibrer le repas.

## Le droit de découpe

Certains lieux ou traiteurs facturent un droit de découpe quand le gâteau vient d'un autre prestataire. Renseignez-vous avant de commander. Voir aussi notre page [traiteurs](/prestataires/traiteurs).
`,
    faq: [
      {
        q: 'Quand commander son gâteau de mariage ?',
        a: 'Trois à six mois avant le mariage, davantage pour un pâtissier très demandé en haute saison.',
      },
      {
        q: 'Quel gâteau choisir pour un mariage en été ?',
        a: 'Privilégiez des recettes qui supportent la chaleur, et prévoyez un stockage au frais sur le lieu avec une livraison au dernier moment.',
      },
      {
        q: 'Le traiteur peut-il fournir le gâteau ?',
        a: "Souvent, oui. Comparez son offre avec celle d'un pâtissier, et vérifiez si un droit de découpe s'applique à un gâteau extérieur.",
      },
    ],
  },
  {
    slug: 'officiants',
    name: 'Officiants de cérémonie',
    title: 'Officiant de cérémonie laïque dans le Var',
    pro: 'officiant de cérémonie',
    menuDesc: 'La cérémonie laïque sur mesure',
    description:
      'Officiant de cérémonie laïque dans le Var : son rôle, le déroulé, comment le choisir et quand le réserver pour une cérémonie sur mesure.',
    intro:
      "L'officiant écrit et anime votre cérémonie laïque. Il en fait un moment personnel, à votre image, au milieu des oliviers ou face à la mer.",
    bookAhead: '6 à 12 mois avant',
    image: photos.hillsideArch,
    imageAlt: 'Arche de cérémonie fleurie face aux collines',
    body: `
## Le rôle de l'officiant

L'officiant rencontre les mariés, recueille leur histoire, écrit le texte de la cérémonie et coordonne les interventions des proches. Le jour J, il anime la cérémonie et en donne le rythme. La cérémonie laïque n'a pas de valeur légale : le mariage civil reste célébré à la mairie.

## Professionnel ou proche

Un proche à l'aise à l'oral peut officier, et c'est souvent très émouvant. Un officiant professionnel apporte une méthode, un texte travaillé et l'expérience de nombreuses cérémonies. Notre guide de [la cérémonie laïque en Provence](/journal/ceremonie-laique-provence) détaille le déroulé.

## Choisir l'emplacement avec lui

L'officiant peut vous aider à choisir l'emplacement de la cérémonie sur le lieu : l'orientation par rapport au soleil, l'acoustique, la place des invités. Beaucoup de lieux du Var ont un espace dédié, comme un théâtre de verdure ou une oliveraie.

## Les questions à poser

- Combien de rendez-vous de préparation sont prévus ?
- Pouvons-nous relire le texte avant le mariage ?
- Fournissez-vous la sonorisation de la cérémonie ?
- Combien de temps dure la cérémonie ?
`,
    faq: [
      {
        q: 'Un officiant de cérémonie laïque peut-il nous marier légalement ?',
        a: 'Non. Seul le mariage civil, célébré à la mairie, a une valeur légale. La cérémonie laïque est symbolique.',
      },
      {
        q: 'Combien de temps dure une cérémonie laïque ?',
        a: 'Entre 30 et 45 minutes en général.',
      },
      {
        q: 'Quand réserver son officiant ?',
        a: 'Six à douze mois avant, pour laisser le temps des rendez-vous de préparation.',
      },
    ],
  },
  {
    slug: 'transport',
    name: 'Transport et voitures',
    title: 'Transport et voiture de mariage dans le Var',
    pro: 'loueur de véhicules ou transporteur',
    menuDesc: 'La voiture des mariés et les navettes',
    description:
      'Voiture des mariés et navettes pour les invités : organiser les transports d’un mariage dans le Var, entre domaines, hôtels et gares.',
    intro:
      "Dans le Var, les lieux de réception sont souvent loin des hôtels et des gares. Les transports méritent une vraie organisation, pour les mariés comme pour les invités.",
    bookAhead: '3 à 6 mois avant',
    image: photos.coupleRoad,
    imageAlt: 'Couple de mariés marchant sur une route de campagne',
    body: `
## La voiture des mariés

Voiture de collection, cabriolet, véhicule avec chauffeur : la voiture des mariés relie la mairie, la cérémonie et la réception, et se prête aux photos. Vérifiez qu'elle supporte la chaleur en été et que le chauffeur connaît l'accès au lieu.

## Les navettes pour les invités

Des navettes entre les hôtels et le lieu évitent les trajets de nuit sur des routes sinueuses après la soirée. Prévoyez plusieurs rotations en fin de soirée, et un service depuis la gare ou l'aéroport pour les invités venus de loin.

## Vérifier l'accès au lieu

Beaucoup de domaines sont au bout de chemins étroits : demandez au lieu si un car peut accéder jusqu'au parking. Notre article sur [les grands mariages](/journal/grand-mariage-var) détaille la logistique pour de nombreux invités, et celui sur [les lieux avec hébergement](/journal/lieu-mariage-hebergement-var) aide à réduire les trajets.

## La circulation en été

Sur le littoral, en juillet et en août, la circulation est dense, surtout le week-end. Prévoyez des marges dans le planning, en particulier entre la mairie et le lieu de réception.
`,
    faq: [
      {
        q: 'Faut-il organiser des navettes pour les invités ?',
        a: "C'est fortement conseillé si le lieu est éloigné des hôtels : cela évite les trajets de nuit après la soirée.",
      },
      {
        q: 'Quand réserver la voiture des mariés ?',
        a: 'Trois à six mois avant, davantage pour un véhicule de collection en haute saison.',
      },
      {
        q: 'Un car peut-il accéder à tous les domaines ?',
        a: "Non, certains chemins sont trop étroits. Vérifiez l'accès avec le lieu avant de réserver.",
      },
    ],
  },
  {
    slug: 'papeterie',
    name: 'Faire-part et papeterie',
    title: 'Faire-part et papeterie de mariage dans le Var',
    pro: 'créateur de papeterie',
    menuDesc: 'Le save the date, les faire-part, les menus',
    description:
      'Save the date, faire-part, menus et plan de table : le calendrier et les conseils pour la papeterie de votre mariage dans le Var.',
    intro:
      "Du save the date aux marque-places, la papeterie donne un premier aperçu de votre mariage et guide vos invités le jour J.",
    bookAhead: '6 à 9 mois avant',
    image: photos.longTable,
    imageAlt: 'Table de mariage dressée avec menus et bouquets',
    body: `
## Le calendrier

- **Le save the date** : neuf à douze mois avant, surtout si vos invités viennent de loin.
- **Le faire-part** : quatre à six mois avant.
- **Les éléments du jour J** : menus, marque-places, plan de table et livret de cérémonie, finalisés le dernier mois.

Notre [rétroplanning](/journal/retroplanning-mariage) replace ces étapes dans l'ensemble de l'organisation.

## Les informations pratiques

Pour un mariage dans le Var, le faire-part ou le site du mariage doit indiquer l'accès au lieu, les hébergements proches, les gares et aéroports, et le programme du week-end. Pensez aussi au code vestimentaire : chaussures adaptées aux jardins, tenues légères en été.

## Une identité cohérente

Un même univers graphique, du faire-part aux menus, donne de la cohérence à la décoration. L'olivier, la vigne ou la lavande se prêtent bien à un mariage en Provence.
`,
    faq: [
      {
        q: 'Quand envoyer les faire-part de mariage ?',
        a: "Quatre à six mois avant, précédés d'un save the date neuf à douze mois avant si vos invités viennent de loin.",
      },
      {
        q: 'Que mettre sur un faire-part de mariage ?',
        a: "La date, les lieux et les horaires, l'accès, les hébergements proches, la date limite de réponse et un lien vers le site du mariage.",
      },
      {
        q: 'Faut-il un site de mariage ?',
        a: "C'est très pratique pour centraliser les informations, les réponses et l'hébergement, surtout pour un mariage loin de chez vous.",
      },
    ],
  },
  {
    slug: 'animations',
    name: 'Animations',
    title: 'Animations de mariage dans le Var',
    pro: "prestataire d'animation",
    menuDesc: 'Le photobooth, les enfants, les spectacles',
    description:
      'Photobooth, animations pour enfants, spectacles, jeux de cocktail : des idées d’animations pour un mariage dans le Var, et les règles à respecter.',
    intro:
      "Une animation bien choisie rythme le cocktail, occupe les enfants ou crée un souvenir. Voici les idées qui fonctionnent, et les règles à connaître dans le Var.",
    bookAhead: '3 à 6 mois avant',
    image: photos.confettiCouple,
    imageAlt: 'Mariés sous une pluie de confettis',
    body: `
## Les animations qui plaisent

- **Le photobooth** : les invités repartent avec leurs photos, et vous avec un album souvenir.
- **L'animation pour enfants** : des animateurs ou des baby-sitters dans un espace dédié, pour que les parents profitent de la soirée.
- **Les jeux du cocktail** : pétanque, jeux en bois, dégustation des vins du domaine.
- **Les spectacles** : magicien au cocktail, danseurs, musiciens ambulants.

## Feux d'artifice et lanternes

En été, la prévention des incendies encadre strictement l'usage du feu dans le Var. Les feux d'artifice et les lanternes célestes sont souvent interdits ou soumis à autorisation. Renseignez-vous auprès du lieu et de la mairie, et prévoyez des alternatives : bulles, confettis biodégradables, pétales, lavande.

## Bien les placer dans la journée

Une animation fonctionne quand elle occupe un temps creux : pendant la séance photo de couple, entre le cocktail et le dîner, ou en fin de soirée. Calez-la dans le planning avec le lieu et le DJ. Voir aussi notre page [musique et DJ](/prestataires/musique-dj).
`,
    faq: [
      {
        q: 'Peut-on tirer un feu d’artifice à un mariage dans le Var ?',
        a: "En été, l'usage du feu est très encadré à cause du risque d'incendie. Renseignez-vous auprès du lieu et de la mairie avant d'en prévoir un.",
      },
      {
        q: 'Comment occuper les enfants pendant un mariage ?',
        a: 'Avec un espace dédié et des animateurs ou des baby-sitters professionnels, en particulier pendant le dîner et la soirée.',
      },
      {
        q: 'Quand réserver un photobooth ?',
        a: 'Trois à six mois avant pour un samedi de haute saison.',
      },
    ],
  },
  {
    slug: 'alliances',
    name: 'Alliances et bijoux',
    title: 'Alliances de mariage dans le Var',
    pro: 'bijoutier ou joaillier',
    menuDesc: 'Les alliances, la gravure, les bijoux',
    description:
      'Choisir ses alliances de mariage : métaux, tailles, gravure et délais de fabrication. Nos conseils et le bon calendrier avant le mariage.',
    intro:
      "Les alliances se portent toute la vie : elles méritent d'être choisies sans précipitation. Voici les points à connaître et le calendrier à respecter.",
    bookAhead: '3 à 4 mois avant',
    image: photos.ringsFlowers,
    imageAlt: 'Alliances posées sur des fleurs',
    body: `
## Choisir le métal

Or jaune, or blanc, or rose, platine : chaque métal a son style et sa résistance. Pensez à l'harmonie avec la bague de fiançailles, portée au même doigt, et à votre quotidien si vous travaillez beaucoup avec les mains.

## La bonne taille

Les doigts gonflent avec la chaleur : faites prendre vos mesures à un moment de la journée représentatif, ni en pleine canicule ni au réveil. Le bijoutier vous conseillera aussi sur la largeur, qui change la sensation au doigt.

## Gravure et délais

Prévoyez trois à quatre mois pour des alliances fabriquées ou ajustées, davantage pour une création sur mesure. La gravure, date, prénoms ou message, demande quelques jours de plus.

## Le jour J

Désignez la personne qui gardera les alliances jusqu'à la cérémonie, et prévoyez un porte-alliances. Un enfant peut les apporter, sous la surveillance d'un adulte. Notre guide de [la cérémonie laïque](/journal/ceremonie-laique-provence) détaille le moment de l'échange.
`,
    faq: [
      {
        q: 'Quand acheter ses alliances ?',
        a: 'Trois à quatre mois avant le mariage, davantage pour une création sur mesure.',
      },
      {
        q: 'Comment trouver la bonne taille d’alliance ?',
        a: 'Faites-vous mesurer par un bijoutier, à un moment où vos doigts ne sont ni gonflés par la chaleur ni engourdis par le froid.',
      },
      {
        q: 'Les alliances doivent-elles être assorties ?',
        a: 'Pas forcément. Beaucoup de couples choisissent des modèles différents dans le même métal, ou une gravure commune.',
      },
    ],
  },
];

export function findVendorCategory(slug: string): VendorCategory | undefined {
  return vendorCategories.find((c) => c.slug === slug);
}

/** Label of a listing request category ("lieu" or a vendor slug), for the admin. */
export function categoryLabel(slug: string): string {
  if (slug === 'lieu') return 'Lieux de réception';
  return findVendorCategory(slug)?.name ?? slug;
}
