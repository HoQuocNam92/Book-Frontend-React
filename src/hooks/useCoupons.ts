import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as couponService from "@/services/coupon.services";
import { useAuthStore } from "@/stores/auth.stores";

export const useCoupons = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore.getState().user
    const getCoupons = useQuery({
        queryKey: ["getCoupons"],
        queryFn: () => couponService.getAllCouponst(),
        refetchOnWindowFocus: false,
        enabled: !!user.role_id?.includes(1)
    });


    const validateCoupon = useMutation({
        mutationFn: async (data: any) => await couponService.validateCouponByCode(data),
    });

    const createCoupon = useMutation({
        mutationFn: (data: couponService.CouponPayload) => couponService.createCoupon(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCoupons"] });
        },
    });

    const updateCoupon = useMutation({
        mutationFn: (params: { id: number; data: Partial<couponService.CouponPayload> }) =>
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

    return { getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon };
};
