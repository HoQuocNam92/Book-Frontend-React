import { create } from 'zustand'

interface AuthState {
    user: any | null
    setUser: (user: any) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    setUser: (user) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
        set({ user: null });
        localStorage.removeItem('user');
    },
}))
