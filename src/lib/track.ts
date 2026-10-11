import { getDb, trackingEnabled } from './firebase';

/** "visit" is one visit of the site (any page), the others concern one listing. */
export type EventType = 'visit' | 'view' | 'contact_open' | 'lead' | 'phone_click' | 'website_click' | 'portfolio_click' | 'save';

function storage(kind: 'session' | 'local'): Storage | null {
  try {
    return kind === 'session' ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

/** Random id for the current browsing session, used only to count unique visitors. No cookie involved. */
function sessionId(): string {
  const store = storage('session');
  let id = store?.getItem('edition:session');
  if (!id) {
    id = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
    store?.setItem('edition:session', id);
  }
  return id;
}

function isBot(): boolean {
  return navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent);
}

/**
 * Record an anonymous interaction with a listing (or a visit of the site, with an empty "venue").
 * "owner" is the account managing the listing, so the professional can see their own figures.
 * Never throws: statistics must not break the page.
 */
export async function track(type: EventType, venue: string, owner?: string): Promise<void> {
  if (typeof window === 'undefined' || !trackingEnabled || isBot()) return;

  // The site and each listing page count once per session, so refreshing does not inflate the figures.
  const onceKey = type === 'visit' ? 'edition:visit' : type === 'view' ? `edition:viewed:${venue}` : '';
  const store = storage('session');
  if (onceKey) {
    if (store?.getItem(onceKey)) return;
    store?.setItem(onceKey, '1');
  }

  try {
    const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), import('firebase/firestore/lite')]);
    let referrer = '';
    try {
      referrer = document.referrer ? new URL(document.referrer).hostname : '';
    } catch {
      referrer = '';
    }
    await addDoc(collection(db, 'events'), {
      type,
      venue,
      session: sessionId(),
      path: location.pathname.slice(0, 200),
      referrer: referrer.slice(0, 120),
      ...(owner ? { owner } : {}),
      at: serverTimestamp(),
    });
  } catch (error) {
    // Not recorded: let the next page load of this session try again.
    if (onceKey) store?.removeItem(onceKey);
    console.warn('Statistique non enregistrée', error);
  }
}
