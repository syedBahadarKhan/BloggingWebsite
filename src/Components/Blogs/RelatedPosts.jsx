import PostCard from "./PostCard";
import { GridSkeleton } from "../UI/Skeleton";

export default function RelatedPosts({ posts, loading }) {
  if (loading) return <GridSkeleton count={3} />;
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.sys.id} post={post} />
        ))}
      </div>
    </section>
  );
}
