import { getCategoryBySlug, getPostsByCategorySlug } from "../api/contentful";
import { useAsync } from "./useAsync";

/**
 * Returns { category, posts } together for the CategoryPage.
 */
export function useCategoryPosts(categorySlug) {
  return useAsync(async () => {
    const [category, posts] = await Promise.all([
      getCategoryBySlug(categorySlug),
      getPostsByCategorySlug(categorySlug),
    ]);
    return { category, posts };
  }, [categorySlug]);
}
