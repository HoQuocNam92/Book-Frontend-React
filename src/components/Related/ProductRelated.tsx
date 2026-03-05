import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatVND } from '@/utils/formatVND'
import { useNavigate } from 'react-router-dom'

const ProductRelated = ({ related }: { related: any[] }) => {
    const navigate = useNavigate()
    return (

        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sách cùng chủ đề</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {related.slice(0, 4).map((r: any) => {
                    const rImg =
                        r.BookImages && typeof r.BookImages === "string"
                            ? r.BookImages
                            : r.BookImages?.[0]?.url || ""
                    const rPrice = r.sale_price && r.sale_price > 0 ? r.sale_price : r.price
                    return (
                        <div
                            key={r.id}
                            className="flex gap-3 cursor-pointer rounded-xl border p-2 hover:bg-neutral-50"
                            onClick={() => navigate(`/${r.slug}`)}
                        >
                            <div className="h-14 w-12 overflow-hidden rounded-lg bg-white">
                                {rImg && (
                                    <img src={rImg} alt={r.title} className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="line-clamp-2 text-xs font-medium">{r.title}</div>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="text-sm font-bold text-orange-600">{formatVND(rPrice)}</div>
                                    {r.discount_percent > 0 && (
                                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                            -{r.discount_percent}%
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default ProductRelated