import { Link } from "react-router-dom";

/**
 * Renders a colored category pill. Accepts either a resolved Contentful
 * category entry ({ fields: { title, slug, color } }) or nothing (renders null).
 */
export default function CategoryBadge({ category, size = "sm" }) {
  if (!category) return null;

  const title = typeof category === "string" ? category : category.fields?.title;
  const slug = typeof category === "string"
    ? category.toLowerCase().trim().replace(/\s+/g, "-")
    : category.fields?.slug;
  const color = category.fields?.color;
  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5";

  return (
    <Link
      to={`/category/${slug}`}
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={{
        backgroundColor: `${color || "#3B82F6"}1A`,
        color: color || "#3B82F6",
      }}
    >
      {title}
    </Link>
  );
}
