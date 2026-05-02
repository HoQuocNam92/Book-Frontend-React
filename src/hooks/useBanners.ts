import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import *  as bannerService from "@/services/banner.services.js";

export const useBanners = (type: string) => {
    const queryClient = useQueryClient();
    // const [type, setType] = useState<string>("all");
    const getBanners = useQuery({
        queryKey: ["getBanners", type],
        queryFn: async () => {
            const res = await bannerService.getAllBanners(type)
            return res.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!type,
    });

    const createBanner = useMutation({
        mutationFn: (data: FormData) => bannerService.createBanner(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBanners"] });
        },
    });

    const updateBanner = useMutation({
        mutationFn: (params: { id: number; data: FormData }) =>
            bannerService.updateBanner(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBanners"] });
        },
    });

    const deleteBanner = useMutation({
        mutationFn: (id: number) => bannerService.deleteBanner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBanners"] });
        },
    });

    return { getBanners, createBanner, updateBanner, deleteBanner, };
};
