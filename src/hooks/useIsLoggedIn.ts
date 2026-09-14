import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function useIsLoggedIn() {
  return useSelector((state: RootState) => Boolean(state.auth.accessToken && state.auth.user));
}
