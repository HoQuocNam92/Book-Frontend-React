import type { FormProductQuickActionsInput } from "@/schema/product.schema";
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

export const updateProduct = async (id: string, data: FormData) => {
    console.log("Check data in service", data)
    const res = await instance.put(`/products/${id}`, data);
    return res.data;
}

export const deleteProduct = async (id: string) => {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
}
export const updateProductQuickActions = async (id: string, data: FormProductQuickActionsInput) => {
    const res = await instance.put(`/products/quickActions/${id}`, data);
    return res.data;
}