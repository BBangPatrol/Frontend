import { useQuery } from "@tanstack/react-query";
import { getStoreReviews } from "../api/stores";

export function useStoreReviews(storeId: string) {
  return useQuery({
    queryKey: ["stores", storeId, "reviews"],
    queryFn: () => getStoreReviews(storeId),
    enabled: Boolean(storeId),
  });
}
