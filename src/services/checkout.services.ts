import type { CheckoutInput } from "@/types/Checkout";
import { instance } from "@/utils/instance";

export const placeOrder = async (data: CheckoutInput) => {
    const res = await instance.post("/payment", {
        selectedAddress: data.selectedAddress,
        paymentMethod: data.paymentMethod,
        appliedCoupon: data.appliedCoupon,
        shipping_fee: data.shipping_fee,
    });
    return res.data;
};

