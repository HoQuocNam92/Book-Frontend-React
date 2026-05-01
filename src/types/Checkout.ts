import { z } from 'zod'



export const CheckoutSchema = z.object({
    selectedAddress: z.number("Vui lòng chọn địa chỉ giao hàng"),
    paymentMethod: z.enum(['cod', 'bank_transfer'], "Phương thức thanh toán không hợp lệ").default('cod'),
    appliedCoupon: z.object({
        code: z.string(),
        discount: z.number()
    }).nullable(),
    shipping_fee: z.number().default(0),
})





export type CheckoutInput = z.infer<typeof CheckoutSchema>

