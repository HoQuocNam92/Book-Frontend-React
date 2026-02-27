const URL_BASE = "http://localhost:8080/api/";
import axios from "axios";
import { refreshToken, signOut } from "@/services/auth.services";

export const instance = axios.create({
    baseURL: URL_BASE,
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

            try {
                await refreshToken();
                return instance(originalRequest);
            } catch (err) {
                await signOut();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
