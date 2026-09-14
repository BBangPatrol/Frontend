import { useQuery } from "@tanstack/react-query";
import { getStoreReviews } from "../../api/stores";

export function useStoreReviews(storeId: string, page = 0) {
  return useQuery({
    queryKey: ["stores", storeId, "reviews", page],
    queryFn: () => getStoreReviews(storeId, page),
    enabled: Boolean(storeId),
  });
}
