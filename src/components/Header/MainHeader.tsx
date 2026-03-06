import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Search, ShoppingCart, User, X, Loader2, BookOpen, Tag, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.stores';
import { useCartStore } from '@/stores/cart.stores';
import { getCartItemCount } from '@/services/cart.services';
import useAuth from '@/hooks/useAuth';
import { useSearch } from '@/hooks/useSearch';

const MainHeader = () => {
    const user = useAuthStore((s) => s.user);
    const { itemCount } = useCartStore();
    const setItemCount = useCartStore((s) => s.setItemCount);
    const { signOutMutation } = useAuth();
    const navigate = useNavigate();

    const {
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        isLoading,
        books,
        categories,
        authors,
        hasResults,
        containerRef,
        clearSearch,
    } = useSearch();

    const handleSignOut = async () => {
        try {
            const res = await signOutMutation.mutateAsync();
            alert(res.message || 'Đăng xuất thành công');
        } catch (error) {
            alert('Đăng xuất thất bại');
        }
    };

    useEffect(() => {
        if (user) {
            getCartItemCount()
                .then((res) => setItemCount(res.data ?? 0))
                .catch(() => { });
        }
    }, [user]);

    const handleBookClick = (slug: string) => {
        navigate(`/${slug}`);
        clearSearch();
    };

    const handleCategoryClick = (slug: string) => {
        navigate(`/danh-muc/${slug}`);
        clearSearch();
    };

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
                <div className="flex-1 relative" ref={containerRef}>
                    <Input
                        placeholder="Tìm kiếm sách, tác giả, thể loại..."
                        className="pr-12 border-orange-400 focus-visible:ring-orange-400"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => inputValue.trim().length >= 2 && setIsOpen(true)}
                    />
                    {inputValue ? (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={clearSearch}
                            className="absolute right-10 top-1/2 -translate-y-1/2 h-8 w-8"
                        >
                            <X className="h-3.5 w-3.5" />
                        </Button>
                    ) : null}
                    <Button
                        size="icon"
                        className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Search Dropdown */}
                    {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-[480px] overflow-y-auto">
                            {isLoading && (
                                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Đang tìm kiếm...
                                </div>
                            )}

                            {!isLoading && !hasResults && (
                                <div className="py-8 text-center text-sm text-muted-foreground">
                                    Không tìm thấy kết quả nào
                                </div>
                            )}

                            {/* Books */}
                            {books.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        Sách ({books.length})
                                    </div>
                                    {books.map((book: any) => (
                                        <button
                                            key={book.id}
                                            onClick={() => handleBookClick(book.slug)}
                                            className="w-full text-left px-4 py-2.5 hover:bg-orange-50 transition flex items-center gap-3"
                                        >
                                            <BookOpen className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                            <span className="text-sm line-clamp-1">{book.title}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Categories */}
                            {categories.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t">
                                        <Tag className="h-3.5 w-3.5" />
                                        Danh mục ({categories.length})
                                    </div>
                                    {categories.map((cat: any) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryClick(cat.slug)}
                                            className="w-full text-left px-4 py-2.5 hover:bg-orange-50 transition flex items-center gap-3"
                                        >
                                            <Tag className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                            <span className="text-sm">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Authors */}
                            {authors.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t">
                                        <User2 className="h-3.5 w-3.5" />
                                        Tác giả ({authors.length})
                                    </div>
                                    {authors.map((author: any) => (
                                        <div
                                            key={author.id}
                                            className="px-4 py-2.5 flex items-center gap-3"
                                        >
                                            <User2 className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                            <span className="text-sm">{author.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
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