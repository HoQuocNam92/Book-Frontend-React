import { Badge } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, { label: string; variant: any }> = {
        PAID: { label: "Đã thanh toán", variant: "default" },
        SHIPPING: { label: "Đang giao", variant: "secondary" },
        PENDING: { label: "Chờ xử lý", variant: "outline" },
        CANCELLED: { label: "Đã hủy", variant: "destructive" },
    };
    const s = map[status] ?? { label: status, variant: "outline" };
    return <Badge variant={s.variant}>{s.label}</Badge>;
}

export default StatusBadge