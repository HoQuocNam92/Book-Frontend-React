const URL_BASE = "http://localhost:8080/api/";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.stores";
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
                await refreshToken(); // refresh xong => backend set cookie mới
                return instance(originalRequest); // retry request cũ
            } catch (err) {
                useAuthStore.getState().logout?.();
                await signOut();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
