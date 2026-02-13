import axios from "axios";
import { deleteCookie } from "./cookie-utils";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.shihal.net/api/", // Defaulting to the URL often used in these projects
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the auth token and handle FormData
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("shhal_admin_token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // When sending FormData (e.g. file upload), let the browser set Content-Type
    // with multipart/form-data and boundary so the file is sent correctly
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 Unauthorized (invalid/expired token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("shhal_admin_token");
      deleteCookie("shhal_admin_token");
      window.location.href = "/login?unauthorized=true";
    }
    return Promise.reject(error);
  }
);

export default api;
