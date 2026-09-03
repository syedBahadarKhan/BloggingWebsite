import { getAllPosts } from "../api/contenFul";
import { useAsync } from "./UseAsync";

export function usePosts() {
  return useAsync(getAllPosts, []);
}
