import { lazy, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useRouter } from './router';
import { applyHead, getSeo, matchRoute, Route } from './routes';
import { emptyFilters, Filters, HomePage } from './pages/HomePage';
import { VenuePage } from './pages/VenuePage';
import { ZonePage } from './pages/ZonePage';
import { JournalPage } from './pages/JournalPage';
import { ArticlePage } from './pages/ArticlePage';
import { PrestatairesPage } from './pages/PrestatairesPage';
import { VendorCategoryPage } from './pages/VendorCategoryPage';
import { VendorPage } from './pages/VendorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ListYourVenuePage } from './pages/ListYourVenuePage';
import { SavedPage } from './pages/SavedPage';
import { SavedShortcut } from './components/SavedShortcut';
import { refreshCatalog, useCatalogState } from './catalog';
import { track } from './lib/track';
import { setContentLanguage } from './i18n/content';
import { langOf, useLang } from './i18n/lang';

// The statistics page and the professional area (with the Firebase sign-in code) load only when opened.
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/account/LoginPage'));
const AccountPage = lazy(() => import('./pages/account/AccountPage'));
const ListingEditorPage = lazy(() => import('./pages/account/ListingEditorPage'));

/** Pages of listings published after the build only exist once the browser has fetched them. */
const LISTING_PATH = /^(\/en)?\/(lieux|venues|prestataires\/[^/]+|vendors\/[^/]+)\/[^/]+$/;

/** The dashboard and the professional area are not counted as visits of the site. */
const PRIVATE_ROUTES: Route['name'][] = ['admin', 'login', 'account', 'listingEditor'];

export default function App() {
  const { path } = useRouter();
  // Re-render when listings published since the build arrive.
  const catalog = useCatalogState();
  // Shared content in the language of this page, before anything reads it.
  setContentLanguage(langOf(path));
  const route = matchRoute(path);
  // Kept here so filters survive a round trip to a venue page.
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const firstRender = useRef(true);

  useEffect(() => {
    void refreshCatalog();
  }, []);

  // One visit per session, recorded on the first public page reached.
  useEffect(() => {
    if (!PRIVATE_ROUTES.includes(route.name)) void track('visit', '');
  }, [route.name]);

  useEffect(() => {
    // Prerendered HTML for this exact path already carries the right head tags.
    const prerendered = firstRender.current && document.getElementById('root')?.dataset.path === path;
    firstRender.current = false;
    if (!prerendered) applyHead(getSeo(route, path));
  }, [path, catalog.version]);

  const waitingForListing = route.name === 'notFound' && !catalog.refreshed && LISTING_PATH.test(path);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenu" className="flex-1">
        {waitingForListing ? <Loading /> : <Page route={route} filters={filters} onFiltersChange={setFilters} />}
      </main>
      <Footer />
      <SavedShortcut />
    </div>
  );
}

function Loading() {
  const lang = useLang();
  return <p className="mx-auto max-w-6xl px-5 py-16 text-muted sm:px-8">{lang === 'en' ? 'Loading…' : 'Chargement…'}</p>;
}

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function Page({ route, filters, onFiltersChange }: { route: Route; filters: Filters; onFiltersChange: (f: Filters) => void }) {
  switch (route.name) {
    case 'home':
      return <HomePage filters={filters} onFiltersChange={onFiltersChange} />;
    case 'venue':
      return <VenuePage key={route.venue.slug} venue={route.venue} />;
    case 'zone':
      return <ZonePage zone={route.zone} />;
    case 'journal':
      return <JournalPage />;
    case 'article':
      return <ArticlePage article={route.article} />;
    case 'prestataires':
      return <PrestatairesPage />;
    case 'vendor':
      return <VendorCategoryPage key={route.category.slug} category={route.category} />;
    case 'vendorPage':
      return <VendorPage key={`${route.category.slug}.${route.vendor.slug}`} vendor={route.vendor} category={route.category} />;
    case 'confidentialite':
      return <PrivacyPage />;
    case 'terms':
      return <TermsPage />;
    case 'referencer':
      return <ListYourVenuePage />;
    case 'saved':
      return <SavedPage />;
    case 'login':
      return (
        <Lazy>
          <LoginPage />
        </Lazy>
      );
    case 'account':
      return (
        <Lazy>
          <AccountPage />
        </Lazy>
      );
    case 'listingEditor':
      return (
        <Lazy>
          <ListingEditorPage />
        </Lazy>
      );
    case 'admin':
      return (
        <Lazy>
          <AdminPage />
        </Lazy>
      );
    case 'notFound':
      return <NotFoundPage />;
  }
}
