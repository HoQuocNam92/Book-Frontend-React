
import { z } from "zod"

export const AddressFormSchema = z.object({
    address: z.string().min(1, "Vui lòng nhập địa chỉ chi tiết"),
    phone: z.string().min(1, "Vui lòng nhập số điện thoại").regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
    province_id: z.coerce.number().min(1, "Vui lòng chọn tỉnh/thành"),
    district_id: z.coerce.number().min(1, "Vui lòng chọn quận/huyện"),
    ward_code: z.coerce.string().min(1, "Vui lòng chọn phường/xã"),
})


export type AddressFormInput = z.infer<typeof AddressFormSchema>