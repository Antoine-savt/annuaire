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
