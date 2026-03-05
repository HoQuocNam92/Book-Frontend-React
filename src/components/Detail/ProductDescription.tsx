import Reviews from '@/components/Reviews/Reviews'
import MySwiperComponent from '@/components/Swiper/Swiper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { BookType } from '@/types/Book'
import React from 'react'

const ProductDescription = ({ product, related }: {
    product: any
    related: BookType[]
}) => {
    return (
        <div className="mt-6 space-y-6">
            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">THÔNG TIN SẢN PHẨM</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral max-w-none p-5">
                    <div dangerouslySetInnerHTML={{ __html: product.description || "" }} />
                </CardContent>
            </Card>
            <Reviews product={product} />

        </div>
    )
}

export default ProductDescription