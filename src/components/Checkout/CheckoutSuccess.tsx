import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatVND } from '@/utils/formatVND'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = ({ orderSuccess }: { orderSuccess: any }) => {
    const navigate = useNavigate();
    return (
        <div className="container py-16 text-center">
            <div className="mx-auto max-w-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Đặt hàng thành công!</h2>
                <p className="mt-2 text-muted-foreground">
                    Mã đơn hàng: <span className="font-semibold text-foreground">#{orderSuccess.id}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
                </p>

                <Card className="mt-6 rounded-2xl text-left">
                    <CardContent className="p-5 space-y-3">
                        <div className="text-sm font-semibold">Chi tiết đơn hàng</div>
                        {orderSuccess.OrderItems?.map((oi: any) => (
                            <div key={oi.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {oi.Books?.title} × {oi.quantity}
                                </span>
                                <span className="font-medium">
                                    {formatVND(Number(oi.price) * oi.quantity)}
                                </span>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                            <span>Tổng cộng</span>
                            <span className="text-orange-600">{formatVND(Number(orderSuccess.total))}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => navigate("/")}>
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess