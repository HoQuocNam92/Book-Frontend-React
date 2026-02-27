import { instance } from "@/utils/instance";

export const getMyAddresses = async () => {
    const res = await instance.get("/addresses");
    return res.data;
};

export const createAddress = async (data: {
    address: string;
    phone?: string;
    province_id?: number;
    district_id?: number;
    ward_id?: number;
}) => {
    const res = await instance.post("/addresses", data);
    return res.data;
};

export const updateAddress = async (id: number, data: {
    address?: string;
    phone?: string;
    province_id?: number;
    district_id?: number;
    ward_id?: number;
}) => {
    const res = await instance.put(`/addresses/${id}`, data);
    return res.data;
};

export const deleteAddress = async (id: number) => {
    const res = await instance.delete(`/addresses/${id}`);
    return res.data;
};

export const getProvinces = async () => {
    const res = await instance.get("/addresses/provinces");
    return res.data;
};

export const getDistricts = async (provinceId: number) => {
    const res = await instance.get(`/addresses/districts/${provinceId}`);
    return res.data;
};

export const getWards = async (districtId: number) => {
    const res = await instance.get(`/addresses/wards/${districtId}`);
    return res.data;
};
