import type { signInForm } from "@/schema/signIn.schema";
import type { signUpForm } from "@/schema/signUp,schema";
import { instance } from "@/utils/instance"
import rawAxios from "@/utils/rawAxios";

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


export const signOut = async () => {
    const res = await instance.post('auth/sign-out', {}, {
        withCredentials: true
    });
    return res.data
}

export const signOutInstance = async () => {
    try {
        await rawAxios.post("/auth/sign-out", {}, { withCredentials: true });
    } catch (err) {
        console.log("Error signing out:", err);
        // ignore lỗi vì token có thể đã chết
    } finally {
        localStorage.removeItem("user");
        window.location.href = "/auth/sign-in";
    }
};