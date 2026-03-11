import { useState, type SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MapPin, CreditCard, Truck, Tag, X, Loader2 } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { formatVND } from "@/utils/formatVND"
import { SpinnerCustom } from "@/components/ui/spinner"

import useCarts from "@/hooks/useCarts"
import useAddress from "@/hooks/useAddress"
import useCheckout from "@/hooks/useCheckout"
import { useCoupons } from "@/hooks/useCoupons"

export default function CheckoutPage() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)

    const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState("cod")

    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
    const [couponError, setCouponError] = useState("")

    const { getCartByUserId } = useCarts()
    const { getAddress } = useAddress()
    const { createOrder } = useCheckout();
    const { validateCoupon } = useCoupons();
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
    const handleCreateOrder = async () => {
        try {
            console.log("Check appliedCoupon", appliedCoupon)
            const res = await createOrder.mutateAsync({ selectedAddress, paymentMethod, appliedCoupon, finalAmount })

        } catch (error) {

        }
    }

    if (!user) {
        navigate("/auth/sign-in")
        return null
    }
    if (getCartByUserId.isLoading || getAddress.isLoading) return <SpinnerCustom />
    const cart = getCartByUserId?.data
    const items = cart?.items || []
    const addresses = getAddress?.data?.data || []
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.subtotal, 0)
    const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    const discountAmount = appliedCoupon ? appliedCoupon?.discount : 0
    const finalAmount = totalAmount - discountAmount

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


                <div className="grid grid-cols-12 gap-5">
                    {/* Left: form */}
                    <div className="col-span-12 lg:col-span-8 space-y-5">
                        {/* Address */}
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
                                        <span className="text-green-600">Miễn phí</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-semibold">Tổng cộng</span>
                                    <div className="text-right">
                                        {appliedCoupon && (
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
                                    disabled={createOrder.isPending}
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
