import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../api/stores";

type DeleteReviewParams = {
  storeId: number;
  reviewId: number;
  page?: number;
};

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, reviewId }: DeleteReviewParams) =>
      deleteReview({ storeId, reviewId }),

    onSuccess: (_, { storeId, page }) => {
      queryClient.invalidateQueries({
        queryKey: ["collection"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stores", storeId, "reviews", page || 0],
      });
    },
  });
}
