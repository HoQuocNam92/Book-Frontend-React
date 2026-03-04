import CustomTooltip from '@/components/Dashboard/Revenue/CustomTooltip'
import { COLORS } from '@/components/Dashboard/Revenue/logic/COLORS'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Bar, CartesianGrid, XAxis, YAxis, BarChart, Cell, ResponsiveContainer, Tooltip
} from "recharts";
import type { RevenuePeriod } from '@/hooks/useRevenues';
import { SpinnerCustom } from '@/components/ui/spinner';

interface ChartData {
    label?: string;
    day?: string;
    week?: number;
    revenue: number;
}

interface MonthlyRevenueChartProps {
    data: ChartData[];
    isLoading: boolean;
    period: RevenuePeriod;
    year: number;
    month: number;
    week: number;
}

const MONTH_NAMES = [
    '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

function getChartLabel(period: RevenuePeriod, year: number, month: number, week: number): string {
    if (period === 'week') return `Tuần ${week} — ${year}`;
    if (period === 'month') return `${MONTH_NAMES[month]} — ${year}`;
    return `Doanh thu theo tháng — ${year}`;
}

function getChartDescription(period: RevenuePeriod): string {
    if (period === 'week') return 'Doanh thu từng ngày trong tuần';
    if (period === 'month') return 'Doanh thu từng tuần trong tháng';
    return 'Tổng doanh thu và số đơn hàng mỗi tháng';
}



function getXLabel(item: ChartData, period: RevenuePeriod): string {
    if (period === 'week') return item.day ?? '';
    if (period === 'month') return `T${item.week}`;
    return item.label ?? '';
}

function normaliseData(data: ChartData[], period: RevenuePeriod) {
    return data.map((item) => ({
        ...item,
        _label: getXLabel(item, period),
    }));
}

const MonthlyRevenueChart = ({ data, isLoading, period, year, month, week }: MonthlyRevenueChartProps) => {
    const isEmpty = !data || data.every((m) => m.revenue === 0);
    const chartData = normaliseData(data ?? [], period);

    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle>{getChartLabel(period, year, month, week)}</CardTitle>
                <CardDescription>{getChartDescription(period)}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex h-48 items-center justify-center">
                        <SpinnerCustom />
                    </div>
                ) : isEmpty ? (
                    <div className="flex h-48 items-center justify-center text-center text-muted-foreground text-sm">
                        Không có dữ liệu doanh thu cho khoảng thời gian này.
                    </div>
                ) : (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="_label" tick={{ fontSize: 12 }} />
                                <YAxis
                                    tickFormatter={(v) =>
                                        v >= 1_000_000
                                            ? `${(v / 1_000_000).toFixed(0)}M`
                                            : v >= 1000
                                                ? `${(v / 1000).toFixed(0)}K`
                                                : String(v)
                                    }
                                    tick={{ fontSize: 11 }}
                                    width={52}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="revenue" name="revenue" radius={[6, 6, 0, 0]}>
                                    {chartData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default MonthlyRevenueChart