import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.shihal.net/api/", // Defaulting to the URL often used in these projects
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("shhal_admin_token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("shhal_admin_token");
        // Optional: redirect to login
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
