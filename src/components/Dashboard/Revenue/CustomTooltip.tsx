import { formatVND } from "@/utils/formatVND";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border bg-background p-3 shadow-lg text-sm space-y-1">
            <p className="font-semibold">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} style={{ color: p.color }}>
                    {p.name === "revenue" ? "Doanh thu: " : "Đơn hàng: "}
                    <span className="font-medium">
                        {p.name === "revenue" ? formatVND(Number(p.value)) : p.value}
                    </span>
                </p>
            ))}
        </div>
    );
};

export default CustomTooltip