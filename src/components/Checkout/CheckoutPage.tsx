import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MapPin, CreditCard, Truck, Tag, X, Loader2, Clock, Package } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { formatVND } from "@/utils/formatVND"
import { SpinnerCustom } from "@/components/ui/spinner"

import useCarts from "@/hooks/useCarts"
import useAddress from "@/hooks/useAddress"
import useCheckout from "@/hooks/useCheckout"
import { useCoupons } from "@/hooks/useCoupons"
import useShipping from "@/hooks/useShipping"
import { CheckoutSchema } from "@/types/Checkout"
import QrCode from "@/components/QrCode/QrCode"
import dayjs from "dayjs"
type PaymentMethod = "cod" | "bank_transfer"
export default function CheckoutPage() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")

    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
    const [couponError, setCouponError] = useState("")

    const { getCartByUserId } = useCarts()
    const { getAddress } = useAddress()
    const { createOrder } = useCheckout();
    const { validateCoupon } = useCoupons();

    // Tìm address đang chọn để lấy district_code và ward_code
    const addresses = getAddress?.data?.data || []
    const selectedAddr = useMemo(() => {
        if (!selectedAddress) return null
        return addresses.find((a: any) => a.id === selectedAddress) || null
    }, [selectedAddress, addresses])

    // Tính tổng cân nặng (300g/cuốn mặc định)
    const cart = getCartByUserId?.data
    const items = cart?.items || []
    const totalWeight = useMemo(() => {
        return items.reduce((sum: number, item: any) => sum + item.quantity * 300, 0)
    }, [items])

    // Gọi API tính phí ship + leadtime
    const { shippingFee, leadtime, isLoadingShipping, isShippingError } = useShipping({
        districtId: selectedAddr?.district_id || null,
        wardCode: selectedAddr?.ward_code ? String(selectedAddr.ward_code) : null,
        weight: totalWeight,
        enabled: !!selectedAddr,
    })

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return
        try {
            const res = await validateCoupon.mutateAsync({ couponCode: couponCode.trim(), finalAmount })
            if (res?.data) {
                setAppliedCoupon(res?.data)
            }
        } catch (error: any) {
            alert(error?.response?.data?.message)
        }

    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode("")
        setCouponError("")
    }
    const [qrUrl, setQrUrl] = useState<string | null>(null)
    const handleCreateOrder = async () => {
        try {

            const result = CheckoutSchema.safeParse({ selectedAddress, paymentMethod, appliedCoupon, shipping_fee: shippingFee })
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    alert(issue.message)
                });
                return;
            }
            const res = await createOrder.mutateAsync({
                selectedAddress: selectedAddress!,
                paymentMethod,
                appliedCoupon,
                shipping_fee: shippingFee
            })
            if (res?.data) {
                if (paymentMethod === 'bank_transfer' && res.data?.vietQr) {
                    setQrUrl(res.data.vietQr)
                    setTimeLeft(dayjs(res.data.order.expires_at).diff(dayjs(), 'second'))
                }
                else {
                    navigate("/dat-hang-thanh-cong", { state: { orderSuccess: res.data?.order } })
                }

            }
        } catch (error) {
            alert("Đặt hàng thất bại. Vui lòng thử lại.")
        }
    }
    console.log("Check time left: ", timeLeft)
    useEffect(() => {
        if (!qrUrl) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev! <= 1) {
                    clearInterval(timer)
                    setQrUrl(null)
                    return 600
                }
                return prev! - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [qrUrl])
    if (!user) {
        navigate("/auth/sign-in")
        return null
    }
    if (getCartByUserId.isLoading || getAddress.isLoading) return <SpinnerCustom />
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.subtotal, 0)
    const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    const discountAmount = appliedCoupon ? appliedCoupon?.discount : 0
    const finalAmount = totalAmount - discountAmount + shippingFee

    return (
        <div className="container bg-neutral-50 min-h-[60vh]">
            <div className="px-4 py-6">
                <div className="mb-4 text-sm text-muted-foreground">
                    <Link to="/" className="hover:text-foreground">Trang chủ</Link>
                    <span className="mx-2">›</span>
                    <Link to="/gio-hang" className="hover:text-foreground">Giỏ hàng</Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">Thanh toán</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

                {qrUrl && <QrCode qrUrl={qrUrl} setQrUrl={setQrUrl} timeLeft={timeLeft!} />}
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-8 space-y-5">
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-orange-500" />
                                    Địa chỉ giao hàng
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {addresses.length === 0 ? (
                                    <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                                        Bạn chưa có địa chỉ nào. Vui lòng thêm địa chỉ trong trang cá nhân.
                                    </div>
                                ) : (
                                    addresses.map((addr: any) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => setSelectedAddress(addr.id)}
                                            className={`cursor-pointer rounded-xl border p-4 transition ${selectedAddress === addr.id
                                                ? "border-orange-500 bg-orange-50 ring-1 ring-orange-200"
                                                : "border-neutral-200 hover:border-neutral-300"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="text-sm font-medium">
                                                        {addr.address}
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {[
                                                            addr.Wards?.name,
                                                            addr.Districts?.name,
                                                            addr.Provinces?.name,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ")}
                                                    </div>
                                                    {addr.phone && (
                                                        <div className="mt-1 text-xs text-muted-foreground">
                                                            SĐT: {addr.phone}
                                                        </div>
                                                    )}
                                                </div>
                                                {selectedAddress === addr.id && (
                                                    <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        {/* Shipping info card - hiển thị khi đã chọn địa chỉ */}
                        {selectedAddress && (
                            <Card className="rounded-2xl overflow-hidden">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Package className="h-5 w-5 text-orange-500" />
                                        Thông tin vận chuyển
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoadingShipping ? (
                                        <div className="flex items-center gap-3 py-4">
                                            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                                            <span className="text-sm text-muted-foreground">Đang tính phí vận chuyển...</span>
                                        </div>
                                    ) : isShippingError ? (
                                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                            Không thể tính phí vận chuyển. Vui lòng thử lại hoặc chọn địa chỉ khác.
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {/* Phí ship */}
                                            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                                        <Truck className="h-5 w-5 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-neutral-800">Phí vận chuyển</div>
                                                        <div className="text-xs text-muted-foreground">Giao Hàng Nhanh (GHN)</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-base font-bold text-orange-600">
                                                        {formatVND(shippingFee)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Thời gian giao dự kiến */}
                                            {leadtime && (
                                                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                                                            <Clock className="h-5 w-5 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-neutral-800">Thời gian giao dự kiến</div>
                                                            <div className="text-xs text-muted-foreground">Dự kiến nhận hàng</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-base font-bold text-emerald-600">
                                                            {dayjs(leadtime * 1000).format("DD/MM/YYYY")}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Payment method */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-orange-500" />
                                    Phương thức thanh toán
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === "cod"
                                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-200"
                                        : "border-neutral-200 hover:border-neutral-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Truck className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm font-medium">Thanh toán khi nhận hàng (COD)</div>
                                            <div className="text-xs text-muted-foreground">Thanh toán bằng tiền mặt khi nhận hàng</div>
                                        </div>
                                        {paymentMethod === "cod" && (
                                            <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
                                        )}
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod("bank_transfer")}
                                    className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === "bank_transfer"
                                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-200"
                                        : "border-neutral-200 hover:border-neutral-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm font-medium">Chuyển khoản ngân hàng</div>
                                            <div className="text-xs text-muted-foreground">Chuyển khoản qua tài khoản ngân hàng</div>
                                        </div>
                                        {paymentMethod === "bank_transfer" && (
                                            <CheckCircle className="h-5 w-5 text-orange-500 ml-auto" />
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: summary */}
                    <div className="col-span-12 lg:col-span-4">
                        <Card className="rounded-2xl sticky top-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Đơn hàng của bạn</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {items.map((item: any) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white border">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs line-clamp-2">{item.title}</div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">×{item.quantity}</span>
                                                <span className="text-sm font-semibold text-orange-600">
                                                    {formatVND(item.subtotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Separator />

                                {/* Coupon input section */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                        <Tag className="h-4 w-4 text-orange-500" />
                                        Mã giảm giá
                                    </div>

                                    {appliedCoupon ? (
                                        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-semibold text-green-700">{appliedCoupon.code}</span>
                                                    <span className="ml-2 text-xs text-green-600">Giảm {appliedCoupon.discount}%</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRemoveCoupon}
                                                className="ml-2 rounded-full p-0.5 text-green-600 hover:bg-green-100 transition"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => {
                                                    setCouponCode(e.target.value.toUpperCase())
                                                    setCouponError("")
                                                }}
                                                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                                                placeholder="Nhập mã giảm giá"
                                                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleApplyCoupon}
                                                disabled={validateCoupon?.isPending || !couponCode.trim()}
                                                className="shrink-0 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                                            >
                                                {validateCoupon?.isPending
                                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                                    : "Áp dụng"
                                                }
                                            </Button>
                                        </div>
                                    )}

                                    {couponError && (
                                        <p className="text-xs text-red-500">{couponError}</p>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tạm tính ({totalItems} sản phẩm)</span>
                                        <span>{formatVND(totalAmount)}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Giảm giá ({appliedCoupon.discount}%)</span>
                                            <span className="text-green-600">-{formatVND(discountAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Phí vận chuyển</span>
                                        {!selectedAddress ? (
                                            <span className="text-xs text-muted-foreground italic">Chọn địa chỉ để tính</span>
                                        ) : isLoadingShipping ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                                        ) : shippingFee > 0 ? (
                                            <span className="text-orange-600 font-medium">{formatVND(shippingFee)}</span>
                                        ) : (
                                            <span className="text-green-600">Miễn phí</span>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-semibold">Tổng cộng</span>
                                    <div className="text-right">
                                        {(appliedCoupon || shippingFee > 0) && (
                                            <div className="text-xs text-muted-foreground line-through">
                                                {formatVND(totalAmount)}
                                            </div>
                                        )}
                                        <span className="text-xl font-bold text-orange-600">
                                            {formatVND(finalAmount)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="h-12 w-full rounded-xl bg-orange-500 text-base font-semibold hover:bg-orange-600"
                                    onClick={handleCreateOrder}
                                    disabled={createOrder.isPending || isLoadingShipping}
                                >
                                    {createOrder.isPending ? "Đang xử lý..." : "Đặt hàng"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
