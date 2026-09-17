import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../api/collection";

export const collectionQueryKey = ["collection"] as const;

export function useCollection(isLoggedIn: boolean) {
  return useQuery({
    queryKey: [...collectionQueryKey],
    queryFn: () => getCollection(),
    enabled: isLoggedIn,
  });
}
