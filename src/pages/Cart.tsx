import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import { useAuthStore } from "@/stores/auth.stores"
import { SpinnerCustom } from "@/components/ui/spinner"
import useCarts from "@/hooks/useCarts"
import { useCartStore } from "@/stores/cart.stores"
import { useEffect } from "react"
import CartEmpty from "@/components/Cart/CartEmpty"
import CartList from "@/components/Cart/CartList"
import { ShoppingBag } from "lucide-react"
import CartError from "@/components/Cart/CartError"
export const Cart = () => {
    const { getCartByUserId, updateMutation, removeMutation, clearMutation } = useCarts()
    const navigate = useNavigate()
    const clear = useCartStore((s) => s.clear)
    const itemCount = useCartStore((s) => s.itemCount)
    const user = useAuthStore((s) => s.user)
    const cart = getCartByUserId.data
    const items = cart?.items ?? []
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.subtotal, 0)
    const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    const setItemCount = useCartStore((s) => s.setItemCount);

    const handleUpdateCart = (id: number, quantity: number) => {
        updateMutation.mutate({ id, quantity })
        setItemCount(totalItems);
    }
    const handleRemoveCart = (id: number) => {
        removeMutation.mutate(id)
        setItemCount(totalItems);
    }
    const handleClearCart = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
            clearMutation.mutate()
            clear()
        }
    }
    const errors = updateMutation.error || removeMutation.error || clearMutation.error
    const isLoadingRemove = removeMutation.isPending
    const isLoadingUpdate = updateMutation.isPending
    const isLoadingClear = clearMutation.isPending
    useEffect(() => {
        setItemCount(totalItems);
    }, [totalItems]);
    if (!user) {
        return (
            <div className="container py-20 text-center">
                <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300" />
                <h2 className="mt-4 text-xl font-semibold">Bạn cần đăng nhập</h2>
                <p className="mt-2 text-muted-foreground">Vui lòng đăng nhập để xem giỏ hàng</p>
                <Button
                    className="mt-6 bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate("/auth/sign-in")}
                >
                    Đăng nhập
                </Button>
            </div>
        )
    }

    if (getCartByUserId.isLoading) return <SpinnerCustom />

    if (errors) {
        return <CartError />
    }
    return (
        <div className="container bg-neutral-50 min-h-[60vh]">
            <div className="px-4 py-6">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm text-muted-foreground">
                    <Link to="/" className="hover:text-foreground">Trang chủ</Link>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">Giỏ hàng</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">
                    Giỏ hàng
                    {totalItems > 0 && (
                        <span className="text-base font-normal text-muted-foreground ml-2">
                            ({totalItems} sản phẩm)
                        </span>
                    )}
                </h1>

                {items.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <CartList items={items} handleClearCart={handleClearCart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} isLoadingClear={isLoadingClear} isLoadingRemove={isLoadingRemove} isLoadingUpdate={isLoadingUpdate} totalAmount={totalAmount} itemCount={itemCount} />
                )}
            </div>
        </div>
    )
}

export default Cart
