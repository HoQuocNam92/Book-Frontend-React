import MySwiperComponent from '@/components/Swiper/Swiper'

const HomeSoldest = ({ bestSellerBooks }: { bestSellerBooks: any[] }) => {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-neutral-800">Sách bán chạy</h2>
            </div>
            <MySwiperComponent data={bestSellerBooks} />
        </>
    )
}

export default HomeSoldest