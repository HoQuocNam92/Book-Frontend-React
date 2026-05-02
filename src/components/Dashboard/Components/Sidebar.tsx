import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Boxes, LogOut, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useNavigate } from "react-router"
import DashboardNavPanel from "@/components/Dashboard/DashboardNavPanel"

const Sidebar = () => {
    const navigate = useNavigate()
    const onNavigate = (path: string) => {
        navigate("/dashboard/" + path)
    }

    const [lowStockOnly, setLowStockOnly] = useState(false)
    return (
        <aside className="hidden w-72 shrink-0 md:block">
            <Card className="sticky top-6 overflow-hidden rounded-2xl">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
                            <Boxes className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Admin Panel</CardTitle>
                            <CardDescription>React • Tailwind • shadcn</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-1">
                    <DashboardNavPanel onNavigate={onNavigate} />

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between rounded-xl px-3 py-2">
                        <div>
                            <div className="text-sm font-medium">Low stock mode</div>
                            <div className="text-xs text-muted-foreground">Lọc sản phẩm sắp hết</div>
                        </div>
                        <Switch checked={lowStockOnly} onCheckedChange={setLowStockOnly} />
                    </div>

                    <Separator className="my-3" />

                    <Button variant="outline" className="w-full justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        Cài đặt
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Đăng xuất
                    </Button>
                </CardContent>
            </Card>
        </aside>
    )
}

export default Sidebar
