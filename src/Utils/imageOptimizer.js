/**
 * Builds an optimized Contentful image URL using the Images API.
 * Contentful asset URLs come back protocol-relative ("//images.ctfassets.net/...")
 * so we prefix with https: if needed.
 *
 * Docs: https://www.contentful.com/developers/docs/references/images-api/
 */
export const optimizeImage = (url, { w = 800, q = 75, fm = "webp", fit = "fill" } = {}) => {
  if (!url) return "";
  const base = url.startsWith("//") ? `https:${url}` : url;
  const params = new URLSearchParams({
    w: String(w),
    q: String(q),
    fm,
    fit,
  });
  return `${base}?${params.toString()}`;
};

/**
 * Builds a responsive srcSet string for a Contentful image at multiple widths.
 * Pass to <img srcSet={...} sizes="..."> for real responsive loading.
 */
export const buildSrcSet = (url, widths = [400, 800, 1200, 1600]) => {
  if (!url) return "";
  return widths
    .map((w) => `${optimizeImage(url, { w })} ${w}w`)
    .join(", ");
};
