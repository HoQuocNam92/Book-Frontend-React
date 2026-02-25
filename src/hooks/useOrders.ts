import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getOrders,
    updateOrderStatus,
    deleteOrder,
} from "@/services/order.services";

export const useOrders = () => {
    const queryClient = useQueryClient();

    const getOrdersQuery = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const updateOrderStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });

    const deleteOrderMutation = useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });

    return {
        getOrders: getOrdersQuery,
        updateOrderStatus: updateOrderStatusMutation,
        deleteOrder: deleteOrderMutation,
    };
};
