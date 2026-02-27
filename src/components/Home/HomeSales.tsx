import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '../../types/Book';


const HomeSales = ({ discountBooks }: { discountBooks: BookType[] }) => {
    return (
        <div>
            <div className="my-4 flex items-center gap-2">
                <h2>Sách sale</h2>
            </div>
            <MySwiperComponent data={discountBooks} />
        </div>
    )
}

export default HomeSales