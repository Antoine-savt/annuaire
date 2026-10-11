import type { Lang } from './lang';

/*
 * Language the shared content objects (venues, areas, articles, categories) are currently written in.
 * Switched by setContentLanguage (src/i18n/content.ts) before each page renders.
 */

let current: Lang = 'fr';

export const contentLang = (): Lang => current;

export function setCurrentLang(lang: Lang) {
  current = lang;
}
