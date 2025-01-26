import { IUser } from '@/lib/types'

export interface ITag {
  id: number
  name: string
}

interface IBlogPost {
  id: number
  title: string
  content: string
  author?: IUser
  tags: ITag[]
  updatedAt?: Date
  createdAt?: Date
}

export type { IBlogPost }
