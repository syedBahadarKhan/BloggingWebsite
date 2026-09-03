import { getAllCategories } from "../api/contenFul";
import { useAsync } from "./UseAsync";

export function useCategories() {
  return useAsync(getAllCategories, []);
}
