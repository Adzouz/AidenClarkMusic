// Vite resolves asset URLs at build time; dynamic `require()` is not supported.
const assets = import.meta.glob<string>('../assets/**/*.{png,jpg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** URL of a file under `src/assets`, e.g. `assetUrl('releases/m-royal/title.png')`. */
export const assetUrl = (path: string): string => {
  const url = assets[`../assets/${path}`];
  if (!url) {
    throw new Error(`Unknown asset: ${path}`);
  }
  return url;
};
