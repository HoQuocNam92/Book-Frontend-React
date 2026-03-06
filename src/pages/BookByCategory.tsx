import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { BookType } from "@/types/Book";
import BookList from "@/components/Books/BookList";

import { useProducts } from "@/hooks/useProducts";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import BrandRow from "@/components/Books/BrandRow";
import SliderPrice from "@/components/Books/SliderPrice";
import { useCategories } from "@/hooks/useCategories";
import { FolderOpen } from "lucide-react";

const brands = [
    "Omega+",
    "Huy Hoàng Books",
    "Saigon Books",
    "AlphaBooks",
    "First News",
    "Nhã Nam",
    "Thái Hà",
    "NXB Trẻ",
];

export default function BookByCategory() {
    const { getProductByCategory, pageNumber, setPageNumber } = useProducts();
    const { getCategories } = useCategories();
    const { category_slug } = useParams();
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const min = 0;
    const max = 1_000_000;
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1_000_000]);

    const allCategories: any[] = getCategories.data?.data || getCategories.data || [];

    if (getProductByCategory.isLoading) { return <SpinnerCustom />; }
    if (getProductByCategory.error) { navigate('/oops'); }

    const filtered: BookType[] = getProductByCategory?.data?.data?.filter((b: BookType) => {
        const okBrand = selectedBrand ? true : true;
        const okPrice = b.price! >= priceRange[0] && b.price! <= priceRange[1];
        return okBrand && okPrice;
    });

    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <main className="mx-auto max-w-6xl px-4 py-6">
                {/* Filter Bar */}
                <Card className="rounded-xl">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                            <div className="md:col-span-2 text-sm text-muted-foreground">
                                Khoảng giá
                            </div>
                            <SliderPrice priceRange={priceRange} min={min} max={max} setPriceRange={setPriceRange} />
                            <Separator className="md:col-span-12" />
                            <BrandRow brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                        </div>
                    </CardContent>
                </Card>

                {/* Content with Sidebar */}
                <div className="mt-6 flex gap-6">
                    {/* Category Sidebar */}
                    <aside className="hidden md:block w-52 flex-shrink-0">
                        <div className="rounded-xl bg-white px-4 py-4 shadow-sm">
                            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                                Danh mục
                            </h3>
                            {getCategories.isLoading ? (
                                <div className="flex justify-center py-4"><SpinnerCustom /></div>
                            ) : (
                                <ul className="space-y-1">
                                    <li>
                                        <Link
                                            to="/danh-muc"
                                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-orange-50 hover:text-orange-600 transition"
                                        >
                                            <FolderOpen className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                            <span>Tất cả danh mục</span>
                                        </Link>
                                    </li>
                                    {allCategories.map((cat: any) => (
                                        <li key={cat.id}>
                                            <Link
                                                to={`/danh-muc/${cat.slug}`}
                                                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${cat.slug === category_slug
                                                    ? "bg-orange-100 text-orange-700 font-semibold"
                                                    : "hover:bg-orange-50 hover:text-orange-600"
                                                    }`}
                                            >
                                                <FolderOpen className={`h-4 w-4 flex-shrink-0 ${cat.slug === category_slug ? "text-orange-600" : "text-orange-400"}`} />
                                                <span className="line-clamp-2 leading-tight">{cat.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="rounded-xl bg-white px-4 py-3 mb-4">
                            <h2 className="text-lg font-semibold">
                                {getProductByCategory?.data?.category?.name || "Danh mục sản phẩm"}
                            </h2>
                        </div>

                        <BookList books={filtered || []} />
                        <Pagination
                            page={pageNumber}
                            totalPages={getProductByCategory?.data?.pagination?.totalPages || 1}
                            onChange={setPageNumber}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
