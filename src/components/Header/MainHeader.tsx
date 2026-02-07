import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
    return (
        <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2 min-w-[180px]">
                    <img src="/logo.png" alt="AlphaBooks" className="h-10" />
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                    <Input
                        placeholder="Tìm kiếm..."
                        className="pr-12 border-orange-400 focus-visible:ring-orange-400"
                    />
                    <Button
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-orange-500" />
                        <span>
                            Gọi đặt hàng <br />
                            <b>0932329959</b>
                        </span>
                    </div>

                    <Link to="/auth/sign-in" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-5 w-5" />
                        <span className="text-sm">Đăng nhập</span>
                    </Link>

                    <div className="relative cursor-pointer">
                        <ShoppingCart className="h-6 w-6" />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader