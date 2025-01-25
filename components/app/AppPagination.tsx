'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { POSTS_PER_PAGE } from '@/lib/constants'
import { Button } from '@/components/ui/button'

interface AppPaginationProps {
  hasNextPage?: boolean
  hasPrevPage?: boolean
  totalPages: number
}

export function AppPagination({ hasNextPage, hasPrevPage, totalPages }: AppPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const currentPage = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? POSTS_PER_PAGE
  const query = searchParams.get('query') ?? ''
  const tags = searchParams.get('tags')

  function handlePageChange(newPage: number) {
    router.push(`${pathName}/?page=${newPage}&limit=${limit}&query=${query}&tags=${tags}`)
  }

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <Button
        onClick={() => handlePageChange(parseInt(currentPage) - 1)}
        disabled={!hasPrevPage}
        className={`px-4 py-2 border rounded-lg shadow-md ${
          parseInt(currentPage) === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white hover:bg-blue-100 text-blue-600'
        }`}>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded-lg shadow-md ${
            page === parseInt(currentPage)
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-600 hover:bg-blue-100'
          }`}>
          {page}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(parseInt(currentPage) + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 border rounded-lg shadow-md ${
          parseInt(currentPage) === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white hover:bg-blue-100 text-blue-600'
        }`}>
        Next
      </Button>
    </div>
  )
}
