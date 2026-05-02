import { useState } from "react"
import { useNavigate } from "react-router"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import DashboardNavPanel from "@/components/Dashboard/DashboardNavPanel"

/** Nút menu + dialog — chỉ hiện dưới breakpoint md */
export default function DashboardMobileMenu() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const onNavigate = (path: string) => {
        navigate("/dashboard/" + path)
        setOpen(false)
    }

    return (
        <>
            <Button
                type="button"
                variant="default"
                size="icon"
                className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full shadow-lg md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Mở menu quản trị"
            >
                <Menu className="h-5 w-5" />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Menu quản trị</DialogTitle>
                    </DialogHeader>
                    <DashboardNavPanel onNavigate={onNavigate} />
                </DialogContent>
            </Dialog>
        </>
    )
}
