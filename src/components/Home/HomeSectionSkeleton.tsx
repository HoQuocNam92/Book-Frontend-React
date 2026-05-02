/** Khối giữ chỗ cố định chiều cao — giảm CLS khi đang tải dữ liệu trang chủ */
export default function HomeSectionSkeleton() {
    return (
        <div className="animate-pulse rounded-3xl bg-gradient-to-br from-sky-50/80 to-indigo-50/80 p-6 mb-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="h-7 w-1.5 rounded-full bg-neutral-200" />
                <div className="h-7 w-40 rounded-lg bg-neutral-200" />
                <div className="h-6 w-16 rounded-full bg-neutral-200" />
            </div>
            <div
                className="min-h-[240px] w-full rounded-xl bg-neutral-200/90 md:h-96 md:min-h-[384px]"
                aria-hidden
            />
            <div className="mt-4 flex gap-2 overflow-hidden pb-8 pt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-[305px] w-[160px] shrink-0 rounded-2xl border border-neutral-100 bg-white p-3"
                    >
                        <div className="mx-auto aspect-[3/4] max-w-[140px] rounded-xl bg-neutral-200" />
                        <div className="mt-3 h-8 w-full rounded bg-neutral-100" />
                        <div className="mt-2 h-4 w-20 rounded bg-neutral-100" />
                    </div>
                ))}
            </div>
        </div>
    )
}
