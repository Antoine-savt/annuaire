import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Public URL of the site (canonical links, sitemap, Open Graph). SITE_URL wins, then the URL Netlify sets
  // during its builds; APP_URL is injected by AI Studio.
  const rawUrl = env.SITE_URL || env.URL || (env.APP_URL && env.APP_URL !== 'MY_APP_URL' ? env.APP_URL : '');
  const siteUrl = rawUrl.replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
