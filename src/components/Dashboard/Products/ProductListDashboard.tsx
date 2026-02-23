import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { BadgeCheck, BookOpen, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, Filter, Layers, Pencil, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { statusBadge, type BookStatus } from '@/components/Dashboard/Products/statusBadge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Book } from '@/components/Dashboard/Products/types/Book'
import { formatVND } from '@/utils/formatVND'
import { SpinnerCustom } from '@/components/ui/spinner'
import Pagination from '@/components/common/Pagination'
const ProductListDashboard = ({ selected, setSelected, setOpen, products, loading, errors, setPageNumber, pageNumber }: { selected: any, setSelected: any, setOpen: any, products: any, loading: boolean, errors: any, setPageNumber: any, pageNumber: any }) => {
    const [books, setBooks] = useState<Book[]>(products?.data)



    const allVisibleSelected = books?.length
        ? books.every((b: any) => selected[b.id])
        : false

    const navigate = useNavigate()

    const openCreateDialog = () => {
        navigate('/dashboard/products/create')
    }



    const toggleRow = (id: number) => {
        setSelected((prev: any) => ({ ...prev, [id]: !prev[id] }))
    }

    const toggleAllVisible = (checked: boolean) => {
        setSelected((prev: any) => {
            const next = { ...prev }
            for (const b of books) next[b.id] = checked
            return next
        })
    }
    const onQuickToggleFeatured = (id: number) => {
        const now = new Date().toISOString()
        setBooks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, isFeatured: !b.isFeatured, updatedAt: now } : b))
        )
    }

    const onQuickToggleStatus = (id: number) => {
        const now = new Date().toISOString()
        setBooks((prev) =>
            prev.map((b) => {
                if (b.id !== id) return b
                const next: BookStatus = b.status === "active" ? "draft" : "active"
                return { ...b, status: next, updatedAt: now }
            })
        )
    }

    const handleDelete = (id: number) => {
        if (!selected?.[id]) {
            alert("Vui lòng chọn sách để xóa")
            return
        }
        setOpen(true)
    }
    useEffect(() => {
        setBooks(products?.data)
    }, [products?.data])
    if (loading) {
        return <SpinnerCustom />
    }
    if (errors) {
        return <div className="text-destructive">Có lỗi xảy ra khi tải dữ liệu</div>
    }
    return (
        <div>
            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Filter className="h-4 w-4" />
                        Listing
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <div className="grid place-items-center">
                                            <Checkbox
                                                checked={allVisibleSelected}
                                                onCheckedChange={(v) => toggleAllVisible(Boolean(v))}
                                                aria-label="Select all"
                                            />
                                        </div>
                                    </TableHead>
                                    <TableHead className="min-w-[360px]">Book</TableHead>
                                    <TableHead className="min-w-[140px]">Price</TableHead>
                                    <TableHead className="min-w-[110px]">Stock</TableHead>
                                    <TableHead className="min-w-[160px]">Categories</TableHead>
                                    <TableHead className="min-w-[140px]">Status</TableHead>
                                    <TableHead className="w-[84px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {books?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-10 text-center">
                                            <div className="mx-auto max-w-md space-y-2">
                                                <div className="text-base font-medium">Không có dữ liệu</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Thử đổi bộ lọc hoặc tạo book mới.
                                                </div>
                                                <Button onClick={openCreateDialog} className="mt-2 gap-2">
                                                    <Plus className="h-4 w-4" />
                                                    Add book
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    books?.map((b: any) => (
                                        <TableRow key={b.id} className="align-middle">
                                            <TableCell>
                                                <div className="grid place-items-center">
                                                    <Checkbox
                                                        checked={Boolean(selected[b.id])}
                                                        onCheckedChange={() => toggleRow(b.id)}
                                                        aria-label={`Select ${b.title}`}
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-10 overflow-hidden rounded-xl border bg-muted">
                                                        {b.BookImages ? (
                                                            <img
                                                                src={b.BookImages}
                                                                alt={b.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="grid h-full w-full place-items-center">
                                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className="truncate font-medium w-96">{b.title}</div>
                                                            {b.isFeatured && (
                                                                <Badge variant="secondary" className="rounded-xl">
                                                                    Featured
                                                                </Badge>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                            </TableCell>


                                            <TableCell>
                                                <div className={cn("font-medium", b.stock === 0 && "text-destructive")}>
                                                    {formatVND(b.price)}
                                                </div>

                                            </TableCell>
                                            <TableCell>
                                                <div className={cn("font-medium", b.stock === 0 && "text-destructive")}>
                                                    {b.stock}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {b.stock === 0 ? "Out of stock" : "In stock"}
                                                </div>
                                            </TableCell>

                                            {/* <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {b.categories.length ? (
                                                        b.categories.slice(0, 3).map((c: string) => (
                                                            <Badge key={c} variant="secondary" className="rounded-xl">
                                                                {c}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">—</span>
                                                    )}
                                                    {b.categories.length > 3 && (
                                                        <Badge variant="outline" className="rounded-xl">
                                                            +{b.categories.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell> */}

                                            <TableCell>{statusBadge(b.status)}</TableCell>

                                            <TableCell>
                                                <div className="text-sm">{dayjs(b.updatedAt).format("DD/MM/YYYY")}</div>
                                                <div className="text-xs text-muted-foreground">#{b.id}</div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="rounded-xl">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2"  >
                                                            <Pencil className="h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2"
                                                            onClick={() => onQuickToggleFeatured(b.id)}
                                                        >
                                                            <BadgeCheck className="h-4 w-4" />
                                                            Toggle featured
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2"
                                                            onClick={() => onQuickToggleStatus(b.id)}
                                                        >
                                                            <Layers className="h-4 w-4" />
                                                            Toggle active/draft
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="gap-2 text-destructive focus:text-destructive"
                                                            onClick={() => handleDelete(b.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Xóa
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination totalPages={products.pagination?.totalPages || 1} page={pageNumber} onChange={setPageNumber} />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductListDashboard