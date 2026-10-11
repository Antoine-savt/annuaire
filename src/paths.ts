import { articleSlugsEn, categorySlugsEn } from './i18n/slugs';

/** URL of every page type, kept in its own module so data files can link to pages without import cycles. */
export const paths = {
  home: '/',
  venue: (slug: string) => `/lieux/${slug}`,
  zone: (slug: string) => `/secteurs/${slug}`,
  prestataires: '/prestataires',
  vendor: (slug: string) => `/prestataires/${slug}`,
  vendorPage: (category: string, slug: string) => `/prestataires/${category}/${slug}`,
  confidentialite: '/confidentialite',
  referencer: '/referencer-mon-lieu',
  saved: '/mes-lieux',
  login: '/connexion',
  account: '/compte',
  listingEditor: '/compte/fiche',
  newListing: (type: 'lieu' | 'prestataire', category?: string) =>
    `/compte/fiche?type=${type}${category ? `&categorie=${encodeURIComponent(category)}` : ''}`,
  editListing: (id: string) => `/compte/fiche?id=${encodeURIComponent(id)}`,
  terms: '/conditions-professionnels',
  admin: '/admin',
  journal: '/journal',
  article: (slug: string) => `/journal/${slug}`,
};

/**
 * Addresses of the English version, under /en. Articles and vendor categories get English slugs
 * (src/i18n/slugs.ts); the professional area stays French, at the same addresses.
 */
export const pathsEn: typeof paths = {
  ...paths,
  home: '/en',
  venue: (slug: string) => `/en/venues/${slug}`,
  zone: (slug: string) => `/en/areas/${slug}`,
  prestataires: '/en/vendors',
  vendor: (slug: string) => `/en/vendors/${categorySlugsEn[slug] ?? slug}`,
  vendorPage: (category: string, slug: string) => `/en/vendors/${categorySlugsEn[category] ?? category}/${slug}`,
  confidentialite: '/en/privacy',
  saved: '/en/saved-venues',
  journal: '/en/journal',
  article: (slug: string) => `/en/journal/${articleSlugsEn[slug] ?? slug}`,
};

export const pathsFor = (lang: 'fr' | 'en') => (lang === 'en' ? pathsEn : paths);
