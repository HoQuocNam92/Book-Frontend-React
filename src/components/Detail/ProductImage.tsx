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
        <Card className="col-span-12 lg:col-span-5 rounded-2xl">
            <CardContent className="p-4">
                <div className="relative">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-white">
                        {displayImage ? (
                            <img
                                src={displayImage}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="mt-4 flex gap-3">
                        {images.map((img: string) => (
                            <button
                                key={img}
                                onClick={() => setActiveImage(img)}
                                className={cn(
                                    "h-16 w-16 overflow-hidden rounded-lg border bg-white",
                                    displayImage === img
                                        ? "border-orange-500 ring-2 ring-orange-200"
                                        : "border-neutral-200 hover:border-neutral-300"
                                )}
                            >
                                <img src={img} alt="thumb" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProductImage