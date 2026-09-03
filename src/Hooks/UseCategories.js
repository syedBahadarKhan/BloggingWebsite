import { getAllCategories } from "../api/contentful";
import { useAsync } from "./useAsync";

export function useCategories() {
  return useAsync(getAllCategories, []);
}
