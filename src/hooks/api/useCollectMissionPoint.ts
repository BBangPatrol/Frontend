import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectMissionPoint } from "../../api/missions";
import { missionsQueryKey } from "./useMissions";

export function useCollectMissionPoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectMissionPoint,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: missionsQueryKey }),
  });
}
