import { COLORS } from '@/components/Dashboard/Revenue/logic/COLORS'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BookTopType } from '@/types/Book'
import { formatVND } from '@/utils/formatVND'

const TopProducts = ({ topProducts }: { topProducts: BookTopType[] }) => {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle>Top sách bán chạy</CardTitle>
                <CardDescription>Theo doanh thu toàn thời gian</CardDescription>
            </CardHeader>
            <CardContent>
                {topProducts.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-8">
                        Không có dữ liệu
                    </p>
                ) : (
                    <div className="space-y-3">
                        {topProducts.map((product, i) => (
                            <div key={product.bookId} className="flex items-center gap-3">
                                <div
                                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                >
                                    {i + 1}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{product.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {product.quantity} cuốn đã bán
                                    </p>
                                </div>
                                <Badge variant="outline" className="shrink-0 font-mono text-xs">
                                    {formatVND(product.revenue)}
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TopProducts