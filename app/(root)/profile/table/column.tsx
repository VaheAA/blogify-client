import { ColumnDef } from '@tanstack/react-table'
import type { IBlogPost } from '@/lib/types'
import Link from 'next/link'
import { ITag } from '@/lib/types/blog'
import { AppTag } from '@/components/app/AppTag'
import { DeleteIcon, EditIcon, EyeIcon, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<IBlogPost>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => {
      const content = row.getValue('content') as string
      return <span className="max-w-[400px] block">{content.substring(0, 100)}...</span>
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    maxSize: 200,
    cell: ({ row }) => {
      const tags: ITag[] = row.getValue('tags')

      return (
        <div className="flex flex-wrap gap-2 items-center w-full">
          {tags.map((tag, index) => (
            <AppTag tag={tag} key={index} />
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => {
      const val = row.getValue('createdAt') as string

      return new Date(val).toLocaleDateString()
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    // Find a way to customize cellContext props
    cell: ({ row, openDeleteDialog, setEditingPost }: any) => {
      const post = row.original

      return (
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Button variant="outline" size="icon" className="w-12" asChild>
            <Link
              href={{
                pathname: `blog/${post.id}`
              }}>
              <EyeIcon />
            </Link>
          </Button>

          <Button
            size="icon"
            className="w-12 bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setEditingPost(post)}>
            <EditIcon />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="w-12"
            onClick={() => openDeleteDialog(post.id)}>
            <DeleteIcon />
          </Button>
        </div>
      )
    }
  }
]
