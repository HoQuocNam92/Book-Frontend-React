import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
    ChevronLeft,
    ChevronRight,
    PhoneCall,
    ShieldCheck,
    RotateCcw,
    ShoppingCart,
} from "lucide-react"

type Product = {
    id: string
    name: string
    categoryPath: string[]
    price: number
    originalPrice?: number
    publisher?: string
    author?: string
    coverType?: string
    pages?: number
    size?: string
    publishYear?: number
    images: string[]
}

const formatVND = (n: number) =>
    new Intl.NumberFormat("vi-VN").format(n) + "đ"

export default function ProductDetailPage() {
    // mock data
    const product: Product = {
        id: "p1",
        name: "Tri Thức Về Vạn Vật - Bách Khoa Thư Trực Quan Về Vạn Vật",
        categoryPath: ["Trang chủ", "Tủ Sách Gia Đình", "Bách Khoa Thư"],
        price: 559200,
        originalPrice: 699000,
        publisher: "Dân trí",
        author: "DK Publishing",
        coverType: "Bìa cứng",
        pages: 362,
        size: "25,2 x 30,1cm",
        publishYear: 2024,
        images: [
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200&auto=format&fit=crop",
        ],
    }

    const related = [
        {
            id: "r1",
            name: "Britannica Thế Hệ Mới - Kho Tri Thức Về Trái Đất",
            price: 80000,
            old: 100000,
            image:
                "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
            discount: "-20%",
        },
        {
            id: "r2",
            name: "Britannica Thế Hệ Mới - Kho Tri Thức Về Vũ Trụ",
            price: 80000,
            old: 100000,
            image:
                "https://images.unsplash.com/photo-1524578271613-bffb3b4b3b0f?q=80&w=600&auto=format&fit=crop",
            discount: "-20%",
        },
        {
            id: "r3",
            name: "Britannica Thế Hệ Mới - Kho Tri Thức Về Vật Chất",
            price: 80000,
            old: 100000,
            image:
                "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
            discount: "-20%",
        },
    ]

    const buyTogether = [
        {
            id: "b1",
            name: "Tri Thức Về Vạn Vật",
            price: 559200,
            image: product.images[0],
        },
        {
            id: "b2",
            name: "Vạn Vật Vận Hành Như Thế Nào",
            price: 479200,
            image:
                "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: "b3",
            name: "Bách Khoa Thư Về Nghệ Thuật",
            price: 399200,
            image:
                "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop",
        },
    ]

    const [activeImage, setActiveImage] = React.useState(product.images[0])
    const [qty, setQty] = React.useState(1)

    const discount =
        product.originalPrice && product.originalPrice > product.price
            ? Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) *
                100
            )
            : 0

    const totalBuyTogether = buyTogether.reduce((sum, p) => sum + p.price, 0)

    const goPrev = () => {
        const idx = product.images.indexOf(activeImage)
        const next = idx <= 0 ? product.images.length - 1 : idx - 1
        setActiveImage(product.images[next])
    }

    const goNext = () => {
        const idx = product.images.indexOf(activeImage)
        const next = idx >= product.images.length - 1 ? 0 : idx + 1
        setActiveImage(product.images[next])
    }

    return (
        <div className="container bg-neutral-50">
            <div className="px-4 py-5">
                {/* breadcrumb */}
                <div className="mb-3 text-sm text-muted-foreground">
                    {product.categoryPath.map((x, i) => (
                        <span key={x}>
                            <span className={cn(i === product.categoryPath.length - 1 && "text-foreground")}>
                                {x}
                            </span>
                            {i !== product.categoryPath.length - 1 && (
                                <span className="mx-2">›</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* top layout */}
                <div className="grid grid-cols-12 gap-5">
                    {/* LEFT: gallery */}
                    <Card className="col-span-12 lg:col-span-5 rounded-2xl">
                        <CardContent className="p-4">
                            <div className="relative">
                                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-white">
                                    <img
                                        src={activeImage}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <button
                                    onClick={goPrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                <button
                                    onClick={goNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>

                            {/* thumbs */}
                            <div className="mt-4 flex gap-3">
                                {product.images.map((img) => (
                                    <button
                                        key={img}
                                        onClick={() => setActiveImage(img)}
                                        className={cn(
                                            "h-16 w-16 overflow-hidden rounded-lg border bg-white",
                                            activeImage === img
                                                ? "border-orange-500 ring-2 ring-orange-200"
                                                : "border-neutral-200 hover:border-neutral-300"
                                        )}
                                    >
                                        <img
                                            src={img}
                                            alt="thumb"
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* MIDDLE: info + price */}
                    <Card className="col-span-12 lg:col-span-4 rounded-2xl">
                        <CardContent className="p-5">
                            <h1 className="text-xl font-semibold leading-snug">
                                {product.name}
                            </h1>

                            <Separator className="my-4" />

                            {/* price */}
                            <div className="space-y-2">
                                <div className="flex items-end gap-3">
                                    <div className="text-3xl font-bold text-orange-600">
                                        {formatVND(product.price)}
                                    </div>

                                    {product.originalPrice && (
                                        <div className="pb-1 text-sm text-muted-foreground line-through">
                                            {formatVND(product.originalPrice)}
                                        </div>
                                    )}

                                    {discount > 0 && (
                                        <Badge className="bg-orange-500 hover:bg-orange-500">
                                            -{discount}%
                                        </Badge>
                                    )}
                                </div>

                                {product.originalPrice && (
                                    <div className="text-sm">
                                        Tiết kiệm:{" "}
                                        <span className="font-semibold">
                                            {formatVND(product.originalPrice - product.price)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* promo */}
                            <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
                                <div className="mb-2 font-semibold text-orange-700">
                                    KHUYẾN MÃI & ƯU ĐÃI
                                </div>

                                <ul className="space-y-3 text-sm text-neutral-700">
                                    {[
                                        "Kho tri thức khổng lồ – Hơn cả một cuốn sách, đây là kho tàng thông tin trực quan.",
                                        "Hình ảnh minh họa sống động – 100% in màu với chất lượng cao.",
                                        "Nội dung chuẩn xác – được kiểm duyệt bởi các hiệp hội uy tín.",
                                        "Phù hợp với mọi lứa tuổi.",
                                    ].map((x, i) => (
                                        <li key={x} className="flex gap-3">
                                            <span className="flex  w-6 h-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                                                {i + 1}
                                            </span>
                                            <span className="flex-1">{x}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* qty */}
                            <div className="mt-5 flex items-center gap-4">
                                <div className="w-20 text-sm font-medium">Số lượng:</div>

                                <div className="flex items-center overflow-hidden rounded-lg border bg-white">
                                    <button
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        className="h-10 w-10 border-r text-lg hover:bg-neutral-50"
                                    >
                                        -
                                    </button>

                                    <div className="h-10 w-12 text-center leading-10 font-semibold">
                                        {qty}
                                    </div>

                                    <button
                                        onClick={() => setQty((q) => q + 1)}
                                        className="h-10 w-10 border-l text-lg hover:bg-neutral-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-5">
                                <Button className="h-12 w-full rounded-xl bg-orange-500 text-base font-semibold hover:bg-orange-600">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    CHỌN MUA
                                </Button>

                                <div className="mt-3 rounded-xl border bg-neutral-50 p-3 text-center text-sm">
                                    <div className="text-muted-foreground">
                                        GỌI ĐẶT MUA:{" "}
                                        <span className="font-semibold text-orange-600">
                                            0932329959
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        (thứ 2 đến thứ 7 | 8:00 - 17:00)
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" />
                                        100% sách bản quyền
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RotateCcw className="h-4 w-4" />
                                        Đổi trả miễn phí*
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RIGHT: sidebar */}
                    <div className="col-span-12 lg:col-span-3 space-y-4">
                        {/* publisher */}
                        <Card className="rounded-2xl">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-neutral-100" />
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold">
                                            Einstein Books
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Phát hành
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="mt-3 w-full rounded-xl"
                                >
                                    Xem thêm
                                </Button>
                            </CardContent>
                        </Card>

                        {/* product specs */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Thông tin</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-2 text-sm">
                                <SpecRow label="Tác giả" value={product.author || "-"} />
                                <SpecRow label="Kích thước" value={product.size || "-"} />
                                <SpecRow label="Loại bìa" value={product.coverType || "-"} />
                                <SpecRow
                                    label="Số trang"
                                    value={product.pages ? String(product.pages) : "-"}
                                />
                                <SpecRow label="NXB" value={product.publisher || "-"} />
                                <SpecRow
                                    label="Năm XB"
                                    value={product.publishYear ? String(product.publishYear) : "-"}
                                />
                            </CardContent>
                        </Card>

                        {/* related */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Sách cùng chủ đề</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {related.map((r) => (
                                    <div
                                        key={r.id}
                                        className="flex gap-3 rounded-xl border p-2 hover:bg-neutral-50"
                                    >
                                        <div className="h-14 w-12 overflow-hidden rounded-lg bg-white">
                                            <img
                                                src={r.image}
                                                alt={r.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="line-clamp-2 text-xs font-medium">
                                                {r.name}
                                            </div>

                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="text-sm font-bold text-orange-600">
                                                    {formatVND(r.price)}
                                                </div>
                                                <div className="text-xs text-muted-foreground line-through">
                                                    {formatVND(r.old)}
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-orange-100 text-orange-700"
                                                >
                                                    {r.discount}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* BOTTOM sections */}
                <div className="mt-6 space-y-6">
                    {/* buy together */}
                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">THƯỜNG ĐƯỢC MUA CÙNG</CardTitle>
                        </CardHeader>

                        <CardContent className="p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                {/* items */}
                                <div className="flex flex-wrap items-center gap-4">
                                    {buyTogether.map((b, idx) => (
                                        <React.Fragment key={b.id}>
                                            <div className="flex items-center gap-3">
                                                <div className="h-20 w-16 overflow-hidden rounded-xl border bg-white">
                                                    <img
                                                        src={b.image}
                                                        alt={b.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="w-52">
                                                    <div className="line-clamp-2 text-sm font-medium">
                                                        {b.name}
                                                    </div>
                                                    <div className="mt-1 text-sm font-semibold text-orange-600">
                                                        {formatVND(b.price)}
                                                    </div>
                                                </div>
                                            </div>

                                            {idx !== buyTogether.length - 1 && (
                                                <div className="text-xl text-muted-foreground">+</div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                {/* total */}
                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        Tổng tiền:{" "}
                                        <span className="text-lg font-bold text-orange-600">
                                            {formatVND(totalBuyTogether)}
                                        </span>
                                    </div>

                                    <Button className="h-11 rounded-xl bg-orange-500 hover:bg-orange-600">
                                        THÊM 3 SP VÀO GIỎ HÀNG
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* description */}
                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">THÔNG TIN SẢN PHẨM</CardTitle>
                        </CardHeader>

                        <CardContent className="prose prose-neutral max-w-none p-5">
                            <p>
                                <strong>TRI THỨC VỀ VẠN VẬT</strong>: Bách khoa thư hình ảnh dành
                                cho mọi nhà – Nơi gói gọn cả thế giới trong một cuốn sách!
                            </p>

                            <p>
                                Bạn muốn hiểu thế giới xung quanh mà không cần ngập đầu trong sách
                                vở hay tìm kiếm tốn thời gian trên mạng? Đây là cuốn bách khoa
                                thư sinh động và dễ hiểu nhất giúp bạn – và cả gia đình – tiếp
                                cận kho tri thức khổng lồ của nhân loại chỉ trong một cuốn sách.
                            </p>

                            <p>
                                Nội dung được trình bày trực quan, hình ảnh sắc nét, bố cục đẹp,
                                phù hợp cho cả trẻ em lẫn người lớn.
                            </p>
                        </CardContent>
                    </Card>
                    {/* REVIEWS */}
                    <Card className="rounded-2xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">ĐÁNH GIÁ CỦA ĐỘC GIẢ</CardTitle>
                        </CardHeader>

                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">
                                Hãy đánh giá <span className="font-medium text-foreground">{product.name}</span>{" "}
                                để giúp những độc giả khác lựa chọn được cuốn sách phù hợp nhất!
                            </p>

                            <div className="mt-5 grid grid-cols-12 gap-6">
                                {/* LEFT: avg */}
                                <div className="col-span-12 md:col-span-3">
                                    <div className="text-5xl font-bold text-red-600">0/5</div>

                                    <div className="mt-2 flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} filled={false} />
                                        ))}
                                    </div>

                                    <div className="mt-2 text-sm text-muted-foreground">(0 đánh giá)</div>
                                </div>

                                {/* RIGHT: bars */}
                                <div className="col-span-12 md:col-span-9 space-y-3">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-3">
                                            <div className="flex w-10 items-center justify-end gap-1 text-sm">
                                                <span>{star}</span>
                                                <span className="text-yellow-500">★</span>
                                            </div>

                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
                                                <div className="h-full w-[0%] bg-orange-500" />
                                            </div>

                                            <div className="w-28 text-right text-sm text-muted-foreground">
                                                0% | 0 đánh giá
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* SEND REVIEW */}
                            <div>
                                <div className="text-sm font-semibold">GỬI ĐÁNH GIÁ CỦA BẠN</div>

                                <div className="mt-3 rounded-xl border bg-white p-4">
                                    <textarea
                                        placeholder="Viết bình luận của bạn tại đây."
                                        className="min-h-[140px] w-full resize-none rounded-lg border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-orange-500"
                                    />

                                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-sm font-medium">Đánh giá</div>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} filled />
                                                ))}
                                            </div>
                                        </div>

                                        <Button className="h-10 rounded-xl bg-orange-500 px-8 hover:bg-orange-600">
                                            GỬI
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* MINI PRODUCT BAR (like Fahasa) */}
                            <div className="mt-6 rounded-2xl border bg-neutral-50 p-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-20 w-16 overflow-hidden rounded-xl border bg-white">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <div className="text-base font-semibold">{product.name}</div>

                                            <div className="mt-1 flex items-end gap-3">
                                                <div className="text-2xl font-bold text-orange-600">
                                                    {formatVND(product.price)}
                                                </div>

                                                {product.originalPrice && (
                                                    <div className="pb-1 text-sm text-muted-foreground line-through">
                                                        {formatVND(product.originalPrice)}
                                                    </div>
                                                )}

                                                {discount > 0 && (
                                                    <Badge className="bg-orange-500 hover:bg-orange-500">
                                                        -{discount}%
                                                    </Badge>
                                                )}
                                            </div>

                                            {product.originalPrice && (
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    Tiết kiệm:{" "}
                                                    <span className="font-semibold text-foreground">
                                                        {formatVND(product.originalPrice - product.price)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                        <div className="flex items-center overflow-hidden rounded-xl border bg-white">
                                            <button
                                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                                className="h-10 w-10 border-r text-lg hover:bg-neutral-50"
                                            >
                                                -
                                            </button>

                                            <div className="h-10 w-12 text-center leading-10 font-semibold">
                                                {qty}
                                            </div>

                                            <button
                                                onClick={() => setQty((q) => q + 1)}
                                                className="h-10 w-10 border-l text-lg hover:bg-neutral-50"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <Button className="h-11 rounded-xl bg-orange-500 px-10 text-base font-semibold hover:bg-orange-600">
                                            CHỌN MUA
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}

function SpecRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0">
            <div className="text-muted-foreground">{label}</div>
            <div className="text-right font-medium">{value}</div>
        </div>
    )
}

function Star({ filled }: { filled?: boolean }) {
    return (
        <span
            className={cn(
                "text-lg",
                filled ? "text-yellow-400" : "text-neutral-300"
            )}
        >
            ★
        </span>
    )
}
