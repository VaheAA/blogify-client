import { IUser } from '@/lib/types'

interface IBlogPost {
  id: number
  title: string
  content: string
  author?: IUser
  tags: string[]
  updatedAt?: Date
  createdAt?: Date
}

export type { IBlogPost }
