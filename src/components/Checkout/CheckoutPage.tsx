import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MapPin, CreditCard, Truck, ArrowLeft, Package } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { getCart } from "@/services/cart.services"
import { placeOrder, getAddresses } from "@/services/checkout.services"
import { useAuthStore } from "@/stores/auth.stores"
import { useCartStore } from "@/stores/cart.stores"
import { formatVND } from "@/utils/formatVND"
import { SpinnerCustom } from "@/components/ui/spinner"

export default function CheckoutPage() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const clearCartStore = useCartStore((s) => s.clear)

    const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [orderSuccess, setOrderSuccess] = useState<any>(null)
    const [error, setError] = useState("")

    const { data: cartData, isLoading: cartLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled: !!user,
    })

    const { data: addressData, isLoading: addressLoading } = useQuery({
        queryKey: ["checkout-addresses"],
        queryFn: getAddresses,
        enabled: !!user,
    })

    const orderMutation = useMutation({
        mutationFn: () => placeOrder(selectedAddress!, paymentMethod),
        onSuccess: (res) => {
            setOrderSuccess(res.data)
            clearCartStore()
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || "Đặt hàng thất bại, vui lòng thử lại")
        },
    })

    if (!user) {
        navigate("/auth/sign-in")
        return null
    }

    if (cartLoading || addressLoading) return <SpinnerCustom />

    const cart = cartData?.data
    const items = cart?.items || []
    const addresses = addressData?.data || []
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.subtotal, 0)
    const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)

    if (items.length === 0 && !orderSuccess) {
        return (
            <div className="container py-20 text-center">
                <Package className="mx-auto h-16 w-16 text-neutral-300" />
                <h2 className="mt-4 text-xl font-semibold">Giỏ hàng trống</h2>
                <p className="mt-2 text-muted-foreground">Bạn cần thêm sản phẩm trước khi thanh toán</p>
                <Button className="mt-6 bg-orange-500 hover:bg-orange-600" onClick={() => navigate("/")}>
                    Tiếp tục mua sắm
                </Button>
            </div>
        )
    }

    // Success screen
    if (orderSuccess) {
        return (
            <div className="container py-16 text-center">
                <div className="mx-auto max-w-lg">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">Đặt hàng thành công!</h2>
                    <p className="mt-2 text-muted-foreground">
                        Mã đơn hàng: <span className="font-semibold text-foreground">#{orderSuccess.id}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
                    </p>

                    <Card className="mt-6 rounded-2xl text-left">
                        <CardContent className="p-5 space-y-3">
                            <div className="text-sm font-semibold">Chi tiết đơn hàng</div>
                            {orderSuccess.OrderItems?.map((oi: any) => (
                                <div key={oi.id} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {oi.Books?.title} × {oi.quantity}
                                    </span>
                                    <span className="font-medium">
                                        {formatVND(Number(oi.price) * oi.quantity)}
                                    </span>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-orange-600">{formatVND(Number(orderSuccess.total))}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex gap-3 justify-center">
                        <Button variant="outline" onClick={() => navigate("/")}>
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Tiếp tục mua sắm
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

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

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

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

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tạm tính ({totalItems} sản phẩm)</span>
                                        <span>{formatVND(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Phí vận chuyển</span>
                                        <span className="text-green-600">Miễn phí</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-semibold">Tổng cộng</span>
                                    <span className="text-xl font-bold text-orange-600">
                                        {formatVND(totalAmount)}
                                    </span>
                                </div>

                                <Button
                                    className="h-12 w-full rounded-xl bg-orange-500 text-base font-semibold hover:bg-orange-600"
                                    onClick={() => {
                                        setError("")
                                        if (!selectedAddress) {
                                            setError("Vui lòng chọn địa chỉ giao hàng")
                                            return
                                        }
                                        orderMutation.mutate()
                                    }}
                                    disabled={orderMutation.isPending}
                                >
                                    {orderMutation.isPending ? "Đang xử lý..." : "Đặt hàng"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
