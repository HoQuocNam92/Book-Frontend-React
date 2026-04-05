import * as serviecsCheckout from "@/services/checkout.services"
import { useCartStore } from "@/stores/cart.stores"
import type { CheckoutInput } from "@/types/Checkout"
import { useMutation } from "@tanstack/react-query"

const useCheckout = () => {
    const setItemCount = useCartStore((s) => s.setItemCount)
    const createOrder = useMutation({
        mutationFn: async (data: CheckoutInput) => await serviecsCheckout.placeOrder(data),
        onSuccess: () => {
            setItemCount(0);
        }
    })
    const cancelOrder = useMutation({
        mutationFn: async (orderId: number) => await serviecsCheckout.cancelOrder(orderId),
    })
    return {
        createOrder,
        cancelOrder
    }
}

export default useCheckout