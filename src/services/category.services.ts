import { instance } from "@/utils/instance";

export interface CategoryInput {
    name: string;
    parent_id?: number | null;
}

export const getCategories = async (page: number = 1) => {
    const res = await instance.get(`/categories?page=${page}`);
    return res.data;
};

export const createCategory = async (data: CategoryInput) => {
    const res = await instance.post("/categories", data);
    return res.data;
};

export const updateCategory = async (id: number, data: CategoryInput) => {
    const res = await instance.put(`/categories/${id}`, data);
    return res.data;
};

export const deleteCategory = async (id: number) => {
    const res = await instance.delete(`/categories/${id}`);
    return res.data;
};


export const getCategoryParents = async () => {
    const res = await instance.get("/categories/parents");
    return res.data;
}


export const getCategoryChildren = async (parentId: number) => {
    const res = await instance.get(`/categories/children?parent_id=${parentId}`);
    return res.data;
}