import { LazyImage } from "@/components/common/LazyImage"
import { cn } from "@/lib/utils"
import type { BookType } from "@/types/Book"
import { formatVND } from "@/utils/formatVND"

const HomeShelfBookCard = ({
    book,
    className,
    onClick,
}: {
    book: BookType
    className?: string
    onClick?: () => void
}) => {
    const displayPrice = book.sale_price && book.sale_price > 0 ? book.sale_price : book.price
    return (
        <div
            className={cn(
                "group cursor-pointer border-r relative border-neutral-200 p-4",
                className
            )}
            onClick={onClick}
        >
            <div className="mx-auto w-full max-w-[150px]">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white">
                    <LazyImage src={book.BookImages} alt={book.title} />
                    )
                </div>
            </div>

            <div className="mt-3 line-clamp-2 min-h-10 text-sm font-medium text-neutral-800">
                {book.title}
            </div>

            <div className="mt-2 flex flex-wrap items-end gap-2">
                <div className="text-xs text-muted-foreground line-through">
                    {formatVND(book.price!)}
                </div>

                <div className="text-base font-bold text-orange-600">
                    {formatVND(displayPrice!)}
                </div>

                {book.discount_percent && book.discount_percent > 0 && (
                    <div className="bg-orange-500 hover:bg-orange-500 absolute right-2 top-2 rounded px-1 text-xs font-semibold text-white">
                        -{book.discount_percent}%
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeShelfBookCard