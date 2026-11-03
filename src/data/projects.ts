import { getCollection } from 'astro:content';

/** Projects sorted for display. Drafts show in dev only, like blog posts. */
export async function getProjects(filter: (p: { data: { featured: boolean } }) => boolean = () => true) {
  const projects = await getCollection('projects', (p) => (import.meta.env.DEV || !p.data.draft) && filter(p));
  return projects.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}
