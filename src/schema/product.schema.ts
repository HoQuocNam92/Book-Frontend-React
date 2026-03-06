import { z } from 'zod';

export const formProductSchema = z.object({
    title: z.string().min(1, "Vui long nhập tiêu đề sản phẩm"),
    price: z.number("Vui lòng nhập giá sản phẩm").min(0, "Giá sản phẩm phải là số dương"),
    discount_percent: z.preprocess(
        (val) => {
            if (val === "" || val === undefined) return undefined
            return Number(val)
        },
        z
            .number()
            .min(0, "Giảm giá phải >= 0")
            .max(100, "Giảm giá không quá 100")
            .optional()
    ),
    stock: z.number("Vui lòng nhập số lượng tồn kho").min(0, "Số lượng tồn kho phải là số dương"),
    description: z.string().optional(),
    brand_id: z.string("Vui lòng chọn thương hiệu"),
    category_id: z.string("Vui lòng chọn danh mục"),
    status: z.enum(["active", "draft", "archived"], "Vui lòng chọn trạng thái sản phẩm").default("active"),
    content: z.string(),
    is_featured: z.boolean().default(false),
    attributes: z.array(z.object({ attr_key: z.string(), attr_value: z.string() })).optional(),
    images: z.array(z.instanceof(File)).optional()
});


export type FormProductInput = z.infer<typeof formProductSchema>;



export const fromProductQuickActionsSchema = z.object({
    status: z.enum(["active", "draft", "archived"], "Vui lòng chọn trạng thái sản phẩm").optional(),
    is_featured: z.boolean().optional(),
}
)

export type FormProductQuickActionsInput = z.infer<typeof fromProductQuickActionsSchema>