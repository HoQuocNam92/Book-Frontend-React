/** Giữ chiều cao gần đúng khi đang tải — giảm CLS khi khối dịch vụ xuất hiện */
export default function HomeServicesSkeleton() {
    return (
        <div
            className="mb-6 min-h-[420px] animate-pulse rounded-3xl bg-gradient-to-br from-slate-50 to-gray-100 p-6"
            aria-hidden
        >
            <div className="mb-5 flex items-center gap-3">
                <div className="h-7 w-1.5 rounded-full bg-neutral-200" />
                <div className="h-7 w-64 rounded-lg bg-neutral-200" />
                <div className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="flex flex-col justify-center space-y-3 lg:col-span-4">
                    <div className="h-3 w-full rounded bg-neutral-200" />
                    <div className="h-3 w-full rounded bg-neutral-200" />
                    <div className="h-3 max-w-[96%] rounded bg-neutral-200" />
                    <div className="h-10 w-32 rounded-full bg-neutral-200" />
                </div>
                <div className="min-h-[320px] rounded-2xl bg-neutral-200/90 lg:col-span-8" />
            </div>
        </div>
    )
}
