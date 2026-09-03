import { useParams } from "react-router-dom";
import { useCategoryPosts } from "../Hooks/UseCategoryPosts";
import PostGrid from "../Components/Blogs/PostGrid";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ErrorState from "../Components/UI/ErrorState";
import NotFound from "./NotFound";

export default function CategoryPage() {
  const { slug } = useParams();
  const { data, loading, error } = useCategoryPosts(slug);

  if (loading) return <LoadingSpinner label="Loading category..." />;
  if (error) return <ErrorState message={error.message} />;
  if (!data?.category) return <NotFound />;

  const { category, posts } = data;
  const { title, color } = category.fields;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3"
          style={{ backgroundColor: `${color || "#3B82F6"}1A`, color: color || "#3B82F6" }}
        >
          Category
        </span>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">
          {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
        </p>
      </div>

      <PostGrid
        posts={posts}
        loading={false}
        error={null}
        emptyMessage="No posts have been published in this category yet."
      />
    </div>
  );
}
