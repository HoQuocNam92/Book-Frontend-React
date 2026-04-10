
import * as React from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, ImagePlus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useEffect } from 'react';

export type ProductImageItem = {
    id: string
    file: File
    preview: string
}

function SortableImageItem({
    item,
    index,
    onRemove,
}: {
    item: ProductImageItem
    index: number
    onRemove: (id: string) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: item.id })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-background shadow-sm transition",
                isDragging && "ring-2 ring-primary scale-95"
            )}
        >
            {/* Image */}
            <img
                src={item.preview}
                alt="product"
                className="aspect-square w-full object-cover"
            />

            {/* Cover badge */}
            {index === 0 && (
                <Badge className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs">
                    Cover
                </Badge>
            )}

            {/* Overlay hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition group-hover:opacity-100">

                {/* Drag */}
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="rounded-full bg-white/90 p-2 hover:bg-white"
                >
                    <GripVertical className="h-4 w-4" />
                </button>

                {/* Delete */}
                <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="rounded-full bg-white/90 p-2 hover:bg-destructive hover:text-white"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
export default function ImageDndUpload({
    value,
    onChange,
    maxImages = 10,

}: {
    value: ProductImageItem[]
    onChange: (next: ProductImageItem[]) => void
    maxImages?: number
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const handlePickFiles = () => {
        inputRef.current?.click()
    }

    const addFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return

        const remain = maxImages - value.length
        if (remain <= 0) return

        const list = Array.from(files)
            .filter((f) => f.type.startsWith("image/"))
            .slice(0, remain)

        const mapped: ProductImageItem[] = list.map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
        }))

        onChange([...value, ...mapped])
    }

    const handleRemove = (id: string) => {
        const target = value.find((x) => x.id === id)
        if (target) URL.revokeObjectURL(target.preview)
        onChange(value.filter((x) => x.id !== id))
    }

    // Cleanup object URLs when unmount
    useEffect(() => {
        return () => {
            value.forEach((x) => URL.revokeObjectURL(x.preview))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="space-y-4">
            {/* Top header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-base font-semibold">Images</p>
                    <p className="text-sm text-muted-foreground">
                        Tải lên nhiều hình ảnh để giới thiệu sản phẩm của bạn từ mọi góc độ và thu hút khách hàng tiềm năng! ✨
                    </p>
                </div>

                <Badge variant="secondary" className="rounded-full">
                    {value.length}/{maxImages}
                </Badge>
            </div>

            {/* Dropzone */}
            <div
                className={cn(
                    "rounded-2xl border border-dashed bg-muted/30 p-5 transition",
                    "hover:bg-muted/40"
                )}
                onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    addFiles(e.dataTransfer.files)
                }}
            >
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-background">
                        <ImagePlus className="h-6 w-6" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            Drag & drop images here
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP — up to {maxImages} images
                        </p>
                    </div>

                    <Button type="button" variant="outline" onClick={handlePickFiles}>
                        Upload images
                    </Button>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {value.length === 0 ? (
                    <div className="rounded-2xl border bg-background py-10 text-center text-sm text-muted-foreground col-span-full">
                        No images yet. Upload to continue ✨
                    </div>
                ) : (
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => {
                            const { active, over } = event
                            if (!over) return
                            if (active.id === over.id) return

                            const oldIndex = value.findIndex((x) => x.id === active.id)
                            const newIndex = value.findIndex((x) => x.id === over.id)
                            onChange(arrayMove(value, oldIndex, newIndex))
                        }}
                    >
                        <SortableContext
                            items={value.map((x) => x.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {value.map((item, index) => (
                                <SortableImageItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    )
}
