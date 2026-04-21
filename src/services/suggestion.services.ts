import { instance } from "@/utils/instance"

export const getSearchSuggestions = async (keyword: string) => {
    const res = await instance.get(`/suggestions?keyword=${encodeURIComponent(keyword)}`);
    return res.data;
}