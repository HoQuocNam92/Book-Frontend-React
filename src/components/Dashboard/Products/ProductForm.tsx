
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Controller, useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import MyEditor from "@/components/Dashboard/Products/QuilEditor"
import ImageDndUpload, { type ProductImageItem } from "@/components/DndKit/ImageDndList"
import { useEffect, useState } from "react"
import { formProductSchema, type FormProductInput } from "@/schema/product.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProducts } from "@/hooks/useProducts"
import { useNavigate, } from "react-router-dom"
import { useBrands } from "@/hooks/useBrands"
import { useCategories } from "@/hooks/useCategories"
import { SpinnerCustom } from "@/components/ui/spinner"
import Oops from "@/pages/Oops"
import { useProductDetail } from "@/hooks/useProductDetail"
const ProductForm = () => {
    const navigate = useNavigate()
    const { createProduct, updateProduct } = useProducts()

    const { getProductBySlug } = useProductDetail();
    const { getBrands } = useBrands()
    const { getCategories } = useCategories()
    const brands = getBrands.data?.data || []
    const categories = getCategories.data?.data || []
    const productData = getProductBySlug.data?.data

    const { register, handleSubmit, control, setValue, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(formProductSchema),
    });

    const [isEdit, setIsEdit] = useState(false)
    const [images, setImages] = useState<ProductImageItem[]>([])
    const [attrKey, setAttrKey] = useState<{ attr_key: string; attr_value: string }[]>([])
    const onSubmit: SubmitHandler<FormProductInput> = async (data) => {
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("price", data.price.toString())
            if (data.discount_percent !== undefined) {
                formData.append("discount_percent", data.discount_percent.toString())
            }
            formData.append("stock", data.stock.toString())
            formData.append("description", data.description || "")
            formData.append("brand_id", data.brand_id)
            formData.append("category_id", data.category_id)
            formData.append("status", data.status)
            formData.append("content", data.content)
            attrKey.forEach((attr, index) => {
                formData.append(`attributes[${index}][attr_key]`, attr.attr_key)
                formData.append(`attributes[${index}][attr_value]`, attr.attr_value)
            }
            )
            images.forEach((image) => {
                formData.append("images", image.file)
            })


            const res = isEdit ? await updateProduct.mutateAsync({ id: productData.id, data: formData }) : await createProduct.mutateAsync(formData)
            alert(res.message || "Thành công")
            setValue("title", "")
            setValue("price", 0)
            setValue("discount_percent", 0)
            setValue("stock", 0)
            setValue("description", "")
            setValue("brand_id", "")
            setValue("category_id", "")
            setValue("status", "active")
            setValue("content", "")
            setAttrKey([])
            setImages([])
        } catch (error) {
            console.error("Error creating product:", error)
        }
    }

    const [key, setKey] = useState("")
    const [valueAttr, setValueAttr] = useState("")
    const handleAttributeAdd = (data: any) => {
        if (!data.attr_key || !data.attr_value) return
        setAttrKey(prev => [...prev, data])
        setKey("")
        setValueAttr("")
    }
    const handleAttributeRemove = (index: number) => {
        const newAttrKey = [...attrKey]
        newAttrKey.splice(index, 1)
        setAttrKey(newAttrKey)
    }
    const handleCancel = () => {
        navigate(-1);
    }
    useEffect(() => {
        if (!productData) return

        if (productData) {
            setIsEdit(true)
        }
        reset({
            title: productData.title,
            price: productData.price,
            discount_percent: productData.discount_percent ?? 0,
            stock: productData.stock,
            description: productData.description || "",
            brand_id: productData.Brands?.id?.toString() || "",
            category_id: productData.Categories?.id?.toString() || "",
            status: productData.status,
            content: productData.BookPromotions.map((promo: { content: string }) => promo.content).join("\n") || "",
            is_featured: productData.isFeatured || false,

        })
        setAttrKey(productData.BookAttributes.map((attr: { attr_key: string, attr_value: string }) => ({
            attr_key: attr.attr_key,
            attr_value: attr.attr_value
        })))
        setImages(productData.BookImages.map((img: { id: number, url: string }) => ({
            id: img.id.toString(),
            file: null,
            preview: img.url
        })))
    }, [productData, reset,])


    if (getBrands.isLoading || getCategories.isLoading || getProductBySlug.isLoading) {
        return <SpinnerCustom />
    }
    if (getBrands.error || getCategories.error || getProductBySlug.error) {
        return <Oops />
    }
    return (
        <form onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Form errors:", errors)
        })} encType="multipart/form-data">

            <div className="w-full">
                <Card className="w-full max-w-6xl rounded-3xl border shadow-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl font-bold">{isEdit ? "Sửa" : "Tạo"}  sản phẩm</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Điền thông tin sản phẩm và xuất bản nó vào cửa hàng của bạn.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* LEFT */}
                            <div className="space-y-6 lg:col-span-2">
                                <div className="rounded-2xl border p-5">


                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Tên</Label>
                                            <Input placeholder="Tên sản phẩm" {...register("title", { required: true })} />
                                            {
                                                errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>
                                            }
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Trạng thái</Label>
                                            <Controller
                                                name="status"
                                                control={control}
                                                rules={{ required: true }}
                                                render={
                                                    (({ field }) => (
                                                        <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="active">Active</SelectItem>
                                                                <SelectItem value="draft">Draft</SelectItem>
                                                                <SelectItem value="archived">Archived</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )
                                                    )

                                                } />
                                            {
                                                errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>
                                            }

                                        </div>

                                        <div className="space-y-2">
                                            <Label>Giá</Label>
                                            <Input placeholder="0.00" {...register("price", { valueAsNumber: true, required: true })} />
                                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Giảm giá (%)</Label>
                                            <Input type="number" placeholder="0" defaultValue={0} {...register("discount_percent", { valueAsNumber: true, required: false })} />
                                            {
                                                errors.discount_percent && <p className="text-sm text-red-500">{errors.discount_percent.message}</p>
                                            }
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Tồn kho</Label>
                                            <Input placeholder="0" {...register("stock", { valueAsNumber: true, required: true })} />
                                            {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                        </div>

                                        <div className=" flex">
                                            <div className="me-2 space-y-2">

                                                <Label>Danh mục</Label>
                                                <Controller
                                                    name="category_id"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {categories.map((category: { id: number, name: string }) => (
                                                                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {
                                                    errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>

                                                }
                                            </div>
                                            <div className="space-y-2">

                                                <Label>Nổi bật</Label>
                                                <Input type="checkbox" {...register("is_featured")} checked={productData?.isFeatured} />
                                                {
                                                    errors.is_featured && <p className="text-sm text-red-500">{errors.is_featured.message}</p>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border p-5">


                                    <div className="space-y-2">
                                        <Label>Khuyến mãi</Label>
                                        <Textarea
                                            placeholder="Example: Free shipping • Gift included • 1-year warranty..."
                                            className="min-h-30"
                                            {...register("content", { required: false })}
                                        />
                                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                                    </div>
                                </div>

                                <div className="rounded-2xl border p-5">
                                    <div className="mb-4">
                                        <p className="text-base font-semibold">Mô tả</p>
                                        <p className="text-sm text-muted-foreground">
                                            Nội dung sản phẩm đầy đủ (rich text).
                                        </p>
                                    </div>

                                    <MyEditor control={control} />
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="space-y-6">
                                <div className="rounded-2xl border p-5">
                                    <p className="text-base font-semibold">Thông tin bổ sung</p>


                                    <Separator className="my-4" />

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label>Thương hiệu</Label>
                                            <Controller
                                                name="brand_id"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select key={field.value ?? ""} value={field.value ?? ""}
                                                        onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select brand" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                brands.map((brand: { id: number, name: string }) => (
                                                                    <SelectItem key={brand.id} value={brand.id.toString()}>{brand.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                )}

                                            />
                                            {
                                                errors.brand_id && <p className="text-sm text-red-500">{errors.brand_id.message}</p>
                                            }
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Thuộc tính</Label>
                                            <div className=" gap-2 my-3">
                                                {attrKey.length > 0 && (
                                                    <div className="  my-2">
                                                        {
                                                            attrKey.map((attr, index) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <Input placeholder="Key (e.g. Color)" value={attr.attr_key} onChange={(e) => {
                                                                        const newAttrKey = [...attrKey]
                                                                        newAttrKey[index].attr_key = e.target.value
                                                                        setAttrKey(newAttrKey)
                                                                    }} />
                                                                    <Input placeholder="Value (e.g. Red)" value={attr.attr_value} onChange={(e) => {
                                                                        const newAttrKey = [...attrKey]
                                                                        newAttrKey[index].attr_value = e.target.value
                                                                        setAttrKey(newAttrKey)
                                                                    }}
                                                                    />
                                                                    <Button variant="outline" type="button" onClick={() => handleAttributeRemove(index)}>
                                                                        Remove
                                                                    </Button>
                                                                </div>

                                                            ))

                                                        }
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Input placeholder="Key (e.g. Color)" value={key} onChange={(e) => setKey(e.target.value)} />
                                                    <Input placeholder="Value (e.g. Red)" value={valueAttr} onChange={(e) => setValueAttr(e.target.value)} />
                                                    <Button variant="outline" type="button" onClick={() => handleAttributeAdd({ attr_key: key, attr_value: valueAttr })}>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border p-5">
                                        <ImageDndUpload value={images} onChange={setImages} maxImages={12} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex  ">
                                <Button onClick={handleCancel} variant="outline" type="button">
                                    Hủy bỏ
                                </Button>
                                <Button type="submit">{isEdit ? "Cập nhật" : "Tạo"} sản phẩm</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>

    )
}

export default ProductForm
