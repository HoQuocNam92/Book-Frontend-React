import { formatVND } from "@/utils/formatVND";
import { CreditCard, Package, ShoppingCart, Users } from "lucide-react";

export const kpis = (stats: any) => [
    {
        title: "Doanh thu",
        value: stats ? formatVND(Number(stats.totalRevenue || 0)) : "—",
        delta: stats ? `${stats.totalOrders} đơn` : "—",
        hint: "Tổng doanh thu",
        icon: CreditCard,
    },
    {
        title: "Đơn hàng",
        value: stats ? String(stats.totalOrders) : "—",
        delta: stats ? `${stats.totalProducts} SP` : "—",
        hint: "Tổng đơn hàng",
        icon: ShoppingCart,
    },
    {
        title: "Khách hàng",
        value: stats ? String(stats.totalUsers) : "—",
        delta: stats ? `${stats.totalBrands} thương hiệu` : "—",
        hint: "Tổng người dùng",
        icon: Users,
    },
    {
        title: "Sản phẩm",
        value: stats ? String(stats.totalProducts) : "—",
        delta: stats ? `${stats.totalCategories} danh mục` : "—",
        hint: "Tổng sản phẩm",
        icon: Package,
    },
];