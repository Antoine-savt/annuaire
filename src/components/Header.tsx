import { FocusEvent, useEffect, useId, useRef, useState } from 'react';
import { Link, useRouter } from '../router';
import { paths } from '../routes';
import { site } from '../site';
import { venues, venuesInZone, zones } from '../data';
import { vendorCategories } from '../vendors';
import { useSavedCount } from '../lib/saved';
import { useProHint } from '../lib/proHint';

const isVenues = (p: string) => p === '/' || p.startsWith('/lieux') || p.startsWith('/secteurs');
const isVendors = (p: string) => p.startsWith(paths.prestataires);
const isJournal = (p: string) => p.startsWith(paths.journal);

const navLinkClass = (active: boolean) =>
  `relative py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
    active ? 'text-ink after:bg-pine' : 'text-muted after:bg-transparent hover:text-ink'
  }`;

/**
 * "Prestataires" entry: opens a panel of every vendor category on hover or keyboard focus.
 * The links are always in the page (hidden when closed) so search engines can follow them.
 */
function VendorsMenu({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short delay lets the pointer travel from the link to the panel.
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };
  const onBlur = (e: FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <li ref={wrapperRef} className="relative" onMouseEnter={show} onMouseLeave={hide} onBlur={onBlur}>
      <Link
        ref={triggerRef}
        href={paths.prestataires}
        onFocus={show}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={path === paths.prestataires ? 'page' : undefined}
        className={navLinkClass(isVendors(path))}
      >
        Prestataires
      </Link>

      <div id={panelId} className={`${open ? 'block' : 'hidden'} absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4`}>
        <div className="w-[32rem] rounded-2xl border border-line bg-paper p-3 shadow-xl lg:w-[46rem]">
          <ul className="grid grid-cols-2 gap-1 lg:grid-cols-3">
            {vendorCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={paths.vendor(c.slug)}
                  aria-current={path === paths.vendor(c.slug) ? 'page' : undefined}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sage-soft focus-visible:bg-sage-soft aria-[current=page]:bg-sage-soft"
                >
                  <span className="block text-[0.95rem] font-semibold text-ink">{c.name}</span>
                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{c.menuDesc}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line px-3 pb-1 pt-3 text-sm">
            <Link href={paths.prestataires} className="font-semibold text-pine hover:underline">
              Tous les prestataires
            </Link>
            <Link href={`${paths.prestataires}#referencer`} className="text-muted transition-colors hover:text-ink">
              Vous êtes prestataire ? <span className="font-semibold text-ink underline underline-offset-2">Référencez votre activité</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Account button: the professional's photo or initial once signed in (from a hint kept in this browser,
 * so Firebase Authentication does not load on every page), otherwise a silhouette leading to the sign-in page.
 */
function AccountButton({ path }: { path: string }) {
  const pro = useProHint();
  const active = path === paths.login || path.startsWith(paths.account);
  const label = pro ? `Mon compte (${pro.name})` : 'Espace pro : se connecter';
  return (
    <Link
      href={pro ? paths.account : paths.login}
      aria-label={label}
      title={label}
      aria-current={active ? 'page' : undefined}
      className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors ${
        active ? 'border-pine bg-sage-soft text-pine' : 'border-ink/20 bg-white/60 text-ink hover:border-pine hover:text-pine'
      }`}
    >
      {pro?.photoURL ? (
        <img src={pro.photoURL} alt="" className="h-full w-full object-cover" />
      ) : pro ? (
        <span className="text-[0.95rem] font-semibold">{(pro.name || '?').charAt(0).toUpperCase()}</span>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="8.5" r="3.75" />
          <path d="M4.75 19.5c1.2-3.3 4-5 7.25-5s6.05 1.7 7.25 5" />
        </svg>
      )}
    </Link>
  );
}

/** Number of saved venues, as a small badge. */
function SavedCount({ count, inverted = false }: { count: number; inverted?: boolean }) {
  if (count === 0) return null;
  return (
    <span
      className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
        inverted ? 'bg-white text-pine' : 'bg-pine text-white'
      }`}
    >
      {count}
    </span>
  );
}

export function Header() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const savedCount = useSavedCount();
  const pro = useProHint();

  useEffect(() => setOpen(false), [path]);

  const mobileLinkClass = (active: boolean) =>
    `block py-3.5 font-display text-xl ${active ? 'text-pine' : 'text-ink'}`;

  return (
    <>
      <div className="bg-ink text-[0.8rem] text-white/75 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2 sm:px-8">
          <p>
            <span className="font-semibold text-white">{venues.length} lieux de réception</span> référencés dans{' '}
            {zones.length} secteurs du Var
          </p>
          <nav aria-label="Secteurs" className="hidden lg:ml-auto lg:block">
            <ul className="flex items-center gap-4">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={paths.zone(z.slug)} className="transition-colors hover:text-white">
                    {z.name} <span className="text-white/45">{venuesInZone(z.slug).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={pro ? paths.account : paths.login}
            className="shrink-0 font-semibold text-white underline-offset-2 hover:underline lg:border-l lg:border-white/20 lg:pl-6"
          >
            {pro ? 'Mon compte' : 'Espace pro'}
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md print:hidden">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.name}, accueil`}>
            <span className="font-display text-xl uppercase tracking-[0.28em] text-ink sm:text-[1.4rem]">{site.name}</span>
            <span className="mt-1 text-[0.8rem] text-muted">{site.tagline}</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              <li>
                <Link href="/" aria-current={path === '/' ? 'page' : undefined} className={navLinkClass(isVenues(path))}>
                  Les lieux
                </Link>
              </li>
              <VendorsMenu path={path} />
              <li>
                <Link href={paths.journal} aria-current={path === paths.journal ? 'page' : undefined} className={navLinkClass(isJournal(path))}>
                  Journal
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link
                  href={paths.saved}
                  aria-current={path === paths.saved ? 'page' : undefined}
                  aria-label={`Mes lieux enregistrés (${savedCount})`}
                  className={`${navLinkClass(path === paths.saved)} inline-flex items-center`}
                >
                  Mes lieux
                  <SavedCount count={savedCount} />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <AccountButton path={path} />
            {/* On the listing page itself, the button scrolls to the form instead of reloading the page. */}
            <Link
              href={path === paths.referencer ? '#formulaire' : paths.referencer}
              className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
            >
              Référencer mon lieu
            </Link>

            <button
              type="button"
              className="rounded-full border border-ink/25 px-4 py-1.5 text-sm font-semibold text-ink md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Fermer' : 'Menu'}
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-mobile" aria-label="Navigation mobile" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden">
            <ul className="divide-y divide-line/70 px-5 py-3">
              <li>
                <Link href="/" className={mobileLinkClass(isVenues(path))}>
                  Les lieux
                </Link>
              </li>
              <li className="pb-3">
                <Link href={paths.prestataires} className={mobileLinkClass(isVendors(path))}>
                  Prestataires
                </Link>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-1">
                  {vendorCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={paths.vendor(c.slug)}
                        className={`text-[0.95rem] ${path === paths.vendor(c.slug) ? 'font-semibold text-pine' : 'text-muted'}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href={paths.journal} className={mobileLinkClass(isJournal(path))}>
                  Journal
                </Link>
              </li>
              <li>
                <Link href={paths.saved} className={`${mobileLinkClass(path === paths.saved)} flex items-center`}>
                  Mes lieux enregistrés
                  <SavedCount count={savedCount} />
                </Link>
              </li>
              <li className="space-y-3 pt-4">
                <Link href={path === paths.referencer ? '#formulaire' : paths.referencer} className="btn-primary w-full">
                  Référencer mon lieu
                </Link>
                <Link href={`${paths.prestataires}#referencer`} className="btn-ghost w-full">
                  Référencer mon activité de prestataire
                </Link>
                <Link
                  href={pro ? paths.account : paths.login}
                  className="block py-2 text-center text-[0.95rem] font-semibold text-ink underline underline-offset-2"
                >
                  {pro ? 'Mon compte professionnel' : 'Espace pro : se connecter'}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
