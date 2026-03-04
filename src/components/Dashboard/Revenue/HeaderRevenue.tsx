import { Button } from '@/components/ui/button'
import { RefreshCw, TrendingUp } from 'lucide-react'
import type { RevenuePeriod } from '@/hooks/useRevenues'

const MONTHS = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
]

const PERIODS: { label: string; value: RevenuePeriod }[] = [
    { label: 'Tuần', value: 'week' },
    { label: 'Tháng', value: 'month' },
    { label: 'Năm', value: 'year' },
]

interface HeaderRevenueProps {
    handleRefresh: () => void
    year: number
    setYear: (year: number) => void
    period: RevenuePeriod
    setPeriod: (p: RevenuePeriod) => void
    month: number
    setMonth: (m: number) => void
    week: number
    setWeek: (w: number) => void
}

const HeaderRevenue = ({
    handleRefresh,
    year,
    setYear,
    period,
    setPeriod,
    month,
    setMonth,
    week,
    setWeek,
}: HeaderRevenueProps) => {

    const totalWeeksInYear = 52

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                        <TrendingUp className="h-4.5 w-4.5 text-green-600" />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight">Doanh thu</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Số liệu doanh thu theo {period === 'week' ? 'ngày trong tuần' : period === 'month' ? 'tuần trong tháng' : 'tháng trong năm'}.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">

                {/* Period tabs: Tuần / Tháng / Năm */}
                <div className="flex items-center gap-1 rounded-xl border bg-background p-1">
                    {PERIODS.map((p) => (
                        <button
                            key={p.value}
                            onClick={() => setPeriod(p.value)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${period === p.value
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted text-muted-foreground'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Week picker — chỉ hiện khi period = week */}
                {period === 'week' && (
                    <select
                        value={week}
                        onChange={(e) => setWeek(Number(e.target.value))}
                        className="rounded-xl border bg-background px-3 py-1.5 text-sm font-medium focus:outline-none"
                    >
                        {Array.from({ length: totalWeeksInYear }, (_, i) => i + 1).map((w) => (
                            <option key={w} value={w}>
                                Tuần {w}
                            </option>
                        ))}
                    </select>
                )}

                {/* Month picker — chỉ hiện khi period = month */}
                {period === 'month' && (
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="rounded-xl border bg-background px-3 py-1.5 text-sm font-medium focus:outline-none"
                    >
                        {MONTHS.map((m, i) => (
                            <option key={i + 1} value={i + 1}>
                                {m}
                            </option>
                        ))}
                    </select>
                )}

                {/* Year navigator */}
                <div className="flex items-center gap-1 rounded-xl border bg-background p-1">
                    <button
                        onClick={() => setYear(year - 1)}
                        className="rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                        aria-label="Năm trước"
                    >
                        ‹
                    </button>
                    <span className="rounded-lg px-3 py-1.5 text-sm font-semibold bg-primary text-primary-foreground select-none">
                        {year}
                    </span>
                    <button
                        onClick={() => setYear(year + 1)}
                        className="rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                        aria-label="Năm sau"
                    >
                        ›
                    </button>
                </div>

                <Button variant="outline" size="icon" onClick={handleRefresh} className="h-9 w-9">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default HeaderRevenue