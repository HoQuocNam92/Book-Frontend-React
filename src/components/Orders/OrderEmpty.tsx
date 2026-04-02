import { Card, CardContent } from '@/components/ui/card'
import { Package } from 'lucide-react'

const OrderEmpty = () => {
    return (
        <Card className="rounded-2xl">
            <CardContent className="py-16 text-center">
                <Package className="mx-auto h-12 w-12 text-neutral-300" />
                <p className="mt-3 text-sm text-muted-foreground">Bạn chưa có đơn hàng nào</p>
            </CardContent>
        </Card>
    )
}

export default OrderEmpty