import { instance } from "@/utils/instance";

export const getBrands = async () => {
    const res = await instance.get("/brands");
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
