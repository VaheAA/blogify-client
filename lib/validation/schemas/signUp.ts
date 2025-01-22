import { z } from 'zod'

const SignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6)
})

type TCreateUser = z.infer<typeof SignUpSchema>

export { SignUpSchema }
export type { TCreateUser }
