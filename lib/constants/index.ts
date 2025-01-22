import type { IBlogPost } from '@/lib/types'

const POSTS_PER_PAGE = 9

const MOCK_POSTS: IBlogPost[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Blog Post ${index + 1}: ${
    index % 2 === 0 ? 'Exploring JavaScript' : 'Understanding Frameworks'
  }`,
  content: `This is a sample content for Blog Post ${index + 1}. ${
    index % 3 === 0
      ? 'Learn how to enhance your skills in web development.'
      : 'Dive deep into modern tools and practices.'
  }`,
  tags: index % 2 === 0 ? ['javascript', 'frontend', 'frameworks'] : ['backend', 'api', 'nodejs'],
  createdAt: new Date(`2025-01-${(index % 31) + 1}`),
  updatedAt: index % 5 === 0 ? new Date(`2025-02-${(index % 28) + 1}`) : undefined
}))

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

enum ROUTES {
  SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
  SIGN_OUT = 'sign-out'
}

export { POSTS_PER_PAGE, MOCK_POSTS, BASE_API_URL, ROUTES }
