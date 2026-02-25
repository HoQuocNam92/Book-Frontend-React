import { create } from 'zustand'

interface CartItem {
    id: number
    book_id: number
    quantity: number
    title: string
    slug: string
    price: number
    sale_price: number
    final_price: number
    discount_percent: number
    stock: number
    image: string | null
    subtotal: number
}

interface CartState {
    items: CartItem[]
    itemCount: number
    setItems: (items: CartItem[]) => void
    setItemCount: (count: number) => void
    clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    itemCount: 0,
    setItems: (items) => set({
        items,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    }),
    setItemCount: (count) => set({ itemCount: count }),
    clear: () => set({ items: [], itemCount: 0 }),
}))
