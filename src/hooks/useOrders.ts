import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getOrders,
    updateOrderStatus,
    deleteOrder,
    getMyOrders
} from "@/services/order.services";
import { useState } from "react";

export const useOrders = () => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const getOrdersQuery = useQuery({
        queryKey: ["orders", page],
        queryFn: () => getOrders(page),
        staleTime: 1 * 60 * 1000,
    });

    const updateOrderStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders", page] });
        },
    });

    const deleteOrderMutation = useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders", page] });
        },
    });
    const getMyOrderQuery = useQuery({
        queryKey: ["my-orders", page],
        queryFn: async () => await getMyOrders(page),
        staleTime: 1 * 60 * 1000,
    });
    return {
        getOrders: getOrdersQuery,
        getMyOrders: getMyOrderQuery,
        updateOrderStatus: updateOrderStatusMutation,
        deleteOrder: deleteOrderMutation,
        page,
        setPage,
    };
};
