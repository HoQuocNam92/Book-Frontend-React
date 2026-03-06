import { instance } from "@/utils/instance";

export const searchBooks = async (key: string) => {
    const res = await instance.get(`/search/books?key=${encodeURIComponent(key)}`);
    return res.data;
};

export const searchCategories = async (key: string) => {
    const res = await instance.get(`/search/categories?key=${encodeURIComponent(key)}`);
    return res.data;
};

export const searchAuthors = async (key: string) => {
    const res = await instance.get(`/search/authors?key=${encodeURIComponent(key)}`);
    return res.data;
};
