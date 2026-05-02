import MySwiperComponent from "@/components/Swiper/Swiper"
import SwiperBanner from "@/components/Swiper/SwiperBanner"
import HomeSectionSkeleton from "@/components/Home/HomeSectionSkeleton"
import type { BookType } from "@/types/Book"
import { Sparkles } from "lucide-react"

const HomeMain = ({
    banners,
    books,
    title,
    isLoading,
    isError,
}: {
    banners: any[]
    books: BookType[]
    title: string
    isLoading?: boolean
    isError?: boolean
}) => {
    const type =
        title === "Sách khuyến mãi" ? "sales" : title === "Sách mới" ? "new" : "featured"

    if (isLoading) {
        return <HomeSectionSkeleton />
    }

    if (isError) {
        return (
            <div className="mb-6 rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/80 p-8 text-center text-sm text-muted-foreground">
                Không tải được nội dung « {title} ». Vui lòng thử làm mới trang.
            </div>
        )
    }

    return (
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50 p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                    <div className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                    <h2 className="text-lg font-bold text-neutral-800 sm:text-xl">{title}</h2>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {type}
                    </span>
                </div>
                <button
                    type="button"
                    className="shrink-0 self-start text-sm font-medium text-indigo-500 transition-colors hover:text-indigo-600 sm:self-auto"
                >
                    Xem tất cả →
                </button>
            </div>

            <SwiperBanner data={banners} />
            <div className="mt-4">
                <MySwiperComponent data={books} />
            </div>
        </div>
    )
}

export default HomeMain