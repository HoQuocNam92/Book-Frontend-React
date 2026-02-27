import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Tag } from "lucide-react";
import { useBrands } from "@/hooks/useBrands";
import BrandListDashboard from "./BrandListDashboard";
import BrandForm from "./BrandForm";
import type { BrandFormData } from "./BrandForm";
import BrandDeleteDialog from "./BrandDeleteDialog";
import Pagination from "@/components/common/Pagination";

export default function BrandsDashboard() {
    const { getBrands, createBrand, updateBrand, deleteBrand, page, setPage } = useBrands();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<BrandFormData | null>(
        null
    );
    const [deletingBrandId, setDeletingBrandId] = useState<number | null>(null);

    const handleCreate = () => {
        setEditingBrand(null);
        setFormOpen(true);
    };

    const handleEdit = (brand: any) => {
        setEditingBrand(brand);
        setFormOpen(true);
    };

    const handleDelete = (brand: any) => {
        setDeletingBrandId(brand.id);
        setDeleteOpen(true);
    };

    const handleFormSubmit = (formData: FormData) => {
        if (editingBrand?.id) {
            updateBrand.mutate(
                { id: editingBrand.id, data: formData },
                {
                    onSuccess: () => setFormOpen(false),
                }
            );
        } else {
            createBrand.mutate(formData, {
                onSuccess: () => setFormOpen(false),
            });
        }
    };

    const handleConfirmDelete = () => {
        if (deletingBrandId !== null) {
            deleteBrand.mutate(deletingBrandId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingBrandId(null);
                },
            });
        }
    };
    const brands = getBrands.data?.brands || [];
    const totalPages = getBrands.data?.totalPages || 1;
    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <Tag className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Thương hiệu
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý các thương hiệu sách: thêm, sửa, xoá.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => getBrands.refetch()}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm thương hiệu
                    </Button>
                </div>
            </div>

            {/* List */}
            <BrandListDashboard
                brands={brands}
                loading={getBrands.isLoading}
                error={getBrands.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <BrandForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingBrand}
                loading={
                    createBrand.isPending || updateBrand.isPending
                }
            />

            {/* Delete Dialog */}
            <BrandDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteBrand.isPending}
            />
            <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
            />
        </div>
    );
}
