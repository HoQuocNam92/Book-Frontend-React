import { create } from 'zustand'

interface AuthState {
    user: any | null
    setAuth: (user: any) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setAuth: (user) => set({ user }),
    logout: () => set({ user: null })
}))
