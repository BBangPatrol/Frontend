export const API_PATH = "/api/v1";

const configuredServerUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

export const API_BASE_URL = configuredServerUrl ? (configuredServerUrl.endsWith(API_PATH) ? configuredServerUrl : `${configuredServerUrl}${API_PATH}`) : API_PATH;

export function apiUrl(path: string) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export function isServiceApiRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const apiBaseUrl = new URL(API_BASE_URL, window.location.origin);
  const apiPath = apiBaseUrl.pathname.replace(/\/+$/, "");

  return requestUrl.origin === apiBaseUrl.origin && (requestUrl.pathname === apiPath || requestUrl.pathname.startsWith(`${apiPath}/`));
}
