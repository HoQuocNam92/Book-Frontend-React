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

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (originalRequest.url.includes("auth/refresh-token")) {
                await signOutInstance();
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return instance(originalRequest);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await refreshToken();

                processQueue(null);

                return instance(originalRequest);

            } catch (err) {
                processQueue(err, null);
                await signOutInstance();
                return Promise.reject(err);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);