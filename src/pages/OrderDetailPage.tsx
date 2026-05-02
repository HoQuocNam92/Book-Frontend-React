import type { ComponentType, ReactNode } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    Package,
    Truck,
    MapPin,
    CreditCard,
    Clock,
    User,
    Phone,
    Scale,
    Shield,
    FileText,
    Navigation,
    Store,
} from "lucide-react"
import { useAuthStore } from "@/stores/auth.stores"
import { getMyOrderDetail } from "@/services/order.services"
import { formatVND } from "@/utils/formatVND"
import { SpinnerCustom } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
    paid: { label: "Đã thanh toán", color: "bg-blue-100 text-blue-700" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
}

const ghnStatusLabels: Record<string, string> = {
    ready_to_pick: "Chờ lấy hàng",
    picking: "Đang lấy hàng",
    storing: "Lưu kho",
    transporting: "Đang trung chuyển",
    sorting: "Đang phân loại",
    delivering: "Đang giao",
    delivered: "Đã giao",
    delivery_fail: "Giao không thành công",
    return: "Hoàn hàng",
    exception: "Bất thường",
    damage: "Hư hỏng",
    lost: "Thất lạc",
    cancel: "Đã hủy",
}

function formatWhen(value: unknown): string {
    if (value == null || value === "") return "—"
    const d = new Date(value as string | number | Date)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleString("vi-VN")
}

function DetailRow({
    icon: Icon,
    label,
    children,
}: {
    icon?: ComponentType<{ className?: string }>
    label: string
    children: ReactNode
}) {
    return (
        <div className="flex gap-3 rounded-lg border bg-white/80 px-3 py-2 text-sm">
            {Icon && (
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            )}
            <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-muted-foreground">{label}</div>
                <div className="mt-0.5 text-foreground break-words">{children}</div>
            </div>
        </div>
    )
}

export default function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const idNum = orderId ? parseInt(orderId, 10) : NaN

    const query = useQuery({
        queryKey: ["my-order-detail", idNum],
        queryFn: () => getMyOrderDetail(idNum),
        enabled: Number.isFinite(idNum),
        retry: false,
    })

    if (!user) {
        navigate("/auth/sign-in")
        return null
    }

    if (!Number.isFinite(idNum)) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
                <p className="text-muted-foreground">Mã đơn hàng không hợp lệ.</p>
                <Button asChild variant="link" className="mt-2">
                    <Link to="/ho-so?tab=orders">← Quay lại đơn hàng</Link>
                </Button>
            </div>
        )
    }

    if (query.isLoading) {
        return (
            <div className="py-24">
                <SpinnerCustom />
            </div>
        )
    }

    if (query.isError || !query.data?.data?.order) {
        const msg =
            (query.error as { response?: { data?: { message?: string } } })?.response?.data
                ?.message || "Không tải được đơn hàng."
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
                <p className="text-muted-foreground">{msg}</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link to="/ho-so?tab=orders">← Quay lại đơn hàng</Link>
                </Button>
            </div>
        )
    }

    const { order: rawOrder, ghn, ghnError, shopSender } = query.data.data as {
        order: unknown
        ghn: unknown
        ghnError: string | null
        shopSender?: {
            name?: string | null
            phone?: string | null
            address?: string | null
            wardName?: string | null
            districtName?: string | null
            provinceName?: string | null
            returnPhone?: string | null
            returnAddress?: string | null
            source?: string
        }
    }
    const order = rawOrder as Record<string, unknown>
    const addr = order.Addresses as Record<string, unknown> | undefined
    const ghnObj = ghn as Record<string, unknown> | null
    const status =
        statusConfig[String(order.status || "").toLowerCase()] || {
            label: String(order.status ?? "—"),
            color: "bg-neutral-100 text-neutral-800",
        }

    const timeline =
        ghnObj?.log && Array.isArray(ghnObj.log)
            ? [...(ghnObj.log as { status?: string; updated_date?: string }[])].sort(
                  (a, b) =>
                      new Date(a.updated_date || 0).getTime() -
                      new Date(b.updated_date || 0).getTime(),
              )
            : []

    const sender = shopSender
    const hasShopInfo =
        !!sender &&
        [sender.name, sender.phone, sender.address, sender.wardName, sender.districtName, sender.provinceName].some(
            (x) => x != null && String(x).trim() !== "",
        )

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 pb-16">
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
                    <Link to="/ho-so?tab=orders">
                        <ArrowLeft className="h-4 w-4" />
                        Đơn hàng của tôi
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <Card className="mb-6 overflow-hidden rounded-2xl border-orange-100 shadow-sm">
                <CardHeader className="border-b bg-gradient-to-r from-orange-50/80 to-transparent pb-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                                <Package className="h-6 w-6 text-orange-500" />
                                Đơn hàng #{String(order.id)}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Đặt lúc{" "}
                                <span className="font-medium text-foreground">
                                    {formatWhen(order.created_at)}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                            >
                                {status.label}
                            </span>
                            <span className="text-lg font-bold text-orange-600">
                                {formatVND(Number(order.total))}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailRow icon={CreditCard} label="Phương thức thanh toán">
                        {(order.Payments as { method?: string }[] | undefined)?.[0]?.method ===
                        "cod"
                            ? "Thanh toán khi nhận hàng (COD)"
                            : "Chuyển khoản ngân hàng"}
                    </DetailRow>
                    <DetailRow icon={CreditCard} label="Trạng thái thanh toán">
                        {(order.Payments as { status?: string }[] | undefined)?.[0]?.status ||
                            "—"}
                    </DetailRow>
                    <DetailRow icon={Navigation} label="Phí vận chuyển">
                        {order.shipping_fee != null && order.shipping_fee !== ""
                            ? formatVND(Number(order.shipping_fee))
                            : "—"}
                    </DetailRow>
                    <DetailRow icon={Clock} label="Dự kiến giao (hệ thống)">
                        {order.expected_delivery ? formatWhen(order.expected_delivery) : "—"}
                    </DetailRow>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* GHN block */}
                <div className="space-y-6 lg:col-span-7">
                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Truck className="h-5 w-5 text-orange-500" />
                                Vận chuyển Giao Hàng Nhanh (GHN)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {ghnError && (
                                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                                    {ghnError}
                                </div>
                            )}
                            {!order.ghn_order_code && !ghnObj && (
                                <p className="text-sm text-muted-foreground">
                                    Đơn vận chuyển GHN chưa được tạo hoặc đang được xử lý sau khi đặt
                                    hàng.
                                </p>
                            )}
                            {ghnObj && (
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <DetailRow label="Mã vận đơn (order_code)">
                                        <span className="font-mono">
                                            {String(ghnObj.order_code ?? order.ghn_order_code ?? "—")}
                                        </span>
                                    </DetailRow>
                                    <DetailRow label="Trạng thái GHN">
                                        {ghnStatusLabels[String(ghnObj.status)] ||
                                            String(ghnObj.status ?? "—")}
                                    </DetailRow>
                                    <DetailRow icon={Clock} label="Leadtime (GHN)">
                                        {ghnObj.leadtime ? formatWhen(ghnObj.leadtime) : "—"}
                                    </DetailRow>
                                    <DetailRow icon={Clock} label="Ngày tạo đơn GHN">
                                        {ghnObj.order_date ? formatWhen(ghnObj.order_date) : "—"}
                                    </DetailRow>
                                    <DetailRow icon={User} label="Người nhận">
                                        {String(ghnObj.to_name ?? "—")}
                                    </DetailRow>
                                    <DetailRow icon={Phone} label="SĐT người nhận">
                                        {String(ghnObj.to_phone ?? "—")}
                                    </DetailRow>
                                    <DetailRow icon={MapPin} label="Địa chỉ nhận (GHN)">
                                        {String(ghnObj.to_address ?? "—")}
                                    </DetailRow>
                                    <DetailRow label="Phường/Xã (mã)">
                                        {String(ghnObj.to_ward_code ?? "—")}
                                    </DetailRow>
                                    <DetailRow label="Quận/Huyện (id)">
                                        {String(ghnObj.to_district_id ?? "—")}
                                    </DetailRow>
                                    <DetailRow label="COD thu hộ">
                                        {ghnObj.cod_amount != null
                                            ? formatVND(Number(ghnObj.cod_amount))
                                            : "—"}
                                    </DetailRow>
                                    <DetailRow icon={Scale} label="Khối lượng (gram)">
                                        {String(ghnObj.weight ?? "—")}
                                    </DetailRow>
                                    <DetailRow icon={Shield} label="Khai giá (bảo hiểm)">
                                        {ghnObj.insurance_value != null
                                            ? formatVND(Number(ghnObj.insurance_value))
                                            : "—"}
                                    </DetailRow>
                                    <DetailRow label="Dịch vụ (service_type_id)">
                                        {String(ghnObj.service_type_id ?? "—")}
                                    </DetailRow>
                                    <DetailRow label="Shop GHN (shop_id)">
                                        {String(ghnObj.shop_id ?? "—")}
                                    </DetailRow>
                                    <DetailRow icon={FileText} label="Ghi chú / nội dung">
                                        <div className="space-y-1">
                                            {ghnObj.note != null && String(ghnObj.note).trim() !== "" && (
                                                <div>
                                                    <span className="text-muted-foreground">Ghi chú: </span>
                                                    {String(ghnObj.note)}
                                                </div>
                                            )}
                                            {ghnObj.content != null &&
                                                String(ghnObj.content).trim() !== "" && (
                                                    <div>
                                                        <span className="text-muted-foreground">Nội dung: </span>
                                                        {String(ghnObj.content)}
                                                    </div>
                                                )}
                                            {(!ghnObj.note || String(ghnObj.note).trim() === "") &&
                                                (!ghnObj.content || String(ghnObj.content).trim() === "") &&
                                                "—"}
                                        </div>
                                    </DetailRow>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {hasShopInfo && sender && (
                        <Card className="rounded-2xl border-orange-100 bg-orange-50/30">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Store className="h-5 w-5 text-orange-600" />
                                    Điểm gửi / cửa hàng
                                    <span className="text-xs font-normal text-muted-foreground">
                                        ({sender.source === "ghn" ? "theo GHN" : "theo cấu hình shop"})
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                {sender.name && (
                                    <p>
                                        <span className="font-medium text-muted-foreground">Tên: </span>
                                        {sender.name}
                                    </p>
                                )}
                                {sender.phone && (
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        {sender.phone}
                                    </p>
                                )}
                                {sender.address && (
                                    <p className="leading-relaxed">
                                        <span className="font-medium text-muted-foreground">Địa chỉ: </span>
                                        {sender.address}
                                    </p>
                                )}
                                {(sender.wardName || sender.districtName || sender.provinceName) && (
                                    <p className="text-muted-foreground">
                                        {[
                                            sender.wardName,
                                            sender.districtName,
                                            sender.provinceName,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </p>
                                )}
                                {(sender.returnAddress || sender.returnPhone) && (
                                    <div className="rounded-lg border border-dashed bg-white/80 px-3 py-2 text-xs">
                                        <div className="font-medium text-foreground">Hoàn hàng (nếu có)</div>
                                        {sender.returnAddress && <div className="mt-1">{sender.returnAddress}</div>}
                                        {sender.returnPhone && (
                                            <div className="mt-1 flex items-center gap-1">
                                                <Phone className="h-3.5 w-3.5" />
                                                {sender.returnPhone}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Timeline */}
                    {timeline.length > 0 && (
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Clock className="h-5 w-5 text-orange-500" />
                                    Lịch sử trạng thái vận chuyển
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="relative space-y-0 border-l-2 border-orange-200 pl-6">
                                    {timeline.map((step, idx) => (
                                        <li key={`${step.status}-${step.updated_date}-${idx}`} className="pb-6 last:pb-0">
                                            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-orange-500 bg-white" />
                                            <div className="text-sm font-medium text-foreground">
                                                {ghnStatusLabels[String(step.status)] ||
                                                    String(step.status ?? "—")}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {formatWhen(step.updated_date)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Products + address */}
                <div className="space-y-6 lg:col-span-5">
                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Sản phẩm</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(order.OrderItems as Record<string, unknown>[] | undefined)?.map(
                                (item) => {
                                    const book = item.Books as
                                        | {
                                              title?: string
                                              slug?: string
                                              BookImages?: { url?: string }[]
                                          }
                                        | undefined
                                    return (
                                        <div
                                            key={String(item.id)}
                                            className="flex gap-3 rounded-xl border bg-white p-2"
                                        >
                                            <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                                                {book?.BookImages?.[0]?.url && (
                                                    <img
                                                        src={book.BookImages[0].url}
                                                        alt={book.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                {book?.slug ? (
                                                    <Link
                                                        to={`/${book.slug}`}
                                                        className="line-clamp-2 text-sm font-medium hover:text-orange-600 hover:underline"
                                                    >
                                                        {book.title ?? "Sản phẩm"}
                                                    </Link>
                                                ) : (
                                                    <span className="line-clamp-2 text-sm font-medium">
                                                        {book?.title ?? "Sản phẩm"}
                                                    </span>
                                                )}
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    SL: {String(item.quantity ?? 1)} ×{" "}
                                                    {formatVND(Number(item.price))}
                                                </div>
                                                <div className="mt-1 text-sm font-semibold text-orange-700">
                                                    {formatVND(
                                                        Number(item.price) * Number(item.quantity ?? 1),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                            )}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MapPin className="h-5 w-5 text-orange-500" />
                                Địa chỉ nhận hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {addr ? (
                                <>
                                    <div className="rounded-lg border bg-muted/40 px-3 py-2">
                                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                            Địa chỉ chi tiết
                                        </div>
                                        <p className="mt-1 leading-relaxed font-medium">
                                            {String(addr.address ?? "—")}
                                        </p>
                                    </div>
                                    <dl className="grid gap-2 text-sm">
                                        <div className="flex flex-wrap justify-between gap-2 border-b border-dashed pb-2">
                                            <dt className="text-muted-foreground">Phường / Xã</dt>
                                            <dd className="font-medium text-end">
                                                {(addr.Wards as { name?: string; ward_code?: string } | undefined)
                                                    ?.name || "—"}
                                                {(addr.Wards as { ward_code?: string } | undefined)?.ward_code && (
                                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                        (mã{" "}
                                                        {
                                                            (addr.Wards as { ward_code?: string }).ward_code
                                                        }
                                                        )
                                                    </span>
                                                )}
                                            </dd>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2 border-b border-dashed pb-2">
                                            <dt className="text-muted-foreground">Quận / Huyện</dt>
                                            <dd className="font-medium text-end">
                                                {(addr.Districts as { name?: string; district_id?: number } | undefined)
                                                    ?.name || "—"}
                                                {(addr.Districts as { district_id?: number } | undefined)
                                                    ?.district_id != null && (
                                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                        (id{" "}
                                                        {
                                                            (addr.Districts as { district_id?: number }).district_id
                                                        }
                                                        )
                                                    </span>
                                                )}
                                            </dd>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <dt className="text-muted-foreground">Tỉnh / Thành phố</dt>
                                            <dd className="font-medium text-end">
                                                {(addr.Provinces as { name?: string; province_id?: number } | undefined)
                                                    ?.name || "—"}
                                                {(addr.Provinces as { province_id?: number } | undefined)
                                                    ?.province_id != null && (
                                                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                                                        (id{" "}
                                                        {
                                                            (addr.Provinces as { province_id?: number }).province_id
                                                        }
                                                        )
                                                    </span>
                                                )}
                                            </dd>
                                        </div>
                                    </dl>
                                    {addr.phone && (
                                        <p className="flex items-center gap-2 pt-1 border-t">
                                            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span>{String(addr.phone)}</span>
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        <span className="font-medium text-foreground">Địa chỉ đầy đủ: </span>
                                        {[
                                            addr.address,
                                            (addr.Wards as { name?: string } | undefined)?.name,
                                            (addr.Districts as { name?: string } | undefined)?.name,
                                            (addr.Provinces as { name?: string } | undefined)?.name,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </p>
                                </>
                            ) : (
                                <p className="text-muted-foreground">—</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
