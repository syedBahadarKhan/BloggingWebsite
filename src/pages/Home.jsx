import { Link } from "react-router-dom";
import { useFeaturedPost } from "../Hooks/UseFeaturedPost";
import { usePosts } from "../Hooks/UsePosts";
import FeaturedPost from "../Components/Blogs/FeaturePost";
import PostGrid from "../Components/Blogs/PostGrid";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import ErrorState from "../Components/UI/ErrorState";
import Button from "../Components/UI/Button";

export default function Home() {
  const { data: featuredPost, loading: featuredLoading, error: featuredError } =
    useFeaturedPost();
  const { data: posts, loading: postsLoading, error: postsError } = usePosts();

  const latestPosts = posts ? posts.slice(0, 6) : [];

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Ideas worth <span className="text-blue-600">reading</span>.
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          A blog exploring technology, design, and everything in between —
          powered by a headless CMS.
        </p>
        <div className="mt-6">
          <Button as={Link} to="/blog">
            Browse all posts
          </Button>
        </div>
      </section>

      {/* Featured post */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {featuredLoading && <LoadingSpinner label="Loading featured post..." />}
        {featuredError && <ErrorState message={featuredError.message} />}
        {!featuredLoading && !featuredError && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}
      </section>

      {/* Latest posts grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <Link to="/blog" className="text-sm text-blue-600 font-medium">
            View all →
          </Link>
        </div>
        <PostGrid posts={latestPosts} loading={postsLoading} error={postsError} />
      </section>
    </div>
  );
}
