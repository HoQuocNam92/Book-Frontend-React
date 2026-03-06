import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.stores';
import { useCartStore } from '@/stores/cart.stores';
import { getCartItemCount } from '@/services/cart.services';
import useAuth from '@/hooks/useAuth';

const MainHeader = () => {
    const user = useAuthStore((s) => s.user);
    const { itemCount } = useCartStore();
    const setItemCount = useCartStore((s) => s.setItemCount);
    const { signOutMutation } = useAuth();
    const handleSignOut = async () => {
        try {
            const res = await signOutMutation.mutateAsync();
            alert(res.message || 'Đăng xuất thành công');
        } catch (error) {
            alert('Đăng xuất thất bại');
        }
    }
    useEffect(() => {
        if (user) {
            getCartItemCount()
                .then((res) => setItemCount(res.data ?? 0))
                .catch(() => { });
        }
    }, [user]);

    return (
        <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2 min-w-[180px]">
                    <Link to="/">
                        <img src="/images/logo.png" alt="AlphaBooks" className="h-10" />
                    </Link>
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                    <Input
                        placeholder="Tìm kiếm..."
                        className="pr-12 border-orange-400 focus-visible:ring-orange-400"
                    />
                    <Button
                        size="icon"
                        className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
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
                            <b>0387901461</b>
                        </span>
                    </div>

                    {user ? (
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <User className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    {user.name || 'Tài khoản'}
                                </span>
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <Link
                                    to="/ho-so"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Hồ sơ
                                </Link>

                                <Link
                                    to="/ho-so?tab=orders"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Đơn hàng
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth/sign-in" className="flex items-center gap-2 cursor-pointer">
                            <User className="h-5 w-5" />
                            <span className="text-sm">Đăng nhập</span>
                        </Link>
                    )}

                    <Link to="/gio-hang" className="relative cursor-pointer">
                        <ShoppingCart className="h-6 w-6" />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainHeader