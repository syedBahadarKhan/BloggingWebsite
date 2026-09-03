import { Link } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "../../utils/formatDate";

export default function PostCard({ post }) {
  if (!post?.fields) return null;

  const { title, slug, excerpt, coverImage, category, publishedDate, readingTime } =
    post.fields;
  const imageUrl = coverImage?.fields?.file?.url;

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
        {excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{formatDate(publishedDate)}</span>
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
