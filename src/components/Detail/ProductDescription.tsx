import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

const ProductDescription = ({ product }: { product: any }) => {
    return (
        <div className="mt-6">
            <Card className="rounded-2xl border-0 shadow-sm">
                <CardHeader className="pb-2 border-b border-neutral-100">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-neutral-700">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-400">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        THÔNG TIN SẢN PHẨM
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral prose-sm max-w-none p-6">
                    <div dangerouslySetInnerHTML={{ __html: product.description || "" }} />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDescription