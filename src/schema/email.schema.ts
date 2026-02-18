import { z } from 'zod'

import type { infer as zInfer } from 'zod'


export const emailSchema = z.object({
    email: z.string().email()
})

export type emailInput = zInfer<typeof emailSchema>