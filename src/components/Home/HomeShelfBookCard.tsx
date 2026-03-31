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
    const hasDiscount = Number(book.discount_percent) > 0 ? true : false
    return (
        <div
            className={cn(
                "group cursor-pointer relative bg-white rounded-2xl p-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-neutral-100 h-[305px]",
                className
            )}
            onClick={onClick}
        >
            {hasDiscount && (
                <div className="absolute top-2 right-2 z-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    -{book.discount_percent}%
                </div>
            )}

            {/* Book cover */}
            <div className="mx-auto w-full max-w-[140px]">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-50 shadow-sm">
                    <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
                        <LazyImage src={book.BookImages} alt={book.title} />
                    </div>
                </div>
            </div>

            {/* Title */}
            <div className="mt-3 line-clamp-2 min-h-[32px] text-xs font-medium text-neutral-800 leading-snug">
                {book.title}
            </div>

            {/* Price */}
            <div className="mt-2 flex flex-col gap-0.5">
                <div className="text-sm font-bold text-orange-500">
                    {formatVND(displayPrice!)}
                </div>
                {hasDiscount && (
                    <div className="text-[11px] text-neutral-400 line-through">
                        {formatVND(book.price!)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeShelfBookCard