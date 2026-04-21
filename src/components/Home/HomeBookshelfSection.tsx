
import { SpinnerCustom } from "@/components/ui/spinner"
import { useProducts } from "@/hooks/useProducts"
import HomeMain from "@/components/Home/HomeMain"
import { useBanners } from "@/hooks/useBanners"




export default function HomeBookshelfSection() {
    const { getProducts } = useProducts("all")

    const { getBanners: salesBanners } = useBanners("sales")
    const { getBanners: newBanners } = useBanners("new")
    const { getBanners: featuredBanners } = useBanners("featured")
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
    console.log("salesBanners", featuredBanners?.data)

    return (
        <section className="py-6">
            <div className="mx-auto w-full container px-4 space-y-2">
                <HomeMain
                    books={getProducts?.data?.data?.discountBooks}
                    banners={salesBanners?.data}
                    title="Sách khuyến mãi"
                />
                <HomeMain
                    books={getProducts?.data?.data?.newBooks}
                    banners={newBanners?.data}
                    title="Sách mới"
                />
                <HomeMain
                    books={getProducts?.data?.data?.featuredBooks}
                    banners={featuredBanners?.data}
                    title="Sách nổi bật"
                />
            </div>
        </section>
    )
}