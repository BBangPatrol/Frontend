import { useQuery } from "@tanstack/react-query";
import { getPointHistory } from "../../api/users";

export function usePointHistory(page: number) {
  return useQuery({
    queryKey: ["users", "me", "points", page],
    queryFn: () => getPointHistory(page),
  });
}
