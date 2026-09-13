import { useQuery } from "@tanstack/react-query";
import { getHotStores } from "../../api/home";

export const hotStoresQueryKey = ["hot-stores"] as const;

export function useHotStores() {
  return useQuery({
    queryKey: [...hotStoresQueryKey],
    queryFn: () => getHotStores(),
  });
}
