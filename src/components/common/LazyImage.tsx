import { useInView } from "react-intersection-observer";
import { useState } from "react";

export function LazyImage({ src, alt, className, style }: { src: string, alt: string, className?: string, style?: React.CSSProperties }) {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [loaded, setLoaded] = useState(false);

    return (
        <div ref={ref} className={className} style={style} >
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
                />
            )}
        </div>
    );
}
