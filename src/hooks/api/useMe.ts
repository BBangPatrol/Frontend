import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/auth";

export function useMe() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
}
