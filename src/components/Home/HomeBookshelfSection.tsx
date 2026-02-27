
import { SpinnerCustom } from "@/components/ui/spinner"
import { useProducts } from "@/hooks/useProducts"
import HomeSales from "@/components/Home/HomeSales"
import HomeMain from "@/components/Home/HomeMain"
import HomeSoldest from "@/components/Home/HomeSoldest"




export default function HomeBookshelfSection() {
    const { getProducts } = useProducts()
    if (getProducts?.isLoading) return <SpinnerCustom />
    if (getProducts?.error) return null

    return (
        <section className="my-2">
            <div className="mx-auto w-full container px-4">
                <HomeSales discountBooks={getProducts?.data?.data?.discountBooks} />
                <HomeMain newBooks={getProducts?.data?.data?.newBooks} />
                <HomeSoldest bestSellerBooks={getProducts?.data?.data?.bestSellerBooks} />
            </div>
        </section>
    )
}

