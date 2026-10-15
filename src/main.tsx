import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { cleanPath, Router } from './router.tsx';
import { loadEmbeddedCatalog } from './catalog.ts';
import { setContentLanguage } from './i18n/content.ts';
import { langOf } from './i18n/lang.ts';
import { setTeamDevice } from './lib/track.ts';
import './index.css';

// Listings from professional accounts embedded at build time: needed before the first render.
loadEmbeddedCatalog();
// Content in the language of the page, as it was prerendered.
setContentLanguage(langOf(cleanPath(location.pathname)));

// "?stats=off" on any page: this browser belongs to the team and is no longer counted ("?stats=on" undoes it).
// The parameter is then removed from the address, so it is not shared by mistake.
const statsParam = new URLSearchParams(location.search).get('stats');
if (statsParam === 'off' || statsParam === 'on') {
  setTeamDevice(statsParam === 'off');
  const url = new URL(location.href);
  url.searchParams.delete('stats');
  history.replaceState(history.state, '', url.pathname + url.search + url.hash);
}

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <Router initialPath={location.pathname}>
      <App />
    </Router>
  </StrictMode>
);

// Pages are prerendered at build time: hydrate them when the markup matches this URL,
// otherwise (dev server, SPA fallback) render from scratch.
if (container.firstElementChild && container.dataset.path === cleanPath(location.pathname)) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
