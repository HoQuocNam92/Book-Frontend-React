import { instance } from "@/utils/instance";

export const placeOrder = async (address_id: number, payment_method: string) => {
    const res = await instance.post("/checkout", { address_id, payment_method });
    return res.data;
};

export const getAddresses = async () => {
    const res = await instance.get("/checkout/addresses");
    return res.data;
};
