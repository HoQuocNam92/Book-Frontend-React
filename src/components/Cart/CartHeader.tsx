import { Card, CardContent } from '@/components/ui/card'

const CartHeader = () => {
    return (
        <div>
            <Card className="rounded-2xl">
                <CardContent className="p-4">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                        <div className="col-span-6">Sản phẩm</div>
                        <div className="col-span-2 text-center">Đơn giá</div>
                        <div className="col-span-2 text-center">Số lượng</div>
                        <div className="col-span-2 text-right">Thành tiền</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartHeader