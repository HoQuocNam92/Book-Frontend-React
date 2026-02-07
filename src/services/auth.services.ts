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
    const res = await instance.post('auth/sign-in', {}, {
        withCredentials: true
    });
    return res.data

}

export const resetPassword = async (email: string) => {
    const res = await instance.post('auth/forgot-password', { email });
    console.log("Check res", res);
    return res.data
}