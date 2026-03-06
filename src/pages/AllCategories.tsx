import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { SpinnerCustom } from "@/components/ui/spinner";
import { FolderOpen } from "lucide-react";

export default function AllCategories() {
    const { getCategories } = useCategories();
    const categories: any[] = getCategories.data?.data || getCategories.data || [];

    if (getCategories.isLoading) return <SpinnerCustom />;

    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <main className="mx-auto max-w-6xl px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-muted-foreground">
                    <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-medium">Tất cả danh mục</span>
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Tất cả danh mục sách</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Khám phá {categories.length} danh mục sách phong phú
                    </p>
                </div>

                {categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 gap-4 bg-white">
                        <FolderOpen className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Chưa có danh mục nào</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {categories.map((cat: any) => (
                            <Link
                                key={cat.id}
                                to={`/danh-muc/${cat.slug}`}
                                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 group-hover:bg-orange-100 transition">
                                    <FolderOpen className="h-7 w-7 text-orange-500" />
                                </div>
                                <span className="text-sm font-medium line-clamp-2 leading-tight">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
