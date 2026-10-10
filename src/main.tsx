import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { cleanPath, Router } from './router.tsx';
import { loadEmbeddedCatalog } from './catalog.ts';
import './index.css';

// Listings from professional accounts embedded at build time: needed before the first render.
loadEmbeddedCatalog();

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
