import axios, { type InternalAxiosRequestConfig } from "axios";

const rawBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
const baseURL = String(rawBase).replace(/\/+$/, "");

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
