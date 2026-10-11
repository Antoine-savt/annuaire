import { useSavedCount } from '../lib/saved';
import { Link, useRouter } from '../router';
import { paths } from '../routes';
import { usePaths, useT } from '../i18n/lang';

/**
 * Floating "Mes lieux" button on phones and tablets, shown once a venue is saved
 * (the desktop navigation bar has its own "Mes lieux" link).
 */
export function SavedShortcut() {
  const { path } = useRouter();
  const count = useSavedCount();
  const t = useT();
  const p = usePaths();
  if (count === 0 || path === p.saved || path === paths.admin) return null;

  return (
    <Link
      href={p.saved}
      aria-label={t(`Mes lieux enregistrés (${count})`, `Saved venues (${count})`)}
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-pine-dark lg:hidden print:hidden"
    >
      {t('Mes lieux', 'Saved venues')}
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs text-pine">{count}</span>
    </Link>
  );
}
