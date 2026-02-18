"use client"

import * as React from "react"

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

import MyEditor from "@/components/Dashboard/Products/QuilEditor"
import ImageDndUpload, { type ProductImageItem } from "@/components/DndKit/ImageDndList"

const ProductForm = () => {
    const [images, setImages] = React.useState<ProductImageItem[]>([])

    return (
        <div className="w-full">
            <Card className="w-full max-w-6xl rounded-3xl border shadow-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold">Create product</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Fill product information and publish it to your store.
                    </p>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* LEFT */}
                        <div className="space-y-6 lg:col-span-2">
                            <div className="rounded-2xl border p-5">
                                <div className="mb-4">
                                    <p className="text-base font-semibold">Basic information</p>
                                    <p className="text-sm text-muted-foreground">
                                        Name, price, stock, discount...
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Name</Label>
                                        <Input placeholder="Product name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Price</Label>
                                        <Input placeholder="0.00" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Discount (%)</Label>
                                        <Input placeholder="0" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Stock</Label>
                                        <Input placeholder="0" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cat-1">Category 1</SelectItem>
                                                <SelectItem value="cat-2">Category 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <div className="mb-4">
                                    <p className="text-base font-semibold">Promotions</p>
                                    <p className="text-sm text-muted-foreground">
                                        Extra information shown on product page.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Promotion text</Label>
                                    <Textarea
                                        placeholder="Example: Free shipping • Gift included • 1-year warranty..."
                                        className="min-h-[120px]"
                                    />
                                </div>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <div className="mb-4">
                                    <p className="text-base font-semibold">Description</p>
                                    <p className="text-sm text-muted-foreground">
                                        Full product content (rich text).
                                    </p>
                                </div>

                                <MyEditor />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">
                            <div className="rounded-2xl border p-5">
                                <p className="text-base font-semibold">Brand & attributes</p>
                                <p className="text-sm text-muted-foreground">
                                    Used for filtering and SEO.
                                </p>

                                <Separator className="my-4" />

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label>Brand</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="brand-1">Brand 1</SelectItem>
                                                <SelectItem value="brand-2">Brand 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Attributes</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select attributes" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="attr-1">Attribute 1</SelectItem>
                                                <SelectItem value="attr-2">Attribute 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* IMAGES */}
                            <div className="rounded-2xl border p-5">
                                <ImageDndUpload value={images} onChange={setImages} maxImages={12} />
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                        <Button type="button">Create product</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductForm
