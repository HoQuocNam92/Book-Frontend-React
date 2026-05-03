import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MainFooter = () => {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 text-sm text-gray-700 sm:gap-10 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
            <div className="space-y-4">
                <img
                    src="/logo-alphabooks.png"
                    alt="Alpha Books"
                    className="h-10"
                    width={120}
                    height={40}
                />
                <ul className="space-y-2 ">
                    <li>› Bán hàng Online</li>
                    <li>› Chăm sóc Khách Hàng</li>
                </ul>

                <div>
                    <p className="font-semibold mb-2">
                        Đăng ký nhận khuyến mãi
                    </p>
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
                        <Input
                            placeholder="Địa chỉ email"
                            className="min-w-0 rounded-md sm:rounded-r-none"
                        />
                        <Button className="shrink-0 bg-orange-500 hover:bg-orange-600 sm:rounded-l-none">
                            Gửi
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-4">
                    Hỗ trợ khách hàng
                </h4>
                <ul className="space-y-2">
                    <li>› Chính sách bảo mật</li>
                    <li>› Hướng dẫn mua hàng</li>
                    <li>› Chính sách đổi, trả</li>
                    <li>› Chính sách khách sỉ</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-4">Liên hệ</h4>
                <ul className="space-y-2">
                    <li>› Hotline: 0932329959</li>
                    <li>› Fb: m.me/nhasachAlphaBooks</li>
                    <li>› Email: cskh@alphabooks.vn</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-4">Danh mục</h4>
                <ul className="space-y-2">
                    <li>› Sách tư duy - kỹ năng</li>
                    <li>› Sách kinh tế</li>
                    <li>› Sách lịch sử</li>
                </ul>
            </div>
        </div>
    )
}

export default MainFooter