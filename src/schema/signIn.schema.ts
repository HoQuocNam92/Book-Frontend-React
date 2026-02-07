import { z } from "zod"
import type { infer as zInfer } from "zod"

export const signInSchema = z.object({
    email: z
        .string()
        .email("Vui lòng nhập email hợp lệ"),

    password: z
        .string()
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .max(50, "Mật khẩu tối đa 50 kí tự")
})

export type signInForm = zInfer<typeof signInSchema>
