import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '../../types/Book';
import SwiperBanner from '@/components/Swiper/SwiperBanner';


const HomeSales = ({ banners, discountBooks }: { banners: any[], discountBooks: BookType[] }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-neutral-800">Sách giảm giá</h2>
            <SwiperBanner data={banners} />
            <MySwiperComponent data={discountBooks} />
        </div>
    )
}

export default HomeSales