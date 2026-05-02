import { CardContent, Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { formatVND } from '@/utils/formatVND';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import CartHeader from '@/components/Cart/CartHeader';
import type { CartType } from '@/types/Cart';
type Props = {
    items: CartType[]
    handleClearCart: () => void
    itemCount: number
    totalAmount: number
    handleUpdateCart: (id: number, quantity: number) => void
    handleRemoveCart: (id: number) => void
    isLoadingRemove: boolean
    isLoadingUpdate: boolean
    isLoadingClear: boolean

}
const CartList = ({ items, handleClearCart, isLoadingRemove, isLoadingClear, isLoadingUpdate, handleRemoveCart, handleUpdateCart, itemCount, totalAmount }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-8 space-y-3">
                <CartHeader />

                {items.map((item: any) => (
                    <Card key={item.id} className="rounded-2xl">
                        <CardContent className="p-4">
                            {/* Mobile: xếp dọc */}
                            <div className="flex flex-col gap-3 md:hidden">
                                <div className="flex gap-3">
                                    <div
                                        className="h-24 w-[4.5rem] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white"
                                        onClick={() => navigate(`/${item.slug}`)}
                                    >
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            to={`/${item.slug}`}
                                            className="line-clamp-2 text-sm font-medium hover:text-orange-600"
                                        >
                                            {item.title}
                                        </Link>
                                        {item.discount_percent > 0 && (
                                            <span className="mt-1 inline-block rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
                                                -{item.discount_percent}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Đơn giá</div>
                                        <div className="text-sm font-semibold text-orange-600">
                                            {formatVND(item.final_price)}
                                        </div>
                                        {item.sale_price > 0 && item.sale_price < item.price && (
                                            <div className="text-xs text-muted-foreground line-through">
                                                {formatVND(item.price)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="mb-1 text-center text-xs text-muted-foreground">Số lượng</div>
                                        <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                                            <button
                                                onClick={() =>
                                                    handleUpdateCart(
                                                        item.id,
                                                        Math.max(1, item.quantity - 1),
                                                    )
                                                }
                                                className="h-9 w-9 border-r text-sm hover:bg-neutral-50"
                                                disabled={isLoadingUpdate}
                                            >
                                                <Minus className="mx-auto h-3 w-3" />
                                            </button>
                                            <div className="h-9 w-10 text-center text-sm font-semibold leading-9">
                                                {item.quantity}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleUpdateCart(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="h-9 w-9 border-l text-sm hover:bg-neutral-50"
                                                disabled={isLoadingUpdate}
                                            >
                                                <Plus className="mx-auto h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">Thành tiền</div>
                                        <div className="text-sm font-bold text-orange-600">
                                            {formatVND(item.subtotal)}
                                        </div>
                                        <button
                                            onClick={() => handleRemoveCart(item.id)}
                                            className="mt-1 ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500"
                                            disabled={isLoadingRemove}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden grid-cols-12 gap-4 items-center md:grid">
                                {/* Product info */}
                                <div className="col-span-6 flex gap-3">
                                    <div
                                        className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white border cursor-pointer"
                                        onClick={() => navigate(`/${item.slug}`)}
                                    >
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            to={`/${item.slug}`}
                                            className="text-sm font-medium line-clamp-2 hover:text-orange-600"
                                        >
                                            {item.title}
                                        </Link>
                                        {item.discount_percent > 0 && (
                                            <span className="mt-1 inline-block rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
                                                -{item.discount_percent}%
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Unit price */}
                                <div className="col-span-2 text-center">
                                    <div className="text-sm font-semibold text-orange-600">
                                        {formatVND(item.final_price)}
                                    </div>
                                    {item.sale_price > 0 && item.sale_price < item.price && (
                                        <div className="text-xs text-muted-foreground line-through">
                                            {formatVND(item.price)}
                                        </div>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div className="col-span-2 flex justify-center">
                                    <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                                        <button
                                            onClick={() =>
                                                handleUpdateCart(
                                                    item.id,
                                                    Math.max(1, item.quantity - 1),
                                                )
                                            }
                                            className="h-8 w-8 border-r text-sm hover:bg-neutral-50"
                                            disabled={isLoadingUpdate}
                                        >
                                            <Minus className="h-3 w-3 mx-auto" />
                                        </button>
                                        <div className="h-8 w-10 text-center leading-8 text-sm font-semibold">
                                            {item.quantity}
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleUpdateCart(
                                                    item.id,
                                                    item.quantity + 1,
                                                )
                                            }
                                            className="h-8 w-8 border-l text-sm hover:bg-neutral-50"
                                            disabled={isLoadingUpdate}
                                        >
                                            <Plus className="h-3 w-3 mx-auto" />
                                        </button>
                                    </div>
                                </div>

                                {/* Subtotal + delete */}
                                <div className="col-span-2 text-right">
                                    <div className="text-sm font-bold text-orange-600">
                                        {formatVND(item.subtotal)}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveCart(item.id)}
                                        className="mt-1 text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 ml-auto"
                                        disabled={isLoadingRemove}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Clear cart */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Tiếp tục mua sắm
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                        onClick={handleClearCart}
                        disabled={isLoadingClear}
                    >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Xóa tất cả
                    </Button>
                </div>
            </div>

            {/* Summary sidebar */}
            <div className="col-span-12 lg:col-span-4">
                <Card className="rounded-2xl sticky top-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Tóm tắt đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tạm tính ({itemCount} sản phẩm)</span>
                            <span className="font-medium">{formatVND(totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Phí vận chuyển</span>
                            <span className="font-medium text-green-600">Miễn phí</span>
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
                            onClick={() => navigate("/thanh-toan")}
                        >
                            Tiến hành đặt hàng
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CartList