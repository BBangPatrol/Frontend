import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVisit } from "../../api/stores";
import { missionsQueryKey } from "./useMissions";

export function useCreateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: missionsQueryKey }),
  });
}
