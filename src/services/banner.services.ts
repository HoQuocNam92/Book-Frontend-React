import { instance } from "@/utils/instance"



export const getAllBanners = async () => {
    const response = await instance.get(`/banners`);
    return response.data;
};

export const getBannersTypes = async (type: string) => {
    const response = await instance.get(`/banners/type?type=${type}`);
    return response.data;
}


export const createBanner = async (data: FormData) => {
    const response = await instance.post('/banners', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateBanner = async (id: number, data: FormData) => {
    const response = await instance.put(`/banners/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteBanner = async (id: number) => {
    const response = await instance.delete(`/banners/${id}`);
    return response.data;
}