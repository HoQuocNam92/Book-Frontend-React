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

export interface CategoryFormData {
    id?: number;
    name: string;
    parent_id?: number | null;
}

interface Category {
    id: number;
    name: string;
    slug?: string;
    parent_id?: number | null;
}

interface CategoryFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: { name: string; parent_id?: number | null }) => void;
    initialData?: CategoryFormData | null;
    categories: Category[];
    loading?: boolean;
}

const CategoryForm = ({
    open,
    setOpen,
    onSubmit,
    initialData,
    categories,
    loading,
}: CategoryFormProps) => {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<string>("none");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setParentId(
                initialData.parent_id
                    ? String(initialData.parent_id)
                    : "none"
            );
        } else {
            setName("");
            setParentId("none");
        }
    }, [initialData, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({
            name: name.trim(),
            parent_id: parentId === "none" ? null : Number(parentId),
        });
    };

    const isEdit = !!initialData?.id;

    // Filter out current category from parent options to prevent circular reference
    const parentOptions = categories.filter(
        (c) => c.id !== initialData?.id
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Cập nhật thông tin danh mục."
                            : "Nhập thông tin để tạo danh mục mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="category-name">
                            Tên danh mục{" "}
                            <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="category-name"
                            placeholder="Nhập tên danh mục..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Danh mục cha</Label>
                        <Select value={parentId} onValueChange={setParentId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn danh mục cha..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">
                                    — Không có —
                                </SelectItem>
                                {parentOptions.map((c) => (
                                    <SelectItem
                                        key={c.id}
                                        value={String(c.id)}
                                    >
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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

export default CategoryForm;
