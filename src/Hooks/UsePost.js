import { getPostBySlug } from "../api/contentful";
import { useAsync } from "./useAsync";

export function usePost(slug) {
  return useAsync(() => getPostBySlug(slug), [slug]);
}
