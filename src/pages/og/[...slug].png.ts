// Open Graph images (1200×630), one per page, rendered at build time.
// Layout.astro points og:image at /og/<page path>.png.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../../config';
import { getPosts, formatDate } from '../../data/posts';

// Catppuccin Mocha, same as the site's dark theme.
const c = { bg: '#1e1e2e', line: '#45475a', fg: '#cdd6f4', soft: '#bac2de', dim: '#9399b2', accent: '#cba6f7', date: '#fab387' };

// Satori can't read woff2, hence the static (non-variable) fontsource packages.
const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = [
  { name: 'Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff'), weight: 700 as const },
  { name: 'Display', data: font('space-grotesk', 'space-grotesk-latin-700-normal.woff'), weight: 700 as const },
];

interface Card { prompt: string; title: string; subtitle?: string; meta?: string }

export const getStaticPaths = (async () => {
  const page = (slug: string, card: Card) => ({ params: { slug }, props: card });
  const posts = await getPosts();
  const projects = await getCollection('projects');
  return [
    page('index', { prompt: 'whoami', title: site.name, subtitle: site.description }),
    page('blog', { prompt: 'git log --oneline blog/', title: 'Blog', subtitle: 'Notes on product engineering, AI agents and dev tooling.' }),
    page('projects', { prompt: 'ls projects/', title: 'Side projects', subtitle: 'Tools, extensions, bots and pro-bono websites.' }),
    page('cv', { prompt: 'cat cv.md', title: 'CV', subtitle: 'Product engineer. 15+ years, prototype to scale.' }),
    ...posts.map((p) => page(`blog/${p.id}`, { prompt: 'cat blog/post.md', title: p.data.title, meta: formatDate(p.data.publishedAt) })),
    ...projects.map((p) => page(`projects/${p.id}`, { prompt: `cat projects/${p.id}/README.md`, title: p.data.title, subtitle: p.data.summary })),
  ];
}) satisfies GetStaticPaths;

// Tiny hyperscript so this file doesn't need JSX.
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]) =>
  ({ type, props: { style: { display: 'flex', ...style }, children } });

export const GET: APIRoute = async ({ props }) => {
  const { prompt, title, subtitle, meta } = props as Card;
  const size = title.length > 60 ? 60 : title.length > 32 ? 72 : 96;
  // Block cursor only when the title fits on one line (~0.55em per glyph).
  const cursor = title.length * size * 0.55 < 960;
  const svg = await satori(
    h('div', { width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: c.bg, color: c.fg, fontFamily: 'Mono', fontSize: 28 },
      h('div', { fontWeight: 700 }, h('span', { color: c.accent }, '~/'), 'arnaud.rocks'),
      h('div', { flexDirection: 'column', gap: 28 },
        h('div', { color: c.dim }, h('span', { color: c.accent, marginRight: 16 }, '$'), prompt),
        h('div', { alignItems: 'flex-end' },
          h('div', { fontFamily: 'Display', fontWeight: 700, fontSize: size, lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: 1056 }, title),
          cursor ? h('div', { width: size * 0.5, height: size * 0.8, marginLeft: size * 0.12, marginBottom: size * 0.12, background: c.accent, flexShrink: 0 }) : '',
        ),
        subtitle ? h('div', { color: c.soft, fontSize: 30, lineHeight: 1.45, maxWidth: 960 }, subtitle) : '',
        meta ? h('div', { color: c.date }, meta) : '',
      ),
      h('div', {}),
    ) as any,
    { width: 1200, height: 630, fonts },
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
