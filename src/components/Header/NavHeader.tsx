import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom';

const NavHeader = () => {
    return (
        <div className="bg-orange-500 text-white">
            <div className="container mx-auto flex min-h-12 flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 sm:px-4 md:h-12 md:flex-nowrap md:gap-6 md:py-0">
                <div className="flex min-w-0 cursor-pointer items-center gap-2 font-semibold">
                    <Menu className="h-5 w-5 shrink-0" />
                    <span className="truncate">
                        <Link to="/danh-muc">TẤT CẢ DANH MỤC</Link>
                    </span>
                </div>

                <nav className="flex w-full min-w-0 flex-wrap gap-x-4 gap-y-1 text-sm font-medium md:w-auto md:flex-nowrap md:gap-6">
                    <a className="hover:underline" href="#">Giới thiệu</a>
                    <Link className="hover:underline" to="/tin-tuc">Tin tức</Link>
                    <a className="hover:underline" href="#">Hợp tác</a>
                </nav>
            </div>
        </div>
    )
}

export default NavHeader