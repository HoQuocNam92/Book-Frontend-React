import MySwiperComponent from '@/components/Swiper/Swiper'
import SwiperBanner from '@/components/Swiper/SwiperBanner'
import type { BookType } from '@/types/Book'
import { Sparkles } from 'lucide-react'

const HomeMain = ({ banners, newBooks }: { banners: any[], newBooks: BookType[] }) => {
    return (
        <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50 p-6 mb-6">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                    <h2 className="text-xl font-bold text-neutral-800">Sách mới</h2>
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        NEW
                    </span>
                </div>
                <button className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors">
                    Xem tất cả →
                </button>
            </div>

            <SwiperBanner data={banners} />
            <div className="mt-4">
                <MySwiperComponent data={newBooks} />
            </div>
        </div>
    )
}

export default HomeMain