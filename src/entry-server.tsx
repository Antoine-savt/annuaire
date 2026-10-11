import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { Router } from './router';
import { allPaths, getSeo, headTags, lastModified, matchRoute, unlistedPaths } from './routes';
import { site } from './site';
import { catalogSnapshot, initCatalog } from './catalog';
import { toListingDoc } from './lib/listings';
import { vendorId } from './vendorListings';

export { allPaths, lastModified, site, unlistedPaths };

/** Render one path to static HTML plus its head tags (used by scripts/prerender.mjs). */
export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <Router initialPath={path}>
        <App />
      </Router>
    </StrictMode>,
  );
  const seo = getSeo(matchRoute(path), path);
  return { html, title: seo.title, description: seo.description, noindex: Boolean(seo.noindex), head: headTags(seo) };
}

type RestValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  arrayValue?: { values?: RestValue[] };
  mapValue?: { fields?: Record<string, RestValue> };
};

/** Firestore REST value to plain JavaScript. */
function decode(v: RestValue): unknown {
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue' in v) return (v.arrayValue?.values ?? []).map(decode);
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue?.fields ?? {}).map(([k, x]) => [k, decode(x)]));
  return null;
}

/**
 * Load the listings published from professional accounts, so they get static pages (and the sitemap).
 * Without Firebase or network, the site is built with the curated catalog only and the browser
 * fetches every published listing.
 */
export async function prepareCatalog(): Promise<number> {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (!projectId || !apiKey) {
    initCatalog([], 0);
    return 0;
  }
  // Anything published from now on is fetched by the browser.
  const startedAt = Date.now();
  try {
    const emulator = process.env.FIRESTORE_EMULATOR_HOST;
    const base = emulator ? `http://${emulator}/v1` : 'https://firestore.googleapis.com/v1';
    const response = await fetch(
      `${base}/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'listings' }],
            where: { fieldFilter: { field: { fieldPath: 'status' }, op: 'EQUAL', value: { stringValue: 'published' } } },
          },
        }),
      },
    );
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    const rows = (await response.json()) as { document?: { name: string; fields: Record<string, RestValue> } }[];
    const docs = rows
      .filter((r) => r.document)
      .map(({ document: d }) => toListingDoc(d!.name.split('/').pop()!, decode({ mapValue: { fields: d!.fields } }) as Record<string, unknown>));
    // Curated listings withdrawn in /admin: no page, no sitemap entry.
    const removedResponse = await fetch(`${base}/projects/${projectId}/databases/(default)/documents/removed?key=${apiKey}&pageSize=300`);
    if (!removedResponse.ok) throw new Error(`${removedResponse.status} ${await removedResponse.text()}`);
    const removed = (((await removedResponse.json()) as { documents?: { name: string }[] }).documents ?? []).map((d) => d.name.split('/').pop()!);
    initCatalog(docs, startedAt, removed);
    return docs.length;
  } catch (error) {
    console.warn(`\n⚠  Fiches des professionnels non chargées (${String(error)}) : elles seront chargées par le navigateur.\n`);
    initCatalog([], 0);
    return 0;
  }
}

/** Catalog to embed in a page: the listing shown in full on that page keeps its description. */
export function catalogFor(path: string) {
  const route = matchRoute(path);
  const full =
    route.name === 'venue' && route.venue.ownerUid
      ? [route.venue.slug]
      : route.name === 'vendorPage' && route.vendor.ownerUid
        ? [vendorId(route.vendor)]
        : [];
  return catalogSnapshot(full);
}
