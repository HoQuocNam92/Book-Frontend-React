import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export interface ServiceFormData {
    Id?: number;
    ServiceName: string;
    Description?: string | null;
    IconUrl?: string | null;
    LinkUrl?: string | null;
    DisplayOrder?: number | null;
}

interface ServiceFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: FormData) => void;
    initialData?: ServiceFormData | null;
    loading?: boolean;
}

const ServiceForm = ({ open, setOpen, onSubmit, initialData, loading }: ServiceFormProps) => {
    const [serviceName, setServiceName] = useState("");
    const [description, setDescription] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [displayOrder, setDisplayOrder] = useState(0);
    const [iconPreview, setIconPreview] = useState("");
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setServiceName(initialData.ServiceName || "");
            setDescription(initialData.Description || "");
            setLinkUrl(initialData.LinkUrl || "");
            setDisplayOrder(initialData.DisplayOrder ?? 0);
            setIconPreview(initialData.IconUrl || "");
        } else {
            setServiceName("");
            setDescription("");
            setLinkUrl("");
            setDisplayOrder(0);
            setIconPreview("");
        }
        setIconFile(null);
        setErrors({});
    }, [initialData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!serviceName.trim()) {
            newErrors.ServiceName = "Tên dịch vụ không được để trống";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();
        formData.append("ServiceName", serviceName.trim());
        formData.append("Description", description.trim());
        formData.append("LinkUrl", linkUrl.trim());
        formData.append("DisplayOrder", String(displayOrder));
        if (iconFile) {
            formData.append("icon", iconFile);
        }
        onSubmit(formData);
    };

    const isEdit = !!initialData?.Id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Chỉnh sửa Dịch vụ" : "Thêm Dịch vụ mới"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Cập nhật thông tin dịch vụ." : "Nhập thông tin để tạo dịch vụ mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="service-name">
                            Tên dịch vụ <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="service-name"
                            placeholder="VD: Tư vấn chọn sách"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                        {errors.ServiceName && <p className="text-xs text-destructive">{errors.ServiceName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service-description">Mô tả</Label>
                        <Textarea
                            id="service-description"
                            placeholder="Mô tả ngắn về dịch vụ..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="service-icon">Icon / Hình ảnh</Label>
                        <Input
                            id="service-icon"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setIconFile(file);
                                    setIconPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {iconPreview && (
                            <img src={iconPreview} alt="Preview" className="h-24 w-full rounded-xl object-cover border" />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-link">URL liên kết</Label>
                            <Input
                                id="service-link"
                                placeholder="https://..."
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-order">Thứ tự hiển thị</Label>
                            <Input
                                id="service-order"
                                type="number"
                                value={displayOrder}
                                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                            Hủy bỏ
                        </Button>
                        <Button type="submit" className="gap-2 cursor-pointer hover:bg-amber-400" disabled={loading}>
                            <Save className="h-4 w-4" />
                            {isEdit ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceForm;
