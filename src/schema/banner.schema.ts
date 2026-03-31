import { z } from 'zod';



export const BannerInputSchema = z.object({
    image_url: z.string().min(1, "Không được để trống"),
    link_url: z.string().min(1, "Không được để trống"),
})


export type BannerInput = z.infer<typeof BannerInputSchema>;