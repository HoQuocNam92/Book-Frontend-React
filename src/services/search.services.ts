import { instance } from "@/utils/instance";

export const searchBooks = async (key: string, pageNumber: number) => {
    return await instance.get(`/search/books?q=${encodeURIComponent(key)}&page=${pageNumber}`);
};


export const searchCategories = async (key: string) => {
    const res = await instance.get(`/search/categories?q=${encodeURIComponent(key)}`);
    return res.data;
};

export const searchAuthors = async (key: string) => {
    const res = await instance.get(`/search/authors?q=${encodeURIComponent(key)}`);
    return res.data;
};
