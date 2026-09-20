import { useQuery } from "@tanstack/react-query";
import { getAllCollectibles, getMyCollectibles } from "../../api/collectibles";

export function useCollectibles() {
  return useQuery({
    queryKey: ["collectibles", "me"],
    queryFn: getMyCollectibles,
  });
}

export function useAllCollectibles() {
  return useQuery({
    queryKey: ["collectibles", "all"],
    queryFn: getAllCollectibles,
  });
}
