import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { useCartStore } from "@/stores/cart.stores"
import { SpinnerCustom } from "@/components/ui/spinner"
import useCarts from "@/hooks/useCarts"
import { getCartItemCount } from '@/services/cart.services';
import Oops from "@/pages/Oops"
import { useProductDetail } from "@/hooks/useProductDetail"
import ProductImage from "@/components/Detail/ProductImage"
import ProductInfo from "@/components/Detail/ProductInfo"
import ProductDescription from "@/components/Detail/ProductDescription"
import ProductBrandAttrRealated from "@/components/Detail/ProductBrandAttrRealated"
import useRelated from "@/hooks/useRelated"
import MySwiperComponent from "@/components/Swiper/Swiper"
import Reviews from "@/components/Reviews/Reviews"
import { Home, ChevronRight } from "lucide-react"

const ProductDetail = () => {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const { getProductRelated } = useRelated()
    const setItemCount = useCartStore((s) => s.setItemCount)
    const { createCartItem } = useCarts()
    const { getProductBySlug } = useProductDetail()

    const product = getProductBySlug.data?.data

    const images: string[] = product?.BookImages
        ? product.BookImages.map((img: any) => img.url)
        : []

    const [activeImage, setActiveImage] = useState<string | null>(null)
    const displayImage = activeImage ?? images[0] ?? null

    const price = product ? Number(product.price) : 0
    const salePrice = product?.sale_price ? Number(product.sale_price) : 0
    const finalPrice = salePrice > 0 ? salePrice : price
    const discount = product?.discount_percent || 0
    const [qty, setQty] = useState<number>(1)

    const category = product?.Categories?.name || "—"
    const brand = product?.Brands?.name || "—"
    const related = getProductRelated(product?.Categories?.id || 0).data?.data || []

    const goPrev = () => {
        if (images.length === 0) return
        const idx = images.indexOf(displayImage || "")
        const next = idx <= 0 ? images.length - 1 : idx - 1
        setActiveImage(images[next])
    }
    const goNext = () => {
        if (images.length === 0) return
        const idx = images.indexOf(displayImage || "")
        const next = idx >= images.length - 1 ? 0 : idx + 1
        setActiveImage(images[next])
    }

    if (getProductBySlug.isLoading) return <SpinnerCustom />
    if (getProductBySlug.error || !product) return <Oops />

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/auth/sign-in")
            return
        }
        try {
            await createCartItem.mutateAsync({ productId: product.id, quantity: qty })
            getCartItemCount().then(res => {
                setItemCount(res.data || 0)
            })
        } catch (error: any) {
            alert(error.response.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng")
        }
    }
    const isPending = createCartItem.isPending

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="container px-4 py-6">
                {/* Breadcrumb */}
                <nav className="mb-5 flex items-center gap-1.5 text-sm text-neutral-400">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-neutral-200 hover:text-neutral-700 transition-colors"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Trang chủ</span>
                    </button>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    <button className="rounded-md px-1.5 py-0.5 hover:bg-neutral-200 hover:text-neutral-700 transition-colors">
                        {category}
                    </button>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1 font-medium text-neutral-600">{product.title}</span>
                </nav>

                {/* Main product grid */}
                <div className="grid grid-cols-12 gap-4">
                    <ProductImage
                        images={images}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        title={product.title}
                        goPrev={goPrev}
                        goNext={goNext}
                    />

                    <ProductInfo
                        product={product}
                        finalPrice={finalPrice}
                        salePrice={salePrice}
                        discount={discount}
                        qty={qty}
                        setQty={setQty}
                        handleAddToCart={handleAddToCart}
                        isPending={isPending}
                    />

                    <ProductBrandAttrRealated product={product} brand={brand} />
                </div>

                {/* Description */}
                <ProductDescription product={product} />

                {/* Reviews */}
                <div className="mt-6">
                    <Reviews id={product.id} />
                </div>

                {/* Related books */}
                {related.length > 0 && (
                    <div className="mt-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
                            <h2 className="text-lg font-bold text-neutral-800">Sách tương tự</h2>
                        </div>
                        <MySwiperComponent data={related} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetail