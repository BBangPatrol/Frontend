import { useMutation, useQueryClient } from "@tanstack/react-query";
import { drawCollectible } from "../../api/collectibles";

export function useDrawCollectible() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: drawCollectible,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collectibles", "me"] }),
  });
}
