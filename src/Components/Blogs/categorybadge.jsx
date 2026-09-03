import { Link } from "react-router-dom";

/**
 * Renders a colored category pill. Accepts either a resolved Contentful
 * category entry ({ fields: { title, slug, color } }) or nothing (renders null).
 */
export default function CategoryBadge({ category, size = "sm" }) {
  if (!category?.fields) return null;

  const { title, slug, color } = category.fields;
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
