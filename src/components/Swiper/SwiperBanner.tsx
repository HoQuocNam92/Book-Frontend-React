
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import type { BookType } from '@/types/Book';

const SwiperBanner = ({ data }: { data: BookType[] }) => {
    return (
        <div>
            <Swiper modules={[Pagination]}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {data?.map((item: any, index) => (
                    <SwiperSlide key={item.id}>
                        <img key={index} src={item.image_url} alt={`Banner ${index}`} className="w-full h-96 object-cover rounded-lg " />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperBanner