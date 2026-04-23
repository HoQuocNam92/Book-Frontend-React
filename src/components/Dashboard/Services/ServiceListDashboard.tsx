import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Briefcase, Plus } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import type { ServiceFormData } from "./ServiceForm";

interface ServiceListProps {
    services: ServiceFormData[];
    loading: boolean;
    error: unknown;
    onEdit: (service: ServiceFormData) => void;
    onDelete: (service: ServiceFormData) => void;
    onCreate: () => void;
}

const ServiceListDashboard = ({ services, loading, error, onEdit, onDelete, onCreate }: ServiceListProps) => {
    if (loading) return <SpinnerCustom />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
                <p className="text-sm text-destructive">Không thể tải dữ liệu dịch vụ.</p>
            </div>
        );
    }

    if (!services || services.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border bg-muted">
                    <Briefcase className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Chưa có dịch vụ nào</p>
                    <p className="text-sm text-muted-foreground">Thêm dịch vụ đầu tiên để bắt đầu.</p>
                </div>
                <Button className="gap-2" onClick={onCreate}>
                    <Plus className="h-4 w-4" />
                    Thêm dịch vụ
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">#</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Tên dịch vụ</TableHead>
                        <TableHead className="hidden md:table-cell">Mô tả</TableHead>
                        <TableHead className="hidden md:table-cell">Thứ tự</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => (
                        <TableRow key={service.Id}>
                            <TableCell className="font-mono text-muted-foreground">{service.Id}</TableCell>
                            <TableCell>
                                {service.IconUrl ? (
                                    <img
                                        src={service.IconUrl}
                                        alt={service.ServiceName}
                                        className="h-12 w-12 rounded-lg object-cover border"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{service.ServiceName}</TableCell>
                            <TableCell className="hidden md:table-cell max-w-[250px] truncate text-sm text-muted-foreground">
                                {service.Description || "—"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {service.DisplayOrder ?? 0}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(service)}
                                        className="h-8 w-8"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(service)}
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
    );
};

export default ServiceListDashboard;
