import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../api/stores";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSuccess: (_result, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["stores", variables.storeId, "reviews"],
      });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
