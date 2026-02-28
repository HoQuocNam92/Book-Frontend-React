import MySwiperComponent from '@/components/Swiper/Swiper'
import type { BookType } from '@/types/Book'

const HomeMain = ({ banners, newBooks }: { banners: string[], newBooks: BookType[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách mới</h2>
            </div>
            {banners && banners.length > 0 && (
                <div className="my-4">
                    {banners.map((banner, index) => (
                        <img key={index} src={banner} alt={`Banner ${index}`} className="w-full h-48 object-cover rounded-lg" />
                    ))}
                </div>
            )}
            <MySwiperComponent data={newBooks} />
        </>
    )
}

export default HomeMain