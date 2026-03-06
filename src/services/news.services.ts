import type { NewsInput } from "@/schema/new.schema";
import { instance } from "@/utils/instance";



export const getNews = async (page: number = 1) => {
    const res = await instance.get(`/news?page=${page}`);
    return res.data;
};

export const getPublishedNews = async (page: number = 1) => {
    const res = await instance.get(`/news/published?page=${page}`);
    return res.data;
};

export const getNewsBySlug = async (slug: string) => {
    const res = await instance.get(`/news/${slug}`);
    return res.data;
};

export const createNews = async (data: FormData) => {
    const res = await instance.post(`/news`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const updateNews = async (id: number, data: FormData) => {
    const res = await instance.put(`/news/${id}`, data);
    return res.data;
};

export const deleteNews = async (id: number) => {
    const res = await instance.delete(`/news/${id}`);
    return res.data;
};
