import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { getCart, updateCartItem, removeCartItem, clearCart, addToCart } from "@/services/cart.services"
import { useAuthStore } from '@/stores/auth.stores';
import type { CartResponse, CartType, UpdateCartInput } from '@/types/Cart';
const useCarts = () => {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const getCartByUserId = useQuery<CartResponse>({
        queryKey: ['cart', user?.id],
        queryFn: async () => {
            const res = await getCart()
            return res.data
        },
        enabled: !!user?.id
    })

    const createCartItem = useMutation<CartType, Error, { productId: number, quantity: number }>({
        mutationFn: async ({ productId, quantity }) => {
            return await addToCart(productId, quantity)
        }
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
        }
    });

    const updateMutation = useMutation<CartType, Error, UpdateCartInput>({
        mutationFn: async ({ id, quantity }: { id: number, quantity: number }) => {
            return await updateCartItem(id, quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
        }
    });
    const removeMutation = useMutation<CartType, Error, number>({
        mutationFn: async (id: number) => {
            return await removeCartItem(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
        }
    });
    const clearMutation = useMutation<void, Error, void>({
        mutationFn: async () => {
            return await clearCart();
        }
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] })
        }
    });

    return {
        getCartByUserId
        , updateMutation
        , removeMutation
        , clearMutation,
        createCartItem
    }

}
export default useCarts;
