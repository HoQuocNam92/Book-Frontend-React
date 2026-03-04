import React from 'react'
import { Card, CardContent } from '@/components/ui/card';

const KPICard = ({ kpiCards, stats, year, topProducts }: { kpiCards: (stats: any, year: number, topProducts: any[]) => any[], stats: any, year: number, topProducts: any[] }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpiCards(stats, year, topProducts).map((k) => (
                <Card key={k.title} className="rounded-2xl">
                    <CardContent className="pt-5">
                        <div className="flex items-center gap-3">
                            <div className={`grid h-10 w-10 place-items-center rounded-2xl ${k.bg}`}>
                                <k.icon className={`h-5 w-5 ${k.color}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground truncate">{k.title}</p>
                                <p className="text-lg font-bold leading-tight truncate">{k.value}</p>
                                <p className="text-xs text-muted-foreground truncate">{k.desc}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default KPICard