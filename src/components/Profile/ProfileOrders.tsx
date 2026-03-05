import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ChevronDown, ChevronUp } from "lucide-react"
import { formatVND } from "@/utils/formatVND"
import { SpinnerCustom } from "@/components/ui/spinner"
import OrderEmpty from "@/components/Orders/OrderEmpty"
import { useOrders } from "@/hooks/useOrders"
import Pagination from "@/components/common/Pagination"

const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    paid: { label: "Đã thanh toán", color: "bg-blue-100 text-blue-700" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
}

export default function ProfileOrders() {
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const { getMyOrders, setPage, page } = useOrders()

    if (getMyOrders?.isLoading) return <SpinnerCustom />

    const orders = getMyOrders?.data?.data || []
    console.log("My Orders:", orders)
    if (orders.length === 0) {
        return <OrderEmpty />
    }

    return (
        <div className="space-y-4">

            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Package className="h-5 w-5 text-orange-500" />
                        Đơn hàng của tôi ({orders.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {orders.map((order: any) => {
                        const status = statusConfig[order.status] || { label: order.status, color: "bg-neutral-100" }
                        const isExpanded = expandedId === order.id

                        return (
                            <div key={order.id} className="rounded-xl border transition-all">
                                {/* Order header */}
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 transition"
                                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Đơn hàng #{order.id}
                                            </div>
                                            <div className="mt-0.5 text-xs text-muted-foreground">
                                                {new Date(order.created_at).toLocaleDateString("vi-VN", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                                            {status.label}
                                        </span>
                                        <span className="text-sm font-semibold text-orange-600">
                                            {formatVND(Number(order.total))}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded detail */}
                                {isExpanded && (
                                    <div className="border-t px-4 py-3 bg-neutral-50/50 space-y-3">
                                        {/* Items */}
                                        <div className="space-y-2">
                                            {order.OrderItems?.map((item: any) => (
                                                <div key={item.id} className="flex items-center gap-3">
                                                    <div className="h-12 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-white border">
                                                        {item.Books?.BookImages?.[0]?.url && (
                                                            <img
                                                                src={item.Books.BookImages[0].url}
                                                                alt={item.Books.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm line-clamp-1">{item.Books?.title}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            x{item.quantity} · {formatVND(Number(item.price))}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium">
                                                        {formatVND(Number(item.price) * item.quantity)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {order.Addresses && (
                                            <div className="text-xs text-muted-foreground border-t pt-2">
                                                <span className="font-medium text-foreground">Giao đến: </span>
                                                {order.Addresses.address}
                                                {order.Addresses.Wards?.name && `, ${order.Addresses.Wards.name}`}
                                                {order.Addresses.Districts?.name && `, ${order.Addresses.Districts.name}`}
                                                {order.Addresses.Provinces?.name && `, ${order.Addresses.Provinces.name}`}
                                                {order.Addresses.phone && ` · SĐT: ${order.Addresses.phone}`}
                                            </div>
                                        )}

                                        {/* Payment */}
                                        {order.Payments?.[0] && (
                                            <div className="text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground">Thanh toán: </span>
                                                {order.Payments[0].method === "cod" ? "Khi nhận hàng (COD)" : "Chuyển khoản"}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </CardContent>

            </Card>
            <Pagination totalPages={getMyOrders?.data.totalPages || 1} page={page} onChange={() => setPage(page + 1)} />
        </div>
    )
}
