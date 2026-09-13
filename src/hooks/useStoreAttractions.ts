import { useQuery } from "@tanstack/react-query";
import { getStoreAttractions } from "../api/stores";

export function useStoreAttractions(storeId: string) {
  return useQuery({
    queryKey: ["stores", storeId, "attractions"],
    queryFn: () => getStoreAttractions(storeId),
    enabled: Boolean(storeId),
  });
}
