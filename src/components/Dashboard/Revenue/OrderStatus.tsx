import { COLORS } from '@/components/Dashboard/Revenue/logic/COLORS';
import { STATUS_LABELS } from '@/components/Dashboard/Revenue/logic/STATUS_LABELS';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OrderStatus = ({ statusEntries, totalOrders, year }: { statusEntries: [string, number][], totalOrders: number, year: number }) => {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle>Phân bổ đơn hàng</CardTitle>
                <CardDescription>Theo trạng thái trong năm {year}</CardDescription>
            </CardHeader>
            <CardContent>
                {statusEntries.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-8">
                        Không có dữ liệu
                    </p>
                ) : (
                    <div className="space-y-3">
                        {statusEntries.map(([status, count], i) => {
                            const info = STATUS_LABELS[status] || { label: status, className: "bg-gray-100 text-gray-700" };
                            const pct = totalOrders > 0
                                ? Math.round((count / totalOrders) * 100)
                                : 0;
                            return (
                                <div key={status} className="flex items-center gap-3">
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${info.className}`}>
                                        {info.label}
                                        {` (${pct}%)`}
                                    </span>
                                    <div className="flex-1 rounded-full bg-muted h-2">
                                        <div
                                            className="h-2 rounded-full transition-all"
                                            style={{
                                                width: `${pct}%`,
                                                backgroundColor: COLORS[i % COLORS.length],
                                            }}
                                        />

                                    </div>
                                    <span className="w-12 text-right text-sm font-medium">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card >
    )
}

export default OrderStatus