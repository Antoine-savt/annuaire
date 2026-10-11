import { FocusEvent, useEffect, useId, useRef, useState } from 'react';
import { Link, useRouter } from '../router';
import { articlesIn, matchRoute, paths, routePath } from '../routes';
import { site } from '../site';
import { venues, venuesInZone, zones } from '../data';
import { vendorCategories } from '../vendors';
import { useSavedCount } from '../lib/saved';
import { ProHint, useProHint } from '../lib/proHint';
import { useLang, usePaths, useT } from '../i18n/lang';
import { Photo } from './Photo';
import { SignOutButton } from './SignOutButton';

type Paths = typeof paths;

const isVenues = (path: string, p: Paths) => path === p.home || path.startsWith(p.venue('')) || path.startsWith(p.zone(''));
const isVendors = (path: string, p: Paths) => path.startsWith(p.prestataires);
const isJournal = (path: string, p: Paths) => path.startsWith(p.journal);

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

/** The professional area exists in French only: its links say so to browsers and assistive technology. */
const useProLang = () => (useLang() === 'en' ? 'fr' : undefined);

/**
 * "Prestataires" entry: opens a panel of every vendor category on hover or keyboard focus.
 * The links are always in the page (hidden when closed) so search engines can follow them.
 */
function VendorsMenu({ path }: { path: string }) {
  const menu = useHeaderMenu<HTMLLIElement>(path);
  const t = useT();
  const p = usePaths();

  return (
    <li className="relative" {...menu.wrapper}>
      <Link
        href={p.prestataires}
        {...menu.trigger}
        aria-current={path === p.prestataires ? 'page' : undefined}
        className={navLinkClass(isVendors(path, p))}
      >
        {t('Prestataires', 'Vendors')}
      </Link>

      <div {...menu.panel} className={`${menu.panel.className} left-1/2 -translate-x-1/2`}>
        <div className={`${panelClass} w-[32rem] lg:w-[46rem]`}>
          <ul className="grid grid-cols-2 gap-1 lg:grid-cols-3">
            {vendorCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={p.vendor(c.slug)}
                  aria-current={path === p.vendor(c.slug) ? 'page' : undefined}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sage-soft focus-visible:bg-sage-soft aria-[current=page]:bg-sage-soft"
                >
                  <span className="block text-[0.95rem] font-semibold text-ink">{c.name}</span>
                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-muted">{c.menuDesc}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line px-3 pb-1 pt-3 text-sm">
            <Link href={p.prestataires} className="font-semibold text-pine hover:underline">
              {t('Tous les prestataires', 'All vendors')}
            </Link>
            <Link href={`${p.prestataires}#referencer`} className="text-muted transition-colors hover:text-ink">
              {t('Vous êtes prestataire ?', 'Are you a wedding vendor?')}{' '}
              <span className="font-semibold text-ink underline underline-offset-2">{t('Référencez votre activité', 'List your business')}</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

/** "Journal" entry: the latest articles on hover or keyboard focus, and a link to all of them. */
function JournalMenu({ path }: { path: string }) {
  const menu = useHeaderMenu<HTMLLIElement>(path);
  const lang = useLang();
  const t = useT();
  const p = usePaths();
  // Latest articles for couples, in the page language (the ones for professionals stay in the journal).
  const latestArticles = articlesIn(lang)
    .filter((a) => a.category !== 'Professionnels')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <li className="relative" {...menu.wrapper}>
      <Link
        href={p.journal}
        {...menu.trigger}
        aria-current={path === p.journal ? 'page' : undefined}
        className={navLinkClass(isJournal(path, p))}
      >
        Journal
      </Link>

      <div {...menu.panel} className={`${menu.panel.className} left-1/2 -translate-x-1/2`}>
        <div className={`${panelClass} w-[34rem] lg:w-[44rem]`}>
          <p className="px-3 pb-2 pt-1 text-xs font-semibold text-muted">{t('Derniers articles', 'Latest articles')}</p>
          <ul className="grid grid-cols-3 gap-2">
            {latestArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={p.article(a.slug)}
                  aria-current={path === p.article(a.slug) ? 'page' : undefined}
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
            <span className="text-muted">
              {t(
                'Budget, lieux, organisation : nos conseils pour un mariage dans le Var',
                'Budget, venues, planning: our advice for a wedding in the Var',
              )}
            </span>
            <Link href={p.journal} className="btn-ghost !px-4 !py-2 text-sm">
              {t('Voir tous les articles', 'See all articles')}
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
 * The professional area is in French only: on English pages the menu is translated, its pages are not.
 */
function AccountMenu({ path }: { path: string }) {
  const pro = useProHint();
  const { navigate } = useRouter();
  const menu = useHeaderMenu<HTMLDivElement>(path);
  const t = useT();
  const proLang = useProLang();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const active = path === paths.login || path.startsWith(paths.account);
  const label = pro
    ? t(`Mon compte (${pro.name})`, `My account (${pro.name}), in French`)
    : t('Espace pro : se connecter', 'For professionals: sign in (in French)');

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
        hrefLang={proLang}
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
                  <p className="text-xs text-muted">{t('Espace professionnel', 'Professional area (in French)')}</p>
                </div>
              </div>
              <ul className="mt-3 border-t border-line pt-2">
                <li>
                  <Link href={paths.account} hrefLang={proLang} className={menuLinkClass}>
                    {t('Mes fiches et statistiques', 'My listings and statistics')}
                  </Link>
                </li>
                <li>
                  <Link href={paths.newListing('lieu')} hrefLang={proLang} className={menuLinkClass}>
                    {t('Ajouter un lieu de réception', 'Add a wedding venue')}
                  </Link>
                </li>
                <li>
                  <Link href={paths.newListing('prestataire')} hrefLang={proLang} className={menuLinkClass}>
                    {t('Ajouter une activité de prestataire', 'Add a vendor business')}
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
              <p className="font-semibold text-ink">{t('Espace professionnel', 'For professionals')}</p>
              <p className="mt-1 text-sm leading-snug text-muted">
                {t(
                  'Lieux et prestataires : publiez votre fiche gratuitement et suivez vos statistiques.',
                  'Venues and vendors: publish your listing for free and follow your statistics. The professional area is in French.',
                )}
              </p>
              <button type="button" onClick={() => void google()} disabled={busy} className="btn-primary mt-4 w-full !py-2.5 text-sm">
                {busy ? t('Connexion…', 'Signing in…') : t('Se connecter avec Google', 'Sign in with Google')}
              </button>
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <Link href={paths.login} hrefLang={proLang} className="btn-ghost mt-2 w-full !py-2.5 text-sm">
                {t('Se connecter avec un e-mail', 'Sign in with e-mail')}
              </Link>
              <p className="mt-3 text-center text-sm text-muted">
                {t('Pas encore de compte ?', 'No account yet?')}{' '}
                <Link
                  href={`${paths.login}?mode=inscription`}
                  hrefLang={proLang}
                  className="font-semibold text-ink underline underline-offset-2"
                >
                  {t('Créer un compte', 'Create one')}
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

/**
 * The same page in the other language ("EN" on French pages, "FR" on English ones); undefined on pages
 * that exist in one language only (professional area, articles for professionals).
 */
function useLanguageSwitch(path: string) {
  const lang = useLang();
  const other = lang === 'en' ? 'fr' : 'en';
  const href = routePath(matchRoute(path), other);
  return href ? { href, lang: other, label: other === 'en' ? 'English version' : 'Version française' } : undefined;
}

export function Header() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const savedCount = useSavedCount();
  const pro = useProHint();
  const t = useT();
  const p = usePaths();
  const proLang = useProLang();
  const switchTo = useLanguageSwitch(path);

  useEffect(() => setOpen(false), [path]);

  const mobileLinkClass = (active: boolean) =>
    `block py-3.5 font-display text-xl ${active ? 'text-pine' : 'text-ink'}`;

  return (
    <>
      <div className="bg-ink text-[0.8rem] text-white/75 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2 sm:px-8">
          <p>
            {t(
              <>
                <span className="font-semibold text-white">{venues.length} lieux de réception</span> référencés dans{' '}
                {zones.length} secteurs du Var
              </>,
              <>
                <span className="font-semibold text-white">{venues.length} wedding venues</span> across {zones.length} areas of
                the Var
              </>,
            )}
          </p>
          <nav aria-label={t('Secteurs', 'Areas')} className="hidden lg:ml-auto lg:block">
            <ul className="flex items-center gap-4">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={p.zone(z.slug)} className="transition-colors hover:text-white">
                    {z.name} <span className="text-white/45">{venuesInZone(z.slug).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-4 lg:border-l lg:border-white/20 lg:pl-6">
            <Link
              href={pro ? paths.account : paths.login}
              hrefLang={proLang}
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              {pro ? t('Mon compte', 'My account') : t('Espace pro', 'For professionals')}
            </Link>
            {switchTo && (
              <Link
                href={switchTo.href}
                hrefLang={switchTo.lang}
                lang={switchTo.lang}
                aria-label={switchTo.label}
                className="rounded-full border border-white/30 px-2 py-0.5 text-[0.72rem] font-semibold tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                {switchTo.lang.toUpperCase()}
              </Link>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md print:hidden">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t('Aller au contenu', 'Skip to content')}
        </a>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href={p.home} className="group flex flex-col leading-none" aria-label={t(`${site.name}, accueil`, `${site.name}, home`)}>
            <span className="font-display text-xl uppercase tracking-[0.28em] text-ink sm:text-[1.4rem]">{site.name}</span>
            <span className="mt-1 text-[0.8rem] text-muted">{t(site.tagline, 'Wedding venues in the Var')}</span>
          </Link>

          <nav aria-label={t('Navigation principale', 'Main navigation')} className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              <li>
                <Link href={p.home} aria-current={path === p.home ? 'page' : undefined} className={navLinkClass(isVenues(path, p))}>
                  {t('Les lieux', 'Venues')}
                </Link>
              </li>
              <VendorsMenu path={path} />
              <JournalMenu path={path} />
              <li className="hidden lg:block">
                <Link
                  href={p.saved}
                  aria-current={path === p.saved ? 'page' : undefined}
                  aria-label={t(`Mes lieux enregistrés (${savedCount})`, `Saved venues (${savedCount})`)}
                  className={`${navLinkClass(path === p.saved)} inline-flex items-center`}
                >
                  {t('Mes lieux', 'Saved venues')}
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
              hrefLang={proLang}
              className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex"
            >
              {t('Référencer mon lieu', 'List your venue')}
            </Link>

            <button
              type="button"
              className="rounded-full border border-ink/25 px-4 py-1.5 text-sm font-semibold text-ink md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? t('Fermer', 'Close') : 'Menu'}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="menu-mobile"
            aria-label={t('Navigation mobile', 'Mobile navigation')}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
          >
            <ul className="divide-y divide-line/70 px-5 py-3">
              <li>
                <Link href={p.home} className={mobileLinkClass(isVenues(path, p))}>
                  {t('Les lieux', 'Venues')}
                </Link>
              </li>
              <li className="pb-3">
                <Link href={p.prestataires} className={mobileLinkClass(isVendors(path, p))}>
                  {t('Prestataires', 'Vendors')}
                </Link>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-1">
                  {vendorCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={p.vendor(c.slug)}
                        className={`text-[0.95rem] ${path === p.vendor(c.slug) ? 'font-semibold text-pine' : 'text-muted'}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href={p.journal} className={mobileLinkClass(isJournal(path, p))}>
                  Journal
                </Link>
              </li>
              <li>
                <Link href={p.saved} className={`${mobileLinkClass(path === p.saved)} flex items-center`}>
                  {t('Mes lieux enregistrés', 'Saved venues')}
                  <SavedCount count={savedCount} />
                </Link>
              </li>
              <li className="space-y-3 pt-4">
                <Link
                  href={path === paths.referencer ? '#formulaire' : paths.referencer}
                  hrefLang={proLang}
                  className="btn-primary w-full"
                >
                  {t('Référencer mon lieu', 'List your venue (in French)')}
                </Link>
                <Link href={`${p.prestataires}#referencer`} className="btn-ghost w-full">
                  {t('Référencer mon activité de prestataire', 'List your vendor business')}
                </Link>
                <Link
                  href={pro ? paths.account : paths.login}
                  hrefLang={proLang}
                  className="block py-2 text-center text-[0.95rem] font-semibold text-ink underline underline-offset-2"
                >
                  {pro
                    ? t('Mon compte professionnel', 'My professional account (in French)')
                    : t('Espace pro : se connecter', 'For professionals: sign in (in French)')}
                </Link>
                {switchTo && (
                  <Link
                    href={switchTo.href}
                    hrefLang={switchTo.lang}
                    lang={switchTo.lang}
                    className="block py-2 text-center text-[0.95rem] text-muted underline underline-offset-2"
                  >
                    {switchTo.label} ({switchTo.lang.toUpperCase()})
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
