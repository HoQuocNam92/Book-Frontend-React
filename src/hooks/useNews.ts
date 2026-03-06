import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as newsServices from "@/services/news.services";

export const useNews = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const getNews = useQuery({
        queryKey: ["getNews", page],
        queryFn: () => newsServices.getNews(page),
        refetchOnWindowFocus: false,
    });

    const createNews = useMutation({
        mutationFn: (data: FormData) => newsServices.createNews(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getNews"] });
        },
    });

    const updateNews = useMutation({
        mutationFn: (params: { id: number; data: FormData }) =>
            newsServices.updateNews(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getNews"] });
        },
    });

    const deleteNews = useMutation({
        mutationFn: (id: number) => newsServices.deleteNews(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getNews"] });
        },
    });

    return {
        getNews,
        createNews,
        updateNews,
        deleteNews,
        page,
        setPage,
    };
};

export const usePublicNews = (page: number = 1) => {
    return useQuery({
        queryKey: ["getPublishedNews", page],
        queryFn: () => newsServices.getPublishedNews(page),
        staleTime: 5 * 60 * 1000,
    });
};

export const useNewsBySlug = (slug: string) => {
    return useQuery({
        queryKey: ["getNewsBySlug", slug],
        queryFn: () => newsServices.getNewsBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
};
