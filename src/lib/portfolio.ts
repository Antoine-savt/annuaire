import { firebaseConfigured, getDb } from './firebase';

/** A professional asking L'Édition to create their portfolio. */
export interface PortfolioInput {
  name: string;
  company: string;
  /** Vendor category slug (see src/vendors.ts), empty when not chosen yet. */
  category: string;
  email: string;
  phone: string;
  /** Current website or portfolio, to see what exists. */
  current: string;
  message: string;
}

export interface PortfolioContext {
  /** Account of the professional, when the request comes from their account. */
  uid?: string;
  /** Listing being edited, when there is one. */
  listingId?: string;
}

/** Store the request; L'Édition reads it in /admin. Saved in development too, so the form can be tested. */
export async function submitPortfolioRequest(input: PortfolioInput, context: PortfolioContext = {}): Promise<void> {
  const doc: Record<string, unknown> = {
    name: input.name.trim().slice(0, 120),
    company: input.company.trim().slice(0, 120),
    category: /^[a-z-]{2,40}$/.test(input.category) ? input.category : '',
    email: input.email.trim().toLowerCase().slice(0, 200),
    phone: input.phone.trim().slice(0, 40),
    consent: true,
  };
  if (input.current.trim()) doc.current = input.current.trim().slice(0, 200);
  if (input.message.trim()) doc.message = input.message.trim().slice(0, 2000);
  if (context.uid) doc.uid = context.uid;
  if (context.listingId) doc.listingId = context.listingId.slice(0, 120);

  if (!firebaseConfigured) {
    console.warn('Firebase non configuré : la demande de portfolio n’est pas enregistrée.');
    return;
  }
  const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
  await addDoc(collection(db, 'portfolioRequests'), { ...doc, at: serverTimestamp() });
}
