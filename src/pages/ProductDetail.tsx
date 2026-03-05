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
import ProductRelated from "@/components/Related/ProductRelated"
import useRelated from "@/hooks/useRelated"
import MySwiperComponent from "@/components/Swiper/Swiper"
import Reviews from "@/components/Reviews/Reviews"

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
    const related = getProductRelated(product?.Categories
        ?.id || 0).data?.data || []
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
    if (getProductBySlug.error || !product) {
        return <Oops />
    }
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
    console.log("product", product)
    return (
        <div className="container bg-neutral-50">
            <div className="px-4 py-5">
                <div className="mb-3 text-sm text-muted-foreground">
                    <span className="cursor-pointer hover:text-foreground" onClick={() => navigate("/")}>Trang chủ</span>
                    <span className="mx-2">›</span>
                    <span className="cursor-pointer hover:text-foreground">{category}</span>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">{product.title}</span>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <ProductImage images={images} activeImage={activeImage} setActiveImage={setActiveImage} title={product.title} goPrev={goPrev} goNext={goNext} />

                    <ProductInfo product={product} finalPrice={finalPrice} salePrice={salePrice} discount={discount} qty={qty} setQty={setQty} handleAddToCart={handleAddToCart} isPending={isPending} />

                    <ProductBrandAttrRealated product={product} brand={brand} />
                </div>

                <ProductDescription product={product} related={related} />
                <Reviews id={product.id} />
                <MySwiperComponent data={related} />

            </div>

        </div>
    )
}
export default ProductDetail