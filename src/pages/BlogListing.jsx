import { useSearchAndFilter } from "../Hooks/UseSearchAndFilter";
import { useCategories } from "../Hooks/UseCategories";
import PostGrid from "../Components/Blogs/PostGrid";
import SearchBar from "../Components/Blogs/SearchBar";
import CategoryFilter from "../Components/Blogs/CategoryFilter";

export default function BlogListing() {
  const {
    posts,
    loading,
    error,
    searchTerm,
    categorySlug,
    setSearchTerm,
    setCategorySlug,
  } = useSearchAndFilter();

  const { data: categories } = useCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        <p className="text-gray-500 mt-1">Search and filter articles by category.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          value={categorySlug}
          onChange={setCategorySlug}
        />
      </div>

      <PostGrid
        posts={posts}
        loading={loading}
        error={error}
        emptyMessage="Try a different keyword or clear the category filter."
      />
    </div>
  );
}
