import { instance } from "@/utils/instance";

export const placeOrder = async (address_id: number, payment_method: string, coupon_code?: string) => {
    const res = await instance.post("/checkout", { address_id, payment_method, coupon_code });
    return res.data;
};

