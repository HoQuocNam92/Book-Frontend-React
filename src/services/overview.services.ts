import { instance } from "@/utils/instance";

export const getOverviewStats = async () => {
    const res = await instance.get("/stats/overview");
    return res.data;
};

export const getRevenueByYear = async (year: number) => {
    const res = await instance.get(`/overviews/chart-data?year=${year}`);
    return res.data;
}