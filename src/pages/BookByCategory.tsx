import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Book } from "@/types/Book"
import BookList from "@/components/Books/BookList"

import { useProducts } from "@/hooks/useProducts"
import { SpinnerCustom } from "@/components/ui/spinner"
import { useNavigate } from "react-router-dom"
import Pagination from "@/components/common/Pagination"
import BrandRow from "@/components/Books/BrandRow"
import SliderPrice from "@/components/Books/SliderPrice"

const brands = [
    "Omega+",
    "Huy Hoàng Books",
    "Saigon Books",
    "AlphaBooks",
    "First News",
    "Nhã Nam",
    "Thái Hà",
    "NXB Trẻ",
]





export default function BookByCategory() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { products, loading, errors } = useProducts(page);
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const min = 0
    const max = 1_000_000
    const [priceRange, setPriceRange] = useState<[number, number]>([
        0,
        1_000_000,
    ])


    useEffect(() => {

        if (products?.data !== null) {
            setTotalPages(products?.pagination?.totalPages)
        }
    }, [page, products?.data])

    if (loading) { return <SpinnerCustom /> }
    if (errors) { navigate('/oops') }

    const filtered: Book[] = products?.data?.filter((b: Book) => {
        const okBrand = selectedBrand ? true : true
        const okPrice = b.price! >= priceRange[0] && b.price! <= priceRange[1]
        return okBrand && okPrice
    })

    return (
        <div className="min-h-screen bg-[#f2f2f2]">

            <main className="mx-auto max-w-6xl px-4 py-6">
                <Card className="rounded-xl">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                            <div className="md:col-span-2 text-sm text-muted-foreground">
                                Khoảng giá
                            </div>
                            <SliderPrice priceRange={priceRange} min={min} max={max} setPriceRange={setPriceRange} />
                            <Separator className="md:col-span-12" />
                            <BrandRow brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-6 rounded-xl bg-white px-4 py-3">
                    <h2 className="text-lg font-semibold">{products?.category?.name}</h2>
                </div>

                <BookList books={filtered} />
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </main>
        </div>
    )
}
