// Vite resolves these at build time to their final hashed asset URLs.
// Keys are relative to this file (src/data/), matching glob pattern exactly.
const _m = import.meta.glob(
  '../images/**/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

export function img(path: string): string {
  if (path.startsWith('http')) return path;
  return _m[`../images/${path}`] ?? path;
}
