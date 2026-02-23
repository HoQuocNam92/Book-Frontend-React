import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'

const FormDeleteProduct = ({ deleteProduct, open, setOpen, selected }: { selected: Record<number, boolean>, open: boolean, setOpen: (open: boolean) => void, deleteProduct: any }) => {

    const onConfirmDelete = () => {
        console.log("Selected IDs for deletion:", selected)
        Object.keys(selected).map(x => deleteProduct(Number(x)))
        setOpen(false)

    }
    console.log("Selected books for deletion:", selected)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Delete book</DialogTitle>
                        <DialogDescription>
                            Bạn chắc chắn muốn xoá book này? Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>


                    <DialogFooter>
                        <Button className='cursor-pointer' variant="outline" onClick={() => setOpen(false)}>
                            Hủy bỏ
                        </Button>
                        <Button variant="destructive" onClick={onConfirmDelete} className="gap-2 cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default FormDeleteProduct