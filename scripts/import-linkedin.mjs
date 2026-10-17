// Turns posts scraped from the LinkedIn activity page into blog entries.
// Usage: node scripts/import-linkedin.mjs import/linkedin-posts.json <index>...
// Writes src/content/blog/<slug>.md (+ images in src/assets/blog/). The title is
// a draft from the first line: rewrite it (and rename the file) before publishing.
// Posts already imported (matched on linkedinUrl) are skipped, so it's safe to
// re-run with a fresh export.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';

const [file, ...indices] = process.argv.slice(2);
const posts = JSON.parse(readFileSync(file, 'utf8'));
mkdirSync('src/assets/blog', { recursive: true });
const imported = readdirSync('src/content/blog').map((f) => readFileSync(`src/content/blog/${f}`, 'utf8')).join('\n');

// LinkedIn has no markdown, so people fake bold with Unicode "mathematical" letters.
const FANCY = /[\u{1D400}-\u{1D7FF}]+(?:[\s'’,:.!?-]*[\u{1D400}-\u{1D7FF}]+)*/gu;
const unfancy = (s) => s.replace(FANCY, (m) => `**${m.normalize('NFKC')}**`);
const plain = (s) => s.normalize('NFKC').replace(/\*\*/g, '');

const slugify = (s) => plain(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 8).join('-');

const firstSentence = (s) => (s.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? s);

for (const i of indices) {
  const p = posts[Number(i)];
  const lines = p.text.replace(/\r/g, '').split('\n');
  const head = plain(lines[0]).replace(/^[^\p{L}\p{N}]+/u, '').trim();
  const title = (head.length <= 90 ? head : firstSentence(head)).replace(/[:.]$/, '');
  const rest = plain(lines.slice(1).join(' ')).replace(/\s+/g, ' ').trim();
  const description = (rest.length > 160 ? rest.slice(0, 157).replace(/\s\S*$/, '') + '…' : rest) || title;
  const date = p.date.slice(0, 10);
  const slug = slugify(title);
  const out = `src/content/blog/${slug}.md`;
  if (imported.includes(p.url)) { console.log('skip', p.url); continue; }

  const images = [];
  for (const [n, src] of p.images.entries()) {
    const res = await fetch(src);
    if (!res.ok) { console.warn(`image ${n} of #${i}: HTTP ${res.status}`); continue; }
    const name = `${slug}-${n + 1}.jpg`;
    writeFileSync(`src/assets/blog/${name}`, Buffer.from(await res.arrayBuffer()));
    images.push(`![](../../assets/blog/${name})`);
  }

  const body = unfancy(lines.join('\n')).replace(/\n{3,}/g, '\n\n').trim();
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `publishedAt: ${date}`,
    `linkedinUrl: ${p.url}`,
    '---',
  ].join('\n');
  writeFileSync(out, `${fm}\n\n${body}\n${images.length ? '\n' + images.join('\n\n') + '\n' : ''}`);
  console.log('wrote', out);
}
