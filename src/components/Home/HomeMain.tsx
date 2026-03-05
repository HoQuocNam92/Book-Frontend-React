import MySwiperComponent from '@/components/Swiper/Swiper'
import SwiperBanner from '@/components/Swiper/SwiperBanner'
import type { BookType } from '@/types/Book'

const HomeMain = ({ banners, newBooks }: { banners: any[], newBooks: BookType[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách mới</h2>
            </div>
            <SwiperBanner data={banners} />
            <MySwiperComponent data={newBooks} />
        </>
    )
}

export default HomeMain