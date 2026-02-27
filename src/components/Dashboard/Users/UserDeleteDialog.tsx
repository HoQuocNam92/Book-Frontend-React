import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface UserDeleteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
    loading?: boolean;
}

const UserDeleteDialog = ({
    open,
    setOpen,
    onConfirm,
    loading,
}: UserDeleteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Xóa người dùng</DialogTitle>
                    <DialogDescription>
                        Bạn chắc chắn muốn xoá người dùng này? Hành động này
                        không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="gap-2 cursor-pointer"
                        disabled={loading}
                    >
                        <Trash2 className="h-4 w-4" />
                        Xóa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserDeleteDialog;
