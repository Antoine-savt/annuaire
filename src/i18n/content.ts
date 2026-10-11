import { staticVenues, zones } from '../data';
import { articles } from '../articles';
import { vendorCategories } from '../vendors';
import { relocalizeCatalog } from '../catalog';
import { contentLang, setCurrentLang } from './current';
import type { Lang } from './lang';
import { enVenues, enZones } from './en/places';
import { enArticles1 } from './en/articles1';
import { enArticles2 } from './en/articles2';
import { enCategories } from './en/vendors';

/*
 * The site's content (areas, curated venues, articles, vendor categories) is shared by every page
 * and every module (lists, menus, search, SEO). Rather than translating at each use, the shared objects
 * are rewritten in the language of the page about to render: the French text is kept aside, the
 * English text lives in src/i18n/en/. Rendering is synchronous, so the server can prerender French
 * and English pages one after the other.
 */

const enArticles = { ...enArticles1, ...enArticles2 };

interface Translatable<T> {
  object: T;
  fr: Partial<T>;
  en: Partial<T> | undefined;
}

/** The French text of the given fields, kept to switch back. */
function keep<T extends object>(object: T, en: Partial<T> | undefined): Translatable<T> {
  const fr = en ? (Object.fromEntries(Object.keys(en).map((k) => [k, object[k as keyof T]])) as Partial<T>) : {};
  return { object, fr, en };
}

const entries: Translatable<object>[] = [
  ...zones.map((z) => keep(z, enZones[z.slug])),
  ...staticVenues.map((v) => keep(v, enVenues[v.slug])),
  // The English slug is only used for the address (see paths.ts): the article keeps its French slug.
  ...articles.map((a) => {
    const en = enArticles[a.slug];
    if (!en) return keep(a, undefined);
    const { slug: _slug, ...text } = en;
    return keep(a, text);
  }),
  ...vendorCategories.map((c) => keep(c, enCategories[c.slug])),
];

/** Rewrite the shared content in the language of the page about to render (no-op when unchanged). */
export function setContentLanguage(lang: Lang) {
  if (lang === contentLang()) return;
  setCurrentLang(lang);
  for (const { object, fr, en } of entries) {
    if (en) Object.assign(object, lang === 'en' ? en : fr);
  }
  relocalizeCatalog();
}
