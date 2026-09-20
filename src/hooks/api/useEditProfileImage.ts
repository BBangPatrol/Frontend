import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileImage } from "../../api/users";

export function useEditProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users", "me"],
      });
    },
  });
}
