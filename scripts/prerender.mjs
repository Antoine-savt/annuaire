// Prerenders every route to static HTML so search engines get full content,
// then writes sitemap.xml, robots.txt and 404.html. Run after both Vite builds.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');

const { render, allPaths, sitemapFor, unlistedPaths, site, prepareCatalog, catalogFor } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
// Listings published from professional accounts get their own static pages too.
const listingCount = await prepareCatalog();
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const problems = [];
const known = new Set();

function page(urlPath) {
  const { html, lang, title, description, noindex, head } = render(urlPath);
  if (!noindex) {
    if (title.length > 65) problems.push(`Titre long (${title.length} car.) sur ${urlPath} : ${title}`);
    if (description.length > 165) problems.push(`Description longue (${description.length} car.) sur ${urlPath}`);
  }
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (!/\.[a-z0-9]+$/i.test(href)) known.add(`${href}|${urlPath}`);
  }
  const escapedTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // Same catalog in the browser as in this HTML, so React can hydrate it. "<" is escaped: the data comes from users.
  const catalog = JSON.stringify(catalogFor(urlPath)).replace(/</g, '\\u003c');
  return template
    .replace(/<html lang="[a-z]+"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapedTitle}</title>`)
    .replace('<!--head-->', head)
    .replace(
      '<div id="root"><!--app--></div>',
      `<div id="root" data-path="${urlPath}">${html}</div>\n    <script id="catalog-data" type="application/json">${catalog}</script>`,
    );
}

const paths = allPaths();
for (const urlPath of [...paths, ...unlistedPaths]) {
  // "/lieux/x" is written to lieux/x.html: static hosts (Netlify, Cloudflare Pages, Firebase with cleanUrls) serve it
  // at /lieux/x directly, whereas lieux/x/index.html makes them redirect to /lieux/x/ (canonical URLs have no slash).
  const file = urlPath === '/' ? path.join(dist, 'index.html') : path.join(dist, `${urlPath}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(urlPath));
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

// Every internal link must point to a generated page.
const pages = new Set([...paths, ...unlistedPaths]);
for (const entry of known) {
  const [href, from] = entry.split('|');
  const target = href.length > 1 ? href.replace(/\/+$/, '') : href;
  if (!pages.has(target) && from !== '/404') problems.push(`Lien interne cassé vers ${href} (depuis ${from})`);
}

if (site.url) {
  // One <url> per page, with its real last edit (no date when unknown rather than "today"), the same page
  // in the other language (hreflang, on both sides as Google requires) and its own photos.
  const xml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const urls = paths.map((p) => {
    const { lastmod, alternates, images } = sitemapFor(p);
    const lines = [`    <loc>${xml(site.url + p)}</loc>`];
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
    if (alternates.fr && alternates.en) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="fr" href="${xml(site.url + alternates.fr)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${xml(site.url + alternates.en)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(site.url + alternates.fr)}"/>`,
      );
    }
    for (const image of images) {
      lines.push(`    <image:image><image:loc>${xml(image.loc)}</image:loc><image:title>${xml(image.title)}</image:title></image:image>`);
    }
    return ['  <url>', ...lines, '  </url>'].join('\n');
  });
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`,
  );
}
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin\n${site.url ? `\nSitemap: ${site.url}/sitemap.xml\n` : ''}`,
);

fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${paths.length} pages + 404.html into dist/ (${listingCount} fiches de professionnels)`);
if (problems.length) console.warn(`\n⚠  SEO :\n   ${problems.join('\n   ')}\n`);
else console.log('SEO : titres, descriptions et liens internes OK');
if (!site.contactEmail || !site.publisher) {
  console.warn(
    '\n⚠  site.publisher / site.contactEmail are empty in src/site.ts: the privacy page cannot name who\n' +
      '   collects the contact requests. Fill them in before going live (required by the GDPR).\n',
  );
}
if (!site.url) {
  console.warn(
    '\n⚠  SITE_URL is not set: canonical links, og:url and sitemap.xml were skipped.\n' +
      '   Set SITE_URL=https://votre-domaine.fr in .env (see .env.example) and rebuild.\n',
  );
}
