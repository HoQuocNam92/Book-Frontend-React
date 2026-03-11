import { placeOrder } from "@/services/checkout.services"
import { useMutation } from "@tanstack/react-query"

const useCheckout = () => {
    const createOrder = (selectedAddress: any, paymentMethod: any, appliedCoupon: any) => {
        return useMutation({
            mutationFn: () => placeOrder(selectedAddress!, paymentMethod, appliedCoupon?.code),

        })
    }
    return {
        createOrder
    }
}

export default useCheckout