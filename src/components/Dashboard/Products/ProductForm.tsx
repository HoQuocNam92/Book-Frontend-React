
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
import { formProductSchema, type FormProductInput } from "@/schema/formProduct.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProducts } from "@/hooks/useProducts"
import { useNavigate } from "react-router-dom"
const ProductForm = () => {
    const { register, handleSubmit, control, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(formProductSchema)
    });
    const { createProduct } = useProducts()
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



            const res = await createProduct.mutateAsync(formData)
            alert(res.message || "Tao sản phẩm thành công")
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
    const navigate = useNavigate()
    const handleCancel = () => {
        navigate(-1);
    }
    useEffect(() => {
        setValue("attributes", attrKey)
        setValue("images", images.map(x => x.file))
    }, [attrKey, images])
    return (
        <form onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Form errors:", errors)
        })} encType="multipart/form-data">

            <div className="w-full">
                <Card className="w-full max-w-6xl rounded-3xl border shadow-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl font-bold">Tạo sản phẩm</CardTitle>
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
                                                        <Select value={field.value} onValueChange={field.onChange}>
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

                                        <div className="space-y-2">
                                            <Label>Danh mục</Label>
                                            <Controller
                                                name="category_id"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Category 1</SelectItem>
                                                            <SelectItem value="2">Category 2</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {
                                                errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>

                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border p-5">
                                    <div className="mb-4">
                                        <p className="text-base font-semibold">Khuyến mãi</p>
                                        <p className="text-sm text-muted-foreground">
                                            Thông tin bổ sung hiển thị trên trang sản phẩm.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Promotion text</Label>
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
                                            <Label>Brand</Label>
                                            <Controller
                                                name="brand_id"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select brand" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Brand 1</SelectItem>
                                                            <SelectItem value="2">Brand 2</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}

                                            />
                                            {
                                                errors.brand_id && <p className="text-sm text-red-500">{errors.brand_id.message}</p>
                                            }
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Attributes</Label>
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
                                <Button type="submit">Tạo sản phẩm</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>

    )
}

export default ProductForm
