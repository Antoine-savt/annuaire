import { Budget, ListingDoc, Venue, Vendor } from '../types';
import { findZone, zones } from '../data';
import { departmentZone } from '../departments';
import { slugify } from './richtext';
import { contentLang } from '../i18n/current';
import { formatEuros, translator } from '../i18n/lang';

/** Same bands as the curated venues: under 4 000 €, up to 10 000 €, above. */
function budgetFor(price: number | null): Budget | null {
  if (price === null) return null;
  if (price < 4000) return '€';
  if (price < 10000) return '€€';
  return '€€€';
}

/**
 * A venue listing from a professional account, shaped like the curated venues. The facts computed
 * here follow the content language; the texts written by the professional stay as written.
 */
export function listingToVenue(l: ListingDoc): Venue {
  const lang = contentLang();
  const t = translator(lang);
  const zone = findZone(l.zone) ?? departmentZone(l.zone) ?? zones[0];
  const guestsShort =
    l.guestsMin && l.guestsMax
      ? t(`${l.guestsMin} à ${l.guestsMax}`, `${l.guestsMin} to ${l.guestsMax}`)
      : l.guestsMax
        ? t(`Jusqu'à ${l.guestsMax}`, `Up to ${l.guestsMax}`)
        : t('Sur demande', 'On request');
  const priceShort = l.priceFrom ? t('Dès ', 'From ') + formatEuros(l.priceFrom, lang) : t('Sur devis', 'On request');
  const photos = l.photos.length ? l.photos : [];
  return {
    slug: l.slug,
    nom_du_lieu: l.name,
    commune: l.commune,
    zone,
    site_web_officiel: l.website,
    description: l.description || l.summary,
    capacite_accueil: l.guestsMax ? `${guestsShort} ${t('invités', 'guests')}` : t('Capacité sur demande', 'Capacity on request'),
    hebergement_sur_place: l.sleeps > 0 ? t(`Oui (${l.sleeps} couchages)`, `Yes (sleeps ${l.sleeps})`) : t('Non', 'No'),
    type_de_cadre: l.venueType || t('Lieu de réception', 'Wedding venue'),
    fourchette_de_prix: l.priceDetails ? `${priceShort} (${l.priceDetails})` : priceShort,
    element_differenciant: l.highlight || l.summary,
    contact: l.phone,
    sources: t('informations fournies par le lieu', 'information provided by the venue'),
    image: photos[0] ?? '',
    imageAlt: `${l.name}, ${l.commune}`,
    gallery: photos,
    summary: l.summary,
    tags: l.tags.slice(0, 3),
    guestsShort,
    lodgingShort: l.sleeps > 0 ? t(`${l.sleeps} couchages`, `Sleeps ${l.sleeps}`) : t('Non', 'No'),
    priceShort,
    minGuests: l.guestsMin,
    maxGuests: l.guestsMax,
    priceFrom: l.priceFrom,
    sleeps: l.sleeps,
    hasAccommodation: l.sleeps > 0,
    budget: budgetFor(l.priceFrom),
    ownerUid: l.ownerUid,
    updatedAt: l.updatedAt,
    illustrative: false,
  };
}

/** A vendor listing from a professional account. */
export function listingToVendor(l: ListingDoc): Vendor {
  return {
    slug: l.slug,
    category: l.category,
    name: l.name,
    commune: l.commune,
    zone: l.zone,
    summary: l.summary,
    tags: l.tags.slice(0, 3),
    priceFrom: l.priceDetails || undefined,
    phone: l.phone,
    website: l.website || undefined,
    instagram: l.instagram || undefined,
    portfolio: l.portfolio || undefined,
    image: l.photos[0],
    imageAlt: `${l.name}, ${l.commune}`,
    description: l.description,
    photos: l.photos,
    ownerUid: l.ownerUid,
    updatedAt: l.updatedAt,
  };
}

/** Firestore document id of a listing: the slug for a venue, "category.slug" for a vendor. */
export function listingId(type: ListingDoc['type'], category: string, slug: string): string {
  return type === 'lieu' ? slug : `${category}.${slug}`;
}

/** URL-safe slug from a name, at most 60 characters. */
export function listingSlug(name: string): string {
  return slugify(name).slice(0, 60).replace(/-+$/, '') || 'fiche';
}

const str = (v: unknown) => (typeof v === 'string' ? v : '');
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const millis = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (v && typeof v === 'object' && 'toMillis' in v && typeof (v as { toMillis: unknown }).toMillis === 'function') {
    return (v as { toMillis: () => number }).toMillis();
  }
  if (typeof v === 'string') return Date.parse(v) || 0;
  return 0;
};

/** Normalize raw Firestore data (SDK or REST) into a ListingDoc. */
export function toListingDoc(id: string, data: Record<string, unknown>): ListingDoc {
  return {
    id,
    ownerUid: str(data.ownerUid),
    type: data.type === 'prestataire' ? 'prestataire' : 'lieu',
    category: str(data.category) || 'lieu',
    slug: str(data.slug),
    status: data.status === 'published' || data.status === 'hidden' ? data.status : 'draft',
    name: str(data.name),
    commune: str(data.commune),
    zone: str(data.zone),
    summary: str(data.summary),
    description: str(data.description),
    tags: Array.isArray(data.tags) ? data.tags.filter((t): t is string => typeof t === 'string') : [],
    highlight: str(data.highlight),
    phone: str(data.phone),
    website: str(data.website),
    instagram: str(data.instagram),
    portfolio: str(data.portfolio),
    photos: Array.isArray(data.photos) ? data.photos.filter((p): p is string => typeof p === 'string') : [],
    venueType: str(data.venueType),
    guestsMin: num(data.guestsMin),
    guestsMax: num(data.guestsMax),
    sleeps: num(data.sleeps) ?? 0,
    priceFrom: num(data.priceFrom),
    priceDetails: str(data.priceDetails),
    createdAt: millis(data.createdAt),
    updatedAt: millis(data.updatedAt),
  };
}

/** A published listing has enough to be shown: name, place and a cover photo for venues. */
export function isDisplayable(l: ListingDoc): boolean {
  return l.status === 'published' && !!l.name && !!l.commune && !!l.slug && (l.type === 'prestataire' || l.photos.length > 0);
}
