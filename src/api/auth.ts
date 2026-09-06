import { api } from "./client";

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
