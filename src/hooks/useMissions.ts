import { useQuery } from "@tanstack/react-query";
import { getMissions } from "../api/missions";

export const missionsQueryKey = ["missions", "all"] as const;

export function useMissions() {
  return useQuery({
    queryKey: missionsQueryKey,
    queryFn: getMissions,
  });
}
