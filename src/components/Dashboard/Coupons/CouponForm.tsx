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
import type { CouponPayload } from "@/services/coupon.services";

export interface CouponFormData {
    id?: number;
    code?: string;
    discount?: number;
    discount_type?: 'percent' | 'fixed';
    expired_at?: string;
    start_at?: string;
    min_order_value?: number;
    max_discount?: number;
    usage_limit?: number;
    usage_count?: number;
}

interface CouponFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: CouponPayload) => void;
    initialData?: CouponFormData | null;
    loading?: boolean;
}

const formatDateInput = (date?: string) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

const CouponForm = ({ open, setOpen, onSubmit, initialData, loading }: CouponFormProps) => {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
    const [expiredAt, setExpiredAt] = useState("");
    const [startAt, setStartAt] = useState("");
    const [minOrderValue, setMinOrderValue] = useState("");
    const [maxDiscount, setMaxDiscount] = useState("");
    const [usageLimit, setUsageLimit] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setCode(initialData.code || "");
            setDiscount(initialData.discount !== undefined ? String(initialData.discount) : "");
            setDiscountType(initialData.discount_type ?? "percent");
            setExpiredAt(formatDateInput(initialData.expired_at));
            setStartAt(formatDateInput(initialData.start_at));
            setMinOrderValue(initialData.min_order_value !== undefined ? String(initialData.min_order_value) : "");
            setMaxDiscount(initialData.max_discount !== undefined ? String(initialData.max_discount) : "");
            setUsageLimit(initialData.usage_limit !== undefined ? String(initialData.usage_limit) : "");
        } else {
            setCode(""); setDiscount(""); setDiscountType("percent");
            setExpiredAt(""); setStartAt("");
            setMinOrderValue(""); setMaxDiscount(""); setUsageLimit("");
        }
        setErrors({});
    }, [initialData, open]);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!code.trim()) errs.code = "Mã giảm giá là bắt buộc";
        else if (code.trim().length < 3) errs.code = "Mã phải có ít nhất 3 ký tự";
        else if (code.trim().length > 50) errs.code = "Mã tối đa 50 ký tự";

        const discountNum = parseFloat(discount);
        if (!discount) errs.discount = "Giá trị giảm là bắt buộc";
        else if (isNaN(discountNum) || discountNum < 0) errs.discount = "Phải là số không âm";
        else if (discountType === "percent" && discountNum > 100) errs.discount = "Giảm % tối đa 100";

        if (!expiredAt) errs.expired_at = "Ngày hết hạn là bắt buộc";

        if (startAt && expiredAt && new Date(startAt) >= new Date(expiredAt))
            errs.start_at = "Ngày bắt đầu phải trước ngày hết hạn";

        if (minOrderValue && isNaN(Number(minOrderValue))) errs.min_order_value = "Phải là số";
        if (maxDiscount && isNaN(Number(maxDiscount))) errs.max_discount = "Phải là số";
        if (usageLimit && (isNaN(Number(usageLimit)) || Number(usageLimit) < 1))
            errs.usage_limit = "Giới hạn sử dụng tối thiểu là 1";

        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        const payload: CouponPayload = {
            code: code.trim().toUpperCase(),
            discount: parseFloat(discount),
            discount_type: discountType,
            expired_at: expiredAt,
            ...(startAt && { start_at: startAt }),
            ...(minOrderValue && { min_order_value: Number(minOrderValue) }),
            ...(maxDiscount && { max_discount: Number(maxDiscount) }),
            ...(usageLimit && { usage_limit: Number(usageLimit) }),
        };
        onSubmit(payload);
    };

    const isEdit = !!initialData?.id;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá mới"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Cập nhật thông tin mã giảm giá." : "Nhập thông tin để tạo mã mới."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Code + Type */}
                    <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="coupon-discount-type">Loại giảm giá</Label>
                            <select
                                id="coupon-discount-type"
                                value={discountType}
                                onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                                <option value="percent">Phần trăm (%)</option>
                                <option value="fixed">Số tiền cố định (VNĐ)</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Discount value + Usage limit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="coupon-discount">
                                Giá trị giảm {discountType === "percent" ? "(%)" : "(VNĐ)"} <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="coupon-discount"
                                type="number"
                                min={0}
                                max={discountType === "percent" ? 100 : undefined}
                                placeholder={discountType === "percent" ? "VD: 20" : "VD: 50000"}
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            {errors.discount && <p className="text-xs text-destructive">{errors.discount}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coupon-usage-limit">Giới hạn sử dụng</Label>
                            <Input
                                id="coupon-usage-limit"
                                type="number"
                                min={1}
                                placeholder="VD: 100 (bỏ trống = không giới hạn)"
                                value={usageLimit}
                                onChange={(e) => setUsageLimit(e.target.value)}
                            />
                            {errors.usage_limit && <p className="text-xs text-destructive">{errors.usage_limit}</p>}
                        </div>
                    </div>

                    {/* Row 3: Min order value + Max discount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="coupon-min-order">Giá trị đơn hàng tối thiểu (VNĐ)</Label>
                            <Input
                                id="coupon-min-order"
                                type="number"
                                min={0}
                                placeholder="VD: 200000 (bỏ trống = không giới hạn)"
                                value={minOrderValue}
                                onChange={(e) => setMinOrderValue(e.target.value)}
                            />
                            {errors.min_order_value && <p className="text-xs text-destructive">{errors.min_order_value}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coupon-max-discount">Giảm tối đa (VNĐ)</Label>
                            <Input
                                id="coupon-max-discount"
                                type="number"
                                min={0}
                                placeholder="VD: 50000 (bỏ trống = không giới hạn)"
                                value={maxDiscount}
                                onChange={(e) => setMaxDiscount(e.target.value)}
                            />
                            {errors.max_discount && <p className="text-xs text-destructive">{errors.max_discount}</p>}
                        </div>
                    </div>

                    {/* Row 4: Start date + Expire date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="coupon-start">Ngày bắt đầu</Label>
                            <Input
                                id="coupon-start"
                                type="date"
                                value={startAt}
                                onChange={(e) => setStartAt(e.target.value)}
                            />
                            {errors.start_at && <p className="text-xs text-destructive">{errors.start_at}</p>}
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
