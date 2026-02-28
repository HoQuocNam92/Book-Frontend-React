import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import *  as bannerService from "@/services/banner.services.js";
import { useState } from "react";

export const useBanners = () => {
    const queryClient = useQueryClient();
    const [type, setType] = useState<string>("all");
    const getBanners = useQuery({
        queryKey: ["getBanners"],
        queryFn: () => bannerService.getAllBanners(),
        refetchOnWindowFocus: false,
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
    const salesBanners = useQuery({
        queryKey: ["getBanners", "sales"],
        queryFn: () => bannerService.getBannersTypes("sales"),
        refetchOnWindowFocus: false,
    });

    const newBanners = useQuery({
        queryKey: ["getBanners", "new"],
        queryFn: () => bannerService.getBannersTypes("new"),
        refetchOnWindowFocus: false,
    });
    const featuredBanners = useQuery({
        queryKey: ["getBanners", "featured"],
        queryFn: () => bannerService.getBannersTypes("featured"),
        refetchOnWindowFocus: false,
    });
    return { getBanners, createBanner, updateBanner, deleteBanner, type, setType, salesBanners, newBanners, featuredBanners };
};
