import { useQuery } from "@tanstack/react-query";
import { getStoreSearch, type StoreSearchParams } from "../api/stores";

export function useStoreSearch(params: StoreSearchParams) {
  return useQuery({
    queryKey: ["stores", "search", params],
    queryFn: () => getStoreSearch(params),
    staleTime: 0,
  });
}
