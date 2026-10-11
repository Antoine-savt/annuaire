import { FocusEvent, useEffect, useId, useRef, useState } from 'react';
import { Link, useRouter } from '../router';
import { paths } from '../routes';
import { site } from '../site';
import { venues, venuesInZone, zones } from '../data';
import { vendorCategories } from '../vendors';
import { useSavedCount } from '../lib/saved';
import { ProHint, useProHint } from '../lib/proHint';
import { articles } from '../articles';
import { Photo } from './Photo';
import { SignOutButton } from './SignOutButton';

const isVenues = (p: string) => p === '/' || p.startsWith('/lieux') || p.startsWith('/secteurs');
const isVendors = (p: string) => p.startsWith(paths.prestataires);
const isJournal = (p: string) => p.startsWith(paths.journal);

const navLinkClass = (active: boolean) =>
  `relative py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
    active ? 'text-ink after:bg-pine' : 'text-muted after:bg-transparent hover:text-ink'
  }`;

/**
 * Open state of a header menu: on hover (with a short delay so the pointer can reach the panel) or keyboard
 * focus, closed with Escape, when focus leaves it or when the page changes.
 */
function useHeaderMenu<T extends HTMLElement>(path: string) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<T>(null);
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
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };
  const onBlur = (e: FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return {
    open,
    close: () => setOpen(false),
    wrapper: { ref: wrapperRef, onMouseEnter: show, onMouseLeave: hide, onBlur },
    trigger: { ref: triggerRef, onFocus: show, 'aria-expanded': open, 'aria-controls': panelId },
    panel: { id: panelId, className: `${open ? 'block' : 'hidden'} absolute top-full z-50 pt-4` },
  };
}

const panelClass = 'rounded-2xl border border-line bg-paper p-3 shadow-xl';

/**
 * "Prestataires" entry: opens a panel of every vendor category on hover or keyboard focus.
 * The links are always in the page (hidden when closed) so search engines can follow them.
 */
function VendorsMenu({ path }: { path: string }) {
  const menu = useHeaderMenu<HTMLLIElement>(path);

  return (
    <li className="relative" {...menu.wrapper}>
      <Link
        href={paths.prestataires}
        {...menu.trigger}
        aria-current={path === paths.prestataires ? 'page' : undefined}
        className={navLinkClass(isVendors(path))}
      >
        Prestataires
      </Link>

      <div {...menu.panel} className={`${menu.panel.className} left-1/2 -translate-x-1/2`}>
        <div className={`${panelClass} w-[32rem] lg:w-[46rem]`}>
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

/** Latest articles for couples shown in the "Journal" menu (the ones for professionals stay in the journal). */
const latestArticles = articles
  .filter((a) => a.category !== 'Professionnels')
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

/** "Journal" entry: the latest articles on hover or keyboard focus, and a link to all of them. */
function JournalMenu({ path }: { path: string }) {
  const menu = useHeaderMenu<HTMLLIElement>(path);

  return (
    <li className="relative" {...menu.wrapper}>
      <Link
        href={paths.journal}
        {...menu.trigger}
        aria-current={path === paths.journal ? 'page' : undefined}
        className={navLinkClass(isJournal(path))}
      >
        Journal
      </Link>

      <div {...menu.panel} className={`${menu.panel.className} left-1/2 -translate-x-1/2`}>
        <div className={`${panelClass} w-[34rem] lg:w-[44rem]`}>
          <p className="px-3 pb-2 pt-1 text-xs font-semibold text-muted">Derniers articles</p>
          <ul className="grid grid-cols-3 gap-2">
            {latestArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={paths.article(a.slug)}
                  aria-current={path === paths.article(a.slug) ? 'page' : undefined}
                  className="group block rounded-xl p-2 transition-colors hover:bg-sage-soft focus-visible:bg-sage-soft aria-[current=page]:bg-sage-soft"
                >
                  {/* The menu is closed on load: its images only download once it is opened. */}
                  <span className="block aspect-[4/3] overflow-hidden rounded-lg bg-sage-soft">
                    {menu.open && <Photo id={a.image} alt="" sizes="220px" maxWidth={480} />}
                  </span>
                  <span className="mt-2 block text-xs text-pine">{a.category}</span>
                  <span className="mt-0.5 block text-[0.95rem] font-semibold leading-snug text-ink group-hover:text-pine">
                    {a.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-3 pb-1 pt-3 text-sm">
            <span className="text-muted">Budget, lieux, organisation : nos conseils pour un mariage dans le Var</span>
            <Link href={paths.journal} className="btn-ghost !px-4 !py-2 text-sm">
              Voir tous les articles
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

/** Round account icon: the professional's photo or initial once signed in, otherwise a silhouette. */
function AccountIcon({ pro }: { pro: ProHint | null }) {
  if (pro?.photoURL) return <img src={pro.photoURL} alt="" className="h-full w-full object-cover" />;
  if (pro) return <span className="text-[0.95rem] font-semibold">{(pro.name || '?').charAt(0).toUpperCase()}</span>;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.75 19.5c1.2-3.3 4-5 7.25-5s6.05 1.7 7.25 5" />
    </svg>
  );
}

const menuLinkClass =
  'block rounded-xl px-3 py-2 text-[0.95rem] text-ink transition-colors hover:bg-sage-soft focus-visible:bg-sage-soft';

/**
 * Account button. Signed in (from a hint kept in this browser, so Firebase Authentication does not load on
 * every page): the professional's photo, with a menu to their account. Otherwise a silhouette, with a menu
 * to sign in with Google or by e-mail, or create an account. A click goes to the account or sign-in page.
 */
function AccountMenu({ path }: { path: string }) {
  const pro = useProHint();
  const { navigate } = useRouter();
  const menu = useHeaderMenu<HTMLDivElement>(path);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const active = path === paths.login || path.startsWith(paths.account);
  const label = pro ? `Mon compte (${pro.name})` : 'Espace pro : se connecter';

  const google = async () => {
    setBusy(true);
    setError('');
    // Loaded on demand: Firebase Authentication stays out of the public pages.
    const [{ signInWithGoogleProfile }, { authErrorMessage }] = await Promise.all([import('../lib/account'), import('../lib/auth')]);
    try {
      await signInWithGoogleProfile();
      menu.close();
      navigate(paths.account);
    } catch (err) {
      console.error(err);
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative" {...menu.wrapper}>
      <Link
        href={pro ? paths.account : paths.login}
        {...menu.trigger}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors ${
          active ? 'border-pine bg-sage-soft text-pine' : 'border-ink/20 bg-white/60 text-ink hover:border-pine hover:text-pine'
        }`}
      >
        <AccountIcon pro={pro} />
      </Link>

      <div {...menu.panel} className={`${menu.panel.className} right-0`}>
        <div className={`${panelClass} w-80 p-4`}>
          {pro ? (
            <>
              <div className="flex items-center gap-3 px-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sage-soft text-pine">
                  <AccountIcon pro={pro} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{pro.name}</p>
                  <p className="text-xs text-muted">Espace professionnel</p>
                </div>
              </div>
              <ul className="mt-3 border-t border-line pt-2">
                <li>
                  <Link href={paths.account} className={menuLinkClass}>
                    Mes fiches et statistiques
                  </Link>
                </li>
                <li>
                  <Link href={paths.newListing('lieu')} className={menuLinkClass}>
                    Ajouter un lieu de réception
                  </Link>
                </li>
                <li>
                  <Link href={paths.newListing('prestataire')} className={menuLinkClass}>
                    Ajouter une activité de prestataire
                  </Link>
                </li>
              </ul>
              <div className="mt-2 border-t border-line px-1 pt-3">
                {/* Remounted at each opening, so a confirmation left pending is not shown again. */}
                <SignOutButton
                  key={String(menu.open)}
                  className="text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
                  onSignedOut={() => {
                    menu.close();
                    if (active || path.startsWith(paths.admin)) navigate('/');
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <p className="font-semibold text-ink">Espace professionnel</p>
              <p className="mt-1 text-sm leading-snug text-muted">
                Lieux et prestataires : publiez votre fiche gratuitement et suivez vos statistiques.
              </p>
              <button type="button" onClick={() => void google()} disabled={busy} className="btn-primary mt-4 w-full !py-2.5 text-sm">
                {busy ? 'Connexion…' : 'Se connecter avec Google'}
              </button>
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Link href={paths.login} className="btn-ghost mt-2 w-full !py-2.5 text-sm">
                Se connecter avec un e-mail
              </Link>
              <p className="mt-3 text-center text-sm text-muted">
                Pas encore de compte ?{' '}
                <Link href={`${paths.login}?mode=inscription`} className="font-semibold text-ink underline underline-offset-2">
                  Créer un compte
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
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
              <JournalMenu path={path} />
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
            <AccountMenu path={path} />
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
