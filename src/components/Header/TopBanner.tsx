import { Button } from '@/components/ui/button'

const TopBanner = () => {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
            <div className="container mx-auto flex flex-col gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <img
                        src="/images/banner-books.png"
                        alt="Books"
                        className="hidden h-8 md:block"
                        width={32}
                        height={32}
                    />
                    <span className="text-balance text-xs font-semibold sm:text-sm md:text-base">
                        SÁCH MỚI XUẤT BẢN – FLASH SALE TỚI 50%
                    </span>
                </div>

                <Button className="w-full shrink-0 rounded-full bg-green-500 px-4 text-sm text-white hover:bg-green-600 sm:w-auto sm:px-5">
                    SỞ HỮU NGAY
                </Button>
            </div>
        </div>
    )
}

export default TopBanner