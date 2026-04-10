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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { BannerInputSchema } from "@/schema/banner.schema";

export interface BannerFormData {
    id?: number;
    image_url?: string;
    link_url?: string;
    type?: string;
}

interface BannerFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: FormData) => void;
    initialData?: BannerFormData | null;
    loading?: boolean;
}

const BANNER_TYPES = [
    { value: "sales", label: "Khuyến mãi" },
    { value: "featured", label: "Nổi bật" },
    { value: "new", label: "Sách mới" },
];

const BannerForm = ({ open, setOpen, onSubmit, initialData, loading }: BannerFormProps) => {
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [linkUrl, setLinkUrl] = useState("");
    const [type, setType] = useState("sales");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setImageUrl(initialData.image_url || "");
            setLinkUrl(initialData.link_url || "");
            setType(initialData.type || "sales");
        } else {
            setImageUrl("");
            setLinkUrl("");
            setType("sales");
        }
        setErrors({});
    }, [initialData, open]);



    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        const result = BannerInputSchema.safeParse({ image_url: imageUrl, link_url: linkUrl, type });
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }
        const formData = new FormData();
        if (imageFile) {
            formData.append("image", imageFile);
        }
        formData.append("link_url", linkUrl.trim());
        formData.append("type", type);
        onSubmit(formData);
    };
    console.log("Check newErrors: ", errors);
    const isEdit = !!initialData?.id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Chỉnh sửa Banner" : "Thêm Banner mới"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Cập nhật thông tin banner." : "Nhập thông tin để tạo banner mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="banner-image-url">
                            Hình ảnh <span className="text-destructive">*</span>
                        </Label>
                        <Input type="file" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setImageUrl(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                            setImageFile(file || null);
                        }} />
                        <img src={imageUrl || ""} alt="Preview" className="h-24 w-full rounded-xl object-cover border" />
                        {errors.image_url && <p className="text-xs text-destructive">{errors.image_url}</p>}
                        {imageUrl && /^https?:\/\/.+/.test(imageUrl) && (
                            <img src={imageUrl} alt="Preview" className="h-24 w-full rounded-xl object-cover border" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner-link-url">URL liên kết</Label>
                        <Input
                            id="banner-link-url"
                            placeholder="https://example.com/promo"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                        />
                        {errors.link_url && <p className="text-xs text-destructive">{errors.link_url}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Loại banner</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn loại banner" />
                            </SelectTrigger>
                            <SelectContent>
                                {BANNER_TYPES.map((t) => (
                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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

export default BannerForm;
