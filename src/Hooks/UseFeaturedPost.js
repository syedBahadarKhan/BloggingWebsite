import { getFeaturedPost } from "../api/contenFul";
import { useAsync } from "./UseAsync";

export function useFeaturedPost() {
  return useAsync(getFeaturedPost, []);
}
