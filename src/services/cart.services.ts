import { instance } from "@/utils/instance";



export const getCart = async () => {
    const res = await instance.get("/cart");
    return res.data;
};

export const addToCart = async (book_id: number, quantity: number) => {
    const res = await instance.post("/cart/items", { book_id, quantity });
    return res.data;
};

export const updateCartItem = async (id: number, quantity: number) => {
    const res = await instance.put(`/cart/items/${id}`, { quantity });
    return res.data;
};

export const removeCartItem = async (id: number) => {
    const res = await instance.delete(`/cart/items/${id}`);
    return res.data;
};

export const clearCart = async () => {
    const res = await instance.delete("/cart");
    return res.data;
};

export const getCartItemCount = async () => {
    const res = await instance.get("/cart/count");
    return res.data;
};
