import { useMutation, useQueryClient } from "@tanstack/react-query";
import { drawCollectible } from "../../api/collectibles";

export function useDrawCollectible() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: drawCollectible,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["collectibles", "me"] });
      void queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });
}
