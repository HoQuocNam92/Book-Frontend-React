import type { signInForm } from "@/schema/signIn.schema";
import type { signUpForm } from "@/schema/signUp,schema";
import { instance } from "@/utils/instance"

export const signIn = async (data: signInForm) => {
    const res = await instance.post('auth/sign-in', data);
    return res.data
}

export const signUp = async (data: signUpForm) => {
    const res = await instance.post('auth/sign-up', data);
    return res.data
}


export const refreshToken = async () => {
    const res = await instance.post('auth/refresh-token', {}, {
        withCredentials: true
    });
    return res.data

}

export const resetPassword = async (email: string) => {
    const res = await instance.post('auth/forgot-password', { email });
    return res.data
}


export const signOut = async () => {
    const res = await instance.post('auth/sign-out', {}, {
        withCredentials: true
    });
    return res.data
}   