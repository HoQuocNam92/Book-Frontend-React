import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { TrendingUp, ShoppingCart, Users, Award, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-700" },
    pending: { label: "Chờ xử lý", className: "bg-yellow-100 text-yellow-700" },
    shipping: { label: "Đang giao", className: "bg-blue-100 text-blue-700" },
    cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-700" },
    completed: { label: "Hoàn thành", className: "bg-purple-100 text-purple-700" },
};

const COLORS = [
    "hsl(var(--primary))",
    "hsl(220 85% 60%)",
    "hsl(160 60% 50%)",
    "hsl(38 92% 55%)",
    "hsl(271 76% 60%)",
    "hsl(0 84% 60%)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border bg-background p-3 shadow-lg text-sm space-y-1">
            <p className="font-semibold">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} style={{ color: p.color }}>
                    {p.name === "revenue" ? "Doanh thu: " : "Đơn hàng: "}
                    <span className="font-medium">
                        {p.name === "revenue" ? formatVND(p.value) : p.value}
                    </span>
                </p>
            ))}
        </div>
    );
};

const fetchRevenueStats = async (year: number) => {
    const res = await instance.get(`/stats/revenue?year=${year}`);
    return res.data;
};

export default function RevenueDashboard() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["revenue-stats", year],
        queryFn: () => fetchRevenueStats(year),
        refetchOnWindowFocus: false,
    });

    const stats = data?.data;

    // Derived
    const monthlyRevenue: any[] = stats?.monthlyRevenue || [];
    const topProducts: any[] = stats?.topProducts || [];
    const statusCounts: Record<string, number> = stats?.statusCounts || {};
    const statusEntries = Object.entries(statusCounts).sort((a, b) => b[1] - a[1]);

    const kpiCards = [
        {
            title: "Tổng doanh thu",
            value: stats ? formatVND(stats.totalRevenue) : "—",
            icon: TrendingUp,
            desc: `Cả năm ${year}`,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            title: "Tổng đơn hàng",
            value: stats ? String(stats.totalOrders) : "—",
            icon: ShoppingCart,
            desc: "Trong năm",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Giá trị trung bình",
            value: stats ? formatVND(stats.avgOrderValue) : "—",
            icon: Users,
            desc: "Mỗi đơn hàng",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            title: "Sản phẩm bán chạy",
            value: topProducts[0]?.title?.slice(0, 20) + (topProducts[0] ? "…" : "—") || "—",
            icon: Award,
            desc: topProducts[0] ? `${formatVND(topProducts[0].revenue)}` : "N/A",
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
    ];

    if (isLoading) return <SpinnerCustom />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <p className="text-muted-foreground">Không thể tải dữ liệu doanh thu.</p>
                <Button variant="outline" onClick={() => refetch()} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Thử lại
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <TrendingUp className="h-4.5 w-4.5 text-green-600" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">Doanh thu</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Số liệu doanh thu theo tháng, trạng thái đơn hàng và sản phẩm nổi bật.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Year selector */}
                    <div className="flex items-center gap-1 rounded-xl border bg-background p-1">
                        {[currentYear - 1, currentYear].map((y) => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${year === y
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground"
                                    }`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => refetch()} className="h-9 w-9">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpiCards.map((k) => (
                    <Card key={k.title} className="rounded-2xl">
                        <CardContent className="pt-5">
                            <div className="flex items-center gap-3">
                                <div className={`grid h-10 w-10 place-items-center rounded-2xl ${k.bg}`}>
                                    <k.icon className={`h-5 w-5 ${k.color}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground truncate">{k.title}</p>
                                    <p className="text-lg font-bold leading-tight truncate">{k.value}</p>
                                    <p className="text-xs text-muted-foreground truncate">{k.desc}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Monthly Revenue Chart */}
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Doanh thu theo tháng — {year}</CardTitle>
                    <CardDescription>Tổng doanh thu và số đơn hàng mỗi tháng</CardDescription>
                </CardHeader>
                <CardContent>
                    {monthlyRevenue.every((m) => m.revenue === 0) ? (
                        <div className="flex h-48 items-center justify-center text-center text-muted-foreground text-sm">
                            Không có dữ liệu doanh thu cho năm {year}.
                        </div>
                    ) : (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyRevenue}
                                    margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                                    <YAxis
                                        tickFormatter={(v) =>
                                            v >= 1_000_000
                                                ? `${(v / 1_000_000).toFixed(0)}M`
                                                : v >= 1000
                                                    ? `${(v / 1000).toFixed(0)}K`
                                                    : String(v)
                                        }
                                        tick={{ fontSize: 11 }}
                                        width={52}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="revenue" name="revenue" radius={[6, 6, 0, 0]}>
                                        {monthlyRevenue.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Bottom row: Status distribution + Top products */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Order Status */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Phân bổ đơn hàng</CardTitle>
                        <CardDescription>Theo trạng thái trong năm {year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {statusEntries.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground py-8">
                                Không có dữ liệu
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {statusEntries.map(([status, count], i) => {
                                    const info = STATUS_LABELS[status] || { label: status, className: "bg-gray-100 text-gray-700" };
                                    const pct = stats?.totalOrders
                                        ? Math.round((count / stats.totalOrders) * 100)
                                        : 0;
                                    return (
                                        <div key={status} className="flex items-center gap-3">
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${info.className}`}>
                                                {info.label}
                                            </span>
                                            <div className="flex-1 rounded-full bg-muted h-2">
                                                <div
                                                    className="h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${pct}%`,
                                                        backgroundColor: COLORS[i % COLORS.length],
                                                    }}
                                                />
                                            </div>
                                            <span className="w-12 text-right text-sm font-medium">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Top products */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Top sách bán chạy</CardTitle>
                        <CardDescription>Theo doanh thu toàn thời gian</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topProducts.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground py-8">
                                Không có dữ liệu
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {topProducts.map((product, i) => (
                                    <div key={product.bookId} className="flex items-center gap-3">
                                        <div
                                            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                        >
                                            {i + 1}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{product.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {product.quantity} cuốn đã bán
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="shrink-0 font-mono text-xs">
                                            {formatVND(product.revenue)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
