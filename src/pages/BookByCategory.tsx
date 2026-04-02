import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { BookType } from "@/types/Book";

import { useProducts } from "@/hooks/useProducts";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@/components/common/Pagination";
import BrandRow from "@/components/Books/BrandRow";
import SliderPrice from "@/components/Books/SliderPrice";
import { useCategories } from "@/hooks/useCategories";
import { FolderOpen } from "lucide-react";
import MySwiperComponent from "@/components/Swiper/Swiper";
import { useBrands } from "@/hooks/useBrands";
import CategoryItem from "@/components/Dashboard/Categories/CategoryItem";
import EmptyState from "@/components/EmptyState/EmptyState";


export default function BookByCategory() {
    const { getProductByCategory, pageNumber, setPageNumber } = useProducts();
    const { getBrands } = useBrands()
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const min = 0;
    const max = 1_000_000;
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1_000_000]);
    const { getCateogryParents, getCategoryChildren } = useCategories();

    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const [childrenMap, setChildrenMap] = useState<Record<number, any[]>>({});
    const allCategories: any[] = getCateogryParents.data?.data || getCateogryParents.data || [];
    if (getProductByCategory.isLoading) { return <SpinnerCustom />; }
    if (getProductByCategory.error) { navigate('/oops'); }

    const filtered: BookType[] = getProductByCategory?.data?.data?.filter((b: BookType) => {
        const okBrand = selectedBrand ? true : true;
        const okPrice = b.price! >= priceRange[0] && b.price! <= priceRange[1];
        return okBrand && okPrice;
    });
    const loading = getProductByCategory.isLoading || getCateogryParents.isLoading || getBrands.isLoading;
    if (loading) { return <SpinnerCustom />; }
    if (getProductByCategory.error || getCateogryParents.error || getBrands.error) { navigate('/oops'); }


    const toggleCategory = async (id: number) => {
        if (childrenMap[id]) {
            setExpanded(prev => ({
                ...prev,
                [id]: !prev[id]
            }));
            return;
        }
        const res = await getCategoryChildren(id);
        setChildrenMap(prev => ({
            ...prev,
            [id]: res.data || res
        }));
        setExpanded(prev => ({
            ...prev,
            [id]: true
        }));
    };
    console.log("Check childrenMap: ", childrenMap);

    const brands = getBrands.data?.data?.map((b: any) => b.name) || [];
    return (
        <div className="container bg-[#f2f2f2]">
            <main className=" px-4 py-6">
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

                <div className="mt-6 flex gap-6">
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="rounded-xl bg-white px-4 py-4 shadow-sm">
                            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground">
                                Danh mục
                            </h3>
                            <ul className="space-y-1">

                                <ul className="space-y-1">
                                    <li>
                                        <Link
                                            to="/danh-muc"
                                            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-orange-50 rounded"
                                        >
                                            <FolderOpen className="h-4 w-4 text-orange-400" />
                                            <span>Tất cả danh mục</span>
                                        </Link>
                                    </li>

                                    {allCategories.map((cat: any) => (
                                        <CategoryItem
                                            key={cat.id}
                                            category={cat}
                                            expanded={expanded}
                                            childrenMap={childrenMap}
                                            toggleCategory={toggleCategory}
                                        />
                                    ))}
                                </ul>
                            </ul>
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        <div className="rounded-xl bg-white px-4 py-3 mb-4">
                            <h2 className="text-lg font-semibold">
                                {getProductByCategory?.data?.category?.name || "Danh mục sản phẩm"}
                            </h2>
                        </div>
                        <div className="mt-4">
                            {getProductByCategory?.data?.data.length > 0 ? (
                                <MySwiperComponent data={filtered} options={false} />
                            ) : (
                                <EmptyState message="Không tìm thấy sản phẩm nào trong danh mục này" />
                            )}
                        </div>
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
