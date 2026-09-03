import { useParams, Link } from "react-router-dom";
import { usePost } from "../Hooks/UsePost";
import { useRelatedPosts } from "../Hooks/UseRelatedPost";
import OptimizedImage from "../Components/UI/OptimizedImage";
import CategoryBadge from "../Components/Blogs/categorybadge";
import AuthorCard from "../Components/Blogs/AuthorCard";
import RichTextRenderer from "../Components/richTexts/RichtextRenderer";
import RelatedPosts from "../Components/Blogs/RelatedPosts";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ErrorState from "../Components/UI/ErrorState";
import EmptyState from "../Components/UI/EmptyState";
import NotFound from "./NotFound";
import { formatDate } from "../Utils/foramteDate";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = usePost(slug);

  const category = post?.fields?.categories;
  const { data: relatedPosts, loading: relatedLoading } = useRelatedPosts(
    category,
    slug
  );

  if (loading) return <LoadingSpinner label="Loading post..." />;
  if (error) return <ErrorState message={error.message} />;
  if (!post) return <NotFound />;

  const {
    title,
    description,
    blogImage,
    body,
    author,
    categories,
    publishDate,
    readingTime,
  } = post.fields;
  const imageUrl = blogImage?.[0]?.fields?.file?.url;

  if (!body) {
    return (
      <EmptyState title="This post has no content yet" message="Check back soon." />
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/blog" className="text-sm text-blue-600 font-medium">
        ← Back to all posts
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <CategoryBadge category={categories} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 leading-tight">
        {title}
      </h1>
      {description && <p className="text-gray-500 text-lg mt-3">{description}</p>}

      <div className="flex items-center justify-between flex-wrap gap-4 mt-6 mb-8">
        <AuthorCard author={author} compact />
        <div className="text-sm text-gray-400">
          <span>{formatDate(publishDate)}</span>
          {readingTime && <span> • {readingTime} min read</span>}
        </div>
      </div>

      {imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-10">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            width={1200}
            eager
            className="w-full object-cover"
          />
        </div>
      )}

      <RichTextRenderer document={body} />

      <div className="mt-10 pt-6 border-t border-gray-100">
        <AuthorCard author={author} />
      </div>

      <RelatedPosts posts={relatedPosts} loading={relatedLoading} />
    </article>
  );
}
