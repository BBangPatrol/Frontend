import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStoreFavorite, type StoreSearch, type StoreSearchParams } from "../../api/stores";

export function useToggleStoreFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleStoreFavorite,
    onSuccess: ({ likes }, { storeId }) => {
      const queries = queryClient.getQueriesData<StoreSearch>({ queryKey: ["stores", "search"] });

      queries.forEach(([queryKey, data]) => {
        if (!data) return;

        const params = queryKey[2] as StoreSearchParams;
        const result = params.favoriteOnly && !likes
          ? data.result.filter((item) => item.bakery.id !== storeId)
          : data.result.map((item) => (item.bakery.id === storeId ? { ...item, likes } : item));
        queryClient.setQueryData(queryKey, { ...data, result });
      });
    },
  });
}
