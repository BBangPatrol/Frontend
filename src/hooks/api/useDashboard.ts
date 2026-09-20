import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/users";

export const dashboardQueryKey = ["users", "me", "dashboard"] as const;

export function useDashboard(isLoggedIn: boolean) {
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: getDashboard,
    enabled: isLoggedIn,
  });
}
