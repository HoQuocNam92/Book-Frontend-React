import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Image as ImageIcon } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";
import BannerListDashboard from "./BannerListDashboard";
import BannerForm from "./BannerForm";
import type { BannerFormData } from "./BannerForm";
import BannerDeleteDialog from "./BannerDeleteDialog";

export default function BannersDashboard() {
    const { getBanners, createBanner, updateBanner, deleteBanner } = useBanners();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<BannerFormData | null>(null);
    const [deletingBannerId, setDeletingBannerId] = useState<number | null>(null);

    const handleCreate = () => {
        setEditingBanner(null);
        setFormOpen(true);
    };

    const handleEdit = (banner: any) => {
        setEditingBanner(banner);
        setFormOpen(true);
    };

    const handleDelete = (banner: any) => {
        setDeletingBannerId(banner.id);
        setDeleteOpen(true);
    };

    const handleFormSubmit = (formData: FormData) => {
        if (editingBanner?.id) {
            updateBanner.mutate(
                { id: editingBanner.id, data: formData },
                { onSuccess: () => setFormOpen(false) }
            );
        } else {
            createBanner.mutate(formData, { onSuccess: () => setFormOpen(false) });
        }
    };

    const handleConfirmDelete = () => {
        if (deletingBannerId !== null) {
            deleteBanner.mutate(deletingBannerId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingBannerId(null);
                },
            });
        }
    };

    // The API returns { banners, totalPages } or flat array depending on endpoint
    const rawData = getBanners.data;
    const banners = rawData?.banners ?? (Array.isArray(rawData) ? rawData : []);

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <ImageIcon className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">Banners</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý các banner hiển thị trên trang chủ: thêm, sửa, xoá.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => getBanners.refetch()}>
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm banner
                    </Button>
                </div>
            </div>

            {/* List */}
            <BannerListDashboard
                banners={banners}
                loading={getBanners.isLoading}
                error={getBanners.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <BannerForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingBanner}
                loading={createBanner.isPending || updateBanner.isPending}
            />

            {/* Delete Dialog */}
            <BannerDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteBanner.isPending}
            />
        </div>
    );
}
