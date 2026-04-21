import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicNews } from "@/hooks/useNews";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { format } from "date-fns";
import Pagination from "@/components/common/Pagination";

export default function NewsPage() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = usePublicNews(page);
    const newsList: any[] = data?.data || [];
    const totalPages: number = data?.totalPages || 1;

    return (
        <div className="container bg-[#f2f2f2]">
            <main className="  px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-muted-foreground">
                    <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-medium">Tin tức</span>
                </div>

                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                        <Newspaper className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Tin tức & Sự kiện</h1>
                        <p className="text-sm text-muted-foreground">Cập nhật những tin tức sách mới nhất</p>
                    </div>
                </div>

                {isLoading && <SpinnerCustom />}

                {error && (
                    <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
                        Không thể tải tin tức. Vui lòng thử lại.
                    </div>
                )}

                {!isLoading && !error && newsList.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 gap-4 bg-white">
                        <Newspaper className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Chưa có bài viết nào</p>
                    </div>
                )}

                {!isLoading && newsList.length > 0 && (
                    <div className="space-y-4">
                        {newsList.map((news: any) => (
                            <Link
                                key={news.id}
                                to={`/tin-tuc/${news.slug}`}
                                className="group flex gap-5 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition"
                            >
                                {news.thumbnail ? (
                                    <img
                                        src={news.thumbnail}
                                        alt={news.title}
                                        className="h-28 w-44 rounded-xl object-cover flex-shrink-0 border"
                                    />
                                ) : (
                                    <div className="h-28 w-44 flex-shrink-0 rounded-xl bg-orange-50 flex items-center justify-center border">
                                        <Newspaper className="h-8 w-8 text-orange-300" />
                                    </div>
                                )}
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <h2 className="text-base font-semibold line-clamp-2 group-hover:text-orange-600 transition">
                                            {news.title}
                                        </h2>
                                        {news.content && (
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                                {news.content.replace(/<[^>]+>/g, '')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {news.created_at ? format(new Date(news.created_at), "dd/MM/yyyy") : ""}
                                        </div>
                                        <span className="flex items-center gap-1 text-xs text-orange-500 font-medium group-hover:gap-2 transition-all">
                                            Đọc tiếp <ChevronRight className="h-3.5 w-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                    </div>
                )}
            </main>
        </div>
    );
}
