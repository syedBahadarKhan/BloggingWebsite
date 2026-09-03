import { Link } from "react-router-dom";
import OptimizedImage from "../UI/OptimizedImage";

/**
 * Renders whatever entry type was embedded inline in a rich text body.
 * Handles the two content types most likely to be embedded per the
 * assignment: blogPost (cross-link to another article) and author
 * (inline author spotlight). Falls back gracefully for anything else.
 */
export default function EmbeddedEntryCard({ entry }) {
  const contentType = entry?.sys?.contentType?.sys?.id;

  if (!entry?.fields) {
    return (
      <div className="my-6 p-4 rounded-lg border border-dashed border-gray-300 text-sm text-gray-400">
        Embedded entry unavailable
      </div>
    );
  }

  if (contentType === "blogPost") {
    const { title, slug, description, blogImage } = entry.fields;
    const imageUrl = blogImage?.[0]?.fields?.file?.url;
    return (
      <Link
        to={`/blog/${slug}`}
        className="my-6 flex gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow no-underline"
      >
        <OptimizedImage
          src={imageUrl}
          alt={title}
          width={200}
          className="h-20 w-28 object-cover rounded-lg flex-shrink-0"
        />
        <div>
          <p className="text-xs text-blue-600 font-medium mb-1">Related Article</p>
          <p className="font-semibold text-gray-900">{title}</p>
          {description && <p className="text-sm text-gray-500 line-clamp-1">{description}</p>}
        </div>
      </Link>
    );
  }

  if (contentType === "author") {
    const { name, avatar, role } = entry.fields;
    const avatarUrl = avatar?.fields?.file?.url;
    return (
      <div className="my-6 flex items-center gap-3 p-4 rounded-xl bg-gray-50">
        <OptimizedImage
          src={avatarUrl}
          alt={name}
          width={100}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          {role && <p className="text-xs text-gray-500">{role}</p>}
        </div>
      </div>
    );
  }

  return null;
}
