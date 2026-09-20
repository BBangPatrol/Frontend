import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getStoreSearch, type StoreSearchParams } from "../../api/stores";
import type { RootState } from "../../store/store";

export function useStoreSearch(params: StoreSearchParams) {
  const withAuth = useSelector((state: RootState) => Boolean(state.auth.accessToken));

  return useQuery({
    queryKey: ["stores", "search", params, withAuth ? "authenticated" : "anonymous"],
    queryFn: () => getStoreSearch(params, withAuth),
    staleTime: 0,
  });
}
