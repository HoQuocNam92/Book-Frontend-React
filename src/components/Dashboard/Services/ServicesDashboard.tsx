import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Briefcase } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import ServiceListDashboard from "./ServiceListDashboard";
import ServiceForm from "./ServiceForm";
import type { ServiceFormData } from "./ServiceForm";
import ServiceDeleteDialog from "./ServiceDeleteDialog";

export default function ServicesDashboard() {
    const { getServices, createService, updateService, deleteService } = useServices();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceFormData | null>(null);
    const [deletingServiceId, setDeletingServiceId] = useState<number | null>(null);

    const handleCreate = () => {
        setEditingService(null);
        setFormOpen(true);
    };

    const handleEdit = (service: ServiceFormData) => {
        setEditingService(service);
        setFormOpen(true);
    };

    const handleDelete = (service: ServiceFormData) => {
        setDeletingServiceId(service.Id!);
        setDeleteOpen(true);
    };

    const handleFormSubmit = (formData: FormData) => {
        if (editingService?.Id) {
            updateService.mutate(
                { id: editingService.Id, data: formData },
                { onSuccess: () => setFormOpen(false) }
            );
        } else {
            createService.mutate(formData, { onSuccess: () => setFormOpen(false) });
        }
    };

    const handleConfirmDelete = () => {
        if (deletingServiceId !== null) {
            deleteService.mutate(deletingServiceId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingServiceId(null);
                },
            });
        }
    };

    const services = getServices.data ?? [];

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <Briefcase className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">Dịch vụ</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý các dịch vụ hiển thị trên trang chủ: thêm, sửa, xoá.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => getServices.refetch()}>
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm dịch vụ
                    </Button>
                </div>
            </div>

            {/* List */}
            <ServiceListDashboard
                services={services}
                loading={getServices.isLoading}
                error={getServices.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <ServiceForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingService}
                loading={createService.isPending || updateService.isPending}
            />

            {/* Delete Dialog */}
            <ServiceDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteService.isPending}
            />
        </div>
    );
}
