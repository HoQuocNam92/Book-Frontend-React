import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Search, ShoppingCart, User, X, Loader2, BookOpen } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { useCartStore } from "@/stores/cart.stores"
import { getCartItemCount } from "@/services/cart.services"
import useAuth from "@/hooks/useAuth"
import { useSuggestion } from "@/hooks/useSuggestion"

const MainHeader = () => {
    const user = useAuthStore((s) => s.user)
    const { itemCount } = useCartStore()
    const setItemCount = useCartStore((s) => s.setItemCount)
    const { signOutMutation } = useAuth()
    const navigate = useNavigate()
    const containerRef = useRef<HTMLDivElement>(null)
    const userMenuMobileRef = useRef<HTMLDivElement>(null)
    const [inputValue, setInputValue] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const { suggestions, isLoading, isError } = useSuggestion(inputValue)
    const handleSignOut = async () => {
        try {
            const res = await signOutMutation.mutateAsync()
            alert(res.message || "Đăng xuất thành công")
            setUserMenuOpen(false)
        } catch {
            alert("Đăng xuất thất bại")
        }
    }
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
            if (
                userMenuMobileRef.current &&
                !userMenuMobileRef.current.contains(e.target as Node)
            ) {
                setUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    useEffect(() => {
        if (user) {
            getCartItemCount()
                .then((res) => setItemCount(res.data ?? 0))
                .catch(() => {})
        }
    }, [user, setItemCount])
    const clearSearch = () => {
        setInputValue("")
        setIsOpen(false)
    }

    const handleBookClick = (slug: string) => {
        navigate(`/${slug}`)
        clearSearch()
    }

    const handleSearch = () => {
        if (inputValue.trim().length >= 2) {
            navigate(`/tim-kiem?q=${encodeURIComponent(inputValue.trim())}`)
            clearSearch()
        }
    }
    return (
        <div className="bg-white border-b">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:gap-4 md:py-4">
                    {/* Hàng 1 mobile: logo + giỏ + đăng nhập / menu tài khoản */}
                    <div className="flex items-center justify-between gap-2 md:contents">
                        <div className="flex min-w-0 shrink-0 items-center gap-2 md:min-w-[140px] lg:min-w-[180px]">
                            <Link to="/" className="block shrink-0">
                                <img
                                    src="/images/logo.png"
                                    alt="AlphaBooks"
                                    className="h-9 w-auto max-w-[110px] sm:h-10 sm:max-w-[120px]"
                                    width={120}
                                    height={40}
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            </Link>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:hidden">
                            {user ? (
                                <div className="relative" ref={userMenuMobileRef}>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10"
                                        aria-expanded={userMenuOpen}
                                        aria-haspopup="true"
                                        onClick={() => setUserMenuOpen((o) => !o)}
                                    >
                                        <User className="h-5 w-5" />
                                    </Button>
                                    {userMenuOpen && (
                                        <div className="absolute right-0 z-50 mt-1 w-48 rounded-xl border bg-white py-1 shadow-lg">
                                            <Link
                                                to="/ho-so"
                                                className="block px-4 py-2.5 text-sm hover:bg-muted/80"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Hồ sơ
                                            </Link>
                                            <Link
                                                to="/ho-so?tab=orders"
                                                className="block px-4 py-2.5 text-sm hover:bg-muted/80"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Đơn hàng
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={handleSignOut}
                                                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-muted/80"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/auth/sign-in"
                                    aria-label="Đăng nhập"
                                    className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted/60"
                                >
                                    <User className="h-5 w-5 shrink-0" />
                                    <span className="hidden sm:inline">Đăng nhập</span>
                                </Link>
                            )}
                            <Link
                                to="/gio-hang"
                                className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted/60"
                                aria-label="Giỏ hàng"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {itemCount > 0 && (
                                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                        {itemCount > 99 ? "99+" : itemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Tìm kiếm — full width mobile, còn lại desktop */}
                    <div className="relative min-w-0 flex-1" ref={containerRef}>
                        <Input
                            placeholder="Tìm sách, tác giả…"
                            className="h-10 border-orange-400 pr-20 focus-visible:ring-orange-400 sm:pr-24 md:h-11"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                setIsOpen(e.target.value.trim().length >= 2)
                            }}
                            onFocus={() => inputValue.trim().length >= 2 && setIsOpen(true)}
                        />
                        {inputValue ? (
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={clearSearch}
                                className="absolute right-11 top-1/2 h-8 w-8 -translate-y-1/2 sm:right-12"
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        ) : null}
                        <Button
                            type="button"
                            size="icon"
                            className="absolute right-0.5 top-1/2 h-9 w-9 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 sm:h-10 sm:w-10"
                            onClick={handleSearch}
                            aria-label="Tìm kiếm"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                        </Button>

                        {isOpen && (
                            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(70vh,480px)] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                                {isLoading && (
                                    <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Đang tìm kiếm...
                                    </div>
                                )}

                                {!isLoading && !suggestions.length && (
                                    <div className="py-8 text-center text-sm text-muted-foreground">
                                        Không tìm thấy kết quả nào
                                    </div>
                                )}
                                {isError && (
                                    <div className="py-8 text-center text-sm text-red-500">
                                        Có lỗi xảy ra khi tìm kiếm
                                    </div>
                                )}

                                {suggestions.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            Sách ({suggestions.length})
                                        </div>
                                        {suggestions.map((book: { id: number; slug: string; title: string }) => (
                                            <button
                                                key={book.id}
                                                type="button"
                                                onClick={() => handleBookClick(book.slug)}
                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-orange-50"
                                            >
                                                <BookOpen className="h-4 w-4 shrink-0 text-orange-400" />
                                                <span className="line-clamp-2 text-sm">{book.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Desktop: hotline + user + giỏ */}
                    <div className="hidden shrink-0 items-center gap-4 lg:gap-6 md:flex">
                        <div className="hidden items-center gap-2 text-sm lg:flex">
                            <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                            <span>
                                Gọi đặt hàng <br />
                                <b>0387901461</b>
                            </span>
                        </div>

                        {user ? (
                            <div className="group relative">
                                <div className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 hover:bg-muted/50">
                                    <User className="h-5 w-5 shrink-0" />
                                    <span className="max-w-[120px] truncate text-sm font-medium lg:max-w-none">
                                        {user.name || "Tài khoản"}
                                    </span>
                                </div>

                                <div className="invisible absolute right-0 z-50 mt-2 w-48 rounded-xl border bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                    <Link to="/ho-so" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                        Hồ sơ
                                    </Link>
                                    <Link to="/ho-so?tab=orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                        Đơn hàng
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth/sign-in" className="flex cursor-pointer items-center gap-2">
                                <User className="h-5 w-5" />
                                <span className="text-sm">Đăng nhập</span>
                            </Link>
                        )}

                        <Link to="/gio-hang" className="relative cursor-pointer p-1">
                            <ShoppingCart className="h-6 w-6" />
                            {itemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader
