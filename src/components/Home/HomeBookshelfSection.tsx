import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Book = {
    id: string
    title: string
    image: string
    price: number
    oldPrice?: number
    discountPercent?: number
}

type ShelfTab = {
    id: string
    label: string
    books: Book[]
}

const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN").format(n) + "đ"

export default function HomeBookshelfSection() {
    // mock data giống ảnh
    const tabs: ShelfTab[] = [
        {
            id: "economy",
            label: "Kinh Tế Học",
            books: [
                {
                    id: "b1",
                    title: "Dầu và Máu - Mohammed Bin Salman Và Tham Vọng Tái Thiết...",
                    image:
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
                    price: 199200,
                    oldPrice: 249000,
                    discountPercent: 20,
                },
                {
                    id: "b2",
                    title: "Bước Đi Ngẫu Nhiên Trên Phố Wall – làm chủ tài chính cá nhân...",
                    image:
                        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
                    price: 199200,
                    oldPrice: 249000,
                    discountPercent: 20,
                },
                {
                    id: "b3",
                    title: "Bộ sách Cẩm Nang Mở Nhà Hàng – Những Chỉ Dẫn Từ A-Z...",
                    image:
                        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
                    price: 612800,
                    oldPrice: 766000,
                    discountPercent: 20,
                },
                {
                    id: "b4",
                    title: "Combo Tối Ưu Lợi Nhuận & Doanh Thu: Profit First + ...",
                    image:
                        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop",
                    price: 334400,
                    oldPrice: 418000,
                    discountPercent: 20,
                },
                {
                    id: "b5",
                    title: "Combo Đột Phá Dòng Tiền & Doanh Thu: Profit First + ...",
                    image:
                        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
                    price: 286400,
                    oldPrice: 358000,
                    discountPercent: 20,
                },
            ],
        },
        {
            id: "marketing",
            label: "Marketing - Bán Hàng",
            books: [
                {
                    id: "m1",
                    title: "Hook Point - Chạm đúng điểm bùng nổ tăng trưởng",
                    image:
                        "https://images.unsplash.com/photo-1524578271613-bffb3b4b3b0f?q=80&w=600&auto=format&fit=crop",
                    price: 159200,
                    oldPrice: 199000,
                    discountPercent: 20,
                },
                {
                    id: "m2",
                    title: "Bán hàng hiệu quả - Từ tư duy đến hành động",
                    image:
                        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
                    price: 143200,
                    oldPrice: 179000,
                    discountPercent: 20,
                },
                {
                    id: "m3",
                    title: "Nghệ thuật thuyết phục - Đọc vị khách hàng",
                    image:
                        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
                    price: 119200,
                    oldPrice: 149000,
                    discountPercent: 20,
                },
                {
                    id: "m4",
                    title: "Chiến lược Luxury - Định vị thương hiệu cao cấp",
                    image:
                        "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format&fit=crop",
                    price: 239200,
                    oldPrice: 299000,
                    discountPercent: 20,
                },
                {
                    id: "m5",
                    title: "Kỹ năng bán hàng thực chiến",
                    image:
                        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop",
                    price: 111200,
                    oldPrice: 139000,
                    discountPercent: 20,
                },
            ],
        },
        {
            id: "finance",
            label: "Tài Chính - Đầu Tư",
            books: [
                {
                    id: "f1",
                    title: "Tiền tệ thế kỷ 21",
                    image:
                        "https://images.unsplash.com/photo-1455885666463-44d2b7f4a9e1?q=80&w=600&auto=format&fit=crop",
                    price: 175200,
                    oldPrice: 219000,
                    discountPercent: 20,
                },
                {
                    id: "f2",
                    title: "Nhà đầu tư thông minh",
                    image:
                        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
                    price: 215200,
                    oldPrice: 269000,
                    discountPercent: 20,
                },
                {
                    id: "f3",
                    title: "Tâm lý học tiền",
                    image:
                        "https://images.unsplash.com/photo-1523475496153-3d6cc450b05f?q=80&w=600&auto=format&fit=crop",
                    price: 135200,
                    oldPrice: 169000,
                    discountPercent: 20,
                },
                {
                    id: "f4",
                    title: "Đầu tư tăng trưởng",
                    image:
                        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
                    price: 199200,
                    oldPrice: 249000,
                    discountPercent: 20,
                },
                {
                    id: "f5",
                    title: "Tài chính cá nhân cho người mới bắt đầu",
                    image:
                        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=600&auto=format&fit=crop",
                    price: 103200,
                    oldPrice: 129000,
                    discountPercent: 20,
                },
            ],
        },
    ]

    const [activeTab, setActiveTab] = React.useState(tabs[0].id)

    const currentTab = React.useMemo(
        () => tabs.find((t) => t.id === activeTab) || tabs[0],
        [tabs, activeTab]
    )

    // mũi tên left/right cho tab (giống ảnh)
    const tabIndex = tabs.findIndex((t) => t.id === activeTab)
    const canPrev = tabIndex > 0
    const canNext = tabIndex < tabs.length - 1

    const goPrevTab = () => {
        if (!canPrev) return
        setActiveTab(tabs[tabIndex - 1].id)
    }

    const goNextTab = () => {
        if (!canNext) return
        setActiveTab(tabs[tabIndex + 1].id)
    }

    return (
        <section className="w-full">
            <div className="mx-auto w-full max-w-6xl px-4">
                <Card className="overflow-hidden rounded-2xl border-neutral-200">
                    {/* TOP BAR (tabs) */}
                    <div className="flex items-center border-b bg-white">
                        <div className="flex h-11 items-center bg-orange-500 px-4 text-sm font-semibold text-white">
                            SÁCH KINH TẾ - TÀI CHÍNH
                        </div>

                        <div className="ml-auto flex items-center gap-2 px-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goPrevTab}
                                disabled={!canPrev}
                                className="h-9 w-9 rounded-full"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>

                            <div className="flex items-center gap-1">
                                {tabs.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setActiveTab(t.id)}
                                        className={cn(
                                            "h-11 px-4 text-sm font-medium transition",
                                            t.id === activeTab
                                                ? "text-orange-600"
                                                : "text-neutral-700 hover:text-neutral-900"
                                        )}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={goNextTab}
                                disabled={!canNext}
                                className="h-9 w-9 rounded-full"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* BANNER */}
                    <div className="grid grid-cols-12 bg-[#f7d9a7]">
                        {/* left text */}
                        <div className="col-span-12 lg:col-span-6 p-6 lg:p-10">
                            <div className="text-4xl font-extrabold tracking-tight text-orange-600 lg:text-5xl">
                                TỦ SÁCH
                                <br />
                                KINH TẾ TÀI CHÍNH
                            </div>

                            <div className="mt-4 max-w-md text-xl font-medium text-neutral-700">
                                Tuyển tập sách hàng đầu cho giới doanh nhân
                            </div>
                        </div>

                        {/* right image */}
                        <div className="col-span-12 lg:col-span-6 relative flex items-end justify-center p-4 lg:p-8">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-orange-200/60" />
                                <img
                                    alt="banner books"
                                    src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop"
                                    className="relative mx-auto h-44 w-full max-w-md rounded-2xl object-cover shadow"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 border-t md:grid-cols-3 lg:grid-cols-5">
                            {currentTab.books.slice(0, 5).map((b, idx) => (
                                <HomeShelfBookCard
                                    key={b.id}
                                    book={b}
                                    className={cn(
                                        "border-neutral-200",
                                        idx !== 4 && "lg:border-r",
                                        idx % 2 === 0 ? "border-r" : "",
                                        idx < 3 ? "md:border-r" : "",
                                        idx < 4 ? "lg:border-r" : ""
                                    )}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

function HomeShelfBookCard({
    book,
    className,
}: {
    book: Book
    className?: string
}) {
    return (
        <div className={cn("group border-r border-neutral-200 p-4", className)}>
            <div className="mx-auto w-full max-w-[150px]">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                    />
                </div>
            </div>

            <div className="mt-3 line-clamp-2 min-h-[40px] text-sm font-medium text-neutral-800">
                {book.title}
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-2">
                {book.oldPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                        {formatVND(book.oldPrice)}
                    </div>
                )}

                <div className="text-base font-bold text-orange-600">
                    {formatVND(book.price)}
                </div>

                {book.discountPercent && book.discountPercent > 0 && (
                    <Badge className="bg-orange-500 hover:bg-orange-500">
                        -{book.discountPercent}%
                    </Badge>
                )}
            </div>
        </div>
    )
}
