import { instance } from "@/utils/instance";

export const placeOrder = async (data: {
    selectedAddress: number; paymentMethod: string; appliedCoupon?: {
        code: string;
        coupon_id: number;
    }; finalAmount: number
}) => {
    const res = await instance.post("/checkout", data);
    return res.data;
};

