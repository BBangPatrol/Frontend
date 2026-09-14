import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNickname } from "../../api/users";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "me"],
      });
    },
  });
}
