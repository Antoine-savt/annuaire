import { useSyncExternalStore } from 'react';
import { ListingDoc } from './types';
import { setListingVenues } from './data';
import { setListingVendors } from './vendorListings';
import { isDisplayable, listingToVenue, listingToVendor, toListingDoc } from './lib/listings';
import { firebaseConfigured, getDb } from './lib/firebase';

/*
 * The catalog shown on the site = curated venues and vendors (in the code) + listings published by
 * professionals (Firestore). Published listings are fetched at build time and embedded in every page,
 * then refreshed in the browser with the ones published or changed since the build.
 */

let listings: ListingDoc[] = [];
let builtAt = 0;
/** Bumped when newer listings arrive; "refreshed" turns true once Firestore has been checked. */
let state = { version: 0, refreshed: false };
const listeners = new Set<() => void>();
/** Listings already checked against Firestore in this visit. */
const checked = new Set<string>();

function setState(next: typeof state) {
  state = next;
  listeners.forEach((notify) => notify());
}

function apply(list: ListingDoc[]) {
  listings = list.filter(isDisplayable);
  setListingVenues(listings.filter((l) => l.type === 'lieu').map(listingToVenue));
  setListingVendors(listings.filter((l) => l.type === 'prestataire').map(listingToVendor));
}

/** Initial data: from the build (server side) or the snapshot embedded in the page (browser). */
export function initCatalog(list: ListingDoc[], buildTime: number) {
  builtAt = buildTime;
  apply(list);
}

/**
 * Data to embed in a prerendered page. Descriptions (up to 4 000 characters each) are only kept for
 * the listings shown in full on that page; the others are fetched when someone opens them.
 */
export function catalogSnapshot(fullIds: string[] = []) {
  return {
    builtAt,
    listings: listings.map((l) => (fullIds.includes(l.id) ? l : { ...l, description: '', partial: true })),
  };
}

/** Read the snapshot embedded in the page by scripts/prerender.mjs, before the first render. */
export function loadEmbeddedCatalog() {
  const script = document.getElementById('catalog-data');
  if (!script?.textContent) return;
  try {
    const data = JSON.parse(script.textContent) as { builtAt: number; listings: ListingDoc[] };
    initCatalog(data.listings, data.builtAt);
  } catch (error) {
    console.warn('Catalogue intégré illisible', error);
  }
}

const SERVER_STATE = { version: 0, refreshed: false };

/** Catalog version (bumped when newer listings arrive, so pages re-render) and freshness. */
export function useCatalogState(): { version: number; refreshed: boolean } {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      return () => listeners.delete(notify);
    },
    () => state,
    () => SERVER_STATE,
  );
}

/**
 * Fetch listings published or updated since the build and merge them in.
 * Costs one read when nothing changed, so it can run on every visit.
 */
export async function refreshCatalog(): Promise<void> {
  if (state.refreshed) return;
  if (!firebaseConfigured) {
    setState({ ...state, refreshed: true });
    return;
  }
  let changed = false;
  try {
    const [db, fs] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
    const q = fs.query(
      fs.collection(db, 'listings'),
      fs.where('status', '==', 'published'),
      fs.where('updatedAt', '>', fs.Timestamp.fromMillis(builtAt)),
    );
    const snap = await fs.getDocs(q);
    const fresh = snap.docs.map((d) => toListingDoc(d.id, d.data()));
    fresh.forEach((l) => checked.add(l.id));
    if (fresh.length) {
      const ids = new Set(fresh.map((l) => l.id));
      apply([...listings.filter((l) => !ids.has(l.id)), ...fresh]);
      changed = true;
    }
  } catch (error) {
    console.warn('Fiches récentes non chargées', error);
  } finally {
    setState({ version: state.version + (changed ? 1 : 0), refreshed: true });
  }
}

/**
 * When a listing page opens: load the full listing if the page only had a light copy, and drop it
 * if it was unpublished or hidden since the build (the static pages are only updated by a rebuild).
 */
export async function checkListing(id: string): Promise<void> {
  if (checked.has(id) || !firebaseConfigured) return;
  checked.add(id);
  try {
    const [db, fs] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
    const snap = await fs.getDoc(fs.doc(db, 'listings', id));
    const doc = snap.exists() ? toListingDoc(snap.id, snap.data()) : null;
    if (!doc || !isDisplayable(doc)) removeListingLocally(id);
    else {
      const current = listings.find((l) => l.id === id);
      if (!current || current.partial || current.updatedAt !== doc.updatedAt) upsertListingLocally(doc);
    }
  } catch (error) {
    // Unpublished listings can no longer be read by visitors.
    const code = typeof error === 'object' && error && 'code' in error ? (error as { code: unknown }).code : '';
    if (code === 'permission-denied') removeListingLocally(id);
    else {
      checked.delete(id);
      console.warn('Fiche non vérifiée', error);
    }
  }
}

/** Show a listing the professional just saved right away in this browser (or remove it once unpublished). */
export function upsertListingLocally(doc: ListingDoc) {
  checked.add(doc.id);
  const current = listings.find((l) => l.id === doc.id);
  if (current && !current.partial && current.updatedAt === doc.updatedAt) return;
  apply([...listings.filter((l) => l.id !== doc.id), doc]);
  setState({ ...state, version: state.version + 1 });
}

export function removeListingLocally(id: string) {
  if (!listings.some((l) => l.id === id)) return;
  apply(listings.filter((l) => l.id !== id));
  setState({ ...state, version: state.version + 1 });
}
