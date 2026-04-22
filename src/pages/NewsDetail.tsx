import { Link, useParams } from "react-router-dom";
import { useNewsBySlug } from "@/hooks/useNews";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Calendar, ChevronLeft, Newspaper } from "lucide-react";
import { format } from "date-fns";

export default function NewsDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { data, isLoading, error } = useNewsBySlug(slug || "");
    const news = data?.data;

    return (
        <div className=" container bg-[#f2f2f2]">
            <main className=" px-4 py-8">
                <div className="mb-6 text-sm text-muted-foreground flex items-center gap-2">
                    <Link to="/" className="hover:text-orange-500">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/tin-tuc" className="hover:text-orange-500">Tin tức</Link>
                    {news && (
                        <>
                            <span>/</span>
                            <span className="text-foreground font-medium line-clamp-1">{news.title}</span>
                        </>
                    )}
                </div>

                <Link
                    to="/tin-tuc"
                    className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 mb-6"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Quay lại tin tức
                </Link>

                {isLoading && <SpinnerCustom />}

                {error && (
                    <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground bg-white">
                        Không tìm thấy bài viết.
                    </div>
                )}

                {!isLoading && !error && news && (
                    <article className="rounded-2xl bg-white shadow-sm overflow-hidden">
                        {news.thumbnail && (
                            <img
                                src={news.thumbnail}
                                alt={news.title}
                            />
                        )}
                        {!news.thumbnail && (
                            <div className="w-full h-40 bg-orange-50 flex items-center justify-center">
                                <Newspaper className="h-12 w-12 text-orange-200" />
                            </div>
                        )}
                        <div className="p-6 md:p-8">
                            {news.type && (
                                <span className="inline-block mb-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                    {news.type}
                                </span>
                            )}
                            <h1 className="text-2xl font-bold leading-snug mb-3">{news.title}</h1>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                                <Calendar className="h-3.5 w-3.5" />
                                {news.created_at ? format(new Date(news.created_at), "dd/MM/yyyy HH:mm") : ""}
                            </div>
                            <div>

                            </div>
                            <div
                                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: news.description || "" }}
                            />
                        </div>
                    </article>
                )}
            </main>
        </div>
    );
}
