import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { useState, useEffect } from "react";

interface OrderStatusDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentStatus: string;
    onConfirm: (status: string) => void;
    loading?: boolean;
}

const statusOptions = [
    { value: "pending", label: "Chờ xử lý" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "shipping", label: "Đang giao" },
    { value: "completed", label: "Hoàn tất" },
    { value: "cancelled", label: "Đã hủy" },
];

const OrderStatusDialog = ({
    open,
    setOpen,
    currentStatus,
    onConfirm,
    loading,
}: OrderStatusDialogProps) => {
    const [status, setStatus] = useState(currentStatus);

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus, open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Cập nhật trạng thái</DialogTitle>
                    <DialogDescription>
                        Chọn trạng thái mới cho đơn hàng.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn trạng thái..." />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={() => onConfirm(status)}
                        className="gap-2 cursor-pointer"
                        disabled={loading}
                    >
                        <Save className="h-4 w-4" />
                        Cập nhật
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default OrderStatusDialog;
