import { instance } from "@/utils/instance";

export const getProductRelated = async (category_id: number, book_id: number) => {
    const res = await instance.get(`/related/category/${category_id}/book/${book_id}`);
    return res.data
}