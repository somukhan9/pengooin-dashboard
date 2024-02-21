import { z } from 'zod'

export const loginSchema: any = z.object({
  username: z
    .string()
    .refine((value) => !!value, { message: 'Username is required' }),
  password: z
    .string()
    .refine((value) => !!value, { message: 'Password is required' }),
})

export type FormData = z.infer<typeof loginSchema>
