import type { Dispatch, SetStateAction } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, ShieldCheck, ShoppingCart, Tag } from 'lucide-react';
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
        <Card className="col-span-12 lg:col-span-4 rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
                {/* Title */}
                <h1 className="text-xl font-bold leading-snug text-neutral-900">{product.title}</h1>

                <Separator className="my-4" />

                {/* Price section */}
                <div className="space-y-1.5">
                    <div className="flex items-end gap-3 flex-wrap">
                        <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {formatVND(finalPrice)}
                        </div>

                        {salePrice > 0 && salePrice < product.price && (
                            <div className="pb-1 text-sm text-neutral-400 line-through">
                                {formatVND(product.price)}
                            </div>
                        )}

                        {discount > 0 && (
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {salePrice > 0 && salePrice < product.price && (
                        <div className="text-sm text-neutral-500">
                            Tiết kiệm:{" "}
                            <span className="font-semibold text-green-600">{formatVND(product.price - salePrice)}</span>
                        </div>
                    )}
                </div>

                {/* Promotions */}
                {product.BookPromotions?.length > 0 && (
                    <div className="mt-4 rounded-xl border-l-4 border-orange-400 bg-orange-50 px-4 py-3">
                        <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-orange-700">
                            <Tag className="h-4 w-4" />
                            THÔNG TIN THÊM
                        </div>
                        <ul className="space-y-2 text-sm text-neutral-700">
                            {product.BookPromotions.map((promo: any, index: number) => (
                                <li key={promo.id} className="flex gap-3">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 leading-relaxed">{promo.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-4">
                    <div className="text-sm font-medium text-neutral-600">Số lượng:</div>
                    <div className="flex items-center overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="h-10 w-10 border-r border-neutral-200 text-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
                        >
                            −
                        </button>
                        <div className="h-10 w-12 text-center leading-10 text-sm font-semibold">{qty}</div>
                        <button
                            onClick={() => setQty((q) => q + 1)}
                            className="h-10 w-10 border-l border-neutral-200 text-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-5 space-y-3">
                    <Button
                        className="h-12 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-base font-semibold text-white shadow-md hover:from-orange-600 hover:to-amber-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                        disabled={isPending}
                        onClick={() => handleAddToCart()}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {isPending ? "Đang thêm..." : "CHỌN MUA"}
                    </Button>

                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-3 text-center text-sm">
                        <div className="text-neutral-500">
                            GỌI ĐẶT MUA:{" "}
                            <a href="tel:0932329959" className="font-semibold text-orange-500 hover:underline">
                                0932 329 959
                            </a>
                        </div>
                        <div className="mt-0.5 text-xs text-neutral-400">(Thứ 2 – Thứ 7 | 8:00 – 17:00)</div>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>100% sách bản quyền</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <RotateCcw className="h-4 w-4 text-blue-500" />
                        <span>Đổi trả miễn phí*</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductInfo