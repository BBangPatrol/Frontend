import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import type { FormEvent } from "react";
import { apiClient } from "../api/client";
import {
  getMockAuthorizationHeader,
  type MockTokenMode,
} from "../mocks/msw/utils/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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
const resolveUrl = (url: string) =>
  url.startsWith("/api/") ? `${window.location.origin}${url}` : url;

function ApiTestPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("/api/v1/users/me/bread-collections");
  const [body, setBody] = useState("");
  const [tokenMode, setTokenMode] = useState<MockTokenMode>("valid");
  const [latestLog, setLatestLog] = useState<ApiLog | null>(null);

  const apiMutation = useMutation({
    mutationFn: async (request: ApiRequest) => {
      const response = await apiClient.request({
        ...request,
        url: resolveUrl(request.url),
      });
      return { status: response.status, data: response.data };
    },
  });

  const handleMethodChange = (nextMethod: HttpMethod) => {
    setMethod(nextMethod);
    setUrl(
      nextMethod === "GET"
        ? "/api/v1/users/me/bread-collections"
        : nextMethod === "POST"
          ? "/users"
          : "/users/1",
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const authorization = getMockAuthorizationHeader(tokenMode);
    const request: ApiRequest = {
      method,
      url,
      headers: authorization ? { Authorization: authorization } : undefined,
      data: hasBody(method) && body.trim() ? JSON.parse(body) : undefined,
    };

    try {
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
        response: isAxiosError(error)
          ? (error.response?.data ?? error.message)
          : "Request failed",
      });
    }
  };

  return (
    <main className="api-page">
      <section className="api-header">
        <div>
          <h1>API 요청 테스트</h1>
        </div>
      </section>

      <section className="api-grid">
        <form className="api-panel request-panel" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="method">HTTP 메서드</label>
            <select
              id="method"
              value={method}
              onChange={(event) =>
                handleMethodChange(event.target.value as HttpMethod)
              }
            >
              {methods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="url">요청 경로</label>
            <input
              id="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="/users"
            />
          </div>

          <div className="field-group body-field">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              value={body}
              disabled={!hasBody(method)}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="tokenMode">액세스 토큰</label>
            <select
              id="tokenMode"
              value={tokenMode}
              onChange={(event) =>
                setTokenMode(event.target.value as MockTokenMode)
              }
            >
              <option value="valid">유효 액세스토큰</option>
              <option value="expired">만료 엑세스토큰</option>
              <option value="none">미포함</option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={apiMutation.isPending}
          >
            {apiMutation.isPending ? "요청 중..." : "요청 보내기"}
          </button>
        </form>

        <div className="api-panel response-panel">
          <div className="panel-heading">
            <h2>요청/응답 결과</h2>
            {latestLog && (
              <span
                className={
                  latestLog.status && latestLog.status >= 400
                    ? "status error"
                    : "status"
                }
              >
                {latestLog.status ?? "ERR"}
              </span>
            )}
          </div>

          <div className="code-block-group">
            <div>
              <h3>요청</h3>
              <pre>
                {latestLog
                  ? pretty(latestLog.request)
                  : pretty({ method, url })}
              </pre>
            </div>
            <div>
              <h3>응답</h3>
              <pre>{latestLog ? pretty(latestLog.response) : ""}</pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ApiTestPage;
