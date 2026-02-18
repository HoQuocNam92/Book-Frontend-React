import { instance } from "@/utils/instance"

export const getProducstByPage = async (pageNumber = 1) => {
    const res = await instance.get(`/products?page=${pageNumber}`);
    return res.data;
}