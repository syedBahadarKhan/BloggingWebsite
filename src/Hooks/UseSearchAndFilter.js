import { useSearchParams } from "react-router-dom";
import { getFilteredPosts } from "../api/contentful";
import { useAsync } from "./useAsync";

/**
 * Drives the BlogListing page. Search term and category are stored in the
 * URL (?search=...&category=...) so results are shareable/bookmarkable —
 * standard practice for filterable listing pages.
 */
export function useSearchAndFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || "";

  const { data, loading, error } = useAsync(
    () => getFilteredPosts({ searchTerm, categorySlug }),
    [searchTerm, categorySlug]
  );

  const setSearchTerm = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("search", value);
    else next.delete("search");
    setSearchParams(next);
  };

  const setCategorySlug = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value);
    else next.delete("category");
    setSearchParams(next);
  };

  return {
    posts: data,
    loading,
    error,
    searchTerm,
    categorySlug,
    setSearchTerm,
    setCategorySlug,
  };
}
