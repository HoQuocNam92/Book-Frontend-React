import type { FormProfile } from "@/types/Profile";
import { instance } from "@/utils/instance";
export const getUsers = async (page: number) => {
    const res = await instance.get(`/users?page=${page}`);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await instance.delete(`/users/${id}`);
    return res.data;
};

export const getProfile = async () => {
    const res = await instance.get("/users/profile");
    return res.data;
};

export const updateProfile = async (data: FormProfile) => {
    const res = await instance.put("/users/profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;
};
