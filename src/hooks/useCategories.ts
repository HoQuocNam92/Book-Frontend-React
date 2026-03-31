import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as categoryServices from "@/services/category.services";
import type { CategoryInput } from "@/services/category.services";
import { useState } from "react";

export const useCategories = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const getCategories = useQuery({
        queryKey: ["getCategories", page],
        queryFn: () => categoryServices.getCategories(page),
        refetchOnWindowFocus: false,
    });

    const createCategory = useMutation({
        mutationFn: (data: CategoryInput) =>
            categoryServices.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories", page] });
        },
    });

    const updateCategory = useMutation({
        mutationFn: (params: { id: number; data: CategoryInput }) =>
            categoryServices.updateCategory(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories", page] });
        },
    });

    const deleteCategory = useMutation({
        mutationFn: (id: number) => categoryServices.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCategories"] });
        },
    });
    const getCateogryParents = useQuery({
        queryKey: ["getCategoryParents"],
        queryFn: () => categoryServices.getCategoryParents(),
        refetchOnWindowFocus: false,
    });
    const getCategoryChildren = async (parentId: number) => {
        return await queryClient.fetchQuery({
            queryKey: ["getCategoryChildren"],
            queryFn: () => categoryServices.getCategoryChildren(parentId),
        });
    }
    return {
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCateogryParents,
        getCategoryChildren,
        page,
        setPage,
    };
};
