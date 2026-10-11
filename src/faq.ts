import { FaqItem, Venue, Zone } from './types';
import { inCommune, venues, venuesInZone, zoneHref } from './data';
import { paths } from './paths';

const lcFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Questions couples ask about a venue, answered from its published data. */
export function venueFaq(v: Venue): FaqItem[] {
  return [
    {
      q: `Combien d'invités peut accueillir ${v.nom_du_lieu} ?`,
      a: v.maxGuests
        ? `${v.nom_du_lieu} accueille ${lcFirst(v.capacite_accueil)}. Vérifiez avec le lieu la capacité de la salle de repli en cas de mauvais temps.`
        : `${v.nom_du_lieu} ne communique pas de capacité précise : ${lcFirst(v.capacite_accueil)}. Demandez-la directement au lieu.`,
    },
    {
      q: `Peut-on dormir sur place à ${v.nom_du_lieu} ?`,
      a: v.hasAccommodation
        ? `Oui : ${lcFirst(v.hebergement_sur_place.replace(/^Oui\s*\(?/i, '').replace(/\)$/, ''))}. Voir aussi les [lieux avec hébergement dans le Var](${paths.article('lieu-mariage-hebergement-var')}).`
        : `Non, ${v.nom_du_lieu} ne propose pas d'hébergement sur place${/hôtels? partenaires?/i.test(v.hebergement_sur_place) ? ', mais travaille avec des hôtels partenaires à proximité' : ''}. Prévoyez des hébergements proches et des navettes pour vos invités.`,
    },
    {
      q: `Quel est le prix d'un mariage à ${v.nom_du_lieu} ?`,
      a: `Tarifs indicatifs publiés : ${lcFirst(v.fourchette_de_prix)}. Ils sont à confirmer auprès du lieu, selon la date et le nombre d'invités. Notre article sur [le prix d'un lieu de mariage dans le Var](${paths.article('prix-lieu-mariage-var')}) aide à comparer.`,
    },
    {
      q: `Où se trouve ${v.nom_du_lieu} ?`,
      a: zoneHref(v.zone)
        ? `${v.nom_du_lieu} se trouve ${inCommune(v.commune)}, ${v.zone.where}, dans le Var. Découvrez les autres [lieux de mariage ${v.zone.where}](${zoneHref(v.zone)}).`
        : `${v.nom_du_lieu} se trouve ${inCommune(v.commune)}, ${v.zone.where}.`,
    },
    {
      q: `Comment contacter ${v.nom_du_lieu} ?`,
      a: `Cliquez sur « Obtenir les coordonnées » sur cette page pour afficher gratuitement le téléphone et le site officiel du lieu.`,
    },
  ];
}

/** Questions about an area, answered from the venues listed in it. */
export function zoneFaq(z: Zone): FaqItem[] {
  const list = venuesInZone(z.slug);
  const link = (v: Venue) => `[${v.nom_du_lieu}](${paths.venue(v.slug)})`;
  const largest = [...list].filter((v) => v.maxGuests).sort((a, b) => (b.maxGuests ?? 0) - (a.maxGuests ?? 0))[0];
  const withRooms = list.filter((v) => v.hasAccommodation);
  const priced = list.filter((v) => v.priceFrom !== null).sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));

  const items: FaqItem[] = [
    {
      q: `Combien de lieux de mariage ${z.where} ?`,
      a: `Notre annuaire référence ${list.length} lieu${list.length > 1 ? 'x' : ''} de réception ${z.where} : ${list.map(link).join(', ')}.`,
    },
  ];
  if (largest) {
    items.push({
      q: `Quel lieu ${z.where} pour un grand mariage ?`,
      a: `${link(largest)} est le plus grand lieu de notre sélection ${z.where} : ${lcFirst(largest.capacite_accueil)}.`,
    });
  }
  items.push({
    q: `Quels lieux de mariage ${z.where} proposent un hébergement ?`,
    a: withRooms.length
      ? `${withRooms.map((v) => `${link(v)} (${v.lodgingShort.toLowerCase()})`).join(', ')}.`
      : `Aucun lieu de notre sélection ${z.where} ne loge les invités sur place. Consultez nos [lieux avec hébergement dans le Var](${paths.article('lieu-mariage-hebergement-var')}).`,
  });
  if (priced.length) {
    items.push({
      q: `Quel budget pour un lieu de mariage ${z.where} ?`,
      a: `Les prix de départ publiés vont de ${priced[0].priceFrom!.toLocaleString('fr-FR')} € (${link(priced[0])}) à ${priced[priced.length - 1].priceFrom!.toLocaleString('fr-FR')} € (${link(priced[priced.length - 1])}), selon ce qui est inclus.`,
    });
  }
  return items;
}

/** Home page questions (a function: the venue counts change when professionals publish). */
export const homeFaq = (): FaqItem[] => [
  {
    q: 'Comment choisir son lieu de mariage dans le Var ?',
    a: `Commencez par le secteur et le nombre d'invités, puis comparez capacité de repli, hébergement, traiteur et horaires. Notre [guide complet](${paths.article('organiser-mariage-var-guide')}) détaille chaque étape.`,
  },
  {
    q: 'Combien coûte un lieu de mariage dans le Var ?',
    a: `Dans notre sélection, les prix de départ vont d'environ 1 000 € pour une salle à plus de 37 000 € pour une privatisation avec séjour. Voir [le détail des prix](${paths.article('prix-lieu-mariage-var')}).`,
  },
  {
    q: 'Quels lieux de mariage du Var logent les invités ?',
    a: `${venues.filter((v) => v.hasAccommodation).length} lieux de notre sélection proposent un hébergement sur place, jusqu'à environ 86 couchages. Voir [les lieux avec hébergement](${paths.article('lieu-mariage-hebergement-var')}).`,
  },
  {
    q: 'Quelle est la meilleure saison pour se marier dans le Var ?',
    a: `Juin et septembre sont souvent les meilleurs compromis entre lumière, températures et journées longues. Voir [notre guide des saisons](${paths.article('quelle-saison-mariage-var')}).`,
  },
  {
    q: "L'annuaire est-il gratuit ?",
    a: "Oui. La consultation des fiches et l'accès aux coordonnées des lieux sont entièrement gratuits pour les couples.",
  },
];

/** Questions from venue owners, on the "Référencer mon lieu" page. */
export const listingFaq: FaqItem[] = [
  {
    q: 'Combien coûte le référencement de mon lieu ?',
    a: "Le référencement est gratuit pendant la phase de lancement de l'annuaire, puis il deviendra payant, sous forme d'abonnement mensuel. Avant ce changement, nous vous présenterons l'offre et les statistiques de votre fiche, et vous resterez libre de continuer ou de retirer votre fiche.",
  },
  {
    q: 'Combien de temps faut-il pour que ma fiche soit en ligne ?',
    a: "Tout de suite si vous la publiez vous-même : créez votre compte professionnel, remplissez la fiche (photos, tarifs, capacités) et publiez-la. Si vous nous envoyez une demande, nous vous recontactons pour la préparer avec vous ; comptez alors quelques jours.",
  },
  {
    q: "Mon lieu est déjà dans l'annuaire : comment modifier sa fiche ?",
    a: "Créez votre compte professionnel, puis revendiquez la fiche de votre lieu depuis votre espace : après vérification, vous la gérez vous-même. Vous pouvez aussi choisir « Mettre à jour une fiche existante » dans le formulaire et nous indiquer les corrections.",
  },
  {
    q: 'Comment les couples me contactent-ils ?',
    a: "Depuis votre fiche, les couples obtiennent votre téléphone et votre site après avoir indiqué leur date et leur nombre d'invités. Ils vous contactent ensuite directement, sans intermédiaire.",
  },
  {
    q: 'Puis-je retirer mon lieu de l’annuaire ?',
    a: 'Oui, à tout moment : dépubliez ou supprimez votre fiche depuis votre compte, ou demandez-le-nous via ce formulaire.',
  },
  {
    q: 'Référencez-vous des lieux en dehors du Var ?',
    a: "Pas pour l'instant : l'annuaire est consacré aux mariages dans le Var. Laissez-nous tout de même vos coordonnées, nous vous préviendrons si nous ouvrons d'autres départements.",
  },
];

/** Questions on the vendors hub page. */
export const vendorsHubFaq: FaqItem[] = [
  {
    q: 'Dans quel ordre réserver ses prestataires de mariage ?',
    a: "D'abord le lieu, puis les prestataires les plus demandés : wedding planner, photographe, traiteur, vidéaste et musique. Viennent ensuite la tenue, le fleuriste, la décoration et la mise en beauté, puis le gâteau, les transports, les animations et les alliances. Notre [rétroplanning](/journal/retroplanning-mariage) détaille le calendrier.",
  },
  {
    q: 'Comment référencer mon activité de prestataire de mariage dans le Var ?',
    a: "Créez votre compte professionnel et publiez votre fiche vous-même, avec vos photos et vos tarifs : elle est en ligne aussitôt. Vous pouvez aussi nous envoyer une demande avec le formulaire de cette page, et nous préparons la fiche avec vous.",
  },
  {
    q: 'Le référencement des prestataires est-il payant ?',
    a: "Le référencement est gratuit pendant la phase de lancement de l'annuaire, puis il deviendra payant, sous forme d'abonnement mensuel. Avant ce changement, nous vous présenterons l'offre et les statistiques de votre fiche, et vous resterez libre de continuer ou de retirer votre fiche.",
  },
  {
    q: 'Quels prestataires peuvent être référencés ?',
    a: "Tous les professionnels du mariage qui interviennent dans le Var : photographes, vidéastes, wedding planners, traiteurs, DJ et musiciens, fleuristes, décorateurs, coiffeurs et maquilleurs, créateurs de tenues, pâtissiers, officiants, transporteurs, papetiers, animateurs et bijoutiers.",
  },
];
