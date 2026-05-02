import { useInView } from "react-intersection-observer"
import { useMemo, useState, type CSSProperties } from "react"
import { optimizeImageUrl } from "@/utils/optimizeImageUrl"

type LazyImageProps = {
    src: string
    alt: string
    className?: string
    style?: CSSProperties
    /** Ảnh LCP / above-the-fold: tải ngay, không chờ viewport */
    priority?: boolean
    width?: number
    height?: number
    sizes?: string
    /** Giới hạn chiều rộng Cloudinary (f_auto,q_auto,w_*,c_limit) — giảm KB tải */
    cdnMaxWidth?: number
}

export function LazyImage({
    src,
    alt,
    className,
    style,
    priority = false,
    width,
    height,
    sizes,
    cdnMaxWidth,
}: LazyImageProps) {
    const resolvedSrc = useMemo(
        () => (cdnMaxWidth ? optimizeImageUrl(src, cdnMaxWidth) : src),
        [src, cdnMaxWidth],
    )

    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: priority ? "0px" : "280px 0px",
        skip: priority,
        initialInView: priority,
    })
    const [loaded, setLoaded] = useState(false)
    const shouldRender = priority || inView

    return (
        <div
            ref={priority ? undefined : ref}
            className={`relative overflow-hidden bg-neutral-100 ${className ?? ""}`}
            style={style}
        >
            {shouldRender && (
                <img
                    src={resolvedSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    className="h-full w-full object-cover transition-opacity duration-300"
                    style={{
                        opacity: loaded ? 1 : 0.85,
                    }}
                />
            )}
        </div>
    )
}
