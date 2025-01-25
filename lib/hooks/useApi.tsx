import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth'

function useApi<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: ({ params, token }: { params: TQueryKey[1]; token: string }) => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  const { getToken } = useAuthStore()

  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = getToken()
      if (!token) throw new Error()

      return fetcher({ params: queryKey[1], token })
    },
    ...options
  })
}

export { useApi }
