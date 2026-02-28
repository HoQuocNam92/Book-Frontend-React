import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, RefreshCw } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import OrderListDashboard from "./OrderListDashboard";
import OrderDeleteDialog from "./OrderDeleteDialog";
import OrderStatusDialog from "./OrderStatusDialog";
import Pagination from "@/components/common/Pagination";

export default function OrdersDashboard() {
    const { getOrders, updateOrderStatus, deleteOrder, page, setPage } = useOrders();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
    const [editingOrder, setEditingOrder] = useState<any>(null);

    const orders = getOrders.data?.data || getOrders.data || [];
    const totalPages = getOrders.data?.totalPages || 1;

    const handleUpdateStatus = (order: any) => {
        setEditingOrder(order);
        setStatusOpen(true);
    };

    const handleDelete = (order: any) => {
        setDeletingOrderId(order.id);
        setDeleteOpen(true);
    };

    const handleConfirmStatusUpdate = (status: string) => {
        if (editingOrder) {
            updateOrderStatus.mutate(
                { id: editingOrder.id, status },
                {
                    onSuccess: () => {
                        setStatusOpen(false);
                        setEditingOrder(null);
                    },
                }
            );
        }
    };

    const handleConfirmDelete = () => {
        if (deletingOrderId !== null) {
            deleteOrder.mutate(deletingOrderId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingOrderId(null);
                },
            });
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <ClipboardList className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Đơn hàng
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý đơn hàng: xem, cập nhật trạng thái, xoá.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => getOrders.refetch()}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                </div>
            </div>

            <OrderListDashboard
                orders={orders}
                loading={getOrders.isLoading}
                error={getOrders.error}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
            />

            <OrderStatusDialog
                open={statusOpen}
                setOpen={setStatusOpen}
                currentStatus={editingOrder?.status || "pending"}
                onConfirm={handleConfirmStatusUpdate}
                loading={updateOrderStatus.isPending}
            />

            <OrderDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteOrder.isPending}
            />
            <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </div>
    );
}
