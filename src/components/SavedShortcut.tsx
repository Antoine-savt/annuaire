import { useSavedCount } from '../lib/saved';
import { Link, useRouter } from '../router';
import { paths } from '../routes';

/**
 * Floating "Mes lieux" button on phones and tablets, shown once a venue is saved
 * (the desktop navigation bar has its own "Mes lieux" link).
 */
export function SavedShortcut() {
  const { path } = useRouter();
  const count = useSavedCount();
  if (count === 0 || path === paths.saved || path === paths.admin) return null;

  return (
    <Link
      href={paths.saved}
      aria-label={`Mes lieux enregistrés (${count})`}
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-pine-dark lg:hidden print:hidden"
    >
      Mes lieux
      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs text-pine">{count}</span>
    </Link>
  );
}
