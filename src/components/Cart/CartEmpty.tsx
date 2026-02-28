import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartEmpty = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Card className="rounded-2xl">
                <CardContent className="p-12 text-center">
                    <ShoppingBag className="mx-auto h-20 w-20 text-neutral-200" />
                    <h2 className="mt-4 text-lg font-semibold">Giỏ hàng trống</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Bạn chưa có sản phẩm nào trong giỏ hàng
                    </p>
                    <Button
                        className="mt-6 bg-orange-500 hover:bg-orange-600"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Tiếp tục mua sắm
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartEmpty