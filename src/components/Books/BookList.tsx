import { LazyImage } from "@/components/common/LazyImage"
import { Card, CardContent } from "@/components/ui/card"
import type { Book } from "@/types/Book"
import { formatVND } from "@/utils/formatVND"

const BookList = ({ books }: { books: Book[] }) => {
    return (
        <div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5 cursor-pointer">
                {books.map((b) => {
                    return (
                        <Card
                            key={b.id}
                            className="rounded-xl bg-white transition hover:shadow-md"
                        >
                            <CardContent className="p-3">
                                <div className="relative overflow-hidden rounded-lg bg-[#e9f2ff]">
                                    {b.discount_percent ? (
                                        <div className="absolute bottom-2 rounded-full left-2 bg-orange-500">
                                            -{b.discount_percent}%
                                        </div>
                                    ) : null}

                                    <div className="flex aspect-3/4 items-center justify-center p-3">
                                        <LazyImage src={b.BookImages}
                                            alt={b.title} />

                                    </div>
                                </div>

                                <div className="mt-3 line-clamp-2 text-sm font-medium">
                                    {b.title}
                                </div>
                                <div className="mt-2">
                                    <div className="text-sm font-semibold text-red-600">
                                        {formatVND(b.sale_price!)}
                                    </div>

                                    {b.sale_price ? (
                                        <div className="text-xs text-muted-foreground line-through">
                                            {formatVND(b.price!)}
                                        </div>
                                    ) : null}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default BookList