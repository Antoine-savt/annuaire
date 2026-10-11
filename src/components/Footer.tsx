import { Link } from '../router';
import { articlesIn, paths } from '../routes';
import { venuesInZone, zones } from '../data';
import { site } from '../site';
import { vendorCategories } from '../vendors';
import { useLang, usePaths, useT } from '../i18n/lang';
import { siteChateauUrl } from './SiteChateauOffer';

export function Footer() {
  const lang = useLang();
  const t = useT();
  const p = usePaths();
  // The professional area exists in French only.
  const proLang = lang === 'en' ? 'fr' : undefined;

  return (
    <footer className="mt-auto bg-ink text-white/75 print:hidden">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1fr]">
          <div className="max-w-xs">
            <p className="font-display text-2xl uppercase tracking-[0.28em] text-white">{site.name}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              {t(
                <>
                  Un annuaire indépendant des lieux de réception pour se marier dans le Var : châteaux, bastides,
                  domaines viticoles et villas face à la mer.
                </>,
                <>
                  An independent guide to wedding venues in the Var: châteaux, bastides, wine estates and villas
                  overlooking the sea.
                </>,
              )}
            </p>
          </div>

          <nav aria-label={t('Lieux par secteur', 'Venues by area')}>
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">{t('Lieux par secteur', 'Venues by area')}</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={p.zone(z.slug)} className="transition-colors hover:text-white">
                    {z.name} <span className="text-white/40">({venuesInZone(z.slug).length})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('Prestataires', 'Vendors')}>
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">{t('Prestataires', 'Vendors')}</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {vendorCategories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={p.vendor(c.slug)} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={p.prestataires} className="font-semibold text-white transition-colors hover:text-white/80">
                  {t('Tous les prestataires', 'All vendors')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Journal">
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Journal</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[...articlesIn(lang)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link href={p.article(a.slug)} className="transition-colors hover:text-white">
                    {a.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={p.journal} className="font-semibold text-white transition-colors hover:text-white/80">
                  {t('Tous les articles', 'All articles')}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t('Le guide', 'The guide')}>
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">{t('Le guide', 'The guide')}</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li><Link href={p.home} className="transition-colors hover:text-white">{t('Tous les lieux', 'All venues')}</Link></li>
              <li><Link href={paths.referencer} hrefLang={proLang} className="font-semibold text-white transition-colors hover:text-white/80">{t('Référencer mon lieu', 'List your venue (in French)')}</Link></li>
              <li><Link href={`${p.prestataires}#referencer`} className="transition-colors hover:text-white">{t('Référencer mon activité', 'List your vendor business')}</Link></li>
              <li><Link href={paths.login} hrefLang={proLang} className="transition-colors hover:text-white">{t('Espace professionnel', 'For professionals (in French)')}</Link></li>
              {lang === 'fr' && (
                <li>
                  <a href={siteChateauUrl('pied-de-page')} target="_blank" rel="noopener" className="transition-colors hover:text-white">
                    Création de site pour lieux de réception
                  </a>
                </li>
              )}
              <li><Link href={p.confidentialite} className="transition-colors hover:text-white">{t('Confidentialité', 'Privacy')}</Link></li>
              <li><Link href={paths.terms} hrefLang={proLang} className="transition-colors hover:text-white">{t('Conditions professionnels', 'Terms for professionals (in French)')}</Link></li>
              {site.contactEmail && (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}?subject=${t('Proposer%20un%20lieu', 'Suggest%20a%20venue')}`}
                    className="transition-colors hover:text-white"
                  >
                    {t('Proposer un lieu', 'Suggest a venue')}
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
            {t(
              '. Tarifs et capacités indicatifs, à confirmer auprès de chaque lieu.',
              '. Prices and capacities are indicative: please confirm them with each venue.',
            )}
          </p>
          <p>{t("Photos d'illustration : Unsplash.", 'Illustrative photos: Unsplash.')}</p>
        </div>
      </div>
    </footer>
  );
}
