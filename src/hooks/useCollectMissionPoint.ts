import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectMissionPoint, type Missions } from "../api/missions";
import { missionsQueryKey } from "./useMissions";

export function useCollectMissionPoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectMissionPoint,
    onMutate: async (missionId) => {
      await queryClient.cancelQueries({ queryKey: missionsQueryKey });
      const previousMissions = queryClient.getQueryData<Missions>(missionsQueryKey);

      queryClient.setQueryData<Missions>(missionsQueryKey, (current) =>
        current
          ? {
              ...current,
              missions: current.missions.map((mission) => (mission.id === missionId ? { ...mission, status: "completed" } : mission)),
            }
          : current,
      );

      return { previousMissions };
    },
    onError: (_error, _missionId, context) => {
      if (context?.previousMissions) queryClient.setQueryData(missionsQueryKey, context.previousMissions);
    },
  });
}
