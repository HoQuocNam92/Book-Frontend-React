import { Progress } from "@/components/ui/progress";

const MiniMetric = ({
    title,
    value,
    progress,
}: {
    title: string;
    value: string;
    progress: number;
}) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-sm text-muted-foreground">{value}</div>
            </div>
            <Progress value={progress} />
        </div>
    );
}


export default MiniMetric