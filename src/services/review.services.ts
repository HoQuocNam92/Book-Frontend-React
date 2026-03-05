import type { CreateReviewInput } from "@/types/Reviews";
import { instance } from "@/utils/instance";


export const createReviewBook = async (data: CreateReviewInput) => {
    const review = await instance.post(`/reviews`, data);
    return review.data;
}

export const getReviewsByBookId = async (bookId: number) => {
    const reviews = await instance.get(`/reviews/book/${bookId}`);
    return reviews.data;
}