import { useQuery } from "@tanstack/react-query";
import { getStoreDetail } from "../api/stores";

export function useStoreDetail(storeId: string) {
  return useQuery({
    queryKey: ["stores", storeId, "detail"],
    queryFn: () => getStoreDetail(storeId),
    enabled: Boolean(storeId),
  });
}
