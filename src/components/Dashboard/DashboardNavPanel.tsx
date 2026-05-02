import type { ComponentType } from "react"
import {
    Briefcase,
    ClipboardList,
    FolderTree,
    Image as ImageIcon,
    LayoutDashboard,
    Newspaper,
    Package,
    Tag,
    Ticket,
    TrendingUp,
    Truck,
    Users,
} from "lucide-react"

function NavBtn({
    icon: Icon,
    label,
    onClick,
}: {
    icon: ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-muted/80"
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="font-medium">{label}</span>
        </button>
    )
}

export type DashboardNavNavigate = (path: string) => void

/** Danh mục điều hướng dashboard — dùng chung cho sidebar desktop & menu mobile */
export default function DashboardNavPanel({
    onNavigate,
}: {
    onNavigate: DashboardNavNavigate
}) {
    const go = (path: string) => onNavigate(path)
    return (
        <nav className="space-y-0.5" aria-label="Menu quản trị">
            <NavBtn icon={LayoutDashboard} label="Dashboard" onClick={() => go("overviews")} />
            <NavBtn icon={TrendingUp} label="Doanh thu" onClick={() => go("revenue")} />
            <NavBtn icon={ClipboardList} label="Đơn hàng" onClick={() => go("orders")} />
            <NavBtn icon={Package} label="Sản phẩm" onClick={() => go("products")} />
            <NavBtn icon={Tag} label="Thương hiệu" onClick={() => go("brands")} />
            <NavBtn icon={FolderTree} label="Danh mục" onClick={() => go("categories")} />
            <NavBtn icon={ImageIcon} label="Banners" onClick={() => go("banners")} />
            <NavBtn icon={Ticket} label="Mã giảm giá" onClick={() => go("coupons")} />
            <NavBtn icon={Users} label="Khách hàng" onClick={() => go("users")} />
            <NavBtn icon={Truck} label="Kho / Tồn" onClick={() => go("inventory")} />
            <NavBtn icon={Newspaper} label="Tin tức" onClick={() => go("news")} />
            <NavBtn icon={Briefcase} label="Dịch vụ" onClick={() => go("services")} />
        </nav>
    )
}
