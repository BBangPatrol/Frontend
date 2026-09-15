import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collectMissionPoint, type Missions } from "../../api/missions";
import { missionsQueryKey } from "./useMissions";

export function useCollectMissionPoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectMissionPoint,
    onSuccess: (_result, missionId) => {
      queryClient.setQueriesData<Missions>({ queryKey: [...missionsQueryKey, "all"] }, (data) =>
        data ? { ...data, missions: data.missions.map((mission) => (mission.id === missionId ? { ...mission, status: "completed" } : mission)) } : data,
      );
      void queryClient.invalidateQueries({ queryKey: missionsQueryKey, exact: true });
    },
  });
}
