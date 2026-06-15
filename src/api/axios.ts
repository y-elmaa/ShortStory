import axios from "axios";
import { useAuth } from "../hooks/useTokens";

export const api = axios.create({ baseURL: import.meta.env.VITE_API_UR });

api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
