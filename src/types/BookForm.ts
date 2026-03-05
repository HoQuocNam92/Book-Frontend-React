import type { BookStatus } from "@/components/Dashboard/Products/statusBadge"

export type BookForm = {
    // Books
    title: string
    slug: string
    price: number
    sale_price?: number
    discount_percent?: number
    stock: number
    description?: string
    brand_id?: string
    category_id?: string
    status: BookStatus
    content: string
    images: { url: string }[]

    attributes: { attr_key: string; attr_value: string }[]
}
