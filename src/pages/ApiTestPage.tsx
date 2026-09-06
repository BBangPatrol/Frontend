import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import type { FormEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { api } from "../api/client";
import { API_BASE_URL, API_PATH } from "../api/config";
import type { RootState } from "../store/store";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TokenMode = "stored" | "none";

type ApiRequest = {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  data?: unknown;
};

type ApiLog = {
  request: ApiRequest;
  status: number | null;
  response: unknown;
};

const methods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const hasBody = (method: HttpMethod) => method !== "GET" && method !== "DELETE";
const pretty = (value: unknown) => JSON.stringify(value, null, 2);
const resolveUrl = (url: string) => {
  const trimmedUrl = url.trim();

  if (/^https?:\/\//.test(trimmedUrl)) return trimmedUrl;
  if (trimmedUrl === API_PATH || trimmedUrl.startsWith(`${API_PATH}/`)) {
    return `${API_BASE_URL}${trimmedUrl.slice(API_PATH.length)}`;
  }

  return trimmedUrl;
};

function ApiTestPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("/stores/2/detail");
  const [body, setBody] = useState("");
  const [tokenMode, setTokenMode] = useState<TokenMode>("stored");
  const [latestLog, setLatestLog] = useState<ApiLog | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const apiMutation = useMutation({
    mutationFn: async (request: ApiRequest) => {
      const response = await api.request({
        ...request,
        url: resolveUrl(request.url),
      });
      return { status: response.status, data: response.data };
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: ApiRequest = {
      method,
      url: resolveUrl(url),
      headers: tokenMode === "stored" && accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    };

    try {
      request.data = hasBody(method) && body.trim() ? JSON.parse(body) : undefined;
      const response = await apiMutation.mutateAsync(request);
      setLatestLog({
        request,
        status: response.status,
        response: response.data,
      });
    } catch (error) {
      setLatestLog({
        request,
        status: isAxiosError(error) ? (error.response?.status ?? null) : null,
        response: isAxiosError(error) ? (error.response?.data ?? error.message) : error instanceof SyntaxError ? "Body가 올바른 JSON 형식이 아닙니다." : "요청에 실패했습니다.",
      });
    }
  };

  return (
    <main className="mx-auto min-h-dvh max-w-6xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">API 요청 테스트</h1>
        <Link to="/login-test" className="text-sm text-violet-600 underline">
          임시 로그인으로 이동
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-500">Base URL: {API_BASE_URL}</p>

      <section className="mt-6 grid gap-6 lg:grid-cols-[24rem_1fr]">
        <form className="flex flex-col gap-4 rounded-lg border border-slate-200 p-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="font-medium" htmlFor="method">
              HTTP 메서드
            </label>
            <select className="h-10 rounded-md border border-slate-300 px-3" id="method" value={method} onChange={(event) => setMethod(event.target.value as HttpMethod)}>
              {methods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="font-medium" htmlFor="url">
              요청 경로
            </label>
            <input className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm" id="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="/users" />
          </div>

          <div className="grid gap-2">
            <label className="font-medium" htmlFor="body">
              Body
            </label>
            <textarea
              className="min-h-48 resize-y rounded-md border border-slate-300 p-3 font-mono text-sm disabled:bg-slate-100"
              id="body"
              value={body}
              disabled={!hasBody(method)}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium" htmlFor="tokenMode">
              액세스 토큰
            </label>
            <select className="h-10 rounded-md border border-slate-300 px-3" id="tokenMode" value={tokenMode} onChange={(event) => setTokenMode(event.target.value as TokenMode)}>
              <option value="stored">로그인 페이지에서 저장한 토큰 {accessToken ? "(있음)" : "(없음)"}</option>
              <option value="none">미포함</option>
            </select>
          </div>

          <button type="submit" className="h-10 rounded-md bg-violet-600 px-4 font-semibold text-white hover:bg-violet-500 disabled:opacity-50" disabled={apiMutation.isPending}>
            {apiMutation.isPending ? "요청 중..." : "요청 보내기"}
          </button>
        </form>

        <div className="rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">요청/응답 결과</h2>
            {latestLog && (
              <span
                className={
                  latestLog.status && latestLog.status >= 400
                    ? "rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-700"
                    : "rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700"
                }
              >
                {latestLog.status ?? "ERR"}
              </span>
            )}
          </div>

          <div className="mt-5 grid gap-5">
            <div>
              <h3 className="font-semibold">요청</h3>
              <pre className="mt-2 max-h-80 overflow-auto rounded-md bg-slate-900 p-4 font-mono text-sm whitespace-pre-wrap text-slate-100">
                {latestLog ? pretty(latestLog.request) : pretty({ method, url })}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">응답</h3>
              <pre className="mt-2 min-h-24 max-h-80 overflow-auto rounded-md bg-slate-900 p-4 font-mono text-sm whitespace-pre-wrap text-slate-100">{latestLog ? pretty(latestLog.response) : ""}</pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ApiTestPage;
