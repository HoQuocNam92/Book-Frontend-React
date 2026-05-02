import IconFooter from "@/components/Footer/IconFooter"
import { BadgeCheck, Gift, RotateCcw, Truck } from "lucide-react"

const TopOrangeBar = () => {
    return (
        <div className="bg-orange-500 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-3 text-sm sm:gap-6 sm:px-6 sm:py-4 md:grid-cols-2 lg:grid-cols-4">
                <IconFooter
                    icon={<RotateCcw className="w-6 h-6" />}
                    text="MIỄN PHÍ ĐỔI TRẢ NHANH CHÓNG"
                />
                <IconFooter
                    icon={<BadgeCheck className="w-6 h-6" />}
                    text="100% SÁCH CÓ BẢN QUYỀN"
                />
                <IconFooter
                    icon={<Truck className="w-6 h-6" />}
                    text="GIAO HÀNG TOÀN QUỐC"
                />
                <IconFooter
                    icon={<Gift className="w-6 h-6" />}
                    text="QUÀ TẶNG CHO ĐƠN HÀNG***"
                />
            </div>
        </div>
    )
}

export default TopOrangeBar