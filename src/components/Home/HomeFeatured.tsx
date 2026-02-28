import MySwiperComponent from '@/components/Swiper/Swiper'
import { Link } from 'react-router-dom'

const HomeFeatured = ({ banners, featuredBooks }: { banners: any[], featuredBooks: any[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách nổi bật</h2>
            </div>
            {banners && banners.length > 0 && (
                <div className="my-4">
                    {banners.map((banner, index) => (
                        <Link to={banner.link_url} key={index}>
                            <img src={banner.image_url} alt={`Banner ${index}`} className="w-full h-48 object-cover rounded-lg" />
                        </Link>
                    ))}
                </div>
            )}
            <MySwiperComponent data={featuredBooks} />
        </>
    )
}

export default HomeFeatured