import IconFooter from "@/components/Footer/IconFooter"
import { BadgeCheck, Gift, RotateCcw, Truck } from "lucide-react"

const TopOrangeBar = () => {
    return (
        <div className="bg-orange-500 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-4 text-sm">
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