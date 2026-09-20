import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReviewLike, type StoreReviews } from "../../api/stores";

type ToggleReviewLikeParams = {
  storeId: string;
  reviewId: number;
};

export function useToggleReviewLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReviewLike,
    onMutate: async ({ storeId, reviewId }: ToggleReviewLikeParams) => {
      const queryKey = ["stores", storeId, "reviews"];
      await queryClient.cancelQueries({ queryKey });
      const previousQueries = queryClient.getQueriesData<StoreReviews>({
        queryKey,
      });

      queryClient.setQueriesData<StoreReviews>({ queryKey }, (data) =>
        data
          ? {
              ...data,
              reviews: data.reviews.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      isLike: !review.isLike,
                      likeCount: Math.max(
                        0,
                        review.likeCount + (review.isLike ? -1 : 1),
                      ),
                    }
                  : review,
              ),
            }
          : data,
      );

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) =>
        queryClient.setQueryData(queryKey, data),
      );
    },
    onSuccess: ({ likes }, { storeId, reviewId }) => {
      queryClient.setQueriesData<StoreReviews>(
        { queryKey: ["stores", storeId, "reviews"] },
        (data) =>
          data
            ? {
                ...data,
                reviews: data.reviews.map((review) =>
                  review.id === reviewId && review.isLike !== likes
                    ? {
                        ...review,
                        isLike: likes,
                        likeCount: Math.max(
                          0,
                          review.likeCount + (likes ? 1 : -1),
                        ),
                      }
                    : review,
                ),
              }
            : data,
      );
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
}
