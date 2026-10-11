/*
 * English addresses of the pages whose French slug is a French word (journal articles, vendor
 * categories). Venue and area slugs are place names: they stay the same in both languages.
 * Kept free of imports so that paths.ts and the content files can use it.
 */

/** French article slug → English article slug. Articles missing here have no English version. */
export const articleSlugsEn: Record<string, string> = {
  'organiser-mariage-var-guide': 'plan-wedding-var-guide',
  'prix-lieu-mariage-var': 'wedding-venue-prices-var',
  'lieu-mariage-hebergement-var': 'wedding-venues-with-accommodation-var',
  'ceremonie-laique-provence': 'symbolic-wedding-ceremony-provence',
  'grand-mariage-var': 'large-wedding-venues-var',
  'retroplanning-mariage': 'wedding-planning-timeline',
  'chateaux-viticoles-mariage-var': 'winery-chateau-weddings-var',
  'mariage-bord-de-mer-var': 'seaside-wedding-var',
  'quelle-saison-mariage-var': 'best-season-wedding-var',
};

/** French vendor category slug → English one. */
export const categorySlugsEn: Record<string, string> = {
  photographes: 'photographers',
  videastes: 'videographers',
  'wedding-planners': 'wedding-planners',
  traiteurs: 'caterers',
  'musique-dj': 'music-dj',
  fleuristes: 'florists',
  decoration: 'decor-hire',
  'coiffure-maquillage': 'hair-makeup',
  'robes-costumes': 'dresses-suits',
  patissiers: 'wedding-cakes',
  officiants: 'officiants',
  transport: 'transport',
  papeterie: 'stationery',
  animations: 'entertainment',
  alliances: 'wedding-rings',
};

const reverse = (map: Record<string, string>) => Object.fromEntries(Object.entries(map).map(([fr, en]) => [en, fr]));

/** English slug → French slug, to read the English addresses. */
export const articleSlugsFr: Record<string, string> = reverse(articleSlugsEn);
export const categorySlugsFr: Record<string, string> = reverse(categorySlugsEn);
