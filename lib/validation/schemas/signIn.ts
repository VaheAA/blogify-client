import { z } from 'zod'

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type TLoginUser = z.infer<typeof SignInSchema>

export { SignInSchema }
export type { TLoginUser }
