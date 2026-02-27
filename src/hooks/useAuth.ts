import type { signInForm } from '@/schema/signIn.schema';
import type { signUpForm } from '@/schema/signUp,schema';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, resetPassword, signOut } from '@/services/auth.services';
import { useAuthStore } from '@/stores/auth.stores';
const useAuth = () => {
    const signInMutation = useMutation({
        mutationFn: async (data: signInForm) => {
            const res = await signIn(data);
            console.log(res);
            useAuthStore.getState().setUser(res.user);
            return res;
        }
    })


    const signUpMutation = useMutation({
        mutationFn: async (data: signUpForm) => await signUp(data)
    })

    const resetPasswordMutation = useMutation({
        mutationFn: async (email: string) => await resetPassword(email)
    })
    const signOutMutation = useMutation({
        mutationFn: async () => {
            const res = await signOut();
            useAuthStore.getState().logout();
            return res;
        }
    })


    return {
        signInMutation,
        signUpMutation,
        resetPasswordMutation,
        signOutMutation
    }
}

export default useAuth