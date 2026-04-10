import { useMemo, useState } from 'react'
import { CardContent, CardHeader, CardDescription, CardTitle, Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import KpiCard from '@/components/Dashboard/Components/KpiCard';
import MiniMetric from '@/components/Dashboard/Components/MiniMetric';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getOverviewStats } from '@/services/overview.services';
import { SpinnerCustom } from '@/components/ui/spinner';
import OverviewList from '@/components/Dashboard/Overviews/OverviewList';
import OverviesEmpty from '@/components/Dashboard/Overviews/OverviesEmpty';
import { kpis } from '@/components/Dashboard/Overviews/logic/kpis';
import useOverViews from '@/hooks/useOverviews';


const OverviewsDashboard = () => {
    const { getChartData } = useOverViews();
    const [q, setQ] = useState("");
    const [tab, setTab] = useState<"all" | "paid" | "pending" | "shipping">(
        "all"
    );

    const { data: statsData, isLoading } = useQuery({
        queryKey: ["overview-stats"],
        queryFn: getOverviewStats,
    });
    const chartData = getChartData?.data || [];
    const stats = statsData?.data;
    const recentOrders = stats?.recentOrders || [];


    const filteredOrders = useMemo(() => {
        const byTab = (o: any) => {
            if (tab === "all") return true;
            if (tab === "paid") return o.status?.toLowerCase() === "paid";
            if (tab === "pending") return o.status?.toLowerCase() === "pending";
            if (tab === "shipping") return o.status?.toLowerCase() === "shipping";
            return true;
        };
        const bySearch = (o: any) => {
            const s = (q ?? "").trim().toLowerCase();
            if (!s) return true;
            return (
                String(o.id).includes(s) ||
                (o.customer || "").toLowerCase().includes(s)
            );
        };

        return recentOrders.filter((o: any) => byTab(o) && bySearch(o));
    }, [recentOrders, q, tab]);

    if (isLoading) {
        return <SpinnerCustom />;
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-2">
                {kpis(stats).map((k: any) => (
                    <KpiCard key={k.title} {...k} />
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3 my-2">
                <Card className="rounded-2xl lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Doanh thu 7 ngày</CardTitle>

                    </CardHeader>
                    <CardContent className="h-70">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart responsive data={chartData} margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    strokeWidth={2}
                                    fillOpacity={0.25}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl ">
                    <CardHeader>
                        <CardTitle>Vận hành</CardTitle>
                        <CardDescription>
                            Một vài chỉ số quick để admin nhìn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <MiniMetric
                            title="Tổng sản phẩm"
                            value={stats ? String(stats.totalProducts) : "—"}
                            progress={stats ? Math.min(stats.totalProducts, 100) : 0}
                        />
                        <MiniMetric
                            title="Tổng thương hiệu"
                            value={stats ? String(stats.totalBrands) : "—"}
                            progress={stats ? Math.min(stats.totalBrands * 5, 100) : 0}
                        />
                        <MiniMetric
                            title="Tổng danh mục"
                            value={stats ? String(stats.totalCategories) : "—"}
                            progress={stats ? Math.min(stats.totalCategories * 5, 100) : 0}
                        />
                        <MiniMetric
                            title="Tổng đơn hàng"
                            value={stats ? String(stats.totalOrders) : "—"}
                            progress={stats ? Math.min(stats.totalOrders * 5, 100) : 0}
                        />
                        <MiniMetric
                            title="Tổng khách hàng"
                            value={stats ? String(stats.totalUsers) : "—"}
                            progress={stats ? Math.min(stats.totalUsers * 5, 100) : 0}
                        />

                        <Separator />


                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl my-2">
                <CardHeader>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Đơn gần đây</CardTitle>

                        </div>

                        <Tabs
                            value={tab}
                            onValueChange={(v) => setTab(v as any)}
                            className="w-full md:w-auto"
                        >
                            <TabsList className="w-full md:w-auto">
                                <TabsTrigger value="all">Tất cả</TabsTrigger>
                                <TabsTrigger value="paid">Đã thanh toán</TabsTrigger>
                                <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
                                <TabsTrigger value="shipping">Đang giao</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="relative md:hidden">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Tìm đơn theo mã / tên khách..."
                            className="pl-9"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã đơn</TableHead>
                                <TableHead>Khách hàng</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Số SP
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Thời gian
                                </TableHead>
                                <TableHead>Tổng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((o: any) => (
                                <OverviewList key={o.id} o={o} />
                            ))}

                            {filteredOrders.length === 0 && (
                                <OverviesEmpty />
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default OverviewsDashboard