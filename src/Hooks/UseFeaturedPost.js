import { getFeaturedPost } from "../api/contentful";
import { useAsync } from "./useAsync";

export function useFeaturedPost() {
  return useAsync(getFeaturedPost, []);
}
