import type { FormProductInput } from "@/schema/formProduct.schema";
import { instance } from "@/utils/instance"


export const getProductByCategory = async (category_slug: string, pageNumber = 1) => {
    const res = await instance.get(`/products/${category_slug}?page=${pageNumber}`);
    return res.data;
}


export const getProducts = async () => {
    const res = await instance.get(`/products`);
    return res.data;
}

export const getProductBySlug = async (slug: string) => {
    const res = await instance.get(`/products/detail/${slug}`);
    return res.data;
}

export const createProduct = async (data: FormData) => {
    const res = await instance.post(`/products`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const updateProduct = async (id: string, data: FormProductInput) => {
    const res = await instance.put(`/products/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const deleteProduct = async (id: string) => {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
}