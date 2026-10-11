import { useRouter } from '../router';
import { pathsFor } from '../paths';

/*
 * Language of a page, from its address: the English version lives under /en (see paths.ts).
 * The professional area and the dashboard exist in French only.
 */

export type Lang = 'fr' | 'en';

export const langOf = (path: string): Lang => (path === '/en' || path.startsWith('/en/') ? 'en' : 'fr');

/** Language of the current page. */
export function useLang(): Lang {
  return langOf(useRouter().path);
}

/** Picks the text of the current language: t('Voir la fiche', 'View venue'). */
export type Translate = <T>(fr: T, en: T) => T;

export const translator =
  (lang: Lang): Translate =>
  (fr, en) =>
    lang === 'en' ? en : fr;

export function useT(): Translate {
  return translator(useLang());
}

/** Number formatting of each language: "19 500" / "19,500". */
export const formatNumber = (n: number, lang: Lang) => n.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR');

/** "19 500 €" / "€19,500". */
export const formatEuros = (n: number, lang: Lang) => (lang === 'en' ? `€${formatNumber(n, lang)}` : `${formatNumber(n, lang)} €`);

/** Addresses of the public pages in the current language. */
export function usePaths() {
  return pathsFor(useLang());
}
