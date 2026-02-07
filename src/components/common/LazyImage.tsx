import { useInView } from "react-intersection-observer";
import { useState } from "react";

export function LazyImage({ src, alt }: { src: string, alt: string }) {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [loaded, setLoaded] = useState(false);

    return (
        <div ref={ref} style={{ width: 200, height: 200 }}>
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        opacity: loaded ? 1 : 0.3,
                        transition: "0.3s",
                    }}
                />
            )}
        </div>
    );
}
