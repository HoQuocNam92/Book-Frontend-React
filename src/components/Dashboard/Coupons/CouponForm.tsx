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
import { Save } from "lucide-react";

export interface CouponFormData {
    id?: number;
    code?: string;
    discount?: number;
    expired_at?: string;
}

interface CouponFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: { code: string; discount: number; expired_at: string }) => void;
    initialData?: CouponFormData | null;
    loading?: boolean;
}

const CouponForm = ({ open, setOpen, onSubmit, initialData, loading }: CouponFormProps) => {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setCode(initialData.code || "");
            setDiscount(initialData.discount !== undefined ? String(initialData.discount) : "");
            // Format date for input[type=date]: YYYY-MM-DD
            setExpiredAt(
                initialData.expired_at
                    ? new Date(initialData.expired_at).toISOString().split("T")[0]
                    : ""
            );
        } else {
            setCode("");
            setDiscount("");
            setExpiredAt("");
        }
        setErrors({});
    }, [initialData, open]);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!code.trim()) errs.code = "Mã giảm giá là bắt buộc";
        else if (code.trim().length < 3) errs.code = "Mã phải có ít nhất 3 ký tự";
        else if (code.trim().length > 50) errs.code = "Mã tối đa 50 ký tự";

        const discountNum = parseFloat(discount);
        if (!discount) errs.discount = "Phần trăm giảm giá là bắt buộc";
        else if (isNaN(discountNum)) errs.discount = "Phải là số";
        else if (discountNum < 1 || discountNum > 100) errs.discount = "Giảm giá phải từ 1% đến 100%";

        if (!expiredAt) errs.expired_at = "Ngày hết hạn là bắt buộc";
        else if (new Date(expiredAt) <= new Date()) errs.expired_at = "Ngày hết hạn phải ở tương lai";

        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        onSubmit({ code: code.trim().toUpperCase(), discount: parseFloat(discount), expired_at: expiredAt });
    };

    const isEdit = !!initialData?.id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá mới"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Cập nhật thông tin mã giảm giá." : "Nhập thông tin để tạo mã mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="coupon-code">
                            Mã giảm giá <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="coupon-code"
                            placeholder="VD: SUMMER20"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="font-mono uppercase"
                        />
                        {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coupon-discount">
                            Phần trăm giảm giá (%) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="coupon-discount"
                            type="number"
                            min={1}
                            max={100}
                            placeholder="VD: 20"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        {errors.discount && <p className="text-xs text-destructive">{errors.discount}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coupon-expired">
                            Ngày hết hạn <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="coupon-expired"
                            type="date"
                            value={expiredAt}
                            onChange={(e) => setExpiredAt(e.target.value)}
                        />
                        {errors.expired_at && <p className="text-xs text-destructive">{errors.expired_at}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                            Hủy bỏ
                        </Button>
                        <Button type="submit" className="gap-2 cursor-pointer" disabled={loading}>
                            <Save className="h-4 w-4" />
                            {isEdit ? "Cập nhật" : "Tạo mới"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CouponForm;
