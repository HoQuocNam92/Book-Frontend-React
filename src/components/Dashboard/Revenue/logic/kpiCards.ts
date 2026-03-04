import { formatVND } from "@/utils/formatVND";
import { Award, ShoppingCart, TrendingUp, Users } from "lucide-react";

export const kpiCards = (stats: any, year: number, topProducts: any[]) => [
    {
        title: "Tổng doanh thu",
        value: stats ? formatVND(Number(stats.totalRevenue || 0)) : "—",
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