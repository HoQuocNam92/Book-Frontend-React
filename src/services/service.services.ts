import { instance } from "@/utils/instance"

export const getAllServices = async () => {
    const response = await instance.get('/services');
    return response.data;
};

export const createService = async (data: FormData) => {
    const response = await instance.post('/services', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateService = async (id: number, data: FormData) => {
    const response = await instance.put(`/services/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteService = async (id: number) => {
    const response = await instance.delete(`/services/${id}`);
    return response.data;
};
