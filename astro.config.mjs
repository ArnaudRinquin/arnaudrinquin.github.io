// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arnaud.rocks',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // srcset + sizes on every image, Markdown ones included.
  image: { layout: 'constrained' },
  vite: { plugins: [tailwindcss()] },
});
