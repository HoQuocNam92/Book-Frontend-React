import { placeOrder } from "@/services/checkout.services"
import { useCartStore } from "@/stores/cart.stores"
import type { CheckoutInput } from "@/types/Checkout"
import { useMutation } from "@tanstack/react-query"

const useCheckout = () => {
    const setItemCount = useCartStore((s) => s.setItemCount)
    const createOrder = useMutation({
        mutationFn: async (data: CheckoutInput) => await placeOrder(data),
        onSuccess: () => {
            setItemCount(0);
        }
    })
    return {
        createOrder
    }
}

export default useCheckout