import { instance } from "@/utils/instance";

export const getShippingInfo = async (data: {
    to_district_id: number;
    to_ward_code: string;
    weight?: number;
    insurance_value?: number;
    cod_amount?: number;
}) => {
    const res = await instance.post("/shipping/info", data);
    return res.data;
};

export const getShippingFee = async (data: {
    to_district_id: number;
    to_ward_code: string;
    weight?: number;
    insurance_value?: number;
    cod_amount?: number;
}) => {
    const res = await instance.post("/shipping/fee", data);
    return res.data;
};

export const getEstimatedDelivery = async (data: {
    to_district_id: number;
    to_ward_code: string;
}) => {
    const res = await instance.post("/shipping/leadtime", data);
    return res.data;
};
