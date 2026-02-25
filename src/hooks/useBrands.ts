import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as brandServices from "@/services/brand.services";

export const useBrands = () => {
    const queryClient = useQueryClient();

    const getBrands = useQuery({
        queryKey: ["getBrands"],
        queryFn: brandServices.getBrands,
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
    };
};
