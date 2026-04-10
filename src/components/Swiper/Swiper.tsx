
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import HomeShelfBookCard from "@/components/Home/HomeShelfBookCard";
import { useNavigate } from 'react-router-dom';
import type { BookType } from '@/types/Book';

function MySwiperComponent({ data, options = true }: { data: BookType[], options?: boolean }) {
  const navigate = useNavigate()
  return (
    <div>
      <Swiper modules={[Pagination, Grid]}
        slidesPerView={5}
        spaceBetween={10}
        grid={!options ? {
          rows: 5,
          fill: 'row'
        } : undefined}

        pagination={options ? { clickable: true } : false}
        style={{ paddingBottom: '30px' }}
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