import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryServices from "@/services/category.services";
import type { CategoryInput } from "@/services/category.services";

export const useCategories = () => {
    const queryClient = useQueryClient();

    const getCategories = useQuery({
        queryKey: ["getCategories"],
        queryFn: categoryServices.getCategories,
        refetchOnWindowFocus: false,
    });

    const createCategory = useMutation({
        mutationFn: (data: CategoryInput) =>
            categoryServices.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories"] });
        },
    });

    const updateCategory = useMutation({
        mutationFn: (params: { id: number; data: CategoryInput }) =>
            categoryServices.updateCategory(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories"] });
        },
    });

    const deleteCategory = useMutation({
        mutationFn: (id: number) => categoryServices.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories"] });
        },
    });

    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
