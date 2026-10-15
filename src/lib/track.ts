import { getDb, trackingEnabled } from './firebase';
import { proUid } from './proHint';

/** "visit" is one visit of the site (any page), the others concern one listing. */
export type EventType = 'visit' | 'view' | 'contact_open' | 'lead' | 'phone_click' | 'website_click' | 'portfolio_click' | 'save';

function local(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

// ---------- Team devices ----------

const TEAM_KEY = 'edition:equipe';

/**
 * Browsers of the L'Édition team: their activity is not counted, so the figures show real visitors.
 * Set automatically when an admin opens /admin, from the dashboard, or with ?stats=off on any page.
 */
export function isTeamDevice(): boolean {
  return local()?.getItem(TEAM_KEY) === '1';
}

export function setTeamDevice(team: boolean) {
  try {
    if (team) local()?.setItem(TEAM_KEY, '1');
    else local()?.removeItem(TEAM_KEY);
  } catch {
    /* storage unavailable: nothing to remember */
  }
}

/** Whether activity on a listing should be counted: not from the team, not from the listing's own professional. */
export function countsFor(owner?: string): boolean {
  if (isTeamDevice()) return false;
  return !owner || owner !== proUid();
}

// ---------- Robots ----------

/**
 * Crawlers and automated browsers that run JavaScript (most robots don't, and are never counted).
 * Matched on the user agent; automation tools also set navigator.webdriver.
 */
const ROBOT =
  /bot|crawl|spider|slurp|archiver|lighthouse|headless|inspectiontool|googleother|google-|mediapartners|adsbot|preview|facebookexternalhit|python|curl|wget|httpclient|okhttp|axios|phantom|selenium|puppeteer|playwright|pagespeed|gtmetrix|pingdom|uptime|monitor|screenshot|scraper/i;

function isRobot(): boolean {
  return navigator.webdriver || ROBOT.test(navigator.userAgent) || !navigator.languages?.length;
}

let engaged: Promise<void> | null = null;

/**
 * Resolves once a person is evidently there: a pointer movement, a tap or a key press, or 10 seconds on
 * the visible page. Crawlers with a normal-looking browser load pages and leave without either, so this
 * keeps them out of the figures; it also skips pages prerendered by the browser but never opened.
 */
function whenEngaged(): Promise<void> {
  engaged ??= new Promise((resolve) => {
    const inputs = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'] as const;
    let timer: number | undefined;
    const done = () => {
      inputs.forEach((name) => window.removeEventListener(name, done, true));
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('prerenderingchange', onVisibility);
      window.clearTimeout(timer);
      resolve();
    };
    const prerendering = () => Boolean((document as Document & { prerendering?: boolean }).prerendering);
    const onVisibility = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === 'visible' && !prerendering()) timer = window.setTimeout(done, 10_000);
    };
    inputs.forEach((name) => window.addEventListener(name, done, { capture: true, passive: true }));
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('prerenderingchange', onVisibility);
    onVisibility();
  });
  return engaged;
}

// ---------- Visits ----------

const SESSION_KEY = 'edition:session';
/** A visit ends after 30 minutes without activity, as in most audience tools. */
const SESSION_MS = 30 * 60_000;

interface Session {
  id: string;
  /** Last activity (milliseconds). */
  last: number;
  /** What was already counted in this visit: "visit", "view:<listing>". */
  counted: string[];
}

/**
 * The current visit, shared by every tab of the browser: opening several listings in new tabs is still
 * one visit and one visitor per listing. A random identifier, kept 30 minutes after the last page.
 */
function session(): Session {
  const now = Date.now();
  let current: Session | null = null;
  try {
    current = JSON.parse(local()?.getItem(SESSION_KEY) ?? 'null') as Session | null;
  } catch {
    current = null;
  }
  if (!current?.id || now - current.last > SESSION_MS) {
    current = { id: Math.random().toString(36).slice(2, 12) + now.toString(36), last: now, counted: [] };
  }
  current.last = now;
  return current;
}

function saveSession(s: Session) {
  try {
    local()?.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {
    /* private browsing: each page counts as its own visit */
  }
}

/**
 * Record an anonymous interaction with a listing (or a visit of the site, with an empty "venue").
 * "owner" is the account managing the listing, so the professional can see their own figures.
 * Never throws: statistics must not break the page.
 */
export async function track(type: EventType, venue: string, owner?: string): Promise<void> {
  if (typeof window === 'undefined' || !trackingEnabled || isRobot() || !countsFor(owner)) return;

  await whenEngaged();

  // The site and each listing page count once per visit, so refreshing or new tabs do not inflate the figures.
  const once = type === 'visit' ? 'visit' : type === 'view' ? `view:${venue}` : '';
  const s = session();
  if (once && s.counted.includes(once)) {
    saveSession(s);
    return;
  }
  if (once) s.counted.push(once);
  saveSession(s);

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
      session: s.id,
      path: location.pathname.slice(0, 200),
      referrer: referrer.slice(0, 120),
      ...(owner ? { owner } : {}),
      at: serverTimestamp(),
    });
  } catch (error) {
    // Not recorded: let the next page of this visit try again.
    if (once) {
      const retry = session();
      retry.counted = retry.counted.filter((key) => key !== once);
      saveSession(retry);
    }
    console.warn('Statistique non enregistrée', error);
  }
}
