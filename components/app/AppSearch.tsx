'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'

interface AppSearchProps {
  options: { value: string; label: string }[]
}

export function AppSearch({ options }: AppSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  function handleSearch(searchQuery: string) {
    const params = new URLSearchParams(searchParams)

    if (searchQuery) {
      params.set('query', searchQuery)
    } else {
      params.delete('query')
    }

    router.push(`${pathName}?${params.toString()}`)
  }

  function handleTagSearch(values: string[]) {
    const params = new URLSearchParams(searchParams)

    if (values.length) {
      params.set('tags', values.join(','))
    } else {
      params.delete('tags')
    }

    router.push(`${pathName}?${params.toString()}`)
  }

  return (
    <div className="mb-6 flex items-center gap-4">
      <Input
        className="transition duration-300"
        type="text"
        placeholder="Search by title"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <MultiSelect
        options={options}
        onValueChange={handleTagSearch}
        defaultValue={[]}
        placeholder="Select tags"
      />
    </div>
  )
}
