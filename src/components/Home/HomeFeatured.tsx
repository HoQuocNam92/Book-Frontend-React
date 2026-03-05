import MySwiperComponent from '@/components/Swiper/Swiper'
import SwiperBanner from '@/components/Swiper/SwiperBanner'
import { Star } from 'lucide-react'

const HomeFeatured = ({ banners, featuredBooks }: { banners: any[], featuredBooks: any[] }) => {
    return (
        <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 p-6 mb-6">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-violet-500 to-purple-500" />
                    <h2 className="text-xl font-bold text-neutral-800">Sách nổi bật</h2>
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        <Star className="h-3 w-3" />
                        HOT
                    </span>
                </div>
                <button className="text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors">
                    Xem tất cả →
                </button>
            </div>

            <SwiperBanner data={banners} />
            <div className="mt-4">
                <MySwiperComponent data={featuredBooks} />
            </div>
        </div>
    )
}

export default HomeFeatured