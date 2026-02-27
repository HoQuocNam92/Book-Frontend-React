import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as brandServices from "@/services/brand.services";
import { useState } from "react";

export const useBrands = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const getBrands = useQuery({
        queryKey: ["getBrands", page],
        queryFn: () => brandServices.getAllBrands(page),
        refetchOnWindowFocus: false,
    });

    const createBrand = useMutation({
        mutationFn: (data: FormData) => brandServices.createBrand(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBrands"] });
        },
    });

    const updateBrand = useMutation({
        mutationFn: (params: { id: number; data: FormData }) =>
            brandServices.updateBrand(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBrands"] });
        },
    });

    const deleteBrand = useMutation({
        mutationFn: (id: number) => brandServices.deleteBrand(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBrands"] });
        },
    });

    return {
        getBrands,
        createBrand,
        updateBrand,
        deleteBrand,
        page, setPage
    };
};
