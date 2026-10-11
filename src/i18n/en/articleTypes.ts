import type { FaqItem } from '../../types';

/** English text of a journal article (src/articles.ts); the French slug is the key. */
export interface EnArticleText {
  /** English slug, the same as in src/i18n/slugs.ts. */
  slug: string;
  title: string;
  seoTitle?: string;
  category: string;
  excerpt: string;
  /** Meta description, about 150 characters. */
  description: string;
  imageAlt: string;
  /** Markdown subset (see src/lib/richtext.tsx). */
  body: string;
  faq: FaqItem[];
}
