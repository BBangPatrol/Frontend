import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMe, login } from "../api/auth";
import { clearAuth, setAccessToken, setUser } from "../store/authSlice";

export default function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const requestedRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 개발 모드에서도 같은 인가 코드를 두 번 전송하지 않도록 합니다.
    if (requestedRef.current) return;
    requestedRef.current = true;

    async function handleLogin() {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const savedState = sessionStorage.getItem("kakaoState");
      sessionStorage.removeItem("kakaoState");

      if (searchParams.has("error") || !code || !state || state !== savedState) {
        alert("카카오 로그인을 다시 시도해 주세요.");
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await login(code);
        dispatch(setAccessToken(response.data.accessToken));
        const user = await getMe();
        dispatch(setUser(user));
      } catch {
        dispatch(clearAuth());
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
      }

      navigate("/", { replace: true });
    }

    void handleLogin();
  }, [dispatch, navigate, searchParams]);

  return <div className="flex min-h-dvh items-center justify-center typo-body-03">로그인 중입니다...</div>;
}
