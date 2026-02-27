import { instance } from "@/utils/instance";

export const getAllBrands = async (page: number = 1) => {
    const res = await instance.get(`/brands?page=${page}`);
    return res.data;
};

export const createBrand = async (data: FormData) => {
    const res = await instance.post("/brands", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const updateBrand = async (id: number, data: FormData) => {
    const res = await instance.put(`/brands/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const deleteBrand = async (id: number) => {
    const res = await instance.delete(`/brands/${id}`);
    return res.data;
};
