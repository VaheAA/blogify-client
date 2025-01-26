import { z } from 'zod'

const CreateEditPostSchema = z.object({
  title: z.string().min(6),
  content: z.string().min(10),
  tags: z.string().array().min(1)
})

type TCreateEditPost = z.infer<typeof CreateEditPostSchema>

export { CreateEditPostSchema }
export type { TCreateEditPost }
