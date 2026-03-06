import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NewsDeleteDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    onConfirm: () => void;
    loading: boolean;
}

const NewsDeleteDialog = ({ open, setOpen, onConfirm, loading }: NewsDeleteDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xoá bài viết</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xoá bài viết này không? Hành động này không thể hoàn tác.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Huỷ</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading ? "Đang xoá..." : "Xoá"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default NewsDeleteDialog;
