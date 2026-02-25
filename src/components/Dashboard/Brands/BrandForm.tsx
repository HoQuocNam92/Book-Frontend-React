import { useEffect, useRef, useState } from "react";
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
import { ImagePlus, Save } from "lucide-react";

export interface BrandFormData {
    id?: number;
    name: string;
    description: string;
    logo_url?: string;
}

interface BrandFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: FormData) => void;
    initialData?: BrandFormData | null;
    loading?: boolean;
}

const BrandForm = ({
    open,
    setOpen,
    onSubmit,
    initialData,
    loading,
}: BrandFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
            setLogoPreview(initialData.logo_url || null);
            setLogoFile(null);
        } else {
            setName("");
            setDescription("");
            setLogoFile(null);
            setLogoPreview(null);
        }
    }, [initialData, open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("description", description.trim());
        if (logoFile) {
            formData.append("logo_url", logoFile);
        }
        onSubmit(formData);
    };

    const isEdit = !!initialData?.id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit
                            ? "Chỉnh sửa thương hiệu"
                            : "Thêm thương hiệu mới"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Cập nhật thông tin thương hiệu."
                            : "Nhập thông tin để tạo thương hiệu mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="brand-name">
                            Tên thương hiệu <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="brand-name"
                            placeholder="Nhập tên thương hiệu..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="brand-description">Mô tả</Label>
                        <Textarea
                            id="brand-description"
                            placeholder="Mô tả thương hiệu..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-4">
                            {logoPreview && (
                                <div className="h-16 w-16 overflow-hidden rounded-xl border bg-muted">
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImagePlus className="h-4 w-4" />
                                {logoPreview ? "Đổi ảnh" : "Chọn ảnh"}
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="submit"
                            className="gap-2 cursor-pointer"
                            disabled={loading || !name.trim()}
                        >
                            <Save className="h-4 w-4" />
                            {isEdit ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BrandForm;
