
import { SpinnerCustom } from "@/components/ui/spinner"
import { useProducts } from "@/hooks/useProducts"
import HomeSales from "@/components/Home/HomeSales"
import HomeMain from "@/components/Home/HomeMain"
import { useBanners } from "@/hooks/useBanners"
import HomeFeatured from "@/components/Home/HomeFeatured"




export default function HomeBookshelfSection() {
    const { getProducts } = useProducts()
    const { salesBanners, newBanners, featuredBanners } = useBanners()

    if (
        getProducts?.isLoading ||
        salesBanners?.isLoading ||
        newBanners?.isLoading ||
        featuredBanners?.isLoading
    ) return <SpinnerCustom />

    if (
        getProducts?.error ||
        salesBanners?.error ||
        newBanners?.error ||
        featuredBanners?.error
    ) return null
    return (
        <section className="my-2">
            <div className="mx-auto w-full container px-4">
                <HomeSales
                    discountBooks={getProducts?.data?.data?.discountBooks}
                    banners={salesBanners?.data}
                />
                <HomeMain
                    newBooks={getProducts?.data?.data?.newBooks}
                    banners={newBanners?.data}
                />
                <HomeFeatured
                    featuredBooks={getProducts?.data?.data?.featuredBooks}
                    banners={featuredBanners?.data}
                />
            </div>
        </section>
    )
}