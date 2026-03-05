import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '../../types/Book';
import SwiperBanner from '@/components/Swiper/SwiperBanner';
import { Flame } from 'lucide-react';


const HomeSales = ({ banners, discountBooks }: { banners: any[], discountBooks: BookType[] }) => {
    return (
        <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 p-6 mb-6">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-red-500 to-orange-400" />
                    <h2 className="text-xl font-bold text-neutral-800">Sách giảm giá</h2>
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        <Flame className="h-3 w-3" />
                        SALE
                    </span>
                </div>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">
                    Xem tất cả →
                </button>
            </div>

            <SwiperBanner data={banners} />
            <div className="mt-4">
                <MySwiperComponent data={discountBooks} />
            </div>
        </div>
    )
}

export default HomeSales