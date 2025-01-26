import { create } from 'zustand'
import { IBlogPost } from '@/lib/types'

interface EditPostStore {
  post: IBlogPost | null
  isDialogOpen: boolean
  setPost: (post: IBlogPost | null) => void
  openDialog: () => void
  closeDialog: () => void
}

export const useEditPostStore = create<EditPostStore>((set) => ({
  post: null,
  isDialogOpen: false,
  setPost: (post) => set({ post, isDialogOpen: true }),
  openDialog: () => set({ isDialogOpen: true, post: null }),
  closeDialog: () => set({ isDialogOpen: false, post: null })
}))
