import { instance } from '@/utils/instance';

export const dashboardService = {
    getOverviewStats: async () => {
        const response = await instance.get('/stats/manager');
        return response.data;
    },
};
