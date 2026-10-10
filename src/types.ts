export type Budget = '€' | '€€' | '€€€';

export interface Zone {
  slug: string;
  name: string;
  /** Name with its French preposition, e.g. "en Dracénie". */
  where: string;
  /** Short editorial introduction shown on the zone page. */
  intro: string;
  /** Longer practical guide to the area (Markdown subset, see src/lib/richtext.tsx). */
  body: string;
  /** Slugs of the journal articles most useful for this area. */
  articles: string[];
}

export interface VendorCategory {
  slug: string;
  /** Plural label for menus and breadcrumbs, e.g. "Photographes". */
  name: string;
  /** Page heading, also the search-result title, e.g. "Photographe de mariage dans le Var". */
  title: string;
  /** Professional addressed by the listing form, e.g. "photographe de mariage". */
  pro: string;
  /** One-line summary for the navigation menu. */
  menuDesc: string;
  /** Meta description for search results (about 150 characters). */
  description: string;
  /** Lead paragraph under the heading. */
  intro: string;
  /** When to book, e.g. "12 à 18 mois avant". */
  bookAhead: string;
  image: string;
  imageAlt: string;
  /** Advice for couples (Markdown subset, see src/lib/richtext.tsx). */
  body: string;
  faq: FaqItem[];
}

/** A vendor listed in a category (see src/vendorListings.ts). */
export interface Vendor {
  /** Unique within its category, used in statistics ("photographes/studio-lumiere"). */
  slug: string;
  /** Vendor category slug (see src/vendors.ts). */
  category: string;
  name: string;
  commune: string;
  /** Area served: "Tout le Var" or a sector name. */
  zone: string;
  /** One-line portrait of the business. */
  summary: string;
  /** Up to three short keywords: style, specialties. */
  tags: string[];
  /** Starting price as published by the vendor, e.g. "Dès 1 500 €". */
  priceFrom?: string;
  /** Phone number, only shown after the contact form. */
  phone: string;
  website?: string;
  /** Instagram handle without "@", used when there is no website. */
  instagram?: string;
  /** Unsplash photo id (see src/images.ts) or a path under public/, e.g. "/images/vendors/studio.jpg". */
  image?: string;
  imageAlt?: string;
  /** Longer presentation, shown on the vendor page. */
  description?: string;
  /** Extra photos (URLs) for the vendor page; image stays the cover. */
  photos?: string[];
  /** Account that manages this listing. */
  ownerUid?: string;
}

/** Who a couple asks contact details for: a venue or a vendor. */
export interface ContactTarget {
  /** Identifier used for statistics and contact requests. */
  id: string;
  kind: 'venue' | 'vendor';
  name: string;
  /** "Lorgues, Dracénie". */
  place: string;
  phone: string;
  website?: string;
  /** Account of the professional, recorded with statistics so they can see their own figures. */
  owner?: string;
}

export type ListingStatus = 'published' | 'draft' | 'hidden';

/** A listing created by a professional in their account (Firestore "listings" collection). */
export interface ListingDoc {
  /** Document id: the slug for a venue, "category.slug" for a vendor. */
  id: string;
  ownerUid: string;
  type: 'lieu' | 'prestataire';
  /** "lieu" for venues, otherwise a vendor category slug. */
  category: string;
  slug: string;
  /** "hidden" is set by L'Édition only. */
  status: ListingStatus;
  name: string;
  commune: string;
  /** Venue: sector slug. Vendor: area served ("Tout le Var" or a sector name). */
  zone: string;
  summary: string;
  description: string;
  tags: string[];
  /** Venue: what makes it unique ("le petit plus"). */
  highlight: string;
  phone: string;
  website: string;
  instagram: string;
  /** Photo URLs, the first one is the cover. */
  photos: string[];
  /** Venue type (château, bastide…). */
  venueType: string;
  guestsMin: number | null;
  guestsMax: number | null;
  /** People who can sleep on site (venues). */
  sleeps: number;
  /** Venue starting price in euros. */
  priceFrom: number | null;
  /** Venue: what the price covers. Vendor: free price text ("Dès 1 500 €"). */
  priceDetails: string;
  createdAt: number;
  updatedAt: number;
  /** Copy embedded in a page without its description (to keep pages light): fetch it before showing the listing. */
  partial?: boolean;
}

/** A professional's profile (Firestore "users" collection). */
export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  role: string;
  /** What the professional wants to list: "lieu", "prestataire" or both. */
  intents: string[];
  photoURL: string;
  email: string;
}

export interface FaqItem {
  q: string;
  /** Answer, may contain [links](/path) and **bold**. */
  a: string;
}

export interface Venue {
  slug: string;
  nom_du_lieu: string;
  /** One-line portrait of the venue, to grasp it at a glance. */
  summary: string;
  /** Three short keywords describing the style of the venue. */
  tags: string[];
  /** Short versions of the key facts for listings. */
  guestsShort: string;
  lodgingShort: string;
  priceShort: string;
  commune: string;
  zone: Zone;
  site_web_officiel: string;
  description: string;
  capacite_accueil: string;
  hebergement_sur_place: string;
  type_de_cadre: string;
  fourchette_de_prix: string;
  element_differenciant: string;
  contact: string;
  sources: string;
  image: string;
  imageAlt: string;
  /** Five photos: the main image first, then illustrative extras. */
  gallery: string[];

  /** Smallest group the venue accepts, when published. */
  minGuests: number | null;
  /** Largest number of guests the venue can host, when published. */
  maxGuests: number | null;
  /** Lowest published price for the venue (hire or package), in euros; null when only quoted on request. */
  priceFrom: number | null;
  /** People who can sleep on site (0 = no accommodation). When only rooms are known, one person per room. */
  sleeps: number;
  hasAccommodation: boolean;
  /** Indicative budget band for venue hire, or null when only quoted on request. */
  budget: Budget | null;
  /** Account that manages this listing (venues created or claimed by their owner). */
  ownerUid?: string;
  /** True for directory venues whose photos are stock images, not the venue itself. */
  illustrative?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  /** Shorter title for search results when the headline is too long. */
  seoTitle?: string;
  category: string;
  /** Publication date, ISO (YYYY-MM-DD). */
  date: string;
  /** Last significant update, ISO (YYYY-MM-DD). */
  updated?: string;
  excerpt: string;
  /** Meta description for search results (about 150 characters). */
  description: string;
  image: string;
  imageAlt: string;
  /** Article text (Markdown subset, see src/lib/richtext.tsx). */
  body: string;
  faq: FaqItem[];
  /** Slugs of venues mentioned in the article. */
  venues: string[];
}
