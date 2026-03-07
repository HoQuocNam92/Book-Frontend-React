import Star from '@/components/Reviews/logic/Star'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import useReviews from '@/hooks/useReviews'
import { useAuthStore } from '@/stores/auth.stores'
import dayjs from 'dayjs'
import { useState } from 'react'

const Reviews = ({ id }: { id: number }) => {
    const user = useAuthStore((state) => state.user);
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const { getReviewByBookId, createReview } = useReviews(id);
    const reviews = getReviewByBookId.data || [];
    const handleCreateReview = async () => {
        try {
            if (!user) {
                alert("Vui lòng đăng nhập để gửi đánh giá.")
                return;
            }
            if (rating === 0) {
                alert("Vui lòng chọn số sao đánh giá.")
                return;
            }
            const res = await createReview.mutateAsync({ comment, rating, bookId: id, userId: user?.id });
            alert(res.message || "Cảm ơn bạn đã gửi đánh giá!")
        } catch (error: any) {
            alert(error.response?.data?.message || "Gửi đánh giá thất bại. Vui lòng thử lại sau.")
        }
    }
    return (
        <div>
            <Card className="rounded-2xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">ĐÁNH GIÁ CỦA ĐỘC GIẢ</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                    {reviews && reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((r: any) => (
                                <div key={r.id} className="rounded-xl border p-4">
                                    <div className="flex items-start gap-3">

                                        {/* Avatar */}
                                        <img
                                            src={r.Users?.UserProfile?.avatar || "/default-avatar.png"}
                                            alt="Avatar"
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <div className="flex-1">
                                            {/* Name + Rating */}
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium text-sm">
                                                    {r.Users?.name || "Ẩn danh"}
                                                </div>

                                                <div className="flex items-center gap-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} filled={i < (r.rating || 0)} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Date */}
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {dayjs(r.create_at).format("DD/MM/YYYY")}
                                            </div>

                                            {/* Comment */}
                                            <div className="mt-2 text-sm leading-relaxed">
                                                {r.comment}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
                        </p>
                    )}

                    <Separator className="my-6" />
                    <div>
                        <div className="text-sm font-semibold">GỬI ĐÁNH GIÁ CỦA BẠN</div>
                        <div className="mt-3 rounded-xl border bg-white p-4">
                            <textarea
                                placeholder="Viết bình luận của bạn tại đây."
                                className="min-h-[140px] w-full resize-none rounded-lg border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-orange-500"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-sm font-medium">Đánh giá</div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} filled={i < rating} onChange={() => setRating(i + 1)} />
                                        ))}
                                    </div>
                                </div>
                                <Button className="h-10 rounded-xl bg-orange-500 px-8 hover:bg-orange-600" onClick={handleCreateReview}>
                                    GỬI
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Reviews


