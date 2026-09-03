import PostCard from "./PostCard";
import { GridSkeleton } from "../UI/Skeleton";
import ErrorState from "../UI/ErrorState";
import EmptyState from "../UI/EmptyState";

export default function PostGrid({ posts, loading, error, emptyMessage }) {
  if (loading) return <GridSkeleton />;
  if (error) return <ErrorState message={error.message} />;
  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        title="No posts found"
        message={emptyMessage || "Try a different search or check back later."}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
}
