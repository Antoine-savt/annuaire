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
  publisher: 'Wheeloh',
  /** Contact address for submissions and personal-data requests, e.g. "contact@mon-domaine.fr". */
  contactEmail: 'contact@wheeloh.com',
  /** How long contact requests are kept before deletion, shown on the privacy page. */
  leadRetentionMonths: 12,
  /**
   * Legal notice (mentions légales, LCEN art. 6): L'Édition is a trade name of Wheeloh.
   * Empty values are left out of the page; fill them all in before going live.
   */
  legal: {
    company: 'Wheeloh',
    /** Legal form and share capital, e.g. "SAS au capital de 1 000 €". */
    legalForm: 'Société par actions simplifiée (SAS) au capital variable de 20 €',
    /** Registered office address. */
    address: 'Bâtiment B, 155 boulevard de la Reine, 78000 Versailles, France',
    /** Registration, e.g. "RCS Toulon 123 456 789". */
    registration: 'RCS Versailles 995 071 040',
    /** Intra-EU VAT number, if any. */
    vatNumber: 'non applicable',
    phone: '+33 7 52 05 25 59',
    website: 'https://wheeloh.com',
    /** Publication director (directeur de la publication): a natural person. */
    publicationDirector: 'Antoine Savoyant, président',
  },
  host: {
    name: 'Netlify, Inc.',
    address: '101 2nd Street, San Francisco, CA 94105, États-Unis',
    url: 'https://www.netlify.com',
  },
};

/** Absolute URL for a path when the site URL is known, otherwise the path itself. */
export function absoluteUrl(path: string): string {
  return site.url ? `${site.url}${path}` : path;
}
