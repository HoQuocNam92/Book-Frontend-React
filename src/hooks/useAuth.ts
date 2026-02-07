import type { signInForm } from '@/schema/signIn.schema';
import type { signUpForm } from '@/schema/signUp,schema';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, resetPassword, refreshToken } from '@/services/auth.services';
import { useAuthStore } from '@/stores/auth.stores';
const useAuth = () => {
    const { setAuth, user } = useAuthStore.getState();
    const signInMutation = useMutation({
        mutationFn: async (data: signInForm) => {
            const res = await signIn(data);
            setAuth(res.user, res?.accessToken)
            return res
        }
    })
    const signUpMutation = useMutation({
        mutationFn: async (data: signUpForm) => await signUp(data)
    })
    const resetPasswordMutation = useMutation({
        mutationFn: async (email: string) => await resetPassword(email)
    })
    const refreshTokenMutation = useMutation({
        mutationFn: async () => {
            const res = await refreshToken();
            setAuth(user, res.accessToken)
            return res
        }
    })

    return {
        signInMutation,
        signUpMutation,
        resetPasswordMutation,
        refreshTokenMutation
    }
}

export default useAuth