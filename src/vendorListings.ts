import { ContactTarget, Vendor } from './types';

/*
 * Vendors shown on the category pages (/prestataires/...), in display order.
 * When a listing request is accepted in /admin, add the vendor here, for example:
 *
 *   {
 *     slug: 'studio-lumiere',
 *     category: 'photographes',          // slug from src/vendors.ts
 *     name: 'Studio Lumière',
 *     commune: 'Toulon',
 *     zone: 'Tout le Var',
 *     summary: 'Reportage documentaire et portraits en lumière naturelle.',
 *     tags: ['Reportage', 'Fine Art', 'Drone'],
 *     priceFrom: 'Dès 1 800 €',
 *     phone: '+33 6 00 00 00 00',
 *     website: 'https://www.studio-lumiere.fr',
 *     image: '/images/vendors/studio-lumiere.jpg',  // file in public/images/vendors/
 *   },
 *
 * Each vendor gets a page (/prestataires/category/slug), the same "Obtenir les coordonnées" form and
 * statistics as the venues. Professionals can also create their listing themselves from their account.
 */
const staticVendors: Vendor[] = [];

/** Every vendor shown on the site: the ones above, plus the listings published from professional accounts. */
export let vendors: Vendor[] = staticVendors;

let listingVendors: Vendor[] = [];
/** Curated vendors withdrawn from the site in /admin (Firestore "removed" collection). */
let removedVendors = new Set<string>();

function mergeVendors() {
  const ids = new Set(listingVendors.map(vendorId));
  vendors = [...staticVendors.filter((v) => !ids.has(vendorId(v)) && !removedVendors.has(vendorId(v))), ...listingVendors];
}

export function setListingVendors(list: Vendor[]) {
  listingVendors = list;
  mergeVendors();
}

export function setRemovedVendors(ids: string[]) {
  removedVendors = new Set(ids);
  mergeVendors();
}

/** The vendors written in this file, for the dashboard. */
export const curatedVendors = staticVendors;

/** Identifier used for statistics and contact requests: "category.slug". */
export function vendorId(v: Pick<Vendor, 'category' | 'slug'>): string {
  return `${v.category}.${v.slug}`;
}

export function vendorsIn(category: string): Vendor[] {
  return vendors.filter((v) => v.category === category);
}

export function findVendor(category: string, slug: string): Vendor | undefined {
  return vendors.find((v) => v.category === category && v.slug === slug);
}

export function findVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => vendorId(v) === id);
}

export function vendorTarget(v: Vendor): ContactTarget {
  const instagram = v.instagram ? `https://www.instagram.com/${v.instagram.replace(/^@/, '')}/` : undefined;
  return {
    id: vendorId(v),
    kind: 'vendor',
    name: v.name,
    place: `${v.commune}, ${v.zone}`,
    phone: v.phone,
    website: v.website || instagram,
    owner: v.ownerUid,
  };
}
