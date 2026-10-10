import { Article, Venue, Vendor, VendorCategory, Zone } from './types';
import { findVendorCategory, vendorCategories } from './vendors';
import { findVendor, vendors, vendorsIn } from './vendorListings';
import { findVenue, findZone, inCommune, venues, venuesInZone, zones } from './data';
import { articles, findArticle } from './articles';
import { imgUrl, photos, photoUrl } from './images';
import { absoluteUrl, site } from './site';
import { paths } from './paths';
import { homeFaq, listingFaq, vendorsHubFaq, venueFaq, zoneFaq } from './faq';
import { FaqItem } from './types';
import { plainText, wordCount } from './lib/richtext';

export type Route =
  | { name: 'home' }
  | { name: 'venue'; venue: Venue }
  | { name: 'zone'; zone: Zone }
  | { name: 'prestataires' }
  | { name: 'vendor'; category: VendorCategory }
  | { name: 'confidentialite' }
  | { name: 'referencer' }
  | { name: 'saved' }
  | { name: 'vendorPage'; vendor: Vendor; category: VendorCategory }
  | { name: 'login' }
  | { name: 'account' }
  | { name: 'listingEditor' }
  | { name: 'terms' }
  | { name: 'admin' }
  | { name: 'journal' }
  | { name: 'article'; article: Article }
  | { name: 'notFound' };

export { paths };

export function matchRoute(path: string): Route {
  if (path === '/') return { name: 'home' };
  if (path === paths.prestataires) return { name: 'prestataires' };
  if (path === paths.journal) return { name: 'journal' };
  if (path === paths.confidentialite) return { name: 'confidentialite' };
  if (path === paths.referencer) return { name: 'referencer' };
  if (path === paths.saved) return { name: 'saved' };
  if (path === paths.login) return { name: 'login' };
  if (path === paths.account) return { name: 'account' };
  if (path === paths.terms) return { name: 'terms' };
  if (path === paths.listingEditor) return { name: 'listingEditor' };

  const parts = path.split('/');
  if (parts.length === 4 && parts[1] === 'prestataires') {
    const category = findVendorCategory(parts[2]);
    const vendor = category ? findVendor(category.slug, parts[3]) : undefined;
    if (category && vendor) return { name: 'vendorPage', vendor, category };
  }
  if (path === paths.admin) return { name: 'admin' };

  const [, section, slug, extra] = path.split('/');
  if (slug && !extra) {
    if (section === 'lieux') {
      const venue = findVenue(slug);
      if (venue) return { name: 'venue', venue };
    }
    if (section === 'secteurs') {
      const zone = findZone(slug);
      if (zone) return { name: 'zone', zone };
    }
    if (section === 'prestataires') {
      const category = findVendorCategory(slug);
      if (category) return { name: 'vendor', category };
    }
    if (section === 'journal') {
      const article = findArticle(slug);
      if (article) return { name: 'article', article };
    }
  }
  return { name: 'notFound' };
}

/** Every indexable path, used for prerendering and the sitemap. */
export function allPaths(): string[] {
  return [
    paths.home,
    ...zones.map((z) => paths.zone(z.slug)),
    ...venues.map((v) => paths.venue(v.slug)),
    paths.journal,
    ...articles.map((a) => paths.article(a.slug)),
    paths.prestataires,
    ...vendorCategories.map((c) => paths.vendor(c.slug)),
    ...vendors.map((v) => paths.vendorPage(v.category, v.slug)),
    paths.referencer,
    paths.confidentialite,
    paths.terms,
  ];
}

/** Pages generated at build time but kept out of the sitemap (personal or private). */
export const unlistedPaths = [paths.admin, paths.saved, paths.login, paths.account, paths.listingEditor];

export interface Seo {
  title: string;
  description: string;
  path: string;
  image: string;
  type: 'website' | 'article';
  /** ISO dates for articles (article:published_time / modified_time). */
  published?: string;
  modified?: string;
  noindex?: boolean;
  jsonLd: object[];
}

// The hero photo is served locally, so it can only be shared when the public URL is known.
const DEFAULT_IMAGE = site.url ? absoluteUrl('/images/sortie-ceremonie-mariage.jpg') : imgUrl(photos.ceremonyAisle, 1200);

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqPage(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: plainText(item.a) },
    })),
  };
}

/** Last modification date of a page, for the sitemap. */
export function lastModified(path: string): string | undefined {
  const route = matchRoute(path);
  if (route.name === 'article') return route.article.updated ?? route.article.date;
  if (route.name === 'journal') {
    return articles.map((a) => a.updated ?? a.date).sort().reverse()[0];
  }
  return undefined;
}

function venueList(list: Venue[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.nom_du_lieu,
      url: absoluteUrl(paths.venue(v.slug)),
    })),
  };
}

/** Add the site name when the title still fits in a search result. */
function withBrand(title: string): string {
  const branded = `${title} | ${site.name}`;
  return branded.length <= 62 ? branded : title;
}

/** Cut a description at a word boundary so it is not truncated mid-word by search engines. */
function clamp(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '') + '…';
}

const home = { name: 'Accueil', path: '/' };

const lcFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export function getSeo(route: Route, path: string): Seo {
  const base = { path, image: DEFAULT_IMAGE, type: 'website' as const };

  switch (route.name) {
    case 'home':
      return {
        ...base,
        title: `Lieux de mariage dans le Var : châteaux et domaines | ${site.name}`,
        description: `${venues.length} lieux de réception pour un mariage dans le Var, à comparer par secteur, capacité, budget et hébergement : châteaux, bastides et domaines viticoles.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            alternateName: `${site.name} – ${site.tagline}`,
            url: absoluteUrl('/'),
            inLanguage: 'fr-FR',
          },
          venueList(venues),
          faqPage(homeFaq()),
        ],
      };

    case 'venue': {
      const v = route.venue;
      return {
        ...base,
        image: photoUrl(v.image, 1200),
        title: withBrand(`${v.nom_du_lieu} : mariage ${inCommune(v.commune)} (Var)`),
        description: clamp(`${v.nom_du_lieu}, lieu de mariage ${inCommune(v.commune)} (Var). ${v.summary} ${v.maxGuests ? `${v.guestsShort} invités` : 'Capacité sur demande'}, ${v.priceShort.toLowerCase()}.`),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'EventVenue',
            name: v.nom_du_lieu,
            description: v.description,
            image: photoUrl(v.image, 1200),
            address: {
              '@type': 'PostalAddress',
              addressLocality: v.commune,
              addressRegion: 'Var',
              addressCountry: 'FR',
            },
            ...(v.maxGuests ? { maximumAttendeeCapacity: v.maxGuests } : {}),
          },
          breadcrumb([home, { name: v.zone.name, path: paths.zone(v.zone.slug) }, { name: v.nom_du_lieu, path }]),
          faqPage(venueFaq(v)),
        ],
      };
    }

    case 'zone': {
      const z = route.zone;
      const list = venuesInZone(z.slug);
      return {
        ...base,
        image: list[0] ? photoUrl(list[0].image, 1200) : DEFAULT_IMAGE,
        title: `Lieux de mariage ${z.where} (Var) | ${site.name}`,
        description: `${list.length} lieu${list.length > 1 ? 'x' : ''} de réception pour un mariage ${z.where} (Var) : capacités, prix, hébergement et conseils pour choisir.`,
        jsonLd: [venueList(list), breadcrumb([home, { name: z.name, path }]), faqPage(zoneFaq(z))],
      };
    }

    case 'journal':
      return {
        ...base,
        title: `Le Journal : conseils pour se marier dans le Var | ${site.name}`,
        description:
          'Conseils pratiques et inspirations pour organiser un mariage dans le Var : choisir son lieu, sa saison, ses prestataires.',
        jsonLd: [breadcrumb([home, { name: 'Journal', path }])],
      };

    case 'article': {
      const a = route.article;
      return {
        ...base,
        type: 'article',
        image: imgUrl(a.image, 1200),
        title: withBrand(a.seoTitle ?? a.title),
        description: a.description,
        published: a.date,
        modified: a.updated ?? a.date,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: a.title,
            description: a.excerpt,
            image: imgUrl(a.image, 1200),
            datePublished: a.date,
            dateModified: a.updated ?? a.date,
            articleSection: a.category,
            wordCount: wordCount(a.body),
            inLanguage: 'fr-FR',
            author: { '@type': 'Organization', name: site.name },
            publisher: { '@type': 'Organization', name: site.name },
            mainEntityOfPage: absoluteUrl(path),
          },
          breadcrumb([home, { name: 'Journal', path: paths.journal }, { name: a.title, path }]),
          ...(a.faq.length ? [faqPage(a.faq)] : []),
        ],
      };
    }

    case 'prestataires':
      return {
        ...base,
        title: withBrand('Prestataires de mariage dans le Var'),
        description:
          'Photographes, traiteurs, DJ, fleuristes, wedding planners… Les prestataires de mariage dans le Var, quand les réserver et quoi leur demander.',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Prestataires de mariage dans le Var',
            url: absoluteUrl(path),
            inLanguage: 'fr-FR',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: vendorCategories.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.title,
              url: absoluteUrl(paths.vendor(c.slug)),
            })),
          },
          breadcrumb([home, { name: 'Prestataires', path }]),
          faqPage(vendorsHubFaq),
        ],
      };

    case 'vendor': {
      const c = route.category;
      return {
        ...base,
        image: imgUrl(c.image, 1200),
        title: withBrand(c.title),
        description: c.description,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: c.title,
            description: c.description,
            url: absoluteUrl(path),
            inLanguage: 'fr-FR',
            about: {
              '@type': 'Service',
              serviceType: c.title,
              areaServed: { '@type': 'AdministrativeArea', name: 'Var' },
            },
          },
          breadcrumb([home, { name: 'Prestataires', path: paths.prestataires }, { name: c.name, path }]),
          faqPage(c.faq),
          ...(vendorsIn(c.slug).length
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'ItemList',
                  itemListElement: vendorsIn(c.slug).map((v, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: {
                      '@type': 'LocalBusiness',
                      name: v.name,
                      description: v.summary,
                      address: { '@type': 'PostalAddress', addressLocality: v.commune, addressRegion: 'Var', addressCountry: 'FR' },
                    },
                  })),
                },
              ]
            : []),
        ],
      };
    }

    case 'confidentialite':
      return {
        ...base,
        title: `Confidentialité et données personnelles | ${site.name}`,
        description: `Quelles données ${site.name} collecte, pourquoi, combien de temps et comment exercer vos droits.`,
        jsonLd: [breadcrumb([home, { name: 'Confidentialité', path }])],
      };

    case 'referencer':
      return {
        ...base,
        title: withBrand('Référencer son lieu de mariage dans le Var'),
        description:
          'Château, domaine, bastide ou salle de réception dans le Var ? Référencez votre lieu sur notre annuaire et recevez des demandes de couples.',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Référencer son lieu de mariage dans le Var',
            description: `Inscription des lieux de réception du Var sur l'annuaire ${site.name}.`,
            url: absoluteUrl(path),
            inLanguage: 'fr-FR',
            audience: { '@type': 'BusinessAudience', audienceType: 'Propriétaires et gérants de lieux de réception' },
          },
          breadcrumb([home, { name: 'Référencer mon lieu', path }]),
          faqPage(listingFaq),
        ],
      };

    case 'vendorPage': {
      const { vendor: v, category: c } = route;
      const image = v.image ? photoUrl(v.image, 1200) : photoUrl(c.image, 1200);
      return {
        ...base,
        image,
        title: withBrand(`${v.name}, ${c.pro} ${inCommune(v.commune)}`),
        description: clamp(`${v.name}, ${c.pro} ${inCommune(v.commune)} (Var). ${v.summary} ${v.priceFrom ?? ''}`.trim()),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: v.name,
            description: v.description || v.summary,
            image,
            address: { '@type': 'PostalAddress', addressLocality: v.commune, addressRegion: 'Var', addressCountry: 'FR' },
            areaServed: { '@type': 'AdministrativeArea', name: 'Var' },
          },
          breadcrumb([
            home,
            { name: 'Prestataires', path: paths.prestataires },
            { name: c.name, path: paths.vendor(c.slug) },
            { name: v.name, path },
          ]),
        ],
      };
    }

    case 'login':
      return { ...base, title: withBrand('Espace professionnel'), description: 'Connexion à votre espace professionnel.', noindex: true, jsonLd: [] };

    case 'account':
      return { ...base, title: withBrand('Mon compte'), description: 'Votre espace professionnel.', noindex: true, jsonLd: [] };

    case 'listingEditor':
      return { ...base, title: withBrand('Ma fiche'), description: 'Créer ou modifier votre fiche.', noindex: true, jsonLd: [] };

    case 'terms':
      return {
        ...base,
        title: withBrand('Conditions d’utilisation pour les professionnels'),
        description: `Les conditions d'utilisation de l'espace professionnel de ${site.name} : compte, fiches, contenus, tarifs et données.`,
        jsonLd: [breadcrumb([home, { name: 'Conditions professionnels', path }])],
      };

    case 'saved':
      return {
        ...base,
        title: withBrand('Mes lieux enregistrés'),
        description: 'Votre sélection de lieux de mariage dans le Var, à comparer et à partager.',
        noindex: true,
        jsonLd: [],
      };

    case 'admin':
      return {
        ...base,
        title: `Statistiques | ${site.name}`,
        description: 'Espace réservé.',
        noindex: true,
        jsonLd: [],
      };

    case 'notFound':
      return {
        ...base,
        title: `Page introuvable | ${site.name}`,
        description: "Cette page n'existe pas ou a été déplacée.",
        noindex: true,
        jsonLd: [],
      };
  }
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Head tags (everything except <title>), each marked data-head so the client can swap them on navigation. */
export function headTags(seo: Seo): string {
  const url = absoluteUrl(seo.path);
  const tags = [
    `<meta data-head name="description" content="${esc(seo.description)}">`,
    `<meta data-head name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    site.url && !seo.noindex ? `<link data-head rel="canonical" href="${esc(url)}">` : '',
    `<meta data-head property="og:type" content="${seo.type}">`,
    `<meta data-head property="og:site_name" content="${esc(site.name)}">`,
    `<meta data-head property="og:locale" content="${site.locale}">`,
    `<meta data-head property="og:title" content="${esc(seo.title)}">`,
    `<meta data-head property="og:description" content="${esc(seo.description)}">`,
    site.url ? `<meta data-head property="og:url" content="${esc(url)}">` : '',
    `<meta data-head property="og:image" content="${esc(seo.image)}">`,
    seo.published ? `<meta data-head property="article:published_time" content="${seo.published}">` : '',
    seo.modified ? `<meta data-head property="article:modified_time" content="${seo.modified}">` : '',
    `<meta data-head name="twitter:card" content="summary_large_image">`,
    `<meta data-head name="twitter:title" content="${esc(seo.title)}">`,
    `<meta data-head name="twitter:description" content="${esc(seo.description)}">`,
    `<meta data-head name="twitter:image" content="${esc(seo.image)}">`,
    ...seo.jsonLd.map(
      (data) => `<script data-head type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** Client-side: replace the head tags after a navigation. */
export function applyHead(seo: Seo) {
  document.title = seo.title;
  document.head.querySelectorAll('[data-head]').forEach((el) => el.remove());
  document.head.insertAdjacentHTML('beforeend', headTags(seo));
}
