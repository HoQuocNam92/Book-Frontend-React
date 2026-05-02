import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Grid } from "swiper/modules"

import HomeShelfBookCard from "@/components/Home/BookCards"
import { useNavigate } from 'react-router-dom';
import type { BookType } from '@/types/Book';

function MySwiperComponent({ data, options = true }: { data: BookType[], options?: boolean }) {
  const navigate = useNavigate()
  return (
    <div>
      <Swiper modules={[Pagination, Grid]}
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
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