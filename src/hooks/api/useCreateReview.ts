import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../api/stores";
import { missionsQueryKey } from "./useMissions";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (_result, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["stores", variables.storeId, "reviews"] });
      void queryClient.invalidateQueries({ queryKey: missionsQueryKey });
    },
  });
}
