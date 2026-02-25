import { instance } from "@/utils/instance";

export const getOrders = async () => {
    const res = await instance.get("/orders");
    return res.data;
};

export const getOrderById = async (id: number) => {
    const res = await instance.get(`/orders/${id}`);
    return res.data;
};

export const getMyOrders = async () => {
    const res = await instance.get("/orders/my");
    return res.data;
};

export const updateOrderStatus = async (id: number, status: string) => {
    const res = await instance.put(`/orders/${id}/status`, { status });
    return res.data;
};

export const deleteOrder = async (id: number) => {
    const res = await instance.delete(`/orders/${id}`);
    return res.data;
};
