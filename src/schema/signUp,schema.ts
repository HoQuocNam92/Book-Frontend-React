import { z } from 'zod'
import type { infer as zInfer } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2, "Tên ít nhất 2 kí tự"),
    email: z.string().email("Vui lòng nhập email hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 kí tự").max(50, "Mật khẩu tối đá 50 kí tự"),
    phone: z.string().min(9, "Số điện thoại ít nhất 9 kí tự").max(12, "Mật khẩu tối đá 12 kí tự")
})

export type signUpForm = zInfer<typeof signUpSchema>