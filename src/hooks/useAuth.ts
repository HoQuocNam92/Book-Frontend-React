import type { signInForm } from '@/schema/signIn.schema';
import type { signUpForm } from '@/schema/signUp,schema';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, resetPassword, signOut } from '@/services/auth.services';
import { useAuthStore } from '@/stores/auth.stores';
import { useNavigate } from 'react-router-dom';
const useAuth = () => {
    const navigate = useNavigate();
    const signInMutation = useMutation({
        mutationFn: async (data: signInForm) => await signIn(data),
        onSuccess: (data) => {
            useAuthStore.getState().setAuth(data.user);
        }
    })


    const signUpMutation = useMutation({
        mutationFn: async (data: signUpForm) => await signUp(data)
    })
    const resetPasswordMutation = useMutation({
        mutationFn: async (email: string) => await resetPassword(email)
    })
    const signOutMutation = useMutation({
        mutationFn: async () => await signOut(),
        onSuccess: () => {
            useAuthStore.getState().logout();
            navigate('/auth/sign-in');
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