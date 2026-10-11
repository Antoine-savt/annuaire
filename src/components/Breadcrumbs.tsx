import { Link } from '../router';
import { usePaths, useT } from '../i18n/lang';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const t = useT();
  const p = usePaths();
  return (
    <nav aria-label={t("Fil d'Ariane", 'Breadcrumb')} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={p.home} className="hover:text-ink">{t('Accueil', 'Home')}</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden className="text-sage">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
