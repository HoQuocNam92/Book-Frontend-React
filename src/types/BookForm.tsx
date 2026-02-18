type BookStatus = "active" | "draft" | "archived"

export type BookForm = {
    // Books
    title: string
    slug: string
    price: number
    sale_price?: number
    discount_percent?: number
    stock: number
    description?: string
    brand_id?: number
    category_id?: number
    status: BookStatus

    // BookPromotions
    promotion?: {
        content: string
    }

    // BookImages
    images: { url: string }[]

    // BookAttributes
    attributes: { attr_key: string; attr_value: string }[]
}
