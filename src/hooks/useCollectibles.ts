import { useQuery } from "@tanstack/react-query";
import { getMyCollectibles } from "../api/collectibles";

export function useCollectibles() {
  return useQuery({
    queryKey: ["collectibles", "me"],
    queryFn: getMyCollectibles,
  });
}
