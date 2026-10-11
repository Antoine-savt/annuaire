import type { User } from 'firebase/auth';
import { ListingDoc, ListingStatus, UserProfile } from '../types';
import { staticVenues } from '../data';
import { getDb, getStorageInstance } from './firebase';
import { listingId, listingSlug, toListingDoc } from './listings';
import { getAuthInstance, signInWithGoogle } from './auth';

/*
 * Data of the professional accounts: profile, listings, photos, statistics and claims.
 * Loaded only on the account pages.
 */

const firestore = () => Promise.all([getDb(), import('firebase/firestore/lite')]);

// ---------- Profile ----------

export const emptyProfile: UserProfile = {
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
  role: '',
  intents: [],
  photoURL: '',
  email: '',
};

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const [db, fs] = await firestore();
  const snap = await fs.getDoc(fs.doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    firstName: String(d.firstName ?? ''),
    lastName: String(d.lastName ?? ''),
    phone: String(d.phone ?? ''),
    company: String(d.company ?? ''),
    role: String(d.role ?? ''),
    intents: Array.isArray(d.intents) ? d.intents.map(String) : [],
    photoURL: String(d.photoURL ?? ''),
    email: String(d.email ?? ''),
  };
}

const cleanProfile = (p: UserProfile) => ({
  firstName: p.firstName.trim().slice(0, 80),
  lastName: p.lastName.trim().slice(0, 80),
  phone: p.phone.trim().slice(0, 40),
  company: p.company.trim().slice(0, 120),
  role: p.role.trim().slice(0, 60),
  intents: p.intents.slice(0, 2),
  photoURL: p.photoURL.slice(0, 1000),
  email: p.email.trim().slice(0, 200),
});

/** Create the profile at sign-up (accepting the terms) or update it. */
export async function saveProfile(uid: string, profile: UserProfile, isNew: boolean): Promise<void> {
  const [db, fs] = await firestore();
  const ref = fs.doc(db, 'users', uid);
  if (isNew) {
    await fs.setDoc(ref, {
      ...cleanProfile(profile),
      termsAcceptedAt: fs.serverTimestamp(),
      createdAt: fs.serverTimestamp(),
      updatedAt: fs.serverTimestamp(),
    });
  } else {
    await fs.updateDoc(ref, { ...cleanProfile(profile), updatedAt: fs.serverTimestamp() });
  }
}

// ---------- Photos ----------

/** Resize a photo in the browser (longest side 1600 px, JPEG) so pages stay light. */
async function resizeImage(file: File, maxSize: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image illisible'))), 'image/jpeg', 0.82),
  );
}

/** Google sign-in; the first time, the profile is created from the Google account. */
export async function signInWithGoogleProfile(): Promise<void> {
  const { user: g } = await signInWithGoogle();
  if (!(await getProfile(g.uid))) {
    const [firstName = '', ...rest] = (g.displayName ?? '').split(' ');
    await saveProfile(
      g.uid,
      { ...emptyProfile, firstName, lastName: rest.join(' '), email: g.email ?? '', photoURL: g.photoURL ?? '' },
      true,
    );
  }
}

/** Upload a photo under the account's folder and return its public URL. */
export async function uploadPhoto(uid: string, folder: 'profile' | 'listings', file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Ce fichier n’est pas une image.');
  const [storage, { ref, uploadBytes, getDownloadURL }] = await Promise.all([getStorageInstance(), import('firebase/storage')]);
  const blob = await resizeImage(file, folder === 'profile' ? 600 : 1600);
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const path = folder === 'profile' ? `users/${uid}/${name}` : `listings/${uid}/${name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType: 'image/jpeg', cacheControl: 'public, max-age=31536000' });
  return getDownloadURL(storageRef);
}

/** Remove an uploaded photo; ignores photos that are already gone. */
export async function deletePhoto(url: string): Promise<void> {
  if (!url.includes('firebasestorage') && !url.includes(':9199/')) return;
  try {
    const [storage, { ref, deleteObject }] = await Promise.all([getStorageInstance(), import('firebase/storage')]);
    await deleteObject(ref(storage, url));
  } catch (error) {
    console.warn('Photo non supprimée', error);
  }
}

// ---------- Listings ----------

/** What the listing form edits (numbers as text for the inputs). */
export interface ListingDraft {
  type: ListingDoc['type'];
  category: string;
  name: string;
  commune: string;
  zone: string;
  summary: string;
  description: string;
  tags: string[];
  highlight: string;
  phone: string;
  website: string;
  instagram: string;
  portfolio: string;
  photos: string[];
  venueType: string;
  guestsMin: string;
  guestsMax: string;
  sleeps: string;
  priceFrom: string;
  priceDetails: string;
}

export function draftFromListing(l: ListingDoc): ListingDraft {
  const n = (v: number | null) => (v === null ? '' : String(v));
  return {
    type: l.type,
    category: l.category,
    name: l.name,
    commune: l.commune,
    zone: l.zone,
    summary: l.summary,
    description: l.description,
    tags: [...l.tags, '', '', ''].slice(0, 3),
    highlight: l.highlight,
    phone: l.phone,
    website: l.website,
    instagram: l.instagram,
    portfolio: l.portfolio,
    photos: l.photos,
    venueType: l.venueType,
    guestsMin: n(l.guestsMin),
    guestsMax: n(l.guestsMax),
    sleeps: l.sleeps ? String(l.sleeps) : '',
    priceFrom: n(l.priceFrom),
    priceDetails: l.priceDetails,
  };
}

const toInt = (value: string, max: number) => {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? Math.min(Number(digits), max) : null;
};

function normalizeWebsite(url: string): string {
  const u = url.trim();
  if (!u) return '';
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

/** Fields saved in Firestore for a draft (everything except identity and timestamps). */
function listingFields(d: ListingDraft) {
  return {
    name: d.name.trim().slice(0, 120),
    commune: d.commune.trim().slice(0, 80),
    zone: d.zone.trim().slice(0, 60),
    summary: d.summary.trim().slice(0, 200),
    description: d.description.trim().slice(0, 4000),
    tags: d.tags.map((t) => t.trim().slice(0, 30)).filter(Boolean).slice(0, 3),
    highlight: d.highlight.trim().slice(0, 300),
    phone: d.phone.trim().slice(0, 40),
    website: normalizeWebsite(d.website).slice(0, 200),
    instagram: d.instagram.trim().replace(/^@/, '').slice(0, 120),
    portfolio: d.type === 'prestataire' ? normalizeWebsite(d.portfolio).slice(0, 200) : '',
    photos: d.photos.slice(0, 8),
    venueType: d.type === 'lieu' ? d.venueType.slice(0, 60) : '',
    guestsMin: d.type === 'lieu' ? toInt(d.guestsMin, 10000) : null,
    guestsMax: d.type === 'lieu' ? toInt(d.guestsMax, 10000) : null,
    sleeps: d.type === 'lieu' ? toInt(d.sleeps, 10000) ?? 0 : 0,
    priceFrom: d.type === 'lieu' ? toInt(d.priceFrom, 10000000) : null,
    priceDetails: d.priceDetails.trim().slice(0, 200),
  };
}

/** Whether a document exists; one we are not allowed to read (someone else's draft) counts as taken. */
const taken = (snap: Promise<{ exists(): boolean }>) => snap.then((s) => s.exists(), () => true);

/** Find a free address for a new listing ("chateau-x", then "chateau-x-2"…). */
async function freeSlug(d: ListingDraft): Promise<string> {
  const [db, fs] = await firestore();
  const base = listingSlug(d.name);
  const curated = new Set(staticVenues.map((v) => v.slug));
  for (let i = 1; i < 30; i++) {
    const slug = i === 1 ? base : `${base}-${i}`;
    if (d.type === 'lieu' && curated.has(slug)) continue;
    const id = listingId(d.type, d.category, slug);
    const [listingTaken, reservedTaken] = await Promise.all([
      taken(fs.getDoc(fs.doc(db, 'listings', id))),
      d.type === 'lieu' ? taken(fs.getDoc(fs.doc(db, 'reserved', id))) : Promise.resolve(false),
    ]);
    if (!listingTaken && !reservedTaken) return slug;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function createListing(uid: string, d: ListingDraft, status: ListingStatus): Promise<ListingDoc> {
  const [db, fs] = await firestore();
  const slug = await freeSlug(d);
  const id = listingId(d.type, d.category, slug);
  const ref = fs.doc(db, 'listings', id);
  await fs.setDoc(ref, {
    ownerUid: uid,
    type: d.type,
    category: d.type === 'lieu' ? 'lieu' : d.category,
    slug,
    status,
    ...listingFields(d),
    createdAt: fs.serverTimestamp(),
    updatedAt: fs.serverTimestamp(),
  });
  const snap = await fs.getDoc(ref);
  return toListingDoc(snap.id, snap.data() ?? {});
}

export async function updateListing(id: string, d: ListingDraft, status: ListingStatus): Promise<ListingDoc> {
  const [db, fs] = await firestore();
  const ref = fs.doc(db, 'listings', id);
  await fs.updateDoc(ref, { ...listingFields(d), status, updatedAt: fs.serverTimestamp() });
  const snap = await fs.getDoc(ref);
  return toListingDoc(snap.id, snap.data() ?? {});
}

export async function setListingStatus(id: string, status: ListingStatus): Promise<void> {
  const [db, fs] = await firestore();
  await fs.updateDoc(fs.doc(db, 'listings', id), { status, updatedAt: fs.serverTimestamp() });
}

export async function getListing(id: string): Promise<ListingDoc | null> {
  const [db, fs] = await firestore();
  const snap = await fs.getDoc(fs.doc(db, 'listings', id));
  return snap.exists() ? toListingDoc(snap.id, snap.data()) : null;
}

export async function myListings(uid: string): Promise<ListingDoc[]> {
  const [db, fs] = await firestore();
  const snap = await fs.getDocs(fs.query(fs.collection(db, 'listings'), fs.where('ownerUid', '==', uid)));
  return snap.docs.map((d) => toListingDoc(d.id, d.data())).sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function deleteListing(l: ListingDoc): Promise<void> {
  const [db, fs] = await firestore();
  await fs.deleteDoc(fs.doc(db, 'listings', l.id));
  await Promise.all(l.photos.map(deletePhoto));
}

// ---------- Statistics of the professional's listings ----------

export interface ListingStats {
  /** People who opened the listing page or saved it from a list, counted once per session. */
  visitors: number;
  saves: number;
  opens: number;
  leads: number;
  clicks: number;
}

export const emptyStats: ListingStats = { visitors: 0, saves: 0, opens: 0, leads: 0, clicks: 0 };

/** Figures for each listing id, from the anonymous statistics recorded with the owner's id. */
export async function myStats(uid: string): Promise<Map<string, ListingStats>> {
  const [db, fs] = await firestore();
  const snap = await fs.getDocs(fs.query(fs.collection(db, 'events'), fs.where('owner', '==', uid)));
  const stats = new Map<string, ListingStats & { sessions: Set<string> }>();
  for (const doc of snap.docs) {
    const e = doc.data();
    const id = String(e.venue);
    if (!stats.has(id)) stats.set(id, { ...emptyStats, sessions: new Set() });
    const s = stats.get(id)!;
    // Visitors include couples who saved the listing from a list without opening its page.
    s.sessions.add(String(e.session));
    if (e.type === 'save') s.saves++;
    else if (e.type === 'contact_open') s.opens++;
    else if (e.type === 'lead') s.leads++;
    else if (e.type === 'phone_click' || e.type === 'website_click' || e.type === 'portfolio_click') s.clicks++;
  }
  return new Map([...stats].map(([id, { sessions, ...s }]) => [id, { ...s, visitors: sessions.size }]));
}

// ---------- Claims of curated venues ----------

export interface Claim {
  id: string;
  venueSlug: string;
  status: string;
  at: number;
}

export async function createClaim(user: User, name: string, venueSlug: string, message: string): Promise<void> {
  const [db, fs] = await firestore();
  await fs.addDoc(fs.collection(db, 'claims'), {
    uid: user.uid,
    email: (user.email ?? '').slice(0, 200),
    name: name.slice(0, 160),
    venueSlug,
    message: message.trim().slice(0, 1000),
    status: 'pending',
    at: fs.serverTimestamp(),
  });
}

export async function myClaims(uid: string): Promise<Claim[]> {
  const [db, fs] = await firestore();
  const snap = await fs.getDocs(fs.query(fs.collection(db, 'claims'), fs.where('uid', '==', uid)));
  return snap.docs.map((d) => {
    const data = d.data();
    const at = data.at && typeof data.at.toMillis === 'function' ? data.at.toMillis() : 0;
    return { id: d.id, venueSlug: String(data.venueSlug), status: String(data.status), at };
  });
}

// ---------- Account deletion ----------

/** Delete the listings, photos and profile, then the account itself. */
export async function deleteAccount(user: User, profile: UserProfile | null): Promise<void> {
  const [db, fs] = await firestore();
  const listings = await myListings(user.uid);
  for (const l of listings) await deleteListing(l);
  if (profile?.photoURL) await deletePhoto(profile.photoURL);
  await fs.deleteDoc(fs.doc(db, 'users', user.uid));
  const [{ deleteUser }] = await Promise.all([import('firebase/auth'), getAuthInstance()]);
  await deleteUser(user);
}
