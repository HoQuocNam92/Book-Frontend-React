import { useQuery, } from "@tanstack/react-query"
import * as productServices from '@/services/product.services'
import { useParams, } from "react-router-dom"
export const useProductDetail = () => {

    const slug = useParams().slug || "all"

    const getProductBySlug = useQuery({
        queryKey: ['getProductBySlug', slug],
        queryFn: async () => await productServices.getProductBySlug(slug),
        enabled: slug !== "all",
        staleTime: 5 * 60 * 1000,
    })

    return {
        getProductBySlug
    }
}


