import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../api/stores";
import { collectionQueryKey } from "./useGetCollection";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSuccess: (_result, variables) => {

      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      void queryClient.invalidateQueries({ queryKey: ["stores", variables.storeId, "reviews"] });
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey });

    },
  });
}
