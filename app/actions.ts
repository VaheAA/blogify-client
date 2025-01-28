'use server'

import { revalidatePath } from 'next/cache'

export async function revalidatePosts() {
  const paths = ['/']

  for (const path of paths) {
    revalidatePath(path)
  }
}
