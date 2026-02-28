export type CartType = {
    id: number,
    items: [
        {
            id: number,
            book_id: number,
            quantity: number,
            title: string,
            slug: string,
            price: number,
            sale_price: number,
            final_price: number,
            discount_percent: number,
            image: string,
            subtotal: number

        }

    ]
}

export type UpdateCartInput = {
    id: number
    quantity: number
}

export interface CartResponse {
    id: number
    items: CartType[]
}