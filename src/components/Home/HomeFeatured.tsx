import MySwiperComponent from '@/components/Swiper/Swiper'
import SwiperBanner from '@/components/Swiper/SwiperBanner'

const HomeFeatured = ({ banners, featuredBooks }: { banners: any[], featuredBooks: any[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách nổi bật</h2>
            </div>
            <SwiperBanner data={banners} />
            <MySwiperComponent data={featuredBooks} />
        </>
    )
}

export default HomeFeatured