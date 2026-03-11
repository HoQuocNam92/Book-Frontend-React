import { placeOrder } from "@/services/checkout.services"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const useCheckout = () => {
    const navigate = useNavigate()
    const createOrder = useMutation({
        mutationFn: async (data: any) => await placeOrder(data),
        onSuccess: () => navigate('/')
    })
    return {
        createOrder
    }
}

export default useCheckout