import { getRelatedPosts } from "../api/contentful";
import { useAsync } from "./useAsync";

export function useRelatedPosts(categoryId, excludeSlug) {
  return useAsync(() => {
    if (!categoryId) return Promise.resolve([]);
    return getRelatedPosts(categoryId, excludeSlug);
  }, [categoryId, excludeSlug]);
}
