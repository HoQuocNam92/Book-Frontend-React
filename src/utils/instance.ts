const URL_BASE = 'http://localhost:8080/api/'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.stores'
import useAuth from '@/hooks/useAuth'
export const instance = axios.create({
    baseURL: URL_BASE,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})


instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState()?.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
instance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const { refreshTokenMutation } = useAuth();
                const data = await refreshTokenMutation.mutateAsync()
                originalRequest.headers.Authorization = `Bearer ${data?.data.acessToken}`
                return instance(originalRequest)
            } catch (err) {
                useAuthStore.getState().logout?.()
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)