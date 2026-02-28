import { instance } from '@/utils/instance';

export const couponService = {
    getAllCoupons: async () => {
        const response = await instance.get('/coupons');
        return response.data;
    },
    getCouponById: async (id: number) => {
        const response = await instance.get(`/coupons/${id}`);
        return response.data;
    },
    createCoupon: async (data: { code: string; discount: number; expired_at: string }) => {
        const response = await instance.post('/coupons', data);
        return response.data;
    },
    updateCoupon: async (id: number, data: { code?: string; discount?: number; expired_at?: string }) => {
        const response = await instance.put(`/coupons/${id}`, data);
        return response.data;
    },
    deleteCoupon: async (id: number) => {
        const response = await instance.delete(`/coupons/${id}`);
        return response.data;
    },
};
