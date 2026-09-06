import { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { LoginErrorResponse } from "../api/auth";
import { API_BASE_URL } from "../api/config";
import { useLogin } from "../hooks/useLogin";
import { setAccessToken } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";

type LoginLog = {
  status: number | null;
  response: unknown;
};

const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY?.trim();
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI?.trim();
const pretty = (value: unknown) => JSON.stringify(value, null, 2);

export default function LoginTestPage() {
  const [searchParams] = useSearchParams();
  const [latestLog, setLatestLog] = useState<LoginLog | null>(null);
  const requestedCodeRef = useRef<string | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const authorizationCode = searchParams.get("code");
  const authorizationError = searchParams.get("error_description") ?? searchParams.get("error");

  const requestLogin = useCallback(
    (code: string) => {
      mutate(code, {
        onSuccess: (response) => {
          dispatch(setAccessToken(response.data.accessToken));
          setLatestLog({ status: Number(response.code), response });
          navigate("/login-test", { replace: true });
        },
        onError: (error) => {
          setLatestLog({
            status: isAxiosError(error) ? (error.response?.status ?? null) : null,
            response: isAxiosError<LoginErrorResponse>(error) ? (error.response?.data ?? error.message) : "로그인 요청에 실패했습니다.",
          });
        },
      });
    },
    [dispatch, mutate, navigate],
  );

  const kakaoLoginUrl = useMemo(() => {
    if (!KAKAO_REST_API_KEY || !KAKAO_REDIRECT_URI) return null;

    const url = new URL(KAKAO_AUTHORIZE_URL);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", KAKAO_REST_API_KEY);
    url.searchParams.set("redirect_uri", KAKAO_REDIRECT_URI);

    return url.toString();
  }, []);

  useEffect(() => {
    if (!authorizationCode || requestedCodeRef.current === authorizationCode) return;

    requestedCodeRef.current = authorizationCode;
    requestLogin(authorizationCode);
  }, [authorizationCode, requestLogin]);

  return (
    <main className="mx-auto min-h-dvh max-w-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">임시 카카오 로그인</h1>
        <div className="flex gap-3">
          <Link to="/mission" className="text-sm text-violet-600 underline">
            미션 페이지로 이동
          </Link>
          <Link to="/collection" className="text-sm text-violet-600 underline">
            컬렉션 페이지로 이동
          </Link>
          <Link to="/api-test" className="text-sm text-violet-600 underline">
            API 테스트로 이동
          </Link>
        </div>
      </div>

      <section className="mt-6 flex flex-col gap-4 rounded-lg border border-slate-200 p-5">
        <div>
          <p className="font-medium">Redirect URI</p>
          <p className="mt-1 break-all font-mono text-sm text-slate-500">{KAKAO_REDIRECT_URI || "VITE_KAKAO_REDIRECT_URI가 설정되지 않았습니다."}</p>
        </div>

        {kakaoLoginUrl ? (
          <a href={kakaoLoginUrl} className="flex h-10 items-center justify-center rounded-md bg-[#FEE500] px-4 font-semibold text-black">
            카카오 로그인
          </a>
        ) : (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">.env에 카카오 REST API 키와 Redirect URI를 설정해 주세요.</p>
        )}

        {import.meta.env.VITE_ENABLE_MSW === "true" && (
          <button type="button" disabled={isPending} onClick={() => requestLogin("test")} className="h-10 rounded-md bg-slate-800 px-4 font-semibold text-white disabled:opacity-50">
            가짜 로그인
          </button>
        )}

        {isPending && <p className="text-sm text-slate-500">서비스 로그인을 요청하고 있습니다.</p>}
        {authorizationError && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{authorizationError}</p>}
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 p-5">
        <h2 className="text-xl font-bold">현재 Access Token</h2>
        <pre className="mt-2 overflow-auto rounded-md bg-slate-900 p-4 font-mono text-sm whitespace-pre-wrap text-slate-100">{accessToken ?? "저장된 토큰이 없습니다."}</pre>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">로그인 응답</h2>
          {latestLog && <span className={latestLog.status && latestLog.status >= 400 ? "rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-700" : "rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700"}>{latestLog.status ?? "ERR"}</span>}
        </div>
        <p className="mt-2 break-all font-mono text-sm text-slate-500">POST {API_BASE_URL}/auth/login</p>
        <pre className="mt-5 min-h-24 max-h-80 overflow-auto rounded-md bg-slate-900 p-4 font-mono text-sm whitespace-pre-wrap text-slate-100">
          {latestLog ? pretty(latestLog.response) : ""}
        </pre>
      </section>
    </main>
  );
}
