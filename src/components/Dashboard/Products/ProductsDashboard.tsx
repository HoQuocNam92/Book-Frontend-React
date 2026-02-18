import * as React from "react"
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    RefreshCw,
    Eye,
    Upload,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    BookOpen,
    Layers,
    BadgeCheck,
    BadgeX,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

// =====================
// TYPES
// =====================
export type BookStatus = "DRAFT" | "ACTIVE" | "ARCHIVED"

export type Book = {
    id: number
    title: string
    sku?: string
    price: number
    salePercent?: number | null // 0-100
    stock: number
    coverUrl?: string | null
    galleryUrls: string[]
    categories: string[]
    author?: string | null
    publisher?: string | null
    pages?: number | null
    status: BookStatus
    isFeatured: boolean
    createdAt: string
    updatedAt: string
}

// =====================
// MOCK DATA (replace with API)
// =====================
const seedBooks: Book[] = [
    {
        id: 1001,
        title: "Clean Code",
        sku: "BK-CC-001",
        price: 239000,
        salePercent: 17,
        stock: 24,
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        galleryUrls: [
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        ],
        categories: ["Programming", "Best Seller"],
        author: "Robert C. Martin",
        publisher: "Prentice Hall",
        pages: 464,
        status: "ACTIVE",
        isFeatured: true,
        createdAt: "2026-02-01T10:00:00.000Z",
        updatedAt: "2026-02-08T10:00:00.000Z",
    },
    {
        id: 1002,
        title: "Atomic Habits",
        sku: "BK-AH-002",
        price: 189000,
        salePercent: null,
        stock: 8,
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
        galleryUrls: [
            "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
        ],
        categories: ["Self-help"],
        author: "James Clear",
        publisher: "Avery",
        pages: 320,
        status: "ACTIVE",
        isFeatured: false,
        createdAt: "2026-01-25T10:00:00.000Z",
        updatedAt: "2026-02-06T10:00:00.000Z",
    },
    {
        id: 1003,
        title: "Dế Mèn Phiêu Lưu Ký",
        sku: "BK-DM-003",
        price: 69000,
        salePercent: 14,
        stock: 0,
        coverUrl:
            "https://upload.wikimedia.org/wikipedia/vi/8/80/De_men_phieu_luu_ky.jpg",
        galleryUrls: [
            "https://upload.wikimedia.org/wikipedia/vi/8/80/De_men_phieu_luu_ky.jpg",
        ],
        categories: ["Vietnamese", "Kids"],
        author: "Tô Hoài",
        publisher: "Kim Đồng",
        pages: 160,
        status: "ARCHIVED",
        isFeatured: false,
        createdAt: "2025-12-15T10:00:00.000Z",
        updatedAt: "2026-01-10T10:00:00.000Z",
    },
]

// =====================
// HELPERS
// =====================
function formatVND(n: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(n)
}

function formatDate(iso: string) {
    try {
        return new Date(iso).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    } catch {
        return iso
    }
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
}

function statusBadge(status: BookStatus) {
    if (status === "ACTIVE") {
        return (
            <Badge className="gap-1">
                <BadgeCheck className="h-3.5 w-3.5" /> Active
            </Badge>
        )
    }
    if (status === "DRAFT") {
        return (
            <Badge variant="secondary" className="gap-1">
                <Layers className="h-3.5 w-3.5" /> Draft
            </Badge>
        )
    }
    return (
        <Badge variant="destructive" className="gap-1">
            <BadgeX className="h-3.5 w-3.5" /> Archived
        </Badge>
    )
}

// =====================
// COMPONENT
// =====================
export default function BooksDashboard() {
    // data
    const [books, setBooks] = React.useState<Book[]>(seedBooks)

    // ui
    const [q, setQ] = React.useState("")
    const [status, setStatus] = React.useState<BookStatus | "ALL">("ALL")
    const [sort, setSort] = React.useState<
        "updated_desc" | "created_desc" | "price_asc" | "price_desc" | "stock_asc"
    >("updated_desc")

    // pagination
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)

    // selection
    const [selected, setSelected] = React.useState<Record<number, boolean>>({})

    // dialogs
    const [openCreate, setOpenCreate] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openBulkDelete, setOpenBulkDelete] = React.useState(false)

    const [activeBook, setActiveBook] = React.useState<Book | null>(null)

    // form
    const emptyForm: Book = React.useMemo(
        () => ({
            id: -1,
            title: "",
            sku: "",
            price: 0,
            salePercent: null,
            stock: 0,
            coverUrl: "",
            galleryUrls: [],
            categories: [],
            author: "",
            publisher: "",
            pages: null,
            status: "DRAFT",
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }),
        []
    )
    const [form, setForm] = React.useState<Book>(emptyForm)
    const [categoryText, setCategoryText] = React.useState("")

    // =====================
    // DERIVED
    // =====================
    const selectedIds = React.useMemo(() => {
        return Object.entries(selected)
            .filter(([, v]) => v)
            .map(([k]) => Number(k))
    }, [selected])

    const filtered = React.useMemo(() => {
        const query = q.trim().toLowerCase()

        let arr = [...books]

        if (query) {
            arr = arr.filter((b) => {
                const hay = [
                    b.title,
                    b.sku || "",
                    b.author || "",
                    b.publisher || "",
                    b.categories.join(" "),
                ]
                    .join(" ")
                    .toLowerCase()
                return hay.includes(query)
            })
        }

        if (status !== "ALL") {
            arr = arr.filter((b) => b.status === status)
        }

        arr.sort((a, b) => {
            if (sort === "updated_desc") {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            }
            if (sort === "created_desc") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            if (sort === "price_asc") return a.price - b.price
            if (sort === "price_desc") return b.price - a.price
            if (sort === "stock_asc") return a.stock - b.stock
            return 0
        })

        return arr
    }, [books, q, status, sort])

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))

    React.useEffect(() => {
        setPage((p) => clamp(p, 1, totalPages))
    }, [totalPages])

    const paged = React.useMemo(() => {
        const start = (page - 1) * pageSize
        return filtered.slice(start, start + pageSize)
    }, [filtered, page, pageSize])

    const allVisibleSelected = paged.length
        ? paged.every((b) => selected[b.id])
        : false

    // =====================
    // ACTIONS
    // =====================

    const navigate = useNavigate()
    const resetForm = React.useCallback(() => {
        setForm(emptyForm)
        setCategoryText("")
    }, [emptyForm])

    const openCreateDialog = () => {
        navigate('/dashboard/products/create')
    }

    const openEditDialog = (b: Book) => {
        setActiveBook(b)
        setForm({ ...b })
        setCategoryText(b.categories.join(", "))
        setOpenEdit(true)
    }

    const openDeleteDialog = (b: Book) => {
        setActiveBook(b)
        setOpenDelete(true)
    }

    const toggleRow = (id: number) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const toggleAllVisible = (checked: boolean) => {
        setSelected((prev) => {
            const next = { ...prev }
            for (const b of paged) next[b.id] = checked
            return next
        })
    }

    const clearSelection = () => setSelected({})

    const onSubmitCreate = () => {
        const title = form.title.trim()
        if (!title) return

        const now = new Date().toISOString()

        const newBook: Book = {
            ...form,
            id: Date.now(),
            title,
            categories: categoryText
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            galleryUrls: (form.galleryUrls || []).filter(Boolean),
            coverUrl: form.coverUrl?.trim() || (form.galleryUrls?.[0] ?? ""),
            updatedAt: now,
            createdAt: now,
        }

        setBooks((prev) => [newBook, ...prev])
        setOpenCreate(false)
        resetForm()
    }

    const onSubmitEdit = () => {
        if (!activeBook) return

        const title = form.title.trim()
        if (!title) return

        const now = new Date().toISOString()

        setBooks((prev) =>
            prev.map((b) => {
                if (b.id !== activeBook.id) return b
                return {
                    ...b,
                    ...form,
                    title,
                    categories: categoryText
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    galleryUrls: (form.galleryUrls || []).filter(Boolean),
                    coverUrl: form.coverUrl?.trim() || (form.galleryUrls?.[0] ?? ""),
                    updatedAt: now,
                }
            })
        )

        setOpenEdit(false)
        setActiveBook(null)
        resetForm()
    }

    const onConfirmDelete = () => {
        if (!activeBook) return
        setBooks((prev) => prev.filter((b) => b.id !== activeBook.id))
        setOpenDelete(false)
        setActiveBook(null)

        setSelected((prev) => {
            const next = { ...prev }
            delete next[activeBook.id]
            return next
        })
    }

    const onConfirmBulkDelete = () => {
        if (!selectedIds.length) return

        setBooks((prev) => prev.filter((b) => !selectedIds.includes(b.id)))
        setOpenBulkDelete(false)
        clearSelection()
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
                const next: BookStatus = b.status === "ACTIVE" ? "DRAFT" : "ACTIVE"
                return { ...b, status: next, updatedAt: now }
            })
        )
    }

    const onRefresh = () => {
        // Replace with refetch API
        setBooks((prev) => [...prev])
    }

    const exportJson = () => {
        const blob = new Blob([JSON.stringify(books, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `books-${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    // =====================
    // RENDER
    // =====================
    return (
        <div className="w-full space-y-4">
            {/* Header */}
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
                    <Button variant="outline" onClick={onRefresh} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Export</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={exportJson} className="gap-2">
                                <Download className="h-4 w-4" />
                                Export JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled className="gap-2">
                                <Upload className="h-4 w-4" />
                                Import (coming soon)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={openCreateDialog} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add book
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <Card className="rounded-2xl">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <Label className="text-xs text-muted-foreground">Search</Label>
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Tìm theo title, slug, SKU, author, category..."
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <Label className="text-xs text-muted-foreground">Status</Label>
                            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="lg:col-span-3">
                            <Label className="text-xs text-muted-foreground">Sort</Label>
                            <Select value={sort} onValueChange={(v) => setSort(v as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="updated_desc">Updated (newest)</SelectItem>
                                    <SelectItem value="created_desc">Created (newest)</SelectItem>
                                    <SelectItem value="price_asc">Price (low → high)</SelectItem>
                                    <SelectItem value="price_desc">Price (high → low)</SelectItem>
                                    <SelectItem value="stock_asc">Stock (low → high)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="lg:col-span-2">
                            <Label className="text-xs text-muted-foreground">Page size</Label>
                            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Page size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[5, 10, 20, 50].map((n) => (
                                        <SelectItem key={n} value={String(n)}>
                                            {n} / page
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="rounded-xl">
                                Total: {total}
                            </Badge>
                            <Badge variant="secondary" className="rounded-xl">
                                Selected: {selectedIds.length}
                            </Badge>

                            {selectedIds.length > 0 && (
                                <>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => setOpenBulkDelete(true)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete selected
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={clearSelection}>
                                        Clear
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Page <span className="font-medium text-foreground">{page}</span> / {totalPages}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
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
                                    <TableHead className="w-[48px]">
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
                                    <TableHead className="min-w-[140px]">Updated</TableHead>
                                    <TableHead className="w-[84px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paged.length === 0 ? (
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
                                    paged.map((b) => (
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
                                                        {b.coverUrl ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={b.coverUrl}
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
                                                            <div className="truncate font-medium">{b.title}</div>
                                                            {b.isFeatured && (
                                                                <Badge variant="secondary" className="rounded-xl">
                                                                    Featured
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="truncate text-xs text-muted-foreground">
                                                            {b.author ? b.author : "—"}
                                                            {b.publisher ? ` • ${b.publisher}` : ""}
                                                        </div>
                                                    </div>
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

                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {b.categories.length ? (
                                                        b.categories.slice(0, 3).map((c) => (
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
                                            </TableCell>

                                            <TableCell>{statusBadge(b.status)}</TableCell>

                                            <TableCell>
                                                <div className="text-sm">{formatDate(b.updatedAt)}</div>
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
                                                        <DropdownMenuItem className="gap-2" onClick={() => openEditDialog(b)}>
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
                                                            onClick={() => openDeleteDialog(b)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
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

                    {/* Pagination */}
                    <div className="flex flex-col gap-2 border-t p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground">{paged.length}</span> of{" "}
                            <span className="font-medium text-foreground">{total}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-xl"
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-xl"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-xl"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-xl"
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* CREATE */}


            {/* DELETE */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="max-w-lg rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Delete book</DialogTitle>
                        <DialogDescription>
                            Bạn chắc chắn muốn xoá book này? Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>

                    {activeBook && (
                        <div className="rounded-2xl border p-3">
                            <div className="font-medium">{activeBook.title}</div>
                            <div className="text-sm text-muted-foreground">#{activeBook.id}</div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDelete(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={onConfirmDelete} className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* BULK DELETE */}
            <Dialog open={openBulkDelete} onOpenChange={setOpenBulkDelete}>
                <DialogContent className="max-w-lg rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Delete selected</DialogTitle>
                        <DialogDescription>
                            Xoá <span className="font-medium">{selectedIds.length}</span> book đã chọn.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="rounded-2xl border p-3">
                        <div className="text-sm text-muted-foreground">IDs</div>
                        <div className="mt-1 flex flex-wrap gap-2">
                            {selectedIds.slice(0, 12).map((id) => (
                                <Badge key={id} variant="secondary" className="rounded-xl">
                                    #{id}
                                </Badge>
                            ))}
                            {selectedIds.length > 12 && (
                                <Badge variant="outline" className="rounded-xl">
                                    +{selectedIds.length - 12}
                                </Badge>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenBulkDelete(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={onConfirmBulkDelete} className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// =====================
// SUB: FORM TABS
// =====================
function BookFormTabs({
    form,
    setForm,
    categoryText,
    setCategoryText,
}: {
    form: Book
    setForm: React.Dispatch<React.SetStateAction<Book>>
    categoryText: string
    setCategoryText: React.Dispatch<React.SetStateAction<string>>
}) {
    const coverPreview = form.coverUrl?.trim() || ""

    return (
        <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="meta">Meta</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div className="md:col-span-8 space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Title</Label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                    placeholder="VD: Clean Code"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Author</Label>
                                <Input
                                    value={form.author || ""}
                                    onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                                    placeholder="VD: Robert C. Martin"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Publisher</Label>
                                <Input
                                    value={form.publisher || ""}
                                    onChange={(e) => setForm((p) => ({ ...p, publisher: e.target.value }))}
                                    placeholder="VD: Kim Đồng"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div className="space-y-1.5">
                                <Label>SKU</Label>
                                <Input
                                    value={form.sku || ""}
                                    onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))}
                                    placeholder="VD: BK-001"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label>Pages</Label>
                                <Input
                                    type="number"
                                    value={form.pages ?? ""}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            pages: e.target.value ? Number(e.target.value) : null,
                                        }))
                                    }
                                    placeholder="VD: 320"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Categories (comma separated)</Label>
                            <Input
                                value={categoryText}
                                onChange={(e) => setCategoryText(e.target.value)}
                                placeholder="VD: Programming, Best Seller"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Status</Label>
                                <Select
                                    value={form.status}
                                    onValueChange={(v) => setForm((p) => ({ ...p, status: v as any }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">Draft</SelectItem>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end justify-between rounded-2xl border p-3">
                                <div>
                                    <div className="font-medium">Featured</div>
                                    <div className="text-sm text-muted-foreground">Đánh dấu book nổi bật</div>
                                </div>
                                <Switch
                                    checked={form.isFeatured}
                                    onCheckedChange={(v) => setForm((p) => ({ ...p, isFeatured: Boolean(v) }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 space-y-3">
                        <div className="space-y-1.5">
                            <Label>Cover URL</Label>
                            <Input
                                value={form.coverUrl || ""}
                                onChange={(e) => setForm((p) => ({ ...p, coverUrl: e.target.value }))}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="overflow-hidden rounded-2xl border bg-muted">
                            <div className="aspect-[3/4] w-full">
                                {coverPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={coverPreview} alt="cover" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="grid h-full w-full place-items-center">
                                        <div className="text-center">
                                            <BookOpen className="mx-auto h-6 w-6 text-muted-foreground" />
                                            <div className="mt-2 text-sm text-muted-foreground">No cover</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border p-3">
                            <div className="text-sm font-medium">Tip</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Nếu bạn muốn upload ảnh thật, mình sẽ code thêm component upload + gallery (nhiều ảnh).
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div className="md:col-span-7 space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Price (VND)</Label>
                                <Input
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value || 0) }))}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label>Stock</Label>
                                <Input
                                    type="number"
                                    value={form.stock}
                                    onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value || 0) }))}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label>SKU (optional)</Label>
                                <Input
                                    value={form.sku || ""}
                                    onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                        <div className="rounded-2xl border p-3">
                            <div className="text-sm font-medium">Gợi ý cho shop sách</div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                <li>
                                    Nếu salePrice tồn tại → hiển thị giá sale, giá gốc gạch ngang.
                                </li>
                                <li>
                                    Stock = 0 → cho status Out of stock, có thể auto set DRAFT.
                                </li>
                                <li>
                                    SKU không bắt buộc, nhưng nên có nếu bạn quản lý kho theo mã.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="meta" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1.5">
                            <Label>Short description</Label>
                            <Textarea placeholder="Mô tả ngắn..." rows={4} />
                        </div>

                        <div className="space-y-1.5">
                            <Label>SEO title</Label>
                            <Input placeholder="VD: Clean Code | AlphaBooks" />
                        </div>

                        <div className="space-y-1.5">
                            <Label>SEO description</Label>
                            <Textarea placeholder="SEO description..." rows={4} />
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-3">
                        <div className="rounded-2xl border p-3">
                            <div className="text-sm font-medium">Meta fields</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Đây là phần thường dùng khi deploy thật: SEO, description, tags, v.v.
                            </div>
                        </div>

                        <div className="rounded-2xl border p-3">
                            <div className="text-sm font-medium">Lưu ý</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Nếu bạn muốn text editor miễn phí cho mô tả dài: mình đề xuất Tiptap.
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}
