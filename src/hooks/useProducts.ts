import { useQuery } from "@tanstack/react-query"
import * as productServices from '@/services/product.services'
export const useProducts = (pageNumber: number) => {
    const getProducstByPage = useQuery({
        queryKey: ['getProducstByPage', pageNumber],
        queryFn: async () => await productServices.getProducstByPage(pageNumber)
    })
    return {
        products: getProducstByPage.data,
        loading: getProducstByPage.isLoading,
        errors: getProducstByPage.error,
    }
}


