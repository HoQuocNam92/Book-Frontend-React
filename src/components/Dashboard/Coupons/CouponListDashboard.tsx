import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Ticket, Plus } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { formatVND } from "@/utils/formatVND";

interface CouponListProps {
    coupons: any[];
    loading: boolean;
    error: any;
    onEdit: (coupon: any) => void;
    onDelete: (coupon: any) => void;
    onCreate: () => void;
}

const isExpired = (date: string) => new Date(date) < new Date();
const isNotStarted = (startAt?: string) => startAt && new Date(startAt) > new Date();

const CouponListDashboard = ({ coupons, loading, error, onEdit, onDelete, onCreate }: CouponListProps) => {
    if (loading) return <SpinnerCustom />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
                <p className="text-sm text-destructive">Không thể tải dữ liệu mã giảm giá.</p>
            </div>
        );
    }

    if (!coupons || coupons.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border bg-muted">
                    <Ticket className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Chưa có mã giảm giá nào</p>
                    <p className="text-sm text-muted-foreground">Thêm mã đầu tiên để bắt đầu.</p>
                </div>
                <Button className="gap-2" onClick={onCreate}>
                    <Plus className="h-4 w-4" />
                    Thêm mã giảm giá
                </Button>
            </div>
        );
    }

    const getStatusBadge = (coupon: any) => {
        if (coupon.expired_at && isExpired(coupon.expired_at))
            return <Badge variant="destructive">Hết hạn</Badge>;
        if (isNotStarted(coupon.start_at))
            return <Badge variant="secondary">Chưa bắt đầu</Badge>;
        if (coupon.usage_limit !== null && coupon.usage_limit !== undefined && coupon.usage_count >= coupon.usage_limit)
            return <Badge variant="destructive">Đã hết lượt</Badge>;
        return <Badge variant="default">Còn hiệu lực</Badge>;
    };

    const formatDiscount = (coupon: any) => {
        const val = Number(coupon.discount);
        if (coupon.discount_type === "fixed") return `-${formatVND(val)}`;
        return `-${val}%`;
    };

    return (
        <div className="rounded-2xl border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[120px]">Mã</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Giảm giá</TableHead>
                            <TableHead className="min-w-[120px]">Đơn tối thiểu</TableHead>
                            <TableHead className="min-w-[120px]">Giảm tối đa</TableHead>
                            <TableHead>Lượt dùng</TableHead>
                            <TableHead className="min-w-[100px]">Bắt đầu</TableHead>
                            <TableHead className="min-w-[100px]">Hết hạn</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coupons.map((coupon: any) => (
                            <TableRow key={coupon.id}>
                                <TableCell>
                                    <span className="font-mono font-semibold text-primary tracking-wider">
                                        {coupon.code}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-xs">
                                        {coupon.discount_type === "fixed" ? "Cố định" : "Phần trăm"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-green-600">
                                        {formatDiscount(coupon)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {coupon.min_order_value ? formatVND(coupon.min_order_value) : "—"}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {coupon.max_discount ? formatVND(coupon.max_discount) : "—"}
                                </TableCell>
                                <TableCell className="text-sm">
                                    <span className={
                                        coupon.usage_limit && coupon.usage_count >= coupon.usage_limit
                                            ? "text-destructive font-medium"
                                            : "text-muted-foreground"
                                    }>
                                        {coupon.usage_count ?? 0}
                                        {coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {coupon.start_at
                                        ? new Date(coupon.start_at).toLocaleDateString("vi-VN")
                                        : "—"}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {coupon.expired_at
                                        ? new Date(coupon.expired_at).toLocaleDateString("vi-VN")
                                        : "—"}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(coupon)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(coupon)}
                                            className="h-8 w-8"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(coupon)}
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CouponListDashboard;
