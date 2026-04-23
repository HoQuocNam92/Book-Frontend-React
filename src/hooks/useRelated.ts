import { useQuery } from "@tanstack/react-query"

import * as relatedServices from '@/services/related.services'
const useRelated = () => {
    const getProductRelated = (category_id: number, book_id: number) => {
        return useQuery({
            queryKey: ['getProductRelated', category_id, book_id],
            queryFn: async () => await relatedServices.getProductRelated(category_id, book_id),
            enabled: !!category_id && !!book_id,
            staleTime: 5 * 60 * 1000,
        })
    }

    return {
        getProductRelated
    }
}

export default useRelated;