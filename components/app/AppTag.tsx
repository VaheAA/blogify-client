import { ITag } from '@/lib/types/blog'
import Link from 'next/link'

export function AppTag({ tag, variant = 'main' }: { tag: ITag; variant?: 'main' | 'detail' }) {
  const variants = {
    main: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 text-sm rounded-full shadow',
    detail:
      'bg-gradient-to-r from-blue-500 to-green-400 text-white px-3 py-1 text-sm rounded-full shadow'
  }
  return (
    <Link
      href={{
        pathname: '/blog',
        search: `tags=${tag.name}`
      }}
      className={variants[variant]}>
      {tag.name}
    </Link>
  )
}
