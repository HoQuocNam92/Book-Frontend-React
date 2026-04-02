import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

const CartError = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-20 text-center">
            <h2 className="mt-4 text-xl font-semibold text-red-500">Đã có lỗi xảy ra</h2>
            <p className="mt-2 text-muted-foreground">Không thể tải giỏ hàng của bạn. Vui lòng thử lại sau.</p>
            <Button
                className="mt-6 bg-orange-500 hover:bg-orange-600"
                onClick={() => navigate("/")}
            >
                Quay về trang chủ
            </Button>
        </div>
    )
}

export default CartError