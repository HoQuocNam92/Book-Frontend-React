import { z } from "zod";

export const newsSchema = z.object({
    id: z.number().optional(),

    title: z.string().min(1, "Tiêu đề không được để trống"),

    type: z.string().optional(),

    thumbnail: z.instanceof(File).optional().nullable(),

    content: z.string().optional(),

    is_published: z.boolean().default(true),
});

export type NewsInput = z.infer<typeof newsSchema>;