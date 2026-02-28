import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Ticket } from "lucide-react";
import { useCoupons } from "@/hooks/useCoupons";
import CouponListDashboard from "./CouponListDashboard";
import CouponForm from "./CouponForm";
import type { CouponFormData } from "./CouponForm";
import CouponDeleteDialog from "./CouponDeleteDialog";

export default function CouponsDashboard() {
    const { getCoupons, createCoupon, updateCoupon, deleteCoupon } = useCoupons();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<CouponFormData | null>(null);
    const [deletingCouponId, setDeletingCouponId] = useState<number | null>(null);

    const handleCreate = () => {
        setEditingCoupon(null);
        setFormOpen(true);
    };

    const handleEdit = (coupon: any) => {
        setEditingCoupon(coupon);
        setFormOpen(true);
    };

    const handleDelete = (coupon: any) => {
        setDeletingCouponId(coupon.id);
        setDeleteOpen(true);
    };

    const handleFormSubmit = (data: { code: string; discount: number; expired_at: string }) => {
        if (editingCoupon?.id) {
            updateCoupon.mutate(
                { id: editingCoupon.id, data },
                { onSuccess: () => setFormOpen(false) }
            );
        } else {
            createCoupon.mutate(data, { onSuccess: () => setFormOpen(false) });
        }
    };

    const handleConfirmDelete = () => {
        if (deletingCouponId !== null) {
            deleteCoupon.mutate(deletingCouponId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingCouponId(null);
                },
            });
        }
    };

    const rawData = getCoupons.data;
    const coupons = rawData?.data ?? (Array.isArray(rawData) ? rawData : []);

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <Ticket className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">Mã giảm giá</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý các mã coupon: thêm, sửa, xoá và theo dõi hạn sử dụng.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => getCoupons.refetch()}>
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm mã giảm giá
                    </Button>
                </div>
            </div>

            {/* List */}
            <CouponListDashboard
                coupons={coupons}
                loading={getCoupons.isLoading}
                error={getCoupons.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <CouponForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingCoupon}
                loading={createCoupon.isPending || updateCoupon.isPending}
            />

            {/* Delete Dialog */}
            <CouponDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteCoupon.isPending}
            />
        </div>
    );
}
