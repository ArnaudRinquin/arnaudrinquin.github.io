// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arnaud.rocks',
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx', which drops whitespace between inline tags. Keep v5 output.
  compressHTML: true,
  integrations: [sitemap()],
  // srcset + sizes on every image, Markdown ones included.
  image: { layout: 'constrained' },
  vite: { plugins: [tailwindcss()] },
});
