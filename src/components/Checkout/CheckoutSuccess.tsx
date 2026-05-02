import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Oops from '@/pages/Oops'
import { formatVND } from '@/utils/formatVND'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {

    const location = useLocation()
    const orderSuccess = location.state?.orderSuccess
    const navigate = useNavigate();
    if (!orderSuccess) return <Oops />

    return (
        <div className="container px-4 py-12 text-center sm:py-16">
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
                            <div
                                key={oi.id}
                                className="flex flex-col gap-1 border-b border-dashed border-neutral-100 pb-2 text-sm last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-2"
                            >
                                <span className="min-w-0 text-left text-muted-foreground">
                                    {oi.Books?.title} × {oi.quantity}
                                </span>
                                <span className="shrink-0 font-medium sm:text-right">
                                    {formatVND(Number(oi.price) * oi.quantity)}
                                </span>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex flex-col gap-1 font-semibold sm:flex-row sm:items-center sm:justify-between">
                            <span>Tổng cộng</span>
                            <span className="text-orange-600 sm:text-right">
                                {formatVND(Number(orderSuccess.total))}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess