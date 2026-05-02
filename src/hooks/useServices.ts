import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as serviceService from "@/services/service.services";

export const useServices = () => {
    const queryClient = useQueryClient();

    const getServices = useQuery({
        queryKey: ["getServices"],
        queryFn: async () => {
            const res = await serviceService.getAllServices();
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const createService = useMutation({
        mutationFn: (data: FormData) => serviceService.createService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getServices"] });
        },
    });

    const updateService = useMutation({
        mutationFn: (params: { id: number; data: FormData }) =>
            serviceService.updateService(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getServices"] });
        },
    });

    const deleteService = useMutation({
        mutationFn: (id: number) => serviceService.deleteService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getServices"] });
        },
    });

    return { getServices, createService, updateService, deleteService };
};
