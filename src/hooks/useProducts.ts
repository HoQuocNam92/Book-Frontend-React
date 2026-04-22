import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query"
import * as productServices from '@/services/product.services'
import { useParams } from "react-router-dom"
import type { FormProductQuickActionsInput } from "@/schema/product.schema"
export const useProducts = (type?: string, pageNumber = 1) => {
    const category = useParams().category_slug || "all"
    const queryClient = useQueryClient()

    const getProducts = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => await productServices.getProducts(),
        staleTime: 5 * 60 * 1000,
        enabled: type === "all"
    })

    const getProductsALl = useQuery({
        queryKey: ['getProductsALl', pageNumber],
        queryFn: async () => await productServices.getProductsALl(pageNumber),
        staleTime: 5 * 60 * 1000,
        enabled: type === "all"
    })



    const getProductByCategory = useQuery({
        queryKey: ['getProductByCategory', category, pageNumber],
        queryFn: async () => await productServices.getProductByCategory(category, pageNumber),
        enabled: !!category && type === "category",
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
        mutationFn: async (params: { id: string, data: FormData }) => await productServices.updateProduct(params.id, params.data),
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
    const updateProductQuickActions = useMutation({
        mutationFn: async (params: { id: string, data: FormProductQuickActionsInput }) => await productServices.updateProductQuickActions(params.id, params.data),
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
        updateProductQuickActions,
        deleteProduct: deleteProduct.mutate,
        getProductsALl
    }
}


