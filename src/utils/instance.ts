const URL_BASE = "http://localhost:8080/api/";
import axios from "axios";
import { refreshToken, signOutInstance } from "@/services/auth.services";
export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || URL_BASE,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (originalRequest.url === "auth/refresh-token" || originalRequest.url === "/users/profile") {
                return Promise.reject(error);
            }
            try {
                await refreshToken();
                return instance(originalRequest);
            } catch (err) {
                await signOutInstance();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
