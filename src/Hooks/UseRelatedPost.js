import { getRelatedPosts } from "../api/contenFul";
import { useAsync } from "./UseAsync";

export function useRelatedPosts(categoryId, excludeSlug) {
  return useAsync(() => {
    if (!categoryId) return Promise.resolve([]);
    return getRelatedPosts(categoryId, excludeSlug);
  }, [categoryId, excludeSlug]);
}
