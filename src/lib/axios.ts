import axios from "axios";
import { config } from "./config";

export const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
