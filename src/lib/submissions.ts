import { firebaseConfigured, getDb } from './firebase';

/** A listing request, from a venue ("lieu") or a vendor (vendor category slug). */
export interface ListingInput {
  /** "lieu" for venues, otherwise a vendor category slug (see src/vendors.ts). */
  category: string;
  kind: 'nouveau' | 'mise-a-jour';
  /** Name of the venue or the business. */
  name: string;
  commune: string;
  /** Sector of the venue, or the area a vendor works in. */
  zone: string;
  /** Type of venue, or a vendor's specialty. */
  subtype: string;
  capacity: string;
  sleeps: string;
  priceFrom: string;
  website: string;
  instagram: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  message: string;
}

export const emptyListing: ListingInput = {
  category: '',
  kind: 'nouveau',
  name: '',
  commune: '',
  zone: '',
  subtype: '',
  capacity: '',
  sleeps: '',
  priceFrom: '',
  website: '',
  instagram: '',
  contactName: '',
  role: '',
  email: '',
  phone: '',
  message: '',
};

const toInt = (value: string) => {
  const n = Number.parseInt(value.replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) ? Math.min(n, 10000) : undefined;
};

/** Store a listing request. Unlike statistics, it is saved in development too, so the forms can be tested. */
export async function submitListing(input: ListingInput): Promise<void> {
  const doc: Record<string, unknown> = {
    category: input.category,
    kind: input.kind,
    name: input.name.trim().slice(0, 120),
    commune: input.commune.trim().slice(0, 80),
    contactName: input.contactName.trim().slice(0, 120),
    email: input.email.trim().toLowerCase().slice(0, 200),
    phone: input.phone.trim().slice(0, 40),
    consent: true,
  };
  const optional: [string, string, number][] = [
    ['zone', input.zone, 60],
    ['subtype', input.subtype, 120],
    ['priceFrom', input.priceFrom, 120],
    ['website', input.website, 200],
    ['instagram', input.instagram, 120],
    ['role', input.role, 60],
    ['message', input.message, 2000],
  ];
  for (const [key, value, max] of optional) if (value.trim()) doc[key] = value.trim().slice(0, max);
  const capacity = toInt(input.capacity);
  const sleeps = toInt(input.sleeps);
  if (capacity !== undefined) doc.capacity = capacity;
  if (sleeps !== undefined) doc.sleeps = sleeps;

  if (!firebaseConfigured) {
    console.warn('Firebase non configuré : la demande de référencement n’est pas enregistrée.');
    return;
  }
  const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
  await addDoc(collection(db, 'submissions'), { ...doc, at: serverTimestamp() });
}
