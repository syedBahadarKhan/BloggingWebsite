import { Link } from "react-router-dom";
import OptimizedImage from "../UI/OptimizedImage";
import CategoryBadge from "../Blogs/categorybadge";
import { formatDate } from "../../Utils/foramteDate";
import Button from "../UI/Button";

export default function FeaturedPost({ post }) {
  if (!post?.fields) return null;

  const { title, slug, description, blogImage, categories, publishDate, readingTime } =
    post.fields;
  const category = categories ? { fields: { title: categories, slug: categories.toLowerCase().replace(/\s+/g, "-") } } : null;
  const imageUrl = blogImage?.[0]?.fields?.file?.url;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 bg-gray-100">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          width={1200}
          eager
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Featured
          </span>
          <CategoryBadge category={category} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        {description && <p className="text-gray-600 text-lg leading-relaxed">{description}</p>}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{formatDate(publishDate)}</span>
          {readingTime && (
            <>
              <span>•</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </div>
        <div>
          <Button as={Link} to={`/blog/${slug}`}>
            Read Article
          </Button>
        </div>
      </div>
    </div>
  );
}
