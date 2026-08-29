import axios from "axios";
import { API_BASE_URL } from "./config";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  allowAbsoluteUrls: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
