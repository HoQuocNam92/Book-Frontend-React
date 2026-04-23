import { Button } from '@/components/ui/button'

const TopBanner = () => {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/banner-books.png"
                        alt="Books"
                        className="h-8 hidden md:block"
                        width={32}
                        height={32}
                    />
                    <span className="font-semibold text-sm md:text-base">
                        SÁCH MỚI XUẤT BẢN – FLASH SALE TỚI 50%
                    </span>
                </div>

                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-5">
                    SỞ HỮU NGAY
                </Button>
            </div>
        </div>
    )
}

export default TopBanner