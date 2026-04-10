import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { useMemo, useState } from "react"
import type { Book } from "@/components/Dashboard/Products/types/Book"
import type { BookStatus } from "@/components/Dashboard/Products/statusBadge"



const FilterProductDashboard = () => {
    const [q, setQ] = useState("")
    const [books] = useState<Book[]>([])
    const [status, setStatus] = useState<BookStatus | "ALL">("ALL")
    const [selected] = useState<Record<number, boolean>>({})
    const selectedIds = useMemo(() => {
        return Object.entries(selected)
            .filter(([, v]) => v)
            .map(([k]) => Number(k))
    }, [selected])
    const [sort, setSort] = useState<
        "updated_desc" | "created_desc" | "price_asc" | "price_desc" | "stock_asc"
    >("updated_desc")
    const [page] = useState(1)

    const filtered = useMemo(() => {
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
    const [pageSize, setPageSize] = useState(10)

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    return (
        <div>
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
                                    <SelectItem value="updated_desc">Cập nhật (mới nhất)</SelectItem>
                                    <SelectItem value="created_desc">Tạo (mới nhất)</SelectItem>
                                    <SelectItem value="price_asc">Giá (thấp → cao)</SelectItem>
                                    <SelectItem value="price_desc">Giá (cao → thấp)</SelectItem>
                                    <SelectItem value="stock_asc">Kho (thấp → cao)</SelectItem>
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

                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete selected
                                    </Button>
                                    <Button variant="outline" size="sm" >
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
        </div>
    )
}

export default FilterProductDashboard