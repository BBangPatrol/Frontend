import axios from "axios";
import { API_BASE_URL } from "./config";
import { store } from "../store/store";

const apiConfig = {
  baseURL: API_BASE_URL,
  allowAbsoluteUrls: true,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = axios.create(apiConfig);
export const authApi = axios.create(apiConfig);

authApi.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
