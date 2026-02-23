import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BookOpen, Download, Plus, RefreshCw, Upload } from 'lucide-react'
const HeaderProductDashboard = ({ handleCreateProduct }: { handleCreateProduct: () => void }) => {
    return (

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                        <BookOpen className="h-4.5 w-4.5" />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight">Books</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Quản lý sản phẩm sách: tìm kiếm, lọc, tạo mới, chỉnh sửa, xoá, thao tác hàng loạt.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Làm mới
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Xuất
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Export</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Xuất JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled className="gap-2">
                            <Upload className="h-4 w-4" />
                            Nhập CSV (coming soon)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button className="gap-2" onClick={handleCreateProduct}>
                    <Plus className="h-4 w-4" />
                    Thêm sách
                </Button>
            </div>
        </div>
    )
}

export default HeaderProductDashboard