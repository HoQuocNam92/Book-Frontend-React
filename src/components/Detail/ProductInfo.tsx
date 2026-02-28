import React, { type Dispatch, type SetStateAction } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Badge, RotateCcw, Shield, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatVND } from '@/utils/formatVND';

const ProductInfo = ({ product, finalPrice, salePrice, discount, setQty, qty, handleAddToCart, isPending }: {
    product: any
    finalPrice: number
    salePrice: number
    discount: number
    setQty: Dispatch<SetStateAction<number>>
    qty: number
    handleAddToCart: () => void
    isPending: boolean
}) => {
    return (
        <Card className="col-span-12 lg:col-span-4 rounded-2xl">
            <CardContent className="p-5">
                <h1 className="text-xl font-semibold leading-snug">{product.title}</h1>

                <Separator className="my-4" />

                {/* price */}
                <div className="space-y-2">
                    <div className="flex items-end gap-3">
                        <div className="text-3xl font-bold text-orange-600">
                            {formatVND(finalPrice)}
                        </div>

                        {salePrice > 0 && salePrice < product.price && (
                            <div className="pb-1 text-sm text-muted-foreground line-through">
                                {formatVND(product.price)}
                            </div>
                        )}

                        {discount > 0 && (
                            <Badge className="bg-orange-500 hover:bg-orange-500">-{discount}%</Badge>
                        )}
                    </div>

                    {salePrice > 0 && salePrice < product.price && (
                        <div className="text-sm">
                            Tiết kiệm:{" "}
                            <span className="font-semibold">{formatVND(product.price - salePrice)}</span>
                        </div>
                    )}
                </div>

                {/* promo */}
                <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <div className="mb-2 font-semibold text-orange-700">THÔNG TIN THÊM</div>
                    <ul className="space-y-3 text-sm text-neutral-700">
                        {product.BookPromotions?.map((promo: any, index: number) => (
                            <li key={promo.id} className="flex gap-3">
                                <span className="flex w-6 h-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">{index + 1}</span>
                                <span className="flex-1">{promo.content}</span>
                            </li>
                        ))}

                    </ul>

                </div>

                <div className="mt-5 flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">Số lượng:</div>
                    <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                        <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="h-10 w-10 border-r text-lg hover:bg-neutral-50"
                        >
                            -
                        </button>
                        <div className="h-10 w-12 text-center leading-10 font-semibold">{qty}</div>
                        <button
                            onClick={() => setQty((q) => q + 1)}
                            className="h-10 w-10 border-l text-lg hover:bg-neutral-50"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="mt-5">
                    <Button
                        className="h-12 w-full rounded-xl bg-orange-500 text-base font-semibold hover:bg-orange-600"
                        disabled={isPending}
                        onClick={() => handleAddToCart()}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {isPending ? "Đang thêm..." : "CHỌN MUA"}
                    </Button>

                    <div className="mt-3 rounded-xl border bg-neutral-50 p-3 text-center text-sm">
                        <div className="text-muted-foreground">
                            GỌI ĐẶT MUA:{" "}
                            <span className="font-semibold text-orange-600">0932329959</span>
                        </div>
                        <div className="text-xs text-muted-foreground">(thứ 2 đến thứ 7 | 8:00 - 17:00)</div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            100% sách bản quyền
                        </div>
                        <div className="flex items-center gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Đổi trả miễn phí*
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductInfo