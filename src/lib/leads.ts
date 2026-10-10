import { firebaseConfigured, getDb, trackingEnabled } from './firebase';
import { track } from './track';

export interface LeadInput {
  firstName: string;
  email: string;
  phone: string;
  weddingDate: string;
  guests: string;
}

const UNLOCKED_KEY = 'edition:unlocked';
const CONTACT_KEY = 'edition:contact';

function local(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Venues whose contact details this visitor already unlocked. */
export function isUnlocked(venue: string): boolean {
  try {
    return (JSON.parse(local()?.getItem(UNLOCKED_KEY) || '[]') as string[]).includes(venue);
  } catch {
    return false;
  }
}

function markUnlocked(venue: string) {
  try {
    const list = JSON.parse(local()?.getItem(UNLOCKED_KEY) || '[]') as string[];
    if (!list.includes(venue)) local()?.setItem(UNLOCKED_KEY, JSON.stringify([...list, venue]));
  } catch {
    /* storage unavailable: the visitor will simply fill the form again next time */
  }
}

/** Previously entered details, to prefill the form for the next venue. */
export function savedContact(): Partial<LeadInput> {
  try {
    return JSON.parse(local()?.getItem(CONTACT_KEY) || '{}') as Partial<LeadInput>;
  } catch {
    return {};
  }
}

/** Store the request, then unlock the venue's contact details for this visitor. */
export async function submitLead(venue: string, input: LeadInput, owner?: string): Promise<void> {
  const guests = Number.parseInt(input.guests, 10);
  const lead: Record<string, unknown> = {
    venue,
    firstName: input.firstName.trim().slice(0, 80),
    email: input.email.trim().toLowerCase().slice(0, 200),
    consent: true,
  };
  if (input.phone.trim()) lead.phone = input.phone.trim().slice(0, 40);
  if (input.weddingDate) lead.weddingDate = input.weddingDate.slice(0, 10);
  if (Number.isFinite(guests) && guests > 0) lead.guests = Math.min(guests, 5000);

  if (trackingEnabled) {
    const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
    await addDoc(collection(db, 'leads'), { ...lead, at: serverTimestamp() });
    void track('lead', venue, owner);
  } else if (!firebaseConfigured) {
    console.warn('Firebase non configuré : la demande n’est pas enregistrée (voir .env.example).');
  }

  markUnlocked(venue);
  try {
    local()?.setItem(
      CONTACT_KEY,
      JSON.stringify({ firstName: input.firstName, email: input.email, phone: input.phone }),
    );
  } catch {
    /* ignore */
  }
}
