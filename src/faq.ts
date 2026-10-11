import { FaqItem, Venue, Zone } from './types';
import { inCommune, venues, venuesInZone, zoneHref } from './data';
import { paths, pathsFor } from './paths';
import { formatEuros, Lang } from './i18n/lang';

const lcFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Questions couples ask about a venue, answered from its published data. */
export function venueFaq(v: Venue, lang: Lang = 'fr'): FaqItem[] {
  const p = pathsFor(lang);
  const area = zoneHref(v.zone, lang);
  if (lang === 'en') {
    return [
      {
        q: `How many guests can ${v.nom_du_lieu} host?`,
        a: v.maxGuests
          ? `${v.nom_du_lieu} hosts ${lcFirst(v.capacite_accueil)}. Check with the venue how many guests the indoor fallback space holds in case of bad weather.`
          : `${v.nom_du_lieu} does not publish an exact capacity: ${lcFirst(v.capacite_accueil)}. Ask the venue directly.`,
      },
      {
        q: `Can guests stay overnight at ${v.nom_du_lieu}?`,
        a: v.hasAccommodation
          ? `Yes: ${lcFirst(v.hebergement_sur_place.replace(/^Yes\s*\(?/i, '').replace(/\)$/, ''))}. See also the [wedding venues with accommodation in the Var](${p.article('lieu-mariage-hebergement-var')}).`
          : `No, ${v.nom_du_lieu} has no accommodation on site${/partner hotels?/i.test(v.hebergement_sur_place) ? ', but works with partner hotels nearby' : ''}. Plan nearby accommodation and shuttles for your guests.`,
      },
      {
        q: `How much does a wedding at ${v.nom_du_lieu} cost?`,
        a: `Published indicative prices: ${lcFirst(v.fourchette_de_prix)}. Confirm them with the venue, as they depend on the date and the number of guests. Our article on [wedding venue prices in the Var](${p.article('prix-lieu-mariage-var')}) helps you compare.`,
      },
      {
        q: `Where is ${v.nom_du_lieu}?`,
        a: area
          ? `${v.nom_du_lieu} is in ${v.commune}, ${v.zone.where}, in the Var (Provence). Discover the other [wedding venues ${v.zone.where}](${area}).`
          : `${v.nom_du_lieu} is in ${v.commune}, ${v.zone.where}.`,
      },
      {
        q: `How do I contact ${v.nom_du_lieu}?`,
        a: 'Click “Get contact details” on this page to see the venue’s phone number and official website, free of charge.',
      },
    ];
  }
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
        ? `Oui : ${lcFirst(v.hebergement_sur_place.replace(/^Oui\s*\(?/i, '').replace(/\)$/, ''))}. Voir aussi les [lieux avec hébergement dans le Var](${p.article('lieu-mariage-hebergement-var')}).`
        : `Non, ${v.nom_du_lieu} ne propose pas d'hébergement sur place${/hôtels? partenaires?/i.test(v.hebergement_sur_place) ? ', mais travaille avec des hôtels partenaires à proximité' : ''}. Prévoyez des hébergements proches et des navettes pour vos invités.`,
    },
    {
      q: `Quel est le prix d'un mariage à ${v.nom_du_lieu} ?`,
      a: `Tarifs indicatifs publiés : ${lcFirst(v.fourchette_de_prix)}. Ils sont à confirmer auprès du lieu, selon la date et le nombre d'invités. Notre article sur [le prix d'un lieu de mariage dans le Var](${p.article('prix-lieu-mariage-var')}) aide à comparer.`,
    },
    {
      q: `Où se trouve ${v.nom_du_lieu} ?`,
      a: area
        ? `${v.nom_du_lieu} se trouve ${inCommune(v.commune)}, ${v.zone.where}, dans le Var. Découvrez les autres [lieux de mariage ${v.zone.where}](${area}).`
        : `${v.nom_du_lieu} se trouve ${inCommune(v.commune)}, ${v.zone.where}.`,
    },
    {
      q: `Comment contacter ${v.nom_du_lieu} ?`,
      a: `Cliquez sur « Obtenir les coordonnées » sur cette page pour afficher gratuitement le téléphone et le site officiel du lieu.`,
    },
  ];
}

/** Questions about an area, answered from the venues listed in it. */
export function zoneFaq(z: Zone, lang: Lang = 'fr'): FaqItem[] {
  const p = pathsFor(lang);
  const en = lang === 'en';
  const list = venuesInZone(z.slug);
  const link = (v: Venue) => `[${v.nom_du_lieu}](${p.venue(v.slug)})`;
  const largest = [...list].filter((v) => v.maxGuests).sort((a, b) => (b.maxGuests ?? 0) - (a.maxGuests ?? 0))[0];
  const withRooms = list.filter((v) => v.hasAccommodation);
  const priced = list.filter((v) => v.priceFrom !== null).sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
  const s = list.length > 1;

  const items: FaqItem[] = [
    en
      ? {
          q: `How many wedding venues are there ${z.where}?`,
          a: `Our directory lists ${list.length} wedding venue${s ? 's' : ''} ${z.where}: ${list.map(link).join(', ')}.`,
        }
      : {
          q: `Combien de lieux de mariage ${z.where} ?`,
          a: `Notre annuaire référence ${list.length} lieu${s ? 'x' : ''} de réception ${z.where} : ${list.map(link).join(', ')}.`,
        },
  ];
  if (largest) {
    items.push(
      en
        ? {
            q: `Which venue ${z.where} suits a large wedding?`,
            a: `${link(largest)} is the largest venue of our selection ${z.where}: ${lcFirst(largest.capacite_accueil)}.`,
          }
        : {
            q: `Quel lieu ${z.where} pour un grand mariage ?`,
            a: `${link(largest)} est le plus grand lieu de notre sélection ${z.where} : ${lcFirst(largest.capacite_accueil)}.`,
          },
    );
  }
  items.push(
    en
      ? {
          q: `Which wedding venues ${z.where} offer accommodation?`,
          a: withRooms.length
            ? `${withRooms.map((v) => `${link(v)} (${v.lodgingShort.toLowerCase()})`).join(', ')}.`
            : `None of the venues of our selection ${z.where} can host guests overnight. See our [wedding venues with accommodation in the Var](${p.article('lieu-mariage-hebergement-var')}).`,
        }
      : {
          q: `Quels lieux de mariage ${z.where} proposent un hébergement ?`,
          a: withRooms.length
            ? `${withRooms.map((v) => `${link(v)} (${v.lodgingShort.toLowerCase()})`).join(', ')}.`
            : `Aucun lieu de notre sélection ${z.where} ne loge les invités sur place. Consultez nos [lieux avec hébergement dans le Var](${p.article('lieu-mariage-hebergement-var')}).`,
        },
  );
  if (priced.length) {
    const low = priced[0];
    const high = priced[priced.length - 1];
    items.push(
      en
        ? {
            q: `What budget for a wedding venue ${z.where}?`,
            a: `Published starting prices range from ${formatEuros(low.priceFrom!, lang)} (${link(low)}) to ${formatEuros(high.priceFrom!, lang)} (${link(high)}), depending on what is included.`,
          }
        : {
            q: `Quel budget pour un lieu de mariage ${z.where} ?`,
            a: `Les prix de départ publiés vont de ${formatEuros(low.priceFrom!, lang)} (${link(low)}) à ${formatEuros(high.priceFrom!, lang)} (${link(high)}), selon ce qui est inclus.`,
          },
    );
  }
  return items;
}

/** Home page questions (a function: the venue counts change when professionals publish). */
export const homeFaq = (lang: Lang = 'fr'): FaqItem[] => {
  const p = pathsFor(lang);
  const withRooms = venues.filter((v) => v.hasAccommodation).length;
  if (lang === 'en') {
    return [
      {
        q: 'How do we choose a wedding venue in the Var?',
        a: `Start with the area and your number of guests, then compare the indoor fallback space, accommodation, catering and curfew. Our [complete guide](${p.article('organiser-mariage-var-guide')}) walks you through each step.`,
      },
      {
        q: 'How much does a wedding venue in the Var cost?',
        a: `In our selection, starting prices range from about €1,000 for a reception room to more than €37,000 for an exclusive-use stay. See [the price breakdown](${p.article('prix-lieu-mariage-var')}).`,
      },
      {
        q: 'Which wedding venues in the Var can host guests overnight?',
        a: `${withRooms} venues of our selection offer accommodation on site, with up to about 86 beds. See [the venues with accommodation](${p.article('lieu-mariage-hebergement-var')}).`,
      },
      {
        q: 'What is the best time of year to get married in the Var?',
        a: `June and September are often the best balance of light, temperature and long days. See [our seasonal guide](${p.article('quelle-saison-mariage-var')}).`,
      },
      {
        q: 'Is the directory free?',
        a: 'Yes. Browsing the venues and getting their contact details is completely free for couples.',
      },
    ];
  }
  return [
    {
      q: 'Comment choisir son lieu de mariage dans le Var ?',
      a: `Commencez par le secteur et le nombre d'invités, puis comparez capacité de repli, hébergement, traiteur et horaires. Notre [guide complet](${p.article('organiser-mariage-var-guide')}) détaille chaque étape.`,
    },
    {
      q: 'Combien coûte un lieu de mariage dans le Var ?',
      a: `Dans notre sélection, les prix de départ vont d'environ 1 000 € pour une salle à plus de 37 000 € pour une privatisation avec séjour. Voir [le détail des prix](${p.article('prix-lieu-mariage-var')}).`,
    },
    {
      q: 'Quels lieux de mariage du Var logent les invités ?',
      a: `${withRooms} lieux de notre sélection proposent un hébergement sur place, jusqu'à environ 86 couchages. Voir [les lieux avec hébergement](${p.article('lieu-mariage-hebergement-var')}).`,
    },
    {
      q: 'Quelle est la meilleure saison pour se marier dans le Var ?',
      a: `Juin et septembre sont souvent les meilleurs compromis entre lumière, températures et journées longues. Voir [notre guide des saisons](${p.article('quelle-saison-mariage-var')}).`,
    },
    {
      q: "L'annuaire est-il gratuit ?",
      a: "Oui. La consultation des fiches et l'accès aux coordonnées des lieux sont entièrement gratuits pour les couples.",
    },
  ];
};

/** Questions from venue owners, on the "Référencer mon lieu" page (French only). */
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
    a: "Oui : en créant votre compte, vous pouvez situer votre lieu dans un autre département. L'annuaire reste centré sur le Var et ses alentours.",
  },
];

/** Questions on the vendors hub page. */
export const vendorsHubFaq = (lang: Lang = 'fr'): FaqItem[] =>
  lang === 'en'
    ? [
        {
          q: 'In what order should we book our wedding vendors?',
          a: `The venue first, then the most sought-after vendors: wedding planner, photographer, caterer, videographer and music. Then the outfits, florist, decor and hair and make-up, and finally the cake, transport, entertainment and rings. Our [wedding planning timeline](${pathsFor('en').article('retroplanning-mariage')}) sets out the calendar.`,
        },
        {
          q: 'Which vendors can we find on L’Édition?',
          a: 'Wedding professionals working in the Var: photographers, videographers, wedding planners, caterers, DJs and musicians, florists, decorators, hair and make-up artists, dress and suit designers, cake makers, officiants, transport, stationers, entertainers and jewellers.',
        },
        {
          q: 'Do the vendors speak English?',
          a: 'Many wedding professionals in Provence work with international couples, but not all of them. Ask when you first get in touch, and check whether contracts and quotes can be provided in English.',
        },
      ]
    : [
        {
          q: 'Dans quel ordre réserver ses prestataires de mariage ?',
          a: `D'abord le lieu, puis les prestataires les plus demandés : wedding planner, photographe, traiteur, vidéaste et musique. Viennent ensuite la tenue, le fleuriste, la décoration et la mise en beauté, puis le gâteau, les transports, les animations et les alliances. Notre [rétroplanning](${paths.article('retroplanning-mariage')}) détaille le calendrier.`,
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
