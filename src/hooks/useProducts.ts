import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query"
import * as productServices from '@/services/product.services'
import type { FormProductInput } from "@/schema/formProduct.schema"
import { useParams, useSearchParams } from "react-router-dom"
export const useProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const pageNumber = pageParam ? Number(pageParam) : 1
    const category = useParams().slug || "all"
    const setPage = (page: number) => {
        setSearchParams({ page: String(page) })
    }
    const queryClient = useQueryClient()

    const getProducts = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => await productServices.getProducts(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData

    })


    const getProductByCategory = useQuery({
        queryKey: ['getProductByCategory', category, pageNumber],
        queryFn: async () => await productServices.getProductByCategory(category, pageNumber),
        enabled: !!pageNumber,
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData
    })

    const createProduct = useMutation({
        mutationFn: async (data: FormData) => await productServices.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getProducstByPage', pageNumber] })
            queryClient.invalidateQueries({ queryKey: ['getProducts'] })
            queryClient.invalidateQueries({ queryKey: ['getProductByCategory', category, pageNumber] })
        }
    })

    const updateProduct = useMutation({
        mutationFn: async (params: { id: string, data: FormProductInput }) => await productServices.updateProduct(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getProducstByPage', pageNumber] })
            queryClient.invalidateQueries({ queryKey: ['getProducts'] })
            queryClient.invalidateQueries({ queryKey: ['getProductByCategory', category, pageNumber] })
        }
    })

    const deleteProduct = useMutation({
        mutationFn: async (id: string) => await productServices.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getProducstByPage', pageNumber] })
            queryClient.invalidateQueries({ queryKey: ['getProducts'] })
            queryClient.invalidateQueries({ queryKey: ['getProductByCategory', category, pageNumber] })
        }
    })
    return {
        getProducts,
        getProductByCategory,
        createProduct,
        updateProduct,
        deleteProduct: deleteProduct.mutate,
        setPageNumber: setPage,
        pageNumber
    }
}


