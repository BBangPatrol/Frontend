import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/users";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";

export function useDeleteUser() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(),

    onSettled: () => {
      dispatch(clearAuth());
      queryClient.clear();
    },
  });
}
