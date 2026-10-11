import { Article, Venue, Vendor, VendorCategory, Zone } from './types';
import { findVendorCategory, vendorCategories } from './vendors';
import { findVendor, vendors, vendorsIn } from './vendorListings';
import { findVenue, findZone, inCommune, regionOf, venues, venuesInZone, zoneHref, zones } from './data';
import { articles, findArticle } from './articles';
import { imgUrl, photos, photoUrl } from './images';
import { absoluteUrl, site } from './site';
import { paths, pathsEn, pathsFor } from './paths';
import { articleSlugsEn, articleSlugsFr, categorySlugsFr } from './i18n/slugs';
import { Lang, langOf, translator } from './i18n/lang';
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

/** Public page of the English site from its address (without the "/en" prefix): French slugs are mapped back. */
function matchEnglish(path: string): Route {
  const rest = path === '/en' ? '/' : path.slice(3);
  if (rest === '/') return { name: 'home' };
  if (rest === '/vendors') return { name: 'prestataires' };
  if (rest === '/journal') return { name: 'journal' };
  if (rest === '/privacy') return { name: 'confidentialite' };
  if (rest === '/saved-venues') return { name: 'saved' };

  const [, section, slug, extra, more] = rest.split('/');
  if (!slug || more) return { name: 'notFound' };
  if (section === 'vendors') {
    const category = findVendorCategory(categorySlugsFr[slug] ?? '');
    if (category && !extra) return { name: 'vendor', category };
    const vendor = category && extra ? findVendor(category.slug, extra) : undefined;
    if (category && vendor) return { name: 'vendorPage', vendor, category };
    return { name: 'notFound' };
  }
  if (extra) return { name: 'notFound' };
  if (section === 'venues') {
    const venue = findVenue(slug);
    if (venue) return { name: 'venue', venue };
  }
  if (section === 'areas') {
    const zone = findZone(slug);
    if (zone) return { name: 'zone', zone };
  }
  if (section === 'journal') {
    const article = articleSlugsFr[slug] ? findArticle(articleSlugsFr[slug]) : undefined;
    if (article) return { name: 'article', article };
  }
  return { name: 'notFound' };
}

export function matchRoute(path: string): Route {
  if (langOf(path) === 'en') return matchEnglish(path);
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

/** Articles available in a language (some articles for professionals exist in French only). */
export const articlesIn = (lang: Lang) => (lang === 'en' ? articles.filter((a) => articleSlugsEn[a.slug]) : articles);

/**
 * Address of a page in the other language, for the language switch and the hreflang links;
 * undefined when the page exists in one language only (professional area, some articles).
 */
export function routePath(route: Route, lang: Lang): string | undefined {
  const p = pathsFor(lang);
  switch (route.name) {
    case 'home':
      return p.home;
    case 'venue':
      return p.venue(route.venue.slug);
    case 'zone':
      return p.zone(route.zone.slug);
    case 'journal':
      return p.journal;
    case 'article':
      return lang === 'en' && !articleSlugsEn[route.article.slug] ? undefined : p.article(route.article.slug);
    case 'prestataires':
      return p.prestataires;
    case 'vendor':
      return p.vendor(route.category.slug);
    case 'vendorPage':
      return p.vendorPage(route.category.slug, route.vendor.slug);
    case 'confidentialite':
      return p.confidentialite;
    case 'saved':
      return p.saved;
    default:
      return undefined;
  }
}

/** Indexable paths of one language. */
function publicPaths(lang: Lang): string[] {
  const p = pathsFor(lang);
  return [
    p.home,
    ...zones.map((z) => p.zone(z.slug)),
    ...venues.map((v) => p.venue(v.slug)),
    p.journal,
    ...articlesIn(lang).map((a) => p.article(a.slug)),
    p.prestataires,
    ...vendorCategories.map((c) => p.vendor(c.slug)),
    ...vendors.map((v) => p.vendorPage(v.category, v.slug)),
    ...(lang === 'fr' ? [paths.referencer] : []),
    p.confidentialite,
    ...(lang === 'fr' ? [paths.terms] : []),
  ];
}

/** Every indexable path, in both languages, used for prerendering and the sitemap. */
export function allPaths(): string[] {
  return [...publicPaths('fr'), ...publicPaths('en')];
}

/** Pages generated at build time but kept out of the sitemap (personal or private). */
export const unlistedPaths = [paths.admin, paths.saved, pathsEn.saved, paths.login, paths.account, paths.listingEditor];

export interface Seo {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  /** Same page in each language, for the hreflang links. */
  alternates: Partial<Record<Lang, string>>;
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

/**
 * Last edit of the content written in the code (curated venues, areas, vendor categories, fixed pages).
 * Change it when editing that content: search engines trust a sitemap whose dates only move when pages do.
 */
const CURATED_UPDATED = '2026-10-12';

const isoDay = (ms?: number) => (ms ? new Date(ms).toISOString().slice(0, 10) : undefined);
const latest = (dates: (string | undefined)[]) => dates.filter((d): d is string => !!d).sort().reverse()[0];
const venueDate = (v: Venue) => isoDay(v.updatedAt) ?? CURATED_UPDATED;
const vendorDate = (v: Vendor) => isoDay(v.updatedAt) ?? CURATED_UPDATED;
const articleDate = (a: Article) => a.updated ?? a.date;

export interface SitemapEntry {
  lastmod?: string;
  /** Same page in each language (hreflang). */
  alternates: Partial<Record<Lang, string>>;
  /** Photos of the page, for Google Images. */
  images: { loc: string; title: string }[];
}

/** What the sitemap says about a page: real last edit, other language, own photos. */
export function sitemapEntry(path: string): SitemapEntry {
  const lang = langOf(path);
  const route = matchRoute(path);
  const alternates = { fr: routePath(route, 'fr'), en: routePath(route, 'en') };
  const entry = (lastmod: string | undefined, images: SitemapEntry['images'] = []) => ({ lastmod, alternates, images });
  switch (route.name) {
    case 'home':
      return entry(latest([...venues.map(venueDate), ...articlesIn(lang).map(articleDate)]));
    case 'venue': {
      const v = route.venue;
      // Curated venues show illustrative stock photos: only real photos of the venue are declared.
      const photos = v.illustrative ? [] : v.gallery.map((id) => ({ loc: photoUrl(id, 1600), title: v.nom_du_lieu }));
      return entry(venueDate(v), photos);
    }
    case 'zone':
      return entry(latest([CURATED_UPDATED, ...venuesInZone(route.zone.slug).map(venueDate)]));
    case 'journal':
      return entry(latest(articlesIn(lang).map(articleDate)));
    case 'article':
      return entry(articleDate(route.article), [{ loc: imgUrl(route.article.image, 1200), title: route.article.title }]);
    case 'prestataires':
      return entry(latest([CURATED_UPDATED, ...vendors.map(vendorDate)]));
    case 'vendor':
      return entry(latest([CURATED_UPDATED, ...vendorsIn(route.category.slug).map(vendorDate)]));
    case 'vendorPage': {
      const v = route.vendor;
      const photos = v.ownerUid ? (v.photos ?? []).map((url) => ({ loc: photoUrl(url, 1600), title: v.name })) : [];
      return entry(vendorDate(v), photos);
    }
    default:
      return entry(CURATED_UPDATED);
  }
}

function venueList(list: Venue[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.nom_du_lieu,
      url: absoluteUrl(pathsFor(lang).venue(v.slug)),
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

/** "à Lorgues" / "in Lorgues". */
const placeIn = (commune: string, lang: Lang) => (lang === 'en' ? `in ${commune}` : inCommune(commune));

export function getSeo(route: Route, path: string): Seo {
  const lang = langOf(path);
  const t = translator(lang);
  const p = pathsFor(lang);
  const inLanguage = lang === 'en' ? 'en-GB' : 'fr-FR';
  const home = { name: t('Accueil', 'Home'), path: p.home };
  const base = {
    path,
    lang,
    alternates: { fr: routePath(route, 'fr'), en: routePath(route, 'en') },
    image: DEFAULT_IMAGE,
    type: 'website' as const,
  };

  switch (route.name) {
    case 'home':
      return {
        ...base,
        title: t(
          `Lieux de mariage dans le Var : châteaux et domaines | ${site.name}`,
          `Wedding venues in the Var, Provence | ${site.name}`,
        ),
        description: t(
          `${venues.length} lieux de réception pour un mariage dans le Var, à comparer par secteur, capacité, budget et hébergement : châteaux, bastides et domaines viticoles.`,
          `${venues.length} wedding venues in the Var, Provence, to compare by area, capacity, budget and accommodation: châteaux, bastides and wine estates.`,
        ),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            alternateName: `${site.name} – ${t(site.tagline, 'Wedding venues in the Var')}`,
            url: absoluteUrl(p.home),
            inLanguage,
          },
          venueList(venues, lang),
          faqPage(homeFaq(lang)),
        ],
      };

    case 'venue': {
      const v = route.venue;
      const area = zoneHref(v.zone, lang);
      return {
        ...base,
        image: photoUrl(v.image, 1200),
        title: withBrand(
          t(
            `${v.nom_du_lieu} : mariage ${inCommune(v.commune)} (${regionOf(v)})`,
            `${v.nom_du_lieu}: wedding venue, ${v.commune}`,
          ),
        ),
        description: clamp(
          t(
            `${v.nom_du_lieu}, lieu de mariage ${inCommune(v.commune)} (${regionOf(v)}). ${v.summary} ${v.maxGuests ? `${v.guestsShort} invités` : 'Capacité sur demande'}, ${v.priceShort.toLowerCase()}.`,
            `${v.nom_du_lieu}, wedding venue in ${v.commune} (${regionOf(v)}, Provence). ${v.summary} ${v.maxGuests ? `${v.guestsShort} guests` : 'Capacity on request'}, ${v.priceShort.toLowerCase()}.`,
          ),
        ),
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
              addressRegion: regionOf(v),
              addressCountry: 'FR',
            },
            ...(v.maxGuests ? { maximumAttendeeCapacity: v.maxGuests } : {}),
          },
          breadcrumb([home, ...(area ? [{ name: v.zone.name, path: area }] : []), { name: v.nom_du_lieu, path }]),
          faqPage(venueFaq(v, lang)),
        ],
      };
    }

    case 'zone': {
      const z = route.zone;
      const list = venuesInZone(z.slug);
      const s = list.length > 1;
      return {
        ...base,
        image: list[0] ? photoUrl(list[0].image, 1200) : DEFAULT_IMAGE,
        title: t(`Lieux de mariage ${z.where} (Var) | ${site.name}`, `Wedding venues ${z.where} (Var) | ${site.name}`),
        description: t(
          `${list.length} lieu${s ? 'x' : ''} de réception pour un mariage ${z.where} (Var) : capacités, prix, hébergement et conseils pour choisir.`,
          `${list.length} wedding venue${s ? 's' : ''} ${z.where}, in the Var (Provence): capacity, prices, accommodation and advice on choosing.`,
        ),
        jsonLd: [venueList(list, lang), breadcrumb([home, { name: z.name, path }]), faqPage(zoneFaq(z, lang))],
      };
    }

    case 'journal':
      return {
        ...base,
        title: t(`Le Journal : conseils pour se marier dans le Var | ${site.name}`, `Journal: advice for a wedding in the Var | ${site.name}`),
        description: t(
          'Conseils pratiques et inspirations pour organiser un mariage dans le Var : choisir son lieu, sa saison, ses prestataires.',
          'Practical advice and inspiration for planning a wedding in the Var, Provence: choosing your venue, your season and your vendors.',
        ),
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
            inLanguage,
            author: { '@type': 'Organization', name: site.name },
            publisher: { '@type': 'Organization', name: site.name },
            mainEntityOfPage: absoluteUrl(path),
            ...(a.mentions?.length
              ? { mentions: a.mentions.map((m) => ({ '@type': 'Organization', name: m.name, url: m.url })) }
              : {}),
          },
          breadcrumb([home, { name: 'Journal', path: p.journal }, { name: a.title, path }]),
          ...(a.faq.length ? [faqPage(a.faq)] : []),
        ],
      };
    }

    case 'prestataires': {
      const name = t('Prestataires de mariage dans le Var', 'Wedding vendors in the Var');
      return {
        ...base,
        title: withBrand(name),
        description: t(
          'Photographes, traiteurs, DJ, fleuristes, wedding planners… Les prestataires de mariage dans le Var, quand les réserver et quoi leur demander.',
          'Photographers, caterers, DJs, florists, wedding planners… Wedding vendors in the Var, Provence: when to book them and what to ask.',
        ),
        jsonLd: [
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name, url: absoluteUrl(path), inLanguage },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: vendorCategories.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.title,
              url: absoluteUrl(p.vendor(c.slug)),
            })),
          },
          breadcrumb([home, { name: t('Prestataires', 'Vendors'), path }]),
          faqPage(vendorsHubFaq(lang)),
        ],
      };
    }

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
            inLanguage,
            about: {
              '@type': 'Service',
              serviceType: c.title,
              areaServed: { '@type': 'AdministrativeArea', name: 'Var' },
            },
          },
          breadcrumb([home, { name: t('Prestataires', 'Vendors'), path: p.prestataires }, { name: c.name, path }]),
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
        title: t(`Confidentialité et données personnelles | ${site.name}`, `Privacy and personal data | ${site.name}`),
        description: t(
          `Quelles données ${site.name} collecte, pourquoi, combien de temps et comment exercer vos droits.`,
          `What data ${site.name} collects, why, for how long, and how to exercise your rights.`,
        ),
        jsonLd: [breadcrumb([home, { name: t('Confidentialité', 'Privacy'), path }])],
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
        title: withBrand(`${v.name}, ${c.pro} ${placeIn(v.commune, lang)}`),
        description: clamp(`${v.name}, ${c.pro} ${placeIn(v.commune, lang)} (Var). ${v.summary} ${v.priceFrom ?? ''}`.trim()),
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
            { name: t('Prestataires', 'Vendors'), path: p.prestataires },
            { name: c.name, path: p.vendor(c.slug) },
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
        title: withBrand(t('Mes lieux enregistrés', 'My saved venues')),
        description: t(
          'Votre sélection de lieux de mariage dans le Var, à comparer et à partager.',
          'Your shortlist of wedding venues in the Var, to compare and share.',
        ),
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
        title: t(`Page introuvable | ${site.name}`, `Page not found | ${site.name}`),
        description: t("Cette page n'existe pas ou a été déplacée.", 'This page does not exist or has moved.'),
        noindex: true,
        jsonLd: [],
      };
  }
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const OG_LOCALE: Record<Lang, string> = { fr: 'fr_FR', en: 'en_GB' };

/** Head tags (everything except <title>), each marked data-head so the client can swap them on navigation. */
export function headTags(seo: Seo): string {
  const url = absoluteUrl(seo.path);
  const { fr, en } = seo.alternates;
  // Both languages of the page, so search engines show each visitor the right one.
  const hreflang =
    site.url && !seo.noindex && fr && en
      ? [
          `<link data-head rel="alternate" hreflang="fr" href="${esc(absoluteUrl(fr))}">`,
          `<link data-head rel="alternate" hreflang="en" href="${esc(absoluteUrl(en))}">`,
          `<link data-head rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(fr))}">`,
        ]
      : [];
  const other: Lang = seo.lang === 'en' ? 'fr' : 'en';
  const tags = [
    `<meta data-head name="description" content="${esc(seo.description)}">`,
    `<meta data-head name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    site.url && !seo.noindex ? `<link data-head rel="canonical" href="${esc(url)}">` : '',
    ...hreflang,
    `<meta data-head property="og:type" content="${seo.type}">`,
    `<meta data-head property="og:site_name" content="${esc(site.name)}">`,
    `<meta data-head property="og:locale" content="${OG_LOCALE[seo.lang]}">`,
    seo.alternates[other] ? `<meta data-head property="og:locale:alternate" content="${OG_LOCALE[other]}">` : '',
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

/** Client-side: replace the head tags (and the page language) after a navigation. */
export function applyHead(seo: Seo) {
  document.title = seo.title;
  document.documentElement.lang = seo.lang;
  document.head.querySelectorAll('[data-head]').forEach((el) => el.remove());
  document.head.insertAdjacentHTML('beforeend', headTags(seo));
}
