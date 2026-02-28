import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, Pencil, Trash2 } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { formatVND } from "@/utils/formatVND";

interface Order {
    id: number;
    total: number;
    status: string;
    created_at: string;
    Users?: {
        id?: number;
        name?: string;
        email?: string;
    };
    OrderItems?: any[];
}

interface OrderListDashboardProps {
    orders: Order[];
    loading: boolean;
    error: any;
    onUpdateStatus: (order: Order) => void;
    onDelete: (order: Order) => void;
}

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    pending: { label: "Chờ xử lý", variant: "outline" },
    paid: { label: "Đã thanh toán", variant: "default" },
    shipping: { label: "Đang giao", variant: "secondary" },
    completed: { label: "Hoàn tất", variant: "default" },
    cancelled: { label: "Đã hủy", variant: "destructive" },
};

const OrderListDashboard = ({
    orders,
    loading,
    error,
    onUpdateStatus,
    onDelete,
}: OrderListDashboardProps) => {
    if (loading) {
        return <SpinnerCustom />;
    }
    if (error) {
        return (
            <div className="text-destructive">
                Có lỗi xảy ra khi tải dữ liệu
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status: string) => {
        const s = statusMap[status?.toLowerCase()] || {
            label: status,
            variant: "outline" as const,
        };
        return (
            <Badge variant={s.variant} className="rounded-xl">
                {s.label}
            </Badge>
        );
    };

    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Danh sách đơn hàng
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">ID</TableHead>
                                <TableHead className="min-w-[160px]">
                                    Khách hàng
                                </TableHead>
                                <TableHead className="min-w-[80px]">
                                    Số SP
                                </TableHead>
                                <TableHead className="min-w-[140px]">
                                    Tổng tiền
                                </TableHead>
                                <TableHead className="min-w-[130px]">
                                    Trạng thái
                                </TableHead>
                                <TableHead className="min-w-[150px]">
                                    Ngày tạo
                                </TableHead>
                                <TableHead className="w-[84px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!orders || orders.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Chưa có đơn hàng nào
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((o) => (
                                    <TableRow
                                        key={o.id}
                                        className="align-middle"
                                    >
                                        <TableCell>
                                            <div className="text-xs text-muted-foreground">
                                                #{o.id}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">
                                                {o.Users?.name || "N/A"}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {o.Users?.email || ""}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm">
                                                {o.OrderItems?.length || 0}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">
                                                {formatVND(o.total)}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {getStatusBadge(o.status)}
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {formatDate(o.created_at)}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-xl"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-48"
                                                >
                                                    <DropdownMenuLabel>
                                                        Thao tác
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() =>
                                                            onUpdateStatus(o)
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        Cập nhật trạng thái
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive focus:text-destructive"
                                                        onClick={() =>
                                                            onDelete(o)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Xóa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderListDashboard;
