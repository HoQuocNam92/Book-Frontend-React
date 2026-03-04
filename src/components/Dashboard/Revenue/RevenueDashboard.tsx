import { SpinnerCustom } from "@/components/ui/spinner";
import useRevenues from "@/hooks/useRevenues";
import { kpiCards } from "@/components/Dashboard/Revenue/logic/kpiCards";
import TopProducts from "@/components/Dashboard/Revenue/TopProducts";
import OrderStatus from "@/components/Dashboard/Revenue/OrderStatus";
import MonthlyRevenueChart from "@/components/Dashboard/Revenue/MonthlyRevenueChart";
import Oops from "@/pages/Oops";
import KPICard from "@/components/Dashboard/Revenue/KPICard";
import HeaderRevenue from "@/components/Dashboard/Revenue/HeaderRevenue";

export default function RevenueDashboard() {
    const {
        getRevenues,
        getRevenueWeek,
        getMonthlyRevenue,
        getYearlyRevenue,
        period,
        setPeriod,
        year,
        setYear,
        month,
        setMonth,
        week,
        setWeek,
    } = useRevenues();

    const { data, isLoading, error, refetch } = getRevenues;

    if (isLoading) return <SpinnerCustom />;
    if (error) return <Oops />;

    const stats = data;
    const topProducts: any[] = stats?.topProducts || [];
    const statusCounts: Record<string, number> = stats?.statusCounts || {};
    const statusEntries = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]);

    const chartQuery =
        period === "week"
            ? getRevenueWeek
            : period === "month"
                ? getMonthlyRevenue
                : getYearlyRevenue;

    const chartData: any[] = chartQuery.data ?? [];
    const chartLoading = chartQuery.isLoading || chartQuery.isFetching;

    return (
        <div className="w-full space-y-6">
            <HeaderRevenue
                handleRefresh={refetch}
                year={year}
                setYear={setYear}
                period={period}
                setPeriod={setPeriod}
                month={month}
                setMonth={setMonth}
                week={week}
                setWeek={setWeek}
            />

            <KPICard kpiCards={kpiCards} stats={stats} year={year} topProducts={topProducts} />

            <MonthlyRevenueChart
                data={chartData}
                isLoading={chartLoading}
                period={period}
                year={year}
                month={month}
                week={week}
            />

            <div className="grid gap-4 lg:grid-cols-2">
                <OrderStatus statusEntries={statusEntries} totalOrders={stats.totalOrders} year={year} />
                <TopProducts topProducts={topProducts} />
            </div>
        </div>
    );
}
