import { Menu } from 'lucide-react'

const NavHeader = () => {
    return (
        <div className="bg-orange-500 text-white">
            <div className="container mx-auto px-4 flex items-center gap-6 h-12">
                <div className="flex items-center gap-2 font-semibold cursor-pointer">
                    <Menu className="h-5 w-5" />
                    <span>TẤT CẢ DANH MỤC</span>
                </div>

                <nav className="flex gap-6 text-sm font-medium">
                    <a className="hover:underline" href="#">Giới thiệu</a>
                    <a className="hover:underline" href="#">Tin tức</a>
                    <a className="hover:underline" href="#">Review sách</a>
                    <a className="hover:underline" href="#">Hợp tác</a>
                    <a className="hover:underline" href="#">Tra cứu đơn</a>
                </nav>
            </div>
        </div>
    )
}

export default NavHeader