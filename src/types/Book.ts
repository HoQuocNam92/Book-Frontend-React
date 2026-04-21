export type BookType = {
    id: number
    title: string
    thumbnail: string
    sale_price?: number
    slug: string
    price?: number
    discount_percent?: number
}

export type BookTopType = {
    bookId: number
    title: string
    quantity: number
    revenue: number
}