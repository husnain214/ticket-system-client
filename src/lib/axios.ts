import axios from "axios";
import { config } from "./config";

export const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (config) => {
    if (config.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
