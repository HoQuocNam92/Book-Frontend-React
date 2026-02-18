import type { signInForm } from '@/schema/signIn.schema';
import type { signUpForm } from '@/schema/signUp,schema';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, resetPassword } from '@/services/auth.services';
const useAuth = () => {
    const signInMutation = useMutation({
        mutationFn: async (data: signInForm) => await signIn(data)
    })


    const signUpMutation = useMutation({
        mutationFn: async (data: signUpForm) => await signUp(data)
    })
    const resetPasswordMutation = useMutation({
        mutationFn: async (email: string) => await resetPassword(email)
    })


    return {
        signInMutation,
        signUpMutation,
        resetPasswordMutation,

    }
}

export default useAuth