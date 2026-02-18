import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KpiCard = ({
    title,
    value,
    delta,
    hint,
    icon: Icon,
}: {
    title: string;
    value: string;
    delta: string;
    hint: string;
    icon: any;
}) => {
    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardDescription>{title}</CardDescription>
                        <CardTitle className="text-2xl">{value}</CardTitle>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted">
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <Badge variant="secondary" className="rounded-xl">
                    {delta}
                </Badge>
                <div className="text-xs text-muted-foreground">{hint}</div>
            </CardContent>
        </Card>
    );
}
export default KpiCard