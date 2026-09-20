import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getStoreReviews } from "../../api/stores";
import type { RootState } from "../../store/store";

export function useStoreReviews(storeId: string, page = 0) {
  const withAuth = useSelector((state: RootState) => Boolean(state.auth.accessToken));

  return useQuery({
    queryKey: ["stores", storeId, "reviews", page, withAuth ? "authenticated" : "anonymous"],
    queryFn: () => getStoreReviews(storeId, page, withAuth),
    enabled: Boolean(storeId),
  });
}
