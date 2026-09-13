import { useQuery } from "@tanstack/react-query";
import { getMissions } from "../../api/home";

export const missionsQueryKey = ["missions"] as const;

export function useMissions() {
  return useQuery({
    queryKey: [...missionsQueryKey],
    queryFn: () => getMissions(),
  });
}
