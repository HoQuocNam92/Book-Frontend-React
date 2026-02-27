import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '@/types/Book'

const HomeMain = ({ newBooks }: { newBooks: BookType[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách mới</h2>
            </div>
            <MySwiperComponent data={newBooks} />
        </>
    )
}

export default HomeMain