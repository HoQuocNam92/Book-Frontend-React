import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductImage = ({ images, title, activeImage, setActiveImage, goPrev, goNext }: {
    images: string[]
    title: string
    activeImage: string | null
    setActiveImage: (img: string) => void
    goPrev: () => void
    goNext: () => void
}) => {
    const displayImage = activeImage ?? images[0] ?? null
    return (
        <Card className="col-span-12 lg:col-span-5 rounded-2xl border-0 shadow-sm">
            <CardContent className="p-5">
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-inner">
                    <div className="aspect-[4/5] w-full">
                        {displayImage ? (
                            <img
                                src={displayImage}
                                alt={title}
                                className="h-full w-full object-contain p-4 transition-all duration-300"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-neutral-300 text-sm">
                                Không có ảnh
                            </div>
                        )}
                    </div>

                    {/* Nav arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md hover:bg-white hover:scale-110 transition-all duration-150"
                            >
                                <ChevronLeft className="h-4 w-4 text-neutral-600" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md hover:bg-white hover:scale-110 transition-all duration-150"
                            >
                                <ChevronRight className="h-4 w-4 text-neutral-600" />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {images.map((img: string) => (
                            <button
                                key={img}
                                onClick={() => setActiveImage(img)}
                                className={cn(
                                    "h-16 w-16 overflow-hidden rounded-xl border-2 bg-white transition-all duration-150 hover:scale-105",
                                    displayImage === img
                                        ? "border-orange-500 ring-2 ring-orange-200 shadow-sm"
                                        : "border-neutral-200 hover:border-orange-300"
                                )}
                            >
                                <img src={img} alt="thumb" className="h-full w-full object-contain p-1" />
                            </button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProductImage