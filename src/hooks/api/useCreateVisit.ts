import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVisit } from "../../api/stores";
import { dashboardQueryKey } from "./useDashboard";
import { collectionQueryKey } from "./useGetCollection";
import { missionsQueryKey } from "./useMissions";

export function useCreateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: collectionQueryKey });
      void queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
      void queryClient.invalidateQueries({ queryKey: missionsQueryKey });
    },
  });
}
