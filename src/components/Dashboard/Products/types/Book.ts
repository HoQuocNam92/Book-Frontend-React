import type { BookStatus } from "@/components/Dashboard/Products/statusBadge"

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
