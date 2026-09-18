import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/users";

export function useDashboard(isLoggedIn: boolean) {
  return useQuery({
    queryKey: ["users", "me", "dashboard"],
    queryFn: getDashboard,
    enabled: isLoggedIn,
  });
}
