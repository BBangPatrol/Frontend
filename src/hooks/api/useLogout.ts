import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout } from "../../api/auth";
import { clearAuth } from "../../store/authSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      dispatch(clearAuth());
      queryClient.clear();
    },
  });
}
