import { useQuery } from "@tanstack/react-query";

import { getCollection } from "../../api/collection";

export const collectionQueryKey = ["collection"] as const;

export function useCollection(isLoggedIn: boolean, query?: string) {
  return useQuery({
    queryKey: [...collectionQueryKey, query],
    queryFn: () => getCollection(query),
    enabled: isLoggedIn,
  });
}
