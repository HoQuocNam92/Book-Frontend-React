import { instance } from "@/utils/instance";

export const getRevenues = async (year: number) => {
    const result = await instance.get(`/revenues?year=${year}`);
    return result.data;
}


export const getRevenueWeek = async (week: number, year: number) => {
    const result = await instance.get(`/revenues/weekly?week=${week}&year=${year}`);
    return result.data;
}

export const getMonthlyRevenue = async (year: number, month: number) => {
    const result = await instance.get(`/revenues/monthly?year=${year}&month=${month}`);
    return result.data;
}

export const getYearlyRevenue = async (year: number) => {
    const result = await instance.get(`/revenues/yearly?year=${year}`);
    return result.data;
}