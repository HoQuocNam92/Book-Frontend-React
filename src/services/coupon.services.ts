import { instance } from '@/utils/instance';

export interface CouponPayload {
    code: string;
    discount: number;
    discount_type?: 'percent' | 'fixed';
    expired_at: string;
    start_at?: string;
    min_order_value?: number;
    max_discount?: number;
    usage_limit?: number;
}

export const getAllCouponst = async () => {
    const response = await instance.get('/coupons');
    return response.data;
};
export const getCouponById = async (id: number) => {
    const response = await instance.get(`/coupons/${id}`);
    return response.data;
};
export const createCoupon = async (data: CouponPayload) => {
    const response = await instance.post('/coupons', data);
    return response.data;
};

export const updateCoupon = async (id: number, data: Partial<CouponPayload>) => {
    const response = await instance.put(`/coupons/${id}`, data);
    return response.data;
};
export const deleteCoupon = async (id: number) => {
    const response = await instance.delete(`/coupons/${id}`);
    return response.data;
};
export const validateCouponByCode = async ({ couponCode, finalAmount }: { couponCode: string, finalAmount: number, }) => {
    const response = await instance.post(`/coupons/validate/${encodeURIComponent(couponCode)}`, { finalAmount });
    return response.data;
};
