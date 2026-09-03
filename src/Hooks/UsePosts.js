import { getAllPosts } from "../api/contentful";
import { useAsync } from "./useAsync";

export function usePosts() {
  return useAsync(getAllPosts, []);
}
