import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CheckoutEmpty = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-neutral-300" />
            <h2 className="mt-4 text-xl font-semibold">Giỏ hàng trống</h2>
            <p className="mt-2 text-muted-foreground">Bạn cần thêm sản phẩm trước khi thanh toán</p>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600" onClick={() => navigate("/")}>
                Tiếp tục mua sắm
            </Button>
        </div>
    )
}

export default CheckoutEmpty