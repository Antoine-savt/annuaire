declare const __SITE_URL__: string;

/**
 * Site-wide settings. Fill in the empty values to enable the related links
 * (they stay hidden while empty).
 */
export const site = {
  name: "L'Édition",
  tagline: 'Lieux de mariage dans le Var',
  /** Public URL without trailing slash, set at build time via SITE_URL (see .env.example). */
  url: __SITE_URL__,
  locale: 'fr_FR',
  /** Who publishes the site and keeps the contact requests (company or person), shown on the privacy page. */
  publisher: '',
  /** Contact address for submissions and personal-data requests, e.g. "contact@mon-domaine.fr". */
  contactEmail: '',
  /** How long contact requests are kept before deletion, shown on the privacy page. */
  leadRetentionMonths: 12,
  /** Featured photographer on the "Photographes" page. */
  photographer: {
    name: 'Atelier Lumière',
    website: '',
    instagram: '',
  },
};

/** Absolute URL for a path when the site URL is known, otherwise the path itself. */
export function absoluteUrl(path: string): string {
  return site.url ? `${site.url}${path}` : path;
}
