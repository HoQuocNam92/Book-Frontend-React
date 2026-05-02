import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import type { BookType } from "@/types/Book"
import { LazyImage } from "@/components/common/LazyImage"

const SwiperBanner = ({ data }: { data: BookType[] }) => {
    return (
        <div className="min-h-[240px] w-full md:min-h-[384px]">
            <Swiper modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }}>
                {data?.map((item: any, index) => (
                    <SwiperSlide key={item.id}>
                        <LazyImage
                            src={item.image_url}
                            alt={`Banner ${index + 1}`}
                            priority={index === 0}
                            cdnMaxWidth={1280}
                            sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
                            className="h-[240px] w-full rounded-lg md:h-96"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperBanner