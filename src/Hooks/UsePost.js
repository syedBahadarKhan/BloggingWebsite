import { getPostBySlug } from "../api/contenFul"
import { useAsync } from "./UseAsync";

export function usePost(slug) {
  return useAsync(() => getPostBySlug(slug), [slug]);
}
