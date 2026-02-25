import { instance } from "@/utils/instance";

export const getOverviewStats = async () => {
    const res = await instance.get("/stats/overview");
    return res.data;
};
