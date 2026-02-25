import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SpinnerCustom } from "@/components/ui/spinner"
import MySwiperComponent from "@/components/Swiper/Swiper"
import { useProducts } from "@/hooks/useProducts"




export default function HomeBookshelfSection() {
    const { getProducts } = useProducts()



    if (getProducts?.isLoading) return <SpinnerCustom />
    if (getProducts?.error) return null

    return (
        <section className="my-2">
            <div className="mx-auto w-full container px-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Sách mới</h2>
                </div>
                <MySwiperComponent data={getProducts?.data?.data?.discountBooks} />
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Sách bán chạy</h2>
                </div>
                <MySwiperComponent data={getProducts?.data?.data?.newBooks} />
            </div>
        </section>
    )
}

