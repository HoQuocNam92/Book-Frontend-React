import { useQuery, useMutation } from '@tanstack/react-query';

import * as reviewServices from '@/services/review.services.js';
import type { CreateReviewInput } from '@/types/Reviews';
const useReviews = (productId: number) => {

    const getReviewByBookId = useQuery({
        queryKey: ['reviews', productId],
        queryFn: async () => {
            const res = await reviewServices.getReviewsByBookId(productId)
            return res.data
        },
        enabled: !!productId
    });

    const createReview = useMutation({
        mutationFn: async (data: CreateReviewInput) => {
            const res = await reviewServices.createReviewBook(data)
            return res.data
        }
    });


    return {
        getReviewByBookId,
        createReview
    }
}

export default useReviews;  