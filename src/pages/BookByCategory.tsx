import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


import { useProducts } from "@/hooks/useProducts";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/common/Pagination";

import { useCategories } from "@/hooks/useCategories";
import { FolderOpen, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import MySwiperComponent from "@/components/Swiper/Swiper";
import { useBrands } from "@/hooks/useBrands";
import CategoryItem from "@/components/Dashboard/Categories/CategoryItem";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useSearch } from "@/hooks/useSearch";


export default function BookByCategory() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [pageNumber, setPageNumber] = useState(1);
    const { getProductByCategory, } = useProducts(query || "category", pageNumber);
    const { getBrands } = useBrands()
    const navigate = useNavigate();
    const { books, isLoading, error } = useSearch({ inputValue: query || "", pageNumber });
    const { getCateogryParents, getCategoryChildren } = useCategories();

    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const [childrenMap, setChildrenMap] = useState<Record<number, any[]>>({});
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

    useEffect(() => {
        setCategoryDialogOpen(false);
    }, [query]);

    const allCategories: any[] = getCateogryParents.data?.data || getCateogryParents.data || [];

    const loading = getProductByCategory.isLoading || getCateogryParents.isLoading || getBrands.isLoading || isLoading;

    if (loading) { return <SpinnerCustom />; }
    if (getProductByCategory.error || getCateogryParents.error || getBrands.error || error) { navigate('/oops'); }

    const bookMain = query ? books?.data?.data || [] : getProductByCategory?.data?.data || [];
    const pagination = query ? books?.data?.pagination : getProductByCategory?.data?.pagination || {};

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


    return (
        <div className="container bg-[#f2f2f2]">
            <main className=" px-4 py-6">
                <Card className="rounded-xl">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                            <div className="md:col-span-2 text-sm text-muted-foreground">
                                Khoảng giá
                            </div>
                            {/* <SliderPrice priceRange={priceRange} min={min} max={max} setPriceRange={setPriceRange} /> */}
                            <Separator className="md:col-span-12" />
                            {/* <BrandRow brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} /> */}
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
                                            onNavigate={() =>
                                                setCategoryDialogOpen(false)
                                            }
                                        />
                                    ))}
                                </ul>
                            </ul>
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold">
                                {bookMain?.category?.name}
                            </h2>
                            <div className="md:hidden">
                                <Dialog
                                    open={categoryDialogOpen}
                                    onOpenChange={setCategoryDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-full shrink-0 sm:w-auto"
                                        >
                                            <ListFilter className="mr-2 h-4 w-4" />
                                            Danh mục
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Chọn danh mục</DialogTitle>
                                        </DialogHeader>
                                        <nav className="mt-2 space-y-1 border-t pt-3">
                                            <Link
                                                to="/danh-muc"
                                                className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-orange-50"
                                                onClick={() => setCategoryDialogOpen(false)}
                                            >
                                                <FolderOpen className="h-4 w-4 text-orange-400" />
                                                <span>Tất cả danh mục</span>
                                            </Link>
                                            {allCategories.map((cat: any) => (
                                                <CategoryItem
                                                    key={cat.id}
                                                    category={cat}
                                                    expanded={expanded}
                                                    childrenMap={childrenMap}
                                                    toggleCategory={toggleCategory}
                                                />
                                            ))}
                                        </nav>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div className="mt-4">
                            {bookMain.length > 0 ? (
                                <MySwiperComponent data={bookMain} options={false} />
                            ) : (
                                <EmptyState message="Không tìm thấy sản phẩm nào trong danh mục này" />
                            )}
                        </div>
                        <Pagination
                            page={pageNumber}
                            totalPages={pagination?.totalPages || 1}
                            onChange={(page) => setPageNumber(page)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
