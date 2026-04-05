import type { CheckoutInput } from "@/types/Checkout";
import { instance } from "@/utils/instance";

export const placeOrder = async (data: CheckoutInput) => {
    const res = await instance.post("/payment", data);
    return res.data;
};

export const cancelOrder = async (orderId: number) => {
    await instance.post("/payment/cancel", { orderId });
}
