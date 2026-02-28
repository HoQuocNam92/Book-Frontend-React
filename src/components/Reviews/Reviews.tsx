import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const Reviews = ({ product }: { product: any }) => {
    return (
        <div>
            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">ĐÁNH GIÁ CỦA ĐỘC GIẢ</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                    {product.Reviews && product.Reviews.length > 0 ? (
                        <div className="space-y-4">
                            {product.Reviews.map((r: any) => (
                                <div key={r.id} className="rounded-xl border p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="font-medium text-sm">{r.Users?.name || "Ẩn danh"}</div>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} filled={i < (r.rating || 0)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">{r.comment}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
                        </p>
                    )}

                    <Separator className="my-6" />
                    <div>
                        <div className="text-sm font-semibold">GỬI ĐÁNH GIÁ CỦA BẠN</div>
                        <div className="mt-3 rounded-xl border bg-white p-4">
                            <textarea
                                placeholder="Viết bình luận của bạn tại đây."
                                className="min-h-[140px] w-full resize-none rounded-lg border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-orange-500"
                            />
                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-sm font-medium">Đánh giá</div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} filled />
                                        ))}
                                    </div>
                                </div>
                                <Button className="h-10 rounded-xl bg-orange-500 px-8 hover:bg-orange-600">GỬI</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Reviews


function Star({ filled }: { filled?: boolean }) {
    return (
        <span className={cn("text-lg", filled ? "text-yellow-400" : "text-neutral-300")}>
            ★
        </span>
    )
}
