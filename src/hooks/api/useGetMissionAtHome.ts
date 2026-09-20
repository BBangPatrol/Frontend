import { useQuery } from "@tanstack/react-query";
import { getMissions } from "../../api/home";

export const missionsQueryKey = ["missions"] as const;

export function useMissions(isLoggedIn: boolean) {
  return useQuery({
    queryKey: [...missionsQueryKey],
    queryFn: () => getMissions(),
    enabled: isLoggedIn,
  });
}
