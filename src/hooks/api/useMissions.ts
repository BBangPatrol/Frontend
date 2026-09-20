import { useQuery } from "@tanstack/react-query";
import { getMissions } from "../../api/missions";

export const missionsQueryKey = ["missions"] as const;

export function useMissions(cursor?: number) {
  return useQuery({
    queryKey: [...missionsQueryKey, "all", cursor ?? 0],
    queryFn: () => getMissions(cursor),
  });
}
