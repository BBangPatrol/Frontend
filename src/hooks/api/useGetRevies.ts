import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../../api/users";

export const reviewsQueryKey = ["reviews"] as const;

export function useReviews(isLoggedIn: boolean) {
  return useQuery({
    queryKey: [...reviewsQueryKey],
    queryFn: () => getMyReviews(1),
    enabled: isLoggedIn,
  });
}
