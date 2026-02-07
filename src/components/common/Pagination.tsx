import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    page: number; // trang hiện tại
    totalPages: number; // tổng số trang
    onChange: (page: number) => void;
    maxVisiblePages?: number; // số page hiển thị tối đa
};

export default function Pagination({
    page,
    totalPages,
    onChange,
    maxVisiblePages = 5,
}: Props) {
    if (totalPages <= 1) return null;

    const clamp = (n: number, min: number, max: number) =>
        Math.max(min, Math.min(max, n));

    const safePage = clamp(page, 1, totalPages);

    const getPages = () => {
        // Ví dụ total=20, maxVisible=5
        // luôn cố gắng hiển thị: [page-2, page-1, page, page+1, page+2]
        const half = Math.floor(maxVisiblePages / 2);

        let start = safePage - half;
        let end = safePage + half;

        if (start < 1) {
            start = 1;
            end = Math.min(totalPages, start + maxVisiblePages - 1);
        }

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        const arr: number[] = [];
        for (let i = start; i <= end; i++) arr.push(i);

        return arr;
    };

    const pages = getPages();

    const goTo = (p: number) => {
        const next = clamp(p, 1, totalPages);
        if (next !== safePage) onChange(next);
    };

    const isPrevDisabled = safePage <= 1;
    const isNextDisabled = safePage >= totalPages;

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Prev */}
            <button
                disabled={isPrevDisabled}
                onClick={() => goTo(safePage - 1)}
                className={cn(
                    "h-9 w-9 rounded-md border flex items-center justify-center transition",
                    isPrevDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted"
                )}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
                {pages.map((p) => {
                    const active = p === safePage;

                    return (
                        <button
                            key={p}
                            onClick={() => goTo(p)}
                            className={cn(
                                "h-9 w-9 rounded-md border text-sm font-medium transition",
                                active
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white hover:bg-muted"
                            )}
                        >
                            {p}
                        </button>
                    );
                })}
            </div>

            <button
                disabled={isNextDisabled}
                onClick={() => goTo(safePage + 1)}
                className={cn(
                    "h-9 w-9 rounded-md border flex items-center justify-center transition",
                    isNextDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted"
                )}
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
