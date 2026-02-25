import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderTree, Plus, RefreshCw } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import CategoryListDashboard from "./CategoryListDashboard";
import CategoryForm from "./CategoryForm";
import type { CategoryFormData } from "./CategoryForm";
import CategoryDeleteDialog from "./CategoryDeleteDialog";

export default function CategoriesDashboard() {
    const { getCategories, createCategory, updateCategory, deleteCategory } =
        useCategories();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingCategory, setEditingCategory] =
        useState<CategoryFormData | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
        null
    );

    const categories = getCategories.data?.data || getCategories.data || [];

    const handleCreate = () => {
        setEditingCategory(null);
        setFormOpen(true);
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setFormOpen(true);
    };

    const handleDelete = (category: any) => {
        setDeletingCategoryId(category.id);
        setDeleteOpen(true);
    };

    const handleFormSubmit = (data: {
        name: string;
        parent_id?: number | null;
    }) => {
        if (editingCategory?.id) {
            updateCategory.mutate(
                { id: editingCategory.id, data },
                {
                    onSuccess: () => setFormOpen(false),
                }
            );
        } else {
            createCategory.mutate(data, {
                onSuccess: () => setFormOpen(false),
            });
        }
    };

    const handleConfirmDelete = () => {
        if (deletingCategoryId !== null) {
            deleteCategory.mutate(deletingCategoryId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingCategoryId(null);
                },
            });
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <FolderTree className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Danh mục
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý danh mục sách: thêm, sửa, xoá, phân cấp.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => getCategories.refetch()}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm danh mục
                    </Button>
                </div>
            </div>

            {/* List */}
            <CategoryListDashboard
                categories={categories}
                loading={getCategories.isLoading}
                error={getCategories.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <CategoryForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingCategory}
                categories={categories}
                loading={
                    createCategory.isPending || updateCategory.isPending
                }
            />

            {/* Delete Dialog */}
            <CategoryDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteCategory.isPending}
            />
        </div>
    );
}
