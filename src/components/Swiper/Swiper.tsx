
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import HomeShelfBookCard from "@/components/Home/HomeShelfBookCard";
import { useNavigate } from 'react-router-dom';
import type { BookType } from '@/types/Book';

function MySwiperComponent({ data }: { data: BookType[] }) {
  const navigate = useNavigate()
  return (
    <div>
      <Swiper modules={[Pagination]}
        slidesPerView={5}
        pagination={{ clickable: true }}
      >
        {data?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <HomeShelfBookCard book={item} onClick={() => navigate(`/${item.slug}`)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MySwiperComponent