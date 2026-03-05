import { instance } from "@/utils/instance";

export const getProductRelated = async (id: number) => {
    const res = await instance.get(`/related/${id}`);
    return res.data
}