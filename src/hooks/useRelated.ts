import { useQuery } from "@tanstack/react-query"

import * as relatedServices from '@/services/related.services'
const useRelated = () => {
    const getProductRelated = (id: number) => {
        return useQuery({
            queryKey: ['getProductRelated', id],
            queryFn: async () => await relatedServices.getProductRelated(id),
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        })
    }

    return {
        getProductRelated
    }
}

export default useRelated;