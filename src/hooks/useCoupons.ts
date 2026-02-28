import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { couponService } from "@/services/couponService";

export const useCoupons = () => {
    const queryClient = useQueryClient();

    const getCoupons = useQuery({
        queryKey: ["getCoupons"],
        queryFn: () => couponService.getAllCoupons(),
        refetchOnWindowFocus: false,
    });

    const createCoupon = useMutation({
        mutationFn: (data: { code: string; discount: number; expired_at: string }) =>
            couponService.createCoupon(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCoupons"] });
        },
    });

    const updateCoupon = useMutation({
        mutationFn: (params: { id: number; data: { code?: string; discount?: number; expired_at?: string } }) =>
            couponService.updateCoupon(params.id, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCoupons"] });
        },
    });

    const deleteCoupon = useMutation({
        mutationFn: (id: number) => couponService.deleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCoupons"] });
        },
    });

    return { getCoupons, createCoupon, updateCoupon, deleteCoupon };
};
