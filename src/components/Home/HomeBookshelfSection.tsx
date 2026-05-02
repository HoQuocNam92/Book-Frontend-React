import HomeMain from "@/components/Home/HomeMain"
import HomeServicesSection from "@/components/Home/HomeServicesSection"
import { useProducts } from "@/hooks/useProducts"
import { useBanners } from "@/hooks/useBanners"

export default function HomeBookshelfSection() {
    const { getProducts } = useProducts("all")
    const { getBanners: salesBanners } = useBanners("sales")
    const { getBanners: newBanners } = useBanners("new")
    const { getBanners: featuredBanners } = useBanners("featured")

    return (
        <section className="py-6">
            <div className="mx-auto w-full container space-y-2 px-4">
                <HomeServicesSection />
                <HomeMain
                    books={getProducts?.data?.data?.discountBooks ?? []}
                    banners={salesBanners?.data ?? []}
                    title="Sách khuyến mãi"
                    isLoading={!!getProducts?.isLoading || !!salesBanners?.isLoading}
                    isError={!!getProducts?.error || !!salesBanners?.error}
                />
                <HomeMain
                    books={getProducts?.data?.data?.newBooks ?? []}
                    banners={newBanners?.data ?? []}
                    title="Sách mới"
                    isLoading={!!getProducts?.isLoading || !!newBanners?.isLoading}
                    isError={!!getProducts?.error || !!newBanners?.error}
                />
                <HomeMain
                    books={getProducts?.data?.data?.featuredBooks ?? []}
                    banners={featuredBanners?.data ?? []}
                    title="Sách nổi bật"
                    isLoading={!!getProducts?.isLoading || !!featuredBanners?.isLoading}
                    isError={!!getProducts?.error || !!featuredBanners?.error}
                />
            </div>
        </section>
    )
}
