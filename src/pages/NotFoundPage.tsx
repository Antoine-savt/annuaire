import { Link } from '../router';
import { usePaths, useT } from '../i18n/lang';

export function NotFoundPage() {
  const t = useT();
  const p = usePaths();
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
      <h1 className="text-5xl text-ink sm:text-6xl">{t('Page introuvable', 'Page not found')}</h1>
      <p className="mt-6 text-lg text-muted">
        {t(
          "Cette adresse ne correspond à aucune page. Le lieu a peut-être changé d'adresse.",
          'This address does not match any page. The venue may have moved to a new address.',
        )}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href={`${p.home}#lieux`} className="btn-primary">
          {t('Voir tous les lieux', 'See all venues')}
        </Link>
        <Link href={p.journal} className="btn-ghost">
          {t('Lire le Journal', 'Read the Journal')}
        </Link>
      </div>
    </section>
  );
}
