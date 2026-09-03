import { Link } from "react-router-dom";
import OptimizedImage from "../UI/OptimizedImage";
import CategoryBadge from "./categorybadge";
import { formatDate } from "../../Utils/foramteDate";

export default function PostCard({ post }) {
  if (!post?.fields) return null;

  const { title, slug, description, blogImage, categories, publishDate, readingTime } =
    post.fields;
  const category = categories ? { fields: { title: categories, slug: categories.toLowerCase().replace(/\s+/g, "-") } } : null;
  const imageUrl = blogImage?.[0]?.fields?.file?.url;

  return (
    <Link
      to={`/blog/${slug}`}
      className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow bg-white flex flex-col"
    >
      <div className="h-48 overflow-hidden bg-gray-100">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          width={600}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <CategoryBadge category={category} />
        </div>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{description}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{formatDate(publishDate)}</span>
          {readingTime && (
            <>
              <span>•</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
