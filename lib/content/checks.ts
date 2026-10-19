/**
 * Checks that span more than one content file, which per-file schemas can't express.
 * Each returns a list of human-readable problems; an empty list means the content is consistent.
 */

type ProjectLike = { slug: string; order: number; featured: boolean };

export function checkProjects(projects: readonly ProjectLike[]): string[] {
  const problems: string[] = [];
  if (projects.length === 0) problems.push("content/projects: add at least one project.");
  else if (!projects.some((p) => p.featured)) problems.push("content/projects: mark at least one project `featured: true`.");

  const byOrder = new Map<number, string>();
  for (const p of projects) {
    const clash = byOrder.get(p.order);
    if (clash) problems.push(`content/projects: "${clash}" and "${p.slug}" both use order ${p.order}; give each a unique number.`);
    byOrder.set(p.order, p.slug);
  }
  return problems;
}

/** Fails loudly when a singleton file (e.g. content/profile.yaml) is missing. */
export function only<T>(items: readonly T[], file: string): T {
  const [item] = items;
  if (items.length !== 1 || !item) throw new Error(`Expected exactly one ${file}, found ${items.length}.`);
  return item;
}
