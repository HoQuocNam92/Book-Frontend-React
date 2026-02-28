import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '../../types/Book';


const HomeSales = ({ banners, discountBooks }: { banners: any[], discountBooks: BookType[] }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-neutral-800">Sách giảm giá</h2>
            {banners && banners.length > 0 && (
                <div className="my-4">
                    {banners.map((banner, index) => (
                        <img key={index} src={banner.image_url} alt={`Banner ${index}`} className="w-full h-48 object-cover rounded-lg" />
                    ))}
                </div>
            )}
            <MySwiperComponent data={discountBooks} />
        </div>
    )
}

export default HomeSales