import { api, authApi } from "./client";
import type { AuthUser } from "../store/authSlice";

export type LoginData = {
  accessToken: string;
  isNewUser: boolean;
};

export type LoginResponse = {
  isSuccess: true;
  code: string;
  message: string;
  data: LoginData;
  errors: null;
};

export type LoginErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
  data?: null;
  errors?: {
    field: string | null;
    message: string;
  } | null;
};

export async function login(code: string) {
  const response = await api.post<LoginResponse>("/auth/login", { code });

  return response.data;
}

export async function getMe() {
  const response = await authApi.get<{ data: AuthUser }>("/auth/me");

  return response.data.data;
}

export async function logout() {
  await authApi.post("/auth/logout");
}
