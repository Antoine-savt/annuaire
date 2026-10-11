import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { cleanPath, Router } from './router.tsx';
import { loadEmbeddedCatalog } from './catalog.ts';
import { setContentLanguage } from './i18n/content.ts';
import { langOf } from './i18n/lang.ts';
import './index.css';

// Listings from professional accounts embedded at build time: needed before the first render.
loadEmbeddedCatalog();
// Content in the language of the page, as it was prerendered.
setContentLanguage(langOf(cleanPath(location.pathname)));

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
