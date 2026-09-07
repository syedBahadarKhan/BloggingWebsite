import { buildSrcSet, optimizeImage } from "../../Utils/imageOptimizer";

/**
 * Drop-in replacement for <img> that:
 * - Requests a right-sized image from the Contentful Images API
 * - Provides a responsive srcSet
 * - Lazy loads by default (can be disabled for above-the-fold hero images)
 */
export default function OptimizedImage({
  src,
  alt = "",
  width = 800,
  className = "",
  eager = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}) {
  if (!src) {
    return <div className={`bg-gray-100 ${className}`} aria-hidden="true" />;
  }

  return (
    <img
      src={optimizeImage(src, { w: width })}
      srcSet={buildSrcSet(src)}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
